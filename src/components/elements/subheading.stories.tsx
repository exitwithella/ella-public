import type { Meta, StoryObj } from '@storybook/react-vite'

import { Subheading } from './subheading'

const meta: Meta = {
  title: 'ELLA/Elements/Subheading',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div className="p-10 max-w-3xl">
      <Subheading>Your practice deserves better than spreadsheets and sticky notes</Subheading>
    </div>
  ),
}
