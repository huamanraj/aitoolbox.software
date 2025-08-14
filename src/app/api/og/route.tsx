import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'AI Toolbox Blog';
    const excerpt = searchParams.get('excerpt') || 'Discover the latest AI tools and tutorials';
    const slug = searchParams.get('slug') || '';

    // Truncate title and excerpt for better display
    const displayTitle = title.length > 80 ? title.slice(0, 77) + '...' : title;
    const displayExcerpt = excerpt.length > 120 ? excerpt.slice(0, 117) + '...' : excerpt;

    // Calculate font sizes based on content length
    const titleFontSize = title.length > 60 ? '48px' : title.length > 40 ? '56px' : '64px';
    const excerptFontSize = excerpt.length > 80 ? '22px' : '24px';

    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: '60px 80px',
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            position: 'relative',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                               radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`,
              opacity: 0.6,
            }}
          />

          {/* Header with Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', zIndex: 1 }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)',
              }}
            >
              <div style={{ fontSize: '28px', color: 'white', fontWeight: 'bold' }}>
                AI
              </div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: 'white' }}>
              AI Toolbox
            </div>
          </div>

          {/* Main Content */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '30px', 
            flex: 1, 
            justifyContent: 'center',
            zIndex: 1,
            maxWidth: '100%'
          }}>
            {/* Title */}
            <div
              style={{
                fontSize: titleFontSize,
                fontWeight: 'bold',
                color: 'white',
                lineHeight: 1.1,
                maxWidth: '900px',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              {displayTitle}
            </div>
            
            {/* Excerpt */}
            {excerpt && (
              <div
                style={{
                  fontSize: excerptFontSize,
                  color: '#cbd5e1',
                  lineHeight: 1.4,
                  maxWidth: '800px',
                  fontWeight: '400',
                }}
              >
                {displayExcerpt}
              </div>
            )}

            {/* Category Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div
                style={{
                  background: 'rgba(59, 130, 246, 0.2)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  fontSize: '16px',
                  color: '#93c5fd',
                  fontWeight: '500',
                }}
              >
                AI Tools & Tutorials
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            width: '100%',
            zIndex: 1
          }}>
            <div style={{ fontSize: '18px', color: '#64748b', fontWeight: '500' }}>
              aitoolbox.software
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                background: '#22c55e' 
              }} />
              <div style={{ fontSize: '16px', color: '#64748b' }}>
                Fresh Content
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    
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
            fontFamily: '"Inter", sans-serif',
          }}
        >
          <div style={{ fontSize: '72px', fontWeight: 'bold', color: 'white' }}>
            AI Toolbox
          </div>
          <div style={{ fontSize: '32px', color: '#94a3b8' }}>
            Blog & Tutorials
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}
