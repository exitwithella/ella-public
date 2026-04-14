import type { Meta, StoryObj } from '@storybook/react-vite'

import { mockPost, mockPost2, mockPost3 } from '@/__storybook__/fixtures/blog'

import { BlogCard } from './blog-card'
import { CarouselItem, EditorsPicksCarousel } from './editors-picks-carousel'

const meta: Meta = {
  title: 'ELLA/Blog/Editors Picks Carousel',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div className="max-w-5xl p-6">
      <EditorsPicksCarousel>
        <CarouselItem>
          <BlogCard post={mockPost} variant="featured" />
        </CarouselItem>
        <CarouselItem>
          <BlogCard post={mockPost2} variant="featured" />
        </CarouselItem>
        <CarouselItem>
          <BlogCard post={mockPost3} variant="featured" />
        </CarouselItem>
        <CarouselItem>
          <BlogCard post={{ ...mockPost, id: 4, title: 'Building Trust Through Transparency' }} variant="featured" />
        </CarouselItem>
      </EditorsPicksCarousel>
    </div>
  ),
}
