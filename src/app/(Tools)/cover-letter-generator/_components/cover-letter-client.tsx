"use client"

import { useState } from "react"
import { CoverLetterForm, type CoverLetterFormValues } from "./cover-letter-form"
import { CoverLetterOutput } from "./cover-letter-output"

export function CoverLetterClient() {
  const [generatedLetter, setGeneratedLetter] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastFormData, setLastFormData] = useState<CoverLetterFormValues | null>(null)

  const handleSubmit = async (data: CoverLetterFormValues) => {
    setIsLoading(true)
    setError(null)
    setLastFormData(data)
    
    try {
      const response = await fetch("/api/cover-letter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate cover letter")
      }

      const result = await response.json()
      setGeneratedLetter(result.coverLetter)
    } catch (error) {
      console.error("Error generating cover letter:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegenerate = () => {
    if (lastFormData) {
      handleSubmit(lastFormData)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
        <CoverLetterForm onSubmit={handleSubmit} isLoading={isLoading} />
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Generated Cover Letter</h2>
        <CoverLetterOutput
          generatedLetter={generatedLetter}
          isLoading={isLoading}
          onRegenerate={lastFormData ? handleRegenerate : undefined}
        />
      </div>
    </div>
  )
}