import { Suspense } from "react";
import type { Metadata } from "next";
import { HomePageClient } from "@/components/HomePageClient";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { SEOContent } from "@/components/SEOContent";
import { FAQ } from "@/components/FAQ";
import { SocialProof } from "@/components/SocialProof";
import { tools, categories } from "@/data/tools";

export const metadata: Metadata = {
  title:
    "AI Toolbox - Free AI Tools for Everyone | Image Generator, Writing Assistant & More",
  description:
    "Discover 100% free AI tools including image generator, writing assistant, photo enhancer, and background remover. No signup required. Create stunning content with AI instantly.",
  keywords: [
    "free AI tools",
    "AI image generator",
    "free image generator",
    "AI writing assistant",
    "background remover",
    "photo enhancer",
    "AI tools online",
    "free AI platform",
    "text to image",
    "AI content creator",
  ],
  authors: [{ name: "AI Toolbox" }],
  creator: "AI Toolbox",
  publisher: "AI Toolbox",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aitoolbox.software/",
    title: "AI Toolbox - Free AI Tools for Everyone",
    description:
      "100% free AI tools including image generator, writing assistant, and more. No signup required.",
    siteName: "AI Toolbox",
    images: [
      {
        url: "https://aitoolbox.software/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Toolbox - Free AI Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Toolbox - Free AI Tools for Everyone",
    description:
      "100% free AI tools including image generator, writing assistant, and more. No signup required.",
    images: ["https://aitoolbox.software/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://aitoolbox.software/",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function HomePage() {
  const trendingTools = tools.filter((tool) => tool.trending);

  return (
    <>
      <StructuredData />
      <script
        type="text/llms-txt"
        dangerouslySetInnerHTML={{
          __html: `
# AI Toolbox Summary
AI Toolbox is a free platform offering AI tools like Image Generator and Content Summarizer.
- No signup required
- 100% free
- Privacy-focused
`,
        }}
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<div>Loading...</div>}>
              <HomePageClient
                tools={tools}
                categories={categories}
                trendingTools={trendingTools}
              />
            </Suspense>
            <SEOContent />
            <SocialProof />
            <FAQ />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
