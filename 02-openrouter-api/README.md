# Project 2: Unified Multi-Model Gateway with OpenRouter 🌐

This project demonstrates the **Single Gateway Pattern**: accessing hundreds of AI models (Claude, Llama, Gemini, DeepSeek, Mistral, GPT-4o) using **only one API key** and **one standard SDK (`openai`)**.

---

## Why OpenRouter?

In [Project 1](../01-multi-vendor-api), we had to:
- Install 3 separate SDKs (`@google/genai`, `@anthropic-ai/sdk`, `openai`).
- Maintain 3 different API keys and billing accounts.
- Write 3 different request/response formats.

In **Project 2 (OpenRouter)**:
- ✅ **1 SDK**: Standard `openai` npm package.
- ✅ **1 API Key**: `OPENROUTER_API_KEY`.
- ✅ **1 Unified Format**: OpenAI-compatible chat completions.
- ✅ **100% Free Models**: Direct access to free tiers like DeepSeek R1, Llama 3.3 70B, and Gemini 2.0 Flash!

---

## Prerequisites

- **Node.js**: `v22.0.0` or higher
- **OpenRouter API Key**: Get a free key at [openrouter.ai/keys](https://openrouter.ai/keys).

---

## Setup & Running

### 1. Install Dependencies

```bash
cd 02-openrouter-api
npm install
```

### 2. Configure Environment Variables

Create `.env` in this directory:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

### 3. Usage

#### List Available Model Shortcuts:
```bash
node index.js --list
```

#### Run with the Default Free Model (Llama 3.3 70B Free):
```bash
node index.js "Explain Docker in simple terms"
```

#### Run with Specific Model Shortcuts:
```bash
# DeepSeek R1 (Free)
node index.js --model=deepseek "Write a quick binary search in JavaScript"

# Google Gemini (Free)
node index.js --model=gemini "Explain REST vs GraphQL"

# Anthropic Claude
node index.js --model=claude "Explain the CAP theorem"

# OpenAI GPT-4o Mini
node index.js --model=gpt4o "What is an event loop?"
```

#### Use Any OpenRouter Model Slug Directly:
```bash
node index.js --model=mistralai/mistral-7b-instruct:free "Hello world"
```

