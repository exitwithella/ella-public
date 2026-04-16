import { Heading } from '@/components/elements/heading'

import { NewsletterForm } from '../../_components/newsletter-form'
import { getSiteSettings } from '../../_lib/get-site-settings'

export async function NewsletterCTA() {
  const settings = await getSiteSettings()
  const listIds =
    settings.blogNewsletter?.loopsListIds
      ?.map((l) => l.listId)
      .filter((id): id is string => typeof id === 'string' && id.length > 0) ?? []

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
        listIds={listIds}
        placeholder="you@yourfirm.com"
        buttonLabel="Subscribe"
        successMessage="You're on the list."
      />
    </aside>
  )
}
