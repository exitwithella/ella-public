import type { Meta, StoryObj } from '@storybook/react-vite'

import { PullToRevealWrapper } from './pull-to-reveal'

const meta: Meta = {
  title: 'ELLA/Sections/Pull To Reveal',
}
export default meta
type Story = StoryObj

export const StaticState: Story = {
  name: 'Static state (disabled)',
  render: () => (
    <PullToRevealWrapper
      enabled={false}
      text="Your legacy is worth protecting."
      height={400}
    >
      <div className="p-10">
        <p className="text-theme-text-secondary text-sm">
          The pull-to-reveal easter egg is scroll-driven and disabled in this story.
          In the live site, users can pull up from the bottom of the page to reveal a
          hidden message with a background image.
        </p>
      </div>
    </PullToRevealWrapper>
  ),
}
