import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const SRC = fileURLToPath(new URL('../../src', import.meta.url))

function sourceFiles(dir: string): string[] {
  const files: string[] = []
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) {
      files.push(...sourceFiles(path))
      continue
    }
    if (/\.(tsx?|css)$/.test(entry)) files.push(path)
  }
  return files
}

describe('ash color scale', () => {
  it('does not reference the missing ash-1000 shade', () => {
    const hits = sourceFiles(SRC).filter((file) => readFileSync(file, 'utf8').includes('ash-1000'))
    expect(hits.map((file) => relative(SRC, file))).toEqual([])
  })

  it('defines the ash text shades used in place of ash-1000', () => {
    const css = readFileSync(join(SRC, 'app/(frontend)/styles.css'), 'utf8')
    expect(css).toContain('--color-ash-700:')
    expect(css).toContain('--color-ash-900:')
    expect(css).not.toContain('--color-ash-1000')
  })
})
