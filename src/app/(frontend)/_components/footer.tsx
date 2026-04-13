import { FooterMultiColumn } from '@/components/sections/footer-multi-column'

import { getFooter } from '../_lib/get-footer'

/**
 * Inline SVG class styles as `fill` attributes on elements to prevent
 * CSS class name collisions (Illustrator exports generic `.cls-1`, `.cls-2`
 * names that conflict when multiple SVGs are injected into the same page).
 */
function inlineSvgFills(svg: string): string {
  // Extract fill rules from <style> blocks: .cls-1{fill:#fff;} → { 'cls-1': '#fff' }
  const fillMap = new Map<string, string>()
  const styleRegex = /\.([\w-]+)\s*\{[^}]*fill\s*:\s*([^;}]+)/g
  let match
  while ((match = styleRegex.exec(svg)) !== null) {
    fillMap.set(match[1], match[2].trim())
  }
  if (fillMap.size === 0) return svg

  // Remove the <defs>...<style>...</style>...</defs> block
  let result = svg.replace(/<defs>[\s\S]*?<\/defs>/gi, '')

  // Apply inline fill to elements with matching class attributes
  for (const [cls, fill] of fillMap) {
    result = result.replace(new RegExp(`class="${cls}"`, 'g'), `fill="${fill}"`)
  }

  return result
}

async function fetchSvgContent(url: string): Promise<string | null> {
  try {
    const absoluteUrl = url.startsWith('http')
      ? url
      : `${process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'}${url}`
    const res = await fetch(absoluteUrl)
    const text = await res.text()
    const svgStart = text.indexOf('<svg')
    if (svgStart === -1) return null
    // Strip anything before <svg (XML declarations, comments) that React can't handle
    // Then inline fill styles to avoid class name collisions between SVGs
    return inlineSvgFills(text.slice(svgStart))
  } catch {
    return null
  }
}

const COLLECTION_PREFIX: Record<string, string> = {
  pages: '/',
  'landing-pages': '/',
  solutions: '/solutions/',
}

function resolveHref(link: {
  linkType?: string | null
  page?: { relationTo: string; value: number | { slug: string } } | null
  href?: string | null
}): string {
  if (link.linkType === 'internal' && link.page) {
    const { relationTo, value } = link.page
    const slug = typeof value === 'object' ? value.slug : null
    if (slug) {
      const prefix = COLLECTION_PREFIX[relationTo] ?? '/'
      return `${prefix}${slug}`
    }
  }
  return link.href ?? '#'
}

function resolveColumns(columns: NonNullable<Awaited<ReturnType<typeof getFooter>>['columns']>) {
  return columns.map((col) => ({
    ...col,
    links:
      col.links?.map((link) => ({
        label: link.label,
        href: resolveHref(link as Parameters<typeof resolveHref>[0]),
        id: link.id,
      })) ?? [],
  }))
}

export async function Footer() {
  const footer = await getFooter()

  const logomark =
    typeof footer.logomark === 'object' && footer.logomark?.url ? footer.logomark : null
  const footerLogo =
    typeof footer.footerLogo === 'object' && footer.footerLogo?.url ? footer.footerLogo : null

  const [logomarkSvg, footerLogoSvg] = await Promise.all([
    logomark?.mimeType === 'image/svg+xml' && logomark.url ? fetchSvgContent(logomark.url) : null,
    footerLogo?.mimeType === 'image/svg+xml' && footerLogo.url
      ? fetchSvgContent(footerLogo.url)
      : null,
  ])

  return (
    <FooterMultiColumn
      bgStyle={footer.bgStyle ?? 'brand-black'}
      logomarkSvg={logomarkSvg}
      footerLogoSvg={footerLogoSvg}
      footerLogoAspectRatio={
        footerLogo?.width && footerLogo?.height
          ? footerLogo.height / footerLogo.width
          : 122.47 / 288
      }
      footerLogoClipPercent={footer.footerLogoClipPercent ?? 25}
      footerLogoColor={footer.footerLogoColor}
      footerLogoOpacity={footer.footerLogoOpacity}
      description={
        footer.description ??
        'ELLA turns trust into action with tools built for advisor-led transitions.'
      }
      columns={footer.columns ? resolveColumns(footer.columns) : null}
      newsletter={footer.newsletterSection}
      legalLinks={footer.legalLinks}
      copyrightText={footer.copyrightText ?? `© ELLA ${new Date().getFullYear()}`}
      statusBadgeHtml={footer.statusBadge?.enabled ? footer.statusBadge.embedHtml : null}
    />
  )
}
