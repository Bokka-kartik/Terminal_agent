const { GoogleGenAI } = require('@google/genai');

// 1. Load variables from .env into process.env (native to Node 22+)
try {
  process.loadEnvFile();
} catch (err) {
  console.warn('Warning: Could not load .env file.');
}

// 2. Guard rail: Check that the API key exists before sending a request
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('❌ Error: GEMINI_API_KEY is missing from .env');
  process.exit(1);
}

// 3. Initialize the Google GenAI client
const ai = new GoogleGenAI({ apiKey });

async function main() {
  const prompt = "Explain who's the current cm of andhra and what are his achievements";
  console.log(`🤖 Prompt: "${prompt}"`);
  console.log('⏳ Contacting Gemini API...\n');

  try {
    // 4. Send the prompt to Gemini (gemini-3.8-flash is the current fast model)
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    // 5. Print the generated text
    console.log('--- Gemini Response ---');
    console.log(response.text);
    console.log('------------------------');
  } catch (error) {
    const cause = error.cause ? ` [Cause: ${error.cause.message || error.cause.code || error.cause}]` : '';
    console.error(`❌ Request failed: ${error.message}${cause}`);
  }
}

main();

