import { createElement, isValidElement, type ReactElement, type ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { InjectedScripts } from '@/app/(frontend)/_lib/injected-html'

function childKeys(node: ReactNode): string[] {
  if (!isValidElement(node)) return []
  const children = (node.props as { children?: ReactNode }).children
  const list = Array.isArray(children) ? children : [children]
  return list.filter(isValidElement).map((child) => String((child as ReactElement).key))
}

describe('InjectedScripts', () => {
  it('emits a script in head and does not wrap it in a div', () => {
    const html = renderToStaticMarkup(
      createElement(
        'head',
        null,
        createElement(InjectedScripts, {
          placement: 'head',
          scripts: [
            {
              enabled: true,
              placement: 'head',
              code: '<script async src="https://example.com/a.js"></script>',
            },
          ],
        }),
        createElement('script', { type: 'application/ld+json' }, '{"@type":"Organization"}'),
      ),
    )

    expect(html).not.toContain('<div')
    expect(html).toContain('src="https://example.com/a.js"')
    expect(html).toContain('async')
    expect(html.match(/<script\b/gi)).toHaveLength(2)

    const injected = html.indexOf('https://example.com/a.js')
    const jsonLd = html.indexOf('application/ld+json')
    expect(injected).toBeGreaterThan(-1)
    expect(jsonLd).toBeGreaterThan(injected)
    expect(html).not.toContain('<script async src="https://example.com/a.js"><script')
  })

  it('keeps inline script code and src attributes without nesting a second script', () => {
    const html = renderToStaticMarkup(
      createElement(InjectedScripts, {
        placement: 'head',
        scripts: [
          {
            enabled: true,
            placement: 'head',
            code: '<script type="text/javascript">window.x = 1;</script>',
          },
        ],
      }),
    )

    expect(html).toContain('window.x = 1;')
    expect(html).toContain('type="text/javascript"')
    expect(html.match(/<script\b/gi)).toHaveLength(1)
  })

  it('preserves link and meta tags and drops unknown wrappers', () => {
    const html = renderToStaticMarkup(
      createElement(
        'head',
        null,
        createElement(InjectedScripts, {
          placement: 'head',
          scripts: [
            {
              enabled: true,
              placement: 'head',
              code: '<div class="tracker"><link rel="preconnect" href="https://example.com"><meta name="google-site-verification" content="abc"></div>',
            },
          ],
        }),
      ),
    )

    expect(html).not.toContain('<div')
    expect(html).toContain('rel="preconnect"')
    expect(html).toContain('href="https://example.com"')
    expect(html).toContain('name="google-site-verification"')
    expect(html).toContain('content="abc"')
  })

  it('wraps raw javascript that has no tag in one script element', () => {
    const html = renderToStaticMarkup(
      createElement(InjectedScripts, {
        placement: 'body-end',
        scripts: [{ enabled: true, placement: 'body-end', code: 'window.ready = true' }],
      }),
    )

    expect(html).toContain('<script>')
    expect(html).toContain('window.ready = true')
    expect(html).not.toContain('<div')
  })

  it('keys id-less snippets by placement and index', () => {
    const tree = InjectedScripts({
      placement: 'head',
      scripts: [
        { enabled: true, placement: 'head', code: 'window.a = 1' },
        { enabled: true, placement: 'head', code: 'window.b = 2', id: null },
        { enabled: false, placement: 'head', code: 'window.skipped = 1' },
        { enabled: true, placement: 'body-end', code: 'window.other = 1' },
      ],
    })

    expect(childKeys(tree)).toEqual(['head-0', 'head-1'])
  })

  it('keeps a provided script id as the key', () => {
    const tree = InjectedScripts({
      placement: 'body-start',
      scripts: [
        {
          id: 'ga',
          enabled: true,
          placement: 'body-start',
          code: '<script src="https://example.com/ga.js"></script>',
        },
      ],
    })

    expect(childKeys(tree)).toEqual(['ga'])
  })
})
