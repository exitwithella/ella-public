import type { Metadata } from 'next'

import { platformPillars } from '../_lib/content'
import { ConnectedWorkflow } from './_components/connected-workflow'
import { PillarDeepDive } from './_components/pillar-deep-dive'
import { PillarOverviewGrid } from './_components/pillar-overview-grid'
import { PlatformCloser } from './_components/platform-closer'
import { PlatformHero } from './_components/platform-hero'
import { PlatformTrust } from './_components/platform-trust'

export const metadata: Metadata = {
  title: 'Platform — ELLA',
  description:
    'Fact Finding, Sensemaking, and Deliverables — the three connected pillars that hold your entire advisory workflow in one place.',
  openGraph: {
    title: 'The ELLA Platform',
    description:
      'From intake to insight, all in one place. See how ELLA connects the full advisory workflow.',
    url: 'https://withella.io/platform',
  },
}

export default function PlatformPage() {
  return (
    <>
      <PlatformHero />
      <PillarOverviewGrid />
      {platformPillars.map((pillar, index) => (
        <PillarDeepDive key={pillar.id} pillar={pillar} index={index} bgLight={index % 2 === 1} />
      ))}
      <ConnectedWorkflow />
      <PlatformTrust />
      <PlatformCloser />
    </>
  )
}
