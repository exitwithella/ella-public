import type { Field, GroupField } from 'payload'

interface CtaFieldOptions {
  /** Field name (e.g. 'primaryCta', 'link', 'cta'). */
  name: string
  /** Optional group-level admin config (e.g. a description shown in the admin UI). */
  admin?: GroupField['admin']
  /** Persisted default value for the label text field. */
  defaultLabel?: string
  /** Append a button/link style select below label + href. */
  withStyle?: boolean
}

/**
 * Shared `{ label, href }` CTA group. Mirrors the `iconField()` pattern.
 *
 * Produces the exact field shape that was previously inlined across the schema,
 * so swapping call sites to this factory requires no D1 migration.
 */
export function ctaField(options: CtaFieldOptions): GroupField {
  const { name, admin, defaultLabel, withStyle } = options

  const fields: Field[] = [
    {
      name: 'label',
      type: 'text',
      ...(defaultLabel !== undefined ? { defaultValue: defaultLabel } : {}),
    },
    {
      name: 'href',
      type: 'text',
    },
  ]

  if (withStyle) {
    fields.push({
      name: 'style',
      type: 'select',
      defaultValue: 'button',
      options: [
        { label: 'Button', value: 'button' },
        { label: 'Link', value: 'link' },
      ],
    })
  }

  return {
    name,
    type: 'group',
    ...(admin ? { admin } : {}),
    fields,
  }
}
