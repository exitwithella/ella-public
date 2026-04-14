import type { Meta, StoryObj } from '@storybook/react-vite'

import { FooterMultiColumn } from './footer-multi-column'

const meta: Meta = {
  title: 'ELLA/Sections/Footer',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <FooterMultiColumn
      bgStyle="brand-black"
      description="ELLA helps trusted advisors systematize their practice — from client onboarding to exit planning."
      copyrightText={`\u00a9 ${new Date().getFullYear()} ELLA. All rights reserved.`}
      newsletter={{
        enabled: true,
        heading: 'Stay in the loop',
        placeholder: 'you@firm.com',
        buttonLabel: 'Subscribe',
      }}
      columns={[
        {
          heading: 'Platform',
          links: [
            { label: 'Coverage', href: '#' },
            { label: 'Intelligence', href: '#' },
            { label: 'Continuity', href: '#' },
            { label: 'Connection', href: '#' },
          ],
        },
        {
          heading: 'Solutions',
          links: [
            { label: 'Exit Planning', href: '#' },
            { label: 'Practice Management', href: '#' },
            { label: 'Client Transitions', href: '#' },
          ],
        },
        {
          heading: 'Company',
          links: [
            { label: 'About', href: '#' },
            { label: 'Blog', href: '#' },
            { label: 'Pricing', href: '#' },
            { label: 'Contact', href: '#' },
          ],
        },
      ]}
      legalLinks={[
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
      ]}
    />
  ),
}
