import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { getServerClients, BLOGS_DB_ID, BLOGS_COLLECTION_ID, getPublicFileViewUrl } from '@/lib/appwrite';
import { Badge } from '@/components/ui/badge';

export const revalidate = 300; // Revalidate every 5 minutes

async function getBlogs() {
  try {
    const { databases } = getServerClients();
    const list = await databases.listDocuments(BLOGS_DB_ID, BLOGS_COLLECTION_ID);
    
    // Sort blogs by creation date (newest first)
    const sortedBlogs = (list.documents || []).sort((a: any, b: any) => 
      new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
    );
    
    return sortedBlogs;
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-white">
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
                <Card key={blog.$id} className="group hover:shadow-xl transition-all duration-300 border-zinc-200 overflow-hidden">
                  <Link href={`/${blog.slug}`}>
                    {/* Cover Image */}
                    {coverUrl && (
                      <div className="relative h-48 bg-zinc-100 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={coverUrl} 
                          alt={blog.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}
                    
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl font-bold leading-tight text-zinc-900 group-hover:text-blue-600 transition-colors line-clamp-2">
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
                        <p className="text-zinc-600 leading-relaxed line-clamp-3 mb-4">
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
