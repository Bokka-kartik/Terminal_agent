const OpenAI = require("openai");
const { createInterface } = require("node:readline/promises");
const { stdin, stdout } = require("node:process");

// 1. Load variables from .env into process.env (Node 22+ native)
try {
  process.loadEnvFile();
} catch (err) {
  console.warn("Warning: Could not load .env file.");
}

// 2. Parse Command Line Arguments
const args = process.argv.slice(2);

// Supported Model Shortcuts (Updated with currently active models on OpenRouter)
const MODEL_SHORTCUTS = {
  // Free models currently active on OpenRouter (0 credits needed)
  free: "openrouter/free",
  nemotron: "nvidia/nemotron-3.5-lightning:free",
  laguna: "poolside/laguna-s-2.1:free",

  // Top tier models (requires paid OpenRouter credits)
  claude: "anthropic/claude-3.5-sonnet",
  gpt4o: "openai/gpt-4o-mini",
  gemini: "google/gemini-2.5-flash",
  llama: "meta-llama/llama-3.3-70b-instruct",
};

// Check if user asked to list models (no API key required)
if (args.includes("--list")) {
  console.log("\n🤖 Available Model Shortcuts in OpenRouter:\n");
  for (const [shortcut, fullModel] of Object.entries(MODEL_SHORTCUTS)) {
    const isFree = fullModel.endsWith(":free") || fullModel.includes("/free") ? " [100% FREE]" : " [Paid Credits]";
    console.log(`  --model=${shortcut.padEnd(10)} -> ${fullModel}${isFree}`);
  }
  console.log("\nYou can also pass any raw model slug, e.g.: --model=nvidia/nemotron-3.5-lightning:free\n");
  process.exit(0);
}

// 3. Validate OpenRouter API Key
const apiKey = process.env.OPENROUTER_API_KEY;
if (!apiKey) {
  console.error("❌ Error: OPENROUTER_API_KEY is missing from .env");
  console.error("👉 Get a free API key at: https://openrouter.ai/keys");
  process.exit(1);
}

// Default to the confirmed active free model: Nemotron 3.5 Lightning
let selectedModel = MODEL_SHORTCUTS.nemotron;
const promptWords = [];

for (const arg of args) {
  if (arg.startsWith("--model=")) {
    const rawModel = arg.split("=")[1].trim();
    selectedModel = MODEL_SHORTCUTS[rawModel] || rawModel;
  } else {
    promptWords.push(arg);
  }
}

// Ensure selectedModel is never undefined
if (!selectedModel) {
  selectedModel = MODEL_SHORTCUTS.nemotron;
}

const suppliedPrompt = promptWords.join(" ").trim();

// 4. Initialize OpenAI Client configured with OpenRouter base URL
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey,
  defaultHeaders: {
    "HTTP-Referer": "https://github.com/Bokka-kartik/Terminal_Agent",
    "X-Title": "Terminal Agent OpenRouter Project",
  },
});

async function main() {
  let prompt = suppliedPrompt;
  if (!prompt) {
    console.log("\nHi! I'm your OpenRouter AI assistant.");
    console.log("Ask a question, request an explanation, or describe a task.");
    const terminal = createInterface({ input: stdin, output: stdout });
    try {
      while (!prompt) {
        prompt = (await terminal.question("\nWhat can I help you with? ")).trim();
        if (!prompt) console.log("Enter a question or task to get started.");
      }
    } finally {
      terminal.close();
    }
  }

  console.log(`🌐 [OpenRouter] Model: "${selectedModel}"`);
  console.log(`💬 Prompt: "${prompt}"`);
  console.log("⏳ Generating response...\n");

  try {
    const completion = await openai.chat.completions.create({
      model: selectedModel,
      messages: [{ role: "user", content: prompt }],
    });

    const msg = completion.choices[0]?.message;
    const reply = msg?.content || msg?.reasoning || "No text returned.";
    console.log("--- Response ---");
    console.log(reply);
    console.log("----------------");
  } catch (error) {
    const cause = error.cause ? ` [Cause: ${error.cause.message || error.cause.code || error.cause}]` : "";
    console.error(`❌ Request failed: ${error.message}${cause}`);
  }
}

main();
