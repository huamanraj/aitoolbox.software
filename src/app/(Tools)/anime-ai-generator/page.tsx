import React from "react";
import type { Metadata } from "next";
import AnimeGeneratorClient from "./_components/anime-generator-client";

export const metadata: Metadata = {
  title: "Free Anime AI Generator - Online Text to Anime Art",
  description:
    "Create anime-style images from text prompts for free. Our Anime AI Generator turns your ideas into stunning anime art. No watermark, fast, and mobile-friendly.",
  keywords: [
    "anime ai generator",
    "text to anime",
    "anime art generator",
    "manga ai art",
    "free anime image maker",
    "ghibli style ai",
    "chibi ai art",
    "pollinations anime",
  ],
  authors: [{ name: "AI Toolbox" }],
  creator: "AI Toolbox",
  publisher: "AI Toolbox",
  alternates: { canonical: "/anime-ai-generator" },
  openGraph: {
    title: "Free Anime AI Generator - Online Text to Anime Art",
    description:
      "Turn text prompts into beautiful anime-style images using our free Anime AI Generator.",
    url: "/anime-ai-generator",
    siteName: "AI Toolbox",
    images: [{ url: "/mainOG.webp", width: 1200, height: 630, alt: "Anime AI Generator" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Anime AI Generator - Text to Anime Art",
    description: "Generate anime-style images from your ideas in seconds.",
    images: ["/mainOG.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function AnimeAIGeneratorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free Anime AI Generator",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    description:
      "Create anime-style images from text prompts for free with our Anime AI Generator.",
    url: "https://aitoolbox.software/anime-ai-generator",
    offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  } as const;

  const useCases = [
    {
      title: "Original Characters",
      description: "Design custom anime characters for personal projects and inspiration.",
    },
    {
      title: "Social Content",
      description: "Generate unique anime art for posts, banners, and profile images.",
    },
    {
      title: "Worldbuilding",
      description: "Create anime-style scenes and environments for storytelling.",
    },
  ];

  return (
    <div className="container mx-auto p-4 md:p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
            Anime AI Generator
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-center">
            Type a prompt and instantly generate anime-style artwork. Powered by Pollinations anime model.
          </p>
        </header>

        <main className="mb-12">
          <AnimeGeneratorClient />
        </main>

        <div className="grid gap-6 mb-10">
          <h2 className="text-2xl font-bold">Popular Uses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="border p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-medium mb-1">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <ol className="list-decimal ml-5 space-y-3">
            <li>Enter your text prompt</li>
            <li>Select an anime style and aspect ratio</li>
            <li>Click Generate to create your image</li>
            <li>Download your anime artwork</li>
          </ol>
        </div>
      </div>
    </div>
  );
}


