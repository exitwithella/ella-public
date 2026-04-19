import { verifyToken } from '@clerk/backend'
import type { AuthStrategy } from 'payload'

const ALLOWED_DOMAINS = process.env.CLERK_ALLOWED_DOMAINS?.split(',') ?? []

export const clerkStrategy: AuthStrategy = {
  name: 'clerk',
  authenticate: async ({ headers, payload: payloadInstance }) => {
    const cookieHeader = headers.get('cookie') ?? ''
    const match = cookieHeader.match(/__session=([^;]+)/)
    if (!match) return { user: null }

    try {
      const decoded = await verifyToken(match[1], {
        secretKey: process.env.CLERK_SECRET_KEY!,
        authorizedParties: [process.env.SITE_URL!],
      })

      if (!decoded?.sub) return { user: null }

      // Server-side domain enforcement (defense-in-depth)
      const email = decoded.email as string | undefined
      if (
        ALLOWED_DOMAINS.length > 0 &&
        email &&
        !ALLOWED_DOMAINS.some((d) => email.endsWith(`@${d}`))
      ) {
        console.log(
          JSON.stringify({
            event: 'clerk_auth_domain_rejected',
            email,
            clerkId: decoded.sub,
          }),
        )
        return { user: null }
      }

      const { docs } = await payloadInstance.find({
        collection: 'users',
        where: { clerkId: { equals: decoded.sub } },
        limit: 1,
        depth: 0,
      })

      if (!docs.length) {
        console.log(
          JSON.stringify({
            event: 'clerk_auth_no_payload_user',
            clerkId: decoded.sub,
          }),
        )
        return { user: null }
      }

      console.log(
        JSON.stringify({
          event: 'clerk_auth_success',
          userId: docs[0].id,
          clerkId: decoded.sub,
        }),
      )

      return {
        user: { ...docs[0], collection: 'users', _strategy: 'clerk' },
      }
    } catch (err) {
      console.log(
        JSON.stringify({
          event: 'clerk_auth_error',
          error: err instanceof Error ? err.message : 'unknown',
        }),
      )
      return { user: null }
    }
  },
}
