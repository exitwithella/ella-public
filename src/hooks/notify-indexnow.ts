import type { CollectionAfterChangeHook } from 'payload'

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'
const SITE_HOST = 'withella.io'
const SITE_URL = `https://${SITE_HOST}`
const KEY_LOCATION = `${SITE_URL}/indexnow-key.txt`

export function createIndexNowHook(
  getPath: (doc: Record<string, unknown>) => string | null,
): CollectionAfterChangeHook {
  return async ({ doc }) => {
    const key = process.env.INDEXNOW_API_KEY
    if (!key) return doc

    const path = getPath(doc)
    if (!path) return doc

    const url = `${SITE_URL}${path}`

    try {
      await fetch(INDEXNOW_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: SITE_HOST,
          key,
          keyLocation: KEY_LOCATION,
          urlList: [url],
        }),
      })
    } catch {
      // Best-effort — don't block CMS save on IndexNow failure
    }

    return doc
  }
}
