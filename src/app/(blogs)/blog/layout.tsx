import { Metadata } from 'next';

// Enhanced metadata for blog section - moved from page component
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aitoolbox.software';
  const canonicalUrl = `${baseUrl}/blog`;
  
  return {
    title: 'AI Toolbox Blog | Latest AI Tools, Tutorials & Insights',
    description: 'Discover comprehensive guides, tutorials, and insights about the latest AI tools. Learn how to leverage artificial intelligence for productivity, creativity, and innovation.',
    keywords: [
      'AI blog', 'artificial intelligence tutorials', 'AI tools guide', 'machine learning',
      'AI productivity', 'AI tutorials', 'technology blog', 'AI insights', 'AI news',
      'AI tools review', 'artificial intelligence guide', 'AI for beginners', 'AI content creation',
      'AI image generation', 'AI writing tools', 'AI coding assistants', 'AI automation'
    ],
    authors: [{ name: 'AI Toolbox Team', url: baseUrl }],
    creator: 'AI Toolbox Team',
    publisher: 'AI Toolbox',
    category: 'Technology',
    classification: 'AI Tools & Technology',
    openGraph: {
      title: 'AI Toolbox Blog | Latest AI Tools, Tutorials & Insights',
      description: 'Discover comprehensive guides, tutorials, and insights about the latest AI tools. Learn how to leverage artificial intelligence for productivity and innovation.',
      url: canonicalUrl,
      siteName: 'AI Toolbox',
      images: [
        {
          url: `${baseUrl}/api/og-blog`,
          width: 1200,
          height: 630,
          alt: 'AI Toolbox Blog - Latest AI Tools and Tutorials',
          type: 'image/png',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'AI Toolbox Blog | Latest AI Tools & Tutorials',
      description: 'Discover comprehensive guides and insights about the latest AI tools. Learn how to leverage AI for productivity and innovation.',
      images: [`${baseUrl}/api/og-blog`],
      creator: '@aitoolboxsw',
      site: '@aitoolboxsw',
    },
    alternates: {
      canonical: canonicalUrl,
      types: {
        'application/rss+xml': `${baseUrl}/blog/rss.xml`,
        'application/atom+xml': `${baseUrl}/blog/atom.xml`,
      },
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
    // Additional SEO metadata for Google Ads compliance
    other: {
      'og:image:alt': 'AI Toolbox Blog - Latest AI Tools and Tutorials',
      'article:section': 'AI Tools & Tutorials',
      'og:site_name': 'AI Toolbox',
      'og:locale': 'en_US',
    },
  };
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aitoolbox.software';
  
  // Enhanced structured data for blog section
  const blogStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'AI Toolbox Blog',
    description: 'Comprehensive guides, tutorials, and insights about the latest AI tools and technologies.',
    url: `${baseUrl}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'AI Toolbox',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
        width: 200,
        height: 200
      },
      sameAs: [
        'https://twitter.com/aitoolboxsw',
        'https://github.com/aitoolbox-software'
      ]
    },
    inLanguage: 'en-US',
    about: {
      '@type': 'Thing',
      name: 'Artificial Intelligence',
      description: 'AI tools, tutorials, and technologies for productivity and innovation'
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Developers, Content Creators, AI Enthusiasts'
    },
    keywords: 'AI tools, artificial intelligence, tutorials, guides, productivity, automation, machine learning',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog`
    }
  };

  // Website structured data for better site understanding
  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AI Toolbox',
    url: baseUrl,
    description: 'Your comprehensive resource for AI tools, tutorials, and insights',
    publisher: {
      '@type': 'Organization',
      name: 'AI Toolbox'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <>
      {/* Enhanced Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS prefetch for better performance */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      
      {/* Additional meta tags for better SEO */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      
      {children}
    </>
  );
}
