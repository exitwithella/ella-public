import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { StorybookConfig } from '@storybook/react-vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ['../oatmeal-olive/stories/**/*.stories.tsx', '../src/**/*.stories.tsx'],
  framework: '@storybook/react-vite',
  async viteFinal(config) {
    const { default: tailwindcss } = await import('@tailwindcss/vite')
    const { default: tsconfigPaths } = await import('vite-tsconfig-paths')

    config.plugins = [...(config.plugins || []), tailwindcss(), tsconfigPaths()]

    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      'next/image': path.resolve(__dirname, 'mocks/next-image.tsx'),
      'next/link': path.resolve(__dirname, 'mocks/next-link.tsx'),
      'next/dynamic': path.resolve(__dirname, 'mocks/next-dynamic.tsx'),
      '@payloadcms/richtext-lexical/react': path.resolve(__dirname, 'mocks/payload-richtext.tsx'),
      '@payloadcms/richtext-lexical/lexical': path.resolve(__dirname, 'mocks/payload-lexical.ts'),
    }

    return config
  },
}
export default config
