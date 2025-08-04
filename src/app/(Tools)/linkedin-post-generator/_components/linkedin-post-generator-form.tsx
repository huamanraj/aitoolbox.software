"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Linkedin, Send } from "lucide-react"

const linkedinPostSchema = z.object({
  topic: z.string().min(10, "Topic must be at least 10 characters").max(500, "Topic must be less than 500 characters"),
  tone: z.enum(["Professional", "Casual", "Inspirational", "Technical", "Conversational", "Authoritative"]),
  keyPoints: z.string().optional(),
})

export type LinkedInFormValues = z.infer<typeof linkedinPostSchema>

interface LinkedInPostGeneratorFormProps {
  onSubmit: (data: LinkedInFormValues) => void
  isLoading: boolean
}

const toneOptions = [
  { value: "Professional", label: "Professional" },
  { value: "Casual", label: "Casual" },
  { value: "Inspirational", label: "Inspirational" },
  { value: "Technical", label: "Technical" },
  { value: "Conversational", label: "Conversational" },
  { value: "Authoritative", label: "Authoritative" },
]

const topicExamples = [
  "Launching a new product or service",
  "Sharing a career milestone or achievement",
  "Commenting on industry trends or news",
  "Sharing professional insights or lessons learned",
  "Announcing a job change or promotion",
  "Discussing a challenge and how you overcame it",
]

export function LinkedInPostGeneratorForm({ onSubmit, isLoading }: LinkedInPostGeneratorFormProps) {
  const form = useForm<LinkedInFormValues>({
    resolver: zodResolver(linkedinPostSchema),
    defaultValues: {
      topic: "",
      tone: "Professional",
      keyPoints: "",
    },
  })

  const handleSubmit = (data: LinkedInFormValues) => {
    onSubmit(data)
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-none border-0 shadow-none">
        <CardContent className="p-4 pt-4">
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Topic Input */}
            <div className="space-y-2">
              <Label htmlFor="topic" className="text-base font-medium">
                Topic or Core Message *
              </Label>
              <Textarea
                id="topic"
                placeholder="e.g., launching a new product, sharing an article, celebrating a work anniversary..."
                className="min-h-[100px] resize-none rounded-lg text-base"
                {...form.register("topic")}
              />
              {form.formState.errors.topic && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.topic.message}
                </p>
              )}
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-2">Example topics:</p>
                <ul className="space-y-1">
                  {topicExamples.map((example, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tone Selection */}
            <div className="space-y-2">
              <Label htmlFor="tone" className="text-base font-medium">
                Desired Tone *
              </Label>
              <Controller
                name="tone"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="rounded-lg text-sm">
                      <SelectValue placeholder="Select a tone" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg">
                      {toneOptions.map((tone) => (
                        <SelectItem key={tone.value} value={tone.value}>
                          {tone.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.tone && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.tone.message}
                </p>
              )}
            </div>

            {/* Key Points Input */}
            <div className="space-y-2">
              <Label htmlFor="keyPoints" className="text-base font-medium">
                Key Points or Keywords (Optional)
              </Label>
              <Textarea
                id="keyPoints"
                placeholder="e.g., specific achievements, metrics, hashtags, or points you want to emphasize..."
                className="min-h-[80px] resize-none rounded-lg text-base"
                {...form.register("keyPoints")}
              />
              <p className="text-sm text-muted-foreground">
                Include specific details, achievements, or hashtags you'd like to incorporate.
              </p>
            </div>

            {/* Submit Button */}
          
            <Button
              type="submit"
              disabled={isLoading || !form.formState.isValid}
              className="w-full rounded-lg text-base py-6"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-lg h-4 w-4 border-b-2 border-white mr-2" />
                  Generating Post...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Generate LinkedIn Post
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 