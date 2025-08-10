import { Client, Databases, Storage, Account, Query } from "appwrite";

export type AppwriteServerClients = {
  client: Client;
  databases: Databases;
  storage: Storage;
  account: Account;
};

export function getServerClients(): AppwriteServerClients {
  const endpoint = process.env.APPWRITE_ENDPOINT;
  const projectId = process.env.APPWRITE_PROJECT_ID;
  const apiKey = process.env.APPWRITE_API_KEY;

  if (!endpoint || !projectId || !apiKey) {
    throw new Error(
      "Missing Appwrite env: APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_API_KEY"
    );
  }

  const client = new Client().setEndpoint(endpoint).setProject(projectId);
  // The setKey method is available on server runtimes. Cast to any to satisfy TS in mixed envs.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (client as any).setKey?.(apiKey);

  const databases = new Databases(client);
  const storage = new Storage(client);
  const account = new Account(client);

  return { client, databases, storage, account };
}

export function getPublicFileViewUrl(fileId: string): string {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || process.env.APPWRITE_ENDPOINT || "";
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || process.env.APPWRITE_PROJECT_ID || "";
  const base = endpoint.replace(/\/$/, "");
  return `${base}/storage/buckets/blog-covers/files/${fileId}/view?project=${projectId}`;
}

export const BLOGS_DB_ID = "content";
export const BLOGS_COLLECTION_ID = "blogs";
export const BLOG_COVERS_BUCKET_ID = "blog-covers";

export async function getBlogBySlug(slug: string) {
  try {
    const { databases } = getServerClients();
    // Query directly by slug instead of listing all documents
    const result = await databases.listDocuments(
      BLOGS_DB_ID, 
      BLOGS_COLLECTION_ID,
      [
        Query.equal('slug', slug),
        Query.limit(1)
      ]
    );
    return result.documents?.[0] || null;
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return null;
  }
}

// Remove getAllBlogSlugs function as it won't scale for 20k blogs
export async function getRecentBlogSlugs(limit: number = 100): Promise<string[]> {
  try {
    const { databases } = getServerClients();
    const list = await databases.listDocuments(
      BLOGS_DB_ID, 
      BLOGS_COLLECTION_ID,
      [
        Query.orderDesc('$createdAt'),
        Query.limit(limit)
      ]
    );
    return list.documents?.map((doc: any) => doc.slug).filter(Boolean) || [];
  } catch (error) {
    console.error('Error fetching recent blog slugs:', error);
    return [];
  }
}


