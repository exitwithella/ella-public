import { createRemoteJWKSet, jwtVerify } from 'jose'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Clerk's JWKS endpoint — derived from the publishable key's frontend API domain
// Format: pk_test_<base64-encoded-domain> or pk_live_<base64-encoded-domain>
function getClerkJwksUrl(): URL {
  const pk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ''
  // Extract the base64-encoded domain from the key (after pk_test_ or pk_live_)
  const encodedDomain = pk.replace(/^pk_(test|live)_/, '')
  const domain = atob(encodedDomain).replace(/\$$/, '')
  return new URL(`https://${domain}/.well-known/jwks.json`)
}

// Lazily initialized — JWKS keys are cached by jose
let clerkJwks: ReturnType<typeof createRemoteJWKSet> | null = null
function getClerkJwks() {
  if (!clerkJwks) {
    clerkJwks = createRemoteJWKSet(getClerkJwksUrl())
  }
  return clerkJwks
}

async function verifyPayloadToken(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(process.env.PAYLOAD_SECRET)
    await jwtVerify(token, secret)
    return true
  } catch {
    return false
  }
}

async function verifyClerkToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getClerkJwks())
    // Validate authorized party matches our app
    const azp = payload.azp as string | undefined
    const expectedOrigin = process.env.SITE_URL
    if (azp && expectedOrigin && azp !== expectedOrigin) {
      console.log(
        JSON.stringify({
          event: 'proxy_clerk_azp_mismatch',
          azp,
          expected: expectedOrigin,
        }),
      )
      return false
    }
    return true
  } catch {
    return false
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  // /md routes: block direct access, allow requests via Accept header rewrite
  if (pathname.startsWith('/md/') || pathname === '/md') {
    const accept = req.headers.get('accept') ?? ''
    if (!accept.includes('text/markdown')) {
      return new Response(null, { status: 404 })
    }
    return NextResponse.next()
  }

  // Don't protect the login page or API routes
  if (pathname === '/admin/login' || pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Try Payload JWT first (email/password fallback)
  const payloadToken = req.cookies.get('payload-token')?.value
  if (payloadToken && (await verifyPayloadToken(payloadToken))) {
    return NextResponse.next()
  }

  // Try Clerk session
  const clerkToken = req.cookies.get('__session')?.value
  if (clerkToken && (await verifyClerkToken(clerkToken))) {
    return NextResponse.next()
  }

  // No valid session — redirect to login
  console.log(
    JSON.stringify({
      event: 'proxy_auth_rejected',
      path: req.nextUrl.pathname,
    }),
  )
  return NextResponse.redirect(new URL('/admin/login', req.url))
}

export const config = {
  matcher: ['/admin/:path*', '/md', '/md/:path*'],
}
