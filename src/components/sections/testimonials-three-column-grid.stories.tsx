import type { Meta, StoryObj } from '@storybook/react-vite'

import { Testimonial, TestimonialThreeColumnGrid } from './testimonials-three-column-grid'

const meta: Meta = {
  title: 'ELLA/Sections/Testimonials Grid',
}
export default meta
type Story = StoryObj

const placeholder = (
  <img
    src="https://placehold.co/96x96/e8e4df/5A6B4A?text=AW"
    alt=""
    width={96}
    height={96}
  />
)

export const Default: Story = {
  render: () => (
    <TestimonialThreeColumnGrid
      eyebrow="What advisors say"
      headline="Trusted by professionals who stake their reputation on trust"
    >
      <Testimonial
        quote={<p>ELLA transformed how we handle client transitions. What used to take weeks now takes days.</p>}
        img={placeholder}
        name="Sarah Mitchell"
        byline="RIA Principal, Mitchell Wealth"
      />
      <Testimonial
        quote={<p>Finally, a platform that understands the nuance of advisory relationships — not just the transactions.</p>}
        img={placeholder}
        name="David Chen"
        byline="Managing Partner, Pacific Advisory"
      />
      <Testimonial
        quote={<p>We went from scattered spreadsheets to a single source of truth. Our team is more confident and our clients notice.</p>}
        img={placeholder}
        name="Rebecca Torres"
        byline="Senior Advisor, Torres Financial"
      />
    </TestimonialThreeColumnGrid>
  ),
}
