// app/api/question-paper/route.ts
import { NextRequest, NextResponse } from "next/server";
import { rateLimiter } from "@/lib/rate-limiter";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const handleError = (error: unknown) => {
  console.error("Question Paper API Error:", error);
  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";
  return NextResponse.json({ error: message }, { status: 500 });
};

export async function POST(req: NextRequest) {
  // Rate limit
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const allowed = rateLimiter(ip, 2, 5000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { sections } = body;

    if (!sections || !Array.isArray(sections) || sections.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: sections are required" },
        { status: 400 }
      );
    }

    const systemPrompt = `
You are an expert academic paper setter. Generate a professional question paper based on the provided sections, topics, and question types. Follow these rules strictly:

1. Do NOT use Markdown, code blocks, or any extra formatting. Output plain text only.
2. The main title of the question paper should appear at the top in UPPERCASE.
3. Section headers should be in UPPERCASE letters, e.g., SECTION A: ALGEBRA.
4. Under each section, list topics and generate questions as instructed.
5. Do NOT show marks next to individual questions.
6. Show **total marks for each section** at the end of the section, e.g., "Total Marks: 15".
7. Number questions sequentially within each section.
8. Ensure question types (MCQ, Short Answer, Long Answer, Coding, Essay, Fill in the Blanks) match the instructions for count and marks.
9. Keep formatting professional and exam-ready, suitable for printing.
10. Do NOT use dots (".......") or extra placeholders for spacing.

Example format:

QUESTION PAPER TITLE: ADVANCED MATHEMATICS

SECTION A: ALGEBRA
Topics: Quadratic Equations, Linear Equations

1. Solve the quadratic equation x^2 - 5x + 6 = 0
2. Find the solution to 2x + 3y = 12 and x - y = 4

Total Marks: 9

SECTION B: CALCULUS
Topics: Differentiation, Integration

1. Differentiate x^3 + 5x^2 - 2x + 7
2. Evaluate the integral ∫(2x^2 - 3x + 1) dx

Total Marks: 9

Repeat for all sections, topics, and question types.

`;

    const userPrompt = sections
      .map((s: any, i: number) => {
        const qtList = s.questionTypes
          .map(
            (qt: any) =>
              `- ${qt.type}: ${qt.count} questions, ${qt.marks} marks each`
          )
          .join("\n");

        const topicList = s.topics.map((t: any) => `  - ${t.value}`).join("\n");

        return `Section ${i + 1}: ${s.title}
Topics:
${topicList}
Question Types:
${qtList}`;
      })
      .join("\n\n");

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent([systemPrompt, userPrompt]);

    const output = result.response.text();

    return NextResponse.json({
      success: true,
      questionPaper: output,
    });
  } catch (error) {
    return handleError(error);
  }
}
