import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Image Generator - No Login, Unlimited & HD | AI Toolbox",
  description:
    "Generate unlimited HD images from text for free. No login or signup required. Create stunning AI art instantly with our advanced text-to-image tool.",
  keywords: [
    "free ai image generator",
    "no login image generator",
    "unlimited ai art",
    "text to image free",
    "hd image generator",
    "ai toolbox",
    "stable diffusion free",
  ],
  alternates: {
    canonical: "https://aitoolbox.software/free-image-generator",
  },
  openGraph: {
    title: "Free AI Image Generator - No Login, Unlimited & HD",
    description:
      "Generate unlimited HD images from text for free. No login or signup required. Create stunning AI art instantly.",
    url: "https://aitoolbox.software/free-image-generator",
    type: "website",
    images: [
      {
        url: "/og-image-generator.png",
        width: 1200,
        height: 630,
        alt: "Free AI Image Generator Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Image Generator - No Login & Unlimited",
    description:
      "Generate unlimited HD images from text for free. No login required.",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free AI Image Generator - Unlimited & No Login",
  description:
    "Generate unlimited HD images from text for free. No login or signup required. Create stunning AI art instantly with our advanced text-to-image tool.",
  applicationCategory: "Image",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList:
    "Unlimited generations, No login required, HD Quality, Fast processing, 100% Free",
  author: {
    "@type": "Organization",
    name: "AI Toolbox",
    url: "https://aitoolbox.software",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function FreeImageGeneratorLayout({
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
