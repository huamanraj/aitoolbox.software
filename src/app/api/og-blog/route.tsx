import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
          padding: '80px',
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
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`,
            opacity: 0.8,
          }}
        />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '60px', zIndex: 1 }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4)',
            }}
          >
            <div style={{ fontSize: '40px', color: 'white', fontWeight: 'bold' }}>
              AI
            </div>
          </div>
          <div style={{ fontSize: '48px', fontWeight: '700', color: 'white' }}>
            AI Toolbox
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', marginBottom: '60px', zIndex: 1 }}>
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              lineHeight: 1.1,
              marginBottom: '30px',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            Blog & Tutorials
          </div>
          <div
            style={{
              fontSize: '28px',
              color: '#cbd5e1',
              lineHeight: 1.4,
              maxWidth: '800px',
              fontWeight: '400',
            }}
          >
            Your definitive guide to AI tools, tutorials, and insights
          </div>
        </div>

        {/* Features */}
        <div style={{ display: 'flex', gap: '60px', alignItems: 'center', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ fontSize: '28px' }}>📚</div>
            <div style={{ fontSize: '20px', color: '#e2e8f0', fontWeight: '500' }}>Comprehensive Guides</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ fontSize: '28px' }}>🚀</div>
            <div style={{ fontSize: '20px', color: '#e2e8f0', fontWeight: '500' }}>Latest AI Tools</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ fontSize: '28px' }}>💡</div>
            <div style={{ fontSize: '20px', color: '#e2e8f0', fontWeight: '500' }}>Expert Insights</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          position: 'absolute',
          bottom: '40px',
          right: '80px',
          fontSize: '18px', 
          color: '#64748b',
          fontWeight: '500',
          zIndex: 1
        }}>
          aitoolbox.software
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
}
