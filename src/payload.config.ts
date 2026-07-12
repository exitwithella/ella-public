import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { CloudflareContext } from '@opennextjs/cloudflare'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { resendAdapter } from '@payloadcms/email-resend'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { r2Storage } from '@payloadcms/storage-r2'
import { buildConfig } from 'payload'
import type { PayloadLogger } from 'payload'
import type { GetPlatformProxyOptions } from 'wrangler'

import { CaseStudies } from './collections/CaseStudies'
import { Categories } from './collections/Categories'
import { Disciplines } from './collections/Disciplines'
import { FAQItems } from './collections/FAQItems'
import { LandingPages } from './collections/LandingPages'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Partners } from './collections/Partners'
import { Posts } from './collections/Posts'
import { PricingTiers } from './collections/PricingTiers'
import { Redirects } from './collections/Redirects'
import { Solutions } from './collections/Solutions'
import { TeamMembers } from './collections/TeamMembers'
import { Testimonials } from './collections/Testimonials'
import { Tools } from './collections/Tools'
import { Users } from './collections/Users'
import { VanguardEvents } from './collections/VanguardEvents'
import { Footer } from './globals/Footer'
import { Navigation } from './globals/Navigation'
import { PricingPage } from './globals/PricingPage'
import { ScriptInjection } from './globals/ScriptInjection'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const realpath = (value: string) => (fs.existsSync(value) ? fs.realpathSync(value) : undefined)

const isCLI = process.argv.some((value) => realpath(value).endsWith(path.join('payload', 'bin.js')))
const isProduction = process.env.NODE_ENV === 'production'

// `next build` sets NODE_ENV=production but runs outside the Workers runtime —
// it must resolve bindings through the wrangler proxy, not the runtime context.
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build'

// Opt-in switch to point local dev / CLI scripts (dump, seed, migrate) at the
// *remote* production D1 + R2 bindings instead of the local miniflare state.
// Set by the `dev:remote`, `content:pull`/`content:push`, and `deploy:database`
// scripts. Requires Cloudflare auth (`wrangler login` or CLOUDFLARE_API_TOKEN).
// Everything else — including `next build` — defaults to LOCAL bindings; passing
// the flag explicitly below also overrides wrangler's default of honoring the
// `"remote": true` markers in wrangler.jsonc whenever auth happens to exist.
const useRemoteBindings = process.env.REMOTE_BINDINGS === 'true'

const cloudflare =
  isCLI || isBuildPhase || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

const siteURL = process.env.SITE_URL || 'http://localhost:3000'
const resendApiKey = process.env.RESEND_API_KEY
const emailFromAddress = process.env.EMAIL_FROM_ADDRESS || 'no-reply@hello.withella.io'
const emailFromName = process.env.EMAIL_FROM_NAME || 'ELLA'

// Payload's default logger (pino) writes through a worker-thread sink that
// doesn't surface on Cloudflare Workers — errors get swallowed and the user
// sees only "Something went wrong." This routes log calls to `console.*`
// directly so messages land in Workers logs.
function serializeArg(arg: unknown): unknown {
  if (arg instanceof Error) return { name: arg.name, message: arg.message, stack: arg.stack }
  return arg
}

function logViaConsole(level: 'info' | 'warn' | 'error', args: unknown[]): void {
  const sink = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log
  const payload = args.length === 1 ? serializeArg(args[0]) : args.map(serializeArg)
  sink(JSON.stringify({ level, payload }))
}

function createConsoleLogger(): PayloadLogger {
  const logger = {
    level: 'info',
    silent: () => {},
    trace: () => {},
    debug: () => {},
    info: (...args: unknown[]) => logViaConsole('info', args),
    warn: (...args: unknown[]) => logViaConsole('warn', args),
    error: (...args: unknown[]) => logViaConsole('error', args),
    fatal: (...args: unknown[]) => logViaConsole('error', args),
    child: () => logger,
    bindings: () => ({}),
    flush: () => {},
    isLevelEnabled: () => true,
  }
  return logger as unknown as PayloadLogger
}

export default buildConfig({
  serverURL: siteURL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  hooks: {
    afterError: [
      ({ error, req }) => {
        const e = error as Error & { code?: unknown; cause?: unknown }
        console.error(
          JSON.stringify({
            event: 'payload_after_error',
            path: req?.url,
            method: req?.method,
            errorName: e?.name,
            errorMessage: e?.message,
            errorCode: e?.code,
            stack: e?.stack,
            cause: e?.cause ? String(e.cause) : undefined,
          }),
        )
      },
    ],
  },
  logger: createConsoleLogger(),
  email: resendApiKey
    ? resendAdapter({
        apiKey: resendApiKey,
        defaultFromAddress: emailFromAddress,
        defaultFromName: emailFromName,
      })
    : undefined,
  collections: [
    Users,
    Media,
    Posts,
    Pages,
    LandingPages,
    Categories,
    Disciplines,
    TeamMembers,
    Testimonials,
    Partners,
    FAQItems,
    PricingTiers,
    Tools,
    Redirects,
    Solutions,
    CaseStudies,
    VanguardEvents,
  ],
  globals: [SiteSettings, Navigation, Footer, PricingPage, ScriptInjection],
  // `push: false` against remote bindings — prod/preview schema is managed by
  // migrations, never by pushDevSchema. Without this, non-production build
  // subprocesses (e.g. the generate-redirects prebuild, which runs under tsx
  // with NODE_ENV unset) would run a destructive drizzle push against the
  // remote D1 and hang on its interactive DATA-LOSS prompt. Local dev keeps
  // push enabled so schema changes apply without a manual migration.
  db: sqliteD1Adapter({ binding: cloudflare.env.D1, push: !useRemoteBindings }),
  editor: lexicalEditor(),
  plugins: [
    r2Storage({
      bucket: cloudflare.env.R2,
      collections: { media: true },
    }),
    mcpPlugin({
      collections: {
        posts: {
          enabled: true,
        },
        pages: {
          enabled: true,
        },
        'landing-pages': {
          enabled: true,
        },
        'team-members': {
          enabled: true,
        },
        categories: {
          enabled: true,
        },
        solutions: {
          enabled: true,
        },
        testimonials: {
          enabled: true,
        },
        'pricing-tiers': {
          enabled: true,
        },
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})

// Adapted from https://github.com/opennextjs/opennextjs-cloudflare/blob/d00b3a13e42e65aad76fba41774815726422cc39/packages/cloudflare/src/api/cloudflare-context.ts#L328C36-L328C46
function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings: useRemoteBindings,
      } satisfies GetPlatformProxyOptions),
  )
}
