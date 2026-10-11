const Anthropic = require('@anthropic-ai/sdk');
const { getPrompt } = require('./prompt.js');

// 1. Load variables from .env (Node 22+ native)
try {
  process.loadEnvFile();
} catch (err) {
  console.warn('Warning: Could not load .env file.');
}

// 2. Validate API Key
const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error('❌ Error: ANTHROPIC_API_KEY is missing from .env');
  process.exit(1);
}

// 3. Initialize client
const anthropic = new Anthropic({ apiKey });

async function main() {
  const prompt = await getPrompt();
  console.log(`🤖 [Anthropic Claude] Prompt: "${prompt}"`);
  console.log('⏳ Contacting Claude API...\n');

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-latest',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    });

    console.log('--- Response ---');
    console.log(message.content[0].text);
    console.log('----------------');
  } catch (error) {
    const cause = error.cause ? ` [Cause: ${error.cause.message || error.cause.code || error.cause}]` : '';
    console.error(`❌ Request failed: ${error.message}${cause}`);
  }
}

main();

