import { Metadata } from 'next';
import SocialBarAd from '@/components/ads/SocialBarAd';

// Base metadata for individual blog posts - specific metadata is handled in page.tsx
export const metadata: Metadata = {
  // Base configuration that applies to all blog posts
  category: 'Technology',
  classification: 'AI Tools & Tutorials',
  creator: 'AI Toolbox Team',
  publisher: 'AI Toolbox',
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
    'article:section': 'AI Tools & Tutorials',
    'og:site_name': 'AI Toolbox',
    'og:locale': 'en_US',
    'og:type': 'article',
  },
};

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aitoolbox.software';
  
  // Organization structured data for individual blog posts
  const organizationStructuredData = {
    '@context': 'https://schema.org',
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
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: 'English'
    }
  };

  return (
    <>
      {/* Organization structured data for better entity recognition */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />

      {/* Performance optimizations */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />

      {/* Additional meta tags for individual articles */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="format-detection" content="telephone=no" />

      {/* Article-specific viewport optimization */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <div>
        <SocialBarAd />
        {children}
        
      </div>
    </>
  );
}
