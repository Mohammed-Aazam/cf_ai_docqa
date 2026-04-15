# cf_ai_docqa — AI Document Q&A on Cloudflare

An AI-powered Document Q&A application built on Cloudflare's developer platform. Paste any document and ask questions about it using a chat interface powered by Llama 3.3.

## 🧠 Architecture

| Component | Technology |
|---|---|
| LLM | Llama 3.3 via Cloudflare Workers AI |
| Backend / Workflow | Cloudflare Workers |
| Frontend / User Input | Cloudflare Pages (chat interface) |
| Memory / State | Cloudflare KV (document + chat history) |

## 🚀 Live Demo

- **Frontend:** https://453c6e65.cf-ai-docqa-ui.pages.dev
- **Backend API:** https://cf-ai-docqa.mohammedaazam.workers.dev

## 💡 Features

- Paste any text document (articles, reports, contracts, notes)
- Ask unlimited questions about the document in a chat interface
- AI remembers conversation history within a session
- Clear session to start fresh with a new document

## 🛠️ Running Locally

### Prerequisites
- Node.js (v18+)
- Cloudflare account
- Wrangler CLI: `npm install -g wrangler`

### Setup

1. Clone the repository:
```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/cf_ai_docqa.git
   cd cf_ai_docqa
```

2. Login to Cloudflare:
```bash
   wrangler login
```

3. Create a KV namespace:
```bash
   wrangler kv namespace create "DOC_STORE"
```
   Copy the ID and paste it into `wrangler.jsonc`

4. Deploy the backend Worker:
```bash
   wrangler deploy
```

5. Deploy the frontend:
```bash
   npx wrangler pages deploy frontend --project-name=cf-ai-docqa-ui
```

6. Open the Pages URL in your browser and start chatting!

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/upload` | Upload a document to KV storage |
| POST | `/ask` | Ask a question about the document |
| POST | `/clear` | Clear document and chat history |
