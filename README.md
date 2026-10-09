# Terminal Agent 🤖

A lightweight Node.js terminal-based AI assistant built directly with Google's official Gemini SDK (`@google/genai`).

Designed as an educational, zero-bloat foundation to learn how AI APIs, authentication, prompts, and model routing work under the hood.

---

## Features

- **Direct Gemini Integration**: Uses the official Google `@google/genai` SDK with `gemini-3.8-flash`.
- **Zero-Dependency Env Loading**: Uses Node.js 22's native `process.loadEnvFile()` without third-party `dotenv` overhead.
- **Robust Error Diagnostics**: Detailed network/transport layer exception tracking (`error.cause`) for smooth debugging.
- **Safe Secrets Handling**: Pre-configured `.gitignore` prevents `.env` credential leaks.

---

## Prerequisites

- **Node.js**: `v22.0.0` or higher
- **Gemini API Key**: Free-tier key from [Google AI Studio](https://aistudio.google.com/apikey)

---

## Quickstart

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/<your-username>/Terminal_Agent.git
cd Terminal_Agent
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

> **Security Note:** Never commit `.env` to Git or expose your private API key.

### 3. Run the Agent

```bash
node index.js
```

---

## Multi-Provider Roadmap 🗺️

- [x] **Phase 1**: Direct Gemini API connection & safe authentication.
- [ ] **Phase 2**: Dynamic CLI arguments (`node index.js "your question"`) and real-time streaming output (`generateContentStream`).
- [ ] **Phase 3**: Multi-provider support (OpenRouter / OpenAI / Anthropic) via a unified provider interface.
- [ ] **Phase 4**: Interactive terminal REPL / chat loop with conversational memory.
- [ ] **Phase 5**: Agentic tool calling & Model Context Protocol (MCP) integration.

---

## License

ISC

