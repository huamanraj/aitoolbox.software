import { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Project Recommender | Smart Project Ideas for Skill Growth",
  description: "Get personalized project recommendations based on your tech stack, skill level, and career goals. Build projects that enhance your portfolio and advance your programming skills.",
  keywords: [
    "project ideas",
    "programming projects",
    "skill development",
    "portfolio projects", 
    "coding practice",
    "web development projects",
    "tech stack projects",
    "career growth",
    "AI project suggestions"
  ].join(", "),
  openGraph: {
    title: "AI Project Recommender | Smart Project Ideas for Skill Growth",
    description: "Get personalized project recommendations based on your tech stack, skill level, and career goals.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Project Recommender | Smart Project Ideas for Skill Growth",
    description: "Get personalized project recommendations based on your tech stack, skill level, and career goals.",
  },
}

export default function ProjectRecommenderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
