import type { Meta, StoryObj } from '@storybook/react-vite'

import type { Navigation } from '@/payload-types'

import { NavbarClient } from './navbar-client'

const meta: Meta = {
  title: 'ELLA/App/Navbar',
}
export default meta
type Story = StoryObj

const links = [
  {
    label: 'Platform',
    type: 'dropdown' as const,
    dropdownItems: [
      {
        label: 'Coverage',
        href: '/platform#coverage',
        description: 'Comprehensive practice coverage',
      },
      {
        label: 'Intelligence',
        href: '/platform#intelligence',
        description: 'Data-driven insights',
      },
      {
        label: 'Continuity',
        href: '/platform#continuity',
        description: 'Succession and knowledge capture',
      },
      {
        label: 'Connection',
        href: '/platform#connection',
        description: 'Client relationship tools',
      },
    ],
  },
  {
    label: 'Solutions',
    type: 'dropdown' as const,
    dropdownItems: [
      { label: 'Exit Planning', href: '/solutions/exit-planning' },
      { label: 'Practice Management', href: '/solutions/practice-management' },
    ] as Navigation['primaryNav'][number]['dropdownItems'],
  },
  {
    label: 'Pricing',
    href: '/pricing',
    type: 'link' as const,
    dropdownItems: [] as Navigation['primaryNav'][number]['dropdownItems'],
  },
  {
    label: 'Blog',
    href: '/blog',
    type: 'link' as const,
    dropdownItems: [] as Navigation['primaryNav'][number]['dropdownItems'],
  },
  {
    label: 'About',
    href: '/about',
    type: 'link' as const,
    dropdownItems: [] as Navigation['primaryNav'][number]['dropdownItems'],
  },
]

const logo = (
  <span className="font-display text-ash-900 text-xl font-bold tracking-tight">ELLA</span>
)

export const Desktop: Story = {
  render: () => (
    <NavbarClient
      links={links}
      primaryCta={{ label: 'Get Started', href: '#' }}
      secondaryCta={{ label: 'Book a Demo', href: '#' }}
      logo={logo}
    />
  ),
}
