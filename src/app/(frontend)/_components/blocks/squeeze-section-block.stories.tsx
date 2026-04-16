import type { Meta, StoryObj } from '@storybook/react-vite'

import { richText } from '@/__storybook__/fixtures/richtext'
import type { Page } from '@/payload-types'

import { SqueezeSectionBlock } from './squeeze-section-block'

const meta: Meta = {
  title: 'ELLA/Blocks/Squeeze Section',
}
export default meta
type Story = StoryObj

type SqueezeSectionData = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'squeeze-section' }
>

const block: SqueezeSectionData = {
  blockType: 'squeeze-section',
  id: 'sq-1',
  label: 'The squeeze',
  heading: 'Your practice is caught between two forces',
  body: richText(
    'Client expectations are rising. AI is commoditizing basic advisory services. The window for differentiation is closing.',
    'The advisors who thrive will be the ones who systematize what makes them irreplaceable.',
  ) as SqueezeSectionData['body'],
  quotes: [
    {
      id: 'q1',
      text: 'I felt like I was running faster just to stay in place.',
      attribution: 'RIA Managing Director',
    },
  ],
  closer: 'This is the reality ELLA was built for.',
  pressureItems: [],
  erosionItems: [],
}

export const Default: Story = {
  name: 'Initial state',
  render: () => <SqueezeSectionBlock block={block} />,
}
