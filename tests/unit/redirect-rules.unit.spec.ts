import { NextRequest } from 'next/server'
import { describe, expect, it } from 'vitest'

import committedRedirects from '@/generated/redirects.json'
import {
  buildRedirectRules,
  collectPages,
  findRedirect,
  redirectLocation,
  type RedirectRow,
} from '@/lib/redirect-rules'
import { middleware } from '@/middleware'

describe('buildRedirectRules', () => {
  it('keeps active 301 and 302 rows and drops inactive ones', () => {
    const rules = buildRedirectRules(
      [],
      [
        { from: '/a', to: '/b', type: '301', active: true, sourceDomain: 'withella' },
        { from: '/c', to: '/d', type: '302', active: true, sourceDomain: 'exitwithella' },
        { from: '/gone', to: '/away', type: '301', active: false, sourceDomain: 'withella' },
      ],
    )

    expect(rules).toEqual([
      { from: '/a', to: '/b', status: 301, sourceDomain: 'withella' },
      { from: '/c', to: '/d', status: 302, sourceDomain: 'exitwithella' },
    ])
  })

  it('reads type, not statusCode, and turns a full source URL into a path', () => {
    const row = {
      from: 'https://exitwithella.io/old-page/',
      to: '/new-page',
      active: true,
      sourceDomain: 'exitwithella',
      statusCode: 302,
    } as RedirectRow & { statusCode: number }

    expect(buildRedirectRules([], [row])).toEqual([
      { from: '/old-page', to: '/new-page', status: 301, sourceDomain: 'exitwithella' },
    ])
  })

  it('skips rows missing from or to', () => {
    expect(
      buildRedirectRules(
        [],
        [
          { from: '', to: '/x', active: true },
          { from: '/y', to: '  ', active: true },
          { from: null, to: '/z', active: true },
        ],
      ),
    ).toEqual([])
  })

  it('emits published legacy blog paths and skips identical or unpublished posts', () => {
    const rules = buildRedirectRules(
      [
        { legacySlug: 'old-name', slug: 'new-name', status: 'published' },
        { legacySlug: 'same', slug: 'same', status: 'published' },
        { legacySlug: 'draft-old', slug: 'draft-new', status: 'draft' },
        { legacySlug: null, slug: 'no-legacy', status: 'published' },
      ],
      [],
    )

    expect(rules).toEqual([
      { from: '/blog/old-name', to: '/blog/new-name', status: 301, sourceDomain: 'any' },
    ])
  })

  it('paginates past a single page', async () => {
    const docs = await collectPages(async (page) => {
      if (page === 1) return { docs: ['a'], hasNextPage: true }
      if (page === 2) return { docs: ['b'], hasNextPage: false }
      throw new Error(`unexpected page ${page}`)
    })
    expect(docs).toEqual(['a', 'b'])
  })
})

describe('findRedirect', () => {
  const rules = buildRedirectRules(
    [{ legacySlug: 'old-name', slug: 'new-name', status: 'published' }],
    [
      { from: '/pricing-old', to: '/pricing', type: '301', active: true, sourceDomain: 'withella' },
      {
        from: '/pricing-old',
        to: '/exit-pricing',
        type: '302',
        active: true,
        sourceDomain: 'exitwithella',
      },
      { from: '/first', to: '/winner', type: '301', active: true, sourceDomain: 'withella' },
      { from: '/first', to: '/loser', type: '302', active: true, sourceDomain: 'withella' },
    ],
  )

  it('selects exitwithella vs withella hosts, including www', () => {
    expect(findRedirect(rules, '/pricing-old', 'www.withella.io')?.to).toBe('/pricing')
    expect(findRedirect(rules, '/pricing-old', 'withella.io')?.status).toBe(301)
    expect(findRedirect(rules, '/pricing-old', 'www.exitwithella.io')?.to).toBe('/exit-pricing')
    expect(findRedirect(rules, '/pricing-old', 'exitwithella.io')?.status).toBe(302)
  })

  it('applies a legacy blog 301 on either host', () => {
    expect(findRedirect(rules, '/blog/old-name', 'www.withella.io')).toMatchObject({
      to: '/blog/new-name',
      status: 301,
    })
    expect(findRedirect(rules, '/blog/old-name', 'www.exitwithella.io')?.to).toBe('/blog/new-name')
  })

  it('is first-match and does not run for /admin or /api', () => {
    expect(findRedirect(rules, '/first', 'withella.io')?.to).toBe('/winner')
    expect(findRedirect(rules, '/admin', 'withella.io')).toBeNull()
    expect(findRedirect(rules, '/admin/collections', 'withella.io')).toBeNull()
    expect(findRedirect(rules, '/api', 'withella.io')).toBeNull()
    expect(findRedirect(rules, '/api/posts', 'withella.io')).toBeNull()
  })

  it('builds an absolute location from a path rule', () => {
    const match = findRedirect(rules, '/pricing-old', 'www.withella.io')
    expect(match).not.toBeNull()
    expect(redirectLocation(match!, 'https://www.withella.io/pricing-old')).toBe(
      'https://www.withella.io/pricing',
    )
  })
})

describe('middleware', () => {
  it('imports the committed rule list', () => {
    expect(Array.isArray(committedRedirects)).toBe(true)
  })

  it('still blocks /md unless the client accepts markdown', async () => {
    const blocked = await middleware(new NextRequest('https://withella.io/md/about'))
    expect(blocked.status).toBe(404)

    const allowed = await middleware(
      new NextRequest('https://withella.io/md/about', {
        headers: { accept: 'text/markdown' },
      }),
    )
    expect(allowed.status).toBe(200)
  })

  it('does not redirect when the committed list has no matching rule', async () => {
    const response = await middleware(
      new NextRequest('https://withella.io/blog/old-name', { headers: { host: 'withella.io' } }),
    )
    expect(response.headers.get('location')).toBeNull()
  })
})
