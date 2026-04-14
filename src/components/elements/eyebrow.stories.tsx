import type { Meta, StoryObj } from '@storybook/react-vite'

import { Eyebrow } from './eyebrow'

const meta: Meta = {
  title: 'ELLA/Elements/Eyebrow',
}
export default meta
type Story = StoryObj

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="flex flex-col gap-8 p-10">
      <div>
        <p className="text-theme-text-muted mb-3 text-xs uppercase tracking-wider">Colors (xs size)</p>
        <div className="flex flex-col gap-2">
          <Eyebrow color="auto">Auto (theme-accent)</Eyebrow>
          <Eyebrow color="moss">Moss</Eyebrow>
          <Eyebrow color="ash">Ash</Eyebrow>
          <Eyebrow color="ash-dark">Ash Dark</Eyebrow>
          <div className="bg-ash-900 p-3 rounded">
            <Eyebrow color="light">Light</Eyebrow>
          </div>
        </div>
      </div>
      <div>
        <p className="text-theme-text-muted mb-3 text-xs uppercase tracking-wider">Sizes</p>
        <div className="flex flex-col gap-2">
          <Eyebrow size="xs">Extra Small (default)</Eyebrow>
          <Eyebrow size="sm">Small</Eyebrow>
        </div>
      </div>
    </div>
  ),
}
