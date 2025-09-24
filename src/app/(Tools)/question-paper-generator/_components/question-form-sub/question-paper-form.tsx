"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, FileText } from "lucide-react";
import QuestionType from "./question-type";

// Question type options
const questionTypesOptions = [
  "MCQ",
  "Short Answer",
  "Long Answer",
  "Coding",
  "Essay",
  "Fill in the Blanks",
] as const;

// Zod schema
const formSchema = z.object({
  sections: z.array(
    z.object({
      title: z.string().min(1, { message: "Section title is required" }),
      topics: z.array(
        z.object({
          value: z.string().min(1, { message: "Topic cannot be empty" }),
        })
      ),
      questionTypes: z.array(
        z.object({
          type: z.enum(questionTypesOptions),
          count: z.number().min(1),
          marks: z.number().min(1),
        })
      ),
    })
  ),
});

export type QuestionPaperFormValues = z.infer<typeof formSchema>;

interface QuestionPaperFormProps {
  onSubmit: (data: QuestionPaperFormValues) => void;
  isLoading: boolean;
}

export function QuestionPaperForm({
  onSubmit,
  isLoading,
}: QuestionPaperFormProps) {
  const form = useForm<QuestionPaperFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sections: [
        {
          title: "Section A",
          topics: [],
          questionTypes: [{ type: "MCQ", count: 5, marks: 1 }],
        },
      ],
    },
  });

  const { control, watch, setValue, getValues } = form;

  // Top-level sections
  const {
    fields: sections,
    append: addSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "sections",
  });

  const handleAddSection = () =>
    addSection({
      title: `Section ${String.fromCharCode(65 + sections.length)}`,
      topics: [],
      questionTypes: [{ type: "MCQ", count: 5, marks: 1 }],
    });

  const sectionsWatch = watch("sections");

  return (
    <div className="shadow-card mt-10">
      <CardHeader className="text-center">
        <FileText className="h-10 w-10 text-primary mx-auto mb-3" />
        <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight">
          AI Question Paper Generator
        </CardTitle>
        <p className="text-muted-foreground">
          Transform your assessment creation process with our advanced
          AI-powered generator. Easily build question papers with multiple
          sections, topics, and question types — from MCQs to coding problems.
          <br className="hidden sm:inline" />
          Save time while ensuring variety, structure, and professional
          formatting.
        </p>
      </CardHeader>

      <CardContent className="mt-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {sections.map((section, sectionIndex) => {
              const sectionValues = sectionsWatch[sectionIndex];

              // Topics handlers
              const addTopic = (value: string) => {
                const current = getValues(`sections.${sectionIndex}.topics`);
                setValue(`sections.${sectionIndex}.topics`, [
                  ...current,
                  { value },
                ]);
              };
              const removeTopic = (topicIndex: number) => {
                const current = getValues(`sections.${sectionIndex}.topics`);
                setValue(
                  `sections.${sectionIndex}.topics`,
                  current.filter((_, i) => i !== topicIndex)
                );
              };

              // Question types handlers
              const addQuestionType = () => {
                const current = getValues(
                  `sections.${sectionIndex}.questionTypes`
                );
                setValue(`sections.${sectionIndex}.questionTypes`, [
                  ...current,
                  { type: "MCQ", count: 1, marks: 1 },
                ]);
              };
              const removeQuestionType = (qtIndex: number) => {
                const current = getValues(
                  `sections.${sectionIndex}.questionTypes`
                );
                setValue(
                  `sections.${sectionIndex}.questionTypes`,
                  current.filter((_, i) => i !== qtIndex)
                );
              };

              return (
                <Card
                  key={section.id}
                  className="border rounded-lg p-4 space-y-4"
                >
                  {/* Section Header */}
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">{section.title}</h3>
                    {sections.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive"
                        onClick={() => removeSection(sectionIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Section Title */}
                  <FormField
                    control={form.control}
                    name={`sections.${sectionIndex}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Section Title</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={`Section ${sectionIndex + 1}`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Topics */}
                  <div className="space-y-2">
                    <FormLabel>Topics</FormLabel>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a topic"
                        id={`topic-input-${sectionIndex}`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const inputEl = e.currentTarget;
                            const value = inputEl.value.trim();
                            if (value) {
                              addTopic(value);
                              inputEl.value = "";
                            }
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          const inputEl = document.getElementById(
                            `topic-input-${sectionIndex}`
                          ) as HTMLInputElement;
                          const value = inputEl?.value.trim();
                          if (value) {
                            addTopic(value);
                            inputEl.value = "";
                          }
                        }}
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="h-4 w-4" />
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sectionValues.topics.map((topic, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1 border rounded-full px-2 py-1 text-sm"
                        >
                          {topic.value}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 p-0 text-destructive"
                            onClick={() => removeTopic(idx)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Question Types */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <FormLabel>Question Types</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addQuestionType}
                      >
                        <Plus className="h-4 w-4" />
                        Add Type
                      </Button>
                    </div>

                    {sectionValues.questionTypes.map((qt, qtIndex) => (
                      <QuestionType
                        key={qtIndex}
                        control={control}
                        sectionIndex={sectionIndex}
                        qtIndex={qtIndex}
                        qtData={qt}
                        sectionValues={sectionValues}
                        removeQuestionType={removeQuestionType}
                      />
                    ))}
                  </div>
                </Card>
              );
            })}

            <Button
              type="button"
              variant="outline"
              onClick={handleAddSection}
              className="w-full"
            >
              <Plus className="h-4 w-4" />
              Add Section
            </Button>

            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              {isLoading ? "Generating..." : "Generate Question Paper"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </div>
  );
}
