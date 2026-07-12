import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Packages with Cloudflare Workers (workerd) specific code
  // Read more: https://opennext.js.org/cloudflare/howtos/workerd
  serverExternalPackages: ['jose', 'pg-cloudflare', 'drizzle-kit', 'typescript', '@clerk/backend'],

  // In CI the build runs against LOCAL bindings (no Cloudflare auth), and each
  // parallel build worker boots its own workerd over the same on-disk miniflare
  // state — concurrent startup intermittently crashes with SQLITE_BUSY.
  // Serialize the workers in CI only; local and deploy builds stay parallel.
  ...(process.env.CI ? { experimental: { cpus: 1 } } : {}),

  // Injected at build time so /api/release can report which git revision is
  // currently serving. WORKERS_CI_COMMIT_SHA is set by Cloudflare Workers
  // Builds; GITHUB_SHA covers GH Actions; the rest is local-dev fallback.
  env: {
    BUILD_GIT_SHA:
      process.env.WORKERS_CI_COMMIT_SHA ?? process.env.GITHUB_SHA ?? process.env.GIT_SHA ?? 'dev',
    BUILD_TIME: new Date().toISOString(),
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:slug*',
          destination: '/md/:slug*',
          has: [
            {
              type: 'header' as const,
              key: 'accept',
              value: '(.*)text/markdown(.*)',
            },
          ],
        },
      ],
      afterFiles: [],
      fallback: [],
    }
  },

  images:
    process.env.NODE_ENV === 'production'
      ? { loader: 'custom' as const, loaderFile: './src/image-loader.ts' }
      : {},

  // Your Next.js config here
  webpack: (webpackConfig: any) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
