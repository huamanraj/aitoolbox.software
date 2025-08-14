"use client";

import React, { useState, useRef, useEffect,JSX } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { 
  ChevronsUpDown, 
  RefreshCw, 
  Copy, 
  Check, 
  Edit,
  FileText,
  AlertCircle,
  Bot
} from 'lucide-react';

interface FormData {
  code: string;
  language: string;
  level: string;
}

interface ApiResponse {
  data: string;
  success: boolean;
}

interface CodeExplainerOutputProps {
  explanation: string;
  setExplanation: (explanation: string) => void;
  isLoading: boolean;
  error: string | null;
  currentFormData: FormData | null;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Enhanced utility function to render markdown-like content
const renderFormattedContent = (content: string): JSX.Element => {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let currentIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip horizontal rules (---, ___, ***)
    if (line.match(/^[-_*]{3,}$/)) {
      elements.push(<hr key={currentIndex++} className="my-4 border-zinc-200" />);
      continue;
    }
    
    // Handle headers (### **text** or ## text or # text)
    if (line.match(/^#{1,6}\s/)) {
      const level = line.match(/^#{1,6}/)?.[0].length || 1;
      const text = line.replace(/^#{1,6}\s+/, '').replace(/\*\*(.*?)\*\*/g, '$1');
      const HeadingTag = `h${Math.min(level + 1, 6)}` as keyof JSX.IntrinsicElements;
      
      elements.push(
        <HeadingTag 
          key={currentIndex++} 
          className={`font-semibold mt-6 mb-3 ${
            level === 1 ? 'text-2xl text-zinc-900' : 
            level === 2 ? 'text-xl text-zinc-800' : 
            level === 3 ? 'text-lg text-zinc-800' : 
            level === 4 ? 'text-base text-zinc-700' :
            'text-sm text-zinc-700'
          }`}
        >
          {text}
        </HeadingTag>
      );
    }
    // Handle code blocks (```language or ```)
    else if (line.startsWith('```')) {
      const language = line.replace('```', '').trim();
      const codeBlockLines: string[] = [];
      i++; // Skip the opening ```
      
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeBlockLines.push(lines[i]);
        i++;
      }
      
      elements.push(
        <div key={currentIndex++} className="my-4">
          {language && (
            <div className="bg-zinc-100 px-3 py-1 text-xs font-mono text-zinc-600 border-b rounded-t-md">
              {language}
            </div>
          )}
          <pre className={`bg-zinc-50 p-4 overflow-x-auto font-mono text-sm border ${language ? 'rounded-b-md border-t-0' : 'rounded-md'}`}>
            <code className="text-zinc-800">
              {codeBlockLines.join('\n')}
            </code>
          </pre>
        </div>
      );
    }
    // Handle inline code and bold text in the same line
    else if (line.includes('`') || line.includes('**')) {
      // Split by both code and bold markers, preserving the markers
      const parts = line.split(/(`[^`]*`|\*\*[^*]*\*\*)/);
      elements.push(
        <p key={currentIndex++} className="mb-3 leading-relaxed text-zinc-700">
          {parts.map((part, index) => {
            if (part.startsWith('`') && part.endsWith('`')) {
              return (
                <code key={index} className="bg-zinc-100 px-1.5 py-0.5 rounded text-sm font-mono text-zinc-800">
                  {part.slice(1, -1)}
                </code>
              );
            } else if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={index} className="font-semibold text-zinc-900">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    }
    // Handle bullet points (- or *)
    else if (line.match(/^\s*[-*]\s/)) {
      const listItems: string[] = [line.replace(/^\s*[-*]\s/, '')];
      i++;
      
      // Collect consecutive list items
      while (i < lines.length && lines[i].match(/^\s*[-*]\s/)) {
        listItems.push(lines[i].replace(/^\s*[-*]\s/, ''));
        i++;
      }
      i--; // Adjust for the outer loop increment
      
      elements.push(
        <ul key={currentIndex++} className="list-disc list-inside mb-4 space-y-2 text-zinc-700">
          {listItems.map((item, index) => (
            <li key={index} className="ml-2 leading-relaxed">{item}</li>
          ))}
        </ul>
      );
    }
    // Handle numbered lists (1. or 2. etc.)
    else if (line.match(/^\s*\d+\.\s/)) {
      const listItems: string[] = [line.replace(/^\s*\d+\.\s/, '')];
      i++;
      
      // Collect consecutive numbered items
      while (i < lines.length && lines[i].match(/^\s*\d+\.\s/)) {
        listItems.push(lines[i].replace(/^\s*\d+\.\s/, ''));
        i++;
      }
      i--; // Adjust for the outer loop increment
      
      elements.push(
        <ol key={currentIndex++} className="list-decimal list-inside mb-4 space-y-2 text-zinc-700">
          {listItems.map((item, index) => (
            <li key={index} className="ml-2 leading-relaxed">{item}</li>
          ))}
        </ol>
      );
    }
    // Handle blockquotes (> text)
    else if (line.startsWith('>')) {
      const quoteLines: string[] = [line.replace(/^>\s?/, '')];
      i++;
      
      // Collect consecutive quote lines
      while (i < lines.length && lines[i].startsWith('>')) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      i--; // Adjust for the outer loop increment
      
      elements.push(
        <blockquote key={currentIndex++} className="border-l-4 border-zinc-300 pl-4 my-4 text-zinc-600 italic">
          {quoteLines.map((quoteLine, index) => (
            <p key={index} className="mb-2 last:mb-0">{quoteLine}</p>
          ))}
        </blockquote>
      );
    }
    // Handle regular paragraphs
    else if (line.trim()) {
      elements.push(
        <p key={currentIndex++} className="mb-3 leading-relaxed text-zinc-700">
          {line}
        </p>
      );
    }
    // Handle empty lines (add some spacing)
    else {
      elements.push(<div key={currentIndex++} className="h-2" />);
    }
  }

  return <div className="prose prose-zinc max-w-none">{elements}</div>;
};

export default function CodeExplainerOutput({
  explanation,
  setExplanation,
  isLoading,
  error,
  currentFormData,
  setIsLoading,
  setError
}: CodeExplainerOutputProps): JSX.Element {
  const [isOutputOpen, setIsOutputOpen] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleRegenerate = (): void => {
    if (currentFormData) {
      const formData = currentFormData;
      setIsLoading(true);
      setExplanation('');
      setError(null);

      fetch('/api/code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      .then(response => {
        if (!response.ok) throw new Error('Request failed');
        return response.json();
      })
      .then((result: ApiResponse) => {
        setExplanation(result.data);
      })
      .catch((error: Error) => {
        setError('Failed to regenerate explanation');
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  };

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(explanation);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const handleEditToggle = (): void => {
    setIsEditing(!isEditing);
  };

  const handleExplanationChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setExplanation(e.target.value);
  };

  useEffect(() => {
    if ((explanation || error) && outputRef.current) {
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [explanation, error]);

  useEffect(() => {
    if (isLoading || explanation || error) {
      setIsOutputOpen(true);
    }
  }, [isLoading, explanation, error]);

  return (
    <div ref={outputRef} className="mt-6">
      <Collapsible
        open={isOutputOpen}
        onOpenChange={setIsOutputOpen}
        className="w-full"
      >
        {(isLoading || explanation || error) && (
          <div className="flex items-center justify-between border bg-zinc-50 px-4 py-3 rounded-t-lg">
            <h4 className="font-medium flex items-center gap-2 text-base">
              <FileText className="h-4 w-4 text-zinc-600" />
              <span>Code Explanation</span>
            </h4>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-9 p-0 rounded-md"
              >
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
        )}

        <CollapsibleContent className="border border-t-0 p-4 data-[state=closed]:hidden rounded-b-lg">
          <div className="space-y-4">
            {error && !isLoading && (
              <div className="text-destructive p-4 bg-destructive/10 border border-destructive/20 rounded-md">
                <div className="flex items-center gap-2 font-medium">
                  <AlertCircle className="h-4 w-4" />
                  Error
                </div>
                <p className="mt-1 text-base">{error}</p>
              </div>
            )}
            
            {/* Output Component */}
            {!isLoading && !error && (
              <div className="bg-white">
                {explanation ? (
                  <>
                    <div className="flex flex-row items-center justify-between pb-3 mb-3 border-b">
                      <h3 className="text-base font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4 text-zinc-600" />
                        Generated Explanation
                      </h3>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleRegenerate}
                          title="Regenerate"
                          className="h-8 w-8 rounded-md"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleEditToggle}
                          title={isEditing ? "Save" : "Edit"}
                          className="h-8 w-8 rounded-md"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleCopy}
                          title="Copy"
                          className="h-8 w-8 rounded-md"
                        >
                          {isCopied ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    {isEditing ? (
                      <Textarea
                        value={explanation}
                        onChange={handleExplanationChange}
                        className="w-full min-h-[300px] resize-y rounded-md"
                        placeholder="Code explanation"
                      />
                    ) : (
                      <div className="p-4 border rounded-md bg-white">
                        {renderFormattedContent(explanation)}
                      </div>
                    )}
                  </>
                ) : !isLoading && (
                  <div className="flex flex-col items-center justify-center h-52 text-center p-6 border bg-zinc-50 rounded-md">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-primary/10 rounded-full mb-4">
                      <Bot className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">Your explanation will appear here</h3>
                    <p className="text-zinc-500 text-sm">
                      Enter your code and let the AI explain it in detail.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}