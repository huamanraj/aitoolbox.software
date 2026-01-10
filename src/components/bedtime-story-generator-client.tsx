"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Copy, Loader2, Book, Heart, FileDown } from "lucide-react";
import { toast } from "sonner";

const ageRanges = [
  { value: "2-3", label: "2-3 years (Toddler)" },
  { value: "4-5", label: "4-5 years (Preschool)" },
  { value: "6-7", label: "6-7 years (Early Elementary)" },
  { value: "8-10", label: "8-10 years (Elementary)" },
];

const lessons = [
  { value: "sharing", label: "Sharing & Kindness" },
  { value: "bravery", label: "Bravery & Courage" },
  { value: "bedtime", label: "Going to Bed on Time" },
  { value: "honesty", label: "Honesty & Truth" },
  { value: "friendship", label: "Friendship & Cooperation" },
  { value: "patience", label: "Patience & Waiting" },
  { value: "trying-new-things", label: "Trying New Things" },
  { value: "emotions", label: "Managing Emotions" },
];

export function BedtimeStoryGeneratorClient() {
  const [childName, setChildName] = useState("");
  const [age, setAge] = useState("4-5");
  const [interests, setInterests] = useState("");
  const [fears, setFears] = useState("");
  const [lesson, setLesson] = useState("sharing");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateStory = async () => {
    if (!childName.trim()) {
      toast.error("Please enter your child's name");
      return;
    }

    setLoading(true);
    setError(null);
    setStory("");

    try {
      const lessonLabel = lessons.find((l) => l.value === lesson)?.label || lesson;
      
      const storyPrompt = `You are a creative children's story writer. Write a magical bedtime story for a child.

STORY DETAILS:
- Child's name: ${childName}
- Age: ${age} years old
- Interests: ${interests || "adventure and fun"}
- Fears to address: ${fears || "none"}
- Life lesson to teach: ${lessonLabel}

REQUIREMENTS:
- Make ${childName} the hero of the story
- Age-appropriate vocabulary and themes for ${age} year olds
- 200-300 words (perfect bedtime length)
- Gentle, calming tone suitable for bedtime
- Include the life lesson naturally without being preachy
${fears ? `- Gently address and resolve the fear of ${fears}` : ""}
${interests ? `- Incorporate ${interests} into the adventure` : ""}
- Happy, peaceful ending that promotes good sleep
- Use simple, vivid descriptions
- Include some dialogue to make it engaging

Format the story with:
Title: [An engaging title]

Story: [The complete story]

Write ONLY the story. Make it magical and memorable!`;

      const encodedPrompt = encodeURIComponent(storyPrompt);
      const url = `https://text.pollinations.ai/${encodedPrompt}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "text/plain",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to generate story: ${response.status}`);
      }

      const storyText = await response.text();
      setStory(storyText);

      toast.success("Story created! Sweet dreams! ✨");
    } catch (err) {
      console.error("Error generating story:", err);
      setError(err instanceof Error ? err.message : "Failed to generate story");
      toast.error("Failed to generate story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyStory = async () => {
    try {
      await navigator.clipboard.writeText(story);
      toast.success("Story copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const downloadAsPDF = () => {
    if (!story) return;

    // Get the lesson label
    const lessonLabel = lessons.find((l) => l.value === lesson)?.label || lesson;

    // Create a simple HTML document for printing/PDF
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error("Please allow pop-ups to download PDF");
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${childName}'s Bedtime Story</title>
          <style>
            @page {
              margin: 1.5cm;
              size: A4;
            }
            body {
              font-family: 'Georgia', 'Times New Roman', serif;
              font-size: 14pt;
              line-height: 1.8;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 40px 20px;
            }
            h1 {
              font-size: 24pt;
              color: #2563eb;
              text-align: center;
              margin-bottom: 10px;
              font-weight: bold;
            }
            .subtitle {
              text-align: center;
              font-size: 12pt;
              color: #666;
              margin-bottom: 40px;
              font-style: italic;
            }
            .story-content {
              white-space: pre-wrap;
              text-align: justify;
            }
            .footer {
              margin-top: 60px;
              padding-top: 20px;
              border-top: 2px solid #e5e7eb;
              text-align: center;
              font-size: 10pt;
              color: #999;
            }
            @media print {
              body {
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <h1>${childName}'s Bedtime Story</h1>
          <div class="subtitle">A personalized story about ${lessonLabel.toLowerCase()}</div>
          <div class="story-content">${story}</div>
          <div class="footer">
            <p>Created with ❤️ by AI Toolbox</p>
            <p>For ${childName} • Age ${age}</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for content to load, then trigger print dialog
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        toast.success("Opening print dialog...");
      }, 250);
    };
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Book className="h-10 w-10 text-primary" />
            <Heart className="h-8 w-8 text-chart-2" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-chart-2 to-chart-4 bg-clip-text text-transparent">
            Free AI Bedtime Story Generator
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Create magical personalized bedtime stories for your child in seconds. Each story features your child as the hero, teaching valuable life lessons.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Input Section */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="childName">Child's Name *</Label>
                <Input
                  id="childName"
                  placeholder="e.g., Emma, Noah"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age Range *</Label>
                <Select value={age} onValueChange={setAge} disabled={loading}>
                  <SelectTrigger id="age">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ageRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">Interests (Optional)</Label>
                <Input
                  id="interests"
                  placeholder="e.g., dinosaurs, space, animals"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground">
                  What does your child love? This will be part of the story
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fears">Fears to Address (Optional)</Label>
                <Input
                  id="fears"
                  placeholder="e.g., darkness, monsters, first day of school"
                  value={fears}
                  onChange={(e) => setFears(e.target.value)}
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground">
                  The story will help your child feel brave about this
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lesson">Life Lesson *</Label>
                <Select value={lesson} onValueChange={setLesson} disabled={loading}>
                  <SelectTrigger id="lesson">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {lessons.map((l) => (
                      <SelectItem key={l.value} value={l.value}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={generateStory}
                disabled={loading || !childName.trim()}
                className="w-full"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Magic...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Create Bedtime Story
                  </>
                )}
              </Button>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm space-y-2">
                <p className="font-semibold flex items-center gap-2">
                  <Heart className="h-4 w-4 text-primary" />
                  Perfect for:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs">
                  <li>Busy parents who want quality bedtime routines</li>
                  <li>Kids who resist going to bed</li>
                  <li>Teaching important life lessons gently</li>
                  <li>Addressing childhood fears and anxieties</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Story Section */}
          <Card className="lg:col-span-3">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Your Personalized Story</Label>
                  {story && !loading && (
                    <div className="flex gap-2">
                      <Button
                        onClick={copyStory}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      <Button
                        onClick={downloadAsPDF}
                        variant="outline"
                        size="sm"
                      >
                        <FileDown className="h-4 w-4 mr-1" />
                        Download PDF
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="bg-muted/30 rounded-lg p-6 min-h-[500px]">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center h-[500px] space-y-4">
                      <Loader2 className="h-12 w-12 animate-spin text-primary" />
                      <p className="text-muted-foreground">
                        Writing a magical story for {childName}...
                      </p>
                      <p className="text-sm text-muted-foreground">
                        This may take 15-30 seconds
                      </p>
                    </div>
                  ) : story ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <div className="whitespace-pre-wrap leading-relaxed font-serif">
                        {story}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[500px] space-y-4 text-center">
                      <Book className="h-16 w-16 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground font-medium">
                          Your bedtime story will appear here
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Fill in the details and click Create Bedtime Story
                        </p>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center">
                      <p className="text-destructive text-sm font-medium">
                        {error}
                      </p>
                      <p className="text-destructive/80 text-xs mt-1">
                        Please try again
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Personalized</h3>
              <p className="text-sm text-muted-foreground">
                Every story features your child as the hero
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-2">
              <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center mx-auto">
                <Heart className="h-6 w-6 text-chart-2" />
              </div>
              <h3 className="font-semibold">Life Lessons</h3>
              <p className="text-sm text-muted-foreground">
                Gentle teaching of values like sharing and bravery
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-2">
              <div className="w-12 h-12 bg-chart-4/10 rounded-lg flex items-center justify-center mx-auto">
                <Book className="h-6 w-6 text-chart-4" />
              </div>
              <h3 className="font-semibold">Age-Appropriate</h3>
              <p className="text-sm text-muted-foreground">
                Content tailored to your child's age and understanding
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-2">
              <div className="w-12 h-12 bg-chart-1/10 rounded-lg flex items-center justify-center mx-auto">
                <FileDown className="h-6 w-6 text-chart-1" />
              </div>
              <h3 className="font-semibold">Save & Print</h3>
              <p className="text-sm text-muted-foreground">
                Copy or download as PDF to keep forever
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
