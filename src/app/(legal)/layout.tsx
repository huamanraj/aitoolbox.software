import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 border-b border-border/40">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-serif text-xl font-medium hover:opacity-80 transition-opacity"
          >
            AI Toolbox
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-3xl">{children}</div>
      </main>

      <footer className="py-8 border-t border-border/40 bg-muted/20">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <div className="flex justify-center gap-6 mb-4">
            <Link
              href="/about"
              className="hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
          <p>
            &copy; {new Date().getFullYear()} AI Toolbox. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
