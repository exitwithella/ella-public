import type { Page } from '@/payload-types'

import DilemmaSection from '@/components/dilemma/dilemma'

type DilemmaSectionData = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'dilemma-section' }
>

interface DilemmaSectionBlockProps {
  block: DilemmaSectionData
}

export function DilemmaSectionBlock({ block }: DilemmaSectionBlockProps) {
  const tableData =
    block.tableData && Array.isArray(block.tableData)
      ? (block.tableData as Array<{
          dim: string
          old: string
          rigid: string
          patch: string
          ella: string
        }>)
      : undefined

  const steps =
    block.steps && Array.isArray(block.steps)
      ? (block.steps as Array<{ label: string; sub: string }>)
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
    />
  )
}
