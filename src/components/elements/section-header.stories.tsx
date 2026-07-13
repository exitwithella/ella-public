import type { Meta, StoryObj } from '@storybook/react-vite'

import { SectionHeader } from './section-header'

const meta: Meta<typeof SectionHeader> = {
  title: 'ELLA/Elements/SectionHeader',
  component: SectionHeader,
}
export default meta
type Story = StoryObj<typeof SectionHeader>

export const LeftAligned: Story = {
  args: {
    label: 'Advisor personas',
    heading: 'Built for how you actually work',
    subheading:
      'ELLA adapts to the way trusted advisors run their practice — from solo practitioners to multi-advisor firms.',
  },
}

export const Centered: Story = {
  args: {
    align: 'center',
    className: 'mx-auto max-w-3xl',
    label: 'Compare plans',
    heading: "Everything you need, nothing you don't.",
    headingClassName: 'mb-4 text-3xl md:text-4xl',
    eyebrowSize: 'sm',
    subheading: 'A closer look at what each plan includes.',
  },
}

export const HeadingOnly: Story = {
  args: {
    heading: 'A section without an eyebrow or subheading',
  },
}
