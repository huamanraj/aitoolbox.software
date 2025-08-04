"use client"

import { useState, useRef, useEffect } from "react"
import { CoverLetterForm, CoverLetterFormValues } from "./cover-letter-form"
import { CoverLetterOutput } from "./cover-letter-output"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown, FileText, Star, Clock, ThumbsUp, Send, Settings, AlertCircle, RefreshCw, HelpCircle, FileEdit, User, Briefcase } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function CoverLetterClient() {
  const [generatedLetter, setGeneratedLetter] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isOutputOpen, setIsOutputOpen] = useState(false)
  const [currentFormData, setCurrentFormData] = useState<CoverLetterFormValues | null>(null)

  const outputRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const handleFormSubmit = async (data: CoverLetterFormValues) => {
    setIsLoading(true)
    setGeneratedLetter("")
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
      const response = await fetch("/api/cover-letter", {
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
      setGeneratedLetter(result.coverLetter)
      toast.success("Cover Letter Generated!", {
        description: "Your AI-powered cover letter is ready.",
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
    if ((generatedLetter || error) && isMobile && outputRef.current) {
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [generatedLetter, error, isMobile]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <section>
        <h2 className="sr-only">Cover Letter Generation Form</h2>
        <CoverLetterForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      </section>

      <div ref={outputRef} className="mt-6">
        <Collapsible
          open={isOutputOpen}
          onOpenChange={setIsOutputOpen}
          className="w-full"
        >
          {(isLoading || generatedLetter || error) && (
            <div className="flex items-center justify-between border bg-zinc-50 px-4 py-3 rounded-none">
              <h4 className="font-medium flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-zinc-600" />
                <span>Generated Cover Letter</span>
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
                    Generating your cover letter with AI...
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
              <CoverLetterOutput
                generatedLetter={generatedLetter}
                isLoading={isLoading}
                onRegenerate={handleRegenerate}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      {/* <article className="prose max-w-none mb-8">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
          <FileEdit className="h-6 w-6 text-primary" />
          AI Cover Letter Generator Tool
        </h1>

        <p className="mb-4">
          Struggling with crafting the perfect cover letter? Our AI Cover Letter Generator helps
          you create professional, persuasive cover letters in seconds. Whether
          you're applying for your dream job, changing careers, or seeking new opportunities - our tool helps
          you stand out from the competition every time.
        </p>

        <div className="bg-zinc-50 p-4 border rounded-md mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
            <Star className="h-5 w-5 text-amber-500" />
            Why Use Our Cover Letter Generator?
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Save time and boost your job application productivity</li>
            <li>Overcome writer's block when you can't find the right words</li>
            <li>Ensure professional tone and error-free communication</li>
            <li>Customized to your specific job and company</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border p-4 rounded-md">
            <h3 className="font-medium flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>Quick & Easy to Use</span>
            </h3>
            <p>
              Just fill in a few details about your experience, skills, and the job you're applying for,
              and our AI will generate a complete cover letter draft for you in seconds.
              You can then edit or use as-is.
            </p>
          </div>
          <div className="border p-4 rounded-md">
            <h3 className="font-medium flex items-center gap-2 mb-2">
              <ThumbsUp className="h-4 w-4 text-green-600" />
              <span>Human-like Quality</span>
            </h3>
            <p>
              Our advanced AI produces natural-sounding text that's
              indistinguishable from human writing. No more robotic or awkward
              phrasing in your job applications.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          How to Use the Cover Letter Generator
        </h2>
        <p className="mb-6">
          Simply fill out the form above with information about your
          background, the position you're applying for, and your key qualifications.
          Our AI will analyze your input and generate a professional cover letter that
          you can copy, modify, or use directly in your job applications. Try it now!
        </p>
      </article>

      <div className="mt-10 border-t pt-6">
        <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
          <Settings className="h-4 w-4 text-zinc-600" />
          Tips for Better Cover Letter Results
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Be specific about your relevant experience and achievements</li>
          <li>
            Include key details about the company and position you're applying for
          </li>
          <li>
            Mention any specific tone or style you prefer (professional, enthusiastic, etc.)
          </li>
          <li>Always review the AI-generated content before submitting your application</li>
        </ul>
        <p className="mt-4 text-sm text-zinc-500 flex items-center gap-2">
          <Send className="h-3 w-3" />
          While our AI produces high-quality content, we recommend reviewing all
          generated cover letters before submitting them to ensure they perfectly match
          your voice and the specific job requirements.
        </p>
      </div> */}
    </div>
  );
}