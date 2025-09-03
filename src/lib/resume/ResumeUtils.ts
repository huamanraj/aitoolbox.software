import { WorkExperience } from "./validation";

export function parseExperienceString(
  experienceString: string
): WorkExperience {
  // First try to parse as JSON if the string is already in JSON format
  try {
    const jsonResponse = JSON.parse(experienceString);
    if (jsonResponse["Job title"]) {
      return {
        position: jsonResponse["Job title"],
        company: jsonResponse["Company"],
        description: Array.isArray(jsonResponse["Description"])
          ? jsonResponse["Description"].join("\n")
          : jsonResponse["Description"],
        startDate: jsonResponse["Start date"],
        endDate: jsonResponse["End date"],
      };
    }
  } catch (e) {
    // Not JSON, continue with text parsing
  }

  // Fallback to text parsing
  const generatedExperience = {
    position:
      experienceString.match(/Job title: (.*)/)?.[1]?.trim() ||
      experienceString.match(/"Job title":\s*"([^"]*)"/)?.[1]?.trim() ||
      "",
    company:
      experienceString.match(/Company: (.*)/)?.[1]?.trim() ||
      experienceString.match(/"Company":\s*"([^"]*)"/)?.[1]?.trim() ||
      "",
    description:
      experienceString.match(/Description:([\s\S]*?)(?=\n\w|$)/)?.[1]?.trim() ||
      experienceString.match(/"Description":\s*\[([^\]]*)\]/s)?.[1]?.trim() ||
      "",
    startDate:
      experienceString.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1] ||
      experienceString.match(/"Start date":\s*"([^"]*)"/)?.[1],
    endDate:
      experienceString.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1] ||
      experienceString.match(/"End date":\s*"([^"]*)"/)?.[1],
  };

  // Clean up the description
  if (generatedExperience.description) {
    // Handle both bullet points and array formats
    generatedExperience.description = generatedExperience.description
      .split("\n")
      .map((line) =>
        line
          .replace(/^- /, "") // Remove bullet points
          .replace(/^"(.*)"(,?)$/, "$1") // Remove JSON quotes
          .trim()
      )
      .filter((line) => line.length > 0)
      .join("\n");
  }

  return generatedExperience;
}

interface Project {
  name: string;
  description: string;
  url ?: string;
}

export function parseProjectString(input: string): Project {
  try {
    // First, try to parse the entire string as JSON
    const parsed = JSON.parse(input);

    // Validate the structure
    if (parsed.name && parsed.description) {
      return {
        name: parsed.name,
        description: parsed.description,
        url: ""
      };
    }

    throw new Error("Invalid JSON structure");
  } catch (error) {
    // If parsing fails, try to extract from the string format
    return extractProjectFromString(input);
  }
}

function extractProjectFromString(input: string): Project {
  const cleanedInput = input.trim();

  // Remove any surrounding quotes or unwanted characters
  const sanitizedInput = cleanedInput
    .replace(/^\{|\}$/g, "") // Remove surrounding braces if present
    .replace(/^"|"$/g, "") // Remove surrounding quotes
    .trim();

  // Extract name using regex
  const titleMatch =
    sanitizedInput.match(/"name":\s*"([^"]*)"/) ||
    sanitizedInput.match(/name:\s*"([^"]*)"/) ||
    sanitizedInput.match(/"name":\s*'([^']*)'/) ||
    sanitizedInput.match(/name:\s*'([^']*)'/);

  // Extract description using regex
  const descMatch =
    sanitizedInput.match(/"description":\s*"([^"]*)"/) ||
    sanitizedInput.match(/description:\s*"([^"]*)"/) ||
    sanitizedInput.match(/"description":\s*'([^']*)'/) ||
    sanitizedInput.match(/description:\s*'([^']*)'/);

  const name = titleMatch ? titleMatch[1] : "Untitled Project";
  const description = descMatch ? descMatch[1] : "No description available";

  // Handle escaped characters (like \n) in the description
  const processedDescription = description
    .replace(/\\n/g, "\n") // Convert \n to actual newlines
    .replace(/\\"/g, '"') // Convert \" to "
    .replace(/\\'/g, "'"); // Convert \' to '

  return {
    name,
    description: processedDescription,
    url : ""
  };
}
