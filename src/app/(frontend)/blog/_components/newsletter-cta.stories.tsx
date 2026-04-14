import type { Meta, StoryObj } from '@storybook/react-vite'

import { NewsletterCTA } from './newsletter-cta'

const meta: Meta = {
  title: 'ELLA/Blog/Newsletter CTA',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div className="max-w-md p-6">
      <NewsletterCTA />
    </div>
  ),
}
