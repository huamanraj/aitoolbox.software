"use client"

import { useState } from "react"
import { toast } from "sonner"
import { TextSummarizerForm, FormValues } from "./text-summarizer-form"
import { TextSummarizerOutput } from "./text-summarizer-output"
import NativeBannerAd from "@/components/NativeBannerAd";

export default function TextSummarizerClient() {
  const [isLoading, setIsLoading] = useState(false)
  const [summary, setSummary] = useState("")

  const handleSubmit = async (data: FormValues) => {
    setIsLoading(true)
    setSummary("")

    try {
      const lengthMap = {
        "very-short": "approximately 50 words",
        "short": "approximately 100 words",
        "medium": "approximately 250 words",
        "detailed": "approximately 500 words",
      }
      const targetLength = lengthMap[data.summaryLength]
      const systemPrompt = `You are an expert text summarizer. Create a concise, accurate summary that captures the main points, key arguments, and conclusions of the input text. Preserve the original meaning and important details. Aim for a summary that is ${targetLength}.`

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "chat",
          options: {
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: `Summarize this text:\n\n${data.text}` },
            ],
            model: "openai",
            temperature: 0.3,
            max_tokens: 2000,
          },
        }),      })

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
    <div className="container mx-auto py-2 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextSummarizerForm onSubmit={handleSubmit} isLoading={isLoading} />
        <TextSummarizerOutput summary={summary} isLoading={isLoading} />
      </div>
      {/* Ad Banner */}
<NativeBannerAd />

    </div>
  )
}