# Project 1: Multi-Vendor AI API 🤖

A lightweight, multi-vendor Node.js terminal app demonstrating how to connect to major AI providers using their official SDKs.

---

## Supported AI Providers & SDKs

| Vendor | Official SDK | Target Model | Standalone Script |
|---|---|---|---|
| **Google Gemini** | `@google/genai` | `gemini-3.8-flash` | [`gemini.js`](./gemini.js) |
| **Anthropic Claude** | `@anthropic-ai/sdk` | `claude-3-5-sonnet-latest` | [`claude.js`](./claude.js) |
| **OpenAI** | `openai` | `gpt-4o-mini` | [`openai.js`](./openai.js) |

---

## Features

- **Multi-Vendor Support**: Dedicated, self-contained scripts for Gemini, Claude, and OpenAI.
- **Dynamic CLI Prompts**: Pass prompts directly via command line arguments.
- **Zero-Dependency Env Loading**: Uses Node.js 22's native `process.loadEnvFile()` without third-party `dotenv` overhead.
- **Error Diagnostics**: Detailed network/transport layer exception tracking (`error.cause`).
- **Safe Secrets Handling**: Local `.gitignore` ensures credentials are never committed.

---

## Setup & Running

### 1. Install Dependencies

```bash
cd 01-multi-vendor-api
npm install
```

### 2. Configure Environment Variables

Create `.env` inside this folder based on `.env.example`:

```env
GEMINI_API_KEY=your_gemini_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here
OPENAI_API_KEY=your_openai_key_here
```

### 3. Usage

Run standalone scripts:

```bash
node gemini.js "What is Git in one sentence?"
node claude.js "Explain Docker containers"
node openai.js "Explain recursion"
```

Or use the universal router:

```bash
node index.js "Your prompt here"
node index.js --vendor=claude "Your prompt here"
node index.js --vendor=openai "Your prompt here"
```

