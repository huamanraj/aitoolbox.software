"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Copy, FileText, MessageSquare, Play, RefreshCw, StopCircle, Users } from "lucide-react"
import NativeBannerAd from "@/components/ads/NativeBannerAd"

const TOP_ROLES = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Data Analyst",
  "Machine Learning Engineer",
  "Product Manager",
  "QA / SDET Engineer",
  "Mobile Developer",
  "Cloud Engineer",
  "Security Engineer",
  "Data Engineer",
  "UX/UI Designer",
] as const

const RoleEnum = z.enum(TOP_ROLES)

const formSchema = z.object({
  role: z.union([RoleEnum, z.literal("Other")]),
  customRole: z.string().optional(),
  level: z.enum(["Entry-Level", "Mid-Level", "Senior"]),
  description: z.string().optional(),
  questionsCount: z.number().min(3).max(10),
}).refine(
  (vals) => (vals.role === "Other" ? (vals.customRole && vals.customRole.trim().length >= 2) : true),
  { message: "Please specify a role", path: ["customRole"] }
)

export type FormValues = z.infer<typeof formSchema>

interface AnswerFeedback {
  summary: string
  scores: { clarity: number; structure: number; relevance: number }
  star?: { situation?: string; task?: string; action?: string; result?: string }
  strengths: string[]
  improvements: string[]
}

type QA = {
  id: string
  question: string
  answer?: string
  feedback?: AnswerFeedback
}

export default function MockInterviewClient() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { level: "Mid-Level", role: "Software Engineer", description: "", questionsCount: 6 },
  })

  const [isRunning, setIsRunning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [qaList, setQaList] = useState<QA[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [finalReport, setFinalReport] = useState<{
    overallSummary: string
    averageScores: { clarity: number; structure: number; relevance: number }
    topStrengths: string[]
    topImprovements: string[]
    additionalSuggestions: string[]
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const answerRef = useRef<HTMLTextAreaElement | null>(null)

  const currentQA = qaList[currentIndex]
  const remaining = useMemo(() => qaList.length - currentIndex, [qaList.length, currentIndex])

  const startInterview = async (values: FormValues) => {
    setIsRunning(true)
    setIsLoading(true)
    setError(null)
    setQaList([])
    setCurrentIndex(0)
    setFinalReport(null)
    setProgress(10)

    try {
      const selectedRole = values.role === "Other" ? (values.customRole || "Software Engineer") : values.role
      const systemPrompt = `You are a professional interviewer. Generate exactly ${values.questionsCount ?? 6} interview questions for a ${values.level} level ${selectedRole} position. Return ONLY a numbered list, one question per line. Do not add any introduction, explanation, or additional text. Format: 
1. [Question 1]
2. [Question 2]
etc.`

      const count = values.questionsCount ?? 6
      const userPrompt = `Generate exactly ${count} interview questions for the role: ${selectedRole}. ${values.description ? `Job description: ${values.description}` : ''}`

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
          },
        }),
      })

      if (!response.ok) throw new Error("Failed to initialize interview")
      const result = await response.json()
      const text = String(result.data ?? "")

      const questions = text
        .split(/\n+/)
        .map((line: string) => line.replace(/^\s*\d+\.?\s*/, "").trim())
        .filter(Boolean)
        .slice(0, count)
        .map((q: string, i: number) => ({ id: `${Date.now()}-${i}`, question: q }))

      if (questions.length === 0) {
        throw new Error("No questions were generated. Please try again.")
      }

      if (questions.length < count) {
        toast.warning(`Only ${questions.length} questions generated instead of ${count}. Proceeding anyway.`)
      }

      setQaList(questions)
      setProgress(20)
      toast.success(`Interview started with ${questions.length} questions`)
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unexpected error"
      setError(message)
      toast.error(message)
      setIsRunning(false)
    } finally {
      setIsLoading(false)
    }
  }

  const submitAnswer = async (answer: string) => {
    if (!currentQA) return
    if (!answer || !answer.trim()) {
      toast.error("Please type an answer before submitting")
      return
    }
    setIsLoading(true)
    setProgress((p) => Math.min(p + 10, 90))

    try {
      const feedbackPrompt = `You are an experienced tech interview coach. Evaluate this candidate's answer comprehensively.

Question: ${currentQA.question}
Answer: ${answer}

Provide detailed, actionable feedback in ONLY valid JSON format:
{
  "summary": "2-3 sentences highlighting what the candidate did well and areas for improvement",
  "scores": {
    "clarity": number (1-10, how clear and well-articulated),
    "structure": number (1-10, logical flow and organization),
    "relevance": number (1-10, addresses the question effectively)
  },
  "star": {
    "situation": "if applicable, evaluation of how they described the context",
    "task": "if applicable, clarity of the objective or challenge",  
    "action": "if applicable, specificity and effectiveness of actions taken",
    "result": "if applicable, quantifiable outcomes or impact"
  },
  "strengths": ["3-5 specific things done well, with examples"],
  "improvements": ["3-5 actionable suggestions with concrete examples of what to say instead"]
}

Be constructive, specific, and helpful. Return ONLY the JSON object.`

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "chat",
          prompt: feedbackPrompt,
          options: {
            messages: [{ role: "user", content: feedbackPrompt }],
            model: "openai",
          },
        }),
      })

      if (!response.ok) throw new Error("Failed to get feedback")
      const result = await response.json()
      let raw = String(result.data ?? "")
      // Normalize potential code-fenced JSON from providers
      raw = raw.replace(/```json\s*|```/gi, "").trim()
      let parsed: AnswerFeedback | null = null
      try {
        // try direct parse
        parsed = JSON.parse(raw) as AnswerFeedback
      } catch {
        // fallback: extract JSON object
        const match = raw.match(/\{[\s\S]*\}/)
        if (match) {
          parsed = JSON.parse(match[0]) as AnswerFeedback
        }
      }
      if (!parsed) throw new Error("Invalid feedback format")

      setQaList((prev) => {
        const next = [...prev]
        next[currentIndex] = { ...next[currentIndex], answer, feedback: parsed }
        return next
      })

      // Clear the textarea for next question
      if (answerRef.current) {
        answerRef.current.value = ""
      }

      toast.success("Feedback received! Moving to next question...")

      if (currentIndex < qaList.length - 1) {
        setCurrentIndex((i) => i + 1)
        setProgress((p) => Math.min(p + Math.ceil(70 / qaList.length), 95))
      } else {
        await generateFinalReport()
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unexpected error"
      setError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const generateFinalReport = useCallback(async () => {
    setIsLoading(true)
    setProgress(98)
    try {
      // small helpers
      const truncate = (s: string | undefined, max: number) => (s ? (s.length > max ? s.slice(0, max - 1) + "…" : s) : "")
      const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))

      // compute averages locally
      const num = qaList.length || 1
      const totals = qaList.reduce(
        (acc, qa) => {
          const s = qa.feedback?.scores
          if (s) {
            acc.clarity += s.clarity || 0
            acc.structure += s.structure || 0
            acc.relevance += s.relevance || 0
          }
          return acc
        },
        { clarity: 0, structure: 0, relevance: 0 }
      )
      const averages = {
        clarity: Math.round((totals.clarity / num) * 10) / 10,
        structure: Math.round((totals.structure / num) * 10) / 10,
        relevance: Math.round((totals.relevance / num) * 10) / 10,
      }

      // Build compact interview data to keep prompt well under provider limits (~7k chars)
      const compactItems = qaList.map((qa, i) => ({
        q: truncate(qa.question, 180),
        a: truncate(qa.answer, 320),
        s: {
          c: clamp(qa.feedback?.scores.clarity ?? 0, 0, 10),
          st: clamp(qa.feedback?.scores.structure ?? 0, 0, 10),
          r: clamp(qa.feedback?.scores.relevance ?? 0, 0, 10)
        },
        sum: truncate(qa.feedback?.summary ?? "", 220),
        str: (qa.feedback?.strengths || []).slice(0, 2).map((x) => truncate(x, 90)),
        imp: (qa.feedback?.improvements || []).slice(0, 2).map((x) => truncate(x, 90))
      }))

      const basePayload = {
        averages,
        items: compactItems,
      }

      // If still large, further shrink the content
      const toJson = (obj: any) => JSON.stringify(obj)
      let compactJson = toJson(basePayload)
      if (compactJson.length > 6000) {
        const evenSmaller = {
          averages,
          items: compactItems.map((it) => ({
            q: truncate(it.q, 120),
            a: truncate(it.a, 200),
            s: it.s,
          })),
        }
        compactJson = toJson(evenSmaller)
      }

      const overallPrompt = `You are a senior tech interview coach. Given the interview data JSON below, produce a concise overall report.

INTERVIEW_DATA_JSON=${compactJson}

Return ONLY valid JSON with this shape:
{
  "overallSummary": "3-4 sentences summarizing overall performance and readiness",
  "topStrengths": ["4-5 concise strengths"],
  "topImprovements": ["4-5 prioritized improvements"],
  "additionalSuggestions": ["3-4 strategic tips"]
}`

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "chat",
          prompt: overallPrompt,
          options: {
            messages: [{ role: "user", content: overallPrompt }],
            model: "openai",
          },
        }),
      })

      // Provide graceful fallback when provider rejects due to input length or other transient issues
      if (!response.ok) {
        let providerMsg = "Failed to generate report"
        try {
          const errJson = await response.json()
          if (errJson?.error) providerMsg = String(errJson.error)
          if (errJson?.message) providerMsg = String(errJson.message)
        } catch {/* ignore */}

        if (/exceeds maximum length|too long|token limit/i.test(providerMsg)) {
          // Build a local summary as a fallback
          const allStrengths = qaList.flatMap((q) => q.feedback?.strengths || [])
          const allImprovements = qaList.flatMap((q) => q.feedback?.improvements || [])
          const countMap = (arr: string[]) => {
            const m = new Map<string, number>()
            for (const x of arr.map((t) => truncate(t, 120))) {
              m.set(x, (m.get(x) || 0) + 1)
            }
            return [...m.entries()].sort((a, b) => b[1] - a[1]).map(([k]) => k)
          }
          const topStrengths = countMap(allStrengths).slice(0, 5)
          const topImprovements = countMap(allImprovements).slice(0, 5)

          setFinalReport({
            overallSummary:
              `Overall, your answers demonstrate clarity (${averages.clarity}/10), ` +
              `structure (${averages.structure}/10), and relevance (${averages.relevance}/10). ` +
              `Focus on the improvement items below and consider running another session to benchmark progress.`,
            averageScores: averages,
            topStrengths,
            topImprovements,
            additionalSuggestions: [
              "Use the STAR method to tighten narratives and quantify results",
              "Prepare 2-3 concrete project stories per core competency",
              "Rehearse out loud to improve pacing and clarity"
            ],
          })
          setProgress(100)
          toast.warning("Report generated with a compact local summary due to provider length limits")
          return
        }

        throw new Error(providerMsg)
      }
      const result = await response.json()
      const cleaned = String(result.data ?? "").replace(/```json\s*|```/gi, "").trim()
      let parsed: { overallSummary: string; topStrengths: string[]; topImprovements: string[]; additionalSuggestions: string[] }
      try {
        parsed = JSON.parse(cleaned)
      } catch {
        const match = cleaned.match(/\{[\s\S]*\}/)
        parsed = match ? JSON.parse(match[0]) : { overallSummary: "", topStrengths: [], topImprovements: [], additionalSuggestions: [] }
      }

      setFinalReport({
        overallSummary: parsed.overallSummary || "",
        averageScores: averages,
        topStrengths: parsed.topStrengths || [],
        topImprovements: parsed.topImprovements || [],
        additionalSuggestions: parsed.additionalSuggestions || [],
      })
      setProgress(100)
      toast.success("Interview complete! Review your detailed feedback report below.")
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unexpected error"
      setError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
      setIsRunning(false)
    }
  }, [qaList])

  const handleCopy = (text: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text)
      toast.success("Copied to clipboard")
    } else {
      // Fallback for environments without clipboard API
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
        toast.success("Copied to clipboard")
      } catch (err) {
        toast.error("Failed to copy to clipboard")
      }
      document.body.removeChild(textarea)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Configuration */}
      <Card>
        <CardContent className="p-4 md:p-6 space-y-4">
          <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(startInterview)}>
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title / Role</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {TOP_ROLES.map((r) => (
                              <SelectItem key={r} value={r}>{r}</SelectItem>
                            ))}
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("role") === "Other" && (
                  <FormField
                    control={form.control}
                    name="customRole"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specify Role</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., AR/VR Engineer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Level</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Entry-Level">Entry-Level</SelectItem>
                            <SelectItem value="Mid-Level">Mid-Level</SelectItem>
                            <SelectItem value="Senior">Senior</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Optional Job Description</FormLabel>
                    <FormControl>
                      <Textarea rows={3} placeholder="Paste a brief JD to tailor questions" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="questionsCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Questions</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(v) => field.onChange(parseInt(v))}
                          defaultValue={String(field.value ?? 6)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select count" />
                          </SelectTrigger>
                          <SelectContent>
                            {[5,6,7,8,9,10].map((n) => (
                              <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {TOP_ROLES.slice(0, 12).map((r) => (
                  <Button key={r} type="button" variant="outline" size="sm"
                    onClick={() => form.setValue("role", r)}>
                    {r}
                  </Button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <Button type="submit" disabled={isRunning || isLoading}>
                  <Play className="h-4 w-4 mr-2" /> Start Interview
                </Button>
                {isRunning && (
                  <Badge variant="outline"><Users className="h-3 w-3 mr-1"/> Live</Badge>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Session */}
      {(isRunning || qaList.length > 0) && (
        <div className="mt-8 space-y-6">
          {/* Progress Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    {qaList.length === 0 ? "Generating questions..." : "Analyzing your answer..."}
                  </>
                ) : isRunning && currentQA ? (
                  <>
                    <MessageSquare className="h-4 w-4" />
                    Question {currentIndex + 1} of {qaList.length}
                  </>
                ) : null}
              </div>
              <div className="text-sm text-muted-foreground">
                {progress}% Complete
              </div>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <Card>
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-xl flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Interview Session
                  </h3>
                  {qaList.length > 0 && !finalReport && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Answer each question thoughtfully. You'll receive instant feedback.
                    </p>
                  )}
                </div>
                {isRunning && (
                  <Button variant="outline" size="sm" onClick={() => {
                    if (confirm("Are you sure you want to stop the interview? Your progress will be lost.")) {
                      setIsRunning(false)
                      setQaList([])
                      setCurrentIndex(0)
                      setProgress(0)
                    }
                  }}>
                    <StopCircle className="h-4 w-4 mr-2"/> End Interview
                  </Button>
                )}
              </div>

              {error && (
                <Card className="border-destructive bg-destructive/5">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-destructive">⚠️</div>
                      <div>
                        <h4 className="font-semibold text-destructive mb-1">Error</h4>
                        <p className="text-sm text-destructive/90">{error}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {currentQA ? (
                <div className="space-y-6">
                  {/* Question Display */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-lg">Question {currentIndex + 1} of {qaList.length}</h4>
                      <Badge variant="secondary">{remaining} remaining</Badge>
                    </div>
                    <Card>
                      <CardContent className="p-6">
                        <p className="text-base leading-relaxed">{currentQA.question}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Answer Input */}
                  <div className="space-y-3">
                    <Label htmlFor="answer-input" className="text-base font-semibold">Your Answer</Label>
                    <Textarea 
                      id="answer-input"
                      ref={answerRef} 
                      placeholder="Type your detailed answer here. For behavioral questions, try using the STAR method: describe the Situation, Task, Action you took, and Results achieved..." 
                      className="min-h-[180px] text-base"
                      disabled={isLoading}
                    />
                    <p className="text-sm text-muted-foreground">
                      💡 Tip: Be specific, use examples, and aim for 3-5 sentences minimum for a complete answer.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <Button
                      disabled={isLoading}
                      onClick={() => submitAnswer(answerRef.current?.value ?? "")}
                      size="lg"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing Answer...
                        </>
                      ) : (
                        <>
                          Submit Answer
                        </>
                      )}
                    </Button>
                    <Button type="button" variant="outline" size="lg" onClick={() => handleCopy(currentQA.question)}>
                      <Copy className="h-4 w-4 mr-2"/> Copy Question
                    </Button>
                  </div>
                </div>
              ) : qaList.length > 0 ? (
                <div className="text-center p-8">
                  <p className="text-muted-foreground">All questions completed. Generating your final report...</p>
                </div>
              ) : (
                <div className="text-center p-8">
                  <p className="text-muted-foreground">Configure your interview settings above and click "Start Interview" to begin.</p>
                </div>
              )}

              {/* Answered Questions History */}
              {qaList.filter((_, idx) => idx < currentIndex).length > 0 && (
                <div className="border-t pt-6 mt-6">
                  <Collapsible className="w-full">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Completed Questions ({currentIndex}/{qaList.length})
                      </h4>
                      <CollapsibleTrigger asChild>
                        <Button variant="outline" size="sm">
                          <span className="text-sm">View All</span>
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="space-y-4">
                      {qaList.slice(0, currentIndex).map((qa, idx) => (
                        <Card key={qa.id} className="overflow-hidden">
                          <CardContent className="p-0">
                            {/* Question Header */}
                            <div className="bg-muted px-4 py-3">
                              <h5 className="font-medium">Question {idx + 1}</h5>
                              <p className="text-sm mt-1">{qa.question}</p>
                            </div>

                            {/* Answer */}
                            {qa.answer && (
                              <div className="px-4 py-3 border-b">
                                <p className="text-sm font-medium text-muted-foreground mb-2">Your Answer:</p>
                                <p className="text-sm whitespace-pre-wrap">{qa.answer}</p>
                              </div>
                            )}

                            {/* Feedback */}
                            {qa.feedback && (
                              <div className="px-4 py-4 space-y-4">
                                {/* Scores */}
                                <div>
                                  <h6 className="font-medium text-sm mb-3">Performance Scores</h6>
                                  <div className="grid grid-cols-3 gap-3">
                                    <div className="text-center p-3 bg-muted rounded-lg">
                                      <div className="text-2xl font-bold text-primary">{qa.feedback.scores.clarity}</div>
                                      <div className="text-xs text-muted-foreground mt-1">Clarity</div>
                                    </div>
                                    <div className="text-center p-3 bg-muted rounded-lg">
                                      <div className="text-2xl font-bold text-primary">{qa.feedback.scores.structure}</div>
                                      <div className="text-xs text-muted-foreground mt-1">Structure</div>
                                    </div>
                                    <div className="text-center p-3 bg-muted rounded-lg">
                                      <div className="text-2xl font-bold text-primary">{qa.feedback.scores.relevance}</div>
                                      <div className="text-xs text-muted-foreground mt-1">Relevance</div>
                                    </div>
                                  </div>
                                </div>

                                {/* Summary */}
                                <div>
                                  <h6 className="font-medium text-sm mb-2">Feedback Summary</h6>
                                  <p className="text-sm text-muted-foreground">{qa.feedback.summary}</p>
                                </div>

                                {/* Strengths */}
                                {qa.feedback.strengths?.length > 0 && (
                                  <div>
                                    <h6 className="font-medium text-sm mb-2 text-green-700 dark:text-green-400">✓ Strengths</h6>
                                    <ul className="space-y-1">
                                      {qa.feedback.strengths.map((s, i) => (
                                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                          <span className="text-green-600 mt-0.5">•</span>
                                          <span>{s}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* Improvements */}
                                {qa.feedback.improvements?.length > 0 && (
                                  <div>
                                    <h6 className="font-medium text-sm mb-2 text-orange-700 dark:text-orange-400">→ Areas to Improve</h6>
                                    <ul className="space-y-1">
                                      {qa.feedback.improvements.map((s, i) => (
                                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                          <span className="text-orange-600 mt-0.5">•</span>
                                          <span>{s}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* STAR Analysis */}
                                {qa.feedback.star && Object.values(qa.feedback.star).some(v => v) && (
                                  <div>
                                    <h6 className="font-medium text-sm mb-2">STAR Method Analysis</h6>
                                    <div className="grid gap-2">
                                      {qa.feedback.star.situation && (
                                        <div className="flex gap-2">
                                          <span className="font-medium text-xs text-muted-foreground min-w-[70px]">Situation:</span>
                                          <span className="text-sm text-muted-foreground">{qa.feedback.star.situation}</span>
                                        </div>
                                      )}
                                      {qa.feedback.star.task && (
                                        <div className="flex gap-2">
                                          <span className="font-medium text-xs text-muted-foreground min-w-[70px]">Task:</span>
                                          <span className="text-sm text-muted-foreground">{qa.feedback.star.task}</span>
                                        </div>
                                      )}
                                      {qa.feedback.star.action && (
                                        <div className="flex gap-2">
                                          <span className="font-medium text-xs text-muted-foreground min-w-[70px]">Action:</span>
                                          <span className="text-sm text-muted-foreground">{qa.feedback.star.action}</span>
                                        </div>
                                      )}
                                      {qa.feedback.star.result && (
                                        <div className="flex gap-2">
                                          <span className="font-medium text-xs text-muted-foreground min-w-[70px]">Result:</span>
                                          <span className="text-sm text-muted-foreground">{qa.feedback.star.result}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Final Report */}
      {finalReport && (
        <Card className="mt-8 border-primary/20">
          <CardContent className="p-0">
            {/* Header */}
            <div className="bg-linear-to-r from-primary/10 to-primary/5 px-6 py-4 border-b flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xl flex items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" />
                  Interview Performance Report
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Complete analysis of your {qaList.length}-question interview session
                </p>
              </div>
              <Button variant="outline" onClick={() => handleCopy(JSON.stringify(finalReport, null, 2))}>
                <Copy className="h-4 w-4 mr-2"/> Copy Report
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Overall Summary */}
              <div>
                <h4 className="font-semibold text-lg mb-3">Overall Performance Summary</h4>
                <p className="text-muted-foreground leading-relaxed">{finalReport.overallSummary}</p>
              </div>

              {/* Average Scores */}
              <div>
                <h4 className="font-semibold text-lg mb-4">Average Performance Scores</h4>
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl font-bold text-primary mb-2">
                        {finalReport.averageScores.clarity}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">Clarity</div>
                      <div className="text-xs text-muted-foreground mt-1">How well-articulated</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl font-bold text-primary mb-2">
                        {finalReport.averageScores.structure}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">Structure</div>
                      <div className="text-xs text-muted-foreground mt-1">Logical organization</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl font-bold text-primary mb-2">
                        {finalReport.averageScores.relevance}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">Relevance</div>
                      <div className="text-xs text-muted-foreground mt-1">Addressed question</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Strengths */}
              {finalReport.topStrengths?.length > 0 && (
                <Card className="border-green-200 dark:border-green-900">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-lg mb-4 text-green-700 dark:text-green-400 flex items-center gap-2">
                      <span>✓</span> Top Strengths
                    </h4>
                    <ul className="space-y-3">
                      {finalReport.topStrengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-green-600 dark:text-green-400 font-bold min-w-6">{i + 1}.</span>
                          <span className="text-muted-foreground">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Areas to Improve */}
              {finalReport.topImprovements?.length > 0 && (
                <Card className="border-orange-200 dark:border-orange-900">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-lg mb-4 text-orange-700 dark:text-orange-400 flex items-center gap-2">
                      <span>→</span> Key Areas to Improve
                    </h4>
                    <ul className="space-y-3">
                      {finalReport.topImprovements.map((s, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-orange-600 dark:text-orange-400 font-bold min-w-6">{i + 1}.</span>
                          <span className="text-muted-foreground">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Additional Suggestions */}
              {finalReport.additionalSuggestions?.length > 0 && (
                <Card className="border-blue-200 dark:border-blue-900">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-lg mb-4 text-blue-700 dark:text-blue-400 flex items-center gap-2">
                      <span>💡</span> Strategic Tips for Success
                    </h4>
                    <ul className="space-y-3">
                      {finalReport.additionalSuggestions.map((s, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-blue-600 dark:text-blue-400 font-bold min-w-6">{i + 1}.</span>
                          <span className="text-muted-foreground">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Next Steps */}
              <Card className="bg-muted">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg mb-3">📋 Recommended Next Steps</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span>•</span>
                      <span>Practice your improved answers to the questions above</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>•</span>
                      <span>Run another mock interview focusing on the improvement areas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>•</span>
                      <span>Research STAR method examples for better behavioral responses</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span>•</span>
                      <span>Keep this report and track your progress over multiple sessions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ad Banner */}
      <NativeBannerAd />
    </div>
  )
}


