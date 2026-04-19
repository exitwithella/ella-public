import type { SerializedEditorState } from 'lexical'
import { describe, expect, it } from 'vitest'

import { lexicalToMarkdown } from '../../src/app/(frontend)/_lib/lexical-to-markdown'

function makeEditor(children: unknown[]): SerializedEditorState {
  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  } as SerializedEditorState
}

describe('lexicalToMarkdown', () => {
  it('returns empty string for null input', () => {
    expect(lexicalToMarkdown(null)).toBe('')
    expect(lexicalToMarkdown(undefined)).toBe('')
  })

  it('converts a paragraph with plain text', () => {
    const data = makeEditor([
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'Hello world', format: 0 }],
      },
    ])
    expect(lexicalToMarkdown(data)).toBe('Hello world')
  })

  it('converts bold text', () => {
    const data = makeEditor([
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'bold text', format: 1 }],
      },
    ])
    expect(lexicalToMarkdown(data)).toBe('**bold text**')
  })

  it('converts italic text', () => {
    const data = makeEditor([
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'italic text', format: 2 }],
      },
    ])
    expect(lexicalToMarkdown(data)).toBe('*italic text*')
  })

  it('converts bold+italic text', () => {
    const data = makeEditor([
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'bold italic', format: 3 }],
      },
    ])
    expect(lexicalToMarkdown(data)).toBe('***bold italic***')
  })

  it('converts inline code', () => {
    const data = makeEditor([
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'code', format: 16 }],
      },
    ])
    expect(lexicalToMarkdown(data)).toBe('`code`')
  })

  it('converts headings', () => {
    const data = makeEditor([
      {
        type: 'heading',
        tag: 'h1',
        children: [{ type: 'text', text: 'Title', format: 0 }],
      },
      {
        type: 'heading',
        tag: 'h3',
        children: [{ type: 'text', text: 'Subsection', format: 0 }],
      },
    ])
    expect(lexicalToMarkdown(data)).toBe('# Title\n\n### Subsection')
  })

  it('converts links', () => {
    const data = makeEditor([
      {
        type: 'paragraph',
        children: [
          { type: 'text', text: 'Visit ', format: 0 },
          {
            type: 'link',
            fields: { url: 'https://example.com' },
            children: [{ type: 'text', text: 'Example', format: 0 }],
          },
        ],
      },
    ])
    expect(lexicalToMarkdown(data)).toBe('Visit [Example](https://example.com)')
  })

  it('converts blockquotes', () => {
    const data = makeEditor([
      {
        type: 'quote',
        children: [{ type: 'text', text: 'A wise quote', format: 0 }],
      },
    ])
    expect(lexicalToMarkdown(data)).toBe('> A wise quote')
  })

  it('converts unordered lists', () => {
    const data = makeEditor([
      {
        type: 'list',
        listType: 'bullet',
        children: [
          {
            type: 'listitem',
            children: [{ type: 'text', text: 'First', format: 0 }],
          },
          {
            type: 'listitem',
            children: [{ type: 'text', text: 'Second', format: 0 }],
          },
        ],
      },
    ])
    expect(lexicalToMarkdown(data)).toBe('- First\n- Second')
  })

  it('converts ordered lists', () => {
    const data = makeEditor([
      {
        type: 'list',
        listType: 'number',
        children: [
          {
            type: 'listitem',
            children: [{ type: 'text', text: 'Step one', format: 0 }],
          },
          {
            type: 'listitem',
            children: [{ type: 'text', text: 'Step two', format: 0 }],
          },
        ],
      },
    ])
    expect(lexicalToMarkdown(data)).toBe('1. Step one\n2. Step two')
  })

  it('converts horizontal rules', () => {
    const data = makeEditor([
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'Before', format: 0 }],
      },
      { type: 'horizontalrule' },
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'After', format: 0 }],
      },
    ])
    expect(lexicalToMarkdown(data)).toBe('Before\n\n---\n\nAfter')
  })

  it('handles multiple paragraphs', () => {
    const data = makeEditor([
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'First paragraph', format: 0 }],
      },
      {
        type: 'paragraph',
        children: [{ type: 'text', text: 'Second paragraph', format: 0 }],
      },
    ])
    expect(lexicalToMarkdown(data)).toBe('First paragraph\n\nSecond paragraph')
  })
})
