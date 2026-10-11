// const OpenAI = require("openai");

// try {
//   process.loadEnvFile();
// } catch {
//   // A missing .env file is fine when the key is set in the shell.
// }

// // Replace these examples with model IDs available to your OpenRouter account.
// const MODELS = {
//   fast: "nvidia/nemotron-3.5-lightning:free",
//   balanced: "poolside/laguna-s-2.1:free",
//   capable: "anthropic/claude-3.5-sonnet",
// };

// // Routing order: try the preferred model first, then fall back in sequence.
// const ROUTES = {
//   fast: [MODELS.fast, MODELS.balanced],
//   balanced: [MODELS.balanced, MODELS.fast],
//   capable: [MODELS.capable, MODELS.balanced, MODELS.fast],
// };

// function parseArgs(args) {
//   const options = { model: null, route: "balanced", prompt: [] };

//   for (const arg of args) {
//     if (arg === "--list") options.list = true;
//     else if (arg.startsWith("--model=")) options.model = arg.slice(8).trim();
//     else if (arg.startsWith("--route=")) options.route = arg.slice(8).trim();
//     else options.prompt.push(arg);
//   }

//   return options;
// }

// async function main() {
//   const options = parseArgs(process.argv.slice(2));

//   if (options.list) {
//     console.log("Model choices:");
//     for (const [name, model] of Object.entries(MODELS)) {
//       console.log(`  ${name.padEnd(10)} ${model}`);
//     }
//     console.log("\nRoutes: fast, balanced, capable");
//     console.log("You can also pass a full model ID with --model=<provider/model>.");
//     return;
//   }

//   const apiKey = process.env.OPENROUTER_API_KEY;
//   if (!apiKey) {
//     console.error("OPENROUTER_API_KEY is missing. Copy .env.example to .env and add your key.");
//     process.exitCode = 1;
//     return;
//   }

//   if (!ROUTES[options.route] && !options.model) {
//     console.error(`Unknown route: ${options.route}. Choose: ${Object.keys(ROUTES).join(", ")}`);
//     process.exitCode = 1;
//     return;
//   }

//   const candidates = options.model
//     ? [MODELS[options.model] || options.model]
//     : ROUTES[options.route];
//   const prompt = options.prompt.join(" ").trim();
//   if (!prompt) {
//     console.error('Usage: node index.js [--route=fast|balanced|capable] [--model=<model-id>] "Your prompt"');
//     process.exitCode = 1;
//     return;
//   }

//   const client = new OpenAI({
//     baseURL: "https://openrouter.ai/api/v1",
//     apiKey,
//     defaultHeaders: { "X-Title": "Terminal Agent - Model Routing" },
//   });

//   for (const [index, model] of candidates.entries()) {
//     console.log(`Trying ${model}${index ? " (fallback)" : ""}...`);
//     try {
//       const response = await client.chat.completions.create({
//         model,
//         messages: [{ role: "user", content: prompt }],
//       });
//       console.log(response.choices[0]?.message?.content || "No text returned.");
//       return;
//     } catch (error) {
//       console.error(`Request failed for ${model}: ${error.message}`);
//       if (index === candidates.length - 1) process.exitCode = 1;
//     }
//   }
// }

// main().catch((error) => {
//   console.error(`Unexpected error: ${error.message}`);
//   process.exitCode = 1;
// });

import "dotenv/config";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { routePrompt } from "./src/router.js";

const suppliedPrompt = process.argv.slice(2).join(" ").trim();

async function main() {
  let prompt = suppliedPrompt;
  if (!prompt) {
    console.log("\nHi! I'm your model-routing assistant.");
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

  try {
    console.log("Prompt:", prompt);

    const answer = await routePrompt(prompt);

    console.log("\nAI Response:\n");
    console.log(answer);
  } catch (error) {
    console.error("\nRequest failed:", error.message);
  }
}

main();
