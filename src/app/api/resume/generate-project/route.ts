import { parseProjectString } from "@/lib/resume/ResumeUtils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed", status: 405 });
  }
  const { description } = await req.json();

  if (!description) {
    return NextResponse.json({ error: "Description is required", status: 400 });
  }

  const systemMessage = `
You are an AI resume assistant specialized in crafting impactful project descriptions. Your task is to generate a single, concise project entry based on the user's input.

**Instructions:**
1.  Extract the project title and a description from the user's message.
2.  **Focus on Results and Impact:** The description must highlight quantifiable achievements (metrics, percentages, dollar amounts, time saved) and key contributions. Use strong action verbs.
3.  **Keep it Concise:** Structure the description as 2-3 bullet points. Each bullet should start with a powerful action verb (e.g., "Engineered," "Led," "Increased," "Reduced").
4.  **Format Strictly:** Your response must be a valid JSON object with exactly the following structure. Do not include any other text before or after the JSON.

{
  "name": "Inferred or Creative Project Title",
  "description": "• Optimized the deployment pipeline, reducing release times by 30%.\\n• Led a team of 3 to implement a new feature, resulting in a 15% uptick in user engagement."
}
`;

  const userMessage = `
Generate a project entry based on the following description:
${description}
`;

  try {
    const pollinationsResponse = await fetch(
      "https://text.pollinations.ai/openai",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai",
          messages: [
            { role: "system", content: systemMessage },
            { role: "user", content: userMessage },
          ],
          temperature: 0.7,
          response_format: { type: "json_object" }, // Request structured JSON output
          private: true, // Keep the response private
        }),
      }
    );

    if (!pollinationsResponse.ok) {
      const errorData = await pollinationsResponse.json().catch(() => ({}));
      throw new Error(
        `Pollinations API error: ${pollinationsResponse.status} - ${
          pollinationsResponse.statusText
        } - ${JSON.stringify(errorData)}`
      );
    }
    const result = await pollinationsResponse.json();
    const generatedContent = result.choices?.[0]?.message?.content;
    const generatedProject = parseProjectString(generatedContent);

    return NextResponse.json({ project: generatedProject, status: 200 });
  } catch (error) {
    console.error("Error generating work experience:", error);
    return NextResponse.json({
      error: "Failed to generate work experience",
      status: 500,
    });
  }
}
