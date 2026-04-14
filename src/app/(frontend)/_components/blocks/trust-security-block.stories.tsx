import type { Meta, StoryObj } from '@storybook/react-vite'

import { trustSecurity } from '@/__storybook__/fixtures/blocks'

import { TrustSecurityBlock } from './trust-security-block'

const meta: Meta = {
  title: 'ELLA/Blocks/Trust & Security',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => <TrustSecurityBlock block={trustSecurity} />,
}
