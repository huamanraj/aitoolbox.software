import React from "react";
import type { Metadata } from "next";
import AnimeGeneratorClient from "./_components/anime-generator-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Free Anime AI Generator - Online Text to Anime Art | AI Toolbox",
  description:
    "Create anime-style images from text prompts for free. Our Anime AI Generator turns your ideas into stunning anime art. No watermark, fast, and mobile-friendly. Supports Ghibli, Chibi, Manga, and more styles.",
  keywords: [
    "anime ai generator",
    "text to anime",
    "anime art generator",
    "manga ai art",
    "free anime image maker",
    "ghibli style ai",
    "chibi ai art",
    "pollinations anime",
    "anime character creator",
    "ai anime maker",
  ],
  authors: [{ name: "AI Toolbox" }],
  creator: "AI Toolbox",
  publisher: "AI Toolbox",
  alternates: { canonical: "https://aitoolbox.software/anime-ai-generator" },
  openGraph: {
    title: "Free Anime AI Generator - Online Text to Anime Art",
    description:
      "Turn text prompts into beautiful anime-style images using our free Anime AI Generator. Multiple styles, customizable ratios, instant results.",
    url: "https://aitoolbox.software/anime-ai-generator",
    siteName: "AI Toolbox",
    images: [{ url: "/mainOG.webp", width: 1200, height: 630, alt: "Anime AI Generator" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Anime AI Generator - Text to Anime Art",
    description: "Generate anime-style images from your ideas in seconds.",
    images: ["/mainOG.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function AnimeAIGeneratorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free Anime AI Generator",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    description:
      "Create anime-style images from text prompts for free with our Anime AI Generator.",
    url: "https://aitoolbox.software/anime-ai-generator",
    offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  } as const;

  const useCases = [
    {
      title: "Original Characters",
      description: "Design custom anime characters with unique personalities, outfits, and expressions for your creative projects.",
    },
    {
      title: "Social Media Content",
      description: "Generate eye-catching anime art for posts, profile pictures, banners, and thumbnails that stand out.",
    },
    {
      title: "Worldbuilding & Scenes",
      description: "Create detailed anime-style environments, landscapes, and atmospheric scenes for storytelling and games.",
    },
    {
      title: "Character Concepts",
      description: "Rapidly prototype character designs for manga, games, animations, or visual novel projects.",
    },
    {
      title: "Fan Art & Tributes",
      description: "Create original anime-style interpretations of your favorite characters or mashup concepts.",
    },
    {
      title: "Wallpapers & Prints",
      description: "Generate high-quality anime art for desktop/phone wallpapers or physical prints and posters.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 md:px-6 md:py-8 max-w-7xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-6xl mx-auto">
        <header className="mb-8 md:mb-10 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Free Anime AI Generator
          </h1>
          <p className="text-muted-foreground mt-3 md:mt-4 max-w-3xl mx-auto text-sm md:text-base leading-relaxed px-4">
            Transform your ideas into stunning anime artwork instantly. Choose from 11+ styles including Ghibli, Chibi, Manga, and Cyberpunk. No login required, completely free.
          </p>
        </header>

        <main className="mb-12 md:mb-16">
          <AnimeGeneratorClient />
        </main>

        {/* SSR SEO Content */}
        <div className="space-y-8 md:space-y-10">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">About This Anime AI Generator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm md:text-base leading-relaxed">
              <p>
                Our <strong>Free Anime AI Generator</strong> is the ultimate tool for creating stunning anime-style artwork from text descriptions. 
                Whether you&apos;re an artist seeking inspiration, a content creator needing unique visuals, or an anime enthusiast bringing your imagination to life, 
                our AI makes professional-quality anime art accessible to everyone.
              </p>
              <p>
                <strong>Perfect for:</strong> Artists, manga creators, game developers, social media managers, writers, worldbuilders, and anime fans worldwide.
              </p>
              
              <h3 className="font-semibold text-base md:text-lg pt-2">✨ Key Features</h3>
              <ul className="list-disc pl-5 md:pl-6 space-y-2">
                <li><strong>11+ Anime Styles:</strong> Anime, Manga, Studio Ghibli, Chibi, Cyberpunk, Fantasy, Mecha, Shoujo, Shounen, Kawaii, and Realistic Anime</li>
                <li><strong>Flexible Aspect Ratios:</strong> Square (1:1), Landscape (16:9), Portrait (9:16), Classic (4:3), and Print (3:4) for any use case</li>
                <li><strong>Advanced Controls:</strong> Optional seed for reproducible results and negative prompts to avoid unwanted elements</li>
                <li><strong>Generation History:</strong> Keep track of your last 10 creations with easy reload functionality</li>
                <li><strong>Completely Free:</strong> No watermarks, no subscriptions, no hidden costs - 100% free to use and download</li>
                <li><strong>Instant Results:</strong> Powered by advanced AI models for fast, high-quality image generation</li>
                <li><strong>Mobile-Friendly:</strong> Works perfectly on desktop, tablet, and smartphone devices</li>
                <li><strong>Commercial Use:</strong> Download high-quality images for personal or commercial projects</li>
              </ul>
              
              <h3 className="font-semibold text-base md:text-lg pt-2">🎨 How to Create Anime Art</h3>
              <ol className="list-decimal pl-5 md:pl-6 space-y-2">
                <li><strong>Write a detailed prompt:</strong> Describe your anime scene, character, or concept with as much detail as possible (e.g., &quot;A brave female knight with silver armor, long flowing red hair, standing in a mystical forest at twilight&quot;)</li>
                <li><strong>Choose your anime style:</strong> Select from Ghibli, Chibi, Manga, Cyberpunk, and 7 other unique styles</li>
                <li><strong>Select aspect ratio:</strong> Pick the perfect dimensions for your intended use (social media, wallpaper, print, etc.)</li>
                <li><strong>Use advanced options (optional):</strong> Add negative prompts to avoid unwanted elements, or set a seed number for reproducible results</li>
                <li><strong>Generate & download:</strong> Click generate and watch your anime art come to life in seconds. Download instantly!</li>
              </ol>

              <h3 className="font-semibold text-base md:text-lg pt-2">💡 Pro Tips for Better Results</h3>
              <ul className="list-disc pl-5 md:pl-6 space-y-2">
                <li><strong>Be specific:</strong> Include details about lighting, mood, colors, clothing, expressions, and background</li>
                <li><strong>Use quality keywords:</strong> Add terms like &quot;cinematic lighting&quot;, &quot;detailed&quot;, &quot;vibrant colors&quot;, &quot;high quality&quot;</li>
                <li><strong>Try negative prompts:</strong> Exclude unwanted elements like &quot;blurry, distorted, low quality&quot;</li>
                <li><strong>Experiment with styles:</strong> The same prompt can look dramatically different across styles</li>
                <li><strong>Save your seeds:</strong> If you love a result, note the seed number to create variations with similar composition</li>
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">Popular Use Cases</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {useCases.map((useCase) => (
                <Card key={useCase.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base md:text-lg">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{useCase.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Comprehensive Anime Style Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4 text-sm md:text-base">
              <div className="space-y-1">
                <strong className="text-primary">Anime:</strong>
                <p className="text-sm text-muted-foreground">Classic anime style with vibrant colors, expressive characters, and dynamic compositions. Perfect for general anime artwork.</p>
              </div>
              <div className="space-y-1">
                <strong className="text-primary">Manga:</strong>
                <p className="text-sm text-muted-foreground">Traditional black and white manga aesthetic with detailed linework, screen tones, and dramatic shading.</p>
              </div>
              <div className="space-y-1">
                <strong className="text-primary">Studio Ghibli:</strong>
                <p className="text-sm text-muted-foreground">Inspired by Studio Ghibli films - soft, dreamy landscapes, nature-filled scenes, and warm nostalgic atmosphere.</p>
              </div>
              <div className="space-y-1">
                <strong className="text-primary">Chibi:</strong>
                <p className="text-sm text-muted-foreground">Adorable super-deformed characters with oversized heads, tiny bodies, and exaggerated cute expressions.</p>
              </div>
              <div className="space-y-1">
                <strong className="text-primary">Cyberpunk Anime:</strong>
                <p className="text-sm text-muted-foreground">Futuristic, neon-lit urban landscapes with high-tech elements, dark atmospheres, and sci-fi aesthetics.</p>
              </div>
              <div className="space-y-1">
                <strong className="text-primary">Fantasy Anime:</strong>
                <p className="text-sm text-muted-foreground">Magical worlds with mythical creatures, epic adventures, castles, dragons, and enchanted forests.</p>
              </div>
              <div className="space-y-1">
                <strong className="text-primary">Mecha Anime:</strong>
                <p className="text-sm text-muted-foreground">Giant robots, mechanical designs, sci-fi technology, and action-packed battle scenes.</p>
              </div>
              <div className="space-y-1">
                <strong className="text-primary">Shoujo Anime:</strong>
                <p className="text-sm text-muted-foreground">Romance-focused style with sparkles, flowers, soft lighting, and emotional character expressions.</p>
              </div>
              <div className="space-y-1">
                <strong className="text-primary">Shounen Anime:</strong>
                <p className="text-sm text-muted-foreground">Action-packed, energetic style with dynamic poses, battle scenes, and powerful character designs.</p>
              </div>
              <div className="space-y-1">
                <strong className="text-primary">Kawaii Anime:</strong>
                <p className="text-sm text-muted-foreground">Extra cute style with pastel colors, adorable characters, hearts, stars, and playful elements.</p>
              </div>
              <div className="space-y-1">
                <strong className="text-primary">Realistic Anime:</strong>
                <p className="text-sm text-muted-foreground">Semi-realistic anime with detailed anatomy, realistic lighting, and more mature proportions while keeping anime aesthetics.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-5 text-sm md:text-base">
              <div className="space-y-1.5">
                <h4 className="font-semibold text-sm md:text-base">Is this anime generator really free?</h4>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Yes! Our anime AI generator is 100% free with no hidden costs, subscriptions, or watermarks. Generate and download as many images as you want.
                </p>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-semibold text-sm md:text-base">Can I use generated images commercially?</h4>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Yes, you can use the generated anime art for both personal and commercial projects. Always check your local laws regarding AI-generated content.
                </p>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-semibold text-sm md:text-base">What is a seed and why should I use it?</h4>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  A seed is a number that controls randomness. Using the same seed with the same prompt will produce similar results, perfect for creating variations or reproducing a style you love.
                </p>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-semibold text-sm md:text-base">How do negative prompts work?</h4>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Negative prompts tell the AI what to avoid (e.g., &quot;blurry, distorted, low quality&quot;). This helps refine your results and exclude unwanted elements.
                </p>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-semibold text-sm md:text-base">What makes a good anime prompt?</h4>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Great prompts are detailed and specific. Include character features, clothing, background, lighting, mood, and quality keywords. Try our example prompts for inspiration!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
