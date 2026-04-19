import config from '@payload-config'
import { getPayload } from 'payload'
import { Webhook } from 'svix'

const MAX_BODY_SIZE = 256 * 1024 // 256KB

interface ClerkWebhookEvent {
  type: string
  data: {
    id: string
    email_addresses?: { email_address: string }[]
  }
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type')
  if (!contentType?.includes('application/json')) {
    return new Response('Invalid content type', { status: 415 })
  }

  const svixId = request.headers.get('svix-id')
  const svixTimestamp = request.headers.get('svix-timestamp')
  const svixSignature = request.headers.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Missing svix headers', { status: 400 })
  }

  const contentLength = request.headers.get('content-length')
  if (contentLength && Number.parseInt(contentLength, 10) > MAX_BODY_SIZE) {
    return new Response('Payload too large', { status: 413 })
  }

  const body = await request.text()
  if (body.length > MAX_BODY_SIZE) {
    return new Response('Payload too large', { status: 413 })
  }

  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.log(JSON.stringify({ event: 'clerk_webhook_no_secret' }))
    return new Response('Server misconfigured', { status: 500 })
  }

  const wh = new Webhook(webhookSecret)

  let evt: ClerkWebhookEvent
  try {
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as ClerkWebhookEvent
  } catch {
    console.log(JSON.stringify({ event: 'clerk_webhook_invalid_signature' }))
    return new Response('Invalid signature', { status: 401 })
  }

  const payload = await getPayload({ config })

  switch (evt.type) {
    case 'user.created':
    case 'user.updated': {
      const email = evt.data.email_addresses?.[0]?.email_address
      const clerkId = evt.data.id

      if (!email) {
        console.log(JSON.stringify({ event: 'clerk_webhook_no_email', clerkId }))
        break
      }

      // Find existing user by clerkId or email
      const existing = await payload.find({
        collection: 'users',
        where: {
          or: [{ clerkId: { equals: clerkId } }, { email: { equals: email } }],
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        await payload.update({
          collection: 'users',
          id: existing.docs[0].id,
          data: { clerkId, email },
        })
        console.log(
          JSON.stringify({
            event: 'clerk_webhook_user_linked',
            userId: existing.docs[0].id,
            clerkId,
          }),
        )
      } else {
        // Generate a strong random password (unusable — Clerk handles auth)
        const randomBytes = new Uint8Array(64)
        crypto.getRandomValues(randomBytes)
        const password = Array.from(randomBytes)
          .map((b) => b.toString(16).padStart(2, '0'))
          .join('')

        const newUser = await payload.create({
          collection: 'users',
          data: { email, clerkId, password },
        })
        console.log(
          JSON.stringify({
            event: 'clerk_webhook_user_created',
            userId: newUser.id,
            clerkId,
          }),
        )
      }
      break
    }

    case 'user.deleted': {
      const clerkId = evt.data.id
      const existing = await payload.find({
        collection: 'users',
        where: { clerkId: { equals: clerkId } },
        limit: 1,
      })
      if (existing.docs.length > 0) {
        await payload.delete({
          collection: 'users',
          id: existing.docs[0].id,
        })
        console.log(
          JSON.stringify({
            event: 'clerk_webhook_user_deleted',
            userId: existing.docs[0].id,
            clerkId,
          }),
        )
      }
      break
    }

    default:
      console.log(
        JSON.stringify({
          event: 'clerk_webhook_unhandled_event',
          type: evt.type,
        }),
      )
  }

  return new Response('OK', { status: 200 })
}
