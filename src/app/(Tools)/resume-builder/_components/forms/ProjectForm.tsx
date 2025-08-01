"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { projectSchema, ProjectValues } from "@/lib/resume/validation";
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

export default function ProjectForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<ProjectValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projects: resumeData.projects || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((values) => {
      setResumeData({
        ...resumeData,
        projects: (values.projects?.filter((proj): proj is NonNullable<typeof proj> => proj !== undefined) || []),
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "projects",
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
        <h2 className="text-2xl font-semibold">Projects</h2>
        <p className="text-sm text-muted-foreground">
          Showcase your notable projects
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
                <ProjectItem
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
                name: "",
                description: "",
                url: "",
              })
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>
      </Form>
    </div>
  );
}

function ProjectItem({
  id,
  form,
  index,
  remove,
}: {
  id: string;
  form: ReturnType<typeof useForm<ProjectValues>>;
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
          Project #{index + 1}
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

      <FormField
        control={form.control}
        name={`projects.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="e.g., E-commerce Platform" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`projects.${index}.url`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project URL</FormLabel>
            <FormControl>
              <Input {...field} placeholder="e.g., https://example.com" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`projects.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Describe the project, technologies used, and your contributions"
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