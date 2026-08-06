'use server'

import { subscribe, EmailProviderError } from '@/lib/email-provider'

export interface SubscribeState {
  success?: boolean
  error?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function subscribeAction(
  _prevState: SubscribeState | null,
  formData: FormData,
): Promise<SubscribeState> {
  // Honeypot — bots fill this, humans don't (visually hidden).
  // Silently return success so bots think it worked and move on.
  const honeypot = formData.get('company')
  if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
    return { success: true }
  }

  const email = formData.get('email')
  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return { error: 'Please enter a valid email address.' }
  }

  const segmentIdsRaw = formData.get('segmentIds')
  const segmentIds =
    typeof segmentIdsRaw === 'string' && segmentIdsRaw.length > 0
      ? segmentIdsRaw
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : undefined

  const sourceRaw = formData.get('source')
  const source = typeof sourceRaw === 'string' && sourceRaw.length > 0 ? sourceRaw : undefined

  try {
    await subscribe({
      email: email.trim(),
      segmentIds,
      source,
    })
    return { success: true }
  } catch (err) {
    if (err instanceof EmailProviderError) {
      console.error('[subscribe] provider error:', err.message, { status: err.status })
    } else {
      console.error('[subscribe] unexpected error:', err)
    }
    return { error: 'Something went wrong. Please try again in a moment.' }
  }
}
