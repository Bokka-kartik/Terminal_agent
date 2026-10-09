# Terminal Agent 🤖

A lightweight, multi-vendor Node.js terminal AI assistant.

Built as an educational, zero-bloat foundation to learn and compare how different AI providers, authentication mechanisms, prompts, and official SDKs work under the hood.

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
- **Dynamic CLI Prompts**: Pass any question directly from your terminal arguments.
- **Zero-Dependency Env Loading**: Uses Node.js 22's native `process.loadEnvFile()` without third-party `dotenv` overhead.
- **Error Diagnostics**: Detailed network/transport layer exception tracking (`error.cause`).
- **Safe Secrets Handling**: Pre-configured `.gitignore` prevents `.env` credential leaks.

---

## Prerequisites

- **Node.js**: `v22.0.0` or higher
- **API Keys**: From any of [Google AI Studio](https://aistudio.google.com/apikey), [Anthropic Console](https://console.anthropic.com/), or [OpenAI Platform](https://platform.openai.com/).

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
GEMINI_API_KEY=your_gemini_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here
OPENAI_API_KEY=your_openai_key_here
```

*(You only need to fill in keys for the providers you want to test).*

---

## Usage

### Option A: Run Standalone Vendor Scripts Directly

```bash
# Google Gemini
node gemini.js "Explain Docker in simple terms"

# Anthropic Claude
node claude.js "Explain Docker in simple terms"

# OpenAI GPT-4o
node openai.js "Explain Docker in simple terms"
```

### Option B: Use the Universal Router (`index.js`)

```bash
# Default (Google Gemini)
node index.js "Explain Kubernetes"

# Choose vendor via --vendor flag
node index.js --vendor=claude "Explain Kubernetes"
node index.js --vendor=openai "Explain Kubernetes"
node index.js --vendor=gemini "Explain Kubernetes"
```

---

## Multi-Provider Roadmap 🗺️

- [x] **Phase 1**: Direct Gemini API connection & safe authentication.
- [x] **Phase 2**: Multi-vendor support (Gemini, Claude, OpenAI) + dynamic CLI arguments.
- [ ] **Phase 3**: Real-time token streaming (`stream` / `generateContentStream`).
- [ ] **Phase 4**: Interactive terminal REPL / chat loop with conversational memory.
- [ ] **Phase 5**: Agentic tool calling & Model Context Protocol (MCP) integration.

---

## License

ISC
