import { getBlogBySlug, getPublicFileViewUrl } from "@/lib/appwrite";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, Home, ChevronRight } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Dynamic SSR: no static params or ISR so content is always rendered on the server per request

type PageProps = { params: Promise<{ slug: string }> };

// Direct Appwrite call - no need for HTTP fetch during SSR

export async function generateMetadata(
  { params }: PageProps,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  try {
    const doc: any = await getBlogBySlug(slug);
    if (!doc) {
      return {
        title: 'Blog Post Not Found | AI Toolbox',
        description: 'The requested blog post could not be found. Explore our other AI tools and tutorials.',
        robots: { index: false, follow: false }
      };
    }
    
    const title = doc.title as string;
    // Prioritize excerpt, fallback to content, ensure optimal length (150-160 chars)
    let description = '';
    if (doc.excerpt) {
      description = doc.excerpt.length > 160 ? doc.excerpt.slice(0, 157) + '...' : doc.excerpt;
    } else if (doc.content) {
      const cleanContent = doc.content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
      description = cleanContent.length > 160 ? cleanContent.slice(0, 157) + '...' : cleanContent;
    } else {
      description = `Read this comprehensive guide about ${title} on AI Toolbox. Learn practical tips and insights.`;
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aitoolbox.software';
    const canonicalUrl = `${baseUrl}/${slug}`;
    
    // Enhanced keywords with long-tail variations
    const baseKeywords = ['AI', 'artificial intelligence', 'tools', 'technology', 'tutorial', 'guide'];
    const titleKeywords = title.toLowerCase().split(/\s+/).filter(word => word.length > 2);
    const contentKeywords = doc.tags || [];
    const allKeywords = [...new Set([...baseKeywords, ...titleKeywords, ...contentKeywords])];
    
    // SEO-optimized title (under 60 characters)
    const seoTitle = title.length > 50 ? `${title.slice(0, 47)}... | AI Toolbox` : `${title} | AI Toolbox`;
    
    // Dynamic OG image URL
    const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(title)}&excerpt=${encodeURIComponent(description)}&slug=${encodeURIComponent(slug)}`;
    
    return {
      title: seoTitle,
      description,
      authors: [{ name: 'AI Toolbox Team', url: baseUrl }],
      keywords: allKeywords.slice(0, 15), // Limit to 15 most relevant keywords
      category: 'Technology',
      openGraph: {
        title: title, // Full title for OG
        description,
        url: canonicalUrl,
        siteName: 'AI Toolbox',
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: `${title} - AI Toolbox Blog`,
            type: 'image/png',
          },
        ],
        locale: 'en_US',
        type: 'article',
        publishedTime: doc.$createdAt,
        modifiedTime: doc.$updatedAt,
        section: 'AI Tools & Tutorials',
        tags: allKeywords.slice(0, 10),
      },
      twitter: {
        card: 'summary_large_image',
        title: title.length > 70 ? title.slice(0, 67) + '...' : title,
        description: description.length > 200 ? description.slice(0, 197) + '...' : description,
        images: [ogImageUrl],
        creator: '@aitoolboxsw',
        site: '@aitoolboxsw',
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
      // Additional SEO metadata (base metadata is in layout.tsx)
      other: {
        'article:author': 'AI Toolbox Team',
        'article:tag': allKeywords.slice(0, 5).join(', '),
        'og:image:alt': `${title} - AI Toolbox Blog`,
        'twitter:label1': 'Reading time',
        'twitter:data1': `${Math.ceil((doc.content?.split(/\s+/).length || 0) / 200)} min read`,
        'twitter:label2': 'Category',
        'twitter:data2': 'AI Tools & Tutorials',
        'article:published_time': doc.$createdAt,
        'article:modified_time': doc.$updatedAt,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'AI Toolbox Blog | AI Tools & Tutorials',
      description: 'Discover the latest AI tools, tutorials, and insights to boost your productivity.',
    };
  }
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const doc: any = await getBlogBySlug(slug);
  if (!doc) return notFound();

  const coverUrl = doc.coverFileId ? getPublicFileViewUrl(doc.coverFileId) : null;
  const markdownContent = doc.content || "";
  
  // Format date
  const publishDate = new Date(doc.$createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Estimate reading time (average 200 words per minute)
  const wordCount = doc.content?.split(/\s+/).length || 0;
  const readingTime = Math.ceil(wordCount / 200);

  // Enhanced structured data for SEO
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aitoolbox.software';
  const description = doc.excerpt || doc.content?.replace(/<[^>]*>/g, '').slice(0, 160) || '';
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": doc.title,
    "description": description,
    "image": [
      coverUrl || `${baseUrl}/api/og?title=${encodeURIComponent(doc.title)}&excerpt=${encodeURIComponent(description)}&slug=${encodeURIComponent(slug)}`,
      `${baseUrl}/logo.png`
    ],
    "author": {
      "@type": "Organization",
      "name": "AI Toolbox Team",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`,
        "width": 200,
        "height": 200
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "AI Toolbox",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`,
        "width": 200,
        "height": 200
      }
    },
    "datePublished": doc.$createdAt,
    "dateModified": doc.$updatedAt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/${slug}`
    },
    "url": `${baseUrl}/${slug}`,
    "wordCount": wordCount,
    "timeRequired": `PT${readingTime}M`,
    "articleSection": "AI Tools & Tutorials",
    "articleBody": doc.content?.replace(/<[^>]*>/g, '').slice(0, 500),
    "keywords": doc.tags?.join(', ') || 'AI, artificial intelligence, tools, technology, tutorial',
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "genre": ["Technology", "Tutorial", "AI"],
    "about": {
      "@type": "Thing",
      "name": "Artificial Intelligence",
      "description": "AI tools and technologies for productivity and innovation"
    }
  };

  // Additional structured data for breadcrumbs
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${baseUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": doc.title,
        "item": `${baseUrl}/${slug}`
      }
    ]
  };

  // FAQ structured data if content contains Q&A patterns
  const faqMatches = doc.content?.match(/(?:Q:|Question:|FAQ:)(.*?)(?:A:|Answer:)(.*?)(?=Q:|Question:|FAQ:|$)/gis);
  const faqStructuredData = faqMatches ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqMatches.slice(0, 5).map((match: string, index: number) => {
      const parts = match.split(/A:|Answer:/i);
      return {
        "@type": "Question",
        "name": parts[0]?.replace(/Q:|Question:|FAQ:/i, '').trim(),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": parts[1]?.trim()
        }
      };
    })
  } : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Article-specific Structured Data (Organization data is in layout.tsx) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}
      
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-zinc-600">
            <li>
              <Link href="/" className="flex items-center hover:text-zinc-900 transition-colors">
                <Home className="h-4 w-4" />
                <span className="sr-only">Home</span>
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-2" />
              <Link href="/blog" className="hover:text-zinc-900 transition-colors">
                Blog
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-zinc-900 font-medium truncate max-w-xs" title={doc.title}>
                {doc.title.length > 50 ? doc.title.slice(0, 47) + '...' : doc.title}
              </span>
            </li>
          </ol>
        </nav>

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
        <article 
          className="prose prose-lg prose-zinc max-w-none 
            prose-headings:font-bold prose-headings:text-zinc-900 prose-headings:tracking-tight
            prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-6
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-5
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
            prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-3
            prose-h5:text-base prose-h5:mt-4 prose-h5:mb-2
            prose-h6:text-sm prose-h6:mt-3 prose-h6:mb-2
            prose-p:text-zinc-700 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-zinc-900 prose-strong:font-semibold
            prose-ul:space-y-2 prose-ol:space-y-2
            prose-li:text-zinc-700 prose-li:leading-relaxed
            prose-blockquote:border-l-4 prose-blockquote:border-zinc-300 
            prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-zinc-600
            prose-code:bg-zinc-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
            prose-pre:bg-zinc-900 prose-pre:text-zinc-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
            prose-table:border-collapse prose-table:border prose-table:border-zinc-300
            prose-th:border prose-th:border-zinc-300 prose-th:px-3 prose-th:py-2 prose-th:bg-zinc-100 prose-th:font-semibold prose-th:text-left
            prose-td:border prose-td:border-zinc-300 prose-td:px-3 prose-td:py-2
            prose-img:rounded-lg prose-img:shadow-sm"
          itemScope
          itemType="https://schema.org/Article"
        >
          {/* Hidden metadata for Google Ads compliance */}
          <meta itemProp="headline" content={doc.title} />
          <meta itemProp="description" content={description} />
          <meta itemProp="datePublished" content={doc.$createdAt} />
          <meta itemProp="dateModified" content={doc.$updatedAt} />
          <meta itemProp="author" content="AI Toolbox Team" />
          <meta itemProp="publisher" content="AI Toolbox" />
          <meta itemProp="wordCount" content={wordCount.toString()} />
          <meta itemProp="inLanguage" content="en-US" />
          <meta itemProp="isAccessibleForFree" content="true" />
          
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold mt-12 mb-6 text-zinc-900 tracking-tight">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold mt-10 mb-5 text-zinc-900 tracking-tight">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold mt-8 mb-4 text-zinc-900 tracking-tight">
                  {children}
                </h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-lg font-bold mt-6 mb-3 text-zinc-900 tracking-tight">
                  {children}
                </h4>
              ),
              h5: ({ children }) => (
                <h5 className="text-base font-bold mt-4 mb-2 text-zinc-900 tracking-tight">
                  {children}
                </h5>
              ),
              h6: ({ children }) => (
                <h6 className="text-sm font-bold mt-3 mb-2 text-zinc-900 tracking-tight">
                  {children}
                </h6>
              ),
              p: ({ children }) => (
                <p className="text-zinc-700 leading-relaxed mb-6">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-6 space-y-2 text-zinc-700">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-6 space-y-2 text-zinc-700">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="leading-relaxed">
                  {children}
                </li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-zinc-300 pl-6 italic my-6 text-zinc-600 bg-zinc-50 py-4 rounded-r-lg">
                  {children}
                </blockquote>
              ),
              code: ({ children, className }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code className="bg-zinc-100 px-2 py-1 rounded text-sm font-mono text-zinc-800">
                      {children}
                    </code>
                  );
                }
                return <code className={className}>{children}</code>;
              },
              pre: ({ children }) => (
                <pre className="bg-zinc-900 text-zinc-100 p-4 rounded-lg overflow-x-auto mb-6 shadow-sm">
                  {children}
                </pre>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse border border-zinc-300 rounded-lg overflow-hidden shadow-sm">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-zinc-100">
                  {children}
                </thead>
              ),
              th: ({ children }) => (
                <th className="border border-zinc-300 px-4 py-3 font-semibold text-left text-zinc-900">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border border-zinc-300 px-4 py-3 text-zinc-700">
                  {children}
                </td>
              ),
              a: ({ children, href }) => (
                <a 
                  href={href} 
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {children}
                </a>
              ),
              img: ({ src, alt }) => (
                <img 
                  src={src} 
                  alt={alt} 
                  className="rounded-lg shadow-sm max-w-full h-auto mb-6"
                  loading="lazy"
                />
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-zinc-900">
                  {children}
                </strong>
              ),
              em: ({ children }) => (
                <em className="italic text-zinc-700">
                  {children}
                </em>
              ),
              hr: () => (
                <hr className="border-0 border-t border-zinc-300 my-8" />
              ),
              del: ({ children }) => (
                <del className="line-through text-zinc-500">
                  {children}
                </del>
              ),
            }}
          >
            {markdownContent}
          </ReactMarkdown>
        </article>

        {/* Related Content Suggestions for better engagement */}
        <aside className="mt-12 p-6 bg-zinc-50 rounded-lg">
          <h3 className="text-lg font-semibold text-zinc-900 mb-4">
            Continue Learning
          </h3>
          <p className="text-zinc-600 mb-4">
            Explore more AI tools and tutorials to enhance your productivity and skills.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link 
              href="/blog" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Browse All Articles
            </Link>
            <Link 
              href="/" 
              className="inline-flex items-center px-4 py-2 border border-zinc-300 text-zinc-700 rounded-lg hover:bg-zinc-100 transition-colors text-sm font-medium"
            >
              Try AI Tools
            </Link>
          </div>
        </aside>

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



