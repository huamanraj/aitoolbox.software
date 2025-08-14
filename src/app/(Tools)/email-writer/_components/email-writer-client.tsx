"use client"

import { useState, useRef, useEffect } from "react"
import { EmailWriterForm, EmailFormValues } from "./email-writer-form"
import { EmailOutput } from "./email-output"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown, Mail, Star, Clock, ThumbsUp, Send, Settings, AlertCircle, RefreshCw, HelpCircle, FileEdit, User, FileText } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import NativeBannerAd from "@/components/NativeBannerAd";
export default function EmailWriterClient() {
  const [generatedEmail, setGeneratedEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isOutputOpen, setIsOutputOpen] = useState(false)
  const [currentFormData, setCurrentFormData] = useState<EmailFormValues | null>(null)

  const outputRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const handleFormSubmit = async (data: EmailFormValues) => {
    setIsLoading(true)
    setGeneratedEmail("")
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
      const response = await fetch("/api/email", {
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
      setGeneratedEmail(result.data)
      toast.success("Email Generated!", {
        description: "Your AI-powered email is ready.",
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
    if ((generatedEmail || error) && isMobile && outputRef.current) {
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [generatedEmail, error, isMobile]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <section>
        <h2 className="sr-only">Email Generation Form</h2>
        <EmailWriterForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      </section>
  
      <div ref={outputRef} className="mt-6">
        <Collapsible
          open={isOutputOpen}
          onOpenChange={setIsOutputOpen}
          className="w-full"
        >
          {(isLoading || generatedEmail || error) && (
            <div className="flex items-center justify-between border bg-zinc-50 px-4 py-3 rounded-none">
              <h4 className="font-medium flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-zinc-600" />
                <span>Generated Email</span>
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
                    Generating your email with AI...
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
              <EmailOutput
                generatedEmail={generatedEmail}
                isLoading={isLoading}
                onRegenerate={handleRegenerate}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      {/* Ad Banner */}
      <NativeBannerAd />

      <article className="prose max-w-none mb-8">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
          <FileEdit className="h-6 w-6 text-primary" />
          AI Email Writer Tool
        </h1>

        <p className="mb-4">
          Struggling with crafting the perfect email? Our AI Email Writer helps
          you create professional, persuasive emails in seconds. Whether
          you&apos;re reaching out to potential clients, following up with
          customers, or sending important updates to your team - our tool helps
          you sound confident and natural every time.
        </p>

        <div className="bg-zinc-50 p-4 border rounded-md mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
            <Star className="h-5 w-5 text-amber-500" />
            Why Use Our Email Writer?
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Save time and boost your productivity</li>
            <li>Overcome writers block when you cant find the right words</li>
            <li>Ensure profesional tone and error-free communication</li>
            <li>Customized to your specific needs and audience</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border p-4 rounded-md">
            <h3 className="font-medium flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>Quick & Easy to Use</span>
            </h3>
            <p>
              Just fill in a few details about what you need to communicate, and
              our AI will generate a complete email draft for you in seconds.
              You can then edit or use as-is.
            </p>
          </div>
          <div className="border p-4 rounded-md">
            <h3 className="font-medium flex items-center gap-2 mb-2">
              <ThumbsUp className="h-4 w-4 text-green-600" />
              <span>Human-like Quality</span>
            </h3>
            <p>
              Our advanced AI produces natural-sounding text that&apos;s
              indistinguishable from human writing. No more robotic or awkard
              phrasing in your communications.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-primary" />
          How to Use the Email Writer
        </h2>
        <p className="mb-6">
          Simply fill out the form below with information about your
          email&apos;s purpose, recipient, and key points you want to include.
          Our AI will analyze your input and generate a professional email that
          you can copy, modify, or send directly. Try it now!
        </p>
      </article>

      <div className="mt-10 border-t pt-6">
        <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
          <Settings className="h-4 w-4 text-zinc-600" />
          Tips for Better Email Results
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Be specific about the purpose of your email</li>
          <li>
            Include key details about your relationship with the recipient
          </li>
          <li>
            Mention any specific tone or style you prefer (formal, casual, etc.)
          </li>
          <li>Always review the AI-generated content before sending</li>
        </ul>
        <p className="mt-4 text-sm text-zinc-500 flex items-center gap-2">
          <Send className="h-3 w-3" />
          While our AI produces high-quality content, we recommend reviewing all
          generated emails before sending them to ensure they perfectly match
          your intentions and voice.
        </p>
      </div>
    </div>
  );
}