import type { Meta, StoryObj } from '@storybook/react-vite'

import { Heading } from './heading'

const meta: Meta = {
  title: 'ELLA/Elements/Heading',
}
export default meta
type Story = StoryObj

export const AllLevels: Story = {
  name: 'All heading levels',
  render: () => (
    <div className="flex flex-col gap-6 p-10">
      <Heading as="h1">Heading 1 — Termina</Heading>
      <Heading as="h2">Heading 2 — Termina</Heading>
      <Heading as="h3">Heading 3 — Termina</Heading>
      <Heading as="h4">Heading 4 — Termina</Heading>
      <Heading as="h5">Heading 5 — Termina</Heading>
      <Heading as="h6">Heading 6 — Termina</Heading>
    </div>
  ),
}

export const ColorVariants: Story = {
  name: 'Color variants',
  render: () => (
    <div className="flex flex-col gap-6 p-10">
      <Heading color="auto">Auto (theme-text)</Heading>
      <Heading color="dark">Dark (ash-900)</Heading>
      <div className="bg-ash-900 rounded p-6">
        <Heading color="light">Light (ash-100)</Heading>
      </div>
      <div className="bg-ash-900 rounded p-6">
        <Heading color="cream">Cream (ash-100)</Heading>
      </div>
    </div>
  ),
}
