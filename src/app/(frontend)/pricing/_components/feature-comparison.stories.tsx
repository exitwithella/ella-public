import type { Meta, StoryObj } from '@storybook/react-vite'

import { FeatureComparison } from './feature-comparison'

const mockCategories = [
  {
    id: 'c1',
    name: 'Core Platform',
    defaultOpen: true,
    rows: [
      {
        id: 'r1',
        label: 'Max advisors',
        practitioner: { indicator: 'text' as const, displayText: '3' },
        enterprise: { indicator: 'text' as const, displayText: 'Custom' },
      },
      {
        id: 'r2',
        label: 'Fact Finding with custom templates',
        practitioner: { indicator: 'check' as const },
        enterprise: { indicator: 'check' as const },
      },
      {
        id: 'r3',
        label: 'AI decision tracing',
        practitioner: { indicator: 'cross' as const },
        enterprise: { indicator: 'check' as const },
      },
    ],
  },
  {
    id: 'c2',
    name: 'Support',
    defaultOpen: false,
    rows: [
      {
        id: 'r4',
        label: 'Email support',
        practitioner: { indicator: 'check' as const },
        enterprise: { indicator: 'check' as const },
      },
      {
        id: 'r5',
        label: 'Dedicated success manager',
        practitioner: { indicator: 'cross' as const },
        enterprise: { indicator: 'check' as const },
      },
    ],
  },
]

const meta: Meta = {
  title: 'ELLA/Pricing/Feature Comparison',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <FeatureComparison
      eyebrow="Compare Plans"
      heading="Everything you need, nothing you don't."
      categories={mockCategories}
    />
  ),
}
