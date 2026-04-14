import type { Meta, StoryObj } from '@storybook/react-vite'

import { featureDeepDive } from '@/__storybook__/fixtures/blocks'

import { FeatureDeepDiveBlock } from './feature-deep-dive-block'

const meta: Meta = {
  title: 'ELLA/Blocks/Feature Deep Dive',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <FeatureDeepDiveBlock block={featureDeepDive} />,
}
