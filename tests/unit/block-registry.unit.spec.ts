import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import type { Block } from 'payload'
import { describe, expect, it } from 'vitest'

import { Pages } from '../../src/collections/Pages'
import { Solutions } from '../../src/collections/Solutions'

/**
 * Extracts all block slugs from a Payload collection's `layout` field.
 */
function getBlockSlugs(collection: { fields: Array<Record<string, unknown>> }): string[] {
  const layoutField = collection.fields.find((f) => f.name === 'layout' && f.type === 'blocks') as
    | { blocks: Block[] }
    | undefined

  if (!layoutField) return []
  return layoutField.blocks.map((b) => b.slug)
}

/**
 * Extracts all block type strings handled in the BlockRenderer switch statement
 * by reading the source file and parsing `case '...'` patterns + fallback checks.
 */
function getRendererBlockTypes(): string[] {
  const rendererPath = resolve(__dirname, '../../src/app/(frontend)/_components/block-renderer.tsx')
  const source = readFileSync(rendererPath, 'utf-8')

  const types: string[] = []

  // Match `case 'block-type':` in switch statement
  const caseRegex = /case\s+'([^']+)':/g
  let match
  while ((match = caseRegex.exec(source)) !== null) {
    types.push(match[1])
  }

  // Match fallback checks like `if (bt === 'block-type')`
  const fallbackRegex = /bt\s*===\s*'([^']+)'/g
  while ((match = fallbackRegex.exec(source)) !== null) {
    types.push(match[1])
  }

  return types
}

/**
 * Block types that are registered in the CMS (content model + markdown
 * serialization) but do not yet have a visual React component in BlockRenderer.
 * These render as `null` on the page today. Keep this list tight: it documents
 * a known gap, and anything NOT on it that's missing a renderer fails the test.
 *
 * TODO(MKT-225): build frontend components for these and remove them from the allowlist.
 */
const UNRENDERED_BLOCKS = new Set([
  'solutions-selector',
  'faq-accordion',
  'pricing-journey',
  'formEmbed',
])

describe('BlockRenderer registry completeness', () => {
  const renderedTypes = getRendererBlockTypes()

  it('handles all block types registered in Pages collection', () => {
    const pageSlugs = getBlockSlugs(Pages)
    const missing = pageSlugs.filter(
      (slug) => !renderedTypes.includes(slug) && !UNRENDERED_BLOCKS.has(slug),
    )

    // Report exactly which blocks are missing so it's actionable. A new block
    // added to Pages without a renderer (and not in UNRENDERED_BLOCKS) fails here.
    expect(missing, `Block types registered in Pages but missing from BlockRenderer`).toEqual([])
  })

  it('handles all block types registered in Solutions collection', () => {
    const solutionSlugs = getBlockSlugs(Solutions)
    const missing = solutionSlugs.filter(
      (slug) => !renderedTypes.includes(slug) && !UNRENDERED_BLOCKS.has(slug),
    )

    expect(missing, `Block types registered in Solutions but missing from BlockRenderer`).toEqual(
      [],
    )
  })

  it('has at least 15 block type cases (sanity check)', () => {
    // If the parser breaks and finds 0 cases, this catches it
    expect(renderedTypes.length).toBeGreaterThanOrEqual(15)
  })
})
