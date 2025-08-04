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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { 
  Loader2, 
  Code, 
  Target, 
  Users, 
  Tag, 
  Layers, 
  Zap, 
  GraduationCap,
  Briefcase,
  Heart,
  Settings,
  Brain,
  Trophy,
  Gamepad2,
  Globe,
  Smartphone,
  Monitor,
  Database,
  Server,
  Terminal,
  Github,
  Palette,
  Camera,
  Music,
  Calculator,
  Calendar,
  MessageSquare,
  ShoppingCart,
  Utensils,
  Plane,
  BookOpen,
  Activity,
  Shield
} from "lucide-react"

const techStacks = [
  { value: "HTML/CSS/JS", icon: <Globe className="h-4 w-4" />, color: "text-orange-600" },
  { value: "React", icon: <Code className="h-4 w-4" />, color: "text-blue-600" },
  { value: "Vue.js", icon: <Code className="h-4 w-4" />, color: "text-green-600" },
  { value: "Angular", icon: <Code className="h-4 w-4" />, color: "text-red-600" },
  { value: "Node.js", icon: <Server className="h-4 w-4" />, color: "text-green-700" },
  { value: "Express.js", icon: <Server className="h-4 w-4" />, color: "text-gray-600" },
  { value: "Next.js", icon: <Code className="h-4 w-4" />, color: "text-black" },
  { value: "Python", icon: <Terminal className="h-4 w-4" />, color: "text-yellow-600" },
  { value: "Django", icon: <Terminal className="h-4 w-4" />, color: "text-green-800" },
  { value: "Flask", icon: <Terminal className="h-4 w-4" />, color: "text-blue-700" },
  { value: "Java", icon: <Terminal className="h-4 w-4" />, color: "text-red-700" },
  { value: "Spring Boot", icon: <Terminal className="h-4 w-4" />, color: "text-green-600" },
  { value: "PHP", icon: <Terminal className="h-4 w-4" />, color: "text-purple-600" },
  { value: "Laravel", icon: <Terminal className="h-4 w-4" />, color: "text-red-500" },
  { value: "Ruby on Rails", icon: <Terminal className="h-4 w-4" />, color: "text-red-600" },
  { value: "C#/.NET", icon: <Terminal className="h-4 w-4" />, color: "text-purple-700" },
  { value: "Go", icon: <Terminal className="h-4 w-4" />, color: "text-blue-500" },
  { value: "Rust", icon: <Terminal className="h-4 w-4" />, color: "text-orange-700" },
  { value: "React Native", icon: <Smartphone className="h-4 w-4" />, color: "text-blue-500" },
  { value: "Flutter", icon: <Smartphone className="h-4 w-4" />, color: "text-blue-400" },
  { value: "Swift/iOS", icon: <Smartphone className="h-4 w-4" />, color: "text-gray-700" },
  { value: "Kotlin/Android", icon: <Smartphone className="h-4 w-4" />, color: "text-orange-500" },
  { value: "MongoDB", icon: <Database className="h-4 w-4" />, color: "text-green-500" },
  { value: "PostgreSQL", icon: <Database className="h-4 w-4" />, color: "text-blue-800" },
  { value: "MySQL", icon: <Database className="h-4 w-4" />, color: "text-orange-600" },
  { value: "Firebase", icon: <Database className="h-4 w-4" />, color: "text-yellow-500" },
  { value: "AWS", icon: <Server className="h-4 w-4" />, color: "text-orange-500" },
  { value: "Docker", icon: <Server className="h-4 w-4" />, color: "text-blue-600" },
  { value: "Kubernetes", icon: <Server className="h-4 w-4" />, color: "text-blue-700" },
  { value: "TypeScript", icon: <Code className="h-4 w-4" />, color: "text-blue-600" }
]

const careerFocuses = [
  { value: "Frontend Development", icon: <Monitor className="h-4 w-4" />, color: "text-blue-600" },
  { value: "Backend Development", icon: <Server className="h-4 w-4" />, color: "text-green-600" },
  { value: "Full-Stack Development", icon: <Layers className="h-4 w-4" />, color: "text-purple-600" },
  { value: "Mobile Development", icon: <Smartphone className="h-4 w-4" />, color: "text-orange-600" },
  { value: "Data Science", icon: <Brain className="h-4 w-4" />, color: "text-pink-600" },
  { value: "Machine Learning/AI", icon: <Brain className="h-4 w-4" />, color: "text-red-600" },
  { value: "DevOps/Cloud", icon: <Settings className="h-4 w-4" />, color: "text-gray-600" },
  { value: "Game Development", icon: <Gamepad2 className="h-4 w-4" />, color: "text-indigo-600" },
  { value: "UI/UX Design", icon: <Palette className="h-4 w-4" />, color: "text-violet-600" },
  { value: "Cybersecurity", icon: <Shield className="h-4 w-4" />, color: "text-red-700" },
  { value: "Product Management", icon: <Briefcase className="h-4 w-4" />, color: "text-emerald-600" }
]

const skillLevels = [
  { value: "Beginner", label: "Beginner", description: "New to programming, learning basics" },
  { value: "Intermediate", label: "Intermediate", description: "Comfortable with fundamentals, ready for challenges" },
  { value: "Advanced", label: "Advanced", description: "Experienced developer, seeking complex projects" }
]

const interestAreas = [
  { id: "productivity", label: "Productivity", icon: <Target className="h-4 w-4" />, color: "text-blue-600" },
  { id: "finance", label: "Finance", icon: <Calculator className="h-4 w-4" />, color: "text-green-600" },
  { id: "ai-tools", label: "AI Tools", icon: <Brain className="h-4 w-4" />, color: "text-purple-600" },
  { id: "open-source", label: "Open Source", icon: <Github className="h-4 w-4" />, color: "text-gray-700" },
  { id: "games", label: "Games", icon: <Gamepad2 className="h-4 w-4" />, color: "text-indigo-600" },
  { id: "social", label: "Social", icon: <MessageSquare className="h-4 w-4" />, color: "text-pink-600" },
  { id: "e-commerce", label: "E-commerce", icon: <ShoppingCart className="h-4 w-4" />, color: "text-orange-600" },
  { id: "health", label: "Health & Fitness", icon: <Activity className="h-4 w-4" />, color: "text-red-600" },
  { id: "education", label: "Education", icon: <BookOpen className="h-4 w-4" />, color: "text-cyan-600" },
  { id: "food", label: "Food & Cooking", icon: <Utensils className="h-4 w-4" />, color: "text-amber-600" },
  { id: "travel", label: "Travel", icon: <Plane className="h-4 w-4" />, color: "text-teal-600" },
  { id: "media", label: "Media & Entertainment", icon: <Camera className="h-4 w-4" />, color: "text-violet-600" },
  { id: "music", label: "Music", icon: <Music className="h-4 w-4" />, color: "text-rose-600" },
  { id: "calendar", label: "Calendar & Events", icon: <Calendar className="h-4 w-4" />, color: "text-slate-600" }
]

const formSchema = z.object({
  techStack: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Please select at least one technology.",
  }),
  careerFocus: z.string().min(1, { message: "Please select your career focus." }),
  skillLevel: z.enum(["Beginner", "Intermediate", "Advanced"], {
    required_error: "Please select your skill level.",
  }),
  interestAreas: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Please select at least one interest area.",
  }),
  timeCommitment: z.string().min(1, { message: "Please specify your time commitment." }),
  portfolioGoal: z.string().optional(),
  additionalRequirements: z.string().optional(),
})

export type ProjectFormValues = z.infer<typeof formSchema>

interface ProjectRecommenderFormProps {
  onSubmit: (data: ProjectFormValues) => void
  isLoading: boolean
}

export function ProjectRecommenderForm({
  onSubmit,
  isLoading,
}: ProjectRecommenderFormProps) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      techStack: [],
      careerFocus: "",
      skillLevel: "Intermediate",
      interestAreas: [],
      timeCommitment: "",
      portfolioGoal: "",
      additionalRequirements: "",
    },
  })

  return (
    <Card className="border border-gray-200 shadow-sm bg-white">
      <CardHeader className="bg-white border-b border-gray-100">
        <CardTitle className="flex items-center gap-3 text-gray-900">
          <Target className="h-5 w-5 text-gray-700" />
          <span>Project Requirements</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Tech Stack */}
            <FormField
              control={form.control}
              name="techStack"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="flex items-center gap-2 text-gray-900 font-medium">
                      <Code className="h-4 w-4" />
                      Tech Stack Known *
                    </FormLabel>
                    <FormDescription className="text-gray-600">
                      Select the technologies you're familiar with
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-72 overflow-y-auto border border-gray-200 rounded-lg p-6 bg-gray-50">
                    {techStacks.map((tech) => (
                      <FormField
                        key={tech.value}
                        control={form.control}
                        name="techStack"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={tech.value}
                              className="flex flex-row items-start space-x-3 space-y-0 p-2 rounded-md hover:bg-white transition-colors"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(tech.value)}
                                  className="border-gray-300 data-[state=checked]:bg-gray-900"
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), tech.value])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== tech.value
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal cursor-pointer flex items-center gap-2">
                                <span className={tech.color}>{tech.icon}</span>
                                <span className="text-gray-700 hover:text-gray-900">{tech.value}</span>
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Career Focus */}
              <FormField
                control={form.control}
                name="careerFocus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-gray-900 font-medium">
                      <Briefcase className="h-4 w-4" />
                      Career Focus *
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="border-gray-200 focus:border-gray-400 h-10 overflow-hidden">
                        <SelectValue placeholder="Select your career focus" className="truncate" />
                      </SelectTrigger>
                      <SelectContent>
                        {careerFocuses.map(focus => (
                          <SelectItem key={focus.value} value={focus.value}>
                            <div className="flex items-center gap-2">
                              <span className={focus.color}>{focus.icon}</span>
                              {focus.value}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Skill Level */}
              <FormField
                control={form.control}
                name="skillLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-gray-900 font-medium">
                      <GraduationCap className="h-4 w-4" />
                      Current Skill Level *
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="border-gray-200 focus:border-gray-400 h-10 overflow-hidden">
                        <SelectValue placeholder="Select your skill level" className="truncate" />
                      </SelectTrigger>
                      <SelectContent>
                        {skillLevels.map(level => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Interest Areas */}
            <FormField
              control={form.control}
              name="interestAreas"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="flex items-center gap-2 text-gray-900 font-medium">
                      <Heart className="h-4 w-4" />
                      Interest Areas *
                    </FormLabel>
                    <FormDescription className="text-gray-600">
                      Select areas you're passionate about or want to explore
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {interestAreas.map((area) => (
                      <FormField
                        key={area.id}
                        control={form.control}
                        name="interestAreas"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={area.id}
                              className="flex flex-row items-start space-x-3 space-y-0 p-3 rounded-md hover:bg-gray-50 transition-colors border border-gray-100"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(area.id)}
                                  className="border-gray-300 data-[state=checked]:bg-gray-900"
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), area.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== area.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal cursor-pointer flex items-center gap-2">
                                <span className={area.color}>{area.icon}</span>
                                <span className="text-gray-700 hover:text-gray-900">{area.label}</span>
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Time Commitment */}
            <FormField
              control={form.control}
              name="timeCommitment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-gray-900 font-medium">
                    <Trophy className="h-4 w-4" />
                    Time Commitment
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="border-gray-200 focus:border-gray-400">
                      <SelectValue placeholder="How much time can you dedicate?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekend">Weekend Project (2-3 days)</SelectItem>
                      <SelectItem value="week">One Week (5-7 days)</SelectItem>
                      <SelectItem value="two-weeks">Two Weeks (10-14 days)</SelectItem>
                      <SelectItem value="month">One Month (3-4 weeks)</SelectItem>
                      <SelectItem value="long-term">Long-term Project (2+ months)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Portfolio Goal */}
            <FormField
              control={form.control}
              name="portfolioGoal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-gray-900 font-medium">
                    <Target className="h-4 w-4" />
                    Portfolio Goal (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Showcase full-stack skills, Demonstrate API integration, Build something for resume..."
                      className="resize-y min-h-[80px] border-gray-200 focus:border-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-600">
                    What specific goals do you want to achieve with this project?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Additional Requirements */}
            <FormField
              control={form.control}
              name="additionalRequirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-gray-900 font-medium">
                    <Settings className="h-4 w-4" />
                    Additional Requirements (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any specific constraints, preferences, or special requirements..."
                      className="resize-y min-h-[100px] border-gray-200 focus:border-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-600">
                    Mention any specific requirements, constraints, or preferences
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-4 text-lg transition-colors duration-200 mt-8"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Finding Projects...
                </>
              ) : (
                <>
                  <Target className="mr-2 h-5 w-5" />
                  Get Project Recommendations
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
