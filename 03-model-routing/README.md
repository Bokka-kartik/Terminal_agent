# Project 3: Multiple Models and Routing

Learn how to choose a model for a request and how to route automatically through an ordered list of fallback models.

## What this project demonstrates

- **Model selection:** choose a preset with `--model`, or pass a provider model ID.
- **Named routes:** choose a route profile with `--route=fast`, `balanced`, or `capable`.
- **Fallbacks:** if a request fails, the CLI tries the next model in that route.

The model IDs in `index.js` are examples. OpenRouter model availability, names, and pricing can change, so replace them with IDs currently available to your account before running requests. A fallback may also incur a different cost.

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
# Show presets and route profiles
node index.js --list

# Use the fast route, then its fallback if the first model fails
node index.js --route=fast "Explain DNS in simple terms"

# Use a specific preset (single model, no fallback)
node index.js --model=capable "Summarize the CAP theorem"

# Use an OpenRouter model ID directly
node index.js --model=provider/model-id "Explain what an API is"
```

## How routing works

Each route is an ordered array in `ROUTES` in `index.js`. The CLI tries each candidate in order and stops after the first successful response. The direct `--model` option bypasses route fallback, which is useful when you want a specific model.

The starter treats any request error as a reason to try the next model. For a production router, consider retrying only transient errors (such as rate limits or provider failures), and handling invalid model IDs and authentication errors separately.
