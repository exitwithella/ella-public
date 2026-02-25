import type { Meta, StoryObj } from '@storybook/react-vite'
import { Eyebrow } from '../../components/elements/eyebrow'

const meta: Meta<typeof Eyebrow> = {
  title: 'Elements/Eyebrow',
  component: Eyebrow,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Eyebrow>

export const Default: Story = {
  render: () => <Eyebrow>Powerful features</Eyebrow>,
}
