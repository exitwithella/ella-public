import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { EmailProviderError, subscribe } from '../../src/lib/email-provider'

/** Build a minimal fetch Response stand-in for the error branch. */
function errorResponse(status: number, body = '', statusText = ''): Response {
  return {
    ok: false,
    status,
    statusText,
    text: async () => body,
  } as unknown as Response
}

function okResponse(): Response {
  return { ok: true, status: 200, text: async () => '' } as unknown as Response
}

/** Parse the JSON body from the most recent fetch call. */
function lastRequestBody(mock: ReturnType<typeof vi.fn>): Record<string, unknown> {
  const call = mock.mock.calls.at(-1)
  const init = call?.[1] as RequestInit
  return JSON.parse(init.body as string)
}

describe('email-provider subscribe (Resend)', () => {
  const originalKey = process.env.RESEND_API_KEY

  beforeEach(() => {
    process.env.RESEND_API_KEY = 'test-key'
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    if (originalKey === undefined) delete process.env.RESEND_API_KEY
    else process.env.RESEND_API_KEY = originalKey
  })

  it('POSTs to the Resend contacts endpoint with the bearer key', async () => {
    const fetchMock = vi.fn(async () => okResponse())
    vi.stubGlobal('fetch', fetchMock)

    await subscribe({ email: 'advisor@firm.com' })

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe('https://api.resend.com/contacts')
    expect(init.method).toBe('POST')
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer test-key')
  })

  it('maps segmentIds → segments and source → a contact property', async () => {
    const fetchMock = vi.fn(async () => okResponse())
    vi.stubGlobal('fetch', fetchMock)

    await subscribe({
      email: 'advisor@firm.com',
      segmentIds: ['seg_1', 'seg_2'],
      source: 'footer',
      firstName: 'Ada',
      lastName: 'Lovelace',
    })

    expect(lastRequestBody(fetchMock)).toEqual({
      email: 'advisor@firm.com',
      first_name: 'Ada',
      last_name: 'Lovelace',
      properties: { source: 'footer' },
      segments: [{ id: 'seg_1' }, { id: 'seg_2' }],
    })
  })

  it('omits optional fields when not provided', async () => {
    const fetchMock = vi.fn(async () => okResponse())
    vi.stubGlobal('fetch', fetchMock)

    await subscribe({ email: 'advisor@firm.com' })

    expect(lastRequestBody(fetchMock)).toEqual({ email: 'advisor@firm.com' })
  })

  it('treats a 409 (already exists) as success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => errorResponse(409, 'Conflict')),
    )
    await expect(subscribe({ email: 'advisor@firm.com' })).resolves.toBeUndefined()
  })

  it('treats an "already exists" validation error as success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => errorResponse(422, 'Contact already exists')),
    )
    await expect(subscribe({ email: 'advisor@firm.com' })).resolves.toBeUndefined()
  })

  it('throws EmailProviderError with the status on other failures', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => errorResponse(500, 'boom')),
    )
    await expect(subscribe({ email: 'advisor@firm.com' })).rejects.toMatchObject({
      name: 'EmailProviderError',
      status: 500,
    })
  })

  it('throws when RESEND_API_KEY is not configured', async () => {
    delete process.env.RESEND_API_KEY
    const fetchMock = vi.fn(async () => okResponse())
    vi.stubGlobal('fetch', fetchMock)

    await expect(subscribe({ email: 'advisor@firm.com' })).rejects.toBeInstanceOf(
      EmailProviderError,
    )
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
