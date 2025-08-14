"use client"

import { useState, useRef, useEffect } from "react"
import { AppIdeaGeneratorForm, AppIdeaFormValues } from "./app-idea-generator-form"
import { AppIdeaOutput } from "./app-idea-generator-output"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown, Sparkles, Zap, Smartphone, Rocket, Lightbulb, Code } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import Link from "next/link"
import NativeBannerAd from "@/components/NativeBannerAd";
export default function AppIdeaGeneratorClient() {
  const [generatedIdeas, setGeneratedIdeas] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isOutputOpen, setIsOutputOpen] = useState(false)

  const outputRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  // Related app tools with grayscale colors
  const relatedTools = [
    {
      name: "Idea Generator",
      href: "/idea-generator",
      icon: <Lightbulb className="h-4 w-4" />,
      color: "bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500"
    },
    {
      name: "Product Ideas",
      href: "/product-idea-generator",
      icon: <Rocket className="h-4 w-4" />,
      color: "bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600"
    },
    {
      name: "Startup Ideas",
      href: "/startup-idea-generator",
      icon: <Zap className="h-4 w-4" />,
      color: "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700"
    }
  ]

  const handleFormSubmit = async (data: AppIdeaFormValues) => {
    setIsLoading(true)
    setGeneratedIdeas("")
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
      // Construct a comprehensive prompt for the AI
      const systemPrompt = `
You are a professional mobile app development strategist who specializes in creating innovative, market-ready app concepts.
Your task is to generate a list of 5 creative, specific, and viable mobile app ideas based on the provided information.
Each idea should include:
1. A catchy app name and tagline
2. A clear value proposition and description (2-3 sentences)
3. Key features that would be included (4-6 bullet points)
4. Target audience and use cases
5. Potential monetization strategies
6. Technical considerations and implementation challenges

Format each idea clearly with proper markdown formatting for easy readability.
Make sure the ideas are practical, specific to the requirements, and provide real value to users.
Focus on innovative solutions that address real problems or enhance user experiences in meaningful ways.
Consider current technology trends, market opportunities, and user needs in your suggestions.
`;

      const userPrompt = `Generate 5 mobile app ideas based on these specifications:

App Category: ${data.appCategory}
Target Platform: ${data.targetPlatform.join(", ")}
Target Audience: ${data.targetAudience}
App Purpose: ${data.appPurpose.join(", ")}
Technical Complexity: ${data.technicalComplexity}
${data.keyFeatures ? `Must-Have Features: ${data.keyFeatures}` : ""}
${data.competitorApps ? `Similar/Competitor Apps: ${data.competitorApps}` : ""}
${data.additionalInfo ? `Additional Context: ${data.additionalInfo}` : ""}

Please provide 5 well-structured mobile app ideas with names, descriptions, features, target users, and monetization strategies.`;

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
            max_tokens: 2000,
          },
        }),
      });

      clearInterval(interval);
      setProgress(100);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = {
            error: "An unexpected error occurred. Please try again.",
          };
        }
        throw new Error(
          errorData.error || `Request failed with status ${response.status}`
        );
      }

      const result = await response.json();
      setGeneratedIdeas(result.data);
      toast.success("App Ideas Generated!", {
        description: "Your AI-powered app ideas are ready.",
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
    if ((generatedIdeas || error) && isMobile && outputRef.current) {
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [generatedIdeas, error, isMobile]);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8 md:mb-10 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 -top-10 bg-gradient-to-br from-gray-50/50 via-gray-50/30 to-gray-50/50 rounded-3xl -z-10"></div>
          
          <div className="relative pt-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-clip-text text-transparent mb-3">
              Mobile App Idea Generator
            </h1>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full mb-4">
              <Sparkles className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Powered by Advanced AI</span>
            </div>
            
            <p className="text-gray-600 mt-2 md:mt-3 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Generate innovative mobile app ideas and concepts for any platform or purpose with AI. 
              <span className="text-gray-700 font-medium"> Turn your vision into the next big app</span>.
            </p>

            {/* Related App Tools */}
            <div className="mt-6 md:mt-8">
              <p className="text-sm text-gray-600 mb-4 font-medium">
                Explore other idea generation tools:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                {relatedTools.map((tool) => (
                  <Link key={tool.name} href={tool.href}>
                    <Button
                      size="sm"
                      className="bg-gray-600 hover:bg-gray-700 text-white text-xs md:text-sm px-3 py-2 h-auto shadow-md transition-all duration-200 transform hover:scale-105"
                    >
                      <span className="mr-2">{tool.icon}</span>
                      {tool.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </header>

        <main className="space-y-6 md:space-y-8">
          <div>
            <AppIdeaGeneratorForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>

          <div ref={outputRef}>
            <Collapsible
              open={isOutputOpen}
              onOpenChange={setIsOutputOpen}
              className="w-full"
            >
              {(isLoading || generatedIdeas || error) && (
                <div className="flex items-center justify-between rounded-t-lg border bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-gray-600" />
                    <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">
                      Generated App Ideas
                    </span>
                  </h4>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-9 p-0 hover:bg-gray-100">
                      <ChevronsUpDown className="h-4 w-4 text-gray-600" />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
              )}
              
              
              <CollapsibleContent className="rounded-b-lg border border-t-0 p-4 data-[state=closed]:hidden">
                <div className="space-y-4">
                  {isLoading && (
                    <div className="w-full space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                        <Zap className="h-4 w-4 animate-pulse" />
                        Generating your app ideas...
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}
                  {error && !isLoading && (
                    <div className="text-destructive p-4 bg-destructive/10 rounded-md border border-destructive/20">
                      <div className="flex items-center gap-2 font-medium">
                        <Zap className="h-4 w-4" />
                        Error
                      </div>
                      <p className="mt-2 text-sm">{error}</p>
                    </div>
                  )}
                  {!isLoading && !error && generatedIdeas && (
                    <AppIdeaOutput generatedIdeas={generatedIdeas} isLoading={isLoading} />
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </main>
      </div>
      {/* Ad Banner */}
     <NativeBannerAd />

    </div>
  )
}