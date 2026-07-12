import type { Meta, StoryObj } from '@storybook/react-vite'

import { ComparisonTable } from './comparison-table'
import { TABLE_ROWS } from './constants'

const meta: Meta<typeof ComparisonTable> = {
  title: 'ELLA/Interactive/Dilemma/Comparison Table',
  component: ComparisonTable,
}
export default meta
type Story = StoryObj<typeof ComparisonTable>

// The table sequences itself via IntersectionObserver once scrolled into view.
export const Desktop: Story = {
  args: {
    rows: TABLE_ROWS,
    isMobile: false,
  },
  render: (args) => (
    <div className="py-12 font-sans">
      <ComparisonTable {...args} />
    </div>
  ),
}

export const Mobile: Story = {
  args: {
    rows: TABLE_ROWS,
    isMobile: true,
  },
  globals: { viewport: { value: 'mobile1' } },
  render: (args) => (
    <div className="py-12 font-sans">
      <ComparisonTable {...args} />
    </div>
  ),
}

export const TwoRows: Story = {
  name: 'Two rows (CMS-shortened)',
  args: {
    rows: TABLE_ROWS.slice(0, 2),
    isMobile: false,
    closer: 'The closer still appears with fewer rows.',
  },
  render: (args) => (
    <div className="py-12 font-sans">
      <ComparisonTable {...args} />
    </div>
  ),
}
