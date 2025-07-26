"use client"

import { useState } from "react"
import { toast } from "sonner"
import { TextSummarizerForm, FormValues } from "./text-summarizer-form"
import { TextSummarizerOutput } from "./text-summarizer-output"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TextSummarizerClient() {
  const [isLoading, setIsLoading] = useState(false)
  const [summary, setSummary] = useState("")

  const handleSubmit = async (data: FormValues) => {
    setIsLoading(true)
    setSummary("")

    try {
      const systemPrompt = `You are an expert text summarizer. Create a concise, accurate summary that captures the main points, key arguments, and conclusions of the input text. Preserve the original meaning and important details. Aim for a summary that is 20-30% of the original length.`

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "chat",
          prompt: data.text,
          options: {
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: `Summarize this text:\n\n${data.text}` },
            ],
            model: "openai",
            temperature: 0.3,
            max_tokens: 2000,
          },
        }),
      })

      if (!response.ok) throw new Error("Failed to generate summary")

      const result = await response.json()
      setSummary(result.data)
    } catch (error) {
      console.error(error)
      toast.error("Failed to generate summary. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">AI Text Summarizer</h1>
      <p className="text-muted-foreground mb-6">
        Compress lengthy text into concise summaries while preserving key information.
      </p>
      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        <TabsContent value="editor">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <TextSummarizerForm onSubmit={handleSubmit} isLoading={isLoading} />
            <TextSummarizerOutput summary={summary} isLoading={isLoading} />
          </div>
        </TabsContent>
        <TabsContent value="about">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>About AI Text Summarizer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our AI-powered text summarizer uses advanced natural language processing to condense long-form content into concise summaries. Perfect for articles, reports, research papers, and more.
              </p>
              <div>
                <h3 className="font-semibold mb-2">Key Features:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Supports text up to 5000 words</li>
                  <li>Preserves key points and original meaning</li>
                  <li>One-click copy functionality</li>
                  <li>Real-time word count</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Tips for Best Results:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Ensure your text is at least 100 words for meaningful summaries</li>
                  <li>Use clear, well-structured input text</li>
                  <li>Review the summary for any specific details you need</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 