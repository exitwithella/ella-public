/**
 * Single source of truth for Next.js cache tags.
 *
 * Content fetchers (`_lib/get-*.ts`, `blog/_lib/get-posts.ts`) tag their
 * `unstable_cache` entries with these; Payload collection/global hooks fire the
 * same tags on write; and `/api/revalidate-all` derives its full list from
 * `ALL_CACHE_TAGS`. Keeping them here means a tag is spelled exactly once.
 */
export const CACHE_TAGS = {
  navigation: 'navigation',
  footer: 'footer',
  siteSettings: 'site-settings',
  scriptInjection: 'script-injection',
  pages: 'pages',
  posts: 'posts',
  categories: 'categories',
  solutions: 'solutions',
  pricing: 'pricing',
} as const

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS]

/** Every registered tag — the canonical list for revalidate-all. */
export const ALL_CACHE_TAGS: CacheTag[] = Object.values(CACHE_TAGS)
