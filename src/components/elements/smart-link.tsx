import NextLink from 'next/link'
import type { ComponentProps } from 'react'

/**
 * A link is "external" when it points off-app or isn't a client route:
 * absolute http(s) URLs, mailto:/tel: schemes, and in-page anchors (#…).
 * Everything else is an internal route that should use the client router.
 */
function isExternalHref(href: string): boolean {
  return /^(https?:|mailto:|tel:|#)/i.test(href)
}

/**
 * Renders `next/link` for internal routes (client transitions + prefetch) and
 * a plain `<a>` for external / anchor / mailto / tel hrefs. For http(s)
 * external links it defaults to `target="_blank" rel="noopener"`, but any
 * caller-supplied `target`/`rel` wins. All other anchor props (className,
 * onClick, aria-*, …) pass through to whichever element is rendered.
 */
export function SmartLink({
  href,
  target,
  rel,
  ...props
}: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  if (isExternalHref(href)) {
    const isHttp = /^https?:/i.test(href)
    return (
      <a
        href={href}
        target={target ?? (isHttp ? '_blank' : undefined)}
        rel={rel ?? (isHttp ? 'noopener' : undefined)}
        {...props}
      />
    )
  }

  return <NextLink href={href} target={target} rel={rel} {...props} />
}
