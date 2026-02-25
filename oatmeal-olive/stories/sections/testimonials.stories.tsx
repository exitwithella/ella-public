import type { Meta, StoryObj } from '@storybook/react-vite'
import { TestimonialLargeQuote } from '../../components/sections/testimonial-with-large-quote'
import { TestimonialTwoColumnWithLargePhoto } from '../../components/sections/testimonial-two-column-with-large-photo'
import { Testimonial, TestimonialThreeColumnGrid } from '../../components/sections/testimonials-three-column-grid'

const meta: Meta = {
  title: 'Sections/Testimonials',
}
export default meta
type Story = StoryObj

const avatar = (
  <img src="https://placehold.co/160x160/c8d4bc/5a6952?text=JR" alt="Jordan Rogers" width={160} height={160} />
)

export const LargeQuote: Story = {
  name: 'Large quote',
  render: () => (
    <TestimonialLargeQuote
      quote={
        <p>
          Oatmeal has completely transformed how our support team works. We went from drowning in emails to having a
          clear, organized system that everyone loves using.
        </p>
      }
      img={avatar}
      name="Jordan Rogers"
      byline="Founder at Anomaly"
    />
  ),
}

export const TwoColumnWithPhoto: Story = {
  name: 'Two-column with large photo',
  render: () => (
    <TestimonialTwoColumnWithLargePhoto
      quote={
        <p>
          Oatmeal has completely transformed how our support team works. We went from drowning in emails to having a
          clear, organized system that everyone loves using.
        </p>
      }
      img={
        <img
          src="https://placehold.co/800x600/c8d4bc/5a6952?text=Photo"
          alt="Jordan Rogers"
          width={800}
          height={600}
          className="w-full"
        />
      }
      name="Jordan Rogers"
      byline="Founder at Anomaly"
    />
  ),
}

export const ThreeColumnGrid: Story = {
  name: 'Three-column grid',
  render: () => (
    <TestimonialThreeColumnGrid
      eyebrow="What our customers say"
      headline="Trusted by support teams everywhere."
      subheadline="Don't just take our word for it. Here's what our customers have to say.">
      <Testimonial
        quote={<p>Oatmeal transformed our support workflow. Response times dropped by 40% in the first week.</p>}
        img={<img src="https://placehold.co/160x160/c8d4bc/5a6952?text=JR" alt="Jordan Rogers" width={160} height={160} />}
        name="Jordan Rogers"
        byline="Founder at Anomaly"
      />
      <Testimonial
        quote={<p>Finally a tool that doesn't get in the way. Our team adopted it on day one with zero training.</p>}
        img={<img src="https://placehold.co/160x160/d4bcd4/6a526a?text=SK" alt="Sarah Kim" width={160} height={160} />}
        name="Sarah Kim"
        byline="Head of Support at Meridian"
      />
      <Testimonial
        quote={<p>The automation features alone saved us hours every week. Highly recommend to any growing team.</p>}
        img={<img src="https://placehold.co/160x160/bcd4dc/526a6a?text=MP" alt="Marcus Patel" width={160} height={160} />}
        name="Marcus Patel"
        byline="Operations Lead at Crestline"
      />
    </TestimonialThreeColumnGrid>
  ),
}
