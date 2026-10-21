/**
 * Writes src/generated/redirects.json from published legacy post slugs and
 * the Redirects collection. cf:build runs this with REMOTE_BINDINGS=true
 * after migrations. pnpm build and pnpm dev do not.
 *
 * Workers static assets do not apply public/_redirects to HTML served by
 * the OpenNext worker, so middleware reads this file instead.
 */
import 'dotenv/config'
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as url from 'node:url'

import { getPayload } from 'payload'

import { buildRedirectRules, collectPages } from '../src/lib/redirect-rules'
import config from '../src/payload.config'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const OUTPUT = path.join(__dirname, '..', 'src', 'generated', 'redirects.json')

async function generateRedirects() {
  const payload = await getPayload({ config })

  const posts = await collectPages((page) =>
    payload.find({
      collection: 'posts',
      depth: 0,
      limit: 100,
      page,
      where: {
        legacySlug: { exists: true },
        status: { equals: 'published' },
      },
    }),
  )

  const redirects = await collectPages((page) =>
    payload.find({
      collection: 'redirects',
      depth: 0,
      limit: 100,
      page,
    }),
  )

  const rules = buildRedirectRules(posts, redirects)
  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true })
  fs.writeFileSync(OUTPUT, `${JSON.stringify(rules, null, 2)}\n`, 'utf8')
  console.log(`Wrote ${rules.length} redirect(s) to src/generated/redirects.json`)

  process.exit(0)
}

generateRedirects().catch((err) => {
  console.error(err)
  process.exit(1)
})
