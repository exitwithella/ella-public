import type { Meta, StoryObj } from '@storybook/react-vite'

import type { Page } from '@/payload-types'

import { Hero } from './hero'

const meta: Meta = {
  title: 'ELLA/App/Hero',
}
export default meta
type Story = StoryObj

const heroData: Page['hero'] = {
  headline: 'Your practice, systematized.',
  headlineAnimation: 'word-by-word',
  headlineLine2: 'Built for the advisors clients trust most.',
  headlineAnimation2: 'blur-fade',
  highlightText: 'systematized',
  highlightColor: 'goldenrod',
  subheadline:
    'ELLA helps trusted advisors turn ad-hoc processes into repeatable, scalable workflows — so you can focus on what matters most: your clients.',
  primaryCta: { label: 'Get Started Free', href: '#' },
  secondaryCta: { label: 'Book a Demo', href: '#' },
  visual: null,
  heroWallpaperColor: 'green',
}

export const Default: Story = {
  render: () => <Hero hero={heroData} />,
}
