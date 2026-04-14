import type { Meta, StoryObj } from '@storybook/react-vite'

import { valuesGrid } from '@/__storybook__/fixtures/blocks'

import { ValuesGridBlock } from './values-grid-block'

const meta: Meta = {
  title: 'ELLA/Blocks/Values Grid',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <ValuesGridBlock block={valuesGrid} />,
}
