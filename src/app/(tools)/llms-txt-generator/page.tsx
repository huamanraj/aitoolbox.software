import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LLMsTxtGenerator } from "@/components/tools/LLMsTxtGenerator";

export default function LLMsTxtGeneratorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🤖 Free LLMs.txt Generator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Generate standardized <code>llms.txt</code> files to help AI
              models understand and index your website content better. Improve
              your AI SEO instantly.
            </p>
          </div>
          <LLMsTxtGenerator />

          <div className="mt-24 max-w-4xl mx-auto">
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold mb-8 text-center">
                The Ultimate Guide to llms.txt and AI SEO
              </h2>

              <p className="lead text-xl text-muted-foreground mb-12 text-center">
                Learn why <code>llms.txt</code> is becoming the new standard for
                making your website visible to Artificial Intelligence, and how
                you can implement it today.
              </p>

              <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">
                    What is llms.txt?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Just as <code>robots.txt</code> tells search engine crawlers
                    what they can and cannot visit, and <code>sitemap.xml</code>{" "}
                    provides a map of your website's structure,{" "}
                    <code>llms.txt</code> is a specialized file format designed
                    specifically for Large Language Models (LLMs).
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    It provides a clean, markdown-based summary of your
                    website's content, making it incredibly easy for AI agents
                    (like ChatGPT, Claude, or Perplexity) to digest and
                    understand your site's purpose without having to scrape
                    complex HTML.
                  </p>
                </div>
                <div className="bg-muted/30 p-6 rounded-xl border">
                  <h4 className="font-mono text-sm mb-4 text-muted-foreground">
                    Example Structure
                  </h4>
                  <pre className="text-xs font-mono overflow-x-auto bg-background p-4 rounded-lg border">
                    {`# My Website

> A brief summary of what this site does.

## Main Sections

- [Documentation](/docs)
- [Blog](/blog)
- [Pricing](/pricing)

## Key Pages

- [About Us](/about): Company history
- [Contact](/contact): Get in touch`}
                  </pre>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-6">
                Why do you need llms.txt?
              </h3>
              <div className="grid md:grid-cols-3 gap-6 mb-16">
                <div className="p-6 rounded-xl border bg-card">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary font-bold text-lg">
                    1
                  </div>
                  <h4 className="font-semibold mb-2">AI Visibility</h4>
                  <p className="text-sm text-muted-foreground">
                    Ensure your content is correctly indexed and understood by
                    the next generation of search engines (AI Search).
                  </p>
                </div>
                <div className="p-6 rounded-xl border bg-card">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary font-bold text-lg">
                    2
                  </div>
                  <h4 className="font-semibold mb-2">Accuracy Control</h4>
                  <p className="text-sm text-muted-foreground">
                    Reduce hallucinations by providing authoritative summaries
                    and context directly to the models.
                  </p>
                </div>
                <div className="p-6 rounded-xl border bg-card">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary font-bold text-lg">
                    3
                  </div>
                  <h4 className="font-semibold mb-2">Future Proofing</h4>
                  <p className="text-sm text-muted-foreground">
                    As "Agentic Web" grows, having a machine-readable interface
                    for your site will be crucial for traffic.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-6">
                llms.txt vs llms-full.txt
              </h3>
              <p className="mb-6 text-muted-foreground">
                The standard proposes two files to balance efficiency and depth:
              </p>
              <div className="overflow-hidden rounded-xl border mb-16">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-muted-foreground font-medium">
                    <tr>
                      <th className="p-4">File</th>
                      <th className="p-4">Purpose</th>
                      <th className="p-4">Content</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-4 font-mono font-semibold">llms.txt</td>
                      <td className="p-4">The "Elevator Pitch"</td>
                      <td className="p-4 text-muted-foreground">
                        Concise summary, main navigation links, and high-level
                        overview. Used for quick context.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono font-semibold">
                        llms-full.txt
                      </td>
                      <td className="p-4">The "Deep Dive"</td>
                      <td className="p-4 text-muted-foreground">
                        Detailed content, full blog posts, documentation, and
                        comprehensive data. Used when the AI needs specifics.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to optimize for AI?
                </h3>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Use our free tool above to generate both files instantly. No
                  coding required. Just enter your URL and download the files.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    100% Free
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    No Signup Required
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Instant Generation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
