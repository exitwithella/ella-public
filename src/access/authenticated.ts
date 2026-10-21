import type { Access } from 'payload'

/**
 * Authenticated-only access. Used for `readVersions`: versions are on by
 * default in Payload 4, and a public `read` would otherwise publish the
 * history API.
 */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)
