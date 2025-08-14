"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import GrammarFixerForm from "./grammar-fixer-form";
import GrammarFixerOutput from "./grammar-fixer-output";
import { toast } from "sonner";
import NativeBannerAd from "@/components/NativeBannerAd";
export interface GrammarFixerResult {
  originalText: string;
  correctedText: string;
  corrections: {
    type: string;
    original: string;
    corrected: string;
    explanation: string;
  }[];
}

export default function GrammarFixerClient() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<GrammarFixerResult | null>(null);

  const handleSubmit = async (formData: { text: string; level: string }) => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "chat",
          prompt: formData.text,
          options: {
            model: "openai",
            messages: [
              {
                role: "system",
                content: `You are an expert grammar checker and editor. Your task is to correct grammar, spelling, punctuation, and improve clarity in the provided text. 
                
                Correction level: ${formData.level}
                
                Return your response as a JSON object with the following structure:
                {
                  "originalText": "the original text",
                  "correctedText": "the corrected text",
                  "corrections": [
                    {
                      "type": "grammar|spelling|punctuation|clarity",
                      "original": "original text with error",
                      "corrected": "corrected text",
                      "explanation": "brief explanation of the correction"
                    }
                  ]
                }
                
                If there are no errors to correct, return the original text as the correctedText and an empty corrections array.`
              },
              {
                role: "user",
                content: formData.text
              }
            ],
            response_format: { type: "json_object" }
          }
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to correct text");
      }

      const data = await response.json();
      
      // Parse the JSON string response
      const parsedResult = JSON.parse(data.data);
      setResult(parsedResult);
    } catch (error) {
      console.error("Error correcting text:", error);
      toast.error("Failed to correct text. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col items-center text-center gap-2 md:items-start md:text-left">
        <h1 className="text-3xl font-bold">Grammar Fixer</h1>
        <p className="text-muted-foreground max-w-md">
          Fix grammar, spelling, and punctuation errors in your text
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
                <CardTitle>Input Text</CardTitle>
                <CardDescription>
                  Enter your text to check for grammar, spelling, and punctuation errors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GrammarFixerForm onSubmit={handleSubmit} isLoading={isLoading} />
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Corrected Text</CardTitle>
                <CardDescription>
                  View the corrected text and identified errors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GrammarFixerOutput result={result} isLoading={isLoading} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        {/* Ad Banner */}
       <NativeBannerAd />

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Grammar Fixer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The Grammar Fixer tool helps you improve your writing by identifying and correcting grammar, spelling, and punctuation errors in your text.
              </p>
              <p>
                <strong>Features:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Grammar error detection and correction</li>
                <li>Spelling mistake identification</li>
                <li>Punctuation improvement</li>
                <li>Writing clarity enhancement</li>
                <li>Multiple correction levels (Light, Standard, Thorough)</li>
              </ul>
              <p>
                <strong>How to use:</strong>
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Enter or paste your text in the input area</li>
                <li>Select your desired correction level</li>
                <li>Click &quot;Check Grammar&quot; to process your text</li>
                <li>Review the corrected text and specific corrections</li>
                <li>Copy the improved text for your use</li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}