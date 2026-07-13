#!/usr/bin/env bash
# Clone the production D1 into the durable staging D1 (schema + data) so the
# staging environment holds real content for testing schema/migration changes.
# Deliberately bypasses `pnpm seed` (its seed-data is known-stale).
#
# Requires Cloudflare auth first: `wrangler login` or export CLOUDFLARE_API_TOKEN.
#
# Why this isn't a one-liner: a `wrangler d1 export` dump is NOT cleanly
# re-importable via `d1 execute --file`:
#   1. it emits `ANALYZE` + `sqlite_stat1` rows that error on import;
#   2. it orders some child tables/rows before their parents, and D1's remote
#      `--file` import commits in batches, so `PRAGMA defer_foreign_keys` does
#      not hold across the whole file (you get "no such table" / "FOREIGN KEY
#      constraint failed").
# So we split schema from data, strip the stats lines, load the schema first,
# then load the data with foreign-key enforcement off.
#
# NOTE: assumes the staging D1 is EMPTY (first clone). To refresh an existing
# staging DB, recreate it first (`wrangler d1 delete ella-public-staging-payload`
# then `wrangler d1 create …`, update the id in wrangler.jsonc) — the prod dump
# mixes `CREATE TABLE` (no IF NOT EXISTS) statements that fail against existing
# tables.
set -euo pipefail

PROD_DB="${PROD_DB:-ella-public-payload}"
STAGING_DB="${STAGING_DB:-ella-public-staging-payload}"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

strip_stats() { grep -v -e '^INSERT INTO "sqlite_stat1"' -e '^ANALYZE ' "$@"; }

echo "→ exporting prod schema + data ($PROD_DB, read-only)"
npx wrangler d1 export "$PROD_DB" --remote --no-data   --output "$TMP/schema.sql"
npx wrangler d1 export "$PROD_DB" --remote --no-schema --output "$TMP/data.sql"

strip_stats "$TMP/schema.sql" > "$TMP/schema-clean.sql"
{
  printf 'PRAGMA foreign_keys=OFF;\n'
  strip_stats "$TMP/data.sql" | grep -v '^PRAGMA defer_foreign_keys'
} > "$TMP/data-clean.sql"

echo "→ loading schema into staging ($STAGING_DB)"
npx wrangler d1 execute "$STAGING_DB" --remote --file "$TMP/schema-clean.sql"

echo "→ loading data into staging"
npx wrangler d1 execute "$STAGING_DB" --remote --file "$TMP/data-clean.sql"

echo "✓ staging D1 cloned from prod."
echo "  Next: CLOUDFLARE_ENV=staging pnpm run deploy   (applies pending migrations + deploys the staging Worker)"
