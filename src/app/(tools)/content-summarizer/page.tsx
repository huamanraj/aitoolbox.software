import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContentSummarizer } from "@/components/tools/ContentSummarizer";

export default function ContentSummarizerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              📄 Free Content Summarizer
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Summarize long articles, documents, and text instantly with AI.
              Free, fast, and no signup required.
            </p>
          </div>
          <ContentSummarizer />
        </div>
      </main>
      <Footer />
    </div>
  );
}
