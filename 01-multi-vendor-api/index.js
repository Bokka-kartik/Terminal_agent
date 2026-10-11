// Main Entry Point - Multi-Vendor Terminal Agent
// Run without a prompt to be greeted and asked what you need help with.

const args = process.argv.slice(2);
let vendor = 'gemini';
const promptArgs = [];

for (const arg of args) {
  if (arg.startsWith('--vendor=')) {
    vendor = arg.split('=')[1].toLowerCase();
  } else {
    promptArgs.push(arg);
  }
}

async function main() {
  const { getPrompt } = require('./prompt.js');
  const prompt = await getPrompt(promptArgs);
  process.argv = [process.argv[0], process.argv[1], prompt];

  switch (vendor) {
    case 'claude':
    case 'anthropic':
      require('./claude.js');
      break;
    case 'openai':
    case 'gpt':
      require('./openai.js');
      break;
    case 'gemini':
    case 'google':
    default:
      require('./gemini.js');
      break;
  }
}

main().catch((error) => {
  console.error(`Could not read your prompt: ${error.message}`);
  process.exitCode = 1;
});
