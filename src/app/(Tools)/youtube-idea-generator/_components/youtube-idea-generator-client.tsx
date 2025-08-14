"use client"

import { useState, useRef, useEffect } from "react"
import { YouTubeIdeaGeneratorForm, YouTubeIdeaFormValues } from "./youtube-idea-generator-form"
import { YouTubeIdeaOutput } from "./youtube-idea-generator-output"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown, Youtube, Video, Film, Camera, Play, Zap } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import Link from "next/link"
import NativeBannerAd from "@/components/NativeBannerAd";
export default function YouTubeIdeaGeneratorClient() {
  const [generatedIdeas, setGeneratedIdeas] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isOpen, setIsOpen] = useState(true)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const isMobile = useIsMobile()

  // Clear progress interval on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  // Handle form submission
  const handleSubmit = async (data: YouTubeIdeaFormValues) => {
    setIsLoading(true)
    setGeneratedIdeas("")
    setProgress(0)

    // Start progress simulation
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
    
    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        // Slow down as we get closer to 90%
        const increment = prev < 30 ? 5 : prev < 60 ? 3 : prev < 80 ? 1 : 0.5
        const nextProgress = Math.min(prev + increment, 90)
        return nextProgress
      })
    }, 1000)

    try {
      const prompt = generatePrompt(data)
      
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          temperature: 0.7,
          max_tokens: 2500,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate YouTube video ideas")
      }

      const result = await response.json()
      setGeneratedIdeas(result.choices[0].text.trim())
      
      // Complete the progress bar
      setProgress(100)
      toast.success("YouTube video ideas generated successfully!")
      
      // If on mobile, close the form after generating
      if (isMobile) {
        setIsOpen(false)
      }
      
      // Scroll to results on mobile
      if (isMobile) {
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          })
        }, 100)
      }
    } catch (error) {
      console.error("Error generating YouTube video ideas:", error)
      toast.error("Failed to generate YouTube video ideas. Please try again.")
    } finally {
      setIsLoading(false)
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
        progressIntervalRef.current = null
      }
    }
  }

  // Generate AI prompt based on form data
  const generatePrompt = (data: YouTubeIdeaFormValues): string => {
    return `Generate 5 creative and engaging YouTube video ideas for a ${data.channelType} channel in the ${data.channelNiche} niche.

Target Audience: ${data.targetAudience}
Video Formats to Consider: ${data.videoFormats.join(', ')}
Preferred Video Length: ${data.videoLength}
${data.competitorChannels ? `Similar Channels: ${data.competitorChannels}` : ''}
${data.trendingTopics ? `Trending Topics: ${data.trendingTopics}` : ''}
${data.additionalInfo ? `Additional Information: ${data.additionalInfo}` : ''}

For each video idea, include:
1. A catchy, clickable title (that's not clickbait)
2. Hook/intro idea to grab viewer attention in the first 15 seconds
3. Thumbnail concept description
4. Video structure/outline
5. Key talking points
6. SEO keywords and tags
7. Audience engagement strategies (questions to ask, calls to action)
8. Estimated optimal video length

Format each idea with clear sections using markdown headers (##) and bullet points for structure and details. Make the ideas specific to the niche, engaging for the target audience, and optimized for YouTube's algorithm.`
  }

  // Related tools that might interest the user
  const relatedTools = [
    {
      name: "Video Script Generator",
      description: "Create scripts for your videos",
      href: "/video-script-generator",
      icon: <Film className="h-5 w-5 text-purple-500" />,
    },
    {
      name: "Thumbnail Creator",
      description: "Design eye-catching thumbnails",
      href: "/thumbnail-creator",
      icon: <Camera className="h-5 w-5 text-blue-500" />,
    },
    {
      name: "Content Calendar",
      description: "Plan your content schedule",
      href: "/content-calendar",
      icon: <Play className="h-5 w-5 text-red-500" />,
    },
  ]

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        {/* Form Section */}
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full space-y-4"
        >
          <div className="flex items-center justify-center relative w-full">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Generate YouTube Video Ideas</h2>
            <div className="absolute right-0">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>

          <CollapsibleContent className="space-y-4">
            <YouTubeIdeaGeneratorForm onSubmit={handleSubmit} isLoading={isLoading} />
          </CollapsibleContent>
        </Collapsible>

        {/* Progress Bar */}
        {isLoading && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Generating YouTube video ideas...</span>
              <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Output Section */}
        <div className="w-full">
          <YouTubeIdeaOutput generatedIdeas={generatedIdeas} isLoading={isLoading} />
        </div>

        {/* Related Tools */}
        {!isLoading && generatedIdeas && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Youtube className="h-5 w-5 text-red-500" />
              <span>Related Tools You Might Like</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedTools.map((tool, index) => (
                <Link
                  key={index}
                  href={tool.href}
                  className="flex items-start p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors"
                >
                  <div className="flex-shrink-0 mr-3">{tool.icon}</div>
                  <div>
                    <h4 className="font-medium text-gray-900">{tool.name}</h4>
                    <p className="text-sm text-gray-500">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Ad Banner */}
        <NativeBannerAd />

        {/* SEO Content - Server-side rendered */}
        <div className="mt-12 prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">YouTube Video Ideas Generator: Create Engaging Content</h2>
          <p className="text-gray-600 mb-4">
            Coming up with fresh, engaging YouTube video ideas can be challenging, especially when you&apos;re creating content regularly. 
            Our AI-powered YouTube Video Ideas Generator helps content creators, vloggers, and marketers overcome creative blocks 
            and develop compelling video concepts that resonate with their audience.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">How to Use the YouTube Video Ideas Generator</h3>
          <ol className="space-y-3 text-gray-600 list-decimal list-inside mb-6">
            <li>Enter your channel niche or topic (e.g., Tech Reviews, Cooking, Fitness)</li>
            <li>Select your channel type (Educational, Entertainment, Vlog, etc.)</li>
            <li>Define your target audience</li>
            <li>Choose preferred video formats and length</li>
            <li>Optionally add information about similar channels or trending topics</li>
            <li>Click &quot;Generate YouTube Video Ideas&quot; and get creative content suggestions</li>
          </ol>
          
          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Benefits of Using Our YouTube Idea Generator</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4 text-red-500" />
                Save Time and Effort
              </h4>
              <p className="text-gray-600 text-sm">
                Generate dozens of video ideas in seconds instead of spending hours brainstorming.
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <Video className="h-4 w-4 text-red-500" />
                Tailored to Your Niche
              </h4>
              <p className="text-gray-600 text-sm">
                Get ideas specifically designed for your content niche and target audience.
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <Film className="h-4 w-4 text-red-500" />
                Complete Video Concepts
              </h4>
              <p className="text-gray-600 text-sm">
                Receive full concepts including titles, hooks, outlines, and SEO keywords.
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <Play className="h-4 w-4 text-red-500" />
                Algorithm-Friendly Ideas
              </h4>
              <p className="text-gray-600 text-sm">
                Generate ideas optimized for YouTube&apos;s algorithm and viewer engagement.
              </p>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Types of YouTube Videos You Can Create</h3>
          <p className="text-gray-600 mb-4">
            Our tool can help you generate ideas for various types of YouTube content:
          </p>
          <ul className="space-y-2 text-gray-600 list-disc list-inside mb-6">
            <li>Tutorial and how-to videos</li>
            <li>Product reviews and comparisons</li>
            <li>Vlogs and day-in-the-life content</li>
            <li>List videos (Top 10, Best of, etc.)</li>
            <li>Reaction videos</li>
            <li>Short-form content</li>
            <li>Commentary and opinion pieces</li>
            <li>Interviews and podcasts</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Tips for Creating Engaging YouTube Videos</h3>
          <p className="text-gray-600 mb-4">
            Once you&apos;ve generated your video ideas, consider these tips to maximize their impact:
          </p>
          <ol className="space-y-3 text-gray-600 list-decimal list-inside mb-6">
            <li>Create a compelling hook in the first 15 seconds</li>
            <li>Design eye-catching thumbnails that accurately represent your content</li>
            <li>Optimize your title and description with relevant keywords</li>
            <li>Include calls-to-action throughout your video</li>
            <li>Respond to comments to boost engagement</li>
            <li>Analyze performance metrics to refine future content</li>
          </ol>
          
          <p className="text-gray-600 mt-8">
            Whether you&apos;re just starting your YouTube journey or looking to revitalize an established channel, 
            our YouTube Video Ideas Generator provides the creative spark you need to create content that resonates 
            with viewers and performs well on the platform.
          </p>
        </div>
      </div>
    </div>
  )
}