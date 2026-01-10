import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogListClient } from "@/components/blog/BlogListClient";

export const metadata: Metadata = {
  title: "Blog - AI Toolbox | Free AI Tools & Guides",
  description: "Learn how to use AI tools effectively. Guides, tutorials, and tips for image generation, AI writing, and productivity.",
  alternates: {
    canonical: "https://aitoolbox.software/blog",
  },
  openGraph: {
    title: "Blog - AI Toolbox",
    description: "Learn how to use AI tools effectively with our guides and tutorials.",
    url: "https://aitoolbox.software/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <BlogListClient />
      </main>
      <Footer />
    </div>
  );
}
