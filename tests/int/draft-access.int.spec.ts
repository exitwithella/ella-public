import config from '@payload-config'
import type { Payload, TypedUser } from 'payload'
import { getPayload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

/**
 * MKT-175 — draft content must not leak through the public REST surface.
 *
 * The frontend queries via the Local API with `overrideAccess: true`, so it
 * bypasses access control and filters `status` explicitly. The public REST
 * API (`/api/pages`) runs with `overrideAccess: false` and the request's user,
 * which is what `publishedOrAuthed` guards. These tests exercise that guard
 * directly by toggling `overrideAccess`/`user` on the Local API.
 */

const stamp = Date.now()
const draftSlug = `mkt175-draft-${stamp}`
const publishedSlug = `mkt175-published-${stamp}`

let payload: Payload
let user: TypedUser
let draftId: number | string
let publishedId: number | string

describe('draft page access control (MKT-175)', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })

    user = (await payload.create({
      collection: 'users',
      data: {
        email: `mkt175-${stamp}@example.com`,
        password: 'test-password-1234',
      },
    })) as unknown as TypedUser

    const draft = await payload.create({
      collection: 'pages',
      data: {
        title: 'MKT-175 Draft',
        slug: draftSlug,
        status: 'draft',
        hero: { headline: 'Draft' },
      },
    })
    draftId = draft.id

    const published = await payload.create({
      collection: 'pages',
      data: {
        title: 'MKT-175 Published',
        slug: publishedSlug,
        status: 'published',
        hero: { headline: 'Published' },
      },
    })
    publishedId = published.id
  })

  afterAll(async () => {
    await Promise.all([
      draftId && payload.delete({ collection: 'pages', id: draftId }),
      publishedId && payload.delete({ collection: 'pages', id: publishedId }),
      user?.id && payload.delete({ collection: 'users', id: user.id }),
    ])
  })

  it('hides draft pages from unauthenticated (public REST) reads', async () => {
    const res = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      where: { slug: { equals: draftSlug } },
    })
    expect(res.docs).toHaveLength(0)
  })

  it('serves published pages to unauthenticated reads', async () => {
    const res = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      where: { slug: { equals: publishedSlug } },
    })
    expect(res.docs).toHaveLength(1)
  })

  it('still exposes drafts to authenticated (admin/MCP) reads', async () => {
    const res = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      user,
      where: { slug: { equals: draftSlug } },
    })
    expect(res.docs).toHaveLength(1)
  })
})
