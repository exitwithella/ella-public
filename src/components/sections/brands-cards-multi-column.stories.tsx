import type { Meta, StoryObj } from '@storybook/react-vite'

import { BrandCard, BrandsCardsMultiColumn } from './brands-cards-multi-column'

const meta: Meta = {
  title: 'ELLA/Sections/Brands Cards',
}
export default meta
type Story = StoryObj

export const ThreeColumns: Story = {
  name: '3 columns',
  render: () => (
    <BrandsCardsMultiColumn
      eyebrow="Trusted by"
      headline="Built alongside the advisors we serve"
    >
      <BrandCard
        logo={<span className="font-display text-lg font-bold tracking-tight">Meridian</span>}
        text="A multi-family office that manages $2B+ in assets across three generations of families."
        footnote="Early access partner since 2025"
      />
      <BrandCard
        logo={<span className="font-display text-lg font-bold tracking-tight">Redwood</span>}
        text="Boutique RIA focused on tech executives navigating liquidity events."
        footnote="Vanguard cohort member"
      />
      <BrandCard
        logo={<span className="font-display text-lg font-bold tracking-tight">Pacific</span>}
        text="Full-service advisory firm serving high-net-worth individuals in the Pacific Northwest."
        footnote="Design partner since 2024"
      />
    </BrandsCardsMultiColumn>
  ),
}
