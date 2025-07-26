"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { toast } from "sonner"

export function TextSummarizerOutput({
  summary,
  isLoading,
}: {
  summary: string
  isLoading: boolean
}) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">Generating summary...</div>
        </CardContent>
      </Card>
    )
  }

  if (!summary) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(summary)
    toast.success("Summary copied to clipboard")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="prose max-w-none">
          {summary.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <Button onClick={handleCopy} variant="outline">
          <Copy className="mr-2 h-4 w-4" /> Copy Summary
        </Button>
      </CardContent>
    </Card>
  )
} 