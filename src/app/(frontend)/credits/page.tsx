import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'

import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import { ThemeSection } from '@/components/elements/theme-section'

import { buildPageMetadata } from '../_lib/build-metadata'
import { getSiteSettings } from '../_lib/get-site-settings'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: 'Credits & Attribution',
    description: 'The people, tools, and services behind ELLA.',
    path: '/credits',
    noindex: true,
  })
}

export default async function CreditsPage() {
  const settings = await getSiteSettings()
  const body = settings.creditsBody

  return (
    <ThemeSection className="py-20 md:py-28">
      <Container>
        <div className="max-w-[680px]">
          <Eyebrow className="mb-4">Attribution</Eyebrow>
          <Heading as="h1">Credits</Heading>
          {body && (
            <div className="prose prose-lg text-theme-text-secondary mt-6 max-w-none">
              <RichText data={body} />
            </div>
          )}
        </div>
      </Container>
    </ThemeSection>
  )
}
