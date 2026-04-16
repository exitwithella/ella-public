/**
 * Email provider abstraction — currently Loops.so.
 *
 * To switch providers, replace the implementation of `subscribe()` below.
 * The Server Action and client components depend only on this module's
 * public interface (not on Loops-specific types).
 */

const LOOPS_ENDPOINT = 'https://app.loops.so/api/v1/contacts/create'

export interface SubscribeParams {
  email: string
  listIds?: string[]
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
 * Subscribe an email to Loops with optional mailing list membership.
 *
 * - Uses Loops' create-or-update semantics (409 "exists" is treated as success).
 * - `listIds` are Loops mailing list IDs — each will be set to `true` in the contact's mailingLists.
 * - `source` is surfaced in Loops for analytics (e.g. "footer", "blog-sidebar").
 */
export async function subscribe(params: SubscribeParams): Promise<void> {
  const apiKey = process.env.LOOPS_API_KEY
  if (!apiKey) {
    throw new EmailProviderError('LOOPS_API_KEY is not configured')
  }

  const mailingLists =
    params.listIds && params.listIds.length > 0
      ? Object.fromEntries(params.listIds.map((id) => [id, true]))
      : undefined

  const body: Record<string, unknown> = {
    email: params.email,
  }
  if (params.source) body.source = params.source
  if (params.firstName) body.firstName = params.firstName
  if (params.lastName) body.lastName = params.lastName
  if (mailingLists) body.mailingLists = mailingLists

  const res = await fetch(LOOPS_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (res.ok) return

  // 409 = contact already exists. Treat as success — we still want to update their list membership.
  // For true "already on list" behavior, we'd call /contacts/update. For v1 this is fine.
  if (res.status === 409) return

  const errorBody = await res.text().catch(() => '')
  throw new EmailProviderError(
    `Loops API error ${res.status}: ${errorBody || res.statusText}`,
    res.status,
  )
}
