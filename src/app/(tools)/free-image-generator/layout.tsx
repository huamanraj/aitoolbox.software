import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Free AI Image Generator - No Login, Unlimited & HD Quality | AI Toolbox",
  description:
    "Create stunning AI-generated images from text descriptions instantly. 100% free, no signup required, unlimited generations. Powered by advanced Flux AI model. Perfect for social media, blogs, marketing, and creative projects.",
  keywords: [
    "free ai image generator",
    "no login image generator",
    "unlimited ai art",
    "text to image free",
    "hd image generator",
    "ai art generator",
    "flux ai free",
    "pollinations ai",
    "ai image creator",
    "free stable diffusion",
    "ai artwork generator",
    "text to image ai",
    "image generation tool",
    "ai graphics generator",
    "free ai art maker",
    "online image generator",
    "ai picture creator",
    "no signup ai tool",
  ],
  alternates: {
    canonical: "https://aitoolbox.software/free-image-generator",
  },
  openGraph: {
    title: "Free AI Image Generator - Create Unlimited HD Images Instantly",
    description:
      "Transform text into stunning visuals with our free AI image generator. No login, unlimited use, HD quality. Perfect for social media, blogs, and creative projects.",
    url: "https://aitoolbox.software/free-image-generator",
    type: "website",
    siteName: "AI Toolbox",
    images: [
      {
        url: "/og-image-generator.png",
        width: 1200,
        height: 630,
        alt: "Free AI Image Generator - Create stunning images from text",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Image Generator - No Login & Unlimited",
    description:
      "Create unlimited HD images from text descriptions. 100% free, no signup required. Powered by advanced AI.",
    site: "@aitoolbox",
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
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free AI Image Generator - Unlimited & No Login",
  description:
    "Create stunning AI-generated images from text descriptions instantly. 100% free, no signup required, unlimited generations. Powered by advanced Flux AI model for high-quality results.",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Unlimited image generations",
    "No login or signup required",
    "HD quality output (up to 1280x1280px)",
    "Fast processing (5-15 seconds)",
    "Multiple size options",
    "Powered by Flux AI model",
    "100% Free forever",
    "Instant download",
  ],
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this AI image generator really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, absolutely! Our AI image generator is completely free with no hidden costs, subscriptions, or credit systems. You can generate unlimited images without creating an account or providing payment information.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to create an account to use this tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No account required! Simply visit this page, enter your prompt, and start generating images immediately. We believe in making AI tools accessible without barriers like registration or login.",
      },
    },
    {
      "@type": "Question",
      name: "What AI model powers this image generator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This tool uses the Flux model via Pollinations.AI, which is a state-of-the-art text-to-image diffusion model. Flux is known for producing high-quality, detailed images with excellent understanding of complex prompts and natural-looking results.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the generated images commercially?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generally, yes, but we recommend reviewing Pollinations.AI's terms of service for the most current licensing information. AI-generated images typically have fewer restrictions than stock photos, but it's always wise to verify usage rights for commercial projects.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to generate an image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most images generate in 5-15 seconds, depending on server load and image complexity. Higher resolutions may take slightly longer. The process is significantly faster than traditional graphic design or commissioning custom artwork.",
      },
    },
    {
      "@type": "Question",
      name: "What image sizes can I generate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can choose from multiple dimensions: 512x512px (small, fast), 768x768px (medium), 1024x1024px (large, recommended), and 1280x1280px (extra large). All sizes are suitable for digital use, with larger sizes providing more detail.",
      },
    },
  ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
