const { GoogleGenAI } = require('@google/genai');
const { getPrompt } = require('./prompt.js');

// 1. Load variables from .env into process.env (Node 22+ native)
try {
  process.loadEnvFile();
} catch (err) {
  console.warn('Warning: Could not load .env file.');
}

// 2. Validate API Key
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('❌ Error: GEMINI_API_KEY is missing from .env');
  process.exit(1);
}

// 3. Initialize client
const ai = new GoogleGenAI({ apiKey });

async function main() {
  const prompt = await getPrompt();
  console.log(`🤖 [Google Gemini] Prompt: "${prompt}"`);
  console.log('⏳ Contacting Gemini API...\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    console.log('--- Response ---');
    console.log(response.text);
    console.log('----------------');
  } catch (error) {
    const cause = error.cause ? ` [Cause: ${error.cause.message || error.cause.code || error.cause}]` : '';
    console.error(`❌ Request failed: ${error.message}${cause}`);
  }
}

main();

