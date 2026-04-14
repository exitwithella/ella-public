import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from './text'

const meta: Meta = {
  title: 'ELLA/Elements/Text',
}
export default meta
type Story = StoryObj

export const Sizes: Story = {
  name: 'Both sizes',
  render: () => (
    <div className="flex flex-col gap-8 p-10 max-w-2xl">
      <div>
        <p className="text-theme-text-muted mb-2 text-xs font-semibold uppercase tracking-wider">Medium (default)</p>
        <Text>
          ELLA helps trusted advisors systematize their practice — turning ad-hoc processes
          into repeatable, scalable workflows that grow with your firm.
        </Text>
      </div>
      <div>
        <p className="text-theme-text-muted mb-2 text-xs font-semibold uppercase tracking-wider">Large</p>
        <Text size="lg">
          ELLA helps trusted advisors systematize their practice — turning ad-hoc processes
          into repeatable, scalable workflows that grow with your firm.
        </Text>
      </div>
    </div>
  ),
}
