'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

import { Container } from '@/components/elements/container'
import { isDarkTheme, ThemeSection } from '@/components/elements/theme-section'
import type { Page, Solution } from '@/payload-types'

type ContentSectionData =
  | Extract<NonNullable<Page['layout']>[number], { blockType: 'content-section' }>
  | Extract<NonNullable<Solution['layout']>[number], { blockType: 'content-section' }>

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    y: 0,
  },
}

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.12,
    },
  },
}

export function SplitHeadingLayout({ block }: { block: ContentSectionData }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: '-50px', once: true })

  return (
    <ThemeSection bgStyle={block.bgStyle} className="py-20 md:py-28">
      <Container>
        <div ref={ref} className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          <motion.div
            className="lg:col-span-3 lg:col-start-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
          >
            {block.heading && (
              <h2 className="text-ash-950 font-serif text-[2rem]/10 tracking-tight sm:text-5xl/14">
                {block.heading}
              </h2>
            )}
          </motion.div>

          <motion.div
            className={`lg:col-span-6 lg:col-start-5 ${isDarkTheme(block.bgStyle) ? 'prose-invert' : ''}`}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {block.body && (
              <motion.div
                className="prose prose-lg text-theme-text-secondary max-w-none [&>p]:mb-6"
                variants={fadeInUp}
              >
                <RichText data={block.body} />
              </motion.div>
            )}
          </motion.div>
        </div>
      </Container>
    </ThemeSection>
  )
}
