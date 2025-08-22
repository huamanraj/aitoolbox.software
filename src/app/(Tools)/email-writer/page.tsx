import EmailWriterClient from "./_components/email-writer-client";
import { Metadata } from "next";
import DirectLinkAdButton from "@/components/ads/DirectLinkAdButton";
export const metadata: Metadata = {
  title: "AI Email Writer - Write Professional Emails Instantly",
  description:
    "Generate professional, well-crafted emails for any purpose with our AI-powered email writer. Save time and communicate effectively.",
};

const emailTypes = [
  {
    title: "Business Communications",
    description:
      "Create professional emails for business partners, clients, and colleagues.",
  },
  {
    title: "Job Applications",
    description:
      "Craft compelling cover letters and follow-up emails for job opportunities.",
  },
  {
    title: "Customer Service",
    description:
      "Generate effective responses to customer inquiries, complaints, and feedback.",
  },
  {
    title: "Networking",
    description:
      "Write personalized networking emails that make strong connections.",
  },
  {
    title: "Personal Correspondence",
    description:
      "Create friendly, engaging emails for personal communication.",
  },
  {
    title: "Event Management",
    description:
      "Send clear invitations, confirmations, and follow-ups for events.",
  },
];

export default function EmailWriterPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
            AI Email Writer
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-center">
            Create professional, personalized emails in seconds. Just provide
            the key points,
            <br className="hidden sm:inline" /> and our AI will craft the
            perfect message for any situation.
          </p>
        </header>
        <main>
          <EmailWriterClient />
        </main>

        <div className="grid gap-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {emailTypes.map((type, index) => (
              <div key={index} className="border p-4 bg-white">
                <h3 className="font-medium mb-1">{type.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <DirectLinkAdButton />
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <ol className="list-decimal ml-5 space-y-2">
            <li>Enter your key message points and select your desired tone</li>
            <li>Choose the email purpose and provide any recipient details</li>
            <li>
              Click generate and get a professionally crafted email in seconds
            </li>
            <li>
              Edit the result or copy directly to use in your communications
            </li>
          </ol>
        </div>

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Email Writing Tips</h2>
          <ul className="space-y-4">
            <li>
              <strong>Be clear and concise:</strong> Keep your emails focused
              and to the point.
            </li>
            <li>
              <strong>Use an appropriate greeting:</strong> Match your
              salutation to your relationship with the recipient.
            </li>
            <li>
              <strong>Proofread before sending:</strong> Always check for errors
              and clarity.
            </li>
            <li>
              <strong>Include a clear call to action:</strong> Let recipients
              know what steps to take next.
            </li>
            <li>
              <strong>Sign off appropriately:</strong> Use a closing that
              matches the tone of your email.
            </li>
          </ul>
        </div>

        <div className="mt-12 border-t pt-8 prose max-w-none">
          <h2 className="text-2xl font-bold mb-4">
            The Art of Email Writing: A Comprehensive Guide
          </h2>

          <p>
            In today&apos;s fast-paced digital world, email remains one of the
            most important communication tools in both professional and personal
            contexts. Yet many of us underestimate the impact that well-crafted
            emails can have on our relationships, reputation, and results.
            I&apos;ve spent years analyzing what makes emails effective, and
            I&apos;m sharing these insights to help you transform your email
            communication.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            The Psychology Behind Effective Emails
          </h3>

          <p>
            Before diving into specific techniques, it&apos;s worth
            understanding why some emails get results while others are ignored.
            Research shows that recipients make judgments about your
            credibility, intelligence, and attention to detail based on your
            email communication. In fact, a study from the University of Chicago
            found that emails with grammatical errors were perceived as coming
            from less intelligent senders, regardless of the actual content.
          </p>

          <p>
            When crafting your emails, remember that your recipient&apos;s inbox
            is likely overflowing with messages competing for attention. The
            average professional receives 121 emails daily. Your message needs
            to stand out, but for the right reasons.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Subject Lines That Actually Get Opened
          </h3>

          <p>
            Your subject line serves as the gateway to your email. Here are
            techniques I&apos;ve found particularly effective:
          </p>

          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              <strong>Be specific and relevant:</strong> "Question about
              Thursday&apos;s marketing presentation" works better than "Quick
              question"
            </li>
            <li>
              <strong>Create urgency when appropriate:</strong> "Response needed
              by EOD: Q3 budget approval" (but never fabricate false urgency)
            </li>
            <li>
              <strong>Keep it concise:</strong> Aim for 6-10 words maximum, as
              many mobile devices show only the first 30 characters
            </li>
            <li>
              <strong>Personalize when possible:</strong> Including the
              recipient&apos;s name or company can increase open rates by up to
              22%
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Structuring Your Email for Maximum Impact
          </h3>

          <p>
            The structure of your email significantly impacts how it's received
            and processed. I've found this framework consistently delivers
            results:
          </p>

          <ol className="list-decimal pl-6 space-y-2 my-4">
            <li>
              <strong>Personalized greeting:</strong> "Hi [Name]," is
              appropriate for most business contexts. For formal situations,
              "Dear Mr./Ms. [Last Name]:" might be better.
            </li>
            <li>
              <strong>Context setting:</strong> Briefly remind the recipient who
              you are or reference your last interaction if needed.
            </li>
            <li>
              <strong>Purpose statement:</strong> State clearly why you're
              writing in the first paragraph.
            </li>
            <li>
              <strong>Details and supporting information:</strong> Provide
              necessary details, organized in short paragraphs or bullet points.
            </li>
            <li>
              <strong>Clear call to action:</strong> Explicitly state what you
              want the recipient to do.
            </li>
            <li>
              <strong>Professional closing:</strong> "Best regards," "Thanks,"
              or "Sincerely," followed by your name and relevant contact
              information.
            </li>
          </ol>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Tone and Language: Finding the Right Balance
          </h3>

          <p>
            The tone of your email should reflect your relationship with the
            recipient and the purpose of your message. I've observed that even
            in professional settings, overly formal language can create
            unnecessary distance. Conversely, being too casual in formal
            situations can undermine your credibility.
          </p>

          <p>
            A good rule of thumb: Write as if you were speaking to the person in
            a professional setting, but with the clarity and precision that
            written communication requires. When in doubt, err slightly on the
            side of formality, especially in initial communications.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            The Overlooked Power of White Space
          </h3>

          <p>
            Nothing makes recipients recoil more than a wall of text. In my
            experience analyzing email engagement, well-formatted emails with
            adequate white space receive significantly better response rates.
            Consider these formatting best practices:
          </p>

          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Keep paragraphs to 2-3 sentences maximum</li>
            <li>Use bullet points or numbered lists for multiple items</li>
            <li>Include subheadings for longer emails</li>
            <li>
              Bold key information sparingly to highlight truly important points
            </li>
            <li>Leave space between paragraphs to improve readability</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Timing Your Emails for Maximum Effect
          </h3>

          <p>
            When you send your email can be almost as important as what you say.
            Based on aggregate data from millions of emails:
          </p>

          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>
              Tuesday, Wednesday, and Thursday generally see the highest open
              and response rates
            </li>
            <li>
              Mid-morning (around 10 AM) and mid-afternoon (2-3 PM) tend to be
              optimal sending times
            </li>
            <li>
              Avoid sending important emails first thing Monday morning or
              Friday afternoon
            </li>
            <li>
              Consider the recipient's time zone when sending internationally
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Following Up: The Art of Persistence Without Pestering
          </h3>

          <p>
            Not receiving a response to an important email can be frustrating.
            In my experience, most professionals appreciate a thoughtful
            follow-up, as emails can easily get buried. Here's my approach to
            following up effectively:
          </p>

          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Wait at least 2-3 business days before your first follow-up</li>
            <li>
              Reply to your original email rather than starting a new thread
            </li>
            <li>
              Keep your follow-up brief and polite, acknowledging that the
              recipient is likely busy
            </li>
            <li>
              Add new, relevant information if possible to provide additional
              value
            </li>
            <li>Limit yourself to 2-3 follow-ups in most situations</li>
          </ul>

          <p className="mt-6">
            Mastering email communication is an ongoing process, but
            implementing these principles will immediately enhance your
            effectiveness. Remember that behind every inbox is a person, and
            approaching email with empathy for your recipient's time and
            attention will serve you well.
          </p>

          <p>
            As with any communication skill, regular practice and adaptation
            based on feedback will help you develop your own effective email
            style over time. The best email writers are always learning and
            refining their approach.
          </p>
        </div>
      </div>
    </div>
  );
}