import type { Meta, StoryObj } from '@storybook/react-vite'

import { Link } from './link'

const meta: Meta = {
  title: 'ELLA/Elements/Link',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div className="p-10 flex flex-col gap-3">
      <Link href="#">Default link</Link>
      <Link href="#">Another link with longer text for wrapping</Link>
    </div>
  ),
}
