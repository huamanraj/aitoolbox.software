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
    <div className="shadow-card mt-6 md:mt-10">
      <CardHeader className="text-center px-4 sm:px-6">
        <FileText className="h-10 w-10 text-primary mx-auto mb-3" />
        <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
          AI Question Paper Generator
        </CardTitle>
        <p className="text-muted-foreground text-sm sm:text-base">
          Easily build question papers with multiple sections, topics, and
          question types. Save time while ensuring variety, structure, and
          professional formatting.
        </p>
      </CardHeader>

      <CardContent className="mt-6 md:mt-10 px-2 sm:px-4 overflow-x-hidden">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            {sections.map((section, sectionIndex) => {
              const sectionValues = sectionsWatch[sectionIndex];

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
                  className="border rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4"
                >
                  {/* Section Header */}
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-base sm:text-lg">
                      {section.title}
                    </h3>
                    {sections.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 p-0 text-destructive"
                        onClick={() => removeSection(sectionIndex)}
                      >
                        <Trash2 className="h-3 w-3" />
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
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input
                        placeholder="Add a topic"
                        id={`topic-input-${sectionIndex}`}
                        className="flex-1"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const value = (
                              e.currentTarget as HTMLInputElement
                            ).value.trim();
                            if (value) {
                              addTopic(value);
                              (e.currentTarget as HTMLInputElement).value = "";
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
                        <Plus className="h-4 w-4" /> Add
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
                        <Plus className="h-4 w-4" /> Add Type
                      </Button>
                    </div>

                    {sectionValues.questionTypes.map((qt, qtIndex) => (
                      <div
                        key={qtIndex}
                        className="flex flex-col sm:flex-row sm:items-center gap-2 w-full border rounded p-2"
                      >
                        {/* Type */}
                        <FormField
                          control={control}
                          name={`sections.${sectionIndex}.questionTypes.${qtIndex}.type`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Type</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="MCQ" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Count */}
                        <FormField
                          control={control}
                          name={`sections.${sectionIndex}.questionTypes.${qtIndex}.count`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Count</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  placeholder="1"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Marks */}
                        <FormField
                          control={control}
                          name={`sections.${sectionIndex}.questionTypes.${qtIndex}.marks`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Marks</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  placeholder="1"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Total */}
                        <div className="flex-1">
                          <FormLabel>Total</FormLabel>
                          <div className="px-2 py-1 border rounded">
                            {qt.count * qt.marks}
                          </div>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 p-0 text-destructive self-end sm:self-auto"
                          onClick={() => removeQuestionType(qtIndex)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}

            {/* Add Section */}
            <Button
              type="button"
              variant="outline"
              onClick={handleAddSection}
              className="w-full"
            >
              <Plus className="h-4 w-4" /> Add Section
            </Button>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full mt-2 sm:mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Question Paper"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </div>
  );
}
