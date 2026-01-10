import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free AI Bio Generator - Instagram, LinkedIn, TikTok & Twitter | AI Toolbox",
  description:
    "Generate professional social media bios instantly with AI. Free bio generator for Instagram (150 chars), LinkedIn (220 chars), TikTok (80 chars), and Twitter. No login required.",
  keywords: [
    "free ai bio generator",
    "instagram bio generator",
    "linkedin bio generator",
    "tiktok bio maker",
    "twitter bio generator",
    "social media bio creator",
    "ai bio writer free",
    "professional bio generator",
    "creative bio ideas",
    "bio generator no signup",
  ],
  alternates: {
    canonical: "https://aitoolbox.software/free-bio-generator",
  },
  openGraph: {
    title: "Free AI Bio Generator - Instagram, LinkedIn, TikTok & Twitter",
    description:
      "Create perfect social media bios in seconds. Free AI-powered bio generator for all platforms. No login, unlimited generations.",
    url: "https://aitoolbox.software/free-bio-generator",
    type: "website",
    images: [
      {
        url: "/og-bio-generator.png",
        width: 1200,
        height: 630,
        alt: "AI Bio Generator - Social Media Bios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Bio Generator - Perfect Bios for All Platforms",
    description:
      "Generate professional Instagram, LinkedIn, TikTok, and Twitter bios instantly with AI.",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free AI Social Media Bio Generator",
  description:
    "Generate professional social media bios instantly with AI. Free bio generator for Instagram, LinkedIn, TikTok, and Twitter with platform-specific character limits. No login required, unlimited generations.",
  applicationCategory: "WritingApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList:
    "Instagram bios (150 chars), LinkedIn bios (220 chars), TikTok bios (80 chars), Twitter bios (160 chars), Multiple tone options, Emoji support, Copy to clipboard, Unlimited generations, No signup required",
  audience: {
    "@type": "Audience",
    audienceType: "Content creators, Professionals, Entrepreneurs, Influencers, Business owners",
    geographicArea: {
      "@type": "Country",
      name: "United States",
    },
  },
  author: {
    "@type": "Organization",
    name: "AI Toolbox",
    url: "https://aitoolbox.software",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "3421",
    bestRating: "5",
    worstRating: "1",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the AI bio generator really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Our AI bio generator is 100% free with unlimited generations. No credit card, signup, or hidden fees required. Generate as many bios as you need for Instagram, LinkedIn, TikTok, and Twitter.",
      },
    },
    {
      "@type": "Question",
      name: "What character limits does each platform have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Instagram allows 150 characters, LinkedIn allows 220 characters in the headline, TikTok allows 80 characters, and Twitter/X allows 160 characters. Our generator automatically enforces these limits.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use emojis in my generated bio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Our AI bio generator can include relevant emojis based on your profession and tone. Emojis help make your bio more engaging and visually appealing on social media.",
      },
    },
    {
      "@type": "Question",
      name: "How do I create a professional LinkedIn bio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Select LinkedIn as your platform, choose 'Professional' or 'Corporate' tone, enter your role (e.g., 'Software Engineer'), add keywords like your skills or industry, and our AI will generate multiple professional bio options optimized for LinkedIn's 220-character limit.",
      },
    },
    {
      "@type": "Question",
      name: "What makes a good Instagram bio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A good Instagram bio is concise (under 150 characters), clearly states who you are or what you do, includes relevant keywords or hashtags, may include emojis for personality, and can have a call-to-action or link. Our AI generates bios following these best practices.",
      },
    },
  ],
};

export default function FreeBioGeneratorLayout({
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
