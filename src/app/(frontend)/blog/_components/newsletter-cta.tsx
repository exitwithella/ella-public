'use client'

import { useState } from 'react'

import { Heading } from '@/components/elements/heading'

export function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    // UI-only at launch — email integration deferred
    setSubmitted(true)
  }

  return (
    <aside className="bg-ash-100 rounded-2xl px-8 py-10">
      {submitted ? (
        <div className="text-center">
          <p className="text-moss-700 font-display text-lg font-semibold">You're on the list.</p>
          <p className="text-ash-600 mt-2 text-sm">
            We'll send updates when there's something worth reading.
          </p>
        </div>
      ) : (
        <>
          <Heading as="h3" className="text-xl md:text-xl">
            Writing worth your inbox
          </Heading>
          <p className="text-ash-600 mt-2 text-sm/relaxed">
            Practical perspectives on advisory practice, systematization, and what's changing in the
            profession. No fluff.
          </p>
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourfirm.com"
              required
              className="border-ash-200 bg-ash-50 text-ash-900 placeholder:text-ash-400 focus:border-moss-400 focus:ring-moss-400 flex-1 rounded-lg border px-4 py-2.5 text-sm focus:ring-1 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-moss-700 hover:bg-moss-600 rounded-lg px-6 py-2.5 text-sm font-semibold whitespace-nowrap text-ash-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </>
      )}
    </aside>
  )
}
