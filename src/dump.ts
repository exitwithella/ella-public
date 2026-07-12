/**
 * Dump all Payload CMS content to JSON files for seeding / backup.
 *
 * Usage:  pnpm dump
 *
 * Outputs JSON files into src/seed-data/ — one per collection and global.
 * Relationships are stored as IDs (not populated objects) so the seed
 * script can resolve them in the correct order.
 *
 * Media file *blobs* are NOT included — only metadata. The actual files
 * live in R2 and must be migrated separately.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import 'dotenv/config'
import { getPayload } from 'payload'

import config from './payload.config'
import { GLOBAL_SLUGS } from './seed-manifest'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, 'seed-data')

// ── Helpers ──────────────────────────────────────────────────

function writeJSON(filename: string, data: unknown) {
  const filePath = path.join(outDir, filename)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n')
  console.log(`  ✓ ${filename}`)
}

/**
 * Strip Payload-internal fields that shouldn't be in seed data.
 * Keep id, createdAt, updatedAt so we can preserve ordering/timestamps.
 */
function stripInternals<T extends Record<string, unknown>>(doc: T): T {
  const copy = { ...doc }
  // Remove populated relationship objects — keep only IDs
  // Payload returns { id, ...fields } for depth:0 which is what we want
  delete copy.sizes // image sizes generated at upload time
  return copy
}

/** Fetch every document in a collection (paginated). */
async function fetchAll(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: string,
  sort?: string,
) {
  const allDocs: Record<string, unknown>[] = []
  let page = 1
  let hasMore = true

  while (hasMore) {
    const result = await payload.find({
      collection: collection as any,
      depth: 0, // IDs only, no populated relations
      limit: 100,
      page,
      sort: sort ?? 'id',
      pagination: true,
    })
    allDocs.push(...(result.docs as Record<string, unknown>[]))
    hasMore = result.hasNextPage
    page++
  }

  return allDocs.map(stripInternals)
}

// ── Main ─────────────────────────────────────────────────────

async function dump() {
  console.log('Connecting to Payload...\n')
  const payload = await getPayload({ config })

  // Ensure output directory exists
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  // ── Collections ──────────────────────────────────────────

  // Order matters: independent collections first, then those with relationships

  // 1. Independent collections (no foreign keys to other content)
  const independentCollections = [
    { slug: 'media', sort: 'id' },
    { slug: 'disciplines', sort: 'sortOrder' },
    { slug: 'categories', sort: 'sortOrder' },
    { slug: 'pricing-tiers', sort: 'sortOrder' },
    { slug: 'faq-items', sort: 'sortOrder' },
    { slug: 'redirects', sort: 'id' },
    { slug: 'vanguard-events', sort: 'id' },
    { slug: 'case-studies', sort: 'id' },
  ]

  console.log('Collections (independent):')
  for (const { slug, sort } of independentCollections) {
    const docs = await fetchAll(payload, slug, sort)
    writeJSON(`${slug}.json`, docs)
  }

  // 2. Collections with relationships to independent ones
  const dependentCollections = [
    { slug: 'partners', sort: 'sortOrder' },
    { slug: 'team-members', sort: 'sortOrder' },
    { slug: 'testimonials', sort: 'id' },
    { slug: 'tools', sort: 'id' },
    { slug: 'solutions', sort: 'id' },
  ]

  console.log('\nCollections (with relationships):')
  for (const { slug, sort } of dependentCollections) {
    const docs = await fetchAll(payload, slug, sort)
    writeJSON(`${slug}.json`, docs)
  }

  // 3. Content collections (pages, posts, landing pages)
  // These have blocks and rich text — the most complex data
  const contentCollections = [
    { slug: 'pages', sort: 'id' },
    { slug: 'posts', sort: 'id' },
    { slug: 'landing-pages', sort: 'id' },
  ]

  console.log('\nCollections (content):')
  for (const { slug, sort } of contentCollections) {
    const docs = await fetchAll(payload, slug, sort)
    writeJSON(`${slug}.json`, docs)
  }

  // ── Globals ──────────────────────────────────────────────

  console.log('\nGlobals:')
  for (const slug of GLOBAL_SLUGS) {
    const data = await payload.findGlobal({
      slug: slug as any,
      depth: 0,
    })
    const cleaned = stripInternals(data as Record<string, unknown>)
    writeJSON(`${slug}.json`, cleaned)
  }

  console.log('\nDump complete. Files written to src/seed-data/')
  process.exit(0)
}

dump().catch((err) => {
  console.error('Dump failed:', err)
  process.exit(1)
})
