import { FooterMultiColumn } from '@/components/sections/footer-multi-column'

import { getFooter } from '../_lib/get-footer'
import { fetchSvgContent } from '../_lib/svg'

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
    logomark?.mimeType === 'image/svg+xml' && logomark.url
      ? fetchSvgContent(logomark.filename, logomark.url)
      : null,
    footerLogo?.mimeType === 'image/svg+xml' && footerLogo.url
      ? fetchSvgContent(footerLogo.filename, footerLogo.url)
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
