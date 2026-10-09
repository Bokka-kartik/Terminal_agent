# Terminal Agent 🚀

A structured, progressive roadmap for building AI terminal agents and CLI tools from scratch using Node.js.

Each folder is a self-contained, independent project representing a milestone in the learning path.

---

## Projects Directory

| Milestone | Project Folder | Description | Status |
|---|---|---|---|
| **01** | [`01-multi-vendor-api`](./01-multi-vendor-api) | Direct API connections with official SDKs for Gemini, Claude, and OpenAI. | ✅ Completed |
| **02** | [`02-openrouter-api`](./02-openrouter-api) | Unified multi-model gateway with OpenRouter & OpenAI SDK (Claude, Llama, DeepSeek, Gemini). | ✅ Completed |
| **03** | `03-streaming-chat-agent` | Interactive terminal REPL, real-time token streaming, and conversational memory. | ⏳ Upcoming |
| **04** | `04-function-calling-agent` | Tool calling, executing terminal commands, and reading local files. | ⏳ Upcoming |
| **05** | `05-mcp-agent` | Model Context Protocol (MCP) client and server integration. | ⏳ Upcoming |

---

## Getting Started

Each project folder has its own dependencies and configuration:

```bash
# Project 1: Multi-Vendor SDKs
cd 01-multi-vendor-api
npm install
node gemini.js "Your prompt here"

# Project 2: OpenRouter Gateway
cd 02-openrouter-api
npm install
node index.js --model=deepseek "Your prompt here"
```

Refer to the individual `README.md` inside each subfolder for detailed setup instructions.
