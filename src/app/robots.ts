import type { MetadataRoute } from 'next'

import { siteConfig } from './(frontend)/_lib/content'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
