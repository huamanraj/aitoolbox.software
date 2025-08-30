import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Lock,
  RocketIcon,
  Brain,
  Sparkles,
  UserCheck,
  Shield,
  Download,
  Eye,
  Zap,
  Code,
  MessageSquare,
  CheckCircle,
  FileCheck,
  FileSearch,
  Award,
  Cpu,
} from "lucide-react";

export default function AboutResumeBuilder() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          AI-Powered Resume Builder
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Create professional, ATS-optimized resumes in minutes with our
          privacy-first AI assistant. No signups, no data storage, just powerful
          resume building.
        </p>
      </section>

      {/* Key Benefits Grid */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">
          Why Choose Our Resume Builder?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Cpu className="w-10 h-10 text-primary mb-4" />,
              title: "AI-Powered Content",
              description:
                "Generate optimized summaries, work experiences, and project descriptions with our advanced AI",
            },
            {
              icon: <Shield className="w-10 h-10 text-primary mb-4" />,
              title: "Complete Privacy",
              description:
                "Your data never leaves your device. We don't store, share, or analyze your personal information",
            },
            {
              icon: <FileCheck className="w-10 h-10 text-primary mb-4" />,
              title: "ATS Optimized",
              description:
                "Resumes designed to pass Applicant Tracking Systems used by 99% of Fortune 500 companies",
            },
          ].map((item, index) => (
            <Card key={index} className="text-center p-6">
              {item.icon}
              <CardTitle className="text-xl mb-3">{item.title}</CardTitle>
              <p className="text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <RocketIcon className="h-8 w-8" />
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              title: "Enter Basic Info",
              description: "Fill in your personal and professional details",
              icon: <UserCheck className="w-6 h-6" />,
            },
            {
              step: "2",
              title: "AI Enhancement",
              description: "Use our AI tools to optimize your content",
              icon: <Sparkles className="w-6 h-6" />,
            },
            {
              step: "3",
              title: "Real-Time Preview",
              description: "See your resume update as you make changes",
              icon: <Eye className="w-6 h-6" />,
            },
            {
              step: "4",
              title: "Download & Apply",
              description: "Export to PDF and start applying",
              icon: <Download className="w-6 h-6" />,
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground text-lg font-bold mx-auto mb-4">
                {item.step}
              </div>
              <div className="flex justify-center mb-2">{item.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Features Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Brain className="h-8 w-8" />
          AI-Powered Features
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-primary" />
                <CardTitle>Smart Summary Generation</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Our AI analyzes your experience and creates compelling
                professional summaries that highlight your unique value
                proposition.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Example Input:</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  "5 years as a software developer at tech companies, experience
                  with React and Node.js, led a team of 3 developers"
                </p>

                <h4 className="font-medium mb-2">AI-Generated Output:</h4>
                <p className="text-sm">
                  "Experienced software developer with 5 years of expertise in
                  building scalable web applications using React and Node.js.
                  Proven leadership abilities having managed a team of 3
                  developers to deliver projects 20% ahead of schedule. Strong
                  problem-solving skills and passion for clean, efficient code."
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-primary" />
                <CardTitle>Work Experience Optimization</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Transform basic job descriptions into achievement-oriented
                bullet points with quantifiable results.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Example Input:</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  "I was a project manager at XYZ Corp. I managed projects and
                  coordinated teams"
                </p>

                <h4 className="font-medium mb-2">AI-Generated Output:</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li>
                    Managed 15+ cross-functional projects with budgets totaling
                    $2M, delivering 95% on time and within budget
                  </li>
                  <li>
                    Coordinated teams of up to 12 members, improving team
                    productivity by 25% through implementation of Agile
                    methodologies
                  </li>
                  <li>
                    Reduced project delivery timelines by 20% by optimizing
                    resource allocation and workflow processes
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Code className="w-6 h-6 text-primary" />
                <CardTitle>Project Description Enhancement</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Create impactful project descriptions that showcase your
                technical skills and business impact.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Example Input:</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  "Built an e-commerce website with payment processing"
                </p>

                <h4 className="font-medium mb-2">AI-Generated Output:</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li>
                    Developed a full-stack e-commerce platform using React,
                    Node.js, and MongoDB, integrating Stripe for secure payment
                    processing
                  </li>
                  <li>
                    Implemented responsive design principles, resulting in a 35%
                    increase in mobile conversions
                  </li>
                  <li>
                    Reduced cart abandonment by 22% by optimizing checkout flow
                    and adding guest purchase option
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-primary" />
                <CardTitle>Skills & Keyword Optimization</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Our AI identifies the most relevant keywords for your industry
                and optimizes your resume to pass ATS screening.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Before AI:</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  "Experienced with programming, databases, and project
                  management"
                </p>

                <h4 className="font-medium mb-2">After AI Optimization:</h4>
                <div className="text-sm grid grid-cols-2 gap-2">
                  <span className="bg-primary/10 px-2 py-1 rounded">
                    JavaScript
                  </span>
                  <span className="bg-primary/10 px-2 py-1 rounded">
                    React.js
                  </span>
                  <span className="bg-primary/10 px-2 py-1 rounded">
                    Node.js
                  </span>
                  <span className="bg-primary/10 px-2 py-1 rounded">
                    MongoDB
                  </span>
                  <span className="bg-primary/10 px-2 py-1 rounded">
                    Agile Methodology
                  </span>
                  <span className="bg-primary/10 px-2 py-1 rounded">
                    CI/CD Pipelines
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Privacy & Security */}
      <section>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Shield className="h-8 w-8" />
          Privacy & Security
        </h2>

        <Card>
          <CardHeader>
            <CardTitle>Your Data Stays Yours. Always.</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  How We Protect Your Privacy
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>No account registration required</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>All data processed locally when possible</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>AI processing uses anonymized data only</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>No tracking, cookies, or analytics</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <FileSearch className="w-5 h-5 text-primary" />
                  Comparison With Other Resume Builders
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span>Data Storage</span>
                    <div className="flex gap-4">
                      <span className="font-medium text-destructive">
                        Others
                      </span>
                      <span className="font-medium text-primary">
                        Our Builder
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Stores your resume data</span>
                    <div className="flex gap-4">
                      <span className="text-destructive">Yes</span>
                      <span className="text-primary">No</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sells data to third parties</span>
                    <div className="flex gap-4">
                      <span className="text-destructive">Often</span>
                      <span className="text-primary">Never</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Requires account creation</span>
                    <div className="flex gap-4">
                      <span className="text-destructive">Yes</span>
                      <span className="text-primary">No</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <MessageSquare className="h-8 w-8" />
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {[
            {
              question: "How does the AI resume builder work?",
              answer:
                "Our builder uses advanced natural language processing to analyze your input and generate professional, optimized resume content. You provide basic information about your experience, and our AI suggests improvements, identifies relevant keywords, and structures your content for maximum impact.",
            },
            {
              question: "Is my data really private?",
              answer:
                "Yes. We designed our resume builder with privacy as the core principle. Your data is processed locally when possible, and any AI processing uses anonymized data. We don't store your resume information, require accounts, or use tracking technologies.",
            },
            {
              question: "Will my resume pass ATS screening?",
              answer:
                "Absolutely. Our templates and content recommendations are specifically designed to be ATS-friendly. We focus on proper formatting, relevant keywords, and clear structure that applicant tracking systems can easily parse and understand.",
            },
            {
              question: "Can I customize the AI-generated content?",
              answer:
                "Yes, all AI suggestions are editable. The AI provides a strong foundation, but you have full control to modify, accept, or reject any suggestions to ensure your resume accurately represents your experience and voice.",
            },
            {
              question: "What formats can I download my resume in?",
              answer:
                "You can download your resume as a PDF, which is the standard format for job applications. We also offer plain text export for easy copying and pasting into online application forms.",
            },
          ].map((faq, index) => (
            <Card key={index} className="p-6">
              <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
