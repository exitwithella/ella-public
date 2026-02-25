import type { Meta, StoryObj } from '@storybook/react-vite'
import { TeamMember, TeamFourColumnGrid } from '../../components/sections/team-four-column-grid'
import { TeamMember as ThreeMember, TeamThreeColumnGrid } from '../../components/sections/team-three-column-grid'

const meta: Meta = {
  title: 'Sections/Teams',
}
export default meta
type Story = StoryObj

const members = [
  { name: 'Alex Morgan', byline: 'Co-founder & CEO', color: 'c8d4bc/5a6952', initials: 'AM' },
  { name: 'Jordan Lee', byline: 'Co-founder & CTO', color: 'd4bcd4/6a526a', initials: 'JL' },
  { name: 'Sam Rivera', byline: 'Head of Design', color: 'bcd4dc/526a6a', initials: 'SR' },
  { name: 'Casey Park', byline: 'Head of Engineering', color: 'd4d4bc/6a6a52', initials: 'CP' },
  { name: 'Taylor Brooks', byline: 'Head of Marketing', color: 'dcd4bc/6a5a52', initials: 'TB' },
  { name: 'Morgan Chen', byline: 'Head of Sales', color: 'bcd4cc/526a62', initials: 'MC' },
]

export const FourColumnGrid: Story = {
  name: 'Four-column grid',
  render: () => (
    <TeamFourColumnGrid eyebrow="Our team" headline="The people behind Oatmeal.">
      {members.map((m) => (
        <TeamMember
          key={m.name}
          img={
            <img
              src={`https://placehold.co/400x533/${m.color}?text=${m.initials}`}
              alt={m.name}
              width={400}
              height={533}
            />
          }
          name={m.name}
          byline={m.byline}
        />
      ))}
    </TeamFourColumnGrid>
  ),
}

export const ThreeColumnGrid: Story = {
  name: 'Three-column grid',
  render: () => (
    <TeamThreeColumnGrid eyebrow="Our team" headline="The people behind Oatmeal.">
      {members.slice(0, 3).map((m) => (
        <ThreeMember
          key={m.name}
          img={
            <img
              src={`https://placehold.co/400x533/${m.color}?text=${m.initials}`}
              alt={m.name}
              width={400}
              height={533}
            />
          }
          name={m.name}
          byline={m.byline}
        />
      ))}
    </TeamThreeColumnGrid>
  ),
}
