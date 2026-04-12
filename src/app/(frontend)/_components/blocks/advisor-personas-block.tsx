import Image from 'next/image'

import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import { ThemeSection } from '@/components/elements/theme-section'
import { PhosphorIcon } from '@/components/icons/PhosphorIcon'
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
    <ThemeSection bgStyle={block.bgStyle} className="py-20 md:py-28" style={{ overflowX: 'clip' }}>
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

        {/* Two-column layout — balanced split */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Left column — image (sticky on desktop, aligns with panel top) */}
          <div className="mb-10 lg:sticky lg:top-32 lg:mb-0 lg:self-start">
            {image?.url && (
              <div>
                {/* Desktop image: portrait crop */}
                <div className="relative hidden overflow-hidden rounded-sm lg:block lg:aspect-[3/4]">
                  <Image
                    src={image.url}
                    alt={image.alt ?? block.heading ?? ''}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 45vw, 100vw"
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

          {/* Right column — structured persona list on surface panel, bleeds right */}
          {block.personas && block.personas.length > 0 && (
            <div className="relative">
              {/* Background panel — rounds left, bleeds to viewport right edge */}
              <div className="bg-theme-surface absolute inset-0 rounded-l-lg" />
              <div className="bg-theme-surface absolute inset-y-0 left-full w-[50vw]" />
              {/* Content */}
              <div className="relative p-6 md:p-8 lg:p-10">
                <div className="flex flex-col gap-8 md:gap-10">
                  {block.personas.map((persona) => {
                    const uploadedIcon = persona.icon as Media | null
                    const accent = persona.accentColor ?? 'forest'
                    const bgClass = ACCENT_BG[accent] ?? ACCENT_BG.forest
                    const textClass = ACCENT_TEXT[accent] ?? ACCENT_TEXT.forest

                    return (
                      <div key={persona.id}>
                        {/* Header bar — icon anchored left, rule extending right */}
                        <div className="mb-4 flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-sm ${bgClass}`}
                          >
                            {persona.iconName ? (
                              <PhosphorIcon
                                name={persona.iconName}
                                size={18}
                                className={textClass}
                              />
                            ) : uploadedIcon?.url ? (
                              <Image
                                src={uploadedIcon.url}
                                alt=""
                                width={18}
                                height={18}
                                className={`object-contain ${textClass}`}
                                aria-hidden="true"
                              />
                            ) : (
                              <DefaultIcon className={textClass} />
                            )}
                          </div>
                          {/* Category label */}
                          {persona.label && (
                            <span className="text-theme-text-secondary text-[0.625rem] font-semibold tracking-[0.1em] uppercase">
                              {persona.label}
                            </span>
                          )}
                          {/* Horizontal rule fills remaining space */}
                          <div className="bg-theme-border h-px flex-1" />
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-theme-text text-sm font-semibold tracking-tight">
                          {persona.title}
                        </h3>

                        {/* Description */}
                        <p className="text-theme-text-secondary mt-2.5 text-sm/relaxed">
                          {persona.description}
                        </p>

                        {/* With ELLA — visually distinct callout */}
                        <div className="border-theme-accent/30 mt-4 border-l-2 pl-4">
                          <p className="text-sm/relaxed">
                            <span className="text-theme-accent font-medium">With ELLA:</span>{' '}
                            <span className="text-theme-text">{persona.withElla}</span>
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </ThemeSection>
  )
}
