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
            <div className="flex items-center justify-between border bg-zinc-50 px-4 py-3 rounded-lg">
              <h4 className="font-medium flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-zinc-600" />
                <span>Generated Cover Letter</span>
              </h4>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-9 p-0"
                >
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
          )}

          <CollapsibleContent className="border border-t-0 p-4 data-[state=closed]:hidden rounded-b-lg">
            <div className="space-y-4">
              {isLoading && (
                <div className="w-full space-y-2">
                  <div className="flex items-center gap-2 text-base text-zinc-600 font-medium">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Generating your cover letter with AI...
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
              {error && !isLoading && (
                <div className="text-destructive p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
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
    </div>
  );
}