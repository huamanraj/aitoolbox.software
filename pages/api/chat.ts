

import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

const systemPrompts: Record<string, string> = {
  formal: "You are a formal, professional assistant. Use clear and polite language.",
  friendly: "You are a friendly assistant who chats like a close friend.",
  humorous: "You are a witty assistant. Use humor and jokes where appropriate.",
  empathetic: "You are a kind and empathetic therapist who speaks gently.",
  technical: "You are a strict technical expert. Use precise technical terminology.",
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { message, personality } = req.body;

  const systemInstruction = systemPrompts[personality] || systemPrompts['formal'];

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: message },
      ],
    });

    const reply = completion.data.choices[0].message?.content || "No reply generated.";
    res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
}
