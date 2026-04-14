import type { Meta, StoryObj } from '@storybook/react-vite'

import { productFeatures } from '@/__storybook__/fixtures/blocks'

import { ProductFeaturesBlock } from './product-features-block'

const meta: Meta = {
  title: 'ELLA/Blocks/Product Features',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <ProductFeaturesBlock block={productFeatures} />,
}
