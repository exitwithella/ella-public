import type { Meta, StoryObj } from '@storybook/react-vite'

import { cardGrid3Col } from '@/__storybook__/fixtures/blocks'

import { CardGridBlock } from './card-grid-block'

const meta: Meta = {
  title: 'ELLA/Blocks/Card Grid',
}
export default meta
type Story = StoryObj

export const ThreeColumns: Story = {
  name: '3 columns',
  render: () => <CardGridBlock block={cardGrid3Col} />,
}
