import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/common/Sidebar";
import Navbar from "@/components/common/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/common/Footer";
import SocialBarAd from "@/components/ads/SocialBarAd";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AIToolbox - All-in-One AI Tools Platform",
  description:
    "A comprehensive AI tool platform featuring Email Writer, GPT Chatbot, Image Generator, Logo Creator, YouTube Summarizer, Code Explainer, Text Summarizer, Blog Writer, Grammar Checker, Resume Builder, and Idea Generator. Your one-stop solution for AI-powered productivity tools.",
  keywords: [
    "AI tools",
    "email writer",
    "chatbot",
    "image generator",
    "logo generator",
    "youtube summarizer",
    "ai ppt builder",
    "code explainer",
    "text summarizer",
    "blog writer",
    "grammar checker",
    "resume builder",
    "Cover Letter Generator",
    "idea generator",
    "artificial intelligence",
    "productivity tools",
    "trip planner",
    "project recommender",
    "Question paper Generator",
  ],
  authors: [{ name: "AIToolbox" }],
  creator: "AIToolbox",
  publisher: "AIToolbox",
  robots: "index, follow",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  metadataBase: new URL("https://aitoolbox.software"),
  openGraph: {
    type: "website",
    url: "https://aitoolbox.software",
    title: "AIToolbox - Complete Suite of AI-Powered Tools",
    description:
      "Transform your workflow with our comprehensive AI tool platform. Features include Email Writer, GPT Chatbot, Image & Logo Generation, Content Summarization, Code Explanation, Blog Writing, Grammar Checking, Resume Building, and Creative Ideation.",
    siteName: "AIToolbox",
    images: [
      {
        url: "/mainOG.webp",
        width: 1200,
        height: 630,
        alt: "AIToolbox - AI Tools Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIToolbox - All-in-One AI Tools Platform",
    description:
      "Access powerful AI tools for content creation, image generation, code explanation, and more. Boost your productivity with our comprehensive suite of AI-powered solutions.",
    images: ["/mainOG.webp"],
  },
  verification: {
    google: "verify-code", // Add your Google verification code
  },
  category: "Technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="IKfVdoOA7AW1tFnZw-vtB-Nml7a2DdyYXs7NJ3gZjZ4"
        />
        <script
          src="https://cdn.databuddy.cc/databuddy.js"
          data-client-id="Xc9zriSmfjuathqhkSMht"
          data-enable-batching="true"
          crossOrigin="anonymous"
          async
        ></script>
      </head>

      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          dmSans.variable
        )}
      >
        <Analytics />

        <div className="flex flex-col h-screen">
          <Navbar />
          <div className="flex flex-1 overflow-hidden relative">
            <Sidebar />
            <main className="flex-1 overflow-auto">
              {children}
              <Footer />
            </main>
          </div>
        </div>
        <Toaster />
        <SocialBarAd />
      </body>
    </html>
  );
}
