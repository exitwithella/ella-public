import type { Meta, StoryObj } from '@storybook/react-vite'

import { PhosphorIcon } from './PhosphorIcon'

const meta: Meta = {
  title: 'ELLA/Icons/Phosphor',
}
export default meta
type Story = StoryObj

const sampleIcons = [
  'Shield',
  'ChartLine',
  'Users',
  'Gear',
  'Lightning',
  'Lock',
  'Handshake',
  'Briefcase',
  'CheckCircle',
  'ArrowRight',
  'Star',
  'Globe',
]

export const SampleIcons: Story = {
  name: 'Sample Phosphor icons',
  render: () => (
    <div className="p-10">
      <div className="grid grid-cols-4 gap-6 sm:grid-cols-6">
        {sampleIcons.map((name) => (
          <div key={name} className="flex flex-col items-center gap-2">
            <div className="text-theme-accent">
              <PhosphorIcon name={name} size={32} />
            </div>
            <span className="text-theme-text-muted text-xs">{name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const Weights: Story = {
  name: 'Weight variants',
  render: () => (
    <div className="p-10">
      <div className="flex items-center gap-8">
        {(['thin', 'light', 'regular', 'bold', 'duotone', 'fill'] as const).map((weight) => (
          <div key={weight} className="flex flex-col items-center gap-2">
            <div className="text-theme-text">
              <PhosphorIcon name="Shield" size={32} weight={weight} />
            </div>
            <span className="text-theme-text-muted text-xs">{weight}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}
