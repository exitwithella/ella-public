/**
 * Email provider abstraction — currently Resend.
 *
 * To switch providers, replace the implementation of `subscribe()` below.
 * The Server Action and client components depend only on this module's
 * public interface (not on Resend-specific types).
 *
 * Reuses RESEND_API_KEY (the same key Payload uses for transactional email).
 */

const RESEND_CONTACTS_ENDPOINT = 'https://api.resend.com/contacts'

export interface SubscribeParams {
  email: string
  segmentIds?: string[]
  source?: string
  firstName?: string
  lastName?: string
}

export class EmailProviderError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message)
    this.name = 'EmailProviderError'
  }
}

/**
 * Subscribe an email as a Resend contact, optionally adding it to segments.
 *
 * - `segmentIds` are Resend segment IDs — the contact is added to each.
 * - `source` is stored as a Resend contact property for analytics
 *   (e.g. "footer", "blog-sidebar").
 * - Idempotent: an already-existing contact is treated as success. Like the
 *   previous Loops implementation, this does NOT re-sync segment membership
 *   for an existing contact (that would require a contacts.update call); for
 *   v1 this is fine.
 */
export async function subscribe(params: SubscribeParams): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new EmailProviderError('RESEND_API_KEY is not configured')
  }

  const body: Record<string, unknown> = {
    email: params.email,
  }
  if (params.firstName) body.first_name = params.firstName
  if (params.lastName) body.last_name = params.lastName
  if (params.source) body.properties = { source: params.source }
  if (params.segmentIds && params.segmentIds.length > 0) {
    body.segments = params.segmentIds.map((id) => ({ id }))
  }

  const res = await fetch(RESEND_CONTACTS_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (res.ok) return

  const errorBody = await res.text().catch(() => '')

  // A contact that already exists is a success for our purposes — Resend may
  // signal this with 409 or a validation error mentioning "already exists".
  if (res.status === 409 || /already exists/i.test(errorBody)) return

  throw new EmailProviderError(
    `Resend API error ${res.status}: ${errorBody || res.statusText}`,
    res.status,
  )
}
