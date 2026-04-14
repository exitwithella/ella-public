import type { Meta, StoryObj } from '@storybook/react-vite'

import { advisorPersonas } from '@/__storybook__/fixtures/blocks'

import { AdvisorPersonasBlock } from './advisor-personas-block'

const meta: Meta = {
  title: 'ELLA/Blocks/Advisor Personas',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <AdvisorPersonasBlock block={advisorPersonas} />,
}
