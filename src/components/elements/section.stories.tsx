import type { Meta, StoryObj } from '@storybook/react-vite'

import { ButtonLink } from './button'
import { Section } from './section'

const meta: Meta = {
  title: 'ELLA/Elements/Section',
}
export default meta
type Story = StoryObj

export const WithAllSlots: Story = {
  name: 'With all slots',
  render: () => (
    <Section
      eyebrow="Platform"
      headline="Everything you need to systematize your practice"
      subheadline="ELLA brings together the tools, workflows, and intelligence that trusted advisors need — in one place."
      cta={<ButtonLink href="#">Learn more</ButtonLink>}
    >
      <div className="border-theme-border bg-theme-surface grid grid-cols-3 gap-6 rounded border border-dashed p-8">
        <div className="bg-theme-bg h-32 rounded" />
        <div className="bg-theme-bg h-32 rounded" />
        <div className="bg-theme-bg h-32 rounded" />
      </div>
    </Section>
  ),
}

export const MinimalSection: Story = {
  name: 'Headline only',
  render: () => (
    <Section headline="A simpler section">
      <p className="text-theme-text-secondary">Content goes here.</p>
    </Section>
  ),
}
