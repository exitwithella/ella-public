import type { SerializedEditorState } from 'lexical'

interface LexicalNode {
  type: string
  children?: LexicalNode[]
  text?: string
  format?: number | string
  tag?: string
  listType?: string
  url?: string
  fields?: { url?: string; linkType?: string; newTab?: boolean }
  value?: number
  [key: string]: unknown
}

// Lexical text format bitmasks
const IS_BOLD = 1
const IS_ITALIC = 2
const IS_STRIKETHROUGH = 4
const IS_CODE = 16

function formatText(text: string, format: number): string {
  if (!text) return ''
  let result = text
  if (format & IS_CODE) result = `\`${result}\``
  if (format & IS_BOLD) result = `**${result}**`
  if (format & IS_ITALIC) result = `*${result}*`
  if (format & IS_STRIKETHROUGH) result = `~~${result}~~`
  return result
}

function serializeChildren(children: LexicalNode[]): string {
  return children.map((child) => serializeNode(child)).join('')
}

function serializeNode(node: LexicalNode): string {
  switch (node.type) {
    case 'text': {
      const format = typeof node.format === 'number' ? node.format : 0
      return formatText(node.text ?? '', format)
    }

    case 'linebreak':
      return '\n'

    case 'link':
    case 'autolink': {
      const url = node.fields?.url ?? node.url ?? ''
      const text = node.children ? serializeChildren(node.children) : url
      return `[${text}](${url})`
    }

    case 'paragraph': {
      const content = node.children ? serializeChildren(node.children) : ''
      return content ? `${content}\n\n` : '\n'
    }

    case 'heading': {
      const level = node.tag ? parseInt(node.tag.replace('h', ''), 10) : 2
      const prefix = '#'.repeat(level)
      const content = node.children ? serializeChildren(node.children) : ''
      return `${prefix} ${content}\n\n`
    }

    case 'quote': {
      const content = node.children ? serializeChildren(node.children) : ''
      const lines = content.trim().split('\n')
      return lines.map((line) => `> ${line}`).join('\n') + '\n\n'
    }

    case 'list': {
      const items = node.children ?? []
      const isOrdered = node.listType === 'number'
      return (
        items
          .map((item, i) => {
            const content = item.children ? serializeChildren(item.children) : ''
            const prefix = isOrdered ? `${i + 1}. ` : '- '
            return `${prefix}${content.trim()}`
          })
          .join('\n') + '\n\n'
      )
    }

    case 'listitem': {
      return node.children ? serializeChildren(node.children) : ''
    }

    case 'horizontalrule':
      return '---\n\n'

    case 'tab':
      return '  '

    default: {
      // For unknown node types, try to serialize children
      if (node.children) {
        return serializeChildren(node.children)
      }
      return ''
    }
  }
}

export function lexicalToMarkdown(data: SerializedEditorState | null | undefined): string {
  if (!data?.root?.children) return ''
  const children = data.root.children as LexicalNode[]
  return serializeChildren(children).trim()
}
