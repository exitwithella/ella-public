import DilemmaSection from '@/components/dilemma/dilemma'
import type { Page } from '@/payload-types'

type DilemmaSectionData = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'dilemma-section' }
>

interface DilemmaSectionBlockProps {
  block: DilemmaSectionData
}

export function DilemmaSectionBlock({ block }: DilemmaSectionBlockProps) {
  const tableData = block.tableData?.length
    ? block.tableData.map(({ dim, old, rigid, patch, ella }) => ({
        dim,
        old,
        rigid,
        patch,
        ella,
      }))
    : undefined

  const steps = block.steps?.length
    ? block.steps.map(({ label, sub }) => ({ label, sub }))
    : undefined

  return (
    <DilemmaSection
      label={block.label ?? undefined}
      heading={block.heading}
      headingAccent={block.headingAccent ?? undefined}
      body={block.body ?? undefined}
      transitionLine1={block.transitionLine1 ?? undefined}
      transitionLine2={block.transitionLine2 ?? undefined}
      tableData={tableData}
      steps={steps}
      columnSubtitles={{
        old: block.columnSubtitles?.old ?? undefined,
        rigid: block.columnSubtitles?.rigid ?? undefined,
        patch: block.columnSubtitles?.patch ?? undefined,
        ella: block.columnSubtitles?.ella ?? undefined,
      }}
      closer={block.closer ?? undefined}
    />
  )
}
