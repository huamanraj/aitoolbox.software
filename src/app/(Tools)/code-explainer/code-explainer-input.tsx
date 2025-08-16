"use client";

import React, { useState ,JSX} from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Code, 
  Languages,
  Target,
  Send,
  Loader2
} from 'lucide-react';

const languages: string[] = [
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'C#',
  'PHP',
  'Ruby',
  'Go',
  'Rust',
  'TypeScript',
  'Swift',
  'Kotlin',
  'HTML',
  'CSS',
  'SQL',
  'Shell/Bash'
];

const levels: string[] = [
  'Beginner',
  'Intermediate', 
  'Advanced',
  'Expert'
];

interface FormData {
  code: string;
  language: string;
  level: string;
}

interface ApiResponse {
  data: string;
  success: boolean;
}

interface ApiError {
  error: string;
  success: boolean;
}

interface CodeExplainerInputProps {
  explanation: string;
  setExplanation: (explanation: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  currentFormData: FormData | null;
  setCurrentFormData: (formData: FormData | null) => void;
}

export default function CodeExplainerInput({
  explanation,
  setExplanation,
  isLoading,
  setIsLoading,
  error,
  setError,
  currentFormData,
  setCurrentFormData
}: CodeExplainerInputProps): JSX.Element {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>('JavaScript');
  const [level, setLevel] = useState<string>('Beginner');
  const [progress, setProgress] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError("Please enter some code to explain");
      return;
    }

    const formData: FormData = { code, language, level };
    setIsLoading(true);
    setExplanation('');
    setError(null);
    setProgress(0);
    setCurrentFormData(formData);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 200);

    try {
      const response = await fetch('/api/code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      clearInterval(interval);
      setProgress(100);

      if (!response.ok) {
        let errorData: ApiError;
        try {
          errorData = await response.json();
        } catch (_) {
          errorData = { error: 'An unexpected error occurred. Please try again.', success: false };
        }
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      const result: ApiResponse = await response.json();
      setExplanation(result.data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred.';
      console.error('Submission Error:', error);
      setError(message);
    } finally {
      setIsLoading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setCode(e.target.value);
  };

  return (
    <section>
      <h2 className="sr-only">Code Explanation Form</h2>
      <Card className="rounded-lg border shadow-sm">
        <CardContent className="p-4 pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-base flex items-center gap-2 mb-2 font-medium">
                  <Code className="h-4 w-4 text-zinc-500" />
                  Code to Explain
                </label>
                <Textarea
                  value={code}
                  onChange={handleCodeChange}
                  placeholder="Paste your code here..."
                  className="resize-y min-h-[200px] rounded-md text-base font-mono"
                  required
                />
                <p className="text-sm text-zinc-500 mt-1">
                  Enter the code you want explained in detail.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-base flex items-center gap-2 mb-2 font-medium">
                    <Languages className="h-4 w-4 text-zinc-500" />
                    Programming Language
                  </label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="rounded-md text-sm">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="rounded-md">
                      {languages.map((lang: string) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-base flex items-center gap-2 mb-2 font-medium">
                    <Target className="h-4 w-4 text-zinc-500" />
                    Explanation Level
                  </label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger className="rounded-md text-sm">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent className="rounded-md">
                      {levels.map((lvl: string) => (
                        <SelectItem key={lvl} value={lvl}>
                          {lvl}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md text-base py-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Explaining Code...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Explain Code
                </>
              )}
            </Button>
          </form>

          {/* Progress Bar */}
          {isLoading && (
            <div className="w-full space-y-2 mt-4">
              <div className="flex items-center gap-2 text-base text-zinc-600 font-medium">
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing your code with AI...
              </div>
              <Progress value={progress} className="h-2 rounded-full" />
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}