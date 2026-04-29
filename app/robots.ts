import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://33nexus.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/portal/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
