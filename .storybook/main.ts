import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { StorybookConfig } from '@storybook/react-vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ['../oatmeal-olive/stories/**/*.stories.tsx', '../src/**/*.stories.tsx'],
  framework: '@storybook/react-vite',
  async viteFinal(viteConfig) {
    const { default: tailwindcss } = await import('@tailwindcss/vite')
    const { default: tsconfigPaths } = await import('vite-tsconfig-paths')

    viteConfig.plugins = [...(viteConfig.plugins || []), tailwindcss(), tsconfigPaths()]

    viteConfig.resolve = viteConfig.resolve || {}
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      'next/image': path.resolve(__dirname, 'mocks/next-image.tsx'),
      'next/link': path.resolve(__dirname, 'mocks/next-link.tsx'),
      'next/dynamic': path.resolve(__dirname, 'mocks/next-dynamic.tsx'),
      '@payloadcms/richtext-lexical/react': path.resolve(__dirname, 'mocks/payload-richtext.tsx'),
      '@payloadcms/richtext-lexical/lexical': path.resolve(__dirname, 'mocks/payload-lexical.ts'),
    }

    return viteConfig
  },
}
export default config
