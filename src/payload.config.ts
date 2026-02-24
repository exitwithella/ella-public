import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { CloudflareContext } from '@opennextjs/cloudflare'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { r2Storage } from '@payloadcms/storage-r2'
import { buildConfig } from 'payload'
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
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const realpath = (value: string) => (fs.existsSync(value) ? fs.realpathSync(value) : undefined)

const isCLI = process.argv.some((value) => realpath(value).endsWith(path.join('payload', 'bin.js')))
const isProduction = process.env.NODE_ENV === 'production'

const cloudflare =
  isCLI || !isProduction
    ? await getCloudflareContextFromWrangler()
    : await getCloudflareContext({ async: true })

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
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
  globals: [SiteSettings, Navigation, Footer],
  db: sqliteD1Adapter({ binding: cloudflare.env.D1 }),
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
        remoteBindings: isProduction,
      } satisfies GetPlatformProxyOptions),
  )
}
