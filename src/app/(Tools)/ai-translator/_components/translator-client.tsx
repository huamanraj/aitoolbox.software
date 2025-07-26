"use client"

import { useState, useRef, useEffect } from "react"
import { TranslatorForm, TranslatorFormValues } from "./translator-form"
import { TranslatorOutput } from "./translator-output"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown, Globe, Languages } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import Link from "next/link"

export default function TranslatorClient() {
  const [translatedText, setTranslatedText] = useState("")
  const [targetLanguage, setTargetLanguage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isOutputOpen, setIsOutputOpen] = useState(false)

  const outputRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const handleFormSubmit = async (data: TranslatorFormValues) => {
    setIsLoading(true)
    setTranslatedText("")
    setError(null)
    setProgress(0)
    setIsOutputOpen(true) // Open on submit
    setTargetLanguage(data.targetLanguage)

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
You are a professional translator with expertise in multiple languages. Your task is to translate text accurately while preserving the original meaning, tone, and formatting. Follow these guidelines:

1. Translate the text from ${data.sourceLanguage} to ${data.targetLanguage}.
2. Maintain the original formatting, including paragraphs, bullet points, and line breaks.
3. Preserve the tone and style of the original text.
4. If there are specialized terms or phrases that don't have direct translations, provide the best cultural equivalent and explain it in parentheses if necessary.
5. For names, titles, and proper nouns, keep them in their original form unless there's a widely accepted translation in the target language.
6. If the text contains idioms or cultural references, translate them to equivalent expressions in the target language when possible.

Your output should be just the translated text without any explanations or comments unless specifically requested.
`;

      const userPrompt = `Translate the following text from ${data.sourceLanguage} to ${data.targetLanguage}:

${data.text}
`;

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
            temperature: 0.3,
            max_tokens: 2000,
          },
        }),
      })

      clearInterval(interval)
      setProgress(100)

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (error) {
          errorData = { error: "An unexpected error occurred. Please try again." }
        }
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      const result = await response.json()
      setTranslatedText(result.data)
      toast.success("Translation Complete!", {
        description: `Successfully translated to ${data.targetLanguage}.`,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Translation Error:", error)
      setError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
      setTimeout(() => setProgress(0), 1000)
    }
  }

  useEffect(() => {
    if ((translatedText || error) && isMobile && outputRef.current) {
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [translatedText, error, isMobile]);

  return (
    <>
      <div className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight ">
              AI Translator
            </h1>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Translate text between multiple languages with AI-powered accuracy and natural fluency.
            </p>
          </header>

          <main className="space-y-8">
            <div>
              <TranslatorForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>

            <div ref={outputRef}>
              <Collapsible
                open={isOutputOpen}
                onOpenChange={setIsOutputOpen}
                className="w-full"
              >
                {(isLoading || translatedText || error) && (
                  <div className="flex items-center justify-between rounded-t-lg border bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Globe className="h-4 w-4 text-blue-600" />
                      <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        Translation Result
                      </span>
                    </h4>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-9 p-0 hover:bg-blue-100">
                        <ChevronsUpDown className="h-4 w-4 text-blue-600" />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                )}
                
                <CollapsibleContent>
                  <div className="space-y-4">
                    {isLoading && (
                      <div className="w-full">
                        <Progress value={progress} className="h-2 bg-blue-100" />
                      </div>
                    )}
                    {error && !isLoading && (
                      <div className="text-destructive p-4 bg-destructive/10 rounded-md">
                        {error}
                      </div>
                    )}
                    <TranslatorOutput
                      translatedText={translatedText}
                      isLoading={isLoading}
                      targetLanguage={targetLanguage}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            
            {/* Related tools section */}
            <div className="mt-12 border-t pt-8">
              <h2 className="text-xl font-semibold mb-4">Related Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Link 
                  href="/grammar-fixer" 
                  className="p-4 border rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-3"
                >
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Languages className="h-5 w-5 " />
                  </div>
                  <div>
                    <h3 className="font-medium">Grammar Fixer</h3>
                    <p className="text-sm text-muted-foreground">Fix grammar and improve writing</p>
                  </div>
                </Link>
                <Link 
                  href="/text-summarizer" 
                  className="p-4 border rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-3"
                >
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Globe className="h-5 w-5 " />
                  </div>
                  <div>
                    <h3 className="font-medium">Text Summarizer</h3>
                    <p className="text-sm text-muted-foreground">Condense text into concise summaries</p>
                  </div>
                </Link>
                <Link 
                  href="/chatbot" 
                  className="p-4 border rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-3"
                >
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Globe className="h-5 w-5 " />
                  </div>
                  <div>
                    <h3 className="font-medium ">AI Chatbot</h3>
                    <p className="text-sm text-muted-foreground">Chat with our AI assistant</p>
                  </div>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}