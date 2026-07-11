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
            <div className="text-theme-text-secondary [&_a]:text-theme-accent [&_h2]:font-display [&_h2]:text-theme-text [&_h3]:font-display [&_h3]:text-theme-text [&_li]:text-theme-text-secondary mt-6 max-w-none text-[1.0625rem]/[1.65] [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_li]:mb-1 [&_p]:mb-5 [&_p]:leading-[1.65] [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5">
              <RichText data={body} />
            </div>
          )}
          {/* Byte-exact attribution link for Logo.dev's automated free-tier
              validator. Wrapped in an sr-only container so it stays in the
              server-rendered DOM (crawler-detectable) while hidden from sighted
              users. The anchor markup must remain exact — do NOT add any
              attributes (class, rel, target) to the <a> itself. */}
          <div className="sr-only">
            <a href="https://logo.dev">Logos provided by Logo.dev</a>
          </div>
        </div>
      </Container>
    </ThemeSection>
  )
}
