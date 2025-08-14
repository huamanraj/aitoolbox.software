"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BlogWriterForm from "./blog-writer-form";
import BlogWriterOutput from "./blog-writer-output";
import { toast } from "sonner";
import NativeBannerAd from "@/components/NativeBannerAd";
export interface BlogWriterResult {
  title: string;
  content: string;
  outline: string[];
  keywords: string[];
  metaDescription: string;
}

export default function BlogWriterClient() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<BlogWriterResult | null>(null);

  const handleSubmit = async (formData: {
    topic: string;
    tone: string;
    length: string;
    targetAudience: string;
    additionalInfo: string;
  }) => {
    setIsLoading(true);
    
    try {
      const prompt = `
        Write a blog post about "${formData.topic}".
        Tone: ${formData.tone}
        Length: ${formData.length}
        Target Audience: ${formData.targetAudience}
        Additional Information: ${formData.additionalInfo || "None"}
        
        Return your response as a JSON object with the following structure:
        {
          "title": "An engaging blog title",
          "content": "The full blog post content with proper formatting, paragraphs, headings, etc.",
          "outline": ["Introduction", "Point 1", "Point 2", "Conclusion"],
          "keywords": ["keyword1", "keyword2", "keyword3"],
          "metaDescription": "A meta description for SEO purposes, under 160 characters"
        }
      `;
      
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "chat",
          prompt,
          options: {
            model: "openai",
            response_format: { type: "json_object" }
          }
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate blog post");
      }

      const data = await response.json();
      
      // Parse the JSON string response
      const parsedResult = JSON.parse(data.data);
      setResult(parsedResult);
    } catch (error) {
      console.error("Error generating blog post:", error);
      toast.error("Failed to generate blog post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col items-center text-center gap-2 md:items-start md:text-left">
        <h1 className="text-3xl font-bold">Blog Writer</h1>
        <p className="text-muted-foreground max-w-md">
          Create engaging blog articles with AI assistance
        </p>
      </div>

      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Blog Details</CardTitle>
                <CardDescription>
                  Enter the details for your blog post
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BlogWriterForm onSubmit={handleSubmit} isLoading={isLoading} />
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Generated Blog</CardTitle>
                <CardDescription>
                  Your AI-generated blog post
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BlogWriterOutput result={result} isLoading={isLoading} />
              </CardContent>
            </Card>
          </div>
        
        </TabsContent>
        {/* Ad Banner */}
        <NativeBannerAd />

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Blog Writer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Blog Writer tool helps you create high-quality blog content quickly and easily using AI. 
                Whether you need inspiration for a new post or want to generate a complete article, 
                this tool can help streamline your content creation process.
              </p>
              <p>
                <strong>Features:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Generate complete blog posts on any topic</li>
                <li>Customize tone, length, and target audience</li>
                <li>Get SEO-friendly content with keywords and meta descriptions</li>
                <li>Create outlines for your blog posts</li>
                <li>Export content in various formats</li>
              </ul>
              <p>
                <strong>How to use:</strong>
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Enter your blog topic</li>
                <li>Select your preferred tone and length</li>
                <li>Define your target audience</li>
                <li>Add any additional information or requirements</li>
                <li>Click &quot;Generate Blog&quot; to create your content</li>
                <li>Edit and refine the generated blog as needed</li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}