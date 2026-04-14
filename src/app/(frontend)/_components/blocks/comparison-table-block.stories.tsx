import type { Meta, StoryObj } from '@storybook/react-vite'

import { comparisonTable } from '@/__storybook__/fixtures/blocks'

import { ComparisonTableBlock } from './comparison-table-block'

const meta: Meta = {
  title: 'ELLA/Blocks/Comparison Table',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <ComparisonTableBlock block={comparisonTable} />,
}
