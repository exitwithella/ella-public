import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from '../../components/elements/text'

const meta: Meta = {
  title: 'Elements/Text',
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj

export const Medium: Story = {
  render: () => (
    <div className="max-w-xl p-10">
      <Text>
        Simplify your shared inbox, collaborate effortlessly with your team, and deliver exceptional customer
        experiences — all in one place.
      </Text>
    </div>
  ),
}

export const Large: Story = {
  render: () => (
    <div className="max-w-xl p-10">
      <Text size="lg">
        Simplify your shared inbox, collaborate effortlessly with your team, and deliver exceptional customer
        experiences — all in one place.
      </Text>
    </div>
  ),
}
