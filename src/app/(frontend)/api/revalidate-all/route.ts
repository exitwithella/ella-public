import { revalidateTag } from 'next/cache'
import { getPayload } from 'payload'

import config from '@/payload.config'

const ALL_TAGS = [
  'navigation',
  'footer',
  'site-settings',
  'script-injection',
  'pages',
  'homepage',
  'posts',
  'categories',
  'solutions',
  'pricing',
]

export async function POST(request: Request) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: request.headers })

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  for (const tag of ALL_TAGS) {
    // @ts-expect-error — works with single arg when cacheComponents disabled
    revalidateTag(tag)
  }

  return Response.json({ revalidated: ALL_TAGS, timestamp: Date.now() })
}
