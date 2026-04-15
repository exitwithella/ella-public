import React from 'react'

import { Main } from '@/components/elements/main'

import { EasterEggWrapper } from './_components/easter-egg-wrapper'
import { Footer } from './_components/footer'
import { MotionProvider } from './_components/motion-provider'
import { Navbar } from './_components/navbar'
import { getScriptInjection } from './_lib/get-scripts'

import './styles.css'

export const dynamic = 'force-dynamic'

export const metadata = {
  description:
    'ELLA turns trust into action with tools built for advisor-led transitions. Go from intake to insight in a fraction of the time.',
  title: 'ELLA | Practice Systematization for Trusted Advisors',
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
  const scriptInjection = await getScriptInjection()
  const enabled = scriptInjection.scripts?.filter((s) => s.enabled) ?? []
  const headScripts = enabled.filter((s) => s.placement === 'head')
  const bodyStartScripts = enabled.filter((s) => s.placement === 'body-start')
  const bodyEndScripts = enabled.filter((s) => s.placement === 'body-end')

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <InjectedScripts scripts={headScripts} />
      </head>
      <body>
        <InjectedScripts scripts={bodyStartScripts} />
        <EasterEggWrapper>
          <MotionProvider>
            <Navbar />
            <Main>{children}</Main>
            <Footer />
          </MotionProvider>
        </EasterEggWrapper>
        <InjectedScripts scripts={bodyEndScripts} />
      </body>
    </html>
  )
}
