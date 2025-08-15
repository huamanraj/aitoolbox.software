import { ImageResponse } from 'next/og';
import { getServerClients, BLOGS_DB_ID, BLOGS_COLLECTION_ID } from "@/lib/appwrite";

export const runtime = 'edge';
export const alt = 'AI Toolbox Blog Post';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  try {
    const { databases } = getServerClients();
    const list = await databases.listDocuments(BLOGS_DB_ID, BLOGS_COLLECTION_ID);
    const doc: any = list.documents?.find((d: any) => d.slug === params.slug);
    
    if (!doc) {
      return new ImageResponse(
        (
          <div
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <div style={{ fontSize: 60, fontWeight: 'bold', color: 'white' }}>
              AI Toolbox
            </div>
          </div>
        ),
        { ...size }
      );
    }

    const title = doc.title || 'AI Toolbox Blog';
    const excerpt = doc.excerpt || '';

    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: '80px',
            fontFamily: '"Inter", sans-serif',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ fontSize: '30px', color: 'white', fontWeight: 'bold' }}>
                AI
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '600', color: 'white' }}>
              AI Toolbox
            </div>
          </div>

          {/* Main Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', flex: 1, justifyContent: 'center' }}>
            <div
              style={{
                fontSize: title.length > 60 ? '48px' : '56px',
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1.1,
                maxWidth: '900px',
              }}
            >
              {title}
            </div>
            {excerpt && (
              <div
                style={{
                  fontSize: '24px',
                  color: '#94a3b8',
                  lineHeight: 1.4,
                  maxWidth: '800px',
                }}
              >
                {excerpt.slice(0, 150)}{excerpt.length > 150 ? '...' : ''}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '20px', color: '#64748b' }}>
              Read the full article at aitoolbox.software
            </div>
          </div>
        </div>
      ),
      { ...size }
    );
  } catch (error) {
    // Fallback image
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '30px',
          }}
        >
          <div style={{ fontSize: '72px', fontWeight: 'bold', color: 'white' }}>
            AI Toolbox
          </div>
          <div style={{ fontSize: '32px', color: '#94a3b8' }}>
            Blog Article
          </div>
        </div>
      ),
      { ...size }
    );
  }
}
