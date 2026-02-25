import type { Meta, StoryObj } from '@storybook/react-vite'
import { Faq, FAQsAccordion } from '../../components/sections/faqs-accordion'
import { Faq as TwoColFaq, FAQsTwoColumnAccordion } from '../../components/sections/faqs-two-column-accordion'

const meta: Meta = {
  title: 'Sections/FAQs',
}
export default meta
type Story = StoryObj

const faqs = [
  {
    question: 'How does the free trial work?',
    answer: 'Your free trial gives you full access to all Growth plan features for 14 days. No credit card required. At the end of the trial you can choose a plan or your account will revert to the free Starter tier.',
  },
  {
    question: 'Can I change plans after I sign up?',
    answer: 'Yes. You can upgrade or downgrade your plan at any time. Upgrades take effect immediately and are prorated. Downgrades take effect at the end of your current billing cycle.',
  },
  {
    question: 'How many team members can I invite?',
    answer: 'Starter plans support up to 5 team members. Growth and Pro plans include unlimited team members. You can manage roles and permissions for each member individually.',
  },
  {
    question: 'Do you offer discounts for annual billing?',
    answer: 'Yes — annual billing saves you 20% compared to monthly. You can switch to annual billing at any time from your account settings.',
  },
  {
    question: 'What email providers do you support?',
    answer: 'Oatmeal works with Gmail, Google Workspace, Outlook, Microsoft 365, and any provider that supports IMAP/SMTP. Setup takes under 5 minutes with our guided flow.',
  },
]

export const Accordion: Story = {
  name: 'Accordion',
  render: () => (
    <FAQsAccordion
      headline="Frequently asked questions."
      subheadline={<p>Can't find what you're looking for? Reach out to our support team.</p>}>
      {faqs.map((faq) => (
        <Faq key={faq.question} question={faq.question} answer={<p>{faq.answer}</p>} />
      ))}
    </FAQsAccordion>
  ),
}

export const TwoColumnAccordion: Story = {
  name: 'Two-column accordion',
  render: () => (
    <FAQsTwoColumnAccordion
      headline="Frequently asked questions."
      subheadline={<p>Can't find what you're looking for? Reach out to our support team.</p>}>
      {faqs.map((faq) => (
        <TwoColFaq key={faq.question} question={faq.question} answer={<p>{faq.answer}</p>} />
      ))}
    </FAQsTwoColumnAccordion>
  ),
}
