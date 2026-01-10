import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LLMs.txt Generator | Accurate & Instant AI SEO Tool",
  description:
    "Generate accurate llms.txt and llms-full.txt files for your website instantly. Boost your AI visibility with our 100% free tool. No login, no credit card, no signup required.",
  keywords: [
    "llms.txt generator",
    "free llms.txt creator",
    "ai seo tool",
    "ai website indexing",
    "llms.txt file generator",
    "no login ai tools",
    "free ai tools",
    "accurate llms.txt",
    "ai agent optimization",
  ],
  openGraph: {
    title: "Free LLMs.txt Generator | Accurate & Instant AI SEO Tool",
    description:
      "Generate accurate llms.txt and llms-full.txt files for your website instantly. Boost your AI visibility with our 100% free tool. No login required.",
    type: "website",
    url: "https://aitoolbox.software/llms-txt-generator",
    siteName: "AI Toolbox",
    images: [
      {
        url: "https://aitoolbox.software/og-image.jpg", // Ensure this exists or use a generic one
        width: 1200,
        height: 630,
        alt: "Free LLMs.txt Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free LLMs.txt Generator | Accurate & Instant AI SEO Tool",
    description:
      "Generate accurate llms.txt and llms-full.txt files for your website instantly. Boost your AI visibility with our 100% free tool. No login required.",
    images: ["https://aitoolbox.software/og-image.jpg"],
  },
};

export default function LLMsTxtGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
