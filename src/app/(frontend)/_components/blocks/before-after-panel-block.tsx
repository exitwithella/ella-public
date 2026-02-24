import { Container } from '@/components/elements/container'
import type { Page } from '@/payload-types'

type BeforeAfterPanelData = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'before-after-panel' }
>

interface BeforeAfterPanelBlockProps {
  block: BeforeAfterPanelData
}

export function BeforeAfterPanelBlock({ block }: BeforeAfterPanelBlockProps) {
  const beforeLabel = block.before?.label ?? 'Without ELLA'
  const afterLabel = block.after?.label ?? 'With ELLA'
  const beforePoints = block.before?.points ?? []
  const afterPoints = block.after?.points ?? []

  return (
    <section className="bg-ash-50 py-20 md:py-28">
      <Container>
        {/* Section header */}
        {(block.sectionLabel || block.heading) && (
          <div className="mb-12 md:mb-16">
            {block.sectionLabel && (
              <p className="text-moss-600 mb-3 text-xs font-semibold tracking-widest uppercase">
                {block.sectionLabel}
              </p>
            )}
            {block.heading && (
              <h2 className="font-display text-ash-900 text-2xl font-bold tracking-tight md:text-3xl">
                {block.heading}
              </h2>
            )}
            {block.subheading && (
              <p className="text-ash-600 mt-4 max-w-2xl text-lg/relaxed">{block.subheading}</p>
            )}
          </div>
        )}

        {/* Two-panel layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {/* Before panel — fragmented, cluttered feel */}
          <div className="border-ash-200 bg-ash-100/60 rounded-sm border p-8">
            <div className="mb-6 flex items-center gap-2">
              <span className="bg-ash-300 inline-block h-2 w-2 rounded-full" aria-hidden="true" />
              <h3 className="font-display text-ash-500 text-sm font-semibold tracking-wider uppercase">
                {beforeLabel}
              </h3>
            </div>
            {beforePoints.length > 0 && (
              <ol className="space-y-4">
                {beforePoints.map((point, index) => (
                  <li key={point.id} className="flex items-start gap-3">
                    <span
                      className="text-ash-400 mt-0.5 w-5 shrink-0 text-center text-sm font-medium tabular-nums"
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <span className="text-ash-600 text-base/relaxed">{point.text}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>

          {/* After panel — clean, unified feel */}
          <div className="bg-moss-50 border-moss-200 rounded-sm border p-8">
            <div className="mb-6 flex items-center gap-2">
              <span className="bg-moss-500 inline-block h-2 w-2 rounded-full" aria-hidden="true" />
              <h3 className="font-display text-moss-700 text-sm font-semibold tracking-wider uppercase">
                {afterLabel}
              </h3>
            </div>
            {afterPoints.length > 0 && (
              <ol className="space-y-4">
                {afterPoints.map((point, index) => (
                  <li key={point.id} className="flex items-start gap-3">
                    <span
                      className="text-moss-500 mt-0.5 w-5 shrink-0 text-center text-sm font-medium tabular-nums"
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <span className="text-ash-700 text-base/relaxed font-medium">{point.text}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
