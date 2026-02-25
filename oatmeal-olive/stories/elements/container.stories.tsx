import type { Meta, StoryObj } from '@storybook/react-vite'
import { Container } from '../../components/elements/container'

const meta: Meta<typeof Container> = {
  title: 'Elements/Container',
  component: Container,
}
export default meta
type Story = StoryObj<typeof Container>

export const Default: Story = {
  render: () => (
    <Container className="py-10">
      <div className="rounded-lg bg-olive-950/5 p-6">
        <p className="text-sm text-olive-700">
          This content is inside a Container. It constrains width to max-w-7xl on large screens, max-w-3xl on medium,
          and max-w-2xl on smaller viewports, with horizontal padding of px-6 (lg:px-10).
        </p>
      </div>
    </Container>
  ),
}
