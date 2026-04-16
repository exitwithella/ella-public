'use client'

import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { BillingToggle, type BillingPeriod } from './billing-toggle'

const meta: Meta = {
  title: 'ELLA/Pricing/Billing Toggle',
}
export default meta
type Story = StoryObj

function BillingToggleDemo() {
  const [period, setPeriod] = useState<BillingPeriod>('year')
  return (
    <div className="flex flex-col items-center gap-4 p-10">
      <BillingToggle value={period} onChange={setPeriod} />
      <p className="text-theme-text-muted text-sm">Selected: {period}</p>
    </div>
  )
}

export const Interactive: Story = {
  render: () => <BillingToggleDemo />,
}
