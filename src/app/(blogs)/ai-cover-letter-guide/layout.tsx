import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Master Cover Letter Writing with AI - Complete Guide',
  description:
    'Create compelling, professional cover letters that get noticed. Our comprehensive guide shows you how to use AI to craft job-winning cover letters.',
  keywords: [
    'cover letter guide',
    'AI cover letter',
    'job application tips',
    'professional writing',
    'career advice',
    'cover letter examples',
  ],
  openGraph: {
    title: 'Master Cover Letter Writing with AI - Complete Guide',
    description:
      'Stop struggling with cover letter writing. Learn how to use AI to create compelling letters that get you noticed by hiring managers.',
    url: 'https://aitoolbox.software/cover-letter-guide',
    siteName: 'AI Toolbox',
    images: [
      {
        url: 'https://aitoolbox.software/og-image-cover-letter-guide.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Master Cover Letter Writing with AI - Complete Guide',
    description:
      'A comprehensive guide to writing cover letters that get results using AI assistance.',
    images: ['https://aitoolbox.software/og-image-cover-letter-guide.png'],
  },
};

export default function CoverLetterGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}