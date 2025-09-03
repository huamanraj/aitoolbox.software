import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  GenerateProjectInput,
  generateProjectSchema,
  Project,
} from "@/lib/resume/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { generateProject } from "../forms/actions";
import { toast } from "sonner";
import { LoadingButton } from "../LoadingButton";

interface GenerateProjectButtonProps {
  onProjectGenerated: (project: Project) => void;
}

export default function GenerateProjectButton({
  onProjectGenerated,
}: GenerateProjectButtonProps) {
  const [showInputDialog, setShowInputDialog] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        type="button"
        onClick={() => {
          setShowInputDialog(true);
        }}
      >
        <WandSparklesIcon className="size-4" />
        Smart fill (AI)
      </Button>
      <InputDialog
        open={showInputDialog}
        onOpenChange={setShowInputDialog}
        onProjectGenerated={(project) => {
          onProjectGenerated(project);
          setShowInputDialog(false);
        }}
      />
    </>
  );
}

interface InputDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProjectGenerated: (project: Project) => void;
}

function InputDialog({
  open,
  onOpenChange,
  onProjectGenerated,
}: InputDialogProps) {
  const form = useForm<GenerateProjectInput>({
    resolver: zodResolver(generateProjectSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(input: GenerateProjectInput) {
    try {
      const response = await generateProject(input);
      if (response) {
        onProjectGenerated(response.project);
      } else {
        toast.error("No project generated.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate project</DialogTitle>
          <DialogDescription>
            Describe your project and the AI will generate an optimized
            entry with focus on results and impact.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={`E.g. "Built a React e-commerce app for a local bookstore that increased online sales by 40% in two months. Used Node.js backend and implemented user authentication."`}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton type="submit" loading={form.formState.isSubmitting}>
              Generate
            </LoadingButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}