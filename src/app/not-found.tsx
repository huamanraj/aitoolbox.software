import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { tools } from "@/data/tools";
import { Button } from "@/components/ui/button";
import {
  Home,
  ArrowRight,
  Shield,
  Zap,
  UserPlus,
  Sparkles,
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* 404 Hero Section */}
        <section className="py-20 px-4 text-center border-b bg-muted/30">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-8xl font-bold mb-4 opacity-20">404</h1>
            <h2 className="text-4xl font-bold mb-4">Oops! Page Missing</h2>
            <p className="text-xl text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved. But
              don't worry, AI Toolbox has plenty of other amazing free AI tools
              for you to explore!
            </p>
            <div className="flex justify-center gap-4">
              <Button
                asChild
                variant="default"
                size="lg"
                className="rounded-full px-8"
              >
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Home
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Tools Grid Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Explore Our Trending AI Tools
                </h2>
                <p className="text-muted-foreground">
                  Discover 100% free AI tools with no signup required.
                </p>
              </div>
              <Button variant="ghost" asChild>
                <Link href="/" className="flex items-center">
                  View All Tools <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.slice(0, 6).map((tool) => (
                <Link
                  key={tool.id}
                  href={`/${tool.slug}`}
                  className="group relative p-6 rounded-2xl border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-4xl mb-4 group-hover:rotate-12 transition-transform duration-300">
                    {tool.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="flex items-center text-sm font-medium text-primary">
                    Use Tool{" "}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed About Section (Inspired by About Page) */}
        <section className="py-20 px-4 bg-muted/20 border-t border-b">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 font-serif">
                  What is AI Toolbox?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  AI Toolbox is your all-in-one platform for AI-powered
                  creativity and productivity. We provide powerful AI tools for
                  image generation and editing, writing and content creation,
                  audio transcription, and more.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Each tool is optimized for speed and quality, running directly
                  in your browser or on our high-performance servers to ensure
                  the best results every time. Our mission is to make advanced
                  AI technology accessible to everyone, regardless of technical
                  background.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 p-2 rounded-lg text-primary">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">Fast</h4>
                      <p className="text-xs text-muted-foreground">
                        Instant AI processing
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-primary/10 p-2 rounded-lg text-primary">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold">Private</h4>
                      <p className="text-xs text-muted-foreground">
                        No data storage
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-3xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold mb-8 font-serif">
                  Why Choose Us?
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-primary/10 h-10 w-10 flex items-center justify-center rounded-full text-primary shrink-0">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">100% Free Tools</h4>
                      <p className="text-sm text-muted-foreground">
                        Access professional-grade AI features without paying a
                        cent.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-primary/10 h-10 w-10 flex items-center justify-center rounded-full text-primary shrink-0">
                      <UserPlus className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">No Signup Required</h4>
                      <p className="text-sm text-muted-foreground">
                        Start creating immediately—no account, email, or
                        registration needed.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-primary/10 h-10 w-10 flex items-center justify-center rounded-full text-primary shrink-0">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Privacy-Focused</h4>
                      <p className="text-sm text-muted-foreground">
                        Your content is processed and never stored. Your privacy
                        is our priority.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
