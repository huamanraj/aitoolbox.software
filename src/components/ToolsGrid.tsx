"use client";

import { ToolCard } from "./ToolCard";
import { motion } from "framer-motion";

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing: string;
  icon: string;
  slug: string;
  trending?: boolean;
}

interface ToolsGridProps {
  tools: Tool[];
  title: string;
}

export const ToolsGrid = ({ tools, title }: ToolsGridProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="tools" className="py-12 px-4">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {tools.map((tool) => (
            <motion.div key={tool.id} variants={item}>
              <ToolCard {...tool} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
