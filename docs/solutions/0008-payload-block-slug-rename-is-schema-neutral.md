---
title: Renaming a Payload block slug (camelCase↔kebab-case) is schema-neutral under the D1 adapter
date: 2026-07-12
category: tooling
module: cms
problem_type: developer_experience
component: payload
symptoms:
  - "unsure whether renaming a Payload block slug needs a D1 data migration for persisted layout JSON"
applies_when:
  - 'renaming a Payload block slug whose old and new forms snake_case to the same identifier (e.g. formEmbed → form-embed)'
  - 'deciding whether persisted page/layout rows need a data migration after a slug rename'
resolution_type: verification
severity: low
tags: [payload, blocks, slug, d1, sqlite, migration, cms, drizzle]
---

# Renaming a Payload block slug (camelCase↔kebab-case) is schema-neutral under the D1 adapter

## Context

MKT-188 renamed the `formEmbed` block slug to `form-embed` (it was the only
camelCase block slug; all others are kebab-case). The Linear issue warned that
"the slug is persisted in page layout JSON, so either fix it with a data
migration or document it as intentionally frozen." That warning turned out not
to hold for this project's storage layer — the rename needed **no migration and
no data backfill**.

## Guidance

Before assuming a block-slug rename needs a data migration, check whether the
old and new slugs **snake_case to the same identifier**. Payload's SQLite/D1
(Drizzle) adapter stores blocks relationally, not as a `blockType` string:

- Each block type gets its own table named `<collection>_blocks_<snake_slug>`
  (e.g. `pages_blocks_form_embed`, `solutions_blocks_form_embed`,
  `landing_pages_blocks_form_embed`). Confirm the table name in an existing
  migration: `grep -o '[a-z_]*form_embed[a-z_]*' src/migrations/*.ts`.
- A row's block type is implied by **which table it lives in**. There is no
  persisted `blockType` column — the `blockType` value the API returns
  (`'form-embed'`) is reconstructed from the block config's slug at query time.

Both `formEmbed` and `form-embed` snake_case to `form_embed`, so the table names
are identical before and after the rename. Nothing in D1 changes: existing rows
stay in the same tables and are re-served under the new `blockType` string.

Verify empirically with the project's drift check — it is the arbiter:

```bash
pnpm check-migrations   # expect: "Schema in sync — no new migration needed."
```

Remember the non-DB consumers that the rename *does* touch (the compiler and
grep find these):

- Regenerate types: `NODE_OPTIONS=--no-deprecation npx payload generate:types`
  (the `blockType: 'formEmbed'` union member and `formEmbed?:` select keys
  become `'form-embed'`).
- Update any `case '<oldSlug>':` string matches — here
  `src/app/(frontend)/_lib/blocks-to-markdown.ts`.
- Add `labels` if the block lacked them (unrelated to the rename, but the same
  cleanup).

## Why This Matters

The instinct "a slug is persisted, so renaming needs a data migration" is
correct for adapters that store the discriminator as a string (or for JSON-blob
storage), but wrong for Payload's relational SQLite/D1 adapter when the slug
snake_cases unchanged. Acting on the instinct would mean writing and shipping a
pointless (and risk-adding) `UPDATE` migration. Checking the table-name
derivation + `check-migrations` first turns a "needs a careful data migration"
task into a three-line code change verified in seconds.

The corollary bounds it: a rename where the snake_case form **does** change
(e.g. `formEmbed` → `embedded-form` ⇒ `form_embed` → `embedded_form`) *would*
rename the tables and require a real migration (and data move). The
schema-neutral shortcut only applies when the snake_case identifier is stable.

## When to Apply

Any time you rename a Payload block (or any field whose column/table name is
slug-derived) and need to decide whether persisted data is affected. Compute the
snake_case of both slugs; if they match, expect zero schema/data change and
confirm with `pnpm check-migrations`.

## Related

- MKT-188 / PR #18 — the formEmbed → form-embed rename.
- [[0001-payload-revalidate-hook-rolls-back-writes]] — another Payload+D1
  behavior that surprises outside a request scope.
- CLAUDE.md → Database & Migration Rules: local dev uses `pushDevSchema`;
  production needs a generated migration — but only when the schema actually
  changes, which this did not.
