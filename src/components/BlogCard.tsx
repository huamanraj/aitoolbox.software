"use client";

import Link from "next/link";
import { Calendar, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { BlogPost } from "@/data/blogs";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export const BlogCard = ({ post, index }: BlogCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block h-full rounded-2xl border bg-card overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
      >
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground">
              {post.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>

          <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                {post.authorAvatar}
              </div>
              <span className="text-sm font-medium">{post.author}</span>
            </div>

            {post.tags.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Tag className="w-3 h-3" />
                <span>{post.tags[0]}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
};
