import type { Meta, StoryObj } from '@storybook/react-vite'

import { mockTiers } from '../../../../__storybook__/fixtures/pricing'
import { FeatureComparison } from './feature-comparison'

// mockTiers: Practitioner (id 1) + Enterprise (id 2)
const mockCategories = [
  {
    id: 'c1',
    name: 'Core Platform',
    defaultOpen: true,
    rows: [
      {
        id: 'r1',
        label: 'Max advisors',
        values: [
          { id: 'v1', tier: 1, indicator: 'text' as const, displayText: '3' },
          { id: 'v2', tier: 2, indicator: 'text' as const, displayText: 'Custom' },
        ],
      },
      {
        id: 'r2',
        label: 'Fact Finding with custom templates',
        values: [
          { id: 'v3', tier: 1, indicator: 'check' as const },
          { id: 'v4', tier: 2, indicator: 'check' as const },
        ],
      },
      {
        id: 'r3',
        label: 'AI decision tracing',
        values: [
          { id: 'v5', tier: 1, indicator: 'cross' as const },
          { id: 'v6', tier: 2, indicator: 'check' as const },
        ],
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
        values: [
          { id: 'v7', tier: 1, indicator: 'check' as const },
          { id: 'v8', tier: 2, indicator: 'check' as const },
        ],
      },
      {
        id: 'r5',
        label: 'Dedicated success manager',
        values: [
          { id: 'v9', tier: 1, indicator: 'cross' as const },
          { id: 'v10', tier: 2, indicator: 'check' as const },
        ],
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
      tiers={mockTiers}
      categories={mockCategories}
    />
  ),
}
