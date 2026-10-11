const { createInterface } = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

async function getPrompt(args = process.argv.slice(2)) {
  const existingPrompt = args.join(' ').trim();
  if (existingPrompt) return existingPrompt;

  console.log('\nHi! I\'m your AI assistant.');
  console.log('I can answer questions, explain topics, help with writing, and work through coding ideas.');

  const terminal = createInterface({ input: stdin, output: stdout });
  try {
    let prompt = '';
    while (!prompt) {
      prompt = (await terminal.question('\nWhat can I help you with? ')).trim();
      if (!prompt) console.log('Enter a question or task to get started.');
    }
    return prompt;
  } finally {
    terminal.close();
  }
}

module.exports = { getPrompt };
