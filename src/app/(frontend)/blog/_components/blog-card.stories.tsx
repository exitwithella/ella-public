import type { Meta, StoryObj } from '@storybook/react-vite'

import { mockPost, mockPost2, mockPost3 } from '@/__storybook__/fixtures/blog'

import { BlogCard } from './blog-card'

const meta: Meta = {
  title: 'ELLA/Blog/Blog Card',
}
export default meta
type Story = StoryObj

export const Hero: Story = {
  render: () => <BlogCard post={mockPost} variant="hero" />,
}

export const Featured: Story = {
  render: () => (
    <div className="grid max-w-4xl grid-cols-2 gap-6 p-6">
      <BlogCard post={mockPost2} variant="featured" />
      <BlogCard post={mockPost3} variant="featured" />
    </div>
  ),
}

export const Standard: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4 p-6">
      <BlogCard post={mockPost} variant="standard" />
      <BlogCard post={mockPost2} variant="standard" />
      <BlogCard post={mockPost3} variant="standard" />
    </div>
  ),
}
