import MockInterviewClient from "./_components/mock-interview-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MockInterviewPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
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

          {/* SSR SEO section similar to Project Recommender */}
          <div className="max-w-5xl mx-auto px-2 md:px-0">
            <Card>
              <CardHeader>
                <CardTitle>About AI Mock Interview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our AI Mock Interview is an advanced preparation tool for top tech roles. It simulates realistic interview scenarios,
                  asks role-specific questions, and provides structured, actionable feedback based on proven frameworks like STAR.
                </p>
                <p>
                  <strong>Who it helps:</strong> Software Engineers, Frontend/Backend Developers, DevOps, Data roles, Product Managers, and more.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Role-tailored question sets for Entry, Mid, and Senior levels</li>
                  <li>Behavioral, situational, and technical coverage</li>
                  <li>Immediate feedback with scores for clarity, structure, and relevance</li>
                  <li>STAR analysis (Situation, Task, Action, Result) when applicable</li>
                  <li>Final report with strengths, improvements, and next steps</li>
                </ul>
                <p>
                  <strong>How to use:</strong>
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Select a job role and level (or specify a custom role)</li>
                  <li>Optionally paste a job description for accurate tailoring</li>
                  <li>Choose number of questions and start the session</li>
                  <li>Type your answers; get structured feedback after each</li>
                  <li>Review the comprehensive final report to plan improvements</li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}


