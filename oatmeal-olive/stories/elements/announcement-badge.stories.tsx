import type { Meta, StoryObj } from '@storybook/react-vite'
import { AnnouncementBadge } from '../../components/elements/announcement-badge'

const meta: Meta<typeof AnnouncementBadge> = {
  title: 'Elements/AnnouncementBadge',
  component: AnnouncementBadge,
}
export default meta
type Story = StoryObj<typeof AnnouncementBadge>

export const Normal: Story = {
  render: () => (
    <div className="p-10">
      <AnnouncementBadge href="#" text="We just launched v2.0 with a brand new API" cta="Learn more" />
    </div>
  ),
}

export const Overlay: Story = {
  render: () => (
    <div className="bg-olive-950 p-10">
      <AnnouncementBadge href="#" text="We just launched v2.0 with a brand new API" cta="Learn more" variant="overlay" />
    </div>
  ),
}
