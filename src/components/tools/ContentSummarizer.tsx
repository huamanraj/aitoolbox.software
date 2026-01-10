"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Sparkles, Loader2, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ContentSummarizer = () => {
  const [inputText, setInputText] = useState("");
  const [summaryLength, setSummaryLength] = useState("medium");
  const [summary, setSummary] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input required",
        description: "Please enter some text to summarize",
        variant: "destructive",
      });
      return;
    }

    setIsSummarizing(true);

    // Simulate API call
    setTimeout(() => {
      // Simple mock summarization logic for demo purposes
      // In a real app, this would call an AI API
      const sentences = inputText
        .split(/[.!?]+/)
        .filter((s) => s.trim().length > 0);
      let summaryText = "";

      if (sentences.length <= 3) {
        summaryText = inputText;
      } else {
        const count =
          summaryLength === "short" ? 2 : summaryLength === "medium" ? 4 : 6;
        summaryText =
          sentences.slice(0, Math.min(count, sentences.length)).join(". ") +
          ".";
      }

      setSummary(summaryText);
      setIsSummarizing(false);

      toast({
        title: "Success!",
        description: "Content summarized successfully",
      });
    }, 1500);
  };

  const copyToClipboard = async () => {
    if (!summary) return;
    await navigator.clipboard.writeText(summary);
    setIsCopied(true);
    toast({
      title: "Copied!",
      description: "Summary copied to clipboard",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card className="rounded-2xl shadow-lg">
      <CardContent className="p-6 md:p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Input */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="input-text" className="text-base font-semibold">
                Input Text
              </Label>
              <Textarea
                id="input-text"
                placeholder="Paste your article, document, or text here to summarize..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="h-[300px] resize-none font-mono text-sm"
                disabled={isSummarizing}
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="length" className="text-sm font-medium">
                  Summary Length
                </Label>
                <Select
                  value={summaryLength}
                  onValueChange={setSummaryLength}
                  disabled={isSummarizing}
                >
                  <SelectTrigger id="length">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short (Bullet points)</SelectItem>
                    <SelectItem value="medium">Medium (Paragraph)</SelectItem>
                    <SelectItem value="long">Long (Detailed)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleSummarize}
              disabled={isSummarizing || !inputText.trim()}
              size="lg"
              className="w-full"
            >
              {isSummarizing ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Summarizing...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Summarize Content
                </>
              )}
            </Button>
          </div>

          {/* Right Side - Output */}
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-base font-semibold">Summary</Label>
              {summary && (
                <Button onClick={copyToClipboard} variant="outline" size="sm">
                  {isCopied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              )}
            </div>

            <div className="flex-1 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 min-h-[300px] relative overflow-hidden">
              {isSummarizing ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Analyzing content...
                  </p>
                </div>
              ) : summary ? (
                <div className="p-6 h-full overflow-auto">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {summary}
                  </p>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <FileText className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      Your summary will appear here
                    </p>
                    <p className="text-xs text-muted-foreground/75">
                      Paste text and click Summarize to get started
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
