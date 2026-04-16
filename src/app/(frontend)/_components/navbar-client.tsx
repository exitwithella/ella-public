'use client'

import { clsx } from 'clsx/lite'
import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'

type NavLink = {
  label: string
  href?: string
  type: 'link' | 'dropdown'
  dropdownItems: { label: string; href: string; description?: string }[]
}

type NavCta = { label: string; href: string }

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  )
}

/* ─── Dropdown panel (desktop) ─── */

function DropdownPanel({
  id,
  items,
  open,
  onMouseEnter,
  onMouseLeave,
}: {
  id?: string
  items: NavLink['dropdownItems']
  open: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}) {
  return (
    <div
      id={id}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={clsx(
        'absolute top-full left-1/2 z-20 -translate-x-1/2 pt-3 transition-all duration-200',
        open
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-1 opacity-0',
      )}
    >
      <div className="bg-sandstone-50 border-ash-200 shadow-ash-900/8 w-72 rounded-lg border p-2 shadow-lg">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="hover:bg-ash-100 group flex flex-col gap-0.5 rounded-md px-3 py-2.5 transition-colors"
          >
            <span className="text-ash-900 group-hover:text-moss-700 text-sm font-medium">
              {item.label}
            </span>
            {item.description && (
              <span className="text-ash-1000 text-xs/relaxed">{item.description}</span>
            )}
          </a>
        ))}
      </div>
    </div>
  )
}

/* ─── Desktop nav item ─── */

function DesktopNavItem({ link }: { link: NavLink }) {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }, [])

  const handleLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150)
  }, [])

  // Close on escape
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  if (link.type === 'link') {
    return (
      <a
        href={link.href}
        className="text-ash-950 hover:text-moss-700 inline-flex items-center text-sm/7 font-medium transition-colors"
      >
        {link.label}
      </a>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`nav-dropdown-${link.label.replace(/\s+/g, '-').toLowerCase()}`}
        className={clsx(
          'inline-flex items-center gap-1 rounded-sm text-sm/7 font-medium transition-colors',
          'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-moss-700',
          open ? 'text-moss-700' : 'text-ash-950 hover:text-moss-700',
        )}
      >
        {link.label}
        <ChevronDownIcon
          className={clsx('size-3.5 transition-transform duration-200', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>
      <DropdownPanel
        id={`nav-dropdown-${link.label.replace(/\s+/g, '-').toLowerCase()}`}
        items={link.dropdownItems}
        open={open}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      />
    </div>
  )
}

/* ─── Mobile nav item ─── */

function MobileNavItem({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(false)

  if (link.type === 'link') {
    return (
      <a
        href={link.href}
        onClick={onNavigate}
        className="text-ash-950 group inline-flex items-center justify-between gap-2 text-3xl/10 font-medium"
      >
        {link.label}
        <span className="inline-flex p-1.5 opacity-0 group-hover:opacity-100" aria-hidden="true">
          <ArrowRightIcon className="size-6" />
        </span>
      </a>
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        className="text-ash-950 inline-flex w-full items-center justify-between gap-2 text-3xl/10 font-medium"
      >
        {link.label}
        <ChevronDownIcon
          className={clsx('size-5 transition-transform duration-200', expanded && 'rotate-180')}
        />
      </button>
      {expanded && (
        <div className="border-moss-200 mt-3 ml-1 flex flex-col gap-3 border-l-2 pl-5">
          {link.dropdownItems.map((item) => (
            <a key={item.href} href={item.href} onClick={onNavigate} className="group">
              <span className="text-ash-900 group-hover:text-moss-700 text-lg font-medium transition-colors">
                {item.label}
              </span>
              {item.description && (
                <span className="text-ash-1000 mt-0.5 block text-sm">{item.description}</span>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Main navbar ─── */

export function NavbarClient({
  links,
  primaryCta,
  secondaryCta,
  loginLink,
  logo,
}: {
  links: NavLink[]
  primaryCta: NavCta
  secondaryCta: NavCta
  loginLink?: NavCta
  logo: ReactNode
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openMenu = useCallback(() => dialogRef.current?.showModal(), [])
  const closeMenu = useCallback(() => dialogRef.current?.close(), [])

  return (
    <header className="bg-sandstone-50 sticky top-0 z-10">
      <style>{':root { --scroll-padding-top: 5.25rem }'}</style>
      <nav aria-label="Main">
        <div className="mx-auto flex h-(--scroll-padding-top) max-w-7xl items-center gap-4 px-6 lg:px-10">
          {/* Desktop links (left) */}
          <div className="flex flex-1 items-center gap-8 max-lg:hidden">
            {links.map((link) => (
              <DesktopNavItem key={link.label} link={link} />
            ))}
          </div>

          {/* Logo (center) */}
          <a href="/" aria-label="ELLA home" className="inline-flex items-stretch">
            {logo}
          </a>

          {/* Actions (right) */}
          <div className="flex flex-1 items-center justify-end gap-4">
            <div className="flex shrink-0 items-center gap-5">
              <a
                href={secondaryCta.href}
                className="text-ash-950 hover:text-moss-700 inline-flex shrink-0 items-center text-sm/7 font-medium transition-colors max-sm:hidden"
              >
                {secondaryCta.label}
              </a>
              {loginLink && (
                <a
                  href={loginLink.href}
                  className="text-ash-950 hover:text-moss-700 inline-flex shrink-0 items-center text-sm/7 font-medium transition-colors max-lg:hidden"
                >
                  {loginLink.label}
                </a>
              )}
              <a
                href={primaryCta.href}
                className="bg-ash-950 text-ash-100 hover:bg-ash-800 inline-flex shrink-0 items-center justify-center gap-1 rounded-full px-3 py-1 text-sm/7 font-medium"
              >
                {primaryCta.label}
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={openMenu}
              aria-label="Open menu"
              className="text-ash-950 hover:bg-ash-950/10 focus-visible:outline-moss-700 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full p-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M3.748 8.248a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75ZM3.748 15.75a.75.75 0 0 1 .75-.751h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu dialog */}
        <dialog ref={dialogRef} className="backdrop:bg-ash-950/50 backdrop:backdrop-blur-sm">
          <div className="bg-sandstone-50 fixed inset-0 px-6 py-6 lg:px-10">
            <div className="flex justify-end">
              <button
                onClick={closeMenu}
                aria-label="Close menu"
                className="text-ash-950 hover:bg-ash-950/10 focus-visible:outline-moss-700 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full p-2.5 focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-6">
              {links.map((link) => (
                <MobileNavItem key={link.label} link={link} onNavigate={closeMenu} />
              ))}

              {/* Mobile CTAs */}
              <div className="border-ash-200 mt-4 flex flex-col gap-4 border-t pt-6">
                <a
                  href={secondaryCta.href}
                  className="text-ash-950 hover:text-moss-700 inline-flex items-center justify-center rounded-full px-4 py-2 text-base font-medium transition-colors"
                >
                  {secondaryCta.label}
                </a>
                {loginLink && (
                  <a
                    href={loginLink.href}
                    onClick={closeMenu}
                    className="text-ash-950 hover:text-moss-700 inline-flex items-center justify-center rounded-full px-4 py-2 text-base font-medium transition-colors"
                  >
                    {loginLink.label}
                  </a>
                )}
                <a
                  href={primaryCta.href}
                  className="bg-ash-950 text-ash-100 hover:bg-ash-800 inline-flex items-center justify-center rounded-full px-4 py-2 text-base font-medium"
                >
                  {primaryCta.label}
                </a>
              </div>
            </div>
          </div>
        </dialog>
      </nav>
    </header>
  )
}
