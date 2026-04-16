import { siteConfig } from '../../_lib/content'
import { getPublishedPosts } from '../_lib/get-posts'
import { escapeXml, getPostUrl } from '../_lib/utils'

const SITE_URL = siteConfig.url

export const dynamic = 'force-dynamic'

export async function GET() {
  const posts = await getPublishedPosts({ limit: 20 })

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}${getPostUrl(post)}`
      const title = escapeXml(post.title)
      const description = escapeXml(post.excerpt ?? '')
      const pubDate = new Date(post.publishedDate).toUTCString()

      return `    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ELLA Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Practical perspectives on advisory practice, systematization, and what's changing in the profession.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
