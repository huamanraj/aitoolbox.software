import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function CoverLetterGuidePage() {
  return (
    <div className="bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Master Cover Letter Writing with AI
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your cover letter is your chance to make a powerful first impression. Learn
            how to use AI to craft compelling, personalized cover letters that get you
            noticed by hiring managers and land more interviews.
          </p>
        </header>

        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Why Cover Letters Still Matter in 2025
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Despite what some career advisors say, cover letters remain crucial in
              today&apos;s job market. Research shows that 83% of hiring managers still
              read cover letters, and a well-written one can convince them to interview
              you even if your resume isn&apos;t perfect. It&apos;s your opportunity to show
              personality, demonstrate writing skills, and explain why you&apos;re the
              perfect fit for the role.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              The AI Advantage: Write Better, Faster
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Our{' '}
              <Link
                href="/cover-letter-generator"
                className="text-primary underline-offset-4 hover:underline"
              >
                AI Cover Letter Generator
              </Link>{' '}
              eliminates writer&apos;s block and helps you create compelling letters in
              minutes. It analyzes successful cover letter patterns, suggests
              industry-specific language, and ensures your letter hits all the key
              points recruiters want to see.
            </p>
            <div className="my-6 flex justify-center">
              <Button asChild size="lg">
                <Link href="/cover-letter-generator">Generate Your Cover Letter Now</Link>
              </Button>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              The Complete Job Application Strategy
            </h2>
            <Card className="my-6">
              <CardHeader>
                <CardTitle>From Application to Interview: Your AI-Powered Workflow</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-outside space-y-3 pl-5 text-lg text-muted-foreground">
                  <li>
                    <strong className="text-foreground">
                      Research the Company:
                    </strong>{' '}
                    Use our{' '}
                    <Link
                      href="/email-writer"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      AI Email Writer
                    </Link>{' '}
                    to craft personalized outreach emails to company employees.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Build Your Foundation:
                    </strong>{' '}
                    Create a strong resume that complements your cover letter story.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Craft Your Cover Letter:
                    </strong>{' '}
                    Use the{' '}
                    <Link
                      href="/cover-letter-generator"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      Cover Letter Generator
                    </Link>{' '}
                    to create a compelling, tailored letter for each application.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Polish Everything:
                    </strong>{' '}
                    Ensure your writing is flawless and professional before submitting.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Follow Up:
                    </strong>{' '}
                    Use our{' '}
                    <Link
                      href="/email-writer"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      Email Writer
                    </Link>{' '}
                    to send thoughtful follow-up messages.
                  </li>
                </ol>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Common Cover Letter Mistakes to Avoid
            </h2>
            <Card className="my-6">
              <CardContent className="pt-6">
                <ul className="space-y-4 text-lg text-muted-foreground">
                  <li>
                    <strong className="text-foreground">Generic Templates:</strong>{' '}
                    Don&apos;t use the same letter for every application. Customize for
                    each role and company.
                  </li>
                  <li>
                    <strong className="text-foreground">Repeating Your Resume:</strong>{' '}
                    Your cover letter should complement, not duplicate, your resume.
                    Tell a story instead.
                  </li>
                  <li>
                    <strong className="text-foreground">Focusing on Yourself:</strong>{' '}
                    Instead of explaining what you want, focus on what value you can
                    bring to the employer.
                  </li>
                  <li>
                    <strong className="text-foreground">Being Too Long:</strong>{' '}
                    Keep it to one page. Hiring managers have limited time to review
                    applications.
                  </li>
                  <li>
                    <strong className="text-foreground">Neglecting Research:</strong>{' '}
                    Show that you&apos;ve researched the company and understand their
                    needs and culture.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Industry-Specific Cover Letter Tips
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Tech & Engineering</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Highlight specific technologies, methodologies, and quantifiable
                    achievements. Show your problem-solving approach and passion for
                    innovation.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Creative Industries</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Showcase your creativity while maintaining professionalism.
                    Include portfolio links and describe your creative process and
                    inspiration.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Finance & Banking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Emphasize analytical skills, attention to detail, and regulatory
                    knowledge. Use conservative language and focus on risk management
                    and results.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Healthcare</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Highlight patient care experience, certifications, and commitment
                    to improving outcomes. Show empathy and dedication to the field.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Conclusion: Your Path to Career Success
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              A compelling cover letter is your secret weapon in the job search. By
              combining AI efficiency with your unique experiences and genuine
              enthusiasm, you can create letters that open doors to new opportunities.
              Don&apos;t let your dream job slip away because of a mediocre application.
            </p>
            <div className="my-6 flex justify-center space-x-4">
              <Button asChild size="lg">
                <Link href="/cover-letter-generator">Start Writing Your Cover Letter</Link>
              </Button>
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