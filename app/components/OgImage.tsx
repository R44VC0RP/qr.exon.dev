import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          fontSize: 40,
          color: 'black',
          background: 'linear-gradient(to bottom, #f8fafc, #f1f5f9)',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '20px',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 9h6V3H3v6zm2-4h2v2H5V5zm8-2v6h6V3h-6zm4 4h-2V5h2v2zM3 21h6v-6H3v6zm2-4h2v2H5v-2zm13-2h-2v2h-2v2h2v2h2v-2h2v-2h-2v-2zm-3-4h-2v2h2V9zm0 4h-2v2h2v-2zm-4 0H9v2h2v-2z"
                fill="white"
              />
            </svg>
          </div>
          <div style={{ fontSize: '48px', fontWeight: 'bold' }}>qr.exon.dev</div>
        </div>
        <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
          Free QR Code Generator
        </div>
        <div style={{ fontSize: '24px', color: '#475569', maxWidth: '700px' }}>
          Create custom QR codes with your logo, colors, and download in high quality
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
} 