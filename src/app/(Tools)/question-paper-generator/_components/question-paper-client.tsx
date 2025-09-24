"use client";

import { useState, useRef, useEffect } from "react";
import {
  QuestionPaperForm,
  QuestionPaperFormValues,
} from "./question-form-sub/question-paper-form";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { FileText, ChevronsUpDown, RefreshCw, AlertCircle } from "lucide-react";
import NativeBannerAd from "@/components/ads/NativeBannerAd";
import { useIsMobile } from "@/hooks/use-mobile";

export default function QuestionPaperClient() {
  const [generatedPaper, setGeneratedPaper] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isOutputOpen, setIsOutputOpen] = useState(false);
  const [currentFormData, setCurrentFormData] =
    useState<QuestionPaperFormValues | null>(null);

  const outputRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handleFormSubmit = async (data: QuestionPaperFormValues) => {
    setIsLoading(true);
    setGeneratedPaper("");
    setError(null);
    setProgress(0);
    setIsOutputOpen(true);
    setCurrentFormData(data);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 200);

    try {
      const response = await fetch("/api/question-paper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      clearInterval(interval);
      setProgress(100);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (_) {
          errorData = {
            error: "An unexpected error occurred. Please try again.",
          };
        }
        throw new Error(
          errorData.error || `Request failed with status ${response.status}`
        );
      }

      const result = await response.json();
      setGeneratedPaper(result.data);
      toast.success("Question Paper Generated!", {
        description: "Your AI-powered question paper is ready.",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Submission Error:", error);
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const handleRegenerate = () => {
    if (currentFormData) {
      handleFormSubmit(currentFormData);
    }
  };

  useEffect(() => {
    if ((generatedPaper || error) && isMobile && outputRef.current) {
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [generatedPaper, error, isMobile]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <section>
        <h2 className="sr-only">Question Paper Generator Form</h2>
        <QuestionPaperForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      </section>

      <div ref={outputRef} className="mt-6">
        <Collapsible
          open={isOutputOpen}
          onOpenChange={setIsOutputOpen}
          className="w-full"
        >
          {(isLoading || generatedPaper || error) && (
            <div className="flex items-center justify-between border bg-zinc-50 px-4 py-3 rounded-none">
              <h4 className="font-medium flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-zinc-600" />
                Generated Question Paper
              </h4>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-9 p-0 rounded-none"
                >
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
          )}

          <CollapsibleContent className="border border-t-0 p-4 data-[state=closed]:hidden rounded-none">
            <div className="space-y-4">
              {isLoading && (
                <div className="w-full space-y-2">
                  <div className="flex items-center gap-2 text-base text-zinc-600 font-medium">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Generating your question paper with AI...
                  </div>
                  <Progress value={progress} className="h-2 rounded-none" />
                </div>
              )}

              {error && !isLoading && (
                <div className="text-destructive p-4 bg-destructive/10 border border-destructive/20 rounded-none">
                  <div className="flex items-center gap-2 font-medium">
                    <AlertCircle className="h-4 w-4" />
                    Error
                  </div>
                  <p className="mt-1 text-base">{error}</p>
                </div>
              )}

              {generatedPaper && !isLoading && (
                <div className="p-4 border rounded-md whitespace-pre-wrap bg-white">
                  {generatedPaper}
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={handleRegenerate}
                  >
                    Regenerate
                  </Button>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Ad Banner */}
      <NativeBannerAd />
    </div>
  );
}
