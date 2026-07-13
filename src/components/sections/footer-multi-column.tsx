import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

import { EllaLogo, EllaLogoMark } from '@/app/(frontend)/_assets/logo'
import { NewsletterForm } from '@/app/(frontend)/_components/newsletter-form'

import { Container } from '../elements/container'
import { SmartLink } from '../elements/smart-link'

function InlineSvg({
  html,
  className,
  style,
}: {
  html: string
  className?: string
  style?: React.CSSProperties
}) {
  // oxlint-disable-next-line jsx-no-new-object-as-prop -- dangerouslySetInnerHTML requires a new object per render
  return <div className={className} style={style} dangerouslySetInnerHTML={{ __html: html }} />
}

function FooterColumn({
  heading,
  links,
}: {
  heading: string
  links?: { label: string; href: string; id?: string | null }[] | null
}) {
  return (
    <div>
      <h3 className="font-display text-theme-text-muted text-xs/7 font-medium tracking-widest uppercase">
        {heading}
      </h3>
      {links && links.length > 0 ? (
        <ul role="list" className="mt-4 flex flex-col gap-3">
          {links.map((link) => (
            <li key={link.id ?? link.href}>
              <SmartLink
                href={link.href}
                className="text-theme-text-secondary hover:text-theme-text focus-visible:outline-theme-accent rounded-sm text-sm/7 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                {...(link.href.startsWith('http')
                  ? { 'aria-label': `${link.label} (opens in new tab)` }
                  : {})}
              >
                {link.label}
              </SmartLink>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export function FooterMultiColumn({
  bgStyle = 'brand-black',
  logomarkSvg,
  footerLogoSvg,
  footerLogoClipPercent = 25,
  footerLogoAspectRatio = 122.47 / 288,
  footerLogoColor,
  footerLogoOpacity,
  description,
  columns,
  legalLinks,
  copyrightText,
  newsletter,
  statusBadgeHtml,
  className,
  ...props
}: {
  bgStyle?: string
  logomarkSvg?: string | null
  footerLogoSvg?: string | null
  footerLogoClipPercent?: number
  footerLogoAspectRatio?: number
  footerLogoColor?: string | null
  footerLogoOpacity?: number | null
  description: string
  newsletter?: {
    enabled?: boolean | null
    heading?: string | null
    placeholder?: string | null
    buttonLabel?: string | null
    loopsListIds?: { listId: string; label?: string | null; id?: string | null }[] | null
  } | null
  columns?:
    | {
        heading: string
        links?: { label: string; href: string; id?: string | null }[] | null
        id?: string | null
      }[]
    | null
  legalLinks?: { label: string; href: string; id?: string | null }[] | null
  copyrightText: string
  statusBadgeHtml?: string | null
} & Omit<ComponentProps<'footer'>, 'children'>) {
  const opacityPct = footerLogoOpacity ?? 4
  const baseColor = footerLogoColor || 'var(--color-theme-text)'
  // oxlint-disable-next-line jsx-no-new-object-as-prop -- style depends on props
  const watermarkColorStyle = {
    color: `color-mix(in oklch, ${baseColor} ${opacityPct}%, transparent)`,
  }

  // oxlint-disable-next-line jsx-no-new-object-as-prop -- style depends on props, can't hoist to module level
  const watermarkClipStyle = {
    maxHeight: `calc(100vw * ${(footerLogoAspectRatio * (100 - footerLogoClipPercent)) / 100})`,
    overflow: 'hidden' as const,
  }

  return (
    <footer
      data-theme={bgStyle}
      className={clsx('overflow-clip bg-theme-bg', className)}
      {...props}
    >
      {/* Zone 1: Main content */}
      <div className="pt-20 pb-16 lg:pt-24 lg:pb-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left: Logo, description, newsletter */}
            <div className="flex flex-col gap-8 lg:col-span-3">
              <div>
                {logomarkSvg ? (
                  <InlineSvg
                    html={logomarkSvg}
                    className="h-12 w-auto [&_svg]:h-full [&_svg]:w-auto"
                  />
                ) : (
                  <EllaLogoMark className="[&_path]:fill-theme-text h-20 w-auto" />
                )}
                <p className="text-theme-text-secondary mt-6 max-w-xs text-sm/7">{description}</p>
              </div>
              {newsletter?.enabled ? (
                <div className="max-w-xs">
                  {newsletter.heading ? (
                    <h3 className="font-display text-theme-text-muted mb-3 text-xs/7 font-medium tracking-widest uppercase">
                      {newsletter.heading}
                    </h3>
                  ) : null}
                  <NewsletterForm
                    variant="footer"
                    source="footer"
                    listIds={newsletter.loopsListIds?.map((l) => l.listId) ?? null}
                    placeholder={newsletter.placeholder ?? 'Your email address'}
                    buttonLabel={newsletter.buttonLabel ?? 'Subscribe'}
                    successMessage="Thanks — you're subscribed."
                  />
                </div>
              ) : null}
            </div>

            {/* Right: Link columns */}
            <nav
              className="flex flex-wrap gap-8 sm:gap-12 lg:col-span-9 lg:justify-end"
              aria-label="Footer"
            >
              {columns?.map((col) => (
                <FooterColumn key={col.id ?? col.heading} heading={col.heading} links={col.links} />
              ))}
            </nav>
          </div>
        </Container>
      </div>

      {/* Zone 2: Bottom bar */}
      <div className="border-theme-text/10 border-t">
        <Container>
          <div className="flex flex-col gap-4 py-8 sm:flex-row sm:items-start sm:justify-between">
            {/* Left: Status badge */}
            {statusBadgeHtml ? <InlineSvg html={statusBadgeHtml} /> : <div />}

            {/* Right: Copyright + legal */}
            <div className="text-theme-text-muted flex flex-col items-end text-sm/7">
              <span>{copyrightText}</span>
              {legalLinks && legalLinks.length > 0 ? (
                <div className="flex flex-wrap items-center gap-y-1">
                  {legalLinks.map((link, i) => (
                    <span key={link.id ?? link.href} className="flex items-center">
                      {i > 0 ? <span className="text-theme-text-muted/50 mx-3">|</span> : null}
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener"
                        aria-label={`${link.label} (opens in new tab)`}
                        className="hover:text-theme-text-secondary focus-visible:outline-theme-accent rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                      >
                        {link.label}
                      </a>
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </div>

      {/* Zone 3: Full-width watermark logo — clipped at bottom by configurable % */}
      <div className="pointer-events-none select-none" aria-hidden="true">
        <div
          className="relative left-1/2 grid w-screen -translate-x-1/2"
          style={watermarkClipStyle}
        >
          {footerLogoSvg ? (
            <InlineSvg
              html={footerLogoSvg}
              className="w-full [&_path]:!fill-current [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-none"
              style={watermarkColorStyle}
            />
          ) : (
            <EllaLogo className="text-theme-text/[0.04] h-auto w-full max-w-none [&_path]:fill-current" />
          )}
        </div>
      </div>
    </footer>
  )
}
