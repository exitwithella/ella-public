import type { Meta, StoryObj } from '@storybook/react-vite'

import { ctaSectionDark, ctaSectionLight } from '@/__storybook__/fixtures/blocks'

import { CTASectionBlock } from './cta-section-block'

const meta: Meta = {
  title: 'ELLA/Blocks/CTA Section',
}
export default meta
type Story = StoryObj

export const Light: Story = {
  render: () => <CTASectionBlock block={ctaSectionLight} />,
}

export const Dark: Story = {
  name: 'Dark (forest)',
  render: () => <CTASectionBlock block={ctaSectionDark} />,
}
