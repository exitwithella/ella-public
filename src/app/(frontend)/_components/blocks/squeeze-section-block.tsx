import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { defaultErosionItems, defaultPressureItems } from '@/components/squeeze/pressure-walls'
import { SqueezeSection } from '@/components/squeeze/squeeze-section'
import type { Page } from '@/payload-types'

function extractParagraphs(body: SerializedEditorState | undefined | null): string[] {
  if (!body?.root?.children) return []
  const paragraphs: string[] = []
  for (const node of body.root.children) {
    if (node.type === 'paragraph' && 'children' in node) {
      const text = (node.children as Array<{ text?: string }>)
        .map((child) => child.text ?? '')
        .join('')
      if (text.trim()) {
        paragraphs.push(text)
      }
    }
  }
  return paragraphs
}

type SqueezeSectionData = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'squeeze-section' }
>

interface SqueezeSectionBlockProps {
  block: SqueezeSectionData
}

export function SqueezeSectionBlock({ block }: SqueezeSectionBlockProps) {
  const bodyParagraphs = extractParagraphs(block.body)

  const quotes = (block.quotes ?? []).map((q) => ({
    text: q.text,
    attribution: q.attribution,
  }))

  const pressureItems =
    block.pressureItems && block.pressureItems.length > 0
      ? block.pressureItems.map((item) => item.text)
      : defaultPressureItems

  const erosionItems =
    block.erosionItems && block.erosionItems.length > 0
      ? block.erosionItems.map((item) => item.text)
      : defaultErosionItems

  return (
    <SqueezeSection
      label={block.label}
      heading={block.heading}
      bodyParagraphs={bodyParagraphs}
      quotes={quotes}
      closer={block.closer}
      pressureItems={pressureItems}
      erosionItems={erosionItems}
    />
  )
}
