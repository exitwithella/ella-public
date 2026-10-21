import { createElement, Fragment, type ReactNode } from 'react'

/**
 * CMS snippets are full tags (`<script src="...">`, `<link>`, `<meta>`), not
 * raw JavaScript. Emitting them inside a `<div>` is invalid in `<head>`: the
 * parser closes head at the div and moves everything after it into body.
 * This turns each snippet into the elements it actually contains.
 */

type ScriptPlacement = 'head' | 'body-start' | 'body-end'

type Attrs = Record<string, string | true>

type ParsedNode =
  | { kind: 'script'; attrs: Attrs; body: string }
  | { kind: 'noscript'; attrs: Attrs; body: string }
  | { kind: 'link'; attrs: Attrs }
  | { kind: 'meta'; attrs: Attrs }

const BOOLEAN_ATTRS = new Set(['async', 'defer', 'nomodule'])

const PROP_NAMES: Record<string, string> = {
  charset: 'charSet',
  class: 'className',
  crossorigin: 'crossOrigin',
  fetchpriority: 'fetchPriority',
  for: 'htmlFor',
  'http-equiv': 'httpEquiv',
  itemprop: 'itemProp',
  itemscope: 'itemScope',
  itemtype: 'itemType',
  nomodule: 'noModule',
  referrerpolicy: 'referrerPolicy',
}

function isAllowedTag(tag: string): tag is ParsedNode['kind'] {
  return tag === 'script' || tag === 'noscript' || tag === 'link' || tag === 'meta'
}

function parseAttributes(
  input: string,
  start: number,
): { attrs: Attrs; index: number; selfClosing: boolean } | null {
  const attrs: Attrs = {}
  let i = start

  while (i < input.length) {
    while (i < input.length && /\s/.test(input[i] ?? '')) i += 1
    if (i >= input.length) return null

    if (input[i] === '>') return { attrs, index: i + 1, selfClosing: false }
    if (input[i] === '/' && input[i + 1] === '>') {
      return { attrs, index: i + 2, selfClosing: true }
    }

    const nameMatch = /^[^\s=/>]+/.exec(input.slice(i))
    if (!nameMatch) return null
    const name = nameMatch[0]
    i += name.length

    while (i < input.length && /\s/.test(input[i] ?? '')) i += 1
    if (input[i] !== '=') {
      attrs[name] = true
      continue
    }

    i += 1
    while (i < input.length && /\s/.test(input[i] ?? '')) i += 1
    const quote = input[i]
    if (quote === '"' || quote === "'") {
      const end = input.indexOf(quote, i + 1)
      if (end === -1) return null
      attrs[name] = input.slice(i + 1, end)
      i = end + 1
      continue
    }

    const valueMatch = /^[^\s>]+/.exec(input.slice(i))
    if (!valueMatch) return null
    attrs[name] = valueMatch[0]
    i += valueMatch[0].length
  }

  return null
}

function closingTagEnd(input: string, from: number, tag: string): { start: number; end: number } {
  const pattern = new RegExp(`</${tag}\\s*>`, 'i')
  const match = pattern.exec(input.slice(from))
  if (!match) return { start: input.length, end: input.length }
  return { start: from + match.index, end: from + match.index + match[0].length }
}

export function parseSnippet(code: string): ParsedNode[] {
  const nodes: ParsedNode[] = []
  let sawTag = false
  let i = 0

  while (i < code.length) {
    if (code.startsWith('<!--', i)) {
      const end = code.indexOf('-->', i + 4)
      i = end === -1 ? code.length : end + 3
      continue
    }

    if (code[i] !== '<') {
      i += 1
      continue
    }

    if (code[i + 1] === '/' || code[i + 1] === '!') {
      const end = code.indexOf('>', i)
      i = end === -1 ? code.length : end + 1
      continue
    }

    const nameMatch = /^([A-Za-z][\w:-]*)/.exec(code.slice(i + 1))
    if (!nameMatch) {
      i += 1
      continue
    }

    sawTag = true
    const rawName = nameMatch[1] ?? ''
    const tag = rawName.toLowerCase()
    const parsed = parseAttributes(code, i + 1 + rawName.length)
    if (!parsed) break

    if (!isAllowedTag(tag)) {
      i = parsed.index
      continue
    }

    if (tag === 'link' || tag === 'meta') {
      nodes.push({ kind: tag, attrs: parsed.attrs })
      i = parsed.index
      continue
    }

    if (parsed.selfClosing) {
      nodes.push({ kind: tag, attrs: parsed.attrs, body: '' })
      i = parsed.index
      continue
    }

    const close = closingTagEnd(code, parsed.index, tag)
    nodes.push({ kind: tag, attrs: parsed.attrs, body: code.slice(parsed.index, close.start) })
    i = close.end
  }

  if (nodes.length === 0 && !sawTag && code.trim()) {
    return [{ kind: 'script', attrs: {}, body: code.trim() }]
  }

  return nodes
}

function attrsToProps(attrs: Attrs): Record<string, string | boolean> {
  const props: Record<string, string | boolean> = {}

  for (const [rawName, value] of Object.entries(attrs)) {
    const lower = rawName.toLowerCase()
    if (lower.startsWith('on')) continue

    const prop = PROP_NAMES[lower] ?? lower
    if (BOOLEAN_ATTRS.has(lower)) {
      props[prop] = true
      continue
    }
    props[prop] = value === true ? true : value
  }

  return props
}

function elementFor(node: ParsedNode, key: string): ReactNode {
  const props = attrsToProps(node.attrs)

  switch (node.kind) {
    case 'script': {
      if (typeof props.src === 'string' && props.src.length > 0) {
        return createElement('script', { ...props, key })
      }
      return createElement('script', {
        ...props,
        key,
        dangerouslySetInnerHTML: { __html: node.body },
      })
    }
    case 'noscript':
      return createElement('noscript', {
        ...props,
        key,
        dangerouslySetInnerHTML: { __html: node.body },
      })
    case 'link':
      return createElement('link', { ...props, key })
    case 'meta':
      return createElement('meta', { ...props, key })
    default: {
      const exhaustive: never = node
      return exhaustive
    }
  }
}

export function InjectedScripts({
  scripts,
  placement,
}: {
  scripts:
    | ReadonlyArray<{
        code: string
        id?: string | null
        enabled?: boolean | null
        placement?: string | null
      }>
    | null
    | undefined
  placement: ScriptPlacement
}) {
  const matched = (scripts ?? []).filter(
    (script) => Boolean(script.enabled) && script.placement === placement,
  )
  if (matched.length === 0) return null

  return (
    <>
      {matched.map((script, index) => {
        const key = script.id ?? `${placement}-${index}`
        const nodes = parseSnippet(script.code).map((node, nodeIndex) =>
          elementFor(node, `${key}-${nodeIndex}`),
        )
        return <Fragment key={key}>{nodes}</Fragment>
      })}
    </>
  )
}
