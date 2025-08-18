import { CoverLetterClient } from "./_components/cover-letter-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Cover Letter Generator - Create Professional Cover Letters Instantly",
  description:
    "Generate professional, well-crafted cover letters for any job application with our AI-powered tool. Save time and land more interviews.",
};

const coverLetterTypes = [
  {
    title: "Entry-Level Positions",
    description:
      "Create compelling cover letters for graduates and career starters.",
  },
  {
    title: "Career Change",
    description:
      "Highlight transferable skills when switching industries or roles.",
  },
  {
    title: "Senior Positions",
    description:
      "Showcase leadership experience and strategic accomplishments.",
  },
  {
    title: "Remote Work",
    description:
      "Emphasize remote work skills and self-management abilities.",
  },
  {
    title: "Creative Industries",
    description:
      "Craft engaging letters that showcase creativity and passion.",
  },
  {
    title: "Technical Roles",
    description:
      "Balance technical expertise with communication skills effectively.",
  },
];

export default function CoverLetterPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
            AI Cover Letter Generator
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-center">
            Create professional, personalized cover letters in seconds. Just provide
            your details and experience,
            <br className="hidden sm:inline" /> and our AI will craft the
            perfect letter for any job application.
          </p>
        </header>
        <main>
          <CoverLetterClient />
        </main>

        <div className="grid gap-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {coverLetterTypes.map((type, index) => (
              <div key={index} className="border p-4 bg-white">
                <h3 className="font-medium mb-1">{type.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <ol className="list-decimal ml-5 space-y-2">
            <li>Enter your personal details and the job information you're applying for</li>
            <li>Describe your relevant experience, skills, and accomplishments</li>
            <li>
              Choose your preferred tone and length for the cover letter
            </li>
            <li>
              Click generate and get a professionally crafted cover letter in seconds
            </li>
            <li>
              Edit the result or copy directly to use in your job applications
            </li>
          </ol>
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Cover Letter Writing Tips</h2>
          <ul className="space-y-4">
            <li>
              <strong>Tailor to the job:</strong> Customize each cover letter
              for the specific position and company.
            </li>
            <li>
              <strong>Show enthusiasm:</strong> Express genuine interest in
              the role and organization.
            </li>
            <li>
              <strong>Quantify achievements:</strong> Use specific numbers and
              metrics when describing your accomplishments.
            </li>
            <li>
              <strong>Address the hiring manager:</strong> Try to find and use
              the hiring manager's name when possible.
            </li>
            <li>
              <strong>Keep it concise:</strong> Aim for one page and focus on
              your most relevant qualifications.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}