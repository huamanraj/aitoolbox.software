import { NextResponse } from "next/server";

/**
 * Input: { outline, language, audience, textModel }
 * Output: { slides: { id, title, bullets, notes }[] }
 */
export async function POST(req: Request) {
  const body = await req.json();
  const { outline, language, audience } = body;

  const slides = outline.map((o: any) => ({
    id: o.id,
    title: o.title,
    bullets: o.bullets.map((b: string) => `${b} — expanded for ${audience}/${language}`),
    notes: `Speaker notes for "${o.title}"`,
  }));

  return NextResponse.json({ slides });
}
