import type { Meta, StoryObj } from '@storybook/react-vite'
import { ButtonLink, SoftButtonLink } from '../../components/elements/button'
import { PlanComparisonTable } from '../../components/sections/plan-comparison-table'
import { Plan, PricingHeroMultiTier } from '../../components/sections/pricing-hero-multi-tier'
import { Plan as MultiTierPlan, PricingMultiTier } from '../../components/sections/pricing-multi-tier'
import { PricingSingleTierTwoColumn } from '../../components/sections/pricing-single-tier-two-column'

const meta: Meta = {
  title: 'Sections/Pricing',
}
export default meta
type Story = StoryObj

const starterFeatures = ['Shared inbox for up to 2 mailboxes', 'Tagging and assignment', 'Private notes', 'Automatic replies', 'Basic analytics']
const growthFeatures = ['Unlimited shared inboxes', 'Advanced automation rules', 'Priority support', 'Team analytics dashboard', 'API access', 'Custom integrations']
const proFeatures = ['Everything in Growth', 'SSO and SAML', 'Custom SLA policies', 'Dedicated account manager', 'Enterprise security', 'SLA guarantees']

export const MultiTier: Story = {
  name: 'Multi-tier',
  render: () => (
    <PricingMultiTier
      eyebrow="Pricing"
      headline="Pricing to fit your business needs."
      subheadline="Start free, scale as you grow. No hidden fees.">
      <MultiTierPlan
        name="Starter"
        price="$12"
        period="/mo"
        subheadline={<p>Small teams getting started with shared inbox.</p>}
        features={starterFeatures}
        cta={<SoftButtonLink href="#" size="lg">Start free trial</SoftButtonLink>}
      />
      <MultiTierPlan
        name="Growth"
        price="$49"
        period="/mo"
        subheadline={<p>Growing teams that need more power and automation.</p>}
        badge="Most popular"
        features={growthFeatures}
        cta={<ButtonLink href="#" size="lg">Start free trial</ButtonLink>}
      />
      <MultiTierPlan
        name="Pro"
        price="$299"
        period="/mo"
        subheadline={<p>Enterprise teams with advanced security needs.</p>}
        features={proFeatures}
        cta={<SoftButtonLink href="#" size="lg">Contact sales</SoftButtonLink>}
      />
    </PricingMultiTier>
  ),
}

export const HeroMultiTier: Story = {
  name: 'Hero multi-tier',
  render: () => (
    <PricingHeroMultiTier
      eyebrow="Pricing"
      headline="Pricing to fit your business needs."
      subheadline={<p>Start free, scale as you grow. No hidden fees, cancel any time.</p>}
      options={['Monthly', 'Annually']}
      plans={{
        Monthly: (
          <>
            <Plan
              name="Starter"
              price="$12"
              period="/mo"
              subheadline={<p>Small teams getting started.</p>}
              features={starterFeatures}
              cta={<SoftButtonLink href="#" size="lg">Start free trial</SoftButtonLink>}
            />
            <Plan
              name="Growth"
              price="$49"
              period="/mo"
              subheadline={<p>Growing teams that need more power.</p>}
              badge="Most popular"
              features={growthFeatures}
              cta={<ButtonLink href="#" size="lg">Start free trial</ButtonLink>}
            />
          </>
        ),
        Annually: (
          <>
            <Plan
              name="Starter"
              price="$10"
              period="/mo"
              subheadline={<p>Small teams getting started.</p>}
              features={starterFeatures}
              cta={<SoftButtonLink href="#" size="lg">Start free trial</SoftButtonLink>}
            />
            <Plan
              name="Growth"
              price="$40"
              period="/mo"
              subheadline={<p>Growing teams that need more power.</p>}
              badge="Most popular"
              features={growthFeatures}
              cta={<ButtonLink href="#" size="lg">Start free trial</ButtonLink>}
            />
          </>
        ),
      }}
    />
  ),
}

export const SingleTierTwoColumn: Story = {
  name: 'Single-tier two-column',
  render: () => (
    <PricingSingleTierTwoColumn
      headline="Simple, all-inclusive pricing."
      subheadline={
        <p>
          One plan that includes everything your team needs. No per-seat pricing, no feature gates, no surprises.
        </p>
      }
      price="$49"
      period="/mo"
      features={['Unlimited shared inboxes', 'Advanced automation', 'Priority support', 'Team analytics', 'API access', 'Custom integrations', 'SSO and SAML', 'Dedicated support']}
      cta={<ButtonLink href="#" size="lg">Start free trial</ButtonLink>}
    />
  ),
}

export const ComparisonTable: Story = {
  name: 'Plan comparison table',
  render: () => (
    <PlanComparisonTable
      plans={['Starter', 'Growth', 'Pro']}
      features={[
        {
          title: 'Core features',
          features: [
            { name: 'Shared inboxes', value: { Starter: '2', Growth: 'Unlimited', Pro: 'Unlimited' } },
            { name: 'Team members', value: { Starter: '5', Growth: 'Unlimited', Pro: 'Unlimited' } },
            { name: 'Automation rules', value: { Starter: '5', Growth: '50', Pro: 'Unlimited' } },
            { name: 'Private notes', value: true },
            { name: 'Tagging and assignment', value: true },
          ],
        },
        {
          title: 'Integrations',
          features: [
            { name: 'API access', value: { Starter: false, Growth: true, Pro: true } },
            { name: 'Custom integrations', value: { Starter: false, Growth: false, Pro: true } },
            { name: 'Slack integration', value: { Starter: false, Growth: true, Pro: true } },
          ],
        },
        {
          title: 'Security',
          features: [
            { name: 'SSO and SAML', value: { Starter: false, Growth: false, Pro: true } },
            { name: 'Audit logs', value: { Starter: false, Growth: false, Pro: true } },
            { name: 'Two-factor auth', value: true },
          ],
        },
      ]}
    />
  ),
}
