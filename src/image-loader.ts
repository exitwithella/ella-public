/**
 * Custom Next.js image loader for Cloudflare Workers.
 *
 * For Payload media (/api/media/*) — whether the src is a relative path or
 * an absolute URL pointing at our own origin — rewrites to /cdn-cgi/image/
 * so Cloudflare resizes at the edge. Bypasses the OpenNext ASSETS binding
 * limitation around /_next/image.
 *
 * Static assets (/_next/static/*) pass through to the default
 * /_next/image handler which correctly reads from ASSETS.
 */
function getMediaPath(src: string): string | null {
  if (src.startsWith('/api/media/')) return src
  try {
    const url = new URL(src)
    if (url.pathname.startsWith('/api/media/')) return url.pathname + url.search
  } catch {
    // not an absolute URL
  }
  return null
}

export default function cloudflareImageLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  const q = quality || 75
  const mediaPath = getMediaPath(src)

  if (mediaPath) {
    return `/cdn-cgi/image/width=${width},quality=${q},format=auto${mediaPath}`
  }

  // For everything else, use the standard Next.js image path
  const params = new URLSearchParams({
    url: src,
    w: width.toString(),
    q: q.toString(),
  })
  return `/_next/image?${params.toString()}`
}
