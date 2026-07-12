import type { Meta, StoryObj } from '@storybook/react-vite'
import { useMotionValue } from 'motion/react'
import { useEffect } from 'react'

import { BleedPanel } from './bleed-panel'

function BleedPanelHarness({ progress, compact }: { progress: number; compact: boolean }) {
  const vizProgress = useMotionValue(progress)
  useEffect(() => {
    vizProgress.set(progress)
  }, [progress, vizProgress])

  return (
    <div className="mx-auto max-w-[480px] p-8 font-sans">
      <BleedPanel vizProgress={vizProgress} compact={compact} />
    </div>
  )
}

const meta: Meta<typeof BleedPanelHarness> = {
  title: 'ELLA/Interactive/Dilemma/Bleed Panel',
  component: BleedPanelHarness,
  argTypes: {
    progress: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
      description: 'Scroll-driven viz progress (0 = intact boundaries, 1 = fully bled)',
    },
  },
}
export default meta
type Story = StoryObj<typeof BleedPanelHarness>

export const Desktop: Story = {
  args: { progress: 0.5, compact: false },
}

export const Compact: Story = {
  name: 'Compact (mobile)',
  args: { progress: 0.5, compact: true },
}

export const FullyBled: Story = {
  args: { progress: 1, compact: false },
}
