"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  text: z.string().refine((val) => {
    const words = val.trim().split(/\s+/).length
    return words >= 100 && words <= 5000
  }, { message: "Text must be between 100 and 5000 words." }),
})

export type FormValues = z.infer<typeof formSchema>

export function TextSummarizerForm({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: FormValues) => void
  isLoading: boolean
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  })

  const watchText = form.watch("text")
  const wordCount = watchText.trim().split(/\s+/).filter(Boolean).length

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text to Summarize</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Paste your text here (100-5000 words)..."
                  className="min-h-[300px] resize-y"
                  {...field}
                />
              </FormControl>
              <div className="text-sm text-muted-foreground mt-1">
                {wordCount} words
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading || wordCount < 100 || wordCount > 5000}>
          {isLoading ? "Summarizing..." : "Generate Summary"}
        </Button>
      </form>
    </Form>
  )
} 