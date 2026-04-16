interface LexicalNode {
  type: string
  text?: string
  children?: LexicalNode[]
  format?: string | number
  tag?: string
  listType?: string
  url?: string
  [key: string]: unknown
}

interface RichTextProps {
  data: {
    root: {
      children: LexicalNode[]
      [key: string]: unknown
    }
  } | null
  className?: string
}

function renderNode(node: LexicalNode, index: number): React.ReactNode {
  if (node.type === 'text') {
    let content: React.ReactNode = node.text ?? ''
    const format = typeof node.format === 'number' ? node.format : 0
    if (format & 1) content = <strong key={index}>{content}</strong>
    if (format & 2) content = <em key={index}>{content}</em>
    return content
  }

  if (node.type === 'linebreak') return <br key={index} />

  const children = node.children?.map((child, i) => renderNode(child, i)) ?? []

  switch (node.type) {
    case 'paragraph':
      return <p key={index}>{children}</p>
    case 'heading':
      const Tag = (node.tag as keyof JSX.IntrinsicElements) || 'h2'
      return <Tag key={index}>{children}</Tag>
    case 'list':
      return node.listType === 'number' ? (
        <ol key={index}>{children}</ol>
      ) : (
        <ul key={index}>{children}</ul>
      )
    case 'listitem':
      return <li key={index}>{children}</li>
    case 'link':
      return (
        <a key={index} href={node.url as string}>
          {children}
        </a>
      )
    case 'quote':
      return <blockquote key={index}>{children}</blockquote>
    default:
      return <div key={index}>{children}</div>
  }
}

export function RichText({ data, className }: RichTextProps) {
  if (!data?.root?.children) return null

  return <div className={className}>{data.root.children.map((node, i) => renderNode(node, i))}</div>
}
