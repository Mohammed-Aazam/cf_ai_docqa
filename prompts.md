# AI Prompts Used in Development

This file documents the AI prompts used during the development of cf_ai_docqa,
as required by the assignment instructions.

## Prompt 1 — Project Guidance
**Tool:** Claude (claude.ai)
**Prompt:**
"I have received an assignment to build an AI-powered application on Cloudflare
with: an LLM, workflow/coordination, user input via chat, and memory/state.
I am a beginner with no coding experience. Can you guide me step by step to
build an AI Document Q&A app?"

**Used for:** Overall project architecture, step-by-step setup guidance

---

## Prompt 2 — Backend Worker Code
**Tool:** Claude (claude.ai)
**Prompt:**
"Write a Cloudflare Worker in JavaScript that has three routes: POST /upload
to save a document to KV storage, POST /ask to send the document and question
to Llama 3.3 on Workers AI and return an answer, and POST /clear to delete
the session. Include CORS headers and chat history stored in KV."

**Used for:** Generating `src/index.js`

---

## Prompt 3 — Frontend Chat Interface
**Tool:** Claude (claude.ai)
**Prompt:**
"Create a single HTML file chat interface for an AI Document Q&A app. It should
have a textarea to paste a document, an upload button, and a chat box where
users can ask questions and see AI responses. Style it with a dark theme using
orange Cloudflare brand colors."

**Used for:** Generating `frontend/index.html`

---

## Prompt 4 — Debugging
**Tool:** Claude (claude.ai)
**Prompt:**
"I am getting this error when running wrangler deploy: Could not detect a
directory containing static files. How do I fix this for a Cloudflare Worker
project?"

**Used for:** Troubleshooting deployment errors
