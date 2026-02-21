import { Container } from '@/components/elements/container'
import { credibilityStrip } from '../_lib/content'

export function CredibilityStrip() {
  return (
    <section className="py-8">
      <Container>
        <p className="text-center text-sm/7 font-medium text-ash-700">
          {credibilityStrip.text}
        </p>
      </Container>
    </section>
  )
}
