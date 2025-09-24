"use client";

import React from "react";
import { Control, useWatch } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

// Question type options
const questionTypesOptions = [
  "MCQ",
  "Short Answer",
  "Long Answer",
  "Coding",
  "Essay",
  "Fill in the Blanks",
] as const;

interface QuestionTypeProps {
  control: Control<any>;
  sectionIndex: number;
  qtIndex: number;
  qtData: { type: string; count: number; marks: number };
  sectionValues: any;
  removeQuestionType: (index: number) => void;
}

const QuestionType: React.FC<QuestionTypeProps> = ({
  control,
  sectionIndex,
  qtIndex,
  qtData,
  sectionValues,
  removeQuestionType,
}) => {
  const total = (qtData.count || 0) * (qtData.marks || 0);

  return (
    <div className="grid grid-cols-12 gap-2 items-center p-2 border rounded-md">
      {/* Type */}
      <FormField
        control={control}
        name={`sections.${sectionIndex}.questionTypes.${qtIndex}.type`}
        render={({ field }) => (
          <FormItem className="col-span-3">
            <FormLabel>Type</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {questionTypesOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          <FormItem className="col-span-2">
            <FormLabel>Count</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={1}
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
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
          <FormItem className="col-span-2">
            <FormLabel>Marks</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={1}
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Total */}
      <div className="col-span-2 text-center font-medium">Total: {total}</div>

      {/* Remove */}
      <div className="col-span-3 flex justify-end">
        {sectionValues.questionTypes.length > 1 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-destructive"
            onClick={() => removeQuestionType(qtIndex)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuestionType;
