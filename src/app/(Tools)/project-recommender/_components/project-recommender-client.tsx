"use client"

import { useState, useRef, useEffect } from "react"
import { ProjectRecommenderForm, ProjectFormValues } from "./project-recommender-form"
import { ProjectOutput } from "./project-recommender-output"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown, Target, Zap, Code, Rocket, Trophy, Layers, Brain } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function ProjectRecommenderClient() {
  const [generatedProjects, setGeneratedProjects] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isOutputOpen, setIsOutputOpen] = useState(false)

  const outputRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const handleFormSubmit = async (data: ProjectFormValues) => {
    setIsLoading(true)
    setGeneratedProjects("")
    setError(null)
    setProgress(0)
    setIsOutputOpen(true) // Open on submit

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval)
          return prev
        }
        return prev + 5
      })
    }, 200)

    try {
      // Construct a professional project recommendation prompt
      const systemPrompt = `You are an AI project advisor for developers. Generate 3-5 personalized project recommendations based on the user's preferences.

Respond with a JSON array of project recommendations. Each project should have:
- id: unique identifier
- title: catchy project name
- description: detailed project description (2-3 sentences)
- features: array of 4-6 key features
- difficulty: "Beginner", "Intermediate", or "Advanced" (matching user's skill level or slightly above)
- techStack: array of recommended technologies (include user's known technologies when relevant)
- tags: array of relevant hashtags (e.g., #fullstack, #productivity, etc.)
- estimatedTime: realistic time estimate (e.g., "2-3 weeks")
- starterTutorials: array of tutorial topics (optional)
- githubBoilerplates: array of example GitHub repo URLs (use placeholder URLs)

Make sure projects are:
1. Relevant to the user's career focus and interest area
2. Appropriate for their skill level
3. Use technologies they know or want to learn
4. Solve real problems in their area of interest
5. Portfolio-worthy and impressive to employers

Return only valid JSON, no additional text.`;

      const userPrompt = `User Preferences:
- Known Tech Stack: ${data.techStack.join(', ')}
- Career Focus: ${data.careerFocus}
- Skill Level: ${data.skillLevel}
- Interest Areas: ${data.interestAreas.join(', ')}
- Time Commitment: ${data.timeCommitment}
${data.portfolioGoal ? `- Portfolio Goal: ${data.portfolioGoal}` : ''}
${data.additionalRequirements ? `- Additional Requirements: ${data.additionalRequirements}` : ''}`;

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "chat",
          prompt: userPrompt,
          options: {
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            model: "openai",
            temperature: 0.7,
            max_tokens: 3000,
          },
        }),
      });

      clearInterval(interval);
      setProgress(100);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (error) {
          errorData = {
            error: "An unexpected error occurred. Please try again.",
          };
        }
        throw new Error(
          errorData.error || `Request failed with status ${response.status}`
        );
      }

      const result = await response.json();
      let projectData = result.data;

      // Clean up the response if it contains JSON wrapped in text
      if (typeof projectData === 'string') {
        // Try to extract JSON from the response
        const jsonMatch = projectData.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          projectData = jsonMatch[0];
        }
      }

      setGeneratedProjects(projectData);
      toast.success("Projects Found!", {
        description: "Your personalized project recommendations are ready.",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Submission Error:", error)
      setError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
      setTimeout(() => setProgress(0), 1000)
    }
  }

  useEffect(() => {
    if ((generatedProjects || error) && isMobile && outputRef.current) {
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [generatedProjects, error, isMobile]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto p-8">
        <header className="text-center mb-16">
          <div className="mb-6">
            <Target className="h-12 w-12 text-gray-700 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              AI Project Recommender
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Get personalized project recommendations tailored to your skills and career goals
            </p>
          </div>
        </header>

        <main className="space-y-10 md:space-y-12">
          <div>
            <ProjectRecommenderForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>

          <div ref={outputRef}>
            <Collapsible
              open={isOutputOpen}
              onOpenChange={setIsOutputOpen}
              className="w-full"
            >
              {(isLoading || generatedProjects || error) && (
                <div className="flex items-center justify-between rounded-t-lg border border-gray-200 bg-white px-4 py-3">
                  <h4 className="font-semibold flex items-center gap-2 text-gray-900">
                    <Target className="h-4 w-4 text-gray-700" />
                    <span>Project Recommendations</span>
                  </h4>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-9 p-0 hover:bg-gray-100">
                      <ChevronsUpDown className="h-4 w-4 text-gray-600" />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
              )}

              <CollapsibleContent className="rounded-b-lg border border-gray-200 border-t-0 p-4 data-[state=closed]:hidden bg-white">
                <div className="space-y-4">
                  {isLoading && (
                    <div className="w-full space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                        <Zap className="h-4 w-4 animate-pulse" />
                        Analyzing your skills and finding perfect projects...
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}
                  {error && !isLoading && (
                    <div className="text-red-700 p-4 bg-red-50 rounded-md border border-red-200">
                      <div className="flex items-center gap-2 font-medium">
                        <Zap className="h-4 w-4" />
                        Error
                      </div>
                      <p className="mt-1">{error}</p>
                    </div>
                  )}
                  <ProjectOutput
                    generatedProjects={generatedProjects}
                    isLoading={isLoading}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </main>
      </div>
    </div>
  )
}
