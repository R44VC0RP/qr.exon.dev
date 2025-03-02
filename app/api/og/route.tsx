import React from 'react';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          backgroundColor: 'white',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #f1f5f9 2%, transparent 0%), radial-gradient(circle at 75px 75px, #f1f5f9 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 9h6V3H3v6zm2-4h2v2H5V5zm8-2v6h6V3h-6zm4 4h-2V5h2v2zM3 21h6v-6H3v6zm2-4h2v2H5v-2zm13-2h-2v2h-2v2h2v2h2v-2h2v-2h-2v-2zm-3-4h-2v2h2V9zm0 4h-2v2h2v-2zm-4 0H9v2h2v-2z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 60,
            fontStyle: 'normal',
            color: '#0f172a',
            marginTop: 30,
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap',
          }}
        >
          <b>QR Code Generator</b>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            fontStyle: 'normal',
            color: '#475569',
            marginTop: 10,
            maxWidth: '800px',
            textAlign: 'center',
          }}
        >
          Create custom QR codes with your logo, colors, and download in high quality
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            fontStyle: 'normal',
            color: '#64748b',
            marginTop: 40,
          }}
        >
          qr.exon.dev
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
} 