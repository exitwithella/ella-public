import type { Meta, StoryObj } from '@storybook/react-vite'
import { ButtonLink, PlainButtonLink } from '../../components/elements/button'
import { CallToActionSimple } from '../../components/sections/call-to-action-simple'
import { CallToActionSimpleCentered } from '../../components/sections/call-to-action-simple-centered'
import { DocumentCentered } from '../../components/sections/document-centered'
import { DocumentLeftAligned } from '../../components/sections/document-left-aligned'

const meta: Meta = {
  title: 'Sections/Content',
}
export default meta
type Story = StoryObj

const ctaButtons = (
  <div className="flex items-center gap-4">
    <ButtonLink href="#" size="lg">Start free trial</ButtonLink>
    <PlainButtonLink href="#" size="lg">Book a demo</PlainButtonLink>
  </div>
)

export const CtaSimple: Story = {
  name: 'CTA simple',
  render: () => (
    <CallToActionSimple
      eyebrow="Get started today"
      headline="Ready to make customer support feel simple again?"
      subheadline={
        <p>
          Join thousands of teams who have already transformed their support workflow with Oatmeal. Start your free
          trial — no credit card required.
        </p>
      }
      cta={ctaButtons}
    />
  ),
}

export const CtaSimpleCentered: Story = {
  name: 'CTA simple centered',
  render: () => (
    <CallToActionSimpleCentered
      headline="Ready to make customer support feel simple again?"
      subheadline={
        <p>
          Join thousands of teams who have already transformed their support workflow. Start your free trial today.
        </p>
      }
      cta={ctaButtons}
    />
  ),
}

const docContent = (
  <>
    <p>
      This is a document section that renders long-form content with our Document element for prose styling. It handles
      paragraphs, headings, lists, and inline elements consistently.
    </p>
    <h2>Getting started</h2>
    <p>
      To get started, connect your email inbox or create a shared mailbox. Oatmeal will automatically organize incoming
      messages and surface them to the right team members.
    </p>
    <ul>
      <li>Connect your first inbox in under 2 minutes</li>
      <li>Invite your team members and set roles</li>
      <li>Configure your first automation rule</li>
      <li>Set up your SLA policies and notifications</li>
    </ul>
    <h2>Core concepts</h2>
    <p>
      Understanding how Oatmeal organizes conversations will help you get the most out of the platform. Every
      conversation has an <strong>owner</strong>, a <strong>status</strong>, and optional <strong>tags</strong>.
    </p>
  </>
)

export const DocumentCenteredStory: Story = {
  name: 'Document centered',
  render: () => (
    <DocumentCentered
      headline="Getting started with Oatmeal."
      subheadline={<p>Everything you need to know to set up your team and start delivering great support.</p>}>
      {docContent}
    </DocumentCentered>
  ),
}

export const DocumentLeftAlignedStory: Story = {
  name: 'Document left-aligned',
  render: () => (
    <DocumentLeftAligned
      headline="Getting started with Oatmeal."
      subheadline={<p>Everything you need to know to set up your team and start delivering great support.</p>}>
      {docContent}
    </DocumentLeftAligned>
  ),
}
