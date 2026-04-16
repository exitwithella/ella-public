import type { Meta, StoryObj } from '@storybook/react-vite'

import { Faq, FAQsAccordion } from './faqs-accordion'

const meta: Meta = {
  title: 'ELLA/Sections/FAQs Accordion',
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <FAQsAccordion
      headline="Frequently asked questions"
      subheadline={
        <p>
          Everything you need to know about ELLA and how it helps trusted advisors systematize their
          practice.
        </p>
      }
    >
      <Faq
        question="What is ELLA?"
        answer={
          <p>
            ELLA is a practice systematization platform built for trusted advisors. It turns your
            ad-hoc processes into repeatable, scalable workflows — so you can focus on client
            relationships instead of operational overhead.
          </p>
        }
      />
      <Faq
        question="Who is ELLA built for?"
        answer={
          <p>
            Financial advisors, estate planners, wealth managers, and other trusted professionals
            who manage complex client relationships and need structure without sacrificing the
            personal touch.
          </p>
        }
      />
      <Faq
        question="How does pricing work?"
        answer={
          <p>
            ELLA offers tiered pricing based on your team size and needs. Start free with our
            Foundation tier, or upgrade to Professional or Enterprise for advanced features and
            priority support.
          </p>
        }
      />
      <Faq
        question="Can I try ELLA before committing?"
        answer={
          <p>
            Absolutely. Our Foundation tier is free forever — no credit card required. You can
            explore the platform at your own pace before deciding if a paid tier is right for your
            practice.
          </p>
        }
      />
    </FAQsAccordion>
  ),
}
