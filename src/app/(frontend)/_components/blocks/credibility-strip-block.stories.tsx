import type { Meta, StoryObj } from '@storybook/react-vite'

import { credibilityStripStats, credibilityStripText } from '@/__storybook__/fixtures/blocks'

import { CredibilityStripBlock } from './credibility-strip-block'

const meta: Meta = {
  title: 'ELLA/Blocks/Credibility Strip',
}
export default meta
type Story = StoryObj

export const TextVariant: Story = {
  name: 'Text variant',
  render: () => <CredibilityStripBlock block={credibilityStripText} />,
}

export const StatsVariant: Story = {
  name: 'Stats variant',
  render: () => <CredibilityStripBlock block={credibilityStripStats} />,
}
