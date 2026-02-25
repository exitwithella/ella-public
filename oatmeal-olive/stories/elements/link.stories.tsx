import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link } from '../../components/elements/link'

const meta: Meta<typeof Link> = {
  title: 'Elements/Link',
  component: Link,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Link>

export const Default: Story = {
  render: () => <Link href="#">Learn more about our features</Link>,
}
