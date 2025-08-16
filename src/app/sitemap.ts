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

