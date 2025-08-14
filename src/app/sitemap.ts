import { MetadataRoute } from 'next';
import { getServerClients, BLOGS_DB_ID, BLOGS_COLLECTION_ID } from '@/lib/appwrite';
import { Query } from 'appwrite';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aitoolbox.software';
  
  try {
    const { databases } = getServerClients();
    
    // Get blogs in batches to avoid memory issues
    const batchSize = 500;
    let offset = 0;
    const blogUrls: MetadataRoute.Sitemap = [];
    
    while (true) {
      const batch = await databases.listDocuments(
        BLOGS_DB_ID,
        BLOGS_COLLECTION_ID,
        [
          Query.limit(batchSize),
          Query.offset(offset),
          Query.orderDesc('$createdAt')
        ]
      );
      
      if (batch.documents.length === 0) break;
      
      const batchUrls = batch.documents.map((doc: any) => ({
        url: `${baseUrl}/${doc.slug}`,
        lastModified: new Date(doc.$updatedAt),
        changeFrequency: 'daily' as const,
        priority: 0.7,
      }));
      
      blogUrls.push(...batchUrls);
      offset += batchSize;
    }
    
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      ...blogUrls,
    ];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ];
  }
}
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/blog-writer',
    '/chatbot',
    '/code-explainer',
    '/email-writer',
    '/grammar-fixer',
    '/idea-generator',
    '/image-generator',
    '/logo-generator',
    '/prompt-generator',
    '/resume-builder',
    '/cover-letter-generator',
    '/text-summarizer',
    '/youtube-summarizer',
    '/startup-idea-generator',
    '/youtube-idea-generator',
    '/blog-idea-generator',
    '/app-idea-generator',
    '/product-idea-generator',
    '/how-to-generate-ai-images-for-free',
    '/how-to-generate-ghibhli-style-images',
    '/guide-to-ai-blog-writer',
    '/how-to-build-ai-chatbot',
    '/ai-code-explainer-guide',
    '/ai-email-writer-guide',
    '/ai-grammar-fixer-guide',
    '/ai-idea-generator-guide',
    '/ai-logo-generator-guide',
    '/ai-resume-builder-guide',
    '/ai-text-summarizer-guide',
    '/ai-youtube-summarizer-guide',
  ].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes];
}