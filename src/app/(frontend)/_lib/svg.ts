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

import { unstable_cache } from 'next/cache'

export const fetchSvgContent = unstable_cache(
  async (url: string): Promise<string | null> => {
    try {
      const absoluteUrl = url.startsWith('http')
        ? url
        : `${process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'}${url}`
      const res = await fetch(absoluteUrl)
      const text = await res.text()
      const svgStart = text.indexOf('<svg')
      if (svgStart === -1) return null
      return inlineSvgStyles(text.slice(svgStart))
    } catch {
      return null
    }
  },
  ['svg-content'],
  { revalidate: 86400 },
)
