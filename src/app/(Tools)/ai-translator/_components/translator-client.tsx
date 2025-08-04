"use client";

import { useState, useRef, useEffect } from "react";
import { TranslatorForm, TranslatorFormValues } from "./translator-form";
import { TranslatorOutput } from "./translator-output";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
  ChevronsUpDown,
  Globe,
  Languages,
  ThumbsUp,
  HelpCircle,
  Settings,
  Send,
  Clock,
  Star,
  FileEdit,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";

export default function TranslatorClient() {
  const [translatedText, setTranslatedText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isOutputOpen, setIsOutputOpen] = useState(false);

  const outputRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handleFormSubmit = async (data: TranslatorFormValues) => {
    setIsLoading(true);
    setTranslatedText("");
    setError(null);
    setProgress(0);
    setIsOutputOpen(true); // Open on submit
    setTargetLanguage(data.targetLanguage);

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
      // Construct a comprehensive prompt for the AI
      const systemPrompt = `
You are a professional translator with expertise in multiple languages. Your task is to translate text accurately while preserving the original meaning, tone, and formatting. Follow these guidelines:

1. Translate the text from ${data.sourceLanguage} to ${data.targetLanguage}.
2. Maintain the original formatting, including paragraphs, bullet points, and line breaks.
3. Preserve the tone and style of the original text.
4. If there are specialized terms or phrases that don't have direct translations, provide the best cultural equivalent and explain it in parentheses if necessary.
5. For names, titles, and proper nouns, keep them in their original form unless there's a widely accepted translation in the target language.
6. If the text contains idioms or cultural references, translate them to equivalent expressions in the target language when possible.

Your output should be just the translated text without any explanations or comments unless specifically requested.
`;

      const userPrompt = `Translate the following text from ${data.sourceLanguage} to ${data.targetLanguage}:

${data.text}
`;

      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "chat",
          prompt: userPrompt,
          options: {
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            model: "openai",
            temperature: 0.3,
            max_tokens: 2000,
          },
        }),
      });

      clearInterval(interval);
      setProgress(100);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (error) {
          errorData = {
            error: "An unexpected error occurred. Please try again.",
          };
        }
        throw new Error(
          errorData.error || `Request failed with status ${response.status}`
        );
      }

      const result = await response.json();
      setTranslatedText(result.data);
      toast.success("Translation Complete!", {
        description: `Successfully translated to ${data.targetLanguage}.`,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Translation Error:", error);
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  useEffect(() => {
    if ((translatedText || error) && isMobile && outputRef.current) {
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [translatedText, error, isMobile]);

  return (
    <>
      <div className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black">
              AI Translator
            </h1>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Translate text between multiple languages with AI-powered accuracy and natural fluency.
            </p>
          </header>

          <main className="space-y-8">
            <div>
              <TranslatorForm
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
              />
            </div>

            <div ref={outputRef}>
              <Collapsible
                open={isOutputOpen}
                onOpenChange={setIsOutputOpen}
                className="w-full"
              >
                {(isLoading || translatedText || error) && (
                  <div className="flex items-center justify-between rounded-t-lg border border-gray-200 px-4 py-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Globe className="h-4 w-4 text-black" />
                      <span className="text-black">
                        Translation Result
                      </span>
                    </h4>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-9 p-0 hover:bg-blue-100"
                      >
                        <ChevronsUpDown className="h-4 w-4 text-blue-600" />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                )}

                <CollapsibleContent>
                  <div className="space-y-4">
                    {isLoading && (
                      <div className="w-full">

                        <Progress value={progress} className="h-2 bg-gray-100" />
                      </div>
                    )}
                    {error && !isLoading && (
                      <div className="text-destructive p-4 bg-destructive/10 rounded-md">
                        {error}
                      </div>
                    )}
                    <TranslatorOutput
                      translatedText={translatedText}
                      isLoading={isLoading}
                      targetLanguage={targetLanguage}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            <article className="prose max-w-none mb-8">
              <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <FileEdit className="h-6 w-6 text-primary" />
                AI Translator Tool
              </h1>

              <p className="mb-4">
                Break language barriers instantly with our powerful AI
                Translator. Whether you're communicating with global customers,
                translating web content, or simply learning a new language, our
                AI-driven tool provides accurate, natural-sounding translations
                in seconds—without the complexity of traditional translation
                software.
              </p>

              <div className="bg-zinc-50 p-4 border rounded-md mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
                  <Star className="h-5 w-5 text-amber-500" />
                  Why Use Our AI Translator?
                </h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Translate instantly between multiple languages</li>
                  <li>
                    Maintain the natural flow and tone of original content
                  </li>
                  <li>
                    Ideal for business, education, travel, and personal use
                  </li>
                  <li>Saves time and reduces the risk of miscommunication</li>
                  <li>
                    No need for language expertise—our AI handles the nuance
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="border p-4 rounded-md">
                  <h3 className="font-medium flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>Quick & Easy to Use</span>
                  </h3>
                  <p>
                    Just type or paste your text, choose the source and target
                    languages, and our AI will generate a fluent, context-aware
                    translation. You can then copy, refine, or directly use the
                    translated text for any purpose.
                  </p>
                </div>
                <div className="border p-4 rounded-md">
                  <h3 className="font-medium flex items-center gap-2 mb-2">
                    <ThumbsUp className="h-4 w-4 text-green-600" />
                    <span>Human-like Quality</span>
                  </h3>
                  <p>
                    Unlike traditional tools that deliver robotic or awkward
                    translations, our AI understands tone, intent, and
                    structure—producing output that feels authentic and
                    native-like. Perfect for both casual and professional use.{" "}
                  </p>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                How to Use the AI Translator
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Input your original text</li>
                <li>Select the source and target languages</li>
                <li>Click "Translate" to generate instant results</li>
                <li>Review and use the translated content wherever you need</li>
              </ul>
            </article>

            <div className="mt-10 border-t pt-6">
              <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                <Settings className="h-4 w-4 text-zinc-600" />
                Tips for Better Translation Results
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Be clear and specific with your input text</li>
                <li>
                  Avoid slang, idioms, or cultural references when accuracy is
                  essential{" "}
                </li>
                <li>
                  Specify the context if needed (e.g., business, travel,
                  technical)
                </li>
                <li>
                  Always review translations for tone and correctness,
                  especially in sensitive contexts
                </li>
              </ul>
              <p className="mt-4 text-sm text-zinc-500 flex items-center gap-2">
                <Send className="h-3 w-3" />
                While our AI produces high-quality content, we recommend
                reviewing all generated emails before sending them to ensure
                they perfectly match your intentions and voice.
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
