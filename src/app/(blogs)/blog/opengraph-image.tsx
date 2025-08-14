import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'AI Toolbox Blog - Your Guide to AI Tools';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Inter", sans-serif',
          padding: '80px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '60px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', marginBottom: '60px' }}>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: 'white',
              lineHeight: 1.1,
              marginBottom: '30px',
            }}
          >
            Blog & Tutorials
          </div>
          <div
            style={{
              fontSize: '28px',
              color: '#94a3b8',
              lineHeight: 1.4,
              maxWidth: '800px',
            }}
          >
            Your definitive guide to AI tools, tutorials, and insights
          </div>
        </div>

        {/* Features */}
        <div style={{ display: 'flex', gap: '60px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ fontSize: '24px' }}>📚</div>
            <div style={{ fontSize: '20px', color: '#e2e8f0' }}>Comprehensive Guides</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ fontSize: '24px' }}>🚀</div>
            <div style={{ fontSize: '20px', color: '#e2e8f0' }}>Latest AI Tools</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ fontSize: '24px' }}>💡</div>
            <div style={{ fontSize: '20px', color: '#e2e8f0' }}>Expert Insights</div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
