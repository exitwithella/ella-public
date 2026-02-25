import type { Meta, StoryObj } from '@storybook/react-vite'
import { Heading } from '../../components/elements/heading'

const meta: Meta = {
  title: 'Elements/Heading',
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div className="p-10">
      <Heading>Customer support that feels like a conversation.</Heading>
    </div>
  ),
}

export const Light: Story = {
  render: () => (
    <div className="rounded-lg bg-olive-950 p-10">
      <Heading color="light">Customer support that feels like a conversation.</Heading>
    </div>
  ),
}

export const AsH2: Story = {
  name: 'As h2',
  render: () => (
    <div className="p-10">
      <Heading as="h2">A secondary heading element.</Heading>
    </div>
  ),
}
