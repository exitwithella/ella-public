'use client'

import { useActionState, useId } from 'react'

import { subscribeAction, type SubscribeState } from '../_actions/subscribe'

export type NewsletterFormVariant = 'footer' | 'default' | 'sidebar'

interface NewsletterFormProps {
  /** Loops mailing list IDs the email will be added to. */
  listIds?: string[] | null
  /** Source tag sent to Loops for analytics (e.g. "footer", "blog-sidebar"). */
  source?: string
  placeholder?: string
  buttonLabel?: string
  successMessage?: string
  microcopy?: string
  variant?: NewsletterFormVariant
}

const VARIANTS: Record<
  NewsletterFormVariant,
  { form: string; input: string; button: string; success: string; error: string }
> = {
  footer: {
    form: 'flex gap-2',
    input:
      'border-theme-text/20 bg-theme-text/5 text-theme-text placeholder:text-theme-text-muted focus:border-theme-accent min-w-0 flex-1 rounded-md border px-3 py-2 text-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-theme-accent',
    button:
      'bg-theme-accent text-theme-bg shrink-0 rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent',
    success: 'text-theme-text-secondary text-sm/7',
    error: 'text-coral-400 mt-2 text-xs',
  },
  sidebar: {
    form: 'mt-5 flex flex-col gap-3 sm:flex-row',
    input:
      'border-ash-200 bg-sandstone-50 text-ash-900 placeholder:text-ash-400 focus:border-moss-400 focus:ring-moss-400 flex-1 rounded-lg border px-4 py-2.5 text-sm focus:ring-1 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss-700',
    button:
      'bg-moss-700 hover:bg-moss-600 text-ash-100 rounded-lg px-6 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss-700',
    success: 'text-moss-700 font-display text-lg font-semibold text-center',
    error: 'text-coral-600 mt-3 text-sm',
  },
  default: {
    form: 'mt-6 flex flex-col gap-3 sm:flex-row sm:max-w-lg',
    input:
      'border-ash-200 bg-sandstone-50 text-ash-900 placeholder:text-ash-400 focus:border-moss-400 flex-1 rounded-lg border px-4 py-3 text-sm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss-700',
    button:
      'bg-moss-700 hover:bg-moss-600 text-ash-100 rounded-lg px-6 py-3 text-sm font-semibold whitespace-nowrap transition-colors disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss-700',
    success: 'text-moss-700 font-medium',
    error: 'text-coral-600 mt-3 text-sm',
  },
}

export function NewsletterForm({
  listIds,
  source,
  placeholder = 'Your email address',
  buttonLabel = 'Subscribe',
  successMessage = "You're on the list.",
  microcopy,
  variant = 'default',
}: NewsletterFormProps) {
  const [state, action, pending] = useActionState<SubscribeState | null, FormData>(
    subscribeAction,
    null,
  )
  const emailId = useId()
  const honeypotId = useId()
  const styles = VARIANTS[variant]

  if (state?.success) {
    return (
      <p className={styles.success} role="status" aria-live="polite">
        {successMessage}
      </p>
    )
  }

  const listIdsValue = listIds && listIds.length > 0 ? listIds.join(',') : ''

  return (
    <div>
      <form action={action} className={styles.form} noValidate>
        <input type="hidden" name="listIds" value={listIdsValue} />
        {source ? <input type="hidden" name="source" value={source} /> : null}

        {/* Honeypot — visually hidden from users, catches bots */}
        <div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] opacity-0">
          <label htmlFor={honeypotId}>Company (do not fill)</label>
          <input
            id={honeypotId}
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        <label htmlFor={emailId} className="sr-only">
          Email address
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          placeholder={placeholder}
          className={styles.input}
          aria-invalid={state?.error ? 'true' : undefined}
          aria-describedby={state?.error ? `${emailId}-error` : undefined}
        />

        <button type="submit" disabled={pending} className={styles.button}>
          {pending ? 'Subscribing…' : buttonLabel}
        </button>
      </form>

      {state?.error ? (
        <p id={`${emailId}-error`} className={styles.error} role="alert" aria-live="assertive">
          {state.error}
        </p>
      ) : null}

      {microcopy && !state?.error ? (
        <p className="text-theme-text-muted mt-2 text-xs">{microcopy}</p>
      ) : null}
    </div>
  )
}
