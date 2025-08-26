// src/app/api/ai/ai-ppt-builder/stream/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { topic, numSlides, language } = await req.json();
  const encoder = new TextEncoder();

  // Craft prompt for outline
  const prompt = `Create an outline for a presentation about "${topic}" in ${language}, with ${numSlides} slides. 
    Return as JSON array with each item having { "title": "...", "bullets": ["...", ...] }.`;

  const res = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}`);
  const text = await res.text();

  let outlineArr: any[] = [];
  try {
    outlineArr = JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse Pollinations response:", e, text);
  }

  const stream = new ReadableStream({
    async start(controller) {
      // Notify start
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ start: true })}\n\n`));

      for (let i = 0; i < outlineArr.length; i++) {
        const slide = outlineArr[i];
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ slide })}\n\n`));
        await new Promise((r) => setTimeout(r, 300)); // optional pacing
      }

      controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
