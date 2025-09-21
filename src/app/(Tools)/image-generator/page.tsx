import ImageGeneratorClient from "./_components/image-generator-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Image Generator - Create Stunning Images from Text Prompts",
  description: "Generate high-quality, unique images in seconds with our free AI image generator. No design skills needed. Perfect for social media, marketing, art, and more.",
  keywords: ["AI image generator", "text to image", "AI art generator", "free image creator", "AI photo generator", "digital art creator", "AI design tool"],
  openGraph: {
    title: "AI Image Generator - Create Stunning Images from Text",
    description: "Transform your ideas into visual art with our powerful AI image generator. Create unlimited, high-quality images for any purpose, completely free.",
  },
};

const imageUseCases = [
  {
    title: "Social Media Content",
    description: "Create eye-catching posts, stories, and ads for all social platforms.",
  },
  {
    title: "Marketing Materials",
    description: "Design professional banners, ads, and promotional graphics in seconds.",
  },
  {
    title: "Concept Art",
    description: "Visualize characters, scenes, and concepts for games, films, and books.",
  },
  {
    title: "Blog & Web Graphics",
    description: "Generate unique featured images and illustrations for your content.",
  },
  {
    title: "Product Prototypes",
    description: "Quickly mock up product ideas and design concepts.",
  },
  {
    title: "Personal Art Projects",
    description: "Bring your creative visions to life with AI-powered art generation.",
  },
];

export default function ImageGeneratorPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
            AI-Powered Image Generator
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-center">
            Transform your ideas into stunning visuals with our advanced AI image generator.
            <br className="hidden sm:inline" /> No design skills required—just type what you imagine!
          </p>
        </header>
        
        <main className="mb-12">
          <ImageGeneratorClient />
        </main>

        {/* Use Cases */}
        <div className="grid gap-6 mb-10">
          <h2 className="text-2xl font-bold">Endless Creative Possibilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {imageUseCases.map((useCase, index) => (
              <div key={index} className="border p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-medium mb-1">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <ol className="list-decimal ml-5 space-y-3">
            <li>Enter a detailed description of the image you want to create</li>
            <li>Select your preferred style and aspect ratio (optional)</li>
            <li>Click "Generate" and watch as AI brings your vision to life</li>
            <li>Download your image or generate variations with a single click</li>
          </ol>
        </div>

        {/* Tips for Better Results */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Tips for Better Results</h2>
          <ul className="space-y-4">
            <li>
              <strong>Be specific:</strong> Include details about subject, style, colors, and composition.
            </li>
            <li>
              <strong>Use descriptive adjectives:</strong> Words like "vibrant," "minimalist," or "surreal" help guide the AI.
            </li>
            <li>
              <strong>Reference styles or artists:</strong> Try "in the style of Van Gogh" or "cyberpunk aesthetic."
            </li>
            <li>
              <strong>Experiment with lighting:</strong> Terms like "dramatic lighting" or "soft morning light" can transform results.
            </li>
          </ul>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">Is the AI image generator really free?</h3>
              <p className="text-muted-foreground mt-1">
                Yes! Our basic image generation is completely free to use. We may offer premium features in the future, but core functionality will remain free.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">What can I use the generated images for?</h3>
              <p className="text-muted-foreground mt-1">
                You can use the images for personal and commercial projects, including social media, websites, marketing materials, and more. See our Terms of Service for full details.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">How long does it take to generate an image?</h3>
              <p className="text-muted-foreground mt-1">
                Most images generate in 10-30 seconds depending on complexity and server load. Higher resolution images may take slightly longer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
