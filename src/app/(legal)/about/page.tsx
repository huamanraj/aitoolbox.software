import type { Metadata } from "next";

export const revalidate = 86400; // ISR for a day

export const metadata: Metadata = {
  title: "About AI Toolbox - Free AI Tools Platform",
  description:
    "Learn about AI Toolbox, the all-in-one platform for free AI-powered creativity and productivity tools. No signup required, privacy-focused, and fast.",
  keywords: [
    "about AI Toolbox",
    "free AI tools",
    "AI image generator",
    "AI writing assistant",
    "background remover",
    "no signup AI tools",
    "privacy focused AI",
  ],
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-serif text-4xl mb-6">About AI Toolbox</h1>

      <p className="text-lg leading-relaxed text-muted-foreground mb-8">
        AI Toolbox is your all-in-one platform for AI-powered creativity and
        productivity. Whether you need a{" "}
        <span className="font-medium text-foreground">
          free AI image generator
        </span>
        , an{" "}
        <span className="font-medium text-foreground">
          AI writing assistant
        </span>
        , or a{" "}
        <span className="font-medium text-foreground">background remover</span>,
        we've got you covered. All tools are built-in, fast, and free to use
        with no signup required for basic features.
      </p>

      <h2 className="font-serif text-2xl mt-10 mb-4">Our Mission</h2>
      <p className="leading-relaxed text-muted-foreground mb-6">
        Our platform includes powerful AI tools for image generation and
        editing, writing and content creation, audio transcription and
        text-to-speech, and design and branding. Each tool is optimized for
        speed and quality, running directly in your browser or on our servers
        for the best performance.
      </p>

      <h2 className="font-serif text-2xl mt-10 mb-6">Why Choose AI Toolbox?</h2>
      <ul className="space-y-4">
        <li className="flex gap-3">
          <span className="font-bold text-primary min-w-[140px]">
            100% Free Tools:
          </span>
          <span className="text-muted-foreground">
            Access powerful AI features without any cost.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-primary min-w-[140px]">
            No Signup Required:
          </span>
          <span className="text-muted-foreground">
            Start using tools immediately, no registration needed.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-primary min-w-[140px]">
            Fast & Reliable:
          </span>
          <span className="text-muted-foreground">
            Built with cutting-edge AI models for instant results.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-primary min-w-[140px]">
            Privacy-Focused:
          </span>
          <span className="text-muted-foreground">
            Your data stays secure and private. We don't store your content.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-bold text-primary min-w-[140px]">
            Regular Updates:
          </span>
          <span className="text-muted-foreground">
            New tools and features added frequently to keep you ahead.
          </span>
        </li>
      </ul>
    </div>
  );
}
