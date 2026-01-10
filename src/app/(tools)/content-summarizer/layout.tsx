import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Content Summarizer - AI Text Summarizer | AI Toolbox",
  description:
    "Summarize long articles, text, and documents instantly with our free AI Content Summarizer. No login required, unlimited usage.",
  keywords: [
    "content summarizer",
    "text summarizer",
    "ai summarizer",
    "article summarizer",
    "free summarizer",
    "summarize text online",
    "ai toolbox",
  ],
  alternates: {
    canonical: "https://aitoolbox.software/tools/content-summarizer",
  },
  openGraph: {
    title: "Free Content Summarizer - AI Text Summarizer",
    description:
      "Summarize long articles, text, and documents instantly with our free AI Content Summarizer.",
    url: "https://aitoolbox.software/tools/content-summarizer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Content Summarizer - AI Text Summarizer",
    description:
      "Summarize long articles, text, and documents instantly with our free AI Content Summarizer.",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free Content Summarizer",
  description:
    "Summarize long articles, text, and documents instantly with our free AI Content Summarizer. No login required.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList:
    "Instant summarization, Multiple lengths, No login required, Free to use",
  author: {
    "@type": "Organization",
    name: "AI Toolbox",
    url: "https://aitoolbox.software",
  },
};

export default function ContentSummarizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      {children}
    </>
  );
}
