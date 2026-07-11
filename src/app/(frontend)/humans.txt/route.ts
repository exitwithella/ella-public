import config from '@payload-config'
import { getPayload } from 'payload'

import { lexicalToMarkdown } from '../_lib/lexical-to-markdown'

export const dynamic = 'force-dynamic'

export async function GET() {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  const content = lexicalToMarkdown(settings.creditsBody)

  if (!content) {
    return new Response('Not configured', { status: 404 })
  }

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'X-Robots-Tag': 'noindex',
    },
  })
}
