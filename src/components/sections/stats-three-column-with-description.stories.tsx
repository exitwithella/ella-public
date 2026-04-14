import type { Meta, StoryObj } from '@storybook/react-vite'

import { Stat, StatsThreeColumnWithDescription } from './stats-three-column-with-description'

const meta: Meta = {
  title: 'ELLA/Sections/Stats',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <StatsThreeColumnWithDescription
      heading="Built for the way trusted advisors actually work"
      description={
        <p>
          ELLA was designed in partnership with experienced financial advisors who understand the
          real challenges of running a modern practice.
        </p>
      }
    >
      <Stat stat="3x faster" text="Average time saved on client onboarding workflows" />
      <Stat stat="92%" text="Advisor satisfaction rate across our early access cohort" />
      <Stat stat="< 2 min" text="Time to generate a comprehensive exit readiness report" />
    </StatsThreeColumnWithDescription>
  ),
}
