
import { MODELS } from "./models.js";

export async function routePrompt(prompt) {
  const model = MODELS.FREE;

  console.log(`Using model: ${model}`);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: "user", content: prompt },
      ],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "OpenRouter request failed");
  }

  return data.choices[0].message.content;
}