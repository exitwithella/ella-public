import type { Meta, StoryObj } from '@storybook/react-vite'

import { testimonialGrid, testimonialSingle } from '@/__storybook__/fixtures/blocks'

import { TestimonialBlockComponent } from './testimonial-block-component'

const meta: Meta = {
  title: 'ELLA/Blocks/Testimonial',
}
export default meta
type Story = StoryObj

export const SingleQuote: Story = {
  name: 'Single layout',
  render: () => <TestimonialBlockComponent block={testimonialSingle} />,
}

export const Grid: Story = {
  name: 'Grid layout',
  render: () => <TestimonialBlockComponent block={testimonialGrid} />,
}
