import type { Meta, StoryObj } from '@storybook/react-vite'

import { PricingHero } from './pricing-hero'

const meta: Meta = {
  title: 'ELLA/Pricing/Hero',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <PricingHero
      eyebrow="Pricing"
      headline="Invest in your practice."
      subtitle="Simple, transparent pricing for trusted advisors. Annual billing by default — pay monthly or quarterly if you prefer flexibility."
      trustBadges={[
        { id: '1', icon: 'ShieldCheck', text: 'SOC 2 compliant' },
        { id: '2', icon: 'Clock', text: 'Cancel anytime' },
        { id: '3', icon: 'ArrowRight', text: 'Built by ei Innovations' },
      ]}
    />
  ),
}
