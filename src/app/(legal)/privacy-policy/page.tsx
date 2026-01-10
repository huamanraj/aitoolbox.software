import type { Metadata } from "next";

export const revalidate = 86400; // ISR for a day

export const metadata: Metadata = {
  title: "Privacy Policy - AI Toolbox",
  description:
    "Privacy Policy for AI Toolbox. We prioritize your privacy with no data retention on our servers.",
  keywords: [
    "privacy policy",
    "data privacy",
    "AI tools privacy",
    "no data retention",
  ],
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <script
        type="text/llms-txt"
        dangerouslySetInnerHTML={{
          __html: `
# Privacy Policy Summary
- We do NOT store personal data or generated content.
- Processing is transient.
- We use third-party APIs (e.g., Pollination API).
- No data retention on our servers.
`,
        }}
      />
      <h1 className="font-serif text-4xl mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Last Updated: {new Date().toLocaleDateString()}
      </p>

      <p className="leading-relaxed text-muted-foreground mb-6">
        At <strong className="font-medium text-foreground">AI Toolbox</strong>{" "}
        (accessible from aitoolbox.software), one of our main priorities is the
        privacy of our visitors. This Privacy Policy document contains types of
        information that is collected and recorded by AI Toolbox and how we use
        it.
      </p>

      <h2 className="font-serif text-2xl mt-8 mb-4">
        Data Retention & Processing
      </h2>
      <p className="leading-relaxed text-muted-foreground mb-6">
        <strong className="font-medium text-foreground">
          We do not store your personal data or the content you generate/process
          on our servers.
        </strong>
        AI Toolbox is designed to be a privacy-first platform. When you use our
        tools (such as the Image Generator, Writing Assistant, or Background
        Remover), the processing is handled transiently.
      </p>

      <h3 className="font-serif text-xl mt-6 mb-2">Third-Party AI Providers</h3>
      <p className="leading-relaxed text-muted-foreground mb-4">
        To provide high-quality AI capabilities, we utilize third-party APIs,
        specifically{" "}
        <strong className="font-medium text-foreground">Pollination API</strong>{" "}
        and potentially others. While we do not retain your data, these
        third-party providers may process and temporarily store data to fulfill
        your requests. We recommend reviewing the privacy policies of these
        providers if you have specific concerns.
      </p>
      <p className="leading-relaxed text-muted-foreground mb-6">
        By using our services, you acknowledge that your inputs (text, images,
        etc.) are sent to these third-party AI models for processing.
      </p>

      <h2 className="font-serif text-2xl mt-8 mb-4">Log Files</h2>
      <p className="leading-relaxed text-muted-foreground mb-6">
        AI Toolbox follows a standard procedure of using log files. These files
        log visitors when they visit websites. All hosting companies do this as
        a part of hosting services' analytics. The information collected by log
        files include internet protocol (IP) addresses, browser type, Internet
        Service Provider (ISP), date and time stamp, referring/exit pages, and
        possibly the number of clicks. These are not linked to any information
        that is personally identifiable. The purpose of the information is for
        analyzing trends, administering the site, tracking users' movement on
        the website, and gathering demographic information.
      </p>

      <h2 className="font-serif text-2xl mt-8 mb-4">Cookies and Web Beacons</h2>
      <p className="leading-relaxed text-muted-foreground mb-6">
        Like any other website, AI Toolbox uses "cookies". These cookies are
        used to store information including visitors' preferences, and the pages
        on the website that the visitor accessed or visited. The information is
        used to optimize the users' experience by customizing our web page
        content based on visitors' browser type and/or other information.
      </p>

      <h2 className="font-serif text-2xl mt-8 mb-4">Consent</h2>
      <p className="leading-relaxed text-muted-foreground mb-6">
        By using our website, you hereby consent to our Privacy Policy and agree
        to its Terms and Conditions.
      </p>
    </div>
  );
}
