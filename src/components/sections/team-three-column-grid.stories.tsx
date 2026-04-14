import type { Meta, StoryObj } from '@storybook/react-vite'

import { TeamMember, TeamThreeColumnGrid } from './team-three-column-grid'

const meta: Meta = {
  title: 'ELLA/Sections/Team Grid',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <TeamThreeColumnGrid
      eyebrow="Our team"
      headline="The people behind ELLA"
    >
      <TeamMember
        img={<img src="https://placehold.co/400x533/e8e4df/5A6B4A?text=DW" alt="" />}
        name="Drew Watkins"
        byline="Co-founder & CEO"
      />
      <TeamMember
        img={<img src="https://placehold.co/400x533/e8e4df/5A6B4A?text=JD" alt="" />}
        name="Jane Doe"
        byline="Co-founder & CTO"
      />
      <TeamMember
        img={<img src="https://placehold.co/400x533/e8e4df/5A6B4A?text=JS" alt="" />}
        name="John Smith"
        byline="Head of Product"
      />
    </TeamThreeColumnGrid>
  ),
}
