import { revalidateTag } from 'next/cache'
import { getPayload } from 'payload'

import config from '@/payload.config'

import { ALL_CACHE_TAGS } from '../../_lib/cache-tags'

export async function POST(request: Request) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: request.headers })

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  for (const tag of ALL_CACHE_TAGS) {
    // @ts-expect-error — works with single arg when cacheComponents disabled
    revalidateTag(tag)
  }

  return Response.json({ revalidated: ALL_CACHE_TAGS, timestamp: Date.now() })
}
