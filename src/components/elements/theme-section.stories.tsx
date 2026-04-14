import type { Meta, StoryObj } from '@storybook/react-vite'

import { ThemeSection, isDarkTheme, type ThemeName } from './theme-section'

const meta: Meta = {
  title: 'ELLA/Elements/ThemeSection',
}
export default meta
type Story = StoryObj

const THEMES: ThemeName[] = [
  'sandstone',
  'white',
  'mint',
  'goldenrod',
  'ash',
  'forest',
  'tannery',
  'leather',
  'ocean',
  'brand-black',
]

export const AllThemes: Story = {
  name: 'All 10 themes',
  render: () => (
    <div className="flex flex-col">
      {THEMES.map((theme) => (
        <ThemeSection key={theme} bgStyle={theme} className="px-10 py-12">
          <div className="mx-auto max-w-xl">
            <p className="text-theme-accent mb-1 text-xs font-semibold tracking-widest uppercase">
              {theme} {isDarkTheme(theme) ? '(dark)' : '(light)'}
            </p>
            <h2 className="text-theme-text font-display mb-2 text-2xl font-bold tracking-tight">
              Theme Section
            </h2>
            <p className="text-theme-text-secondary mb-1 text-sm">
              Secondary text on {theme} background
            </p>
            <p className="text-theme-text-muted text-xs">
              Muted text for captions and labels
            </p>
            <div className="bg-theme-surface border-theme-border mt-4 rounded border p-4">
              <p className="text-theme-text text-sm">Surface + border</p>
            </div>
          </div>
        </ThemeSection>
      ))}
    </div>
  ),
}
