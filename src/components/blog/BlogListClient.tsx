"use client";

import { useState, useMemo } from "react";
import { BlogCard } from "@/components/BlogCard";
import { blogPosts, blogCategories } from "@/data/blogs";
import { Search } from "lucide-react";

export function BlogListClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-24 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="container max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            AI Tools Blog
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8 px-4">
            Guides, tutorials, and insights to help you master AI tools and
            boost your productivity
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative px-4">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 rounded-2xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm md:text-base"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 md:py-8 px-4 border-b bg-background/50 backdrop-blur-sm sticky top-16 z-10">
        <div className="container max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {blogCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-8 md:py-12 lg:py-16 px-4">
        <div className="container max-w-7xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 md:py-16">
              <p className="text-muted-foreground text-base md:text-lg">
                No articles found matching your criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
