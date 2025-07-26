"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Menu,
  Mail,
  Siren,
  Cookie,
  ReceiptText,
  MessagesSquare,
  ImageIcon,
  Scale,
  Box,
  Youtube,
  Code,
  FileText,
  PenTool,
  Check,
  FileSpreadsheet,
  Lightbulb,
  Settings,
  Search, 
  Menu as MenuIcon,
  Rocket,
  Video,
  Newspaper,
  Smartphone,
  Package,
  Globe,
} from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

// Tool interface definition
interface Tool {
  name: string;
  href: string;
  icon: React.ReactNode;
}

// List of AI tools
const aiTools: Tool[] = [
  {
    name: "Ask AIToolbox",
    href: "/chatbot",
    icon: <MessagesSquare className="h-5 w-5" />,
  },
  {
    name: "Prompt Generator",
    href: "/prompt-generator",
    icon: <PenTool className="h-5 w-5" />,
  },
  {
    name: "AI Email Writer",
    href: "/email-writer",
    icon: <Mail className="h-5 w-5" />,
  },
  {
    name: "AI Translator",
    href: "/ai-translator",
    icon: <Globe className="h-5 w-5" />,
  },
  {
    name: "Image Generator",
    href: "/image-generator",
    icon: <ImageIcon className="h-5 w-5" />,
  },
  {
    name: "Logo Generator",
    href: "/logo-generator",
    icon: <Box className="h-5 w-5" />,
  },
  {
    name: "YouTube Summarizer",
    href: "/youtube-summarizer",
    icon: <Youtube className="h-5 w-5" />,
  },
  {
    name: "Code Explainer",
    href: "/code-explainer",
    icon: <Code className="h-5 w-5" />,
  },
  {
    name: "Text Summarizer",
    href: "/text-summarizer",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    name: "Blog Writer",
    href: "/blog-writer",
    icon: <PenTool className="h-5 w-5" />,
  },
  {
    name: "Grammar Fixer",
    href: "/grammar-fixer",
    icon: <Check className="h-5 w-5" />,
  },
  {
    name: "Resume Builder",
    href: "/resume-builder",
    icon: <FileSpreadsheet className="h-5 w-5" />,
  },
  {
    name: "Idea Generator",
    href: "/idea-generator",
    icon: <Lightbulb className="h-5 w-5" />,
  },
  {
    name: "Startup Ideas",
    href: "/startup-idea-generator",
    icon: <Rocket className="h-5 w-5" />,
  },
  {
    name: "YouTube Ideas",
    href: "/youtube-idea-generator",
    icon: <Video className="h-5 w-5" />,
  },
  {
    name: "Blog Ideas",
    href: "/blog-idea-generator",
    icon: <Newspaper className="h-5 w-5" />,
  },
  {
    name: "App Ideas",
    href: "/app-idea-generator",
    icon: <Smartphone className="h-5 w-5" />,
  },
  {
    name: "Product Ideas",
    href: "/product-idea-generator",
    icon: <Package className="h-5 w-5" />,
  },
  {
    name: "Blog",
    href: "/blog",
    icon: <PenTool className="h-5 w-5" />,
  },
  {
    name: "Privacy-Policy",
    href: "/privacy-policy",
    icon: <Scale className="h-5 w-5"/>,
  },
  {
    name: "Cookie-Policy",
    href: "/cookie-policy",
    icon: <Cookie className="h-5 w-5"/>,
  },
  {
    name: "Terms of Service",
    href: "/terms-of-service",
    icon: <ReceiptText className="h-5 w-5"/>,
  },
  {
    name: "DMCA Policy",
    href: "/dmca-policy",
    icon: <Siren className="h-5 w-5"/>,
  },
];

export default function Sidebar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const isMobile =  useIsMobile();

  // Filter tools based on search query (disabled when collapsed)
  const filteredTools = aiTools.filter((tool) =>
    isCollapsed
      ? true
      : tool.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Top search & collapse button - FIXED HEIGHT */}
      <div className="h-16 flex-shrink-0 bg-background border-b px-4 py-2 flex items-center">
        {!isCollapsed && (
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search tools..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
        {/* Collapse / Expand toggle */}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className={cn("ml-2", isCollapsed && "mx-auto")}
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar width</span>
          </Button>
        )}
      </div>

      {/* Scrollable Tools List - CALCULATED HEIGHT */}
      <div className="flex-1 overflow-hidden">
        <div
          className="h-full overflow-y-auto px-2 py-2 sidebar-scrollbar"
          style={{
            maxHeight: "calc(100% - 0px)",
            scrollbarWidth: "thin",
            scrollbarColor: "hsl(var(--border)) transparent",
          }}
        >
          <div className="space-y-1">
            {filteredTools.length === 0 ? (
              <div className="text-center text-sm text-muted-foreground py-4">
                No tools found
              </div>
            ) : (
              // Actual tools list
              filteredTools.map((tool) => (
                <Tooltip key={tool.name} delayDuration={200}>
                  <TooltipTrigger asChild>
                    <Link
                      href={tool.href}
                      className={cn(
                        "flex items-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                        pathname === tool.href
                          ? "bg-accent text-accent-foreground"
                          : "transparent",
                        isCollapsed ? "justify-center" : "gap-3"
                      )}
                    >
                      {tool.icon}
                      {!isCollapsed && <span>{tool.name}</span>}
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right" className="capitalize">
                      {tool.name}
                    </TooltipContent>
                  )}
                </Tooltip>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Settings Button - FIXED HEIGHT */}
      <div className="h-14 flex-shrink-0 bg-background border-t p-3 flex flex-col items-center">
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Link href="/settings" className="w-full">
              <Button
                variant="outline"
                className={cn(
                  "w-full gap-2",
                  isCollapsed ? "justify-center" : "justify-start"
                )}
                size="sm"
              >
                <Settings className="h-4 w-4" />
                {!isCollapsed && "Settings"}
              </Button>
            </Link>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right">Settings</TooltipContent>
          )}
        </Tooltip>
      </div>
    </div>
  );

  // For desktop condition
  if (!isMobile) {
    return (
      <aside
        className={cn(
          "border-r bg-background h-[calc(100vh-4rem)] flex-shrink-0 hidden md:block transition-all duration-300 overflow-hidden",
          isCollapsed ? "w-16" : "w-[280px]"
        )}
      >
        {sidebarContent}
      </aside>
    );
  }

  // For mobile condition
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed top-3 left-4 z-40 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    </>
  );
}
