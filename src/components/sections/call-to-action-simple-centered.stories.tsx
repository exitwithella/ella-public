import type { Meta, StoryObj } from '@storybook/react-vite'

import { ButtonLink } from '../elements/button'
import { CallToActionSimpleCentered } from './call-to-action-simple-centered'

const meta: Meta = {
  title: 'ELLA/Sections/Call To Action',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <CallToActionSimpleCentered
      headline="Ready to systematize your practice?"
      subheadline={
        <p>
          Join the advisors who are building repeatable, scalable workflows with ELLA —
          free to start, powerful to grow.
        </p>
      }
      cta={
        <div className="flex flex-wrap justify-center gap-4">
          <ButtonLink href="#" size="lg">Get Started Free</ButtonLink>
          <ButtonLink href="#" size="lg" color="light">Book a Demo</ButtonLink>
        </div>
      }
    />
  ),
}
