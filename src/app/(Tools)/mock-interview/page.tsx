import MockInterviewClient from "./_components/mock-interview-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Mock Interview - Practice Tech Interviews | AI Toolbox",
  description:
    "Practice realistic mock interviews for top tech roles (Software Engineer, Frontend, Backend, DevOps, Data, PM). Get structured feedback with STAR analysis and detailed scoring. Free AI-powered interview preparation.",
  keywords: [
    "AI mock interview",
    "software engineer interview",
    "frontend interview",
    "backend interview",
    "data scientist interview",
    "devops interview",
    "product manager interview",
    "STAR method",
    "interview preparation",
    "technical interview practice",
    "behavioral interview",
    "coding interview prep",
  ],
  authors: [{ name: "AI Toolbox" }],
  creator: "AI Toolbox",
  publisher: "AI Toolbox",
  alternates: {
    canonical: "https://aitoolbox.software/mock-interview"
  },
  openGraph: {
    type: "website",
    url: "https://aitoolbox.software/mock-interview",
    title: "AI Mock Interview - Practice Tech Interviews",
    description:
      "Practice realistic interviews tailored to your role and level. Get detailed feedback: STAR analysis, strengths, improvements, and score tables.",
    siteName: "AI Toolbox",
    images: [
      {
        url: "/mainOG.webp",
        width: 1200,
        height: 630,
        alt: "AI Toolbox AI Mock Interview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Mock Interview - Practice Tech Interviews",
    description:
      "Role-specific interview questions with structured feedback and STAR analysis.",
    images: ["/mainOG.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function MockInterviewPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AI Mock Interview",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    description:
      "Practice realistic mock interviews for tech roles with AI-powered feedback and STAR analysis.",
    url: "https://aitoolbox.software/mock-interview",
    offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  } as const;
  return (
    <div className="container mx-auto p-4 md:p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
            AI Mock Interview
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-center">
            Practice realistic interviews tailored to your role and experience. Get instant, detailed feedback to improve fast.
          </p>
        </header>

        <main className="space-y-10">
          <MockInterviewClient />

          {/* SSR SEO section */}
          <Card>
            <CardHeader>
              <CardTitle>About AI Mock Interview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our AI Mock Interview is an advanced preparation tool for top tech roles. It simulates realistic interview scenarios,
                asks role-specific questions, and provides structured, actionable feedback based on proven frameworks like STAR 
                (Situation, Task, Action, Result).
              </p>
              <p>
                <strong>Who it helps:</strong> Software Engineers, Frontend/Backend Developers, DevOps, Data Scientists, Data Analysts, 
                Product Managers, QA Engineers, and more—from entry-level to senior positions.
              </p>
              <h3 className="font-semibold text-lg mt-6">Key Features</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Role-Tailored Questions:</strong> Get questions customized for your specific job title and experience level</li>
                <li><strong>Comprehensive Coverage:</strong> Behavioral, situational, and technical questions in one session</li>
                <li><strong>Instant Detailed Feedback:</strong> Receive scores for clarity, structure, and relevance after each answer</li>
                <li><strong>STAR Method Analysis:</strong> Get feedback on how well you used the STAR framework in behavioral questions</li>
                <li><strong>Strengths & Improvements:</strong> Specific examples of what you did well and actionable tips to improve</li>
                <li><strong>Final Performance Report:</strong> Comprehensive summary with average scores and strategic recommendations</li>
                <li><strong>Job Description Integration:</strong> Paste a JD for even more targeted, relevant questions</li>
                <li><strong>Progress Tracking:</strong> Visual indicators show exactly where you are in the interview</li>
              </ul>
              
              <h3 className="font-semibold text-lg mt-6">How to Use</h3>
              <ol className="list-decimal pl-6 space-y-3">
                <li><strong>Select Your Role:</strong> Choose from 15+ popular tech roles or specify a custom position</li>
                <li><strong>Set Experience Level:</strong> Pick Entry, Mid, or Senior level for appropriately challenging questions</li>
                <li><strong>Optional - Add Job Description:</strong> Paste the JD for ultra-targeted questions matching the real role</li>
                <li><strong>Choose Question Count:</strong> Select 5-10 questions based on how much time you have (we recommend 6-8)</li>
                <li><strong>Start Interview:</strong> Click "Start Interview" and begin answering one question at a time</li>
                <li><strong>Provide Detailed Answers:</strong> Type thorough responses (3-5 sentences minimum). Use STAR method for behavioral questions</li>
                <li><strong>Review Instant Feedback:</strong> After each answer, get detailed scores, strengths, and improvement tips</li>
                <li><strong>Complete All Questions:</strong> Progress through all questions—your answers carry over between questions</li>
                <li><strong>Get Final Report:</strong> Review comprehensive feedback with overall performance summary and action items</li>
              </ol>

              <h3 className="font-semibold text-lg mt-6">Tips for Best Results</h3>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">📝 Answer Quality</h4>
                    <p className="text-sm text-muted-foreground">
                      Write 3-5 sentences minimum. Be specific with examples, numbers, and outcomes. 
                      Treat it like a real interview—don't rush!
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">⭐ STAR Method</h4>
                    <p className="text-sm text-muted-foreground">
                      For behavioral questions, structure answers: Situation (context), Task (challenge), 
                      Action (what you did), Result (outcome/impact).
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">🎯 Be Honest</h4>
                    <p className="text-sm text-muted-foreground">
                      Answer authentically to get useful feedback. This is practice—it's better to identify 
                      weak areas now than in a real interview.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">🔄 Practice Multiple Times</h4>
                    <p className="text-sm text-muted-foreground">
                      Run multiple sessions with different roles/levels. Track improvement over time and 
                      refine your answers based on feedback.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">How realistic are the interview questions?</h4>
                <p className="text-sm text-muted-foreground">
                  Our AI generates questions based on real interview patterns for each role and level. Questions cover behavioral, 
                  situational, and technical areas commonly asked at top tech companies like Google, Amazon, Microsoft, and startups.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">How is the feedback generated?</h4>
                <p className="text-sm text-muted-foreground">
                  Our AI evaluates your answers using professional interview coaching frameworks. It scores clarity (how well-articulated), 
                  structure (logical flow), and relevance (how well you addressed the question), plus provides STAR analysis for behavioral questions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Can I save my interview results?</h4>
                <p className="text-sm text-muted-foreground">
                  Currently, you can copy the final report using the "Copy Report" button. We recommend pasting it into a document to track 
                  your progress over multiple practice sessions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">How many questions should I choose?</h4>
                <p className="text-sm text-muted-foreground">
                  We recommend 6-8 questions for a balanced practice session (15-25 minutes). Choose 5 for quick practice, or 10 for a full interview simulation.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What's the STAR method?</h4>
                <p className="text-sm text-muted-foreground">
                  STAR (Situation, Task, Action, Result) is a structured approach to answering behavioral interview questions. 
                  Describe the context, your objective, specific actions you took, and measurable results. Our AI analyzes how well 
                  you used this framework.
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}


