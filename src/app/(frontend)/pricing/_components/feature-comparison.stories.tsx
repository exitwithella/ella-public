import type { Meta, StoryObj } from '@storybook/react-vite'

import { FeatureComparison } from './feature-comparison'

const meta: Meta = {
  title: 'ELLA/Pricing/Feature Comparison',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <FeatureComparison />,
}
