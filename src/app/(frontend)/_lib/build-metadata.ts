import type { Metadata } from 'next'

import type { Media } from '@/payload-types'

import { siteConfig } from './content'
import { getSiteSettings } from './get-site-settings'

type PageInput = {
  /**
   * Per-page title. If omitted, the site-wide defaultTitle is used.
   * String values are wrapped by the site-wide titleTemplate unless `titleAbsolute` is true.
   */
  title?: string | null
  /** Per-page description. Falls back to site-wide defaultDescription. */
  description?: string | null
  /**
   * Per-page Open Graph image. Accepts a populated Media object or a numeric ID
   * (unpopulated references are treated as absent). Falls back to site-wide ogImage.
   */
  image?: Media | number | null
  /** Path relative to site root (e.g. '/', '/pricing', '/blog/my-post'). */
  path: string
  /** OpenGraph type. Defaults to 'website'. */
  type?: 'website' | 'article'
  /** ISO timestamp for article publishedTime. */
  publishedAt?: string
  /** ISO timestamp for article modifiedTime. */
  modifiedAt?: string
  /** Per-page author name for article schema. */
  author?: string
  /** Emit robots noindex. */
  noindex?: boolean
  /**
   * When true, the resolved title bypasses the site-wide titleTemplate.
   * Used by the homepage so 'ELLA | Practice Systematization...' isn't double-wrapped.
   */
  titleAbsolute?: boolean
}

function resolveImageUrl(image: Media | number | null | undefined): string | undefined {
  if (!image || typeof image === 'number') return undefined
  return image.url ?? undefined
}

/**
 * Metadata for the root layout. Establishes the site-wide title template, default
 * OG defaults, metadataBase, and icon references. Per-page generateMetadata calls
 * inherit these and override as needed.
 */
export async function buildRootMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const defaultOgUrl = resolveImageUrl(settings.ogImage as Media | number | null | undefined)
  const twitterHandle = settings.twitterHandle?.trim() || undefined

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: settings.defaultTitle ?? siteConfig.name,
      template: settings.titleTemplate || '%s',
    },
    description: settings.defaultDescription ?? undefined,
    openGraph: {
      type: 'website',
      siteName: settings.siteName ?? siteConfig.name,
      url: siteConfig.url,
      title: settings.defaultTitle ?? siteConfig.name,
      description: settings.defaultDescription ?? undefined,
      images: defaultOgUrl ? [{ url: defaultOgUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.defaultTitle ?? siteConfig.name,
      description: settings.defaultDescription ?? undefined,
      site: twitterHandle,
      creator: twitterHandle,
      images: defaultOgUrl ? [defaultOgUrl] : undefined,
    },
  }
}

/**
 * Per-page metadata. Merges site-wide defaults from SiteSettings with per-page overrides.
 * Always returns a canonical URL, OG tags, and Twitter card tags.
 */
export async function buildPageMetadata(input: PageInput): Promise<Metadata> {
  const settings = await getSiteSettings()

  const resolvedTitle = input.title?.trim() || settings.defaultTitle || siteConfig.name
  const resolvedDescription = input.description?.trim() || settings.defaultDescription || undefined
  const resolvedImageUrl =
    resolveImageUrl(input.image) ??
    resolveImageUrl(settings.ogImage as Media | number | null | undefined)
  const twitterHandle = settings.twitterHandle?.trim() || undefined
  const absoluteUrl = new URL(input.path, siteConfig.url).toString()

  const ogType = input.type ?? 'website'

  return {
    title: input.titleAbsolute ? { absolute: resolvedTitle } : resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: absoluteUrl,
    },
    robots: input.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: ogType,
      siteName: settings.siteName ?? siteConfig.name,
      url: absoluteUrl,
      title: resolvedTitle,
      description: resolvedDescription,
      images: resolvedImageUrl ? [{ url: resolvedImageUrl, width: 1200, height: 630 }] : undefined,
      ...(ogType === 'article' && {
        publishedTime: input.publishedAt,
        modifiedTime: input.modifiedAt,
        authors: input.author ? [input.author] : undefined,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      site: twitterHandle,
      creator: twitterHandle,
      images: resolvedImageUrl ? [resolvedImageUrl] : undefined,
    },
  }
}
