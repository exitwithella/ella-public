import { getSiteSettings } from '../_lib/get-site-settings'

export const dynamic = 'force-dynamic'

export async function GET() {
  const settings = await getSiteSettings()
  const content = settings.llmsTxt

  if (!content) {
    return new Response('Not configured', { status: 404 })
  }

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
