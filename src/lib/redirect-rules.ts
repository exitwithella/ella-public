export type RedirectSource = 'withella' | 'exitwithella' | 'any'

export type RedirectStatus = 301 | 302

export interface RedirectRule {
  from: string
  to: string
  status: RedirectStatus
  sourceDomain: RedirectSource
}

export interface LegacyPostRow {
  legacySlug?: string | null
  slug?: string | null
  status?: string | null
}

export interface RedirectRow {
  from?: string | null
  to?: string | null
  type?: string | null
  active?: boolean | null
  sourceDomain?: string | null
}

export async function collectPages<T>(
  fetchPage: (page: number) => Promise<{ docs: T[]; hasNextPage?: boolean | null }>,
): Promise<T[]> {
  const docs: T[] = []
  let page = 1
  for (;;) {
    // Pages are ordered: the next request depends on hasNextPage from this one.
    // oxlint-disable-next-line no-await-in-loop
    const result = await fetchPage(page)
    docs.push(...result.docs)
    if (!result.hasNextPage) return docs
    page += 1
  }
}

function normalizePath(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return null

  let path = trimmed
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      path = new URL(trimmed).pathname
    } catch {
      return null
    }
  }

  if (!path.startsWith('/')) path = `/${path}`
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1)
  return path
}

function destination(value: string): string | null {
  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

function statusFromType(type: string | null | undefined): RedirectStatus {
  return type === '302' ? 302 : 301
}

function sourceFromRow(sourceDomain: string | null | undefined): Exclude<RedirectSource, 'any'> {
  return sourceDomain === 'exitwithella' ? 'exitwithella' : 'withella'
}

function legacyPostRule(post: LegacyPostRow): RedirectRule | null {
  if (post.status !== 'published') return null
  const legacySlug = post.legacySlug?.trim()
  const slug = post.slug?.trim()
  if (!legacySlug || !slug) return null

  const from = normalizePath(`/blog/${legacySlug}`)
  const to = normalizePath(`/blog/${slug}`)
  if (!from || !to || from === to) return null

  return { from, to, status: 301, sourceDomain: 'any' }
}

function redirectRowRule(row: RedirectRow): RedirectRule | null {
  if (row.active === false) return null
  if (!row.from || !row.to) return null

  const from = normalizePath(row.from)
  const to = destination(row.to)
  if (!from || !to) return null

  return {
    from,
    to,
    status: statusFromType(row.type),
    sourceDomain: sourceFromRow(row.sourceDomain),
  }
}

export function buildRedirectRules(
  posts: LegacyPostRow[],
  redirects: RedirectRow[],
): RedirectRule[] {
  const rules: RedirectRule[] = []
  for (const post of posts) {
    const rule = legacyPostRule(post)
    if (rule) rules.push(rule)
  }
  for (const row of redirects) {
    const rule = redirectRowRule(row)
    if (rule) rules.push(rule)
  }
  return rules
}

export function isRedirectLookupPath(pathname: string): boolean {
  if (pathname === '/api' || pathname.startsWith('/api/')) return false
  if (pathname === '/admin' || pathname.startsWith('/admin/')) return false
  if (pathname === '/_next' || pathname.startsWith('/_next/')) return false
  return true
}

function hostMatches(sourceDomain: RedirectSource, host: string): boolean {
  switch (sourceDomain) {
    case 'any':
      return true
    case 'exitwithella':
      return host.toLowerCase().includes('exitwithella')
    case 'withella':
      return !host.toLowerCase().includes('exitwithella')
    default: {
      const unreachable: never = sourceDomain
      return unreachable
    }
  }
}

/** First rule whose path and host both match. /admin, /api, and /_next never match. */
export function findRedirect(
  rules: readonly RedirectRule[],
  pathname: string,
  host: string,
): RedirectRule | null {
  if (!isRedirectLookupPath(pathname)) return null
  const path = normalizePath(pathname)
  if (!path) return null

  for (const rule of rules) {
    if (rule.from === path && hostMatches(rule.sourceDomain, host)) return rule
  }
  return null
}

export function redirectLocation(rule: RedirectRule, requestUrl: string): string | null {
  try {
    return new URL(rule.to, requestUrl).toString()
  } catch {
    return null
  }
}
