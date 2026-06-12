export const dynamic = 'force-dynamic'

export function GET() {
  return Response.json(
    {
      sha: process.env.BUILD_GIT_SHA ?? 'unknown',
      builtAt: process.env.BUILD_TIME ?? null,
    },
    {
      headers: {
        // Must not be cached — the post-deploy smoke workflow polls this to
        // detect when a new version is live. A cached response would make it
        // poll forever against a stale SHA.
        'cache-control': 'no-store, must-revalidate',
        'cdn-cache-control': 'no-store',
      },
    },
  )
}
