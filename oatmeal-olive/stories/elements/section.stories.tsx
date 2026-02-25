import type { Meta, StoryObj } from '@storybook/react-vite'
import { Section } from '../../components/elements/section'

const meta: Meta<typeof Section> = {
  title: 'Elements/Section',
  component: Section,
}
export default meta
type Story = StoryObj<typeof Section>

export const WithHeader: Story = {
  name: 'With header',
  render: () => (
    <Section eyebrow="Powerful features" headline="Everything you need to delight customers." subheadline="Manage your team's inbox, collaborate on conversations, and automate repetitive tasks.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {['Feature one', 'Feature two', 'Feature three'].map((name) => (
          <div key={name} className="rounded-lg bg-olive-950/5 p-6">
            <p className="font-semibold text-olive-950">{name}</p>
            <p className="mt-2 text-sm text-olive-700">Placeholder feature description goes here.</p>
          </div>
        ))}
      </div>
    </Section>
  ),
}

export const WithoutHeader: Story = {
  name: 'Without header',
  render: () => (
    <Section>
      <div className="grid grid-cols-3 gap-4">
        {['Card one', 'Card two', 'Card three'].map((name) => (
          <div key={name} className="rounded-lg bg-olive-950/5 p-6">
            <p className="font-semibold text-olive-950">{name}</p>
          </div>
        ))}
      </div>
    </Section>
  ),
}
