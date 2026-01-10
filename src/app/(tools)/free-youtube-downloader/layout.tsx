import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free YouTube Video Downloader - Download in HD, MP4, MP3 | AI Toolbox",
  description:
    "Download YouTube videos for free in multiple qualities (1080p, 720p, 480p, 360p). Save as MP4 or extract MP3 audio. No signup required, unlimited downloads.",
  keywords: [
    "youtube downloader",
    "download youtube video",
    "youtube to mp4",
    "youtube to mp3",
    "free youtube downloader",
    "download youtube hd",
    "save youtube video",
    "youtube video saver",
    "youtube downloader online",
    "yt downloader",
  ],
  alternates: {
    canonical: "https://aitoolbox.software/free-youtube-downloader",
  },
  openGraph: {
    title: "Free YouTube Video Downloader - HD Quality Downloads",
    description:
      "Download YouTube videos in HD quality for free. Multiple format options, no signup required.",
    url: "https://aitoolbox.software/free-youtube-downloader",
    type: "website",
    images: [
      {
        url: "/og-youtube-downloader.png",
        width: 1200,
        height: 630,
        alt: "YouTube Video Downloader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free YouTube Video Downloader - HD Downloads",
    description:
      "Download YouTube videos in multiple qualities. Free, fast, no signup required.",
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free YouTube Video Downloader",
  description:
    "Download YouTube videos for free in multiple qualities including 1080p, 720p, 480p, and 360p. Save as MP4 video or extract MP3 audio. No registration required, unlimited downloads.",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList:
    "Multiple quality options, HD downloads, MP4 format, MP3 audio extraction, No watermark, No signup required, Unlimited downloads, Fast processing",
  audience: {
    "@type": "Audience",
    audienceType: "Content creators, Students, Video enthusiasts",
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
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this YouTube downloader really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Our YouTube downloader is 100% free with unlimited downloads. No credit card, signup, or hidden fees required.",
      },
    },
    {
      "@type": "Question",
      name: "What video qualities are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can download videos in multiple qualities: 1080p (Full HD), 720p (HD), 480p (SD), and 360p. The available qualities depend on what the original video offers.",
      },
    },
    {
      "@type": "Question",
      name: "Can I download YouTube videos as MP3?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can extract audio from YouTube videos and download as MP3 format for music, podcasts, or audio content.",
      },
    },
    {
      "@type": "Question",
      name: "Is it legal to download YouTube videos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Downloading videos for personal, offline viewing of content you own or have permission to download is generally acceptable. Always respect copyright laws and YouTube's Terms of Service.",
      },
    },
  ],
};

export default function FreeYouTubeDownloaderLayout({
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
