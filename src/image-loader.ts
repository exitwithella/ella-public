/**
 * Custom Next.js image loader for Cloudflare Workers.
 *
 * For /api/media/* paths (Payload R2 media), rewrites to the
 * /cdn-cgi/image/ URL format which Cloudflare handles natively
 * at the edge — bypassing the OpenNext ASSETS binding limitation.
 *
 * Static assets (/_next/static/*) pass through to the default
 * /_next/image handler which correctly reads from ASSETS.
 */
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

  // For Payload media files, use Cloudflare's native image transformation
  if (src.startsWith('/api/media/')) {
    return `/cdn-cgi/image/width=${width},quality=${q},format=auto/${src}`
  }

  // For everything else, use the standard Next.js image path
  const params = new URLSearchParams({
    url: src,
    w: width.toString(),
    q: q.toString(),
  })
  return `/_next/image?${params.toString()}`
}
