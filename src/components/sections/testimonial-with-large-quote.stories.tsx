import type { Meta, StoryObj } from '@storybook/react-vite'

import { TestimonialLargeQuote } from './testimonial-with-large-quote'

const meta: Meta = {
  title: 'ELLA/Sections/Testimonial Large Quote',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <TestimonialLargeQuote
      quote={
        <p>
          The best advisors don't just manage wealth — they build trust through every interaction.
          ELLA makes that possible at scale.
        </p>
      }
      img={
        <img
          src="https://placehold.co/96x96/e8e4df/5A6B4A?text=JR"
          alt=""
          width={96}
          height={96}
        />
      }
      name="James Richardson"
      byline="Founder & CEO, Richardson Advisory Group"
    />
  ),
}
