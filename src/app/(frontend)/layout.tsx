import type { Metadata } from 'next'
import React from 'react'

import { Main } from '@/components/elements/main'

import { EasterEggWrapper } from './_components/easter-egg-wrapper'
import { Footer } from './_components/footer'
import { JsonLd } from './_components/json-ld'
import { Navbar } from './_components/navbar'
import { buildRootMetadata } from './_lib/build-metadata'
import { dmSans, instrumentSerif, termina } from './_lib/fonts'
import { getScriptInjection } from './_lib/get-scripts'
import { getSiteSettings } from './_lib/get-site-settings'

import './styles.css'

export async function generateMetadata(): Promise<Metadata> {
  return buildRootMetadata()
}

function InjectedScripts({
  scripts,
}: {
  scripts: ReadonlyArray<{ code: string; id?: string | null }>
}) {
  if (scripts.length === 0) return null
  return (
    <>
      {scripts.map((script) => (
        <div key={script.id} dangerouslySetInnerHTML={{ __html: script.code }} />
      ))}
    </>
  )
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const [scriptInjection, siteSettings] = await Promise.all([
    getScriptInjection(),
    getSiteSettings(),
  ])
  const enabled = scriptInjection.scripts?.filter((s) => s.enabled) ?? []
  const headScripts = enabled.filter((s) => s.placement === 'head')
  const bodyStartScripts = enabled.filter((s) => s.placement === 'body-start')
  const bodyEndScripts = enabled.filter((s) => s.placement === 'body-end')

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${instrumentSerif.variable} ${termina.variable}`}
    >
      <head>
        <InjectedScripts scripts={headScripts} />
        <JsonLd variant="organization" settings={siteSettings} />
      </head>
      <body>
        <InjectedScripts scripts={bodyStartScripts} />
        <EasterEggWrapper>
          <Navbar />
          <Main>{children}</Main>
          <Footer />
        </EasterEggWrapper>
        <InjectedScripts scripts={bodyEndScripts} />
      </body>
    </html>
  )
}
