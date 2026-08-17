import { Heading } from '@/components/elements/heading'

import { NewsletterForm } from '../../_components/newsletter-form'

/** Presentational newsletter CTA — segment IDs come from the server wrapper. */
export function NewsletterCTAView({ segmentIds }: { segmentIds: string[] }) {
  return (
    <aside className="bg-ash-100 rounded-2xl px-8 py-10">
      <Heading as="h3" className="text-xl md:text-xl">
        Writing worth your inbox
      </Heading>
      <p className="text-ash-600 mt-2 text-sm/relaxed">
        Practical perspectives on advisory practice, systematization, and what's changing in the
        profession. No fluff.
      </p>
      <NewsletterForm
        variant="sidebar"
        source="blog-sidebar"
        segmentIds={segmentIds}
        placeholder="you@yourfirm.com"
        buttonLabel="Subscribe"
        successMessage="You're on the list."
      />
    </aside>
  )
}
