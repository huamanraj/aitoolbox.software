"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Loader2, Download, Copy, Check, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const LLMsTxtGenerator = () => {
  const [url, setUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{
    llmsTxt: string;
    llmsFullTxt: string;
  } | null>(null);
  const [copiedState, setCopiedState] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!url.trim()) {
      toast({
        title: "URL required",
        description: "Please enter a website URL",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setResult(null);

    try {
      const response = await fetch("/api/generate-llms-txt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate");
      }

      setResult({
        llmsTxt: data.llmsTxt,
        llmsFullTxt: data.llmsFullTxt,
      });

      toast({
        title: "Success!",
        description: "LLMs.txt files generated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedState(type);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard",
    });
    setTimeout(() => setCopiedState(null), 2000);
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="rounded-2xl shadow-lg">
      <CardContent className="p-6 md:p-8">
        <div className="space-y-8">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url" className="text-base font-semibold">
                Website URL
              </Label>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-9"
                    disabled={isGenerating}
                  />
                </div>
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !url.trim()}
                  className="min-w-[120px]"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating
                    </>
                  ) : (
                    "Generate"
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Enter your website URL to automatically generate llms.txt files.
              </p>
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Tabs defaultValue="llms" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="llms">llms.txt</TabsTrigger>
                  <TabsTrigger value="full">llms-full.txt</TabsTrigger>
                </TabsList>

                <TabsContent value="llms" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Standard llms.txt</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(result.llmsTxt, "llms")}
                      >
                        {copiedState === "llms" ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        Copy
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => downloadFile(result.llmsTxt, "llms.txt")}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-muted/30 p-4 h-[400px] overflow-auto font-mono text-sm whitespace-pre-wrap">
                    {result.llmsTxt}
                  </div>
                </TabsContent>

                <TabsContent value="full" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Full llms-full.txt</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(result.llmsFullTxt, "full")
                        }
                      >
                        {copiedState === "full" ? (
                          <Check className="h-4 w-4 mr-2" />
                        ) : (
                          <Copy className="h-4 w-4 mr-2" />
                        )}
                        Copy
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          downloadFile(result.llmsFullTxt, "llms-full.txt")
                        }
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-lg border bg-muted/30 p-4 h-[400px] overflow-auto font-mono text-sm whitespace-pre-wrap">
                    {result.llmsFullTxt}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {isGenerating && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-2">
                <Skeleton className="h-10 w-full max-w-[200px]" />
                <Skeleton className="h-[400px] w-full rounded-lg" />
              </div>
            </div>
          )}

          {!result && !isGenerating && (
            <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-12 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground">
                Ready to Generate
              </h3>
              <p className="text-sm text-muted-foreground/75 mt-1">
                Enter a URL above to generate your LLM-ready text files.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
