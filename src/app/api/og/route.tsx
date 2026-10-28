import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'CopyM — The Complete Tokenization Platform';
    const category = searchParams.get('category') || 'RWA INFRASTRUCTURE';
    const subtitle = searchParams.get('subtitle') || 'Institutional-Grade Real-World Asset Tokenization Infrastructure';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#070a0e',
            backgroundImage: 'radial-gradient(circle at 85% 20%, rgba(21, 163, 110, 0.35) 0%, transparent 60%), radial-gradient(circle at 15% 85%, rgba(13, 91, 65, 0.3) 0%, transparent 55%)',
            padding: '60px 80px',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Header Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #15a36e 0%, #2a867f 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: 24,
                }}
              >
                C
              </div>
              <span
                style={{
                  color: '#ffffff',
                  fontSize: 32,
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  marginRight: 12,
                }}
              >
                CopyM
              </span>
              <span
                style={{
                  color: '#15a36e',
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                }}
              >
                RWA
              </span>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(21, 163, 110, 0.15)',
                border: '1.5px solid rgba(21, 163, 110, 0.4)',
                borderRadius: 9999,
                padding: '8px 24px',
                color: '#15a36e',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {category}
            </div>
          </div>

          {/* Center Title & Subtitle */}
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }}>
            <div
              style={{
                color: '#ffffff',
                fontSize: title.length > 50 ? 46 : 56,
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                marginBottom: 16,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div
                style={{
                  color: '#94a3b8',
                  fontSize: 24,
                  lineHeight: 1.4,
                  fontWeight: 400,
                }}
              >
                {subtitle}
              </div>
            )}
          </div>

          {/* Footer Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: 24,
              width: '100%',
            }}
          >
            <div
              style={{
                width: 6,
                height: 24,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #15a36e 0%, #2a867f 100%)',
                marginRight: 14,
              }}
            />
            <span style={{ color: '#e2e8f0', fontSize: 18, fontWeight: 700, marginRight: 16 }}>
              copym.xyz
            </span>
            <span style={{ color: '#64748b', fontSize: 16, fontWeight: 500 }}>
              · Institutional Tokenization Platform · Masdar City Licence No. MC 14225
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500,
    });
  }
}
