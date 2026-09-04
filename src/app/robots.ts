import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://crm-crm-essentia.nscyqj.easypanel.host'
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/favicon.ico', '/icon.png'],
      disallow: ['/admin/', '/cliente/', '/guia/', '/api/', '/checkout/', '/confirmacao/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
