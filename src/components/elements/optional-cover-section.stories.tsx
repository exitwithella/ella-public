import type { Meta, StoryObj } from '@storybook/react-vite'

import { OptionalCoverSection } from './optional-cover-section'

const meta: Meta<typeof OptionalCoverSection> = {
  title: 'ELLA/Elements/OptionalCoverSection',
  component: OptionalCoverSection,
}
export default meta
type Story = StoryObj<typeof OptionalCoverSection>

const Body = () => (
  <div className="mx-auto max-w-2xl px-6 text-center">
    <h2 className="text-theme-text font-display mb-2 text-2xl font-bold tracking-tight">
      Section content
    </h2>
    <p className="text-theme-text-secondary text-sm">
      Rendered inside a ThemeSection, with or without a cover image.
    </p>
  </div>
)

export const WithoutCover: Story = {
  name: 'No cover image',
  args: {
    bgStyle: 'sandstone',
    coverImage: null,
    padding: 'py-20 md:py-28',
    children: <Body />,
  },
}

export const WithCover: Story = {
  name: 'With cover image',
  args: {
    bgStyle: 'forest',
    coverImage: {
      image: {
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600',
        alt: 'Forest canopy',
      },
      minHeight: 'md',
      objectPosition: 'center',
      overlayOpacity: '60',
    },
    padding: 'py-24 md:py-32',
    children: <Body />,
  },
}
