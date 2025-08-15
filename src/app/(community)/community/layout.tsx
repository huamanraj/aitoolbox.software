import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Community - AIToolbox",
  description:
    "See community posts and updates from Twitter (X) and LinkedIn about AIToolbox.",
  openGraph: {
    title: "Community - AIToolbox",
    description:
      "Curated community posts from Twitter (X) and LinkedIn.",
    url: "https://aitoolbox.software/community",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Community - AIToolbox",
    description: "Curated community posts from Twitter (X) and LinkedIn.",
  },
  robots: "index, follow",
};

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {/* Load platform scripts to hydrate embeds on the client */}
      <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
      <Script src="https://www.linkedin.com/embed.js" strategy="lazyOnload" />
    </>
  );
}
