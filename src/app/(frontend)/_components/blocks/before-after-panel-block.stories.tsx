import type { Meta, StoryObj } from '@storybook/react-vite'

import { beforeAfterPanel } from '@/__storybook__/fixtures/blocks'

import { BeforeAfterPanelBlock } from './before-after-panel-block'

const meta: Meta = {
  title: 'ELLA/Blocks/Before After Panel',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <BeforeAfterPanelBlock block={beforeAfterPanel} />,
}
