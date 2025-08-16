"use client"

import { useState, useRef, useEffect } from "react"
import { ProductDescriptionForm, ProductFormValues } from "./product-description-form"
import { ProductDescriptionOutput } from "./product-description-output"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown, Package, Star, Clock, ThumbsUp, Send, Settings, AlertCircle, RefreshCw, HelpCircle, ShoppingCart } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function ProductDescriptionClient() {
  const [generatedDescription, setGeneratedDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isOutputOpen, setIsOutputOpen] = useState(false)
  const [currentFormData, setCurrentFormData] = useState<ProductFormValues | null>(null)

  const outputRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const handleFormSubmit = async (data: ProductFormValues) => {
    setIsLoading(true)
    setGeneratedDescription("")
    setError(null)
    setProgress(0)
    setIsOutputOpen(true)
    setCurrentFormData(data)

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
      const response = await fetch("/api/product-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      clearInterval(interval)
      setProgress(100)

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (_) {
          errorData = { error: "An unexpected error occurred. Please try again." }
        }
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      const result = await response.json()
      setGeneratedDescription(result.data)
      toast.success("Product Description Generated!", {
        description: "Your AI-powered product description is ready.",
      })
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

  const handleRegenerate = () => {
    if (currentFormData) {
      handleFormSubmit(currentFormData)
    }
  }

  useEffect(() => {
    if ((generatedDescription || error) && isMobile && outputRef.current) {
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [generatedDescription, error, isMobile]);

  return (
    <div className="space-y-8">
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
          <Package className="mr-2 h-5 w-5" />
          Product Description Generation Form
        </h2>
        <ProductDescriptionForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      </div>

      <div ref={outputRef}>
        {(isLoading || generatedDescription || error) && (
          <Collapsible open={isOutputOpen} onOpenChange={setIsOutputOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full">
                <h4 className="text-lg font-medium">Generated Product Description</h4>
                <ChevronsUpDown className="h-4 w-4 ml-2" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="bg-card border border-border rounded-lg p-6">
                {isLoading && (
                  <div className="space-y-4">
                    <Progress value={progress} className="w-full" />
                    <p className="text-center text-muted-foreground flex items-center justify-center">
                      <Package className="mr-2 h-4 w-4 animate-spin" />
                      Generating your product description with AI...
                    </p>
                  </div>
                )}
                {error && !isLoading && (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-destructive mb-2">Error</h3>
                    <p className="text-muted-foreground mb-4">{error}</p>
                  </div>
                )}
                <ProductDescriptionOutput
                  generatedDescription={generatedDescription}
                  isLoading={isLoading}
                  onRegenerate={handleRegenerate}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>

      <div className="bg-card border border-border rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            AI Product Description Generator Tool
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Transform your product features into compelling, conversion-focused descriptions that sell. 
            Our AI understands the psychology of online shopping and crafts descriptions that highlight 
            benefits, address customer concerns, and drive purchases.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Why Use Our Product Description Generator?</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Star className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-muted-foreground">Save hours of writing time with instant generation</span>
              </li>
              <li className="flex items-start">
                <ThumbsUp className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-muted-foreground">Create compelling copy that converts browsers to buyers</span>
              </li>
              <li className="flex items-start">
                <Settings className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-muted-foreground">Customize tone and style for your target audience</span>
              </li>
              <li className="flex items-start">
                <ShoppingCart className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-muted-foreground">Generate SEO-optimized descriptions that rank well</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick & Easy to Use</h3>
            <p className="text-muted-foreground mb-4">
              Simply provide your product name, key features, and target audience. Our AI analyzes 
              successful e-commerce copy patterns to create descriptions that highlight benefits, 
              build desire, and encourage purchases.
            </p>
            <p className="text-muted-foreground">
              Choose from multiple tone options to match your brand voice, from professional and 
              technical to playful and luxurious. Perfect for any product category or market.
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">How to Use the Product Description Generator</h3>
          <p className="text-muted-foreground mb-6">
            Fill out the form above with your product details, select your preferred tone, and let our AI 
            create a compelling description. You can regenerate multiple versions and edit the results 
            to perfectly match your needs.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-2">Tips for Better Results</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Be specific about key features and specifications</li>
                <li>• Clearly define your target audience</li>
                <li>• Include any unique selling points or differentiators</li>
                <li>• Mention if there are any special use cases or benefits</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Best Practices</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Review and customize the generated content</li>
                <li>• Test different tones for your audience</li>
                <li>• Add specific details about sizing, materials, or compatibility</li>
                <li>• Include relevant keywords for SEO optimization</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            💡 <strong>Pro Tip:</strong> While our AI generates high-quality content, always review and customize 
            the output to ensure it perfectly represents your brand voice and product details.
          </p>
        </div>
      </div>
    </div>
  );
}
