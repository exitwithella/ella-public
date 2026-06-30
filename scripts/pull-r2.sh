#!/usr/bin/env bash
#
# Pull remote R2 media blobs DOWN into the local miniflare R2 state.
#
# Mirror of migrate-r2.sh (which pushes local -> remote). Keys are derived from
# src/seed-data/media.json (the `filename` field == the R2 object key). For each
# key the blob is streamed remote -> local through wrangler, so miniflare's
# internal state is written correctly without hand-editing its sqlite.
#
# Run AFTER `content:pull` has refreshed media.json + seeded the local D1, so the
# local media records line up with the blobs being pulled.
#
# Usage:  bash scripts/pull-r2.sh [--dry-run]
#
set -euo pipefail

DRY_RUN=false
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
  echo "=== DRY RUN — no downloads will be made ==="
  echo
fi

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MEDIA_JSON="$PROJECT_ROOT/src/seed-data/media.json"
BUCKET="ella-public-payload"

if [[ ! -f "$MEDIA_JSON" ]]; then
  echo "ERROR: media manifest not found at $MEDIA_JSON (run 'pnpm content:pull' first)"
  exit 1
fi

# Read one filename per line from media.json (skip blank/missing).
# Plain `while read` loop for bash 3.2 compatibility (macOS has no `mapfile`).
KEYS=()
while IFS= read -r line; do
  [[ -n "$line" ]] && KEYS+=("$line")
done < <(python3 -c "
import json
for m in json.load(open('$MEDIA_JSON')):
    fn = m.get('filename')
    if fn:
        print(fn)
")

TOTAL=${#KEYS[@]}
echo "Pulling $TOTAL objects from remote R2 bucket: $BUCKET"
echo

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

SUCCESS=0
FAILED=0

for KEY in "${KEYS[@]}"; do
  if $DRY_RUN; then
    echo "  [dry-run] $KEY"
    SUCCESS=$((SUCCESS + 1))
    continue
  fi

  TMP_FILE="$TMP_DIR/blob"
  echo -n "  Pulling: $KEY... "

  if ! npx wrangler r2 object get "$BUCKET/$KEY" --file="$TMP_FILE" --remote >/dev/null 2>&1; then
    echo "FAILED (remote get)"
    FAILED=$((FAILED + 1))
    continue
  fi

  if npx wrangler r2 object put "$BUCKET/$KEY" --file="$TMP_FILE" --local >/dev/null 2>&1; then
    echo "OK"
    SUCCESS=$((SUCCESS + 1))
  else
    echo "FAILED (local put)"
    FAILED=$((FAILED + 1))
  fi

  rm -f "$TMP_FILE"
done

echo
echo "Done. $SUCCESS succeeded, $FAILED failed out of $TOTAL total."
