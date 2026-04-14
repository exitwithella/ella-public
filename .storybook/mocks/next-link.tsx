import type { ComponentProps } from 'react'

export default function Link({
  href,
  children,
  ...props
}: { href: string } & ComponentProps<'a'>) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  )
}
