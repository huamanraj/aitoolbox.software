import {
  GenerateProjectInput,
  GenerateSummaryInput,
  generateSummarySchema,
  GenerateWorkExperienceInput,
  SummaryValues,
} from "@/lib/resume/validation";

interface WorkExperience {
  position?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}
interface Project {
  projectTitle?: string;
  description?: string;
}

interface ExpApiResponse {
  experience: WorkExperience;
  status: number;
}
interface ProApiResponse {
  project: Project;
  status: number;
}
interface SumApiResponse {
  summary: string;
  status: number;
}

export async function generateWorkExperience(
  input: GenerateWorkExperienceInput
): Promise<ExpApiResponse> {
  const response = await fetch("/api/resume/generate-work-experience", {
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

export async function generateProject(
  input: GenerateProjectInput
): Promise<ProApiResponse> {
  const response = await fetch("/api/resume/generate-project", {
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


export async function generateSummary(
  input: GenerateSummaryInput
): Promise<SumApiResponse> {
  const response = await fetch("/api/resume/generate-summary", {
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

