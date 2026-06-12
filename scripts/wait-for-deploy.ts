/**
 * Waits until production is serving the current commit's worker.
 *
 * Used by .github/workflows/post-deploy-smoke.yml between "code was pushed"
 * and "run smoke tests against production." Two signals are polled in lockstep:
 *
 *  - /api/release: returns the git SHA the live worker was built from. When
 *    it equals $GITHUB_SHA, the deploy is live and we exit 0.
 *
 *  - GitHub check-runs for $GITHUB_SHA: if Cloudflare's Workers Builds check
 *    reports `failure`, `cancelled`, or `timed_out`, the build never made it
 *    to deploy. Fail fast instead of waiting the full timeout.
 *
 * Hard timeout: 8 minutes. The job's `timeout-minutes: 12` is the outer
 * safety net.
 */

const SHA = mustEnv('GITHUB_SHA')
const REPO = process.env.GITHUB_REPOSITORY
const GH_TOKEN = process.env.GITHUB_TOKEN
const RELEASE_URL = process.env.RELEASE_URL ?? 'https://withella.io/api/release'

const TIMEOUT_MS = 8 * 60 * 1000
const POLL_INTERVAL_MS = 10_000
const FETCH_TIMEOUT_MS = 8_000

function mustEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    console.error(`Missing required env: ${name}`)
    process.exit(2)
  }
  return value
}

type CheckConclusion =
  | 'success'
  | 'failure'
  | 'cancelled'
  | 'timed_out'
  | 'neutral'
  | 'skipped'
  | 'action_required'
  | 'stale'
  | null

interface CheckRun {
  name: string
  status: 'queued' | 'in_progress' | 'completed'
  conclusion: CheckConclusion
  app?: { slug?: string; name?: string }
}

async function fetchWithTimeout(url: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    return await fetch(url, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

async function getLiveSha(): Promise<string | null> {
  try {
    const res = await fetchWithTimeout(RELEASE_URL, {
      headers: { accept: 'application/json', 'cache-control': 'no-cache' },
    })
    if (!res.ok) return null
    const body = (await res.json()) as { sha?: string }
    return body.sha ?? null
  } catch {
    return null
  }
}

async function getCloudflareCheckStatus(): Promise<{
  conclusion: CheckConclusion
  name: string
} | null> {
  if (!REPO || !GH_TOKEN) return null
  try {
    const res = await fetchWithTimeout(
      `https://api.github.com/repos/${REPO}/commits/${SHA}/check-runs?per_page=100`,
      {
        headers: {
          authorization: `Bearer ${GH_TOKEN}`,
          accept: 'application/vnd.github+json',
          'x-github-api-version': '2022-11-28',
        },
      },
    )
    if (!res.ok) return null
    const body = (await res.json()) as { check_runs: CheckRun[] }
    // Filter out our own GitHub Actions checks and look for Cloudflare-managed ones.
    const cfCheck = body.check_runs.find((c) => {
      const slug = c.app?.slug ?? ''
      const name = c.name ?? ''
      if (slug === 'github-actions') return false
      return /cloudflare|workers|deploy/i.test(`${slug} ${name}`)
    })
    if (!cfCheck) return null
    return { conclusion: cfCheck.conclusion, name: cfCheck.name }
  } catch {
    return null
  }
}

function isTerminalFailure(c: CheckConclusion): boolean {
  return c === 'failure' || c === 'cancelled' || c === 'timed_out' || c === 'action_required'
}

const start = Date.now()
const startedAt = new Date().toISOString()
console.log(`[${startedAt}] Waiting for ${SHA} to go live at ${RELEASE_URL}`)

let attempt = 0
while (Date.now() - start < TIMEOUT_MS) {
  attempt++
  const elapsedSec = Math.round((Date.now() - start) / 1000)

  const [liveSha, cfStatus] = await Promise.all([getLiveSha(), getCloudflareCheckStatus()])

  if (liveSha === SHA) {
    console.log(`[+${elapsedSec}s] Live SHA matches ${SHA} — deploy is serving traffic.`)
    process.exit(0)
  }

  if (cfStatus && isTerminalFailure(cfStatus.conclusion)) {
    console.error(
      `[+${elapsedSec}s] Cloudflare build check "${cfStatus.name}" reported ${cfStatus.conclusion}. ` +
        `New worker never deployed — nothing to roll back to. Exiting non-zero.`,
    )
    process.exit(1)
  }

  console.log(
    `[+${elapsedSec}s] attempt ${attempt} | live=${liveSha ?? '?'} expected=${SHA.slice(0, 8)} | cf=${cfStatus ? `${cfStatus.name}:${cfStatus.conclusion ?? 'in_progress'}` : 'pending'}`,
  )
  await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS))
}

console.error(
  `Timed out after ${TIMEOUT_MS / 1000}s waiting for ${SHA} to go live. ` +
    `Cloudflare build may be stuck; investigate at https://dash.cloudflare.com.`,
)
process.exit(1)

export {}
