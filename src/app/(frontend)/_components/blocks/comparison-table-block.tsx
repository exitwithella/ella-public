import { Container } from '@/components/elements/container'
import { SectionHeader } from '@/components/elements/section-header'
import { ThemeSection } from '@/components/elements/theme-section'
import type { Page } from '@/payload-types'

type ComparisonTableData = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'comparison-table' }
>

interface ComparisonTableBlockProps {
  block: ComparisonTableData
}

function CellValue({ text, indicator }: { text?: string | null; indicator?: string | null }) {
  if (indicator === 'check') {
    return (
      <span className="text-moss-600 inline-flex items-center justify-center gap-1.5">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 8l3.5 3.5L13 4.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {text ? <span>{text}</span> : <span className="sr-only">Yes</span>}
      </span>
    )
  }
  if (indicator === 'cross') {
    return (
      <span className="text-theme-text-muted inline-flex items-center justify-center gap-1.5">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M2 2l10 10M12 2L2 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        {text ? <span>{text}</span> : <span className="sr-only">No</span>}
      </span>
    )
  }
  if (indicator === 'partial') {
    return (
      <span className="text-goldenrod-600 inline-flex items-center justify-center gap-1.5">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 7h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        {text ? <span>{text}</span> : <span className="sr-only">Partial</span>}
      </span>
    )
  }
  return <>{text ?? '—'}</>
}

export function ComparisonTableBlock({ block }: ComparisonTableBlockProps) {
  const columns = block.columns ?? []
  const rows = block.rows ?? []

  return (
    <ThemeSection bgStyle={block.bgStyle} className="py-24 md:py-32">
      <Container>
        <SectionHeader
          label={block.sectionLabel}
          heading={block.heading}
          subheading={block.subheading}
          align="center"
          marginClassName="mb-14"
          className="mx-auto max-w-3xl"
          headingClassName="mb-4 text-3xl md:text-4xl"
          eyebrowSize="sm"
        />

        {/* Desktop table */}
        <div className="border-theme-border hidden overflow-x-auto rounded-sm border md:block">
          <table className="w-full border-collapse text-sm">
            <colgroup>
              <col className="w-2/5" />
              {columns.map((_, i) => (
                <col key={i} style={{ width: `calc(60% / ${columns.length})` }} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th className="bg-theme-surface px-6 py-5 text-left" scope="col">
                  <span className="sr-only">Feature</span>
                </th>
                {columns.map((col, i) => (
                  <th
                    key={col.id}
                    scope="col"
                    className={`font-display px-6 py-5 text-center text-sm font-bold tracking-wide uppercase ${
                      col.highlighted
                        ? 'bg-moss-50 text-moss-800'
                        : i === 0
                          ? 'bg-theme-surface text-theme-text-muted'
                          : 'bg-theme-surface text-goldenrod-700'
                    }`}
                  >
                    {col.heading}
                    {col.subheading && (
                      <span className="mt-0.5 block text-xs font-normal tracking-normal normal-case opacity-75">
                        {col.subheading}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr
                  key={row.id}
                  className={rowIdx % 2 === 0 ? 'bg-sandstone-50/60' : 'bg-theme-surface/40'}
                >
                  <th
                    scope="row"
                    className="border-theme-border text-theme-text border-t px-6 py-4 text-left font-medium"
                  >
                    {row.label}
                  </th>
                  {columns.map((col, colIdx) => {
                    const val = row.values?.[colIdx]
                    return (
                      <td
                        key={col.id}
                        className={`border-theme-border border-t px-6 py-4 text-center ${
                          col.highlighted
                            ? 'bg-moss-50/40 text-moss-800 font-medium'
                            : colIdx === 0
                              ? 'text-theme-text-muted italic'
                              : 'text-theme-text-secondary'
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
              className={`rounded-sm border p-5 ${
                col.highlighted
                  ? 'border-moss-200 bg-moss-50'
                  : 'border-theme-border bg-sandstone-50'
              }`}
            >
              <h3
                className={`font-display mb-4 border-b pb-3 text-sm font-bold tracking-wide uppercase ${
                  col.highlighted
                    ? 'border-moss-200 text-moss-800'
                    : colIdx === 0
                      ? 'border-theme-border text-theme-text-muted'
                      : 'border-theme-border text-goldenrod-700'
                }`}
              >
                {col.heading}
              </h3>
              <dl className="space-y-3">
                {rows.map((row) => {
                  const val = row.values?.[colIdx]
                  return (
                    <div key={row.id} className="flex items-start justify-between gap-4">
                      <dt className="text-theme-text-secondary text-sm">{row.label}</dt>
                      <dd
                        className={`text-right text-sm ${
                          col.highlighted
                            ? 'text-moss-800 font-medium'
                            : colIdx === 0
                              ? 'text-theme-text-muted italic'
                              : 'text-theme-text-secondary'
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
    </ThemeSection>
  )
}
