import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ImageGenerator } from "@/components/tools/ImageGenerator";

export default function FreeImageGeneratorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🎨 Free AI Image Generator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Create stunning AI-generated images from text descriptions
              instantly. Free, fast, and no signup required.
            </p>
          </div>
          <ImageGenerator />
        </div>
      </main>
      <Footer />
    </div>
  );
}
