import type { Meta, StoryObj } from '@storybook/react-vite'

import { contentSection } from '@/__storybook__/fixtures/blocks'

import { ContentSectionBlock } from './content-section-block'

const meta: Meta = {
  title: 'ELLA/Blocks/Content Section',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <ContentSectionBlock block={contentSection} />,
}
