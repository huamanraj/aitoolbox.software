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
              background: 'linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%)',
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
            background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: '60px',
            fontFamily: '"Inter", sans-serif',
          }}
        >
          {/* Header with Twitter branding */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%)',
                borderRadius: '25px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ fontSize: '24px', color: 'white', fontWeight: 'bold' }}>
                AI
              </div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '600', color: 'white' }}>
              AI Toolbox
            </div>
            <div style={{ fontSize: '20px', color: '#8b8b8b', marginLeft: 'auto' }}>
              @aitoolboxsw
            </div>
          </div>

          {/* Main Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', flex: 1, justifyContent: 'center' }}>
            <div
              style={{
                fontSize: title.length > 60 ? '44px' : '52px',
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1.1,
                maxWidth: '1000px',
              }}
            >
              {title}
            </div>
            {excerpt && (
              <div
                style={{
                  fontSize: '22px',
                  color: '#a0a0a0',
                  lineHeight: 1.4,
                  maxWidth: '900px',
                }}
              >
                {excerpt.slice(0, 120)}{excerpt.length > 120 ? '...' : ''}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ fontSize: '18px', color: '#666666' }}>
              🔗 aitoolbox.software
            </div>
            <div style={{ fontSize: '18px', color: '#1da1f2' }}>
              #AI #Tools #Technology
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
            background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '30px',
          }}
        >
          <div style={{ fontSize: '64px', fontWeight: 'bold', color: 'white' }}>
            AI Toolbox
          </div>
          <div style={{ fontSize: '28px', color: '#a0a0a0' }}>
            Blog Article
          </div>
        </div>
      ),
      { ...size }
    );
  }
}
