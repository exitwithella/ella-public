import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Middleware purpose, now that Clerk is disabled: only handle the /md
// content-negotiation block. Payload's admin UI handles unauthenticated
// users itself (it renders the login screen), so we don't need to gate
// /admin here — and doing so previously caused a redirect loop because
// PAYLOAD_SECRET wasn't reliably available in the middleware context.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // /md routes: block direct access, allow requests via Accept header rewrite
  if (pathname.startsWith('/md/') || pathname === '/md') {
    const accept = req.headers.get('accept') ?? ''
    if (!accept.includes('text/markdown')) {
      return new Response(null, { status: 404 })
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/md', '/md/:path*'],
}
