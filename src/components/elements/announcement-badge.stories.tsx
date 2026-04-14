import type { Meta, StoryObj } from '@storybook/react-vite'

import { AnnouncementBadge } from './announcement-badge'

const meta: Meta = {
  title: 'ELLA/Elements/AnnouncementBadge',
}
export default meta
type Story = StoryObj

export const Normal: Story = {
  render: () => (
    <div className="p-10">
      <AnnouncementBadge
        text="ELLA is now available for independent RIAs"
        href="#"
        cta="Learn more"
      />
    </div>
  ),
}

export const Overlay: Story = {
  render: () => (
    <div data-theme="forest" className="bg-theme-bg p-10">
      <AnnouncementBadge
        text="Vanguard Program — Limited spots remaining"
        href="#"
        cta="Apply now"
        variant="overlay"
      />
    </div>
  ),
}
