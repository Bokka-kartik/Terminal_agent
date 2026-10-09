const OpenAI = require('openai');

// 1. Load variables from .env (Node 22+ native)
try {
  process.loadEnvFile();
} catch (err) {
  console.warn('Warning: Could not load .env file.');
}

// 2. Validate API Key
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('❌ Error: OPENAI_API_KEY is missing from .env');
  process.exit(1);
}

// 3. Initialize client
const openai = new OpenAI({ apiKey });

async function main() {
  const prompt = process.argv.slice(2).join(' ') || 'Explain SSH in simple terms.';
  console.log(`🤖 [OpenAI GPT-4o] Prompt: "${prompt}"`);
  console.log('⏳ Contacting OpenAI API...\n');

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
    });

    console.log('--- Response ---');
    console.log(completion.choices[0].message.content);
    console.log('----------------');
  } catch (error) {
    const cause = error.cause ? ` [Cause: ${error.cause.message || error.cause.code || error.cause}]` : '';
    console.error(`❌ Request failed: ${error.message}${cause}`);
  }
}

main();

