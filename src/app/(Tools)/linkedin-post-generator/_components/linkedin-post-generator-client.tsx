"use client"

import { useState, useRef, useEffect } from "react"
import { LinkedInPostGeneratorForm, LinkedInFormValues } from "./linkedin-post-generator-form"
import { LinkedInPostOutput } from "./linkedin-post-output"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown, Linkedin, Star, Clock, ThumbsUp, Copy, Settings, AlertCircle, RefreshCw, HelpCircle, FileEdit, User, FileText } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function LinkedInPostGeneratorClient() {
  const [generatedPost, setGeneratedPost] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isOutputOpen, setIsOutputOpen] = useState(false)
  const [currentFormData, setCurrentFormData] = useState<LinkedInFormValues | null>(null)

  const outputRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const handleFormSubmit = async (data: LinkedInFormValues) => {
    setIsLoading(true)
    setGeneratedPost("")
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
      const response = await fetch("/api/linkedin-post", {
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
      setGeneratedPost(result.data)
      toast.success("LinkedIn Post Generated!", {
        description: "Your professional post is ready to copy.",
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
    if ((generatedPost || error) && isMobile && outputRef.current) {
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [generatedPost, error, isMobile]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <section>
        <h2 className="sr-only">LinkedIn Post Generation Form</h2>
        <LinkedInPostGeneratorForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      </section>

      <div ref={outputRef} className="mt-6">
        <Collapsible
          open={isOutputOpen}
          onOpenChange={setIsOutputOpen}
          className="w-full"
        >
          {(isLoading || generatedPost || error) && (
            <div className="flex items-center justify-between border bg-zinc-50 px-4 py-3 rounded-none">
              <h4 className="font-medium flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-zinc-600" />
                <span>Generated LinkedIn Post</span>
              </h4>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-9 p-0 rounded-none"
                >
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
          )}

          <CollapsibleContent className="border border-t-0 p-4 data-[state=closed]:hidden rounded-none">
            <div className="space-y-4">
              {isLoading && (
                <div className="w-full space-y-2">
                  <div className="flex items-center gap-2 text-base text-zinc-600 font-medium">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Generating your LinkedIn post with AI...
                  </div>
                  <Progress value={progress} className="h-2 rounded-none" />
                </div>
              )}
              {error && !isLoading && (
                <div className="text-destructive p-4 bg-destructive/10 border border-destructive/20 rounded-none">
                  <div className="flex items-center gap-2 font-medium">
                    <AlertCircle className="h-4 w-4" />
                    Error
                  </div>
                  <p className="mt-1 text-base">{error}</p>
                </div>
              )}
              <LinkedInPostOutput
                generatedPost={generatedPost}
                isLoading={isLoading}
                onRegenerate={handleRegenerate}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <article className="prose max-w-none mb-8">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
          <FileEdit className="h-6 w-6 text-primary" />
          AI LinkedIn Post Generator Tool
        </h1>

        <p className="mb-4">
          Struggling to create engaging LinkedIn posts? Our AI LinkedIn Post Generator helps
          you craft professional, compelling content that drives engagement and builds your network.
          Whether you're sharing career updates, industry insights, or thought leadership content,
          our tool helps you create posts that stand out and generate meaningful connections.
        </p>

        <div className="bg-zinc-50 p-4 border rounded-md mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
            <Star className="h-5 w-5 text-amber-500" />
            Why Use Our LinkedIn Post Generator?
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Save time and overcome writer's block</li>
            <li>Create posts optimized for LinkedIn's algorithm</li>
            <li>Generate engaging hooks and compelling narratives</li>
            <li>Include relevant hashtags for better discoverability</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border p-4 rounded-md">
            <h3 className="font-medium flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>Quick & Professional</span>
            </h3>
            <p>
              Just provide your topic, select your tone, and our AI will generate a complete
              LinkedIn post with engaging hooks, compelling content, and relevant hashtags.
            </p>
          </div>
          <div className="border p-4 rounded-md">
            <h3 className="font-medium flex items-center gap-2 mb-2">
              <ThumbsUp className="h-4 w-4 text-green-600" />
              <span>Algorithm Optimized</span>
            </h3>
            <p>
              Our AI creates posts designed to perform well with LinkedIn's algorithm,
              including optimal length, structure, and hashtag usage for maximum engagement.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          How to Use the LinkedIn Post Generator
        </h2>
        <p className="mb-6">
          Simply fill out the form below with your topic, desired tone, and any key points
          you want to include. Our AI will analyze your input and generate a professional
          LinkedIn post that you can copy and paste directly to your profile. Try it now!
        </p>
      </article>

      <div className="mt-10 border-t pt-6">
        <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
          <Settings className="h-4 w-4 text-zinc-600" />
          Tips for Better LinkedIn Posts
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Be specific about your topic and target audience</li>
          <li>Choose a tone that matches your personal brand</li>
          <li>Include key points that add value to your network</li>
          <li>Always review and personalize the generated content</li>
        </ul>
        <p className="mt-4 text-sm text-zinc-500 flex items-center gap-2">
          <Copy className="h-3 w-3" />
          While our AI produces high-quality content, we recommend reviewing and personalizing
          all generated posts to ensure they perfectly match your voice and brand.
        </p>
      </div>
    </div>
  );
} 