import type { Page } from '@/payload-types'

import { Container } from '@/components/elements/container'

type ComparisonTableData = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'comparison-table' }
>

interface ComparisonTableBlockProps {
  block: ComparisonTableData
}

const BG_CLASS: Record<string, string> = {
  cream: 'bg-ash-50',
  white: 'bg-ash-50',
  'ash-light': 'bg-ash-100',
  'forest-dark': 'bg-moss-900',
}

function CellValue({
  text,
  indicator,
}: {
  text?: string | null
  indicator?: string | null
}) {
  if (indicator === 'check') {
    return (
      <span className="inline-flex items-center justify-center gap-1.5 text-moss-600">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 8l3.5 3.5L13 4.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {text && <span>{text}</span>}
      </span>
    )
  }
  if (indicator === 'cross') {
    return (
      <span className="inline-flex items-center justify-center gap-1.5 text-ash-400">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M2 2l10 10M12 2L2 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        {text && <span>{text}</span>}
      </span>
    )
  }
  if (indicator === 'partial') {
    return (
      <span className="inline-flex items-center justify-center gap-1.5 text-goldenrod-600">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 7h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        {text && <span>{text}</span>}
      </span>
    )
  }
  return <>{text ?? '—'}</>
}

export function ComparisonTableBlock({ block }: ComparisonTableBlockProps) {
  const bg = BG_CLASS[block.bgStyle ?? 'cream'] ?? BG_CLASS.cream
  const columns = block.columns ?? []
  const rows = block.rows ?? []

  return (
    <section className={`py-24 md:py-32 ${bg}`}>
      <Container>
        {/* Section header */}
        {(block.sectionLabel || block.heading || block.subheading) && (
          <div className="mx-auto mb-14 max-w-3xl text-center">
            {block.sectionLabel && (
              <p className="font-display text-moss-700 mb-3 text-sm font-semibold uppercase tracking-widest">
                {block.sectionLabel}
              </p>
            )}
            {block.heading && (
              <h2 className="font-display text-ash-900 mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                {block.heading}
              </h2>
            )}
            {block.subheading && (
              <p className="text-ash-600 text-lg/relaxed">{block.subheading}</p>
            )}
          </div>
        )}

        {/* Desktop table */}
        <div className="hidden overflow-x-auto rounded-xl border border-ash-200 md:block">
          <table className="w-full border-collapse text-sm">
            <colgroup>
              <col className="w-2/5" />
              {columns.map((_, i) => (
                <col key={i} style={{ width: `calc(60% / ${columns.length})` }} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th className="bg-ash-100 px-6 py-5 text-left" aria-hidden="true" />
                {columns.map((col, i) => (
                  <th
                    key={col.id}
                    scope="col"
                    className={`px-6 py-5 text-center font-display text-sm font-bold uppercase tracking-wide ${
                      col.highlighted
                        ? 'bg-moss-50 text-moss-800'
                        : i === 0
                          ? 'bg-ash-100 text-ash-400'
                          : 'bg-ash-100 text-goldenrod-700'
                    }`}
                  >
                    {col.heading}
                    {col.subheading && (
                      <span className="mt-0.5 block text-xs font-normal normal-case tracking-normal opacity-75">
                        {col.subheading}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr key={row.id} className={rowIdx % 2 === 0 ? 'bg-white/60' : 'bg-ash-50/60'}>
                  <th
                    scope="row"
                    className="border-t border-ash-100 px-6 py-4 text-left font-medium text-ash-800"
                  >
                    {row.label}
                  </th>
                  {columns.map((col, colIdx) => {
                    const val = row.values?.[colIdx]
                    return (
                      <td
                        key={col.id}
                        className={`border-t border-ash-100 px-6 py-4 text-center ${
                          col.highlighted
                            ? 'bg-moss-50/40 font-medium text-moss-800'
                            : colIdx === 0
                              ? 'italic text-ash-400'
                              : 'text-ash-600'
                        }`}
                      >
                        <CellValue text={val?.text} indicator={val?.indicator} />
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: stacked cards, one per column */}
        <div className="space-y-4 md:hidden">
          {columns.map((col, colIdx) => (
            <div
              key={col.id}
              className={`rounded-xl border p-5 ${
                col.highlighted ? 'border-moss-200 bg-moss-50' : 'border-ash-200 bg-white/60'
              }`}
            >
              <h3
                className={`font-display mb-4 border-b pb-3 text-sm font-bold uppercase tracking-wide ${
                  col.highlighted
                    ? 'border-moss-200 text-moss-800'
                    : colIdx === 0
                      ? 'border-ash-100 text-ash-400'
                      : 'border-ash-100 text-goldenrod-700'
                }`}
              >
                {col.heading}
              </h3>
              <dl className="space-y-3">
                {rows.map((row) => {
                  const val = row.values?.[colIdx]
                  return (
                    <div key={row.id} className="flex items-start justify-between gap-4">
                      <dt className="text-sm text-ash-600">{row.label}</dt>
                      <dd
                        className={`text-right text-sm ${
                          col.highlighted
                            ? 'font-medium text-moss-800'
                            : colIdx === 0
                              ? 'italic text-ash-400'
                              : 'text-ash-700'
                        }`}
                      >
                        <CellValue text={val?.text} indicator={val?.indicator} />
                      </dd>
                    </div>
                  )
                })}
              </dl>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
