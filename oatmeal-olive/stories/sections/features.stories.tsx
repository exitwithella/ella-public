import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link } from '../../components/elements/link'
import { Screenshot } from '../../components/elements/screenshot'
import {
  Feature as AlternatingFeature,
  FeaturesStackedAlternatingWithDemos,
} from '../../components/sections/features-stacked-alternating-with-demos'
import {
  FeatureThreeColumnWithDemos as ThreeColDemoFeature,
  Features as FeaturesThreeColumnWithDemos,
} from '../../components/sections/features-three-column-with-demos'
import { Feature, FeaturesThreeColumn } from '../../components/sections/features-three-column'
import {
  Feature as TwoColFeature,
  FeaturesTwoColumnWithDemos,
} from '../../components/sections/features-two-column-with-demos'
import { Feature as LargeDemoFeature, FeaturesWithLargeDemo } from '../../components/sections/features-with-large-demo'

const meta: Meta = {
  title: 'Sections/Features',
}
export default meta
type Story = StoryObj

const demoGreen = (
  <Screenshot wallpaper="green" placement="bottom-right">
    <img src="https://placehold.co/1200x800/c8d4bc/5a6952?text=Feature+Demo" alt="" width={1200} height={800} />
  </Screenshot>
)

const demoPurple = (
  <Screenshot wallpaper="purple" placement="bottom-left">
    <img src="https://placehold.co/1200x800/d4bcd4/6a526a?text=Feature+Demo" alt="" width={1200} height={800} />
  </Screenshot>
)

const demoBlue = (
  <Screenshot wallpaper="blue" placement="top-right">
    <img src="https://placehold.co/1200x800/bcd4dc/526a6a?text=Feature+Demo" alt="" width={1200} height={800} />
  </Screenshot>
)

export const ThreeColumn: Story = {
  name: 'Three column',
  render: () => (
    <FeaturesThreeColumn
      eyebrow="Powerful features"
      headline="Everything you need to delight your customers."
      subheadline="Manage your team's inbox, collaborate on conversations, and automate repetitive tasks.">
      <Feature
        headline="Shared inbox"
        subheadline={<p>Keep every customer conversation in one place. No more missed messages or duplicate replies.</p>}
      />
      <Feature
        headline="Tagging and assignment"
        subheadline={<p>Route conversations to the right person automatically and track ownership at a glance.</p>}
      />
      <Feature
        headline="Automated replies"
        subheadline={<p>Set up smart rules to handle common questions so your team focuses on what matters.</p>}
      />
    </FeaturesThreeColumn>
  ),
}

export const ThreeColumnWithDemos: Story = {
  name: 'Three column with demos',
  render: () => (
    <FeaturesThreeColumnWithDemos
      eyebrow="Powerful features"
      headline="Everything you need to delight your customers."
      subheadline="Manage your team's inbox, collaborate on conversations, and automate repetitive tasks."
      features={
        <>
          <ThreeColDemoFeature
            demo={demoGreen}
            headline="Shared inbox"
            subheadline={<p>Keep every customer conversation in one place.</p>}
          />
          <ThreeColDemoFeature
            demo={demoPurple}
            headline="Tagging and assignment"
            subheadline={<p>Route conversations to the right person automatically.</p>}
          />
          <ThreeColDemoFeature
            demo={demoBlue}
            headline="Automated replies"
            subheadline={<p>Set up smart rules to handle common questions.</p>}
          />
        </>
      }
    />
  ),
}

export const TwoColumnWithDemos: Story = {
  name: 'Two column with demos',
  render: () => (
    <FeaturesTwoColumnWithDemos
      eyebrow="Powerful features"
      headline="Everything you need to delight your customers."
      features={
        <>
          <TwoColFeature
            demo={demoGreen}
            headline="Shared inbox"
            subheadline={<p>Keep every customer conversation in one place. No more missed messages or duplicate replies.</p>}
            cta={<Link href="#">Learn more</Link>}
          />
          <TwoColFeature
            demo={demoPurple}
            headline="Tagging and assignment"
            subheadline={<p>Route conversations to the right person automatically and track ownership.</p>}
            cta={<Link href="#">Learn more</Link>}
          />
        </>
      }
    />
  ),
}

export const StackedAlternating: Story = {
  name: 'Stacked alternating with demos',
  render: () => (
    <FeaturesStackedAlternatingWithDemos
      eyebrow="Powerful features"
      headline="Everything you need to delight your customers."
      features={
        <>
          <AlternatingFeature
            headline="Shared inbox"
            subheadline={
              <p>Keep every customer conversation in one place. No more missed messages or duplicate replies from your team.</p>
            }
            cta={<Link href="#">See how it works</Link>}
            demo={demoGreen}
          />
          <AlternatingFeature
            headline="Tagging and assignment"
            subheadline={
              <p>Route conversations to the right person automatically and track ownership at a glance across your team.</p>
            }
            cta={<Link href="#">See how it works</Link>}
            demo={demoPurple}
          />
        </>
      }
    />
  ),
}

export const WithLargeDemo: Story = {
  name: 'With large demo',
  render: () => (
    <FeaturesWithLargeDemo
      eyebrow="Powerful features"
      headline="Everything you need to delight your customers."
      demo={demoGreen}
      features={
        <>
          <LargeDemoFeature
            headline="Shared inbox"
            subheadline={<p>Keep every customer conversation in one place.</p>}
          />
          <LargeDemoFeature
            headline="Tagging and assignment"
            subheadline={<p>Route conversations to the right person automatically.</p>}
          />
          <LargeDemoFeature
            headline="Automated replies"
            subheadline={<p>Set up smart rules to handle common questions.</p>}
          />
        </>
      }
    />
  ),
}
