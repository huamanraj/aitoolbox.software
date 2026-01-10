"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { ToolsGrid } from "@/components/ToolsGrid";

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

interface HomePageClientProps {
  tools: Tool[];
  categories: string[];
  trendingTools: Tool[];
}

export function HomePageClient({ tools, categories, trendingTools }: HomePageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category")
  );

  useEffect(() => {
    const category = searchParams.get("category");
    setSelectedCategory(category);
  }, [searchParams]);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      router.push(`/?category=${category}`, { scroll: false });
    } else {
      router.push("/", { scroll: false });
    }
  };

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        searchValue === "" ||
        tool.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchValue.toLowerCase());

      const matchesCategory =
        selectedCategory === null || tool.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchValue, selectedCategory, tools]);

  return (
    <>
      <Hero onSearchChange={setSearchValue} searchValue={searchValue} />
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      {trendingTools.length > 0 && !searchValue && !selectedCategory && (
        <ToolsGrid tools={trendingTools} title="🔥 Trending Now" />
      )}
      <ToolsGrid
        tools={filteredTools}
        title={
          selectedCategory
            ? `${selectedCategory} Tools`
            : searchValue
            ? "Search Results"
            : "All Free AI Tools"
        }
      />
    </>
  );
}
