import type { Meta, StoryObj } from '@storybook/react-vite'

import { PricingHero } from './pricing-hero'

const meta: Meta = {
  title: 'ELLA/Pricing/Hero',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <PricingHero />,
}
