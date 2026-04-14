import type { Meta, StoryObj } from '@storybook/react-vite'

import { bridgeSection } from '@/__storybook__/fixtures/blocks'

import { BridgeSectionBlock } from './bridge-section-block'

const meta: Meta = {
  title: 'ELLA/Blocks/Bridge Section',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <BridgeSectionBlock block={bridgeSection} />,
}
