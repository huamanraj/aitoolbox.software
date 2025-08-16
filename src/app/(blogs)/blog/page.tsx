import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { getServerClients, BLOGS_DB_ID, BLOGS_COLLECTION_ID, getPublicFileViewUrl } from '@/lib/appwrite';
import { Query } from 'appwrite';
import { Badge } from '@/components/ui/badge';
import { Metadata } from 'next';
import DirectLinkAdButton from '@/components/ads/DirectLinkAdButton';

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const PAGE_SIZE = 15;

// Page-specific metadata is now handled in layout.tsx
// This component focuses on content rendering and dynamic structured data

async function getBlogs(page: number) {
  try {
    const { databases } = getServerClients();
    const offset = Math.max((page - 1) * PAGE_SIZE, 0);
    
    const list = await databases.listDocuments(
      BLOGS_DB_ID,
      BLOGS_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.limit(PAGE_SIZE), Query.offset(offset)]
    );
    
    const docs = list?.documents || [];
    const total = list?.total ?? 0;
    return { docs, total };
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return { docs: [], total: 0 };
  }
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(parseInt(pageParam || '1', 10) || 1, 1);
  const { docs: blogs, total } = await getBlogs(currentPage);
  const totalPages = Math.max(Math.ceil((total || blogs.length) / PAGE_SIZE), 1);

  // Dynamic structured data for current blog posts (layout handles static blog data)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aitoolbox.software';
  
  const blogPostsStructuredData = blogs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `AI Toolbox Blog Posts - Page ${currentPage}`,
    "description": "Latest blog posts about AI tools and tutorials",
    "numberOfItems": blogs.length,
    "itemListElement": blogs.map((blog: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "BlogPosting",
        "headline": blog.title,
        "description": blog.excerpt || blog.content?.replace(/<[^>]*>/g, '').slice(0, 160),
        "url": `${baseUrl}/${blog.slug}`,
        "datePublished": blog.$createdAt,
        "dateModified": blog.$updatedAt,
        "author": {
          "@type": "Organization",
          "name": "AI Toolbox Team"
        },
        "publisher": {
          "@type": "Organization",
          "name": "AI Toolbox"
        },
        "image": blog.coverFileId ? getPublicFileViewUrl(blog.coverFileId) : `${baseUrl}/api/og?title=${encodeURIComponent(blog.title)}&excerpt=${encodeURIComponent(blog.excerpt || '')}&slug=${encodeURIComponent(blog.slug)}`
      }
    }))
  } : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic Structured Data for Current Page Content */}
      {blogPostsStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostsStructuredData) }}
        />
      )}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 mb-6">
            AI Toolbox Blog
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 font-light max-w-3xl mx-auto leading-relaxed">
            Your definitive source for AI guides, tutorials, and insights. 
            Learn how to leverage artificial intelligence for productivity and innovation.
          </p>
        </header>

        {/* Blog Grid */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog: any) => {
              const coverUrl = blog.coverFileId ? getPublicFileViewUrl(blog.coverFileId) : null;
              const publishDate = new Date(blog.$createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              });
              
              // Estimate reading time
              const wordCount = blog.content?.split(/\s+/).length || 0;
              const readingTime = Math.ceil(wordCount / 200);

              return (
                <Card 
                  key={blog.$id} 
                  className="group hover:shadow-xl transition-all duration-300 border-zinc-200 overflow-hidden"
                  itemScope
                  itemType="https://schema.org/BlogPosting"
                >
                  <Link href={`/${blog.slug}`} aria-label={`Read article: ${blog.title}`}>
                    {/* Hidden microdata */}
                    <meta itemProp="url" content={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://aitoolbox.software'}/${blog.slug}`} />
                    <meta itemProp="datePublished" content={blog.$createdAt} />
                    <meta itemProp="dateModified" content={blog.$updatedAt} />
                    <meta itemProp="author" content="AI Toolbox Team" />
                    <meta itemProp="publisher" content="AI Toolbox" />
                    
                    {/* Cover Image */}
                    {coverUrl && (
                      <div className="relative h-48 bg-zinc-100 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={coverUrl} 
                          alt={blog.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          itemProp="image"
                        />
                      </div>
                    )}
                    
                    <CardHeader className="pb-4">
                      <CardTitle 
                        className="text-xl font-bold leading-tight text-zinc-900 group-hover:text-blue-600 transition-colors line-clamp-2"
                        itemProp="headline"
                      >
                        {blog.title}
                      </CardTitle>
                      
                      {/* Meta Information */}
                      <div className="flex items-center gap-4 text-xs text-zinc-500 mt-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{publishDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{readingTime} min read</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {/* Excerpt */}
                      {blog.excerpt && (
                        <p className="text-zinc-600 leading-relaxed line-clamp-3 mb-4" itemProp="description">
                          {blog.excerpt}
                        </p>
                      )}
                      
                      {/* Read More Link */}
                      <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
                        Read More 
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              );
            })}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16">
            <div className="mx-auto max-w-md">
              <div className="bg-zinc-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <User className="h-8 w-8 text-zinc-400" />
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                No Blog Posts Yet
              </h3>
              <p className="text-zinc-600">
                We're working on creating amazing content for you. Check back soon!
              </p>
            </div>
          </div>
        )}

        {/* Pagination */}
        {blogs.length > 0 ? (
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              className={`px-4 py-2 rounded border ${currentPage <= 1 ? 'pointer-events-none opacity-50' : 'hover:bg-zinc-50'}`}
              href={`?page=${Math.max(currentPage - 1, 1)}`}
              aria-disabled={currentPage <= 1}
            >
              Previous
            </a>
            <span className="text-sm text-zinc-600">Page {currentPage} of {totalPages}</span>
            <a
              className={`px-4 py-2 rounded border ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-zinc-50'}`}
              href={`?page=${Math.min(currentPage + 1, totalPages)}`}
              aria-disabled={currentPage >= totalPages}
            >
              Next
            </a>
          </div>
        ) : null}
        <DirectLinkAdButton/>
        {/* Newsletter CTA */}
        <div className="mt-20 bg-zinc-50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4">
            Stay Updated with AI Insights
          </h2>
          <p className="text-lg text-zinc-600 mb-6 max-w-2xl mx-auto">
            Get the latest AI tools, tutorials, and industry insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
