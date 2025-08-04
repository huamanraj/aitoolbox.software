import { Globe, Languages } from "lucide-react";
import TranslatorClient from "./_components/translator-client";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Translator - Translate Text Between 100+ Languages Instantly",
  description:
    "Accurate, AI-powered translation tool supporting 100+ languages. Perfect for business, travel, education, and personal use. No signup required.",
  keywords: [
    "AI translator",
    "language translation",
    "translate text",
    "multilingual translation",
    "AI language tool",
    "free translator",
    "online translation",
  ],
  openGraph: {
    title: "AI Translator - Translate Text Between 100+ Languages Instantly",
    description:
      "Accurate, AI-powered translation tool supporting 100+ languages. Perfect for business, travel, education, and personal use.",
  },
};

const translationUseCases = [
  {
    title: "Business & Professional",
    description:
      "Translate business documents, emails, and communications with clients and partners worldwide.",
  },
  {
    title: "Travel & Tourism",
    description:
      "Break language barriers while traveling with instant translations for common phrases and conversations.",
  },
  {
    title: "Education & Learning",
    description:
      "Support language learning by comparing translations and understanding context in different languages.",
  },
  {
    title: "Content Localization",
    description:
      "Adapt your website, app, or content for global audiences with accurate translations.",
  },
  {
    title: "Personal Communication",
    description:
      "Connect with friends and family across language barriers with natural-sounding translations.",
  },
  {
    title: "Academic Research",
    description:
      "Access and understand research papers and documents in multiple languages.",
  },
];

export default function TranslatorPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
            AI-Powered Language Translator
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-center">
            Translate text between 100+ languages with high accuracy.
            <br className="hidden sm:inline" /> Our AI understands context for
            more natural translations.
          </p>
        </header>

        <main className="mb-12">
          <TranslatorClient />
        </main>

        {/* Translation Use Cases */}
        <div className="grid gap-6 mb-10">
          <h2 className="text-2xl font-bold">Perfect For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {translationUseCases.map((useCase, index) => (
              <div
                key={index}
                className="border p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
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
            <li>Enter or paste your text in the source language</li>
            <li>
              Select the source and target languages from the dropdown menus
            </li>
            <li>Click "Translate" to get an instant, accurate translation</li>
            <li>Copy the translated text or listen to the pronunciation</li>
          </ol>
        </div>

        {/* Translation Tips */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Translation Tips</h2>
          <ul className="space-y-4">
            <li>
              <strong>Be clear and simple:</strong> Avoid idioms, slang, or
              culturally loaded expressions.
            </li>
            <li>
              <strong>Use proper punctuation:</strong> Helps the AI understand
              sentence structure for better translation.
            </li>
            <li>
              <strong>Check for tone and intent:</strong> Especially in business
              or formal documents.
            </li>
            <li>
              <strong>Review before use:</strong> For sensitive or legal
              content, always have a native speaker or expert review.
            </li>
          </ul>
        </div>

        <div className="mt-12 border-t pt-8 prose max-w-none">
          <h2 className="text-2xl font-bold mb-4">
            The Power of AI Translation: A Modern Solution
          </h2>

          <p>
            Language shouldn’t stand in the way of meaningful communication. Our
            AI Translator leverages cutting-edge language processing to provide
            smooth, accurate translations in real time. Whether you're expanding
            your business internationally, exploring new countries, or simply
            trying to learn a new language, this tool helps you connect and
            understand—effortlessly.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Beyond Word-for-Word: Context-Aware Translation
          </h3>

          <p>
            Traditional translators often miss the nuance, tone, or cultural
            context. Our AI understands meaning, not just words—delivering
            translations that sound human and preserve the original intent.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Best Practices for Effective Translation
          </h3>

          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Use full sentences with proper grammar and punctuation</li>
            <li>Break up long paragraphs for easier context recognition</li>
            <li>Avoid emojis, sarcasm, or cultural idioms</li>
            <li>Specify if your content is formal, casual, or technical</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            When Accuracy Really Matters
          </h3>

          <p>
            For legal, medical, or highly sensitive translations, we recommend
            pairing our AI-generated output with human review. This ensures
            complete accuracy in both language and compliance.
          </p>

          <p className="mt-6">
            With regular use, our AI Translator becomes an essential tool in
            your communication toolkit. Try it today and experience seamless,
            smart translation for every situation.
          </p>
        </div>
      </div>
      {/* Related tools section */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">Related Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link
            href="/grammar-fixer"
            className="p-4 border rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-3"
          >
            <div className="bg-blue-100 p-2 rounded-full">
              <Languages className="h-5 w-5 " />
            </div>
            <div>
              <h3 className="font-medium">Grammar Fixer</h3>
              <p className="text-sm text-muted-foreground">
                Fix grammar and improve writing
              </p>
            </div>
          </Link>
          <Link
            href="/text-summarizer"
            className="p-4 border rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-3"
          >
            <div className="bg-blue-100 p-2 rounded-full">
              <Globe className="h-5 w-5 " />
            </div>
            <div>
              <h3 className="font-medium">Text Summarizer</h3>
              <p className="text-sm text-muted-foreground">
                Condense text into concise summaries
              </p>
            </div>
          </Link>
          <Link
            href="/chatbot"
            className="p-4 border rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-3"
          >
            <div className="bg-blue-100 p-2 rounded-full">
              <Globe className="h-5 w-5 " />
            </div>
            <div>
              <h3 className="font-medium ">AI Chatbot</h3>
              <p className="text-sm text-muted-foreground">
                Chat with our AI assistant
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
