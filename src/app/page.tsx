"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Mail,
  MessagesSquare,
  ImageIcon,
  Box,
  Youtube,
  Code,
  FileText,
  PenTool,
  Check,
  FileSpreadsheet,
  Lightbulb,
  Search,
  Globe,
  Map,
  Brain,
  Linkedin,
} from "lucide-react";

// List of AI tools
const aiTools = [
  {
    name: "AI Email Writer",
    href: "/email-writer",
    icon: <Mail className="h-6 w-6" />,
    description: "Write professional emails with AI assistance",
    category: "writing"
  },
  {
    name: "GPT Chatbot",
    href: "/chatbot",
    icon: <MessagesSquare className="h-6 w-6" />,
    description: "Interactive AI chatbot for conversations",
    category: "communication"
  },
  {
    name: "AI Translator",
    href: "/ai-translator",
    icon: <Globe className="h-6 w-6" />,
    description: "Translate text between multiple languages",
    category: "writing"
  },
  {
    name: "LinkedIn Post Generator",
    href: "/linkedin-post-generator",
    icon: <Linkedin className="h-6 w-6" />,
    description: "Create engaging professional LinkedIn posts",
    category: "writing"
  },
  {
    name: "Image Generator",
    href: "/image-generator",
    icon: <ImageIcon className="h-6 w-6" />,
    description: "Create unique AI-generated images",
    category: "visual"
  },
  {
    name: "Logo Generator",
    href: "/logo-generator",
    icon: <Box className="h-6 w-6" />,
    description: "Design professional logos with AI",
    category: "visual"
  },
  {
    name: "YouTube Summarizer",
    href: "/youtube-summarizer",
    icon: <Youtube className="h-6 w-6" />,
    description: "Get quick summaries of YouTube videos",
    category: "content"
  },
  {
    name: "Code Explainer",
    href: "/code-explainer",
    icon: <Code className="h-6 w-6" />,
    description: "Understand code snippets easily",
    category: "development"
  },
  {
    name: "Text Summarizer",
    href: "/text-summarizer",
    icon: <FileText className="h-6 w-6" />,
    description: "Summarize long texts quickly",
    category: "content"
  },
  {
    name: "Blog Writer",
    href: "/blog-writer",
    icon: <PenTool className="h-6 w-6" />,
    description: "Create engaging blog content",
    category: "writing"
  },
  {
    name: "Grammar Fixer",
    href: "/grammar-fixer",
    icon: <Check className="h-6 w-6" />,
    description: "Fix grammar and improve writing",
    category: "writing"
  },
  {
    name: "Resume Builder",
    href: "/resume-builder",
    icon: <FileSpreadsheet className="h-6 w-6" />,
    description: "Create professional resumes",
    category: "professional"
  },
  {
    name: "Idea Generator",
    href: "/idea-generator",
    icon: <Lightbulb className="h-6 w-6" />,
    description: "Generate creative ideas",
    category: "creativity"
  },
  {
  name: "AI Trip Planner",
  href: "/trip-planner",
  icon: <Map className="h-6 w-6" />, // or use a relevant Lucide/FontAwesome icon
  description: "Plan your travels intelligently with AI",
  category: "travel"
},
{
    name: "LinkedIn Post Generator",
    href: "/linkedin-post-generator",
    icon: <Linkedin className="h-6 w-6" />,
    description: "Create engaging professional LinkedIn posts",
    category: "writing"
  },
{
  name: "AI Bio Generator",
  href: "/ai-bio-generator",
  icon: <FileText className="h-6 w-6" />,
  description: "Generate professional bios instantly with AI",
  category: "writing"
},
  {
  name: "AI Project Recommender",
  href: "/project-recommender",
  icon: <Brain className="h-6 w-6" />, 
  description: "Get personalized project ideas based on your skills",
  category: "learning"
},
];

const categories = [...new Set(aiTools.map(tool => tool.category))];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTools = aiTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col items-center min-h-auto p-4 sm:p-6">
      <div className="max-w-6xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="mb-4 transition-transform hover:scale-105 duration-300 inline-block">
            <Image
              src="/logo.png"
              alt="AIToolbox Logo"
              width={100}
              height={100}
              className="rounded-lg"
              priority
            />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text animate-fade-in">
            AIToolbox
          </h1>
          
          <h2 className="text-lg sm:text-xl font-medium mb-3 text-muted-foreground">
            Your All-in-One AI Tool Platform
          </h2>
          
          <p className="text-sm sm:text-base mb-6 max-w-xl mx-auto text-muted-foreground">
            Unlock the power of AI with our comprehensive suite of tools for enhanced productivity.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tools..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="text-xs sm:text-sm"
              size="sm"
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="text-xs cursor-pointer sm:text-sm capitalize"
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8">
          {filteredTools.length === 0 ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No tools found matching your search
            </div>
          ) : (
            filteredTools.map((tool) => (
              <Card 
                key={tool.name}
                className="p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group cursor-pointer"
              >
                <a href={tool.href} className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    {React.cloneElement(tool.icon, { className: 'h-5 w-5' })}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                    {tool.description}
                  </p>
                  <div className="flex items-center text-primary text-sm">
                    Try now
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </a>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
