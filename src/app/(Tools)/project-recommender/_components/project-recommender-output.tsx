"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { 
  Bot, 
  Check, 
  Copy, 
  Edit, 
  Target, 
  Users, 
  Layers, 
  Rocket, 
  TrendingUp, 
  Star,
  ArrowRight,
  Zap,
  CheckCircle,
  Circle,
  Code,
  Clock,
  Trophy,
  Github,
  ExternalLink,
  Lightbulb,
  Wrench,
  Flag,
  BookOpen,
  Sparkles
} from "lucide-react"

interface ProjectOutputProps {
  generatedProjects: string
  isLoading: boolean
}

interface Project {
  id: string
  title: string
  description: string
  features: string[]
  difficulty: string
  techStack: string[]
  tags: string[]
  estimatedTime: string
  starterTutorials?: string[]
  githubBoilerplates?: string[]
}

interface ProjectCardProps {
  project: Project
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
            {index + 1}
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
        </div>
        <Badge className={`${getDifficultyColor(project.difficulty)} font-medium`}>
          {project.difficulty}
        </Badge>
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>

      <div className="grid md:grid-cols-2 gap-6 mb-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Key Features
          </h4>
          <ul className="space-y-1">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <Circle className="h-3 w-3 mt-1 text-gray-400 fill-current" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
            <Code className="h-4 w-4" />
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            {project.estimatedTime}
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 4).map((tag, idx) => (
            <Badge key={idx} variant="outline" className="text-xs text-gray-600 border-gray-300">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 4 && (
            <Badge variant="outline" className="text-xs text-gray-500 border-gray-300">
              +{project.tags.length - 4}
            </Badge>
          )}
        </div>
      </div>

      {project.githubBoilerplates && project.githubBoilerplates.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
            <Github className="h-4 w-4" />
            Example Resources
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.githubBoilerplates.map((repo, idx) => (
              <Badge key={idx} variant="outline" className="text-xs text-blue-600 border-blue-200 hover:bg-blue-50">
                <ExternalLink className="h-3 w-3 mr-1" />
                Boilerplate {idx + 1}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function ProjectOutput({ generatedProjects, isLoading }: ProjectOutputProps) {
  const [isCopied, setIsCopied] = React.useState(false)
  const [isEditing, setIsEditing] = React.useState(false)
  const [editedProjects, setEditedProjects] = React.useState("")

  React.useEffect(() => {
    if (generatedProjects) {
      setEditedProjects(generatedProjects)
      setIsEditing(false)
    }
  }, [generatedProjects])

  const handleCopy = () => {
    navigator.clipboard.writeText(isEditing ? editedProjects : generatedProjects)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const getSectionIcon = (title: string) => {
    const titleLower = title.toLowerCase()
    
    if (titleLower.includes('project') && titleLower.includes('1') || titleLower.includes('title')) {
      return <Target className="h-5 w-5 text-blue-600" />
    }
    if (titleLower.includes('project') && titleLower.includes('2')) {
      return <Rocket className="h-5 w-5 text-green-600" />
    }
    if (titleLower.includes('project') && titleLower.includes('3')) {
      return <Star className="h-5 w-5 text-purple-600" />
    }
    if (titleLower.includes('project') && titleLower.includes('4')) {
      return <TrendingUp className="h-5 w-5 text-orange-600" />
    }
    if (titleLower.includes('project') && titleLower.includes('5')) {
      return <Zap className="h-5 w-5 text-pink-600" />
    }
    if (titleLower.includes('description') || titleLower.includes('overview')) {
      return <BookOpen className="h-5 w-5 text-indigo-600" />
    }
    if (titleLower.includes('features') || titleLower.includes('suggested')) {
      return <Layers className="h-5 w-5 text-emerald-600" />
    }
    if (titleLower.includes('difficulty') || titleLower.includes('level')) {
      return <Trophy className="h-5 w-5 text-amber-600" />
    }
    if (titleLower.includes('tags') || titleLower.includes('github')) {
      return <Github className="h-5 w-5 text-slate-600" />
    }
    if (titleLower.includes('stack') || titleLower.includes('tech')) {
      return <Code className="h-5 w-5 text-cyan-600" />
    }
    if (titleLower.includes('resources') || titleLower.includes('links')) {
      return <ExternalLink className="h-5 w-5 text-violet-600" />
    }
    if (titleLower.includes('steps') || titleLower.includes('implementation')) {
      return <Flag className="h-5 w-5 text-red-600" />
    }
    
    return <ArrowRight className="h-5 w-5 text-gray-600" />
  }

  const getSectionColor = (title: string) => {
    const titleLower = title.toLowerCase()
    
    if (titleLower.includes('project') && titleLower.includes('1') || titleLower.includes('title')) {
      return "border-blue-300 bg-gradient-to-r from-blue-50 to-blue-100"
    }
    if (titleLower.includes('project') && titleLower.includes('2')) {
      return "border-green-300 bg-gradient-to-r from-green-50 to-green-100"
    }
    if (titleLower.includes('project') && titleLower.includes('3')) {
      return "border-purple-300 bg-gradient-to-r from-purple-50 to-purple-100"
    }
    if (titleLower.includes('project') && titleLower.includes('4')) {
      return "border-orange-300 bg-gradient-to-r from-orange-50 to-orange-100"
    }
    if (titleLower.includes('project') && titleLower.includes('5')) {
      return "border-pink-300 bg-gradient-to-r from-pink-50 to-pink-100"
    }
    if (titleLower.includes('description') || titleLower.includes('overview')) {
      return "border-indigo-300 bg-gradient-to-r from-indigo-50 to-indigo-100"
    }
    if (titleLower.includes('features') || titleLower.includes('suggested')) {
      return "border-emerald-300 bg-gradient-to-r from-emerald-50 to-emerald-100"
    }
    if (titleLower.includes('difficulty') || titleLower.includes('level')) {
      return "border-amber-300 bg-gradient-to-r from-amber-50 to-amber-100"
    }
    if (titleLower.includes('tags') || titleLower.includes('github')) {
      return "border-slate-300 bg-gradient-to-r from-slate-50 to-slate-100"
    }
    if (titleLower.includes('stack') || titleLower.includes('tech')) {
      return "border-cyan-300 bg-gradient-to-r from-cyan-50 to-cyan-100"
    }
    if (titleLower.includes('resources') || titleLower.includes('links')) {
      return "border-violet-300 bg-gradient-to-r from-violet-50 to-violet-100"
    }
    
    return "border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100"
  }

  const parseMarkdownList = (content: string) => {
    const lines = content.split('\n')
    const items: React.ReactNode[] = []
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim()
      if (!trimmedLine) return
      
      // Handle bullet points (- or *)
      if (trimmedLine.match(/^[-*]\s+/)) {
        const text = trimmedLine.replace(/^[-*]\s+/, '')
        items.push(
          <div key={index} className="flex items-start gap-3 py-2">
            <Circle className="h-4 w-4 mt-1 text-blue-500 fill-current" />
            <span className="text-gray-700 leading-relaxed">{text}</span>
          </div>
        )
      }
      // Handle numbered lists
      else if (trimmedLine.match(/^\d+\.\s+/)) {
        const text = trimmedLine.replace(/^\d+\.\s+/, '')
        const number = trimmedLine.match(/^(\d+)\./)?.[1] || '1'
        items.push(
          <div key={index} className="flex items-start gap-3 py-2">
            <div className="flex items-center justify-center w-6 h-6 bg-blue-500 text-white text-xs font-bold rounded-full mt-0.5">
              {number}
            </div>
            <span className="text-gray-700 leading-relaxed">{text}</span>
          </div>
        )
      }
      // Handle tags (prefixed with #)
      else if (trimmedLine.startsWith('#') && !trimmedLine.startsWith('##')) {
        const tags = trimmedLine.split(/[,\s]+/).filter(tag => tag.startsWith('#'))
        if (tags.length > 0) {
          items.push(
            <div key={index} className="flex flex-wrap gap-2 py-2">
              {tags.map((tag, tagIndex) => (
                <Badge key={tagIndex} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                  {tag}
                </Badge>
              ))}
            </div>
          )
        }
      }
      // Regular text
      else if (trimmedLine && !trimmedLine.startsWith('#')) {
        items.push(
          <p key={index} className="text-gray-700 leading-relaxed py-1">
            {trimmedLine}
          </p>
        )
      }
    })
    
    return items.length > 0 ? <div className="space-y-1">{items}</div> : null
  }

  const formatProjects = (projects: string) => {
    if (!projects) return []

    // Try to parse as JSON first
    try {
      const jsonData = JSON.parse(projects)
      if (Array.isArray(jsonData)) {
        return jsonData.map((project, index) => (
          <ProjectCard key={project.id || index} project={project} index={index} />
        ))
      }
    } catch (error) {
      // Fall back to text parsing if not JSON
      console.log('Not JSON format, parsing as text')
    }

    // Split by project headers (### Project or ## Project or **Project)
    const sections = projects.split(/(?=#{2,3}\s*Project|\*\*Project)/g).filter(section => section.trim())
    
    if (sections.length === 0) {
      // Fallback: split by double line breaks
      return projects.split(/\n\s*\n/g).map((section, index) => {
        const trimmedSection = section.trim()
        if (!trimmedSection) return null

        return (
          <div key={index} className="p-6 rounded-xl border border-gray-200 bg-white mb-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="space-y-3">
              {parseMarkdownList(trimmedSection) || (
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{trimmedSection}</p>
              )}
            </div>
          </div>
        )
      }).filter(Boolean)
    }

    return sections.map((section, index) => {
      const trimmedSection = section.trim()
      if (!trimmedSection) return null

      // Extract project header and content
      const headerMatch = trimmedSection.match(/^(#{2,3}|\*\*)\s*(Project.*?)(\*\*|\n|$)/)
      
      if (headerMatch) {
        const title = headerMatch[2].trim()
        const content = trimmedSection.replace(/^(#{2,3}|\*\*)\s*Project.*?(\*\*|\n|$)/, '').trim()
        
        const sectionColor = getSectionColor(title)
        const sectionIcon = getSectionIcon(title)
        
        return (
          <div key={index} className={`p-6 rounded-xl border-l-4 ${sectionColor} mb-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.01]`}>
            <div className="flex items-center gap-3 mb-4">
              {sectionIcon}
              <h3 className="text-xl font-bold text-gray-800">
                {title}
              </h3>
            </div>
            {content && (
              <div className="space-y-4">
                {content.split(/\n\s*\n/).map((subsection, subIndex) => {
                  const trimmedSubsection = subsection.trim()
                  if (!trimmedSubsection) return null
                  
                  // Look for subsection headers
                  const subHeaderMatch = trimmedSubsection.match(/^(.*?):\s*(.*)/)
                  
                  if (subHeaderMatch) {
                    const subTitle = subHeaderMatch[1].trim()
                    const subContent = subHeaderMatch[2].trim()
                    const subIcon = getSectionIcon(subTitle)
                    
                    return (
                      <div key={subIndex} className="bg-white/50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                          {subIcon}
                          <h4 className="font-semibold text-gray-800">{subTitle}</h4>
                        </div>
                        <div className="space-y-2">
                          {parseMarkdownList(subContent) || (
                            <p className="text-gray-700 leading-relaxed text-sm">
                              {subContent}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  }
                  
                  return (
                    <div key={subIndex} className="space-y-2">
                      {parseMarkdownList(trimmedSubsection) || (
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {trimmedSubsection}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      }

      // Fallback: treat as regular content
      return (
        <div key={index} className="p-6 rounded-xl border border-gray-200 bg-white mb-6 shadow-lg">
          <div className="space-y-3">
            {parseMarkdownList(trimmedSection) || (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{trimmedSection}</p>
            )}
          </div>
        </div>
      )
    }).filter(Boolean)
  }

  if (isLoading) {
    return (
      <Card className="border border-gray-200 bg-white">
        <CardHeader className="bg-white border-b border-gray-100">
          <CardTitle className="flex items-center gap-3 text-gray-900">
            <Target className="h-5 w-5 text-gray-700 animate-pulse" />
            <span>Finding Perfect Projects...</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-6">
            {/* Project 1 Skeleton */}
            <div className="p-6 rounded-xl border-l-4 border-blue-200 bg-blue-50">
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-5 w-5 text-blue-600" />
                <Skeleton className="h-6 w-64" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex flex-wrap gap-2 mt-3">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-18" />
                </div>
              </div>
            </div>
            
            {/* Project 2 Skeleton */}
            <div className="p-6 rounded-xl border-l-4 border-green-200 bg-green-50">
              <div className="flex items-center gap-3 mb-4">
                <Rocket className="h-5 w-5 text-green-600" />
                <Skeleton className="h-6 w-56" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex flex-wrap gap-2 mt-3">
                  <Skeleton className="h-6 w-14" />
                  <Skeleton className="h-6 w-22" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </div>
            </div>
            
            {/* Project 3 Skeleton */}
            <div className="p-6 rounded-xl border-l-4 border-purple-200 bg-purple-50">
              <div className="flex items-center gap-3 mb-4">
                <Star className="h-5 w-5 text-purple-600" />
                <Skeleton className="h-6 w-60" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <div className="flex flex-wrap gap-2 mt-3">
                  <Skeleton className="h-6 w-18" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!generatedProjects) {
    return (
      <Card className="flex flex-col items-center justify-center h-full text-center p-8 min-h-[400px] border-2 border-dashed border-gray-200 bg-white">
        <CardHeader>
          <div className="flex items-center justify-center w-24 h-24 mx-auto bg-gray-100 rounded-full mb-6">
            <Target className="w-12 h-12 text-gray-600" />
          </div>
          <CardTitle className="text-2xl text-gray-900">
            Your Project Recommendations Will Appear Here
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 mt-4">
            Fill out the form above and click{" "}
            <span className="font-semibold text-gray-900">&quot;Get Project Recommendations&quot;</span>{" "}
            to discover projects tailored to your skills and interests.
          </CardDescription>
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Project Matching</span>
          </div>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="border border-gray-200 shadow-sm bg-white">
      <CardHeader className="bg-white border-b border-gray-100 flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-3 text-gray-900">
          <Bot className="h-5 w-5 text-gray-700" />
          <span>Your Project Recommendations</span>
        </CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleEditToggle}
            title={isEditing ? "Save" : "Edit"}
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            title="Copy to clipboard"
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 bg-white">
        {isEditing ? (
          <div className="space-y-4">
            <Textarea
              value={editedProjects}
              onChange={e => setEditedProjects(e.target.value)}
              className="w-full min-h-[500px] resize-y font-mono text-sm border-gray-300 focus:border-gray-400"
              placeholder="Edit your project recommendations..."
            />
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setIsEditing(false)
                }}
                className="bg-gray-900 hover:bg-gray-800 text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        ) : (
          <div className="prose prose-lg max-w-none">
            <div className="space-y-6">
              {formatProjects(generatedProjects)}
            </div>
            
            {/* Success message */}
            <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <Target className="h-5 w-5" />
                <span>Your personalized project recommendations are ready! Start building and grow your skills.</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
