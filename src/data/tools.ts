export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  pricing: string;
  icon: string;
  slug: string;
  trending?: boolean;
}

export const tools: Tool[] = [
  {
    id: "1",
    name: "Free Image Generator",
    description: "Create stunning AI-generated images from text descriptions instantly",
    category: "Image",
    pricing: "Free",
    icon: "🎨",
    slug: "free-image-generator",
    trending: true,
  },
  {
    id: "2",
    name: "Free Tattoo Generator",
    description: "Design custom tattoo art instantly with AI - from minimalist to sleeve designs",
    category: "Image",
    pricing: "Free",
    icon: "🎭",
    slug: "free-tattoo-generator",
    trending: true,
  },
  {
    id: "3",
    name: "Free Bio Generator",
    description: "Create perfect social media bios for Instagram, LinkedIn, TikTok & Twitter with AI",
    category: "Writing",
    pricing: "Free",
    icon: "✨",
    slug: "free-bio-generator",
    trending: true,
  },
  {
    id: "4",
    name: "Content Summarizer",
    description: "Summarize long articles and documents in seconds",
    category: "Writing",
    pricing: "Free",
    icon: "📄",
    slug: "content-summarizer",
  },
  {
    id: "5",
    name: "LLMs.txt Generator",
    description: "Generate llms.txt files for your website to improve AI SEO and visibility",
    category: "Coding",
    pricing: "Free",
    icon: "🤖",
    slug: "llms-txt-generator",
    trending: true,
  },
  {
    id: "6",
    name: "Free Bedtime Story Generator",
    description: "Create magical personalized bedtime stories for kids with AI - featuring their name and teaching life lessons",
    category: "Writing",
    pricing: "Free",
    icon: "📚",
    slug: "free-bedtime-story-generator",
    trending: true,
  },
  {
    id: "7",
    name: "YouTube Video Downloader",
    description: "Download YouTube videos in HD (1080p, 720p, 480p) or extract MP3 audio - free and unlimited",
    category: "Audio",
    pricing: "Free",
    icon: "📹",
    slug: "free-youtube-downloader",
    trending: true,
  },
];

export const categories = [
  "Writing",
  "Image",
  "Coding",
  "Audio",
  "Design",
  "Marketing",
];
