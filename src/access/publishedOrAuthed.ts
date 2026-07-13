import type { Access } from 'payload'

/**
 * Read access for collections whose publish state is a `status` select
 * (`draft` | `published`).
 *
 * - Authenticated requests (admin UI, MCP agent) get full access — including
 *   drafts — so editing and previewing keep working.
 * - Unauthenticated requests (the public REST API) are constrained to
 *   `status: published`, so drafts never leak through `/api/{collection}`.
 *
 * Note: the frontend fetches content via the Local API with the default
 * `overrideAccess: true`, which bypasses this entirely — those queries filter
 * on `status` explicitly. This guard only governs the public REST surface.
 */
export const publishedOrAuthed: Access = ({ req: { user } }) => {
  if (user) return true
  return { status: { equals: 'published' } }
}
