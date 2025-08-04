"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Globe, Loader2, ArrowRightLeft } from "lucide-react";

// Define form schema
const formSchema = z.object({
  sourceLanguage: z.string({
    required_error: "Please select a source language.",
  }),
  targetLanguage: z.string({
    required_error: "Please select a target language.",
  }),
  text: z.string().min(1, {
    message: "Please enter some text to translate.",
  }),
  preserveFormatting: z.boolean({
    required_error: "Please specify if formatting should be preserved.",
  }),
});

// Define form values type
export type TranslatorFormValues = z.infer<typeof formSchema>;

// List of languages
const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Japanese",
  "Chinese",
  "Korean",
  "Arabic",
  "Hindi",
  "Dutch",
  "Swedish",
  "Polish",
  "Turkish",
  "Vietnamese",
  "Thai",
  "Indonesian",
  "Greek",
];

interface TranslatorFormProps {
  onSubmit: (data: TranslatorFormValues) => void;
  isLoading: boolean;
}

export function TranslatorForm({ onSubmit, isLoading }: TranslatorFormProps) {
  const form = useForm<TranslatorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sourceLanguage: "English",
      targetLanguage: "",
      text: "",
      preserveFormatting: true,
    },
  });

  // Function to swap source and target languages
  const handleSwapLanguages = () => {
    const sourceLanguage = form.getValues("sourceLanguage");
    const targetLanguage = form.getValues("targetLanguage");

    if (sourceLanguage && targetLanguage) {
      form.setValue("sourceLanguage", targetLanguage);
      form.setValue("targetLanguage", sourceLanguage);
    }
  };

  return (
    <Card className="border-gray-200 shadow-md">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-xl text-black">Translation Details</CardTitle>
        <CardDescription className="text-gray-700">
          Enter your text and select languages to translate between
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center w-full">
              <div className="w-full max-w-[280px] md:max-w-none md:flex-1">
                <FormField
                  control={form.control}
                  name="sourceLanguage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Source Language</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select source language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {languages.map((language) => (
                            <SelectItem key={language} value={language}>
                              {language}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleSwapLanguages}
                className="h-10 w-10 rounded-full border-2 border-gray-200 bg-white hover:bg-gray-50 self-center md:self-end mb-1"
              >
                <ArrowRightLeft className="h-4 w-4" />
                <span className="sr-only">Swap languages</span>
              </Button>
              
              <div className="w-full max-w-[280px] md:max-w-none md:flex-1">
                <FormField
                  control={form.control}
                  name="targetLanguage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Target Language</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select target language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {languages.map((language) => (
                            <SelectItem key={language} value={language}>
                              {language}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Text to Translate</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the text you want to translate..."
                      className="resize-y min-h-[150px] border-black focus-visible:ring-black"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-600">
                    Enter the text you want to translate. Maximum 5000 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full  text-white font-semibold py-3 text-lg shadow-lg cursor-pointer "
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Translating...
                </>
              ) : (
                <>
                  <Globe className="mr-2 h-5 w-5" />
                  Translate
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
