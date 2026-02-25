import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../oatmeal-olive/stories/**/*.stories.tsx'],
  framework: '@storybook/react-vite',
  async viteFinal(config) {
    const { default: tailwindcss } = await import('@tailwindcss/vite')
    config.plugins = [...(config.plugins || []), tailwindcss()]
    return config
  },
}
export default config
