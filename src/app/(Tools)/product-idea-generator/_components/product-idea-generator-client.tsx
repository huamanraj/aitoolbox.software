"use client"

import { useState, useRef, useEffect } from "react"
import { ProductIdeaGeneratorForm, ProductIdeaFormValues } from "./product-idea-generator-form"
import { ProductIdeaOutput } from "./product-idea-generator-output"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { 
  ChevronsUpDown, 
  Package, 
  Lightbulb, 
  Target, 
  Zap, 
  ShoppingBag, 
  Rocket, 
  Briefcase 
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import Link from "next/link"
import NativeBannerAd from "@/components/NativeBannerAd";
export default function ProductIdeaGeneratorClient() {
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
  const handleSubmit = async (data: ProductIdeaFormValues) => {
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
        throw new Error("Failed to generate product ideas")
      }

      const result = await response.json()
      setGeneratedIdeas(result.data)
      
      // Complete the progress bar
      setProgress(100)
      toast.success("Product ideas generated successfully!")
      
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
      console.error("Error generating product ideas:", error)
      toast.error("Failed to generate product ideas. Please try again.")
    } finally {
      setIsLoading(false)
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
        progressIntervalRef.current = null
      }
    }
  }

  // Generate AI prompt based on form data
  const generatePrompt = (data: ProductIdeaFormValues): string => {
    return `Generate 5 innovative and marketable ${data.pricePoint} product ideas for the ${data.industry} industry.

Target Market: ${data.targetMarket}
Product Types to Consider: ${data.productTypes.join(', ')}
Problem to Solve: ${data.problemToSolve}
${data.competitorProducts ? `Similar/Competitor Products: ${data.competitorProducts}` : ''}
${data.additionalInfo ? `Additional Information: ${data.additionalInfo}` : ''}

For each product idea, include:
1. A clear product name and brief description
2. The specific problem it solves
3. Key features and unique selling points
4. Target audience and use cases
5. Potential pricing strategy
6. Business model considerations
7. Market potential and competitive advantages

Format each idea with clear sections using markdown headers (##) and bullet points for structure and details. Make the ideas specific to the industry, practical for the target market, and commercially viable.`
  }

  // Related tools that might interest the user
  const relatedTools = [
    {
      name: "Startup Idea Generator",
      description: "Create business concepts",
      href: "/startup-idea-generator",
      icon: <Rocket className="h-5 w-5 text-gray-600" />,
    },
    {
      name: "Business Model Canvas",
      description: "Develop your business model",
      href: "/business-model-canvas",
      icon: <Briefcase className="h-5 w-5 text-gray-600" />,
    },
    {
      name: "Marketing Plan Creator",
      description: "Create product marketing plans",
      href: "/marketing-plan-creator",
      icon: <ShoppingBag className="h-5 w-5 text-gray-600" />,
    },
  ]

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        {/* Main Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 bg-clip-text text-transparent">
            Product Idea Generator
          </h1>
          <p className="mt-2 text-gray-600">Generate innovative product ideas with AI</p>
        </div>
        
        {/* Form Section */}
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full space-y-4"
        >
          <div className="flex items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-800">Generate Product Ideas</h2>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="space-y-4">
            <ProductIdeaGeneratorForm onSubmit={handleSubmit} isLoading={isLoading} />
          </CollapsibleContent>
        </Collapsible>

        {/* Progress Bar */}
        {isLoading && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Generating product ideas...</span>
              <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Output Section */}
        <div className="w-full">
          <ProductIdeaOutput generatedIdeas={generatedIdeas} isLoading={isLoading} />
        </div>

        {/* Related Tools */}
        {!isLoading && generatedIdeas && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-gray-600" />
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
        
      {/* Ad Banner */}
      <NativeBannerAd />

        {/* SEO Content - Server-side rendered */}
        <div className="mt-12 prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Idea Generator: Innovate with AI</h2>
          <p className="text-gray-600 mb-4">
            Creating innovative product ideas that solve real problems and have market potential can be challenging. 
            Our AI-powered Product Idea Generator helps entrepreneurs, product managers, and businesses develop 
            creative product concepts tailored to specific industries and target markets.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">How to Use the Product Idea Generator</h3>
          <ol className="space-y-3 text-gray-600 list-decimal list-inside mb-6">
            <li>Select your industry or category (e.g., Technology, Health &amp; Wellness, Home &amp; Kitchen)</li>
            <li>Define your target market</li>
            <li>Choose the types of products you&apos;re interested in (physical, digital, subscription, service)</li>
            <li>Select your preferred price point</li>
            <li>Describe the problem you want your product to solve</li>
            <li>Optionally add information about similar products or additional requirements</li>
            <li>Click &quot;Generate Product Ideas&quot; to receive innovative product concepts</li>
          </ol>
          
          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Benefits of Using Our Product Idea Generator</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-gray-600" />
                Overcome Creative Blocks
              </h4>
              <p className="text-gray-600 text-sm">
                Get fresh perspectives and innovative concepts when you&apos;re stuck in conventional thinking.
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <Target className="h-4 w-4 text-gray-600" />
                Market-Focused Ideas
              </h4>
              <p className="text-gray-600 text-sm">
                Generate product concepts tailored to specific industries and target audiences.
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4 text-gray-600" />
                Complete Product Concepts
              </h4>
              <p className="text-gray-600 text-sm">
                Receive comprehensive ideas including features, pricing strategies, and business models.
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <Rocket className="h-4 w-4 text-gray-600" />
                Accelerate Innovation
              </h4>
              <p className="text-gray-600 text-sm">
                Speed up your product development process with AI-generated starting points.
              </p>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Types of Products You Can Create</h3>
          <p className="text-gray-600 mb-4">
            Our tool can help you generate ideas for various types of products:
          </p>
          <ul className="space-y-2 text-gray-600 list-disc list-inside mb-6">
            <li>Physical consumer products</li>
            <li>Digital products and software</li>
            <li>Subscription-based services</li>
            <li>B2B solutions</li>
            <li>Mobile applications</li>
            <li>Smart devices and IoT products</li>
            <li>Health and wellness innovations</li>
            <li>Sustainable and eco-friendly products</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">From Idea to Market: Next Steps</h3>
          <p className="text-gray-600 mb-4">
            Once you&apos;ve generated product ideas, consider these next steps to bring your concept to market:
          </p>
          <ol className="space-y-3 text-gray-600 list-decimal list-inside mb-6">
            <li>Validate your idea with potential customers</li>
            <li>Create a prototype or minimum viable product</li>
            <li>Conduct market research to refine your concept</li>
            <li>Develop a business model and pricing strategy</li>
            <li>Create a marketing plan</li>
            <li>Secure funding or resources for development</li>
            <li>Build and launch your product</li>
          </ol>
          
          <p className="text-gray-600 mt-8">
            Whether you&apos;re an entrepreneur looking for your next venture, a product manager seeking innovation, 
            or an established business exploring new product lines, our Product Idea Generator provides the 
            creative spark you need to develop successful products that solve real problems.
          </p>
        </div>
      </div>
    </div>
  )
}