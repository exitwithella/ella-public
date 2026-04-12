import Image from 'next/image'

import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import { ThemeSection } from '@/components/elements/theme-section'
import type { Media, Page } from '@/payload-types'

type AdvisorPersonasData = Extract<
  NonNullable<Page['layout']>[number],
  { blockType: 'advisor-personas' }
>

interface AdvisorPersonasBlockProps {
  block: AdvisorPersonasData
}

const QUOTE_GRADIENT = {
  background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
} as const

const ACCENT_BG: Record<string, string> = {
  forest: 'bg-moss-700/10',
  moss: 'bg-moss-400/10',
  goldenrod: 'bg-goldenrod-400/10',
  ocean: 'bg-ocean-600/10',
  coral: 'bg-coral-400/10',
  emerald: 'bg-emerald-400/10',
}

const ACCENT_TEXT: Record<string, string> = {
  forest: 'text-moss-700',
  moss: 'text-moss-500',
  goldenrod: 'text-goldenrod-600',
  ocean: 'text-ocean-600',
  coral: 'text-coral-600',
  emerald: 'text-emerald-600',
}

function DefaultIcon({ className }: { className?: string }) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x={2} y={2} width={7} height={7} rx={1} stroke="currentColor" strokeWidth={1.5} />
      <rect x={11} y={2} width={7} height={7} rx={1} stroke="currentColor" strokeWidth={1.5} />
      <rect x={2} y={11} width={7} height={7} rx={1} stroke="currentColor" strokeWidth={1.5} />
      <rect
        x={11}
        y={11}
        width={7}
        height={7}
        rx={1}
        stroke="currentColor"
        strokeWidth={1.5}
        fillOpacity={0.2}
        fill="currentColor"
      />
    </svg>
  )
}

export function AdvisorPersonasBlock({ block }: AdvisorPersonasBlockProps) {
  const image = block.image as Media | null
  const hasQuote =
    block.imageQuote?.text || block.imageQuote?.attribution || block.imageQuote?.label

  return (
    <ThemeSection bgStyle={block.bgStyle} className="py-20 md:py-28">
      <Container>
        {/* Section header */}
        {(block.sectionLabel || block.heading) && (
          <div className="mb-12 md:mb-16">
            {block.sectionLabel && <Eyebrow className="mb-3">{block.sectionLabel}</Eyebrow>}
            {block.heading && <Heading>{block.heading}</Heading>}
            {block.subheading && (
              <p className="text-theme-text-secondary mt-4 max-w-2xl text-lg/relaxed">
                {block.subheading}
              </p>
            )}
          </div>
        )}

        {/* Two-column layout */}
        <div className="lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12 xl:gap-16">
          {/* Left column — image (sticky on desktop) */}
          <div className="mb-10 lg:mb-0">
            {image?.url && (
              <div className="lg:sticky lg:top-24">
                {/* Desktop image: portrait crop */}
                <div className="relative hidden overflow-hidden rounded-sm lg:block lg:aspect-[3/4]">
                  <Image
                    src={image.url}
                    alt={image.alt ?? block.heading ?? ''}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                  {hasQuote && (
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8" style={QUOTE_GRADIENT}>
                      {block.imageQuote?.label && (
                        <p className="text-sandstone-300 mb-2 text-xs font-semibold tracking-widest uppercase">
                          {block.imageQuote.label}
                        </p>
                      )}
                      {block.imageQuote?.text && (
                        <blockquote className="text-sandstone-50 font-serif text-lg/relaxed">
                          &ldquo;{block.imageQuote.text}&rdquo;
                        </blockquote>
                      )}
                      {block.imageQuote?.attribution && (
                        <p className="text-sandstone-300 mt-3 text-sm">
                          — {block.imageQuote.attribution}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Mobile image: landscape crop */}
                <div className="relative aspect-[16/9] overflow-hidden rounded-sm lg:hidden">
                  <Image
                    src={image.url}
                    alt={image.alt ?? block.heading ?? ''}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  {hasQuote && (
                    <div className="absolute inset-x-0 bottom-0 p-6" style={QUOTE_GRADIENT}>
                      {block.imageQuote?.label && (
                        <p className="text-sandstone-300 mb-1 text-xs font-semibold tracking-widest uppercase">
                          {block.imageQuote.label}
                        </p>
                      )}
                      {block.imageQuote?.text && (
                        <blockquote className="text-sandstone-50 font-serif text-base/relaxed">
                          &ldquo;{block.imageQuote.text}&rdquo;
                        </blockquote>
                      )}
                      {block.imageQuote?.attribution && (
                        <p className="text-sandstone-300 mt-2 text-sm">
                          — {block.imageQuote.attribution}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right column — persona cards */}
          {block.personas && block.personas.length > 0 && (
            <div className="flex flex-col gap-6">
              {block.personas.map((persona) => {
                const icon = persona.icon as Media | null
                const accent = persona.accentColor ?? 'forest'
                const bgClass = ACCENT_BG[accent] ?? ACCENT_BG.forest
                const textClass = ACCENT_TEXT[accent] ?? ACCENT_TEXT.forest

                return (
                  <div
                    key={persona.id}
                    className="border-theme-border bg-theme-surface rounded-sm border p-8 md:p-10"
                  >
                    <div className="flex gap-5">
                      {/* Icon container */}
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm ${bgClass}`}
                      >
                        {icon?.url ? (
                          <Image
                            src={icon.url}
                            alt=""
                            width={20}
                            height={20}
                            className={`object-contain ${textClass}`}
                            aria-hidden="true"
                          />
                        ) : (
                          <DefaultIcon className={textClass} />
                        )}
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-theme-text text-base font-semibold tracking-tight">
                          {persona.title}
                        </h3>
                        <p className="text-theme-text-secondary mt-2 text-base/relaxed">
                          {persona.description}
                        </p>
                        <div className="border-theme-border mt-4 border-t pt-4">
                          <p className="text-base/relaxed">
                            <span className="text-theme-accent font-semibold">With ELLA: </span>
                            <span className="text-theme-text-secondary">{persona.withElla}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </Container>
    </ThemeSection>
  )
}
