import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Anime AI Generator | Text to Anime Art",
  description:
    "Generate anime-style images from text for free. No watermark. Fast, responsive, and easy to use.",
  keywords: [
    "anime ai generator",
    "text to anime",
    "anime art generator",
    "manga ai",
    "chibi ai",
    "ghibli ai",
  ],
  alternates: { canonical: "/anime-ai-generator" },
  openGraph: {
    title: "Free Anime AI Generator | Text to Anime Art",
    description: "Create anime art from prompts instantly.",
    url: "https://aitoolbox.software/anime-ai-generator",
    images: [{ url: "/mainOG.webp", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Anime AI Generator | Text to Anime Art",
    description: "Create anime art from prompts instantly.",
    images: ["/mainOG.webp"],
  },
};

export default function AnimeAIGeneratorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


