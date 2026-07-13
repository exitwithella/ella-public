import type { Meta, StoryObj } from '@storybook/react-vite'

import { SmartLink } from './smart-link'

const meta: Meta<typeof SmartLink> = {
  title: 'ELLA/Elements/SmartLink',
  component: SmartLink,
}
export default meta
type Story = StoryObj<typeof SmartLink>

export const Internal: Story = {
  name: 'Internal route (next/link)',
  args: {
    href: '/platform',
    children: 'Internal link → /platform',
    className: 'text-moss-700 underline underline-offset-4',
  },
}

export const External: Story = {
  name: 'External URL (new tab)',
  args: {
    href: 'https://cal.com/team/ella/ella-intro',
    children: 'External link → cal.com',
    className: 'text-moss-700 underline underline-offset-4',
  },
}

export const Anchor: Story = {
  name: 'In-page anchor',
  args: {
    href: '#section',
    children: 'Anchor link → #section',
    className: 'text-moss-700 underline underline-offset-4',
  },
}
