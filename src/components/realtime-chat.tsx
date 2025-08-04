'use client'

import { useRef, KeyboardEvent, useEffect, useState } from "react";
import { useRealtimeChat } from "@/hooks/use-realtime-chat";
import { ChatMessage } from "./chat-message";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { ArrowUp, Bot, Sparkles, MessageSquare, Code, FileText, Lightbulb } from "lucide-react";

interface RealtimeChatProps {
  systemPrompt?: string;
}
interface WelcomeScreenProps {
  setInput: (input: string) => void;
  handleSubmit: () => void;
}
const WelcomeScreen = ({ setInput, handleSubmit }: WelcomeScreenProps) => {
  const capabilities = [
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "General Assistance",
      description: "Ask questions, get explanations, or have conversations on any topic"
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: "Code Help",
      description: "Debug code, explain programming concepts, or get coding assistance"
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Content Creation",
      description: "Write emails, articles, summaries, or any text-based content"
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Creative Ideas",
      description: "Generate ideas for projects, businesses, blogs, or creative endeavors"
    }
  ];

  const examplePrompts = [
    "Explain how AI works in simple terms",
    "Help me write a professional email",
    "Generate ideas for a tech startup",
    "Debug this JavaScript code for me"
  ];

  return (
    <div className="flex-1 flex items-center justify-center px-4 md:px-8 lg:px-16 py-8">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Branding Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-2xl bg-primary/10">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">AIToolbox BOT</h1>
              <p className="text-muted-foreground">Your intelligent AI assistant</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            <span>Powered by advanced AI technology</span>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  {capability.icon}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">{capability.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{capability.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Example Prompts */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Try asking me about:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {examplePrompts.map((prompt, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-muted/20 border border-border/30 text-sm text-muted-foreground hover:bg-muted/40 transition-colors cursor-default"
              >
                <button onClick={() => { setInput(prompt); setTimeout(() => handleSubmit(), 0); }} className="w-full text-left">
                  &ldquo;{prompt}&rdquo;
                </button>
              </div>

            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="pt-4">
          <p className="text-muted-foreground mb-2">Ready to get started?</p>
          <p className="text-sm text-muted-foreground/80">Type your message below and press Enter or click the send button</p>
        </div>
      </div>
    </div>
  );
};

export function RealtimeChat({ systemPrompt }: RealtimeChatProps) {
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { messages, input, setInput, handleSubmit, isLoading } = useRealtimeChat({ systemPrompt });


  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isLoading]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  if (!mounted) return null;
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-background">
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto"
        suppressHydrationWarning={true}
      >
        {messages.length === 0 ? (
          <WelcomeScreen setInput={setInput} handleSubmit={handleSubmit} />
        ) : (
          <div className="px-4 md:px-8 lg:px-16 py-6 space-y-8">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <ChatMessage
                message={{ id: 'typing', role: 'assistant', content: '' }}
                isTyping={true}
              />
            )}
          </div>
        )}
      </div>

      <div className="border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 md:p-6 lg:px-16">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
          className="flex items-start gap-4 max-w-4xl mx-auto"
        >
          <Textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask AIToolbox BOT anything..."
            className="min-h-[60px] w-full resize-none rounded-xl bg-muted/50 px-4 py-[1.3rem] text-base focus-within:bg-muted/70 border-2 border-transparent focus-within:border-primary/50 transition-all"
            rows={1}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className={cn(
              "h-16 w-16 rounded-xl transition-all font-medium flex-shrink-0",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
          >
            <ArrowUp className="h-6 w-6" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
