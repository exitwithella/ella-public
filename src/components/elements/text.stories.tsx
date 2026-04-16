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
    <div className="flex max-w-2xl flex-col gap-8 p-10">
      <div>
        <p className="text-theme-text-muted mb-2 text-xs font-semibold tracking-wider uppercase">
          Medium (default)
        </p>
        <Text>
          ELLA helps trusted advisors systematize their practice — turning ad-hoc processes into
          repeatable, scalable workflows that grow with your firm.
        </Text>
      </div>
      <div>
        <p className="text-theme-text-muted mb-2 text-xs font-semibold tracking-wider uppercase">
          Large
        </p>
        <Text size="lg">
          ELLA helps trusted advisors systematize their practice — turning ad-hoc processes into
          repeatable, scalable workflows that grow with your firm.
        </Text>
      </div>
    </div>
  ),
}
