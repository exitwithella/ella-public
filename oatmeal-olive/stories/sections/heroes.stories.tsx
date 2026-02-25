import type { Meta, StoryObj } from '@storybook/react-vite'
import { AnnouncementBadge } from '../../components/elements/announcement-badge'
import { ButtonLink, PlainButtonLink } from '../../components/elements/button'
import { Screenshot } from '../../components/elements/screenshot'
import { HeroCenteredWithDemo } from '../../components/sections/hero-centered-with-demo'
import { HeroCenteredWithPhoto } from '../../components/sections/hero-centered-with-photo'
import { HeroLeftAlignedWithDemo } from '../../components/sections/hero-left-aligned-with-demo'
import { HeroLeftAlignedWithPhoto } from '../../components/sections/hero-left-aligned-with-photo'
import { HeroSimpleCentered } from '../../components/sections/hero-simple-centered'
import { HeroSimpleLeftAligned } from '../../components/sections/hero-simple-left-aligned'
import { HeroTwoColumnWithPhoto } from '../../components/sections/hero-two-column-with-photo'
import { HeroWithDemoOnBackground } from '../../components/sections/hero-with-demo-on-background'

const meta: Meta = {
  title: 'Sections/Heroes',
}
export default meta
type Story = StoryObj

const cta = (
  <div className="flex items-center gap-4">
    <ButtonLink href="#" size="lg">
      Start free trial
    </ButtonLink>
    <PlainButtonLink href="#" size="lg">
      See how it works
    </PlainButtonLink>
  </div>
)

const badge = (
  <AnnouncementBadge href="#" text="Introducing our new API — ship integrations in minutes" cta="Learn more" />
)

const demoImage = (
  <Screenshot wallpaper="green" placement="bottom-right">
    <img
      src="https://placehold.co/1200x800/c8d4bc/5a6952?text=App+Screenshot"
      alt="App screenshot"
      width={1200}
      height={800}
    />
  </Screenshot>
)

const photo = (
  <img
    src="https://placehold.co/1200x800/c8d4bc/5a6952?text=Product+Photo"
    alt="Product"
    width={1200}
    height={800}
    className="w-full"
  />
)

export const SimpleCentered: Story = {
  name: 'Simple centered',
  render: () => (
    <HeroSimpleCentered
      eyebrow={badge}
      headline="Customer support that feels like a conversation."
      subheadline={
        <p>Simplify your shared inbox, collaborate effortlessly with your team, and deliver exceptional customer experiences.</p>
      }
      cta={cta}
    />
  ),
}

export const SimpleLeftAligned: Story = {
  name: 'Simple left-aligned',
  render: () => (
    <HeroSimpleLeftAligned
      eyebrow={badge}
      headline="Customer support that feels like a conversation."
      subheadline={
        <p>Simplify your shared inbox, collaborate effortlessly with your team, and deliver exceptional customer experiences.</p>
      }
      cta={cta}
    />
  ),
}

export const CenteredWithDemo: Story = {
  name: 'Centered with demo',
  render: () => (
    <HeroCenteredWithDemo
      eyebrow={badge}
      headline="Customer support that feels like a conversation."
      subheadline={
        <p>Simplify your shared inbox, collaborate effortlessly with your team, and deliver exceptional customer experiences.</p>
      }
      cta={cta}
      demo={demoImage}
    />
  ),
}

export const CenteredWithPhoto: Story = {
  name: 'Centered with photo',
  render: () => (
    <HeroCenteredWithPhoto
      eyebrow={badge}
      headline="Customer support that feels like a conversation."
      subheadline={
        <p>Simplify your shared inbox, collaborate effortlessly with your team, and deliver exceptional customer experiences.</p>
      }
      cta={cta}
      photo={photo}
    />
  ),
}

export const LeftAlignedWithDemo: Story = {
  name: 'Left-aligned with demo',
  render: () => (
    <HeroLeftAlignedWithDemo
      eyebrow={badge}
      headline="Customer support that feels like a conversation."
      subheadline={
        <p>Simplify your shared inbox, collaborate effortlessly with your team, and deliver exceptional customer experiences.</p>
      }
      cta={cta}
      demo={demoImage}
    />
  ),
}

export const LeftAlignedWithPhoto: Story = {
  name: 'Left-aligned with photo',
  render: () => (
    <HeroLeftAlignedWithPhoto
      eyebrow={badge}
      headline="Customer support that feels like a conversation."
      subheadline={
        <p>Simplify your shared inbox, collaborate effortlessly with your team, and deliver exceptional customer experiences.</p>
      }
      cta={cta}
      photo={photo}
    />
  ),
}

export const TwoColumnWithPhoto: Story = {
  name: 'Two-column with photo',
  render: () => (
    <HeroTwoColumnWithPhoto
      eyebrow={badge}
      headline="Customer support that feels like a conversation."
      subheadline={
        <p>Simplify your shared inbox, collaborate effortlessly with your team, and deliver exceptional customer experiences.</p>
      }
      cta={cta}
      photo={photo}
    />
  ),
}

export const WithDemoOnBackground: Story = {
  name: 'With demo on background',
  render: () => (
    <HeroWithDemoOnBackground
      eyebrow={badge}
      headline="Customer support that feels like a conversation."
      subheadline={
        <p>Simplify your shared inbox, collaborate effortlessly with your team, and deliver exceptional customer experiences.</p>
      }
      cta={
        <div className="flex items-center gap-4">
          <ButtonLink href="#" size="lg" color="light">
            Start free trial
          </ButtonLink>
          <PlainButtonLink href="#" size="lg" color="light">
            See how it works
          </PlainButtonLink>
        </div>
      }
      demo={
        <img
          src="https://placehold.co/1400x900/c8d4bc/5a6952?text=App+Screenshot"
          alt="App screenshot"
          width={1400}
          height={900}
          className="h-full w-auto max-w-none"
        />
      }
    />
  ),
}
