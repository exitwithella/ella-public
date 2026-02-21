import { Main } from '@/components/elements/main'
import { Navbar } from './_components/navbar'
import { Hero } from './_components/hero'
import { IntroTextReveal } from './_components/intro-text-reveal'
import { FeaturesGrid } from './_components/features-grid'
import { HorizontalScroll } from './_components/horizontal-scroll'
import { SectionHeader } from './_components/section-header'
import { Testimonials } from './_components/testimonials'
import { AlternatingFeatures } from './_components/alternating-features'
import { PrinciplesGrid } from './_components/principles-grid'
import { SecuritySection } from './_components/security-section'
import { AiCta } from './_components/ai-cta'
import { FinalCta } from './_components/final-cta'
import { Footer } from './_components/footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Main>
        <Hero />
        <IntroTextReveal />
        <FeaturesGrid />
        <HorizontalScroll />
        <SectionHeader />
        <Testimonials />
        <AlternatingFeatures />
        <PrinciplesGrid />
        <SecuritySection />
        <AiCta />
        <FinalCta />
      </Main>
      <Footer />
    </>
  )
}
