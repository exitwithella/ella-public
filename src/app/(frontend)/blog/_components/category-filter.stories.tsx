import type { Meta, StoryObj } from '@storybook/react-vite'

import { CategoryFilter } from './category-filter'

const meta: Meta = {
  title: 'ELLA/Blog/Category Filter',
}
export default meta
type Story = StoryObj

const categories = [
  { id: 1, title: 'Practice Management', slug: 'practice-management', updatedAt: '', createdAt: '' },
  { id: 2, title: 'Efficiency', slug: 'efficiency', updatedAt: '', createdAt: '' },
  { id: 3, title: 'Industry Trends', slug: 'industry-trends', updatedAt: '', createdAt: '' },
  { id: 4, title: 'Exit Planning', slug: 'exit-planning', updatedAt: '', createdAt: '' },
]

export const NoActive: Story = {
  name: 'All selected',
  render: () => (
    <div className="p-6">
      <CategoryFilter categories={categories} />
    </div>
  ),
}

export const WithActive: Story = {
  name: 'Category active',
  render: () => (
    <div className="p-6">
      <CategoryFilter categories={categories} activeSlug="efficiency" />
    </div>
  ),
}
