"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  Loader2,
  User,
  Mail,
  Building2,
  Briefcase,
  Award,
  Send,
  Palette,
  Clock,
  FileText,
} from "lucide-react"

const tones = [
  "Professional",
  "Enthusiastic",
  "Confident",
  "Friendly",
  "Formal",
  "Creative",
]

const lengths = ["Short", "Medium", "Long"]

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email().optional().or(z.literal("")),
  position: z.string().min(1, { message: "Position title is required." }),
  company: z.string().min(1, { message: "Company name is required." }),
  jobDescription: z.string().optional(),
  experience: z
    .string()
    .min(20, { message: "Please provide at least 20 characters describing your experience." }),
  skills: z
    .string()
    .min(10, { message: "Please provide at least 10 characters describing your skills." }),
  tone: z.string().min(1, { message: "Please select a tone." }),
  length: z.string().min(1, { message: "Please select a length." }),
  additionalInfo: z.string().optional(),
})

export type CoverLetterFormValues = z.infer<typeof formSchema>

interface CoverLetterFormProps {
  onSubmit: (data: CoverLetterFormValues) => void
  isLoading: boolean
}

export function CoverLetterForm({ onSubmit, isLoading }: CoverLetterFormProps) {
  const form = useForm<CoverLetterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      position: "",
      company: "",
      jobDescription: "",
      experience: "",
      skills: "",
      tone: "Professional",
      length: "Medium",
      additionalInfo: "",
    },
  })

  return (
    <Card className="rounded-lg border-0 shadow-none">
      <CardContent className="p-4 pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base flex items-center gap-2">
                      <User className="h-4 w-4 text-zinc-500" />
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        className="rounded-md text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base flex items-center gap-2">
                      <Mail className="h-4 w-4 text-zinc-500" />
                      Email Address 
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        className="rounded-md text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-zinc-500" />
                      Position Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Software Engineer"
                        className="rounded-md text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-zinc-500" />
                      Company Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tech Company Inc."
                        className="rounded-md text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base flex items-center gap-2">
                    <FileText className="h-4 w-4 text-zinc-500" />
                    Job Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste the job description here to get a more tailored cover letter..."
                      className="resize-y min-h-[100px] rounded-md text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-zinc-500">
                    Including the job description helps create a more targeted cover letter.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base flex items-center gap-2">
                    <Award className="h-4 w-4 text-zinc-500" />
                    Relevant Experience
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your relevant work experience, projects, and achievements..."
                      className="resize-y min-h-[120px] rounded-md text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-zinc-500">
                    Highlight your most relevant experience and accomplishments.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-zinc-500" />
                    Key Skills
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List your relevant skills, technologies, and competencies..."
                      className="resize-y min-h-[100px] rounded-md text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-zinc-500">
                    Include technical skills, soft skills, and relevant certifications.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base flex items-center gap-2">
                      <Palette className="h-4 w-4 text-zinc-500" />
                      Tone
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-md text-sm">
                          <SelectValue placeholder="Select a tone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-md">
                        {tones.map((tone) => (
                          <SelectItem key={tone} value={tone}>
                            {tone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base flex items-center gap-2">
                      <Clock className="h-4 w-4 text-zinc-500" />
                      Length
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-md text-sm">
                          <SelectValue placeholder="Select length" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-md">
                        <SelectItem value="Short">Short (2-3 paragraphs)</SelectItem>
                        <SelectItem value="Medium">Medium (3-4 paragraphs)</SelectItem>
                        <SelectItem value="Long">Long (4-5 paragraphs)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base flex items-center gap-2">
                    <Award className="h-4 w-4 text-zinc-500" />
                    Additional Information (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any specific points you want to highlight or company research you'd like to include..."
                      className="resize-y min-h-[100px] rounded-md text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-zinc-500">
                    Include any additional details that would make your cover letter more personalized.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md text-base py-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Cover Letter...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Generate Cover Letter
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}