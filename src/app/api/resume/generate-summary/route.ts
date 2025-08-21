import { Education, WorkExperience } from "@/lib/resume/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed", status: 405 });
  }

  const data = await req.json();

  if (!data) {
    return NextResponse.json({ error: "Data is required", status: 400 });
  }

  const { jobTitle, workExperiences, educations, skills } = data;

  const systemMessage = `
    You are a job resume generator AI. Your task is to write a professional introduction summary for a resume given the user's provided data.
    Only return the summary and do not include any other information in the response. Keep it concise and professional.(45 words approx)
    `;

  const userMessage = `
    Please generate a professional resume summary from this data:

    Job title: ${jobTitle || "N/A"}

    Work experience:
    ${workExperiences
      ?.map(
        (exp: WorkExperience) => `
        Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${
          exp.startDate || "N/A"
        } to ${exp.endDate || "Present"}

        Description:
        ${exp.description || "N/A"}
        `
      )
      .join("\n\n")}

      Education:
    ${educations
      ?.map(
        (edu: Education) => `
        Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${
          edu.startDate || "N/A"
        } to ${edu.endDate || "N/A"}
        `
      )
      .join("\n\n")}

      Skills:
      ${skills}
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
    const parsedContent = JSON.parse(generatedContent);
    return NextResponse.json({ ...parsedContent, status: 200 });
  } catch (error) {
    console.error("Error generating work experience:", error);
    return NextResponse.json({
      error: "Failed to generate work experience",
      status: 500,
    });
  }
}
