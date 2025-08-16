// src/app/api/ai/images/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompts, size } = await req.json();

    const images = prompts.map((p: string) => {
      const encoded = encodeURIComponent(p);
      return `https://image.pollinations.ai/prompt/${encoded}?width=${size?.split("x")[0] || 1024}&height=${size?.split("x")[1] || 1024}`;
    });

    return NextResponse.json({ images });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
