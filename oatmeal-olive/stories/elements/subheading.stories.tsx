import type { Meta, StoryObj } from '@storybook/react-vite'
import { Subheading } from '../../components/elements/subheading'

const meta: Meta<typeof Subheading> = {
  title: 'Elements/Subheading',
  component: Subheading,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Subheading>

export const Default: Story = {
  render: () => (
    <div className="max-w-2xl p-10">
      <Subheading>Everything you need to deliver great support.</Subheading>
    </div>
  ),
}
