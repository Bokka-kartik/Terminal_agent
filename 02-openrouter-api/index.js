const OpenAI = require('openai');

// 1. Load variables from .env into process.env (Node 22+ native)
try {
  process.loadEnvFile();
} catch (err) {
  console.warn('Warning: Could not load .env file.');
}

// 2. Parse Command Line Arguments
const args = process.argv.slice(2);

// Supported Model Shortcuts & Free Tier Models
const MODEL_SHORTCUTS = {
  // Free models on OpenRouter (no credits needed!)
  llama: 'meta-llama/llama-3.3-70b-instruct:free',
  deepseek: 'deepseek/deepseek-r1:free',
  gemini: 'google/gemini-2.0-flash-exp:free',
  mistral: 'mistralai/mistral-7b-instruct:free',

  // Leading premium models
  claude: 'anthropic/claude-3.5-sonnet',
  gpt4o: 'openai/gpt-4o-mini',
};

// Check if user asked to list models (no API key required)
if (args.includes('--list')) {
  console.log('\n🤖 Available Model Shortcuts in OpenRouter:\n');
  for (const [shortcut, fullModel] of Object.entries(MODEL_SHORTCUTS)) {
    const isFree = fullModel.endsWith(':free') ? ' [100% FREE]' : '';
    console.log(`  --model=${shortcut.padEnd(10)} -> ${fullModel}${isFree}`);
  }
  console.log('\nYou can also pass any raw model slug, e.g.: --model=meta-llama/llama-3.1-8b-instruct:free\n');
  process.exit(0);
}

// 3. Validate OpenRouter API Key
const apiKey = process.env.OPENROUTER_API_KEY;
if (!apiKey) {
  console.error('❌ Error: OPENROUTER_API_KEY is missing from .env');
  console.error('👉 Get a free API key at: https://openrouter.ai/keys');
  process.exit(1);
}

let selectedModel = MODEL_SHORTCUTS.llama; // Default to free Llama 3.3 70B
const promptWords = [];

for (const arg of args) {
  if (arg.startsWith('--model=')) {
    const rawModel = arg.split('=')[1].trim();
    selectedModel = MODEL_SHORTCUTS[rawModel] || rawModel;
  } else {
    promptWords.push(arg);
  }
}

const prompt = promptWords.join(' ').trim() || 'Explain what an API is in simple terms.';

// 5. Initialize OpenAI Client configured with OpenRouter base URL
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey,
  defaultHeaders: {
    'HTTP-Referer': 'https://github.com/Bokka-kartik/Terminal_Agent',
    'X-Title': 'Terminal Agent OpenRouter Project',
  },
});

async function main() {
  console.log(`🌐 [OpenRouter] Model: "${selectedModel}"`);
  console.log(`💬 Prompt: "${prompt}"`);
  console.log('⏳ Generating response...\n');

  try {
    const completion = await openai.chat.completions.create({
      model: selectedModel,
      messages: [{ role: 'user', content: prompt }],
    });

    const reply = completion.choices[0]?.message?.content;
    console.log('--- Response ---');
    console.log(reply || 'No text returned.');
    console.log('----------------');
  } catch (error) {
    const cause = error.cause ? ` [Cause: ${error.cause.message || error.cause.code || error.cause}]` : '';
    console.error(`❌ Request failed: ${error.message}${cause}`);
  }
}

main();
