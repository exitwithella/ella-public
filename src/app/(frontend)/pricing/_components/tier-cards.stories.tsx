import type { Meta, StoryObj } from '@storybook/react-vite'

import { mockTiers } from '@/__storybook__/fixtures/pricing'

import { TierCards } from './tier-cards'

const meta: Meta = {
  title: 'ELLA/Pricing/Tier Cards',
}
export default meta
type Story = StoryObj

export const Annual: Story = {
  name: 'Annual billing',
  render: () => <TierCards tiers={mockTiers} billingPeriod="year" />,
}

export const Monthly: Story = {
  name: 'Monthly billing',
  render: () => <TierCards tiers={mockTiers} billingPeriod="month" />,
}
