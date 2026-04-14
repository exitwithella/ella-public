import type { Meta, StoryObj } from '@storybook/react-vite'

import { mockFaqs } from '@/__storybook__/fixtures/pricing'

import { PricingFAQ } from './pricing-faq'

const meta: Meta = {
  title: 'ELLA/Pricing/FAQ',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <PricingFAQ faqs={mockFaqs} />,
}
