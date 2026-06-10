import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://explora-aventura.com'
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/favicon.ico', '/icon.png'],
      disallow: ['/admin/', '/cliente/', '/guia/', '/api/', '/checkout/', '/confirmacao/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
