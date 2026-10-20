import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock the provider seam so the action's own logic (honeypot, validation,
// FormData parsing, error mapping) is exercised without any network call.
vi.mock('@/lib/email-provider', () => {
  class EmailProviderError extends Error {
    status?: number
    constructor(message: string, status?: number) {
      super(message)
      this.name = 'EmailProviderError'
      this.status = status
    }
  }
  return { subscribe: vi.fn(), EmailProviderError }
})

import { subscribeAction } from '@/app/(frontend)/_actions/subscribe'
import { EmailProviderError, subscribe } from '@/lib/email-provider'

const subscribeMock = vi.mocked(subscribe)

function form(fields: Record<string, string>): FormData {
  const fd = new FormData()
  for (const [k, v] of Object.entries(fields)) fd.append(k, v)
  return fd
}

describe('subscribeAction', () => {
  beforeEach(() => {
    subscribeMock.mockReset()
    subscribeMock.mockResolvedValue(undefined)
  })

  it('silently succeeds and skips the provider when the honeypot is filled', async () => {
    const result = await subscribeAction(null, form({ company: 'bot', email: 'a@b.com' }))
    expect(result).toEqual({ success: true })
    expect(subscribeMock).not.toHaveBeenCalled()
  })

  it('rejects an invalid email without calling the provider', async () => {
    const result = await subscribeAction(null, form({ email: 'not-an-email' }))
    expect(result).toEqual({ error: 'Please enter a valid email address.' })
    expect(subscribeMock).not.toHaveBeenCalled()
  })

  it('parses comma-separated segmentIds and source, then subscribes', async () => {
    const result = await subscribeAction(
      null,
      form({ email: ' advisor@firm.com ', segmentIds: 'seg_1, seg_2 ,', source: 'footer' }),
    )
    expect(result).toEqual({ success: true })
    expect(subscribeMock).toHaveBeenCalledWith({
      email: 'advisor@firm.com',
      segmentIds: ['seg_1', 'seg_2'],
      source: 'footer',
    })
  })

  it('maps a provider failure to the generic error message', async () => {
    subscribeMock.mockRejectedValueOnce(new EmailProviderError('Resend API error 500', 500))
    const result = await subscribeAction(null, form({ email: 'advisor@firm.com' }))
    expect(result).toEqual({ error: 'Something went wrong. Please try again in a moment.' })
  })
})
