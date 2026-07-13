import type { Page } from '@/payload-types'

import { getPageBySlug } from './get-page'

/** The homepage is the page with slug `home`; shares the page cache + tag. */
export function getHomepage(): Promise<Page | null> {
  return getPageBySlug('home')
}
