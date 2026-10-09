// Main Entry Point - Multi-Vendor Terminal Agent
// Usage:
//   node index.js "Your prompt"
//   node index.js --vendor=claude "Your prompt"
//   node index.js --vendor=openai "Your prompt"
//   node index.js --vendor=gemini "Your prompt"

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

// Forward to the chosen vendor script
process.argv = [process.argv[0], process.argv[1], ...promptArgs];

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
