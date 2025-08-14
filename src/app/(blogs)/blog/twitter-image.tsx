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
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: '"Inter", sans-serif',
          padding: '60px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', alignSelf: 'flex-start' }}>
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
            AI Toolbox Blog
          </div>
          <div style={{ fontSize: '20px', color: '#8b8b8b', marginLeft: 'auto' }}>
            @aitoolboxsw
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
          <div
            style={{
              fontSize: '56px',
              fontWeight: 'bold',
              color: 'white',
              lineHeight: 1.1,
              marginBottom: '25px',
            }}
          >
            AI Tools & Tutorials
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#a0a0a0',
              lineHeight: 1.4,
              maxWidth: '700px',
            }}
          >
            Comprehensive guides to master AI tools for productivity and innovation
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', alignSelf: 'flex-start' }}>
          <div style={{ fontSize: '18px', color: '#666666' }}>
            🔗 aitoolbox.software/blog
          </div>
          <div style={{ fontSize: '18px', color: '#1da1f2' }}>
            #AI #Tools #Tutorials #Productivity
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
