/**
 * Next.js instrumentation hook. Runs on the server (Workers runtime in
 * production). `onRequestError` captures unhandled exceptions from any
 * server-side request — route handlers, RSC, middleware — and logs them
 * with full stack + request context. Cloudflare's invocation logs only
 * show the request envelope by default; without this, swallowed errors
 * surface as bare 500s with no trace.
 */
import type { Instrumentation } from 'next'

export const onRequestError: Instrumentation.onRequestError = (error, request, context) => {
  const err = error as Error & { digest?: string; cause?: unknown }
  console.error(
    JSON.stringify({
      event: 'next_request_error',
      path: request.path,
      method: request.method,
      routerKind: context.routerKind,
      routeType: context.routeType,
      routePath: context.routePath,
      errorName: err.name,
      errorMessage: err.message,
      digest: err.digest,
      stack: err.stack,
      cause: err.cause ? String(err.cause) : undefined,
    }),
  )
}

export function register() {
  // No-op. The presence of this file enables onRequestError.
}
