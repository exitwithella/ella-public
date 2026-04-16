import type { Meta, StoryObj } from '@storybook/react-vite'

import { richText } from '@/__storybook__/fixtures/richtext'
import type { Page } from '@/payload-types'

import { FeatureShowcaseBlock } from './feature-showcase-block'

const meta: Meta = {
  title: 'ELLA/Blocks/Feature Showcase',
}
export default meta
type Story = StoryObj

type FeatureShowcaseData = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'feature-showcase' }
>

const block = {
  blockType: 'feature-showcase' as const,
  id: 'fs-1',
  bgStyle: 'sandstone',
  sectionId: 'showcase',
  headerLayout: 'text-only' as const,
  textAlign: 'left' as const,
  sectionLabel: 'Platform',
  heading: 'Coverage that scales with your practice',
  headingSize: 'default' as const,
  body: richText(
    'ELLA tracks every client touchpoint, deadline, and deliverable. From the first meeting to the annual review, nothing falls through the cracks.',
  ),
  link: { href: '#', label: 'Explore coverage features', style: 'plain' as const },
  accordionItems: [
    {
      id: 'ai-1',
      question: 'How does client tracking work?',
      answer: richText(
        'ELLA automatically creates a timeline for every client interaction, pulling data from your calendar, email, and document management tools.',
      ),
    },
    {
      id: 'ai-2',
      question: 'Can I customize the workflows?',
      answer: richText(
        'Every workflow template can be customized — add steps, change assignments, set custom deadlines, and add conditional logic.',
      ),
    },
  ],
  galleryColumns: '3' as const,
  galleryItems: [],
} as unknown as FeatureShowcaseData

export const Default: Story = {
  render: () => <FeatureShowcaseBlock block={block} />,
}
