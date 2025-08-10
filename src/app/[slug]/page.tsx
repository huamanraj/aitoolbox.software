import { getBlogBySlug, getPublicFileViewUrl } from "@/lib/appwrite";
import { Metadata, ResolvingMetadata } from "next";
import DOMPurify from "isomorphic-dompurify";
import { notFound } from "next/navigation";
import { Calendar, Clock, User } from "lucide-react";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata(
  { params }: PageProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  try {
    const doc: any = await getBlogBySlug(slug);
    if (!doc) return {};
    
    const title = doc.title as string;
    const description = (doc.excerpt as string) || (doc.content as string)?.replace(/<[^>]*>/g, '').slice(0, 160);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aitoolbox.software';
    const canonicalUrl = `${baseUrl}/${slug}`;
    
    return {
      title: `${title} | AI Toolbox`,
      description,
      authors: [{ name: 'AI Toolbox Team' }],
      keywords: doc.tags || ['AI', 'artificial intelligence', 'tools', 'technology'],
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: 'AI Toolbox',
        images: [
          {
            url: doc.coverFileId ? getPublicFileViewUrl(doc.coverFileId) : `${baseUrl}/og-default.png`,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        locale: 'en_US',
        type: 'article',
        publishedTime: doc.$createdAt,
        modifiedTime: doc.$updatedAt,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [doc.coverFileId ? getPublicFileViewUrl(doc.coverFileId) : `${baseUrl}/og-default.png`],
        creator: '@aitoolboxsw',
      },
      alternates: {
        canonical: canonicalUrl,
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
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {};
  }
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const doc: any = await getBlogBySlug(slug);
  if (!doc) return notFound();

  const coverUrl = doc.coverFileId ? getPublicFileViewUrl(doc.coverFileId) : null;
  const safeHtml = DOMPurify.sanitize(doc.content || "");
  
  // Format date
  const publishDate = new Date(doc.$createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Estimate reading time (average 200 words per minute)
  const wordCount = doc.content?.split(/\s+/).length || 0;
  const readingTime = Math.ceil(wordCount / 200);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": doc.title,
    "description": doc.excerpt || doc.content?.replace(/<[^>]*>/g, '').slice(0, 160),
    "image": coverUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/og-default.png`,
    "author": {
      "@type": "Organization",
      "name": "AI Toolbox Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AI Toolbox",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`
      }
    },
    "datePublished": doc.$createdAt,
    "dateModified": doc.$updatedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}`
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header Section */}
        <header className="mb-12">
          <div className="space-y-6">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-zinc-900 tracking-tight">
              {doc.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-600">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>AI Toolbox Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={doc.$createdAt}>{publishDate}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>

            {/* Excerpt */}
            {doc.excerpt && (
              <div className="text-xl leading-relaxed text-zinc-600 font-light max-w-3xl">
                {doc.excerpt}
              </div>
            )}
          </div>
        </header>

        {/* Cover Image */}
        {coverUrl && (
          <div className="mb-12">
            <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg bg-zinc-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={coverUrl} 
                alt={doc.title}
                className="object-cover w-full h-full"
                loading="eager"
                width={800}
                height={400}
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-lg prose-zinc max-w-none 
          prose-headings:font-bold prose-headings:text-zinc-900 prose-headings:tracking-tight
          prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-6
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-5
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-zinc-700 prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-zinc-900 prose-strong:font-semibold
          prose-ul:space-y-2 prose-ol:space-y-2
          prose-li:text-zinc-700 prose-li:leading-relaxed
          prose-blockquote:border-l-4 prose-blockquote:border-zinc-300 
          prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-zinc-600
          prose-code:bg-zinc-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
          prose-pre:bg-zinc-900 prose-pre:text-zinc-100">
          <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
        </article>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-zinc-200">
          <div className="text-center text-zinc-500">
            <p>Published by AI Toolbox Team on {publishDate}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}



