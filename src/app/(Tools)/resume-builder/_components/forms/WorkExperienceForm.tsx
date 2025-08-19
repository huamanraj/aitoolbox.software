"use client";

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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { workExperienceSchema, WorkExperienceValues } from "@/lib/resume/validation";
import { cn } from "@/lib/utils";
import { EditorFormProps } from "@/types/types";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal, Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import GenerateWorkExperienceButton from "../ai-features/GenerateWorkExperienceButton";

export default function WorkExperienceForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<WorkExperienceValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((values) => {
      setResumeData({
        ...resumeData,
        workExperiences : (values.workExperiences?.filter((exp): exp is NonNullable<typeof exp> => exp !== undefined) || []),
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold">Work Experience</h2>
        <p className="text-sm text-muted-foreground">
          Showcase your professional journey
        </p>
      </div>

      <Form {...form}>
        <div className="space-y-4">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={fields}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => (
                <WorkExperienceItem
                  key={field.id}
                  id={field.id}
                  index={index}
                  form={form}
                  remove={remove}
                />
              ))}
            </SortableContext>
          </DndContext>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() =>
              append({
                position: "",
                company: "",
                startDate: "",
                endDate: "",
                description: "",
              })
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Work Experience
          </Button>
        </div>
      </Form>
    </div>
  );
}

function WorkExperienceItem({
  id,
  form,
  index,
  remove,
}: {
  id: string;
  form: ReturnType<typeof useForm<WorkExperienceValues>>;
  index: number;
  remove: (index: number) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(
        "space-y-4 rounded-lg border bg-background p-4",
        isDragging && "z-50 border-2 border-primary shadow-lg"
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">
          Experience #{index + 1}
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded p-1 text-muted-foreground hover:bg-muted"
            onClick={() => remove(index)}
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="cursor-grab rounded p-1 text-muted-foreground hover:bg-muted"
            {...attributes}
            {...listeners}
          >
            <GripHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <GenerateWorkExperienceButton
          onWorkExperienceGenerated={(exp) =>
            form.setValue(`workExperiences.${index}`, exp)
          }
        />
      </div>

      <FormField
        control={form.control}
        name={`workExperiences.${index}.position`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Title</FormLabel>
            <FormControl>
              <Input {...field} placeholder="e.g., Software Engineer" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`workExperiences.${index}.company`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company</FormLabel>
            <FormControl>
              <Input {...field} placeholder="e.g., Acme Inc." />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`workExperiences.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input {...field} type="date" value={field.value?.slice(0, 10)} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`workExperiences.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                  placeholder="Present"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormDescription className="text-xs">
        Leave end date empty if currently employed
      </FormDescription>

      <FormField
        control={form.control}
        name={`workExperiences.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Describe your responsibilities and achievements"
                className="min-h-[100px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}