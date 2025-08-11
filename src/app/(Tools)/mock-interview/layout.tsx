import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "AI Mock Interview | AIToolbox.software",
    template: "%s | AI Mock Interview"
  },
  description:
    "Practice realistic mock interviews for top tech roles (Software Engineer, Frontend, Backend, DevOps, Data, PM). Get structured feedback with STAR analysis and score tables.",
  keywords: [
    "AI mock interview",
    "software engineer interview",
    "frontend interview",
    "backend interview",
    "data scientist interview",
    "devops interview",
    "product manager interview",
    "STAR method",
    "interview preparation",
    "technical interview practice"
  ],
  alternates: {
    canonical: "https://aitoolbox.software/mock-interview"
  },
  openGraph: {
    type: "website",
    url: "https://aitoolbox.software/mock-interview",
    title: "AI Mock Interview | AIToolbox.software",
    description:
      "Practice realistic interviews tailored to your role and level. Get detailed feedback: STAR analysis, strengths, improvements, and score tables.",
    siteName: "AIToolbox.software",
    images: [
      {
        url: "/mainOG.webp",
        width: 1200,
        height: 630,
        alt: "AIToolbox AI Mock Interview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Mock Interview | AIToolbox.software",
    description:
      "Role-specific interview questions with structured feedback and STAR analysis.",
    images: ["/mainOG.webp"],
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}


