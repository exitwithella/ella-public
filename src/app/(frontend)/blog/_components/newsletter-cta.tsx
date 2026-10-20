import { getSiteSettings } from '../../_lib/get-site-settings'
import { NewsletterCTAView } from './newsletter-cta-view'

export async function NewsletterCTA() {
  const settings = await getSiteSettings()
  const segmentIds =
    settings.blogNewsletter?.segmentIds
      ?.map((s) => s.segmentId)
      .filter((id): id is string => typeof id === 'string' && id.length > 0) ?? []

  return <NewsletterCTAView segmentIds={segmentIds} />
}
