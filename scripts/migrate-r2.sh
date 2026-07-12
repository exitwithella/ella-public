#!/usr/bin/env bash
#
# Push local R2 media blobs UP to the remote Cloudflare R2 bucket.
#
# Mirror of pull-r2.sh (which pulls remote -> local). Keys are derived from
# src/seed-data/media.json (the `filename` field == the R2 object key), so this
# never touches miniflare's internal sqlite/blob layout — which uses per-machine
# object hashes that don't survive across developers, CI, or state regen. For
# each key the blob is streamed local -> remote through wrangler, preserving the
# content type recorded in media.json.
#
# Run as the tail of `content:push`, AFTER local content has been dumped
# (so media.json is current) and seeded into remote D1.
#
# Usage:  bash scripts/migrate-r2.sh [--dry-run]
#
set -euo pipefail

DRY_RUN=false
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
  echo "=== DRY RUN — no uploads will be made ==="
  echo
fi

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MEDIA_JSON="$PROJECT_ROOT/src/seed-data/media.json"
BUCKET="ella-public-payload"

if [[ ! -f "$MEDIA_JSON" ]]; then
  echo "ERROR: media manifest not found at $MEDIA_JSON (run 'pnpm dump' first)"
  exit 1
fi

# Read one "filename<TAB>mimeType" pair per line from media.json (skip blanks).
# Plain `while read` loop for bash 3.2 compatibility (macOS has no `mapfile`).
KEYS=()
MIMES=()
while IFS=$'\t' read -r key mime; do
  [[ -n "$key" ]] || continue
  KEYS+=("$key")
  MIMES+=("$mime")
done < <(python3 -c "
import json
for m in json.load(open('$MEDIA_JSON')):
    fn = m.get('filename')
    if fn:
        print(fn + '\t' + (m.get('mimeType') or ''))
")

TOTAL=${#KEYS[@]}
echo "Uploading $TOTAL objects to remote R2 bucket: $BUCKET"
echo

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

SUCCESS=0
FAILED=0

for i in "${!KEYS[@]}"; do
  KEY="${KEYS[$i]}"
  MIME="${MIMES[$i]}"

  # Fall back to an extension-based content type when media.json has none.
  if [[ -z "$MIME" ]]; then
    EXT="${KEY##*.}"
    case "$EXT" in
      png)      MIME="image/png" ;;
      jpg|jpeg) MIME="image/jpeg" ;;
      gif)      MIME="image/gif" ;;
      webp)     MIME="image/webp" ;;
      svg)      MIME="image/svg+xml" ;;
      pdf)      MIME="application/pdf" ;;
      *)        MIME="application/octet-stream" ;;
    esac
  fi

  if $DRY_RUN; then
    echo "  [dry-run] $KEY ($MIME)"
    SUCCESS=$((SUCCESS + 1))
    continue
  fi

  TMP_FILE="$TMP_DIR/blob"
  echo -n "  Uploading: $KEY ($MIME)... "

  if ! npx wrangler r2 object get "$BUCKET/$KEY" --file="$TMP_FILE" --local >/dev/null 2>&1; then
    echo "FAILED (local get — is the blob in local R2?)"
    FAILED=$((FAILED + 1))
    continue
  fi

  if npx wrangler r2 object put "$BUCKET/$KEY" --file="$TMP_FILE" --content-type="$MIME" --remote >/dev/null 2>&1; then
    echo "OK"
    SUCCESS=$((SUCCESS + 1))
  else
    echo "FAILED (remote put)"
    FAILED=$((FAILED + 1))
  fi

  rm -f "$TMP_FILE"
done

echo
echo "Done. $SUCCESS succeeded, $FAILED failed out of $TOTAL total."
