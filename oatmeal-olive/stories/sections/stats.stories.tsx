import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stat, StatsFourColumns } from '../../components/sections/stats-four-columns'
import { Stat as Stat3Col, StatsThreeColumnWithDescription } from '../../components/sections/stats-three-column-with-description'
import { Stat as GraphStat, StatsWithGraph } from '../../components/sections/stats-with-graph'

const meta: Meta = {
  title: 'Sections/Stats',
}
export default meta
type Story = StoryObj

export const FourColumns: Story = {
  name: 'Four columns',
  render: () => (
    <StatsFourColumns eyebrow="By the numbers" headline="Trusted by teams around the world.">
      <Stat stat="35,000+" text="Teams using Oatmeal to manage customer conversations" />
      <Stat stat="98%" text="Customer satisfaction score across all plans" />
      <Stat stat="<2 min" text="Average first response time for Growth and Pro plans" />
      <Stat stat="$2.4M" text="Saved annually by customers through automation" />
    </StatsFourColumns>
  ),
}

export const ThreeColumnWithDescription: Story = {
  name: 'Three column with description',
  render: () => (
    <StatsThreeColumnWithDescription
      heading="Built for teams that care about their customers."
      description={
        <p>
          We started Oatmeal after struggling with every other tool on the market. Everything was either too complex for
          small teams or too simple for real work. We built what we wished existed.
        </p>
      }>
      <Stat3Col stat="35,000+" text="Teams using Oatmeal to manage customer conversations" />
      <Stat3Col stat="98%" text="Customer satisfaction score across all plans" />
      <Stat3Col stat="$2.4M" text="Saved annually by customers through automation" />
    </StatsThreeColumnWithDescription>
  ),
}

export const WithGraph: Story = {
  name: 'With graph',
  render: () => (
    <StatsWithGraph eyebrow="Growth" headline="More teams choose Oatmeal every month.">
      <GraphStat stat="35,000+" text="Teams using Oatmeal" />
      <GraphStat stat="98%" text="Satisfaction score" />
      <GraphStat stat="47%" text="Year-over-year growth" />
      <GraphStat stat="<2 min" text="Average response time" />
    </StatsWithGraph>
  ),
}
