import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button, ButtonLink, PlainButton, PlainButtonLink, SoftButton, SoftButtonLink } from './button'

const meta: Meta = {
  title: 'ELLA/Elements/Button',
}
export default meta
type Story = StoryObj

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="flex flex-col gap-10 p-10">
      <div>
        <h3 className="text-theme-text-muted mb-4 text-sm font-semibold uppercase tracking-wider">Button</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button color="auto">Auto</Button>
          <Button color="dark/light">Dark/Light</Button>
          <Button color="light">Light</Button>
          <Button color="auto" size="lg">Auto Large</Button>
        </div>
      </div>

      <div>
        <h3 className="text-theme-text-muted mb-4 text-sm font-semibold uppercase tracking-wider">ButtonLink</h3>
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="#" color="auto">Auto</ButtonLink>
          <ButtonLink href="#" color="dark/light">Dark/Light</ButtonLink>
          <ButtonLink href="#" color="light">Light</ButtonLink>
          <ButtonLink href="#" color="auto" size="lg">Auto Large</ButtonLink>
        </div>
      </div>

      <div>
        <h3 className="text-theme-text-muted mb-4 text-sm font-semibold uppercase tracking-wider">SoftButton</h3>
        <div className="flex flex-wrap items-center gap-3">
          <SoftButton>Default</SoftButton>
          <SoftButton size="lg">Large</SoftButton>
        </div>
      </div>

      <div>
        <h3 className="text-theme-text-muted mb-4 text-sm font-semibold uppercase tracking-wider">SoftButtonLink</h3>
        <div className="flex flex-wrap items-center gap-3">
          <SoftButtonLink href="#">Default</SoftButtonLink>
          <SoftButtonLink href="#" size="lg">Large</SoftButtonLink>
        </div>
      </div>

      <div>
        <h3 className="text-theme-text-muted mb-4 text-sm font-semibold uppercase tracking-wider">PlainButton</h3>
        <div className="flex flex-wrap items-center gap-3">
          <PlainButton color="auto">Auto</PlainButton>
          <PlainButton color="dark/light">Dark/Light</PlainButton>
          <PlainButton color="light">Light</PlainButton>
          <PlainButton color="auto" size="lg">Auto Large</PlainButton>
        </div>
      </div>

      <div>
        <h3 className="text-theme-text-muted mb-4 text-sm font-semibold uppercase tracking-wider">PlainButtonLink</h3>
        <div className="flex flex-wrap items-center gap-3">
          <PlainButtonLink href="#" color="auto">Auto</PlainButtonLink>
          <PlainButtonLink href="#" color="dark/light">Dark/Light</PlainButtonLink>
          <PlainButtonLink href="#" color="light">Light</PlainButtonLink>
          <PlainButtonLink href="#" color="auto" size="lg">Auto Large</PlainButtonLink>
        </div>
      </div>
    </div>
  ),
}

export const OnDarkTheme: Story = {
  name: 'On dark theme (forest)',
  render: () => (
    <div data-theme="forest" className="bg-theme-bg text-theme-text p-10">
      <div className="flex flex-wrap items-center gap-3">
        <Button color="auto">Auto</Button>
        <SoftButton>Soft</SoftButton>
        <PlainButton color="auto">Plain</PlainButton>
        <Button color="light">Light</Button>
        <Button color="auto" size="lg">Large Auto</Button>
      </div>
    </div>
  ),
}
