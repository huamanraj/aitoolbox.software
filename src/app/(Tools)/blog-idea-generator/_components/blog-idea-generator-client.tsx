"use client"

import { useState, useRef, useEffect } from "react"
import { BlogIdeaGeneratorForm, BlogIdeaFormValues } from "./blog-idea-generator-form"
import { BlogIdeaOutput } from "./blog-idea-generator-output"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown, Sparkles, Zap, PenTool, BookOpen, FileText, Newspaper } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import Link from "next/link"
import NativeBannerAd from "@/components/NativeBannerAd";

export default function BlogIdeaGeneratorClient() {
  const [generatedIdeas, setGeneratedIdeas] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isOutputOpen, setIsOutputOpen] = useState(false)

  const outputRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  // Related blog tools
  const relatedTools = [
    {
      name: "Blog Writer",
      href: "/blog-writer",
      icon: <PenTool className="h-4 w-4" />,
      color: "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
    },
    {
      name: "Idea Generator",
      href: "/idea-generator",
      icon: <Sparkles className="h-4 w-4" />,
      color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
    },
    {
      name: "Grammar Fixer",
      href: "/grammar-fixer",
      icon: <FileText className="h-4 w-4" />,
      color: "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
    }
  ]

  const handleFormSubmit = async (data: BlogIdeaFormValues) => {
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
You are a professional blog content strategist who specializes in creating engaging, SEO-optimized blog post ideas.
Your task is to generate a list of 10 creative, specific, and clickable blog post ideas based on the provided information.
Each idea should include:
1. An attention-grabbing headline (using proven formulas like how-to, listicles, questions, etc.)
2. A brief description (1-2 sentences) explaining what the post will cover
3. Key points or sections that could be included (3-5 bullet points)
4. Target keywords to include

Format each idea clearly with proper markdown formatting for easy readability.
Make sure the ideas are practical, specific to the niche/industry, and provide real value to readers.
Avoid generic topics that have been overdone, and focus on unique angles, current trends, and addressing specific pain points.
`;

      const userPrompt = `Generate 10 blog post ideas based on these specifications:

Blog Niche/Topic: ${data.blogNiche}
Target Audience: ${data.targetAudience}
Content Goals: ${data.contentGoals.join(", ")}
Preferred Post Types: ${data.postTypes.join(", ")}
${data.keywords ? `Target Keywords: ${data.keywords}` : ""}
${data.competitorTopics ? `Competitor Topics to Beat: ${data.competitorTopics}` : ""}
${data.additionalInfo ? `Additional Context: ${data.additionalInfo}` : ""}

Please provide 10 well-structured blog post ideas with headlines, descriptions, key points, and target keywords.`;

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
      toast.success("Blog Ideas Generated!", {
        description: "Your AI-powered blog ideas are ready.",
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
          <div className="absolute inset-0 -top-10 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 rounded-3xl -z-10"></div>
          
          <div className="relative pt-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-clip-text text-transparent mb-3">
              Blog Post Idea Generator
            </h1>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full mb-4">
              <BookOpen className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Powered by Advanced AI</span>
            </div>
            
            <p className="text-gray-600 mt-2 md:mt-3 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Generate engaging blog post ideas and titles for any topic or niche with AI. 
              <span className="text-gray-700 font-medium"> Create content that drives traffic and engages readers</span>.
            </p>

            {/* Related Blog Tools */}
            <div className="mt-6 md:mt-8">
              <p className="text-sm text-gray-500 mb-4 font-medium">
                Complete your content creation workflow with these tools:
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                {relatedTools.map((tool) => (
                  <Link key={tool.name} href={tool.href}>
                    <Button
                      size="sm"
                      className="bg-gray-600 hover:bg-gray-700 text-white text-xs md:text-sm px-3 py-2 h-auto shadow-md transition-all duration-200 transform hover:scale-105"
                    >
                      <span className="mr-2 text-gray-200">{tool.icon}</span>
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
            <BlogIdeaGeneratorForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
          
          <div ref={outputRef}>
            <Collapsible
              open={isOutputOpen}
              onOpenChange={setIsOutputOpen}
              className="w-full"
            >
              {(isLoading || generatedIdeas || error) && (
                <div className="flex items-center justify-between rounded-t-lg border bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Newspaper className="h-4 w-4 text-indigo-600" />
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Generated Blog Ideas
                    </span>
                  </h4>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-9 p-0 hover:bg-indigo-100">
                      <ChevronsUpDown className="h-4 w-4 text-indigo-600" />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
              )}
              
              <CollapsibleContent className="rounded-b-lg border border-t-0 p-4 data-[state=closed]:hidden">
                <div className="space-y-4">
                  {isLoading && (
                    <div className="w-full space-y-2">
                      <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium">
                        <Zap className="h-4 w-4 animate-pulse" />
                        Generating your blog post ideas...
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
                      <p className="mt-1">{error}</p>
                    </div>
                  )}
                  <BlogIdeaOutput
                    generatedIdeas={generatedIdeas}
                    isLoading={isLoading}
                  />
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