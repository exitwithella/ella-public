import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import rules from '@/generated/redirects.json'
import { findRedirect, redirectLocation, type RedirectRule } from '@/lib/redirect-rules'

const redirectRules = rules as RedirectRule[]

// Middleware handles two things: legacy redirects from the generated rule
// list (no D1 on the request), and the /md content-negotiation block.
// Payload's admin UI handles unauthenticated users itself, so /admin is
// excluded from the matcher rather than redirected here.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/md/') || pathname === '/md') {
    const accept = req.headers.get('accept') ?? ''
    if (!accept.includes('text/markdown')) {
      return new Response(null, { status: 404 })
    }
    return NextResponse.next()
  }

  const match = findRedirect(redirectRules, pathname, req.headers.get('host') ?? '')
  if (match) {
    const location = redirectLocation(match, req.url)
    if (location) return NextResponse.redirect(location, match.status)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/|api(?:/|$)|admin(?:/|$)|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|css|js|map|txt|xml|woff2?)$).*)',
  ],
}
