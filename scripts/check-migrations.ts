import { spawnSync } from 'node:child_process'
/**
 * Pre-deploy schema drift check.
 *
 * Runs `payload migrate:create --skip-empty` against the current code +
 * latest .json snapshot in src/migrations. If a new migration file would be
 * generated, schema drift exists — fail the build and tell the developer to
 * run `pnpm payload migrate:create` locally and commit the result.
 *
 * Why this exists: `pushDevSchema` silently keeps the local D1 in sync with
 * the collections in code, but remote D1 only gets schema changes through
 * committed migrations. It's easy to add a field, see it work locally, and
 * push without a migration — production then 500s on every write to that
 * table. We had exactly this happen with `users.clerk_id`.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const migrationsDir = path.resolve(__dirname, '..', 'src', 'migrations')
const SENTINEL = '__pre_deploy_drift_check__'

function listMigrations(): Set<string> {
  if (!fs.existsSync(migrationsDir)) return new Set()
  return new Set(fs.readdirSync(migrationsDir))
}

function cleanSentinel(): void {
  if (!fs.existsSync(migrationsDir)) return
  for (const name of fs.readdirSync(migrationsDir)) {
    if (name.includes(SENTINEL)) {
      fs.rmSync(path.join(migrationsDir, name))
    }
  }
}

const before = listMigrations()

const result = spawnSync(
  'npx',
  ['payload', 'migrate:create', SENTINEL, '--skip-empty', '--force-accept-warning'],
  {
    stdio: 'inherit',
    env: {
      // Inherit NODE_ENV from the parent (Cloudflare Workers Builds sets it
      // to production; local dev leaves it unset). Forcing it here would
      // make payload.config.ts try to use remote Cloudflare bindings, which
      // requires Cloudflare API auth that we don't have at drift-check time.
      ...process.env,
      NODE_OPTIONS: '--no-deprecation',
      PAYLOAD_SECRET: process.env.PAYLOAD_SECRET || 'ignore',
    },
  },
)

if (result.status !== 0) {
  cleanSentinel()
  console.error('Schema drift check failed to run (payload migrate:create errored).')
  process.exit(result.status ?? 1)
}

const after = listMigrations()
const newFiles = [...after].filter((name) => !before.has(name))
cleanSentinel()

if (newFiles.length > 0) {
  console.error('')
  console.error('Schema drift detected — uncommitted schema changes in code.')
  console.error('')
  console.error('Run this locally:')
  console.error('  NODE_OPTIONS=--no-deprecation pnpm payload migrate:create')
  console.error('then commit the new files under src/migrations/.')
  process.exit(1)
}

console.log('Schema in sync — no new migration needed.')
