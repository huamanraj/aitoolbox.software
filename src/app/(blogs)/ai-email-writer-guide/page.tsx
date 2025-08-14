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
            Craft the Perfect Email in Seconds with an AI Email Writer
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Tired of staring at a blank draft? An AI Email Writer can help you
            compose clear, professional, and effective emails for any occasion,
            saving you time and stress.
          </p>
        </header>
        <NativeBannerAd />
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Inbox Zero is a Dream, But Effective Emails are a Reality
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Email remains the cornerstone of professional communication, but
              it&apos;s a double-edged sword. A well-crafted email can open
              doors, while a poorly written one can close them. The pressure to
              get the tone, content, and structure just right is immense. This
              is where an AI assistant becomes invaluable.
            </p>
          </section>
          <NativeBannerAd />
          <section>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Your Personal Communications Assistant
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Our{" "}
              <Link
                href="/email-writer"
                className="text-primary underline-offset-4 hover:underline"
              >
                AI Email Writer
              </Link>{" "}
              is like having a professional editor on call 24/7. Just specify
              the purpose of your email—be it a sales inquiry, a follow-up, or a
              formal request—and the AI will generate a polished draft ready for
              you to personalize and send.
            </p>
            <NativeBannerAd />
            <div className="my-6 flex justify-center">
              <Button asChild size="lg">
                <Link href="/email-writer">Write Your Next Email with AI</Link>
              </Button>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              When to Use an AI Email Writer
            </h2>
            <Card className="my-6">
              <CardHeader>
                <CardTitle>From Quick Replies to Major Pitches</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-outside space-y-3 pl-5 text-lg text-muted-foreground">
                  <li>
                    <strong className="text-foreground">
                      Sales & Outreach:
                    </strong>{" "}
                    Craft compelling cold emails and follow-ups that get
                    responses.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Job Applications:
                    </strong>{" "}
                    Write professional cover letters and networking emails. Pair
                    it with our{" "}
                    <Link
                      href="/resume-builder"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      Resume Builder
                    </Link>{" "}
                    for a full application toolkit.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Internal Communications:
                    </strong>{" "}
                    Clearly and concisely communicate with your team, from
                    project updates to official announcements.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Customer Service:
                    </strong>{" "}
                    Provide polite, consistent, and helpful responses to
                    customer inquiries.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Conclusion: Communicate with Confidence and Speed
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              An AI email writer empowers you to handle your inbox more
              efficiently and effectively. By automating the drafting process,
              it allows you to focus on the message and the relationship, not
              just the words. Take control of your communications and write
              emails that get results.
            </p>
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