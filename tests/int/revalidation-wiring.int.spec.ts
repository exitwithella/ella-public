import config from '@payload-config'
import type { Payload } from 'payload'
import { getPayload } from 'payload'
import { beforeAll, describe, expect, it } from 'vitest'

/**
 * MKT-219 — guards the revalidation wiring that was previously missing:
 * the `pricing` tag was never fired, deletes weren't handled, and
 * relationship-embedded collections revalidated nothing. Introspects the
 * sanitized runtime config rather than mocking anything.
 */

let payload: Payload

const collectionHooks = (slug: string) => {
  const c = payload.config.collections.find((col) => col.slug === slug)
  if (!c) throw new Error(`collection ${slug} not found`)
  return {
    afterChange: c.hooks?.afterChange ?? [],
    afterDelete: c.hooks?.afterDelete ?? [],
  }
}

describe('cache revalidation wiring (MKT-219)', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })
  })

  it('fires a revalidate hook for pricing data (tiers, faq, global)', () => {
    expect(collectionHooks('pricing-tiers').afterChange.length).toBeGreaterThan(0)
    expect(collectionHooks('faq-items').afterChange.length).toBeGreaterThan(0)

    const pricingGlobal = payload.config.globals.find((g) => g.slug === 'pricing-page')
    expect(pricingGlobal?.hooks?.afterChange?.length ?? 0).toBeGreaterThan(0)
  })

  it('handles deletes on content collections', () => {
    for (const slug of ['pages', 'posts', 'solutions', 'categories']) {
      expect(collectionHooks(slug).afterDelete.length).toBeGreaterThan(0)
    }
  })

  it('revalidates when relationship-embedded collections change', () => {
    for (const slug of ['testimonials', 'partners', 'team-members']) {
      const hooks = collectionHooks(slug)
      expect(hooks.afterChange.length).toBeGreaterThan(0)
      expect(hooks.afterDelete.length).toBeGreaterThan(0)
    }
  })
})
