import type { CollectionAfterChangeHook } from 'payload'

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

function getSiteUrl(): { host: string; url: string } {
  const url = process.env.SITE_URL ?? 'https://withella.io'
  const host = new URL(url).host
  return { host, url }
}

export function createIndexNowHook(
  getPath: (doc: Record<string, unknown>) => string | null,
): CollectionAfterChangeHook {
  return async ({ doc, req }) => {
    const key = process.env.INDEXNOW_API_KEY
    if (!key) return doc

    const settings = await req.payload.findGlobal({ slug: 'site-settings' })
    if (!settings.indexNow?.enabled) return doc

    const path = getPath(doc)
    if (!path) return doc

    const { host, url: siteUrl } = getSiteUrl()
    const url = `${siteUrl}${path}`
    const keyLocation = `${siteUrl}/indexnow-key.txt`

    try {
      await fetch(INDEXNOW_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host,
          key,
          keyLocation,
          urlList: [url],
        }),
      })
    } catch {
      // Best-effort — don't block CMS save on IndexNow failure
    }

    return doc
  }
}
