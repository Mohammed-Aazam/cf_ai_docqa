export default {
  async fetch(request, env) {

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    // ROUTE 1: Upload document
    if (url.pathname === "/upload" && request.method === "POST") {
      const { document } = await request.json();

      if (!document || document.trim() === "") {
        return new Response(JSON.stringify({ error: "No document provided" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      await env.DOC_STORE.put("current_document", document);
      await env.DOC_STORE.delete("chat_history");

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ROUTE 2: Ask a question
    if (url.pathname === "/ask" && request.method === "POST") {
      const { question } = await request.json();

      const document = await env.DOC_STORE.get("current_document");
      if (!document) {
        return new Response(JSON.stringify({ error: "No document uploaded yet. Please upload a document first." }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const historyRaw = await env.DOC_STORE.get("chat_history");
      const history = historyRaw ? JSON.parse(historyRaw) : [];

      const messages = [
        {
          role: "system",
          content: `You are a helpful assistant that answers questions based ONLY on the document provided below. 
If the answer is not in the document, say "I couldn't find that in the document."

DOCUMENT:
${document}`,
        },
        ...history,
        {
          role: "user",
          content: question,
        },
      ];

      const aiResponse = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
        messages,
      });

      const answer = aiResponse.response;

      history.push({ role: "user", content: question });
      history.push({ role: "assistant", content: answer });
      const trimmedHistory = history.slice(-10);
      await env.DOC_STORE.put("chat_history", JSON.stringify(trimmedHistory));

      return new Response(JSON.stringify({ answer }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ROUTE 3: Clear session
    if (url.pathname === "/clear" && request.method === "POST") {
      await env.DOC_STORE.delete("current_document");
      await env.DOC_STORE.delete("chat_history");

      return new Response(JSON.stringify({ success: true, message: "Session cleared" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ status: "CF AI DocQA is running!" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  },
};