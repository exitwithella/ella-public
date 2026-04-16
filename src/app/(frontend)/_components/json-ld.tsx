import type { Media, Post, SiteSetting, TeamMember } from '@/payload-types'

import { siteConfig } from '../_lib/content'

type JsonLdProps =
  | { variant: 'organization'; settings: SiteSetting }
  | { variant: 'website'; settings: SiteSetting }
  | { variant: 'article'; post: Post; settings: SiteSetting }

function resolveImageUrl(image: Media | number | null | undefined): string | undefined {
  if (!image || typeof image === 'number') return undefined
  return image.url ?? undefined
}

function buildOrganization(settings: SiteSetting) {
  const org = settings.organizationSchema
  const social = settings.socialLinks

  const sameAs = [
    social?.linkedIn,
    social?.twitter,
    social?.youtube,
    ...(org?.sameAs?.map((entry) => entry.url) ?? []),
  ].filter((url): url is string => Boolean(url?.trim()))

  const logoUrl =
    resolveImageUrl(settings.logo as Media | number | null | undefined) ??
    resolveImageUrl(settings.logomark as Media | number | null | undefined)

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.siteName ?? siteConfig.name,
    ...(org?.legalName && { legalName: org.legalName }),
    url: siteConfig.url,
    ...(logoUrl && { logo: logoUrl }),
    ...(org?.foundingDate && { foundingDate: org.foundingDate }),
    ...(sameAs.length > 0 && { sameAs }),
  }
}

function buildWebSite(settings: SiteSetting) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: settings.siteName ?? siteConfig.name,
    url: siteConfig.url,
    ...(settings.defaultDescription && { description: settings.defaultDescription }),
  }
}

function buildArticle(post: Post, settings: SiteSetting) {
  const image =
    resolveImageUrl(post.meta?.image as Media | number | null | undefined) ??
    resolveImageUrl(post.featuredImage as Media | number | null | undefined) ??
    resolveImageUrl(settings.ogImage as Media | number | null | undefined)

  const authorName =
    post.author && typeof post.author === 'object' ? (post.author as TeamMember).name : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.meta?.title || post.title,
    ...(post.meta?.description || post.excerpt
      ? { description: post.meta?.description || post.excerpt }
      : {}),
    ...(image && { image: [image] }),
    datePublished: post.publishedDate,
    dateModified: post.updatedAt,
    ...(authorName && {
      author: {
        '@type': 'Person',
        name: authorName,
      },
    }),
    publisher: {
      '@type': 'Organization',
      name: settings.siteName ?? siteConfig.name,
      url: siteConfig.url,
    },
  }
}

/**
 * Emits a JSON-LD <script> tag for structured data. Uses React's native child rendering
 * for <script> elements — safe because the payload is produced by JSON.stringify (which
 * escapes all string values) and the `</` sequence is further escaped to defend against
 * content containing `</script>`.
 */
export function JsonLd(props: JsonLdProps) {
  let payload: Record<string, unknown>

  switch (props.variant) {
    case 'organization':
      payload = buildOrganization(props.settings)
      break
    case 'website':
      payload = buildWebSite(props.settings)
      break
    case 'article':
      payload = buildArticle(props.post, props.settings)
      break
  }

  const serialized = JSON.stringify(payload).replace(/</g, '\\u003c')

  return <script type="application/ld+json">{serialized}</script>
}
