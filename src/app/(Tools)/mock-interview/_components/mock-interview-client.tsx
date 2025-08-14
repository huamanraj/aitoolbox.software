"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
      const systemPrompt = `You are a professional interviewer. Conduct a ${values.level} interview for a ${selectedRole}. Ask concise, realistic questions across behavioral, situational, and technical areas. Wait for the user's answer each time. Keep questions clear and one at a time.`

      const count = values.questionsCount ?? 6
      const userPrompt = `Generate a list of ${count} interview questions for the role ${selectedRole}. ${values.description ? `Job description: ${values.description}` : ''} Return only a numbered list, one question per line.`

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
            temperature: 0.6,
            max_tokens: 1200,
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

      setQaList(questions)
      setProgress(20)
      toast.success("Interview started")
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
    setIsLoading(true)
    setProgress((p) => Math.min(p + 10, 90))

    try {
      const feedbackPrompt = `Evaluate the candidate's answer to the interview question and return ONLY valid JSON with this exact schema:\n\n{
  "summary": string, // 2-3 sentences
  "scores": { "clarity": number, "structure": number, "relevance": number }, // 1-10 integers
  "star": { "situation"?: string, "task"?: string, "action"?: string, "result"?: string },
  "strengths": string[], // 3-5 concise bullet points
  "improvements": string[] // 3-5 actionable suggestions
}\n\nQuestion: ${currentQA.question}\nAnswer: ${answer}\n\nReturn ONLY JSON.`

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "chat",
          prompt: feedbackPrompt,
          options: {
            messages: [{ role: "user", content: feedbackPrompt }],
            model: "openai",
            temperature: 0.4,
            max_tokens: 800,
          },
        }),
      })

      if (!response.ok) throw new Error("Failed to get feedback")
      const result = await response.json()
      let raw = String(result.data ?? "")
      let parsed: AnswerFeedback | null = null
      try {
        // try direct parse
        parsed = JSON.parse(raw) as AnswerFeedback
      } catch {
        // fallback: extract JSON object
        const match = raw.match(/\{[\s\S]*\}$/)
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

      toast.success("Feedback added")

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

      const overallPrompt = `Based on the following Q&A and feedback, return ONLY JSON with an overall summary and prioritized bullet lists.\n\nSchema:\n{
  "overallSummary": string,
  "topStrengths": string[],
  "topImprovements": string[],
  "additionalSuggestions": string[]
}\n\nData:\n${qaList
        .map(
          (qa, i) =>
            `Q${i + 1}: ${qa.question}\nAnswer: ${qa.answer}\nFeedback summary: ${qa.feedback?.summary}`
        )
        .join("\n\n")}\n\nReturn ONLY JSON.`

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "chat",
          prompt: overallPrompt,
          options: {
            messages: [{ role: "user", content: overallPrompt }],
            model: "openai",
            temperature: 0.4,
            max_tokens: 800,
          },
        }),
      })

      if (!response.ok) throw new Error("Failed to generate report")
      const result = await response.json()
      let parsed: { overallSummary: string; topStrengths: string[]; topImprovements: string[]; additionalSuggestions: string[] }
      try {
        parsed = JSON.parse(String(result.data ?? "{}"))
      } catch {
        const match = String(result.data ?? "{}").match(/\{[\s\S]*\}$/)
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
      toast.success("Report ready")
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unexpected error"
      setError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
      setIsRunning(false)
    }
  }, [form, qaList])

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Configuration */}
      <Card className="rounded-none">
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
                          <SelectTrigger className="rounded-none">
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
                          <SelectTrigger className="rounded-none">
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
                          <SelectTrigger className="rounded-none">
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
                  <Button key={r} type="button" variant="outline" size="sm" className="rounded-none"
                    onClick={() => form.setValue("role", r)}>
                    {r}
                  </Button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <Button type="submit" className="rounded-none" disabled={isRunning || isLoading}>
                  <Play className="h-4 w-4 mr-2" /> Start Interview
                </Button>
                {isRunning && (
                  <Badge variant="outline" className="rounded-none"><Users className="h-3 w-3 mr-1"/> Live</Badge>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Session */}
      {(isRunning || qaList.length > 0) && (
        <div className="mt-6 space-y-4">
          <div className="w-full space-y-2">
            {(isLoading || isRunning) && (
              <div className="flex items-center gap-2 text-base text-zinc-600 font-medium">
                <RefreshCw className="h-4 w-4 animate-spin" />
                {isRunning ? "Interview in progress..." : "Working..."}
              </div>
            )}
            <Progress value={progress} className="h-2 rounded-none" />
          </div>

          <Card className="rounded-none">
            <CardContent className="p-4 md:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium flex items-center gap-2 text-base">
                  <MessageSquare className="h-4 w-4 text-zinc-600" />
                  Interview Session {qaList.length > 0 && (
                    <span className="text-muted-foreground">({currentIndex + 1}/{qaList.length})</span>
                  )}
                </h3>
                {isRunning && (
                  <Button variant="ghost" size="sm" className="rounded-none" onClick={() => setIsRunning(false)}>
                    <StopCircle className="h-4 w-4 mr-1"/> Stop
                  </Button>
                )}
              </div>

              {error && (
                <div className="text-destructive p-3 bg-destructive/10 border border-destructive/20">
                  {error}
                </div>
              )}

              {currentQA ? (
                <div className="space-y-4">
                  <div className="p-3 border bg-zinc-50">{currentQA.question}</div>
                  <Textarea ref={answerRef} placeholder="Type your answer here..." className="min-h-[140px] rounded-none" />
                  <div className="flex items-center gap-2">
                    <Button
                      disabled={isLoading}
                      className="rounded-none"
                      onClick={() => submitAnswer(answerRef.current?.value ?? "")}
                    >
                      Submit Answer
                    </Button>
                    <Button type="button" variant="outline" className="rounded-none" onClick={() => handleCopy(currentQA.question)}>
                      <Copy className="h-4 w-4 mr-2"/> Copy Question
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">No active question.</div>
              )}

              {/* History */}
              {qaList.length > 0 && (
                <Collapsible className="w-full">
                  <div className="flex items-center justify-between border bg-zinc-50 px-3 py-2">
                    <h4 className="font-medium flex items-center gap-2 text-base">
                      <FileText className="h-4 w-4 text-zinc-600" />
                      Previous Q&A
                    </h4>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-9 p-0 rounded-none">▼</Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="border border-t-0 p-3 data-[state=closed]:hidden rounded-none space-y-3">
                    {qaList.slice(0, currentIndex + 1).map((qa, idx) => (
                      <div key={qa.id} className="space-y-2">
                        <div className="text-sm font-medium">Q{idx + 1}. {qa.question}</div>
                        {qa.answer && (
                          <div className="text-sm whitespace-pre-wrap">Answer: {qa.answer}</div>
                        )}
                        {qa.feedback && (
                          <div className="text-sm border p-2 bg-zinc-50 space-y-2">
                            <div className="font-medium">Feedback Summary</div>
                            <p>{qa.feedback.summary}</p>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm border">
                                <thead>
                                  <tr className="bg-white">
                                    <th className="border px-2 py-1 text-left">Criterion</th>
                                    <th className="border px-2 py-1 text-left">Score (1-10)</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="border px-2 py-1">Clarity</td>
                                    <td className="border px-2 py-1">{qa.feedback.scores.clarity}</td>
                                  </tr>
                                  <tr>
                                    <td className="border px-2 py-1">Structure</td>
                                    <td className="border px-2 py-1">{qa.feedback.scores.structure}</td>
                                  </tr>
                                  <tr>
                                    <td className="border px-2 py-1">Relevance</td>
                                    <td className="border px-2 py-1">{qa.feedback.scores.relevance}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            {qa.feedback.star && (
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm border mt-2">
                                  <thead>
                                    <tr className="bg-white">
                                      <th className="border px-2 py-1 text-left">STAR Element</th>
                                      <th className="border px-2 py-1 text-left">Notes</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {qa.feedback.star.situation && (
                                      <tr>
                                        <td className="border px-2 py-1">Situation</td>
                                        <td className="border px-2 py-1">{qa.feedback.star.situation}</td>
                                      </tr>
                                    )}
                                    {qa.feedback.star.task && (
                                      <tr>
                                        <td className="border px-2 py-1">Task</td>
                                        <td className="border px-2 py-1">{qa.feedback.star.task}</td>
                                      </tr>
                                    )}
                                    {qa.feedback.star.action && (
                                      <tr>
                                        <td className="border px-2 py-1">Action</td>
                                        <td className="border px-2 py-1">{qa.feedback.star.action}</td>
                                      </tr>
                                    )}
                                    {qa.feedback.star.result && (
                                      <tr>
                                        <td className="border px-2 py-1">Result</td>
                                        <td className="border px-2 py-1">{qa.feedback.star.result}</td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            )}
                            {qa.feedback.strengths?.length ? (
                              <div>
                                <div className="font-medium mt-2">Strengths</div>
                                <ul className="list-disc pl-5 space-y-1">
                                  {qa.feedback.strengths.map((s, i) => (
                                    <li key={i}>{s}</li>
                                  ))}
                                </ul>
                              </div>
                            ) : null}
                            {qa.feedback.improvements?.length ? (
                              <div>
                                <div className="font-medium mt-2">Improvements</div>
                                <ul className="list-disc pl-5 space-y-1">
                                  {qa.feedback.improvements.map((s, i) => (
                                    <li key={i}>{s}</li>
                                  ))}
                                </ul>
                              </div>
                            ) : null}
                          </div>
                        )}
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Final Report */}
      {finalReport && (
        <div className="mt-6">
          <div className="flex items-center justify-between border bg-zinc-50 px-4 py-3 rounded-none">
            <h4 className="font-medium flex items-center gap-2 text-base">
              <FileText className="h-4 w-4 text-zinc-600" />
              Interview Feedback Report
            </h4>
            <Button variant="outline" size="sm" className="rounded-none" onClick={() => handleCopy(JSON.stringify(finalReport, null, 2))}>
              <Copy className="h-4 w-4 mr-2"/> Copy Report
            </Button>
          </div>
          <div className="border border-t-0 p-4 rounded-none space-y-4">
            <p className="text-sm">{finalReport.overallSummary}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border">
                <thead>
                  <tr className="bg-white">
                    <th className="border px-2 py-1 text-left">Criterion</th>
                    <th className="border px-2 py-1 text-left">Average Score (1-10)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-2 py-1">Clarity</td>
                    <td className="border px-2 py-1">{finalReport.averageScores.clarity}</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">Structure</td>
                    <td className="border px-2 py-1">{finalReport.averageScores.structure}</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-1">Relevance</td>
                    <td className="border px-2 py-1">{finalReport.averageScores.relevance}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {finalReport.topStrengths?.length ? (
              <div>
                <div className="font-medium mt-2">Top Strengths</div>
                <ul className="list-disc pl-5 space-y-1">
                  {finalReport.topStrengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {finalReport.topImprovements?.length ? (
              <div>
                <div className="font-medium mt-2">Top Areas to Improve</div>
                <ul className="list-disc pl-5 space-y-1">
                  {finalReport.topImprovements.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {finalReport.additionalSuggestions?.length ? (
              <div>
                <div className="font-medium mt-2">Additional Suggestions</div>
                <ul className="list-disc pl-5 space-y-1">
                  {finalReport.additionalSuggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}


