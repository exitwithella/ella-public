import { getCloudflareContext } from '@opennextjs/cloudflare'
import { unstable_cache } from 'next/cache'

/**
 * Inline all CSS properties from <style> blocks as SVG presentation attributes.
 *
 * Illustrator exports generic class names (`.cls-1`, `.st0`) that collide when
 * multiple SVGs are injected into the same page. This function extracts every
 * property from each class rule, removes the <defs>/<style> block, and applies
 * the properties as a `style` attribute on matching elements — preserving fill,
 * stroke, stroke-dasharray, stroke-width, and any other CSS the SVG relies on.
 */
export function inlineSvgStyles(svg: string): string {
  // Parse each class rule: .st0 { fill: none; stroke: #231f20; stroke-width: .2px; }
  const classStyles = new Map<string, string>()
  const ruleRegex = /\.([\w-]+)\s*\{([^}]+)\}/g
  let ruleMatch
  while ((ruleMatch = ruleRegex.exec(svg)) !== null) {
    const cls = ruleMatch[1]
    const body = ruleMatch[2]
    // Extract individual property:value pairs
    const props: string[] = []
    const propRegex = /([\w-]+)\s*:\s*([^;]+)/g
    let propMatch
    while ((propMatch = propRegex.exec(body)) !== null) {
      props.push(`${propMatch[1].trim()}:${propMatch[2].trim()}`)
    }
    if (props.length > 0) {
      classStyles.set(cls, props.join(';'))
    }
  }

  if (classStyles.size === 0) return svg

  // Remove the <defs>...<style>...</style>...</defs> block
  let result = svg.replace(/<defs>[\s\S]*?<\/defs>/gi, '')

  // Replace class="st0" with style="fill:none;stroke:#231f20;..."
  for (const [cls, style] of classStyles) {
    result = result.replace(new RegExp(`class="${cls}"`, 'g'), `style="${style}"`)
  }

  return result
}

/**
 * Read raw SVG text for a Media record. Prefers the R2 binding (fast, works
 * under `global_fetch_strictly_public` where Worker-to-self HTTP is blocked).
 * Falls back to an HTTP fetch of `url` for environments where the R2 binding
 * is unavailable (e.g. plain `next dev` without initOpenNextCloudflareForDev).
 */
async function fetchRawSvg(
  filename: string | null | undefined,
  url: string | null | undefined,
): Promise<string | null> {
  if (filename) {
    try {
      const { env } = await getCloudflareContext({ async: true })
      const r2 = env?.R2
      if (r2) {
        const obj = await r2.get(filename)
        if (obj) return await obj.text()
      }
    } catch {
      // R2 binding not reachable (plain `next dev`) — fall through to HTTP.
    }
  }

  if (!url) return null
  try {
    const absoluteUrl = url.startsWith('http')
      ? url
      : `${process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'}${url}`
    const res = await fetch(absoluteUrl)
    if (!res.ok) return null
    return await res.text()
  } catch {
    return null
  }
}

export const fetchSvgContent = unstable_cache(
  async (
    filename: string | null | undefined,
    url: string | null | undefined,
  ): Promise<string | null> => {
    const text = await fetchRawSvg(filename, url)
    if (!text) return null
    const svgStart = text.indexOf('<svg')
    if (svgStart === -1) return null
    return inlineSvgStyles(text.slice(svgStart))
  },
  ['svg-content'],
  { revalidate: 86400 },
)

interface SvgMedia {
  filename?: string | null
  url?: string | null
  mimeType?: string | null
}

/**
 * Returns a `url("data:image/svg+xml,...")` string suitable for CSS
 * `mask-image` / `background-image` from a Media record. Returns null if the
 * media isn't an SVG or the file couldn't be read.
 */
export async function fetchSvgDataUri(media: SvgMedia): Promise<string | null> {
  if (!media.mimeType?.includes('svg')) return null
  const text = await fetchRawSvg(media.filename, media.url)
  if (!text) return null
  return `url("data:image/svg+xml,${encodeURIComponent(text)}")`
}
