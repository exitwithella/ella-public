import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, ButtonLink, PlainButton, PlainButtonLink, SoftButton, SoftButtonLink } from '../../components/elements/button'

const meta: Meta = {
  title: 'Elements/Button',
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj

export const Primary: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const PrimaryLink: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <ButtonLink href="#" size="md">Medium link</ButtonLink>
      <ButtonLink href="#" size="lg">Large link</ButtonLink>
    </div>
  ),
}

export const Light: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4 rounded-lg bg-olive-950 p-6">
      <Button color="light" size="md">Medium</Button>
      <Button color="light" size="lg">Large</Button>
    </div>
  ),
}

export const Soft: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <SoftButton size="md">Medium</SoftButton>
      <SoftButton size="lg">Large</SoftButton>
    </div>
  ),
}

export const SoftLink: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <SoftButtonLink href="#" size="md">Medium link</SoftButtonLink>
      <SoftButtonLink href="#" size="lg">Large link</SoftButtonLink>
    </div>
  ),
}

export const Plain: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <PlainButton size="md">Medium</PlainButton>
      <PlainButton size="lg">Large</PlainButton>
    </div>
  ),
}

export const PlainLink: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <PlainButtonLink href="#" size="md">Medium link</PlainButtonLink>
      <PlainButtonLink href="#" size="lg">Large link</PlainButtonLink>
    </div>
  ),
}

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        <Button size="lg">Primary</Button>
        <SoftButton size="lg">Soft</SoftButton>
        <PlainButton size="lg">Plain</PlainButton>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <ButtonLink href="#" size="lg">Primary link</ButtonLink>
        <SoftButtonLink href="#" size="lg">Soft link</SoftButtonLink>
        <PlainButtonLink href="#" size="lg">Plain link</PlainButtonLink>
      </div>
    </div>
  ),
}
