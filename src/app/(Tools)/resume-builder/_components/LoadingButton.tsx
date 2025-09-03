import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ComponentProps, ReactNode } from "react";

type ButtonProps = ComponentProps<typeof Button>;

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
  children: ReactNode;
}

export function LoadingButton({
  loading,
  children,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button 
      disabled={loading} 
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {loading && <Loader2 className="size-5 animate-spin" />}
      {children}
    </Button>
  );
}