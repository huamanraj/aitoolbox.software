import type { Metadata, Viewport } from "next";
import { Questrial, Instrument_Serif } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const questrial = Questrial({
  weight: "400",
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://aitoolbox.software"),
  title: {
    default: "AI Toolbox - Free AI Tools for Everyone",
    template: "%s | AI Toolbox",
  },
  description:
    "Discover 100% free AI tools including image generator, writing assistant, photo enhancer, and background remover. No signup required.",
  applicationName: "AI Toolbox",
  referrer: "origin-when-cross-origin",
  keywords: [
    "free AI tools",
    "AI image generator",
    "free image generator",
    "AI writing assistant",
    "background remover",
    "photo enhancer",
    "AI tools online",
    "free AI platform",
  ],
  authors: [{ name: "AI Toolbox", url: "https://aitoolbox.software" }],
  creator: "AI Toolbox",
  publisher: "AI Toolbox",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aitoolbox.software",
    siteName: "AI Toolbox",
    title: "AI Toolbox - Free AI Tools for Everyone",
    description:
      "100% free AI tools including image generator, writing assistant, and more. No signup required.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Toolbox - Free AI Tools for Everyone",
    description:
      "100% free AI tools including image generator, writing assistant, and more.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-8422803804849110" />
        <meta
          name="google-site-verification"
          content="3DcD_AZXssd0F1Q-X5TElSbA-mReJhJQOVeFTx-kO3o"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.databuddy.cc/databuddy.js"
          data-client-id="XWPQ_xMGsuAeFkJg4_hYc"
          data-track-hash-changes="true"
          data-track-attributes="true"
          data-track-outgoing-links="true"
          data-track-interactions="true"
          data-track-scroll-depth="true"
          data-track-web-vitals="true"
          data-track-errors="true"
          crossOrigin="anonymous"
          async
        ></script>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8422803804849110"
          crossOrigin="anonymous"
        ></script>
        <link rel="llms-txt" href="/llms.txt" />
      </head>
      <body
        className={`${questrial.variable} ${instrumentSerif.variable}  antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="mx-auto sm:max-w-[80vw] px-4 sm:px-6 lg:px-8">
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
