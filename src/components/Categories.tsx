"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface CategoriesProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export const Categories = ({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoriesProps) => {
  return (
    <section className="py-8 px-4 bg-muted/30">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">Browse by category</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategorySelect(null)}
          >
            <Badge
              variant={selectedCategory === null ? "default" : "secondary"}
              className="rounded-full px-5 py-2 cursor-pointer whitespace-nowrap"
            >
              All
            </Badge>
          </motion.button>
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategorySelect(category)}
            >
              <Badge
                variant={selectedCategory === category ? "default" : "secondary"}
                className="rounded-full px-5 py-2 cursor-pointer whitespace-nowrap"
              >
                {category}
              </Badge>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
