import { parseExperienceString } from "@/lib/resume/ResumeUtils";
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
  You are a job resume generator AI. Your task is to generate a single work experience entry based on the user input.
  Your response must adhere to the following structure. You can omit fields if they can't be inferred from the provided data, but don't add any new ones.

  Job title: <job title>
  Company: <company name>
  Start date: <format: YYYY-MM-DD> (only if provided)
  End date: <format: YYYY-MM-DD> (only if provided)
  Description: <an optimized description in bullet format, each bullet point in the description must start with a '•' character, might be inferred from the job title>
  `;

  const userMessage = `
  Please provide a work experience entry from this description:
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

    const generatedExperience = parseExperienceString(generatedContent);

    return NextResponse.json({ experience: generatedExperience, status: 200 });
  } catch (error) {
    console.error("Error generating work experience:", error);
    return NextResponse.json({
      error: "Failed to generate work experience",
      status: 500,
    });
  }
}

