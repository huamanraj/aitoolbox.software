"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface HeroProps {
  onSearchChange: (value: string) => void;
  searchValue: string;
}

export const Hero = ({ onSearchChange, searchValue }: HeroProps) => {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container max-w-4xl mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Free AI Tools for Everyone
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Generate images, enhance writing, edit photos, and create content—all powered by AI.
          <br className="hidden sm:block" />
          No signup required for basic features.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button size="lg" className="h-12 px-8 rounded-md" asChild>
            <a href="#tools">Browse All Tools</a>
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 rounded-md" asChild>
            <a href="/tools/image-generator">Try Image Generator</a>
          </Button>
        </motion.div>
        <motion.div
          className="relative max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for AI tools..."
            className="h-14 pl-12 pr-4 text-base rounded-md shadow-sm focus:shadow-md transition-shadow duration-150"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </motion.div>
      </div>
    </section>
  );
};
