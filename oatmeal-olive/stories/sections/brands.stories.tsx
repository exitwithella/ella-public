import type { Meta, StoryObj } from '@storybook/react-vite'
import { BrandCard, BrandsCardsMultiColumn } from '../../components/sections/brands-cards-multi-column'

const meta: Meta = {
  title: 'Sections/Brands',
}
export default meta
type Story = StoryObj

export const MultiColumn: Story = {
  name: 'Multi-column cards',
  render: () => (
    <BrandsCardsMultiColumn eyebrow="Integrations" headline="Connect the tools your team already uses.">
      <BrandCard
        logo={
          <img src="https://placehold.co/120x32/2e3226/ffffff?text=Slack" alt="Slack" width={120} height={32} />
        }
        text="Get notified about new conversations and reply directly from Slack channels."
        footnote="Used by 28,000+ teams"
      />
      <BrandCard
        logo={
          <img src="https://placehold.co/120x32/1c1c1c/ffffff?text=Notion" alt="Notion" width={120} height={32} />
        }
        text="Sync your knowledge base with Notion so answers are always at your team's fingertips."
        footnote="Used by 15,000+ teams"
      />
      <BrandCard
        logo={
          <img src="https://placehold.co/120x32/0052cc/ffffff?text=Jira" alt="Jira" width={120} height={32} />
        }
        text="Create Jira tickets from conversations and track resolution status without switching tools."
        footnote="Used by 12,000+ teams"
      />
      <BrandCard
        logo={
          <img src="https://placehold.co/120x32/430098/ffffff?text=Salesforce" alt="Salesforce" width={120} height={32} />
        }
        text="Keep your CRM up to date automatically as conversations happen."
        footnote="Used by 8,000+ teams"
      />
    </BrandsCardsMultiColumn>
  ),
}
