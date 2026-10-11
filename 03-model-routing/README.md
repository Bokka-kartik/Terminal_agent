# Project 3: Multiple Models and Routing

This milestone is being built in small steps. The current version keeps the working `openrouter/free` model and gives the terminal a friendly interactive prompt.

## What this project demonstrates

- **Interactive prompt:** start the app and type a question or task in the terminal.
- **Separate responsibilities:** `src/models.js` stores the current model ID, and `src/router.js` sends the request to OpenRouter.
- **Current model:** `openrouter/free`, so this starter does not intentionally select a paid model.

Model availability and free-tier terms can change, so check the selected model in your OpenRouter account.

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and set your OpenRouter API key:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

## Try it

```bash
# Start an interactive terminal prompt
node index.js

# Or provide the prompt directly
node index.js "Explain what an API is"
```

The terminal greets you and asks what you need help with. Enter a question or task and the current `openrouter/free` model will answer. You can also provide a prompt as an argument.

## How routing works

The next step is to add model selection and routing rules in `src/router.js`, while keeping the model list in `src/models.js`.
