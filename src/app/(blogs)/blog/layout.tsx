import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | AI Toolbox - Latest AI Tools Guides & Tutorials',
  description: 'Explore our comprehensive blog for the latest articles, guides, and tutorials on AI tools and technology. Learn how to use AI for content creation, image generation, coding, and more.',
  keywords: [
    'AI tools',
    'artificial intelligence',
    'AI tutorials',
    'AI guides',
    'content creation',
    'image generation',
    'AI writing',
    'machine learning',
    'AI technology',
    'productivity tools',
  ],
  authors: [{ name: 'AI Toolbox Team', url: 'https://aitoolbox.software' }],
  creator: 'AI Toolbox',
  publisher: 'AI Toolbox',
  openGraph: {
    title: 'Blog | AI Toolbox - Latest AI Tools Guides & Tutorials',
    description: 'Discover comprehensive guides and tutorials on AI tools. Learn how to leverage artificial intelligence for content creation, productivity, and innovation.',
    url: 'https://aitoolbox.software/blog',
    siteName: 'AI Toolbox',
    images: [
      {
        url: 'https://aitoolbox.software/blog/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'AI Toolbox Blog - Your Guide to AI Tools',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | AI Toolbox - Latest AI Tools Guides & Tutorials',
    description: 'Discover comprehensive guides and tutorials on AI tools. Learn how to leverage artificial intelligence for productivity and innovation.',
    images: ['https://aitoolbox.software/blog/twitter-image'],
    creator: '@aitoolboxsw',
    site: '@aitoolboxsw',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://aitoolbox.software/blog',
  },
  category: 'Technology',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'AI Toolbox Blog',
            description: 'Comprehensive guides and tutorials on AI tools and technology',
            url: 'https://aitoolbox.software/blog',
            publisher: {
              '@type': 'Organization',
              name: 'AI Toolbox',
              url: 'https://aitoolbox.software',
              logo: {
                '@type': 'ImageObject',
                url: 'https://aitoolbox.software/logo.png',
              },
            },
            inLanguage: 'en-US',
            about: {
              '@type': 'Thing',
              name: 'Artificial Intelligence Tools',
            },
          }),
        }}
      />
      {children}
    </>
  );
}
