import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import NativeBannerAd from "@/components/ads/NativeBannerAd";

export default function Page() {
  return (
    <div className="bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Demystify Code with an AI Code Explainer
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Whether you&apos;re a seasoned developer facing a new language or a
            student learning to code, understanding complex code snippets can be
            a major hurdle. Discover how AI can be your personal tutor.
          </p>
        </header>
        <NativeBannerAd />
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              The Universal Language Barrier: Code
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Programming languages are powerful, but they can also be cryptic.
              Poorly documented code, unfamiliar libraries, or complex
              algorithms can slow down development and learning. An AI Code
              Explainer acts as your personal research assistant, saving you
              countless hours.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Your Personal Code Interpreter
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Our{" "}
              <Link
                href="/code-explainer"
                className="text-primary underline-offset-4 hover:underline"
              >
                AI Code Explainer
              </Link>{" "}
              is a powerful tool designed to dissect and explain any piece of
              code you throw at it. Just paste your code, and the AI will
              provide a line-by-line breakdown of what it does, why it does it,
              and how it all fits together.
            </p>
            <div className="my-6 flex justify-center">
              <Button asChild size="lg">
                <Link href="/code-explainer">Explain Your Code for Free</Link>
              </Button>
            </div>
          </section>
          <NativeBannerAd />
          <section>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              How It Accelerates Learning and Development
            </h2>
            <Card className="my-6">
              <CardHeader>
                <CardTitle>Key Benefits for Coders</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-outside space-y-3 pl-5 text-lg text-muted-foreground">
                  <li>
                    <strong className="text-foreground">Learn Faster:</strong>{" "}
                    Students can grasp new programming concepts more quickly by
                    seeing instant, clear explanations.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Debug with Ease:
                    </strong>{" "}
                    Understand what a piece of code is <em>supposed</em> to do,
                    making it easier to spot where things are going wrong.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Explore New Languages:
                    </strong>{" "}
                    Confidently dive into new frameworks or languages without
                    getting bogged down by unfamiliar syntax.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Improve Code Reviews:
                    </strong>{" "}
                    Quickly get up to speed on a colleague&apos;s code, leading
                    to more efficient and effective code reviews.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Conclusion: Code with Confidence
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              An AI code explainer is an indispensable tool in any modern
              developer&apos;s toolkit. It bridges the gap between seeing code
              and truly understanding it. By making programming more accessible,
              it empowers both new and experienced developers to build better
              software, faster.
            </p>
            <NativeBannerAd />
            <div className="my-6 flex justify-center">
              <Button asChild size="lg" variant="outline">
                <Link href="/">Explore All Our AI Tools</Link>
              </Button>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
} 