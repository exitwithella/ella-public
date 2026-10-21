import type { Metadata } from 'next'
import React from 'react'

import { Main } from '@/components/elements/main'

import { EasterEggWrapper } from './_components/easter-egg-wrapper'
import { Footer } from './_components/footer'
import { JsonLd } from './_components/json-ld'
import { MotionProvider } from './_components/motion-provider'
import { Navbar } from './_components/navbar'
import { buildRootMetadata } from './_lib/build-metadata'
import { dmSans, instrumentSerif, termina } from './_lib/fonts'
import { getScriptInjection } from './_lib/get-scripts'
import { getSiteSettings } from './_lib/get-site-settings'
import { InjectedScripts } from './_lib/injected-html'

import './styles.css'

export async function generateMetadata(): Promise<Metadata> {
  return buildRootMetadata()
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const [scriptInjection, siteSettings] = await Promise.all([
    getScriptInjection(),
    getSiteSettings(),
  ])
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${instrumentSerif.variable} ${termina.variable}`}
    >
      <head>
        <InjectedScripts scripts={scriptInjection.scripts} placement="head" />
        <JsonLd variant="organization" settings={siteSettings} />
      </head>
      <body>
        <InjectedScripts scripts={scriptInjection.scripts} placement="body-start" />
        <MotionProvider>
          <EasterEggWrapper>
            <Navbar />
            <Main>{children}</Main>
            <Footer />
          </EasterEggWrapper>
        </MotionProvider>
        <InjectedScripts scripts={scriptInjection.scripts} placement="body-end" />
      </body>
    </html>
  )
}
