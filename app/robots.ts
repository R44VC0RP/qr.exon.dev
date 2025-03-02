import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/api/og/*'],
      disallow: ['/private/', '/admin/'],
    },
    sitemap: 'https://qr.exon.dev/sitemap.xml',
  }
} 