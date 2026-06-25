import type { Meta, StoryObj } from '@storybook/react-vite'
import Image from 'next/image'

import { TeamMember, TeamThreeColumnGrid } from './team-three-column-grid'

const meta: Meta = {
  title: 'ELLA/Sections/Team Grid',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <TeamThreeColumnGrid eyebrow="Our team" headline="The people behind ELLA">
      <TeamMember
        img={
          <Image
            src="https://placehold.co/400x533/e8e4df/5A6B4A?text=DW"
            alt=""
            width={400}
            height={533}
            unoptimized
          />
        }
        name="Drew Watkins"
        byline="Co-founder & CEO"
      />
      <TeamMember
        img={
          <Image
            src="https://placehold.co/400x533/e8e4df/5A6B4A?text=JD"
            alt=""
            width={400}
            height={533}
            unoptimized
          />
        }
        name="Jane Doe"
        byline="Co-founder & CTO"
      />
      <TeamMember
        img={
          <Image
            src="https://placehold.co/400x533/e8e4df/5A6B4A?text=JS"
            alt=""
            width={400}
            height={533}
            unoptimized
          />
        }
        name="John Smith"
        byline="Head of Product"
      />
    </TeamThreeColumnGrid>
  ),
}
