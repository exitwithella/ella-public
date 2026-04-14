import type { Meta, StoryObj } from '@storybook/react-vite'

import { ArrowNarrowRightIcon } from './arrow-narrow-right-icon'
import { CheckmarkIcon } from './checkmark-icon'
import { ChevronIcon } from './chevron-icon'
import { MinusIcon } from './minus-icon'
import { PlusIcon } from './plus-icon'
import { Squares2StackedIcon } from './squares-2-stacked-icon'

const meta: Meta = {
  title: 'ELLA/Icons/Inline SVG',
}
export default meta
type Story = StoryObj

const icons = [
  { name: 'PlusIcon', Component: PlusIcon },
  { name: 'MinusIcon', Component: MinusIcon },
  { name: 'ChevronIcon', Component: ChevronIcon },
  { name: 'ArrowNarrowRightIcon', Component: ArrowNarrowRightIcon },
  { name: 'CheckmarkIcon', Component: CheckmarkIcon },
  { name: 'Squares2StackedIcon', Component: Squares2StackedIcon },
]

export const AllIcons: Story = {
  name: 'All inline icons',
  render: () => (
    <div className="p-10">
      <div className="grid grid-cols-3 gap-8 sm:grid-cols-6">
        {icons.map(({ name, Component }) => (
          <div key={name} className="flex flex-col items-center gap-3">
            <div className="text-theme-text flex items-center justify-center gap-4">
              <Component className="h-4 w-4" />
              <Component className="h-6 w-6" />
              <Component className="h-8 w-8" />
            </div>
            <span className="text-theme-text-muted text-xs">{name}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}
