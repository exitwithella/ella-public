import type { Meta, StoryObj } from '@storybook/react-vite'

import { numberedSteps } from '@/__storybook__/fixtures/blocks'

import { NumberedStepsBlock } from './numbered-steps-block'

const meta: Meta = {
  title: 'ELLA/Blocks/Numbered Steps',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <NumberedStepsBlock block={numberedSteps} />,
}
