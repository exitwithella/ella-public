import type { ReactNode } from 'react'

import { Container } from '@/components/elements/container'

import { trustSecurity } from '../../_lib/content'

function parseEmphasis(text: string): ReactNode[] {
  const parts = text.split(/(\*[^*]+\*)/)
  return parts.map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>
    }
    return part
  })
}

export function PlatformTrust() {
  const leftSections = trustSecurity.sections.filter((s) => s.column === 'left')
  const rightSections = trustSecurity.sections.filter((s) => s.column === 'right')

  return (
    <section className="bg-ash-100/50 py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-ash-900 mb-8 text-2xl font-semibold tracking-tight md:text-3xl">
            {parseEmphasis(trustSecurity.headline)}
          </h2>

          <hr className="border-ash-300 mb-8" />

          <p className="text-ash-700 mb-14 max-w-4xl text-base/relaxed">
            {parseEmphasis(trustSecurity.description)}
          </p>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
            {leftSections.length > 0 && (
              <div className="space-y-8 lg:col-span-3">
                {leftSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-ash-900 mb-3 text-lg font-bold">{section.title}</h3>
                    {section.body && (
                      <div className="text-ash-600 space-y-4 text-base/relaxed">
                        {section.body.split('\n\n').map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>
                    )}
                    {section.bulletHeading && (
                      <h4 className="text-ash-900 mt-6 mb-3 text-base font-bold">
                        {section.bulletHeading}
                      </h4>
                    )}
                    {'bulletItems' in section && section.bulletItems && (
                      <ul className="border-ash-200 space-y-2 border-b pb-6">
                        {section.bulletItems.map((item) => (
                          <li key={item} className="text-ash-700 text-sm/relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {rightSections.length > 0 && (
              <div className="space-y-10 lg:col-span-2">
                {rightSections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-ash-900 mb-3 text-lg font-bold">{section.title}</h3>
                    {section.body && (
                      <p className="text-ash-600 text-base/relaxed">{section.body}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
