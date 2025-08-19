import {
  GenerateSummaryInput,
  generateSummarySchema,
  GenerateWorkExperienceInput,
} from "@/lib/resume/validation";

interface WorkExperience {
  position?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

interface ApiResponse {
  experience: WorkExperience;
  status: number;
}

export async function generateWorkExperience(
  input: GenerateWorkExperienceInput
): Promise<ApiResponse> {
  const response = await fetch("/api/generate-work-experience", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to generate work experience");
  }

  return response.json();
}

