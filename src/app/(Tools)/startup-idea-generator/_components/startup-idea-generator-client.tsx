"use client"

import { useState, useRef, useEffect } from "react"
import { StartupIdeaGeneratorForm, StartupIdeaFormValues } from "./startup-idea-generator-form"
import { StartupIdeaOutput } from "./startup-idea-generator-output"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown, Rocket, Lightbulb, Zap, Briefcase } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import Link from "next/link"
import NativeBannerAd from "@/components/NativeBannerAd";
export default function StartupIdeaGeneratorClient() {
  const [generatedIdeas, setGeneratedIdeas] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isOpen, setIsOpen] = useState(true)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const isMobile = useIsMobile()

  // Clear progress interval on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  // Handle form submission
  const handleSubmit = async (data: StartupIdeaFormValues) => {
    setIsLoading(true)
    setGeneratedIdeas("")
    setProgress(0)

    // Start progress simulation
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
    
    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        // Slow down as we get closer to 90%
        const increment = prev < 30 ? 5 : prev < 60 ? 3 : prev < 80 ? 1 : 0.5
        const nextProgress = Math.min(prev + increment, 90)
        return nextProgress
      })
    }, 1000)

    try {
      const prompt = generatePrompt(data)
      
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "chat",
          prompt,
          options: {
            model: "openai",
            temperature: 0.7,
            max_tokens: 2500,
            messages: [{ role: "user", content: prompt }],
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate startup ideas")
      }

      const result = await response.json()
      setGeneratedIdeas(result.data)
      
      // Complete the progress bar
      setProgress(100)
      toast.success("Startup ideas generated successfully!")
      
      // If on mobile, close the form after generating
      if (isMobile) {
        setIsOpen(false)
      }
      
      // Scroll to results on mobile
      if (isMobile) {
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          })
        }, 100)
      }
    } catch (error) {
      console.error("Error generating startup ideas:", error)
      toast.error("Failed to generate startup ideas. Please try again.")
    } finally {
      setIsLoading(false)
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
        progressIntervalRef.current = null
      }
    }
  }

  // Generate AI prompt based on form data
  const generatePrompt = (data: StartupIdeaFormValues): string => {
    return `Generate 3 innovative and detailed startup ideas for the ${data.industry} industry.

Target Market: ${data.targetMarket}
Business Models to Consider: ${data.businessModels.join(', ')}
Funding Stage: ${data.fundingStage}
Problem to Solve: ${data.problemToSolve}
${data.techRequirements ? `Technology Requirements: ${data.techRequirements}` : ''}
${data.additionalInfo ? `Additional Information: ${data.additionalInfo}` : ''}

For each startup idea, include:
1. A catchy and descriptive startup name
2. A one-sentence value proposition
3. Problem statement - what specific pain point does this solve?
4. Target audience - who will benefit most from this solution?
5. Solution overview - how the product/service works
6. Key features and differentiators
7. Business model and monetization strategy
8. Technology requirements and implementation
9. Market opportunity and competitive landscape
10. Growth potential and scaling strategy

Format each idea with clear sections using markdown headers (##) and bullet points for features and details. Make the ideas realistic, innovative, and aligned with current market trends. Ensure they address the specific problem mentioned while being commercially viable.`
  }

  // Related tools that might interest the user
  const relatedTools = [
    {
      name: "Business Plan Generator",
      description: "Create detailed business plans",
      href: "/business-plan-generator",
      icon: <Briefcase className="h-5 w-5 text-gray-600" />,
    },
    {
      name: "Idea Generator",
      description: "Generate creative ideas",
      href: "/idea-generator",
      icon: <Lightbulb className="h-5 w-5 text-gray-600" />,
    },
    {
      name: "Marketing Plan Generator",
      description: "Create marketing strategies",
      href: "/marketing-plan-generator",
      icon: <Zap className="h-5 w-5 text-gray-600" />,
    },
  ]

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        {/* Form Section */}
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full space-y-4"
        >
          <div className="flex flex-col items-center space-y-4 w-full">
            <h2 className="text-2xl font-bold text-gray-800 text-center w-full">Generate Startup Ideas</h2>
            <CollapsibleTrigger asChild className="self-end -mt-8">
              <Button variant="ghost" size="sm" className="w-9 p-0 hover:bg-gray-100">
                <ChevronsUpDown className="h-4 w-4 text-gray-600" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="space-y-4">
            <StartupIdeaGeneratorForm onSubmit={handleSubmit} isLoading={isLoading} />
          </CollapsibleContent>
        </Collapsible>

        {/* Progress Bar */}
        {isLoading && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Generating startup ideas...</span>
              <span className="text-sm font-medium text-gray-800">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Output Section */}
        <div className="w-full">
          <StartupIdeaOutput generatedIdeas={generatedIdeas} isLoading={isLoading} />
        </div>
        {/* Ad Banner */}
           <NativeBannerAd />

          
        {/* Related Tools */}
        {!isLoading && generatedIdeas && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Rocket className="h-5 w-5 text-gray-600" />
              <span>Related Tools You Might Like</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedTools.map((tool, index) => (
                <Link
                  key={index}
                  href={tool.href}
                  className="flex items-start p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 mr-3">{tool.icon}</div>
                  <div>
                    <h4 className="font-medium text-gray-900">{tool.name}</h4>
                    <p className="text-sm text-gray-500">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 