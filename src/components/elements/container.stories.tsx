import type { Meta, StoryObj } from '@storybook/react-vite'

import { Container } from './container'

const meta: Meta = {
  title: 'ELLA/Elements/Container',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Container>
      <div className="border-theme-border bg-theme-surface rounded border border-dashed p-6">
        <p className="text-theme-text-secondary text-sm">
          Container constrains content width and adds horizontal padding.
          Max widths: 2xl → md:3xl → lg:7xl. Padding: px-6 → lg:px-10.
        </p>
      </div>
    </Container>
  ),
}
