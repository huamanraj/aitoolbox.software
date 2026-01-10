import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free AI Tattoo Generator - Custom Tattoo Design in Seconds | AI Toolbox",
  description:
    "Create unique tattoo designs instantly with our free AI tattoo generator. No login required. Generate custom tattoo ideas, sleeve designs, and body art concepts in seconds. Perfect for tattoo inspiration.",
  keywords: [
    "free ai tattoo generator",
    "tattoo design generator",
    "ai tattoo maker",
    "custom tattoo design",
    "tattoo ideas generator",
    "free tattoo designer",
    "tattoo sleeve generator",
    "ai generated tattoo",
    "tattoo art generator",
    "body art designer",
  ],
  alternates: {
    canonical: "https://aitoolbox.software/free-tattoo-generator",
  },
  openGraph: {
    title: "Free AI Tattoo Generator - Turn Your Vision Into Tattoo Art",
    description:
      "Generate unlimited custom tattoo designs for free. From minimalist to traditional, create your perfect tattoo concept with AI. No signup required.",
    url: "https://aitoolbox.software/free-tattoo-generator",
    type: "website",
    images: [
      {
        url: "/og-tattoo-generator.png",
        width: 1200,
        height: 630,
        alt: "AI Tattoo Generator - Custom Tattoo Designs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Tattoo Generator - Custom Designs Instantly",
    description:
      "Create unlimited tattoo designs with AI. Perfect for inspiration before your next ink session.",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free AI Tattoo Generator - Custom Tattoo Design Tool",
  description:
    "Generate unlimited custom tattoo designs instantly using AI. Create sleeve tattoos, minimalist designs, traditional art, and more. No login required, 100% free tattoo design generator for inspiration and visualization.",
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList:
    "Unlimited tattoo designs, Custom style options, HD quality previews, Sleeve design generator, Traditional & modern styles, No watermark, No signup required",
  audience: {
    "@type": "Audience",
    audienceType: "Tattoo enthusiasts, Body art lovers, Tattoo artists",
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
    ratingCount: "2847",
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
      name: "Is the AI tattoo generator really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Our AI tattoo generator is 100% free with unlimited designs. No credit card, signup, or hidden fees required.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use these tattoo designs commercially?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The generated designs are for personal inspiration and consultation with your tattoo artist. Always work with a professional tattoo artist to refine and apply the design.",
      },
    },
    {
      "@type": "Question",
      name: "What tattoo styles can I generate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can generate various styles including traditional, minimalist, tribal, Japanese, realism, watercolor, geometric, neo-traditional, and custom sleeve designs.",
      },
    },
    {
      "@type": "Question",
      name: "How do I use the tattoo design with my tattoo artist?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Download your generated design and bring it to your tattoo consultation. Your artist can refine the concept to perfectly fit your body placement and personal style.",
      },
    },
  ],
};

export default function FreeTattooGeneratorLayout({
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
