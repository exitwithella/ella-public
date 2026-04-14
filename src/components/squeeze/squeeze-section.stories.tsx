import type { Meta, StoryObj } from '@storybook/react-vite'

import { SqueezeSection } from './squeeze-section'

const meta: Meta = {
  title: 'ELLA/Interactive/Squeeze Section',
}
export default meta
type Story = StoryObj

export const InitialState: Story = {
  name: 'Initial state',
  render: () => (
    <SqueezeSection
      label="The squeeze"
      heading="Your practice is caught between two forces"
      bodyParagraphs={[
        'Client expectations are rising. AI is commoditizing basic advisory services.',
        'The advisors who thrive will be the ones who systematize what makes them irreplaceable.',
      ]}
      quotes={[
        { text: 'I felt like I was running faster just to stay in place.', attribution: 'RIA Managing Director' },
      ]}
      closer="This is the reality ELLA was built for."
      pressureItems={['More clients', 'Deeper engagements', 'Shorter timelines', 'Higher stakes']}
      erosionItems={['AI leveling the field', 'Clients questioning fees', 'Information parity', 'Commoditized insights']}
    />
  ),
}
