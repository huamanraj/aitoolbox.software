import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free AI Bedtime Story Generator - Personalized Stories for Kids | AI Toolbox",
  description:
    "Create magical personalized bedtime stories for your kids in seconds. Free AI bedtime story maker with custom characters, lessons, and illustrations. Perfect for busy parents.",
  keywords: [
    "free bedtime story generator",
    "ai bedtime story maker",
    "personalized bedtime stories",
    "children's story generator",
    "custom bedtime stories",
    "bedtime stories for kids",
    "bedtime story for anxious kids",
    "bedtime stories about dinosaurs",
    "personalized stories with child's name",
    "free kids story generator",
  ],
  alternates: {
    canonical: "https://aitoolbox.software/free-bedtime-story-generator",
  },
  openGraph: {
    title: "Free AI Bedtime Story Generator - Magical Stories for Kids",
    description:
      "Create personalized bedtime stories with your child's name, interests, and life lessons. Free AI-powered story maker with beautiful illustrations.",
    url: "https://aitoolbox.software/free-bedtime-story-generator",
    type: "website",
    images: [
      {
        url: "/og-bedtime-story-generator.png",
        width: 1200,
        height: 630,
        alt: "AI Bedtime Story Generator for Kids",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Bedtime Story Generator - Stories Kids Love",
    description:
      "Create magical personalized bedtime stories with AI. Free, instant, and perfect for busy parents.",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free AI Bedtime Story Generator for Kids",
  description:
    "Create personalized bedtime stories for children with AI. Free story generator that includes your child's name, interests, fears, and life lessons. Perfect for busy parents who want magical bedtime routines.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList:
    "Personalized stories with child's name, Custom characters and themes, Life lesson integration, AI-generated cover illustrations, Age-appropriate content, Instant story generation, No signup required",
  audience: {
    "@type": "Audience",
    audienceType: "Parents, Caregivers, Teachers, Grandparents",
    geographicArea: [
      {
        "@type": "Country",
        name: "United States",
      },
      {
        "@type": "Country",
        name: "United Kingdom",
      },
      {
        "@type": "Country",
        name: "Canada",
      },
    ],
  },
  author: {
    "@type": "Organization",
    name: "AI Toolbox",
    url: "https://aitoolbox.software",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "4521",
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
      name: "Is the bedtime story generator really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Our AI bedtime story generator is 100% free with unlimited story generation. No credit card, signup, or hidden fees required. Create as many personalized stories as your child wants.",
      },
    },
    {
      "@type": "Question",
      name: "How do personalized bedtime stories help my child?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Personalized stories featuring your child's name increase engagement and help them connect with the narrative. They're more likely to listen, learn life lessons, and develop a love for reading. Stories addressing their specific interests or fears can also help with emotional development.",
      },
    },
    {
      "@type": "Question",
      name: "What age range are these bedtime stories suitable for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our AI generates age-appropriate stories for children aged 2-10 years. Simply select your child's age, and the story complexity, vocabulary, and themes will be adjusted accordingly.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use these stories for anxious or fearful kids?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely! You can specify fears like darkness, monsters, or starting school, and the AI will create gentle, reassuring stories that help your child cope. The stories teach coping strategies and turn fears into adventures.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to generate a story?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Story generation takes 10-30 seconds. The AI creates both a personalized narrative and a custom cover illustration instantly, ready for bedtime reading.",
      },
    },
    {
      "@type": "Question",
      name: "Can I save or print the stories?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! You can copy the story text to save it, or use your browser's print function to create a physical keepsake. Many parents save favorite stories in a document or journal.",
      },
    },
  ],
};

export default function FreeBedtimeStoryGeneratorLayout({
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
