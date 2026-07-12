import type { Meta, StoryObj } from '@storybook/react-vite'
import { useMotionValue } from 'motion/react'
import { useEffect } from 'react'

import { STEPS } from './constants'
import { RailsPanel } from './rails-panel'

function RailsPanelHarness({ progress, compact }: { progress: number; compact: boolean }) {
  const vizProgress = useMotionValue(progress)
  useEffect(() => {
    vizProgress.set(progress)
  }, [progress, vizProgress])

  return (
    <div className="mx-auto max-w-[480px] p-8 font-sans">
      <RailsPanel steps={STEPS} vizProgress={vizProgress} compact={compact} />
    </div>
  )
}

const meta: Meta<typeof RailsPanelHarness> = {
  title: 'ELLA/Interactive/Dilemma/Rails Panel',
  component: RailsPanelHarness,
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
      description: 'Scroll-driven viz progress (0 = top of runway, 1 = fully locked)',
    },
  },
}
export default meta
type Story = StoryObj<typeof RailsPanelHarness>

export const Desktop: Story = {
  args: { progress: 0.5, compact: false },
}

export const Compact: Story = {
  name: 'Compact (mobile)',
  args: { progress: 0.5, compact: true },
}

export const FullyLocked: Story = {
  args: { progress: 1, compact: false },
}
