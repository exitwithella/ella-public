#!/usr/bin/env bash
#
# Migrate local R2 media blobs to remote Cloudflare R2 bucket.
#
# Reads the miniflare R2 metadata SQLite to map keys → blob files,
# then uploads each to the remote bucket via wrangler.
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
R2_DB="$PROJECT_ROOT/.wrangler/state/v3/r2/miniflare-R2BucketObject/ff996cb41a87f3a34e939b27a9727c46b68459c9425ea801cb6c3ed3fde545b9.sqlite"
BLOB_DIR="$PROJECT_ROOT/.wrangler/state/v3/r2/ella-public-payload/blobs"
BUCKET="ella-public-payload"

if [[ ! -f "$R2_DB" ]]; then
  echo "ERROR: R2 metadata DB not found at $R2_DB"
  exit 1
fi

# Get all objects from miniflare metadata, excluding %20 URL-encoded duplicates
# (D1 media table uses non-encoded filenames as R2 keys)
OBJECTS=$(sqlite3 "$R2_DB" "SELECT key || '|' || blob_id || '|' || http_metadata FROM _mf_objects WHERE key NOT LIKE '%\%20%' ORDER BY key;")

TOTAL=$(echo "$OBJECTS" | wc -l | tr -d ' ')
echo "Uploading $TOTAL objects to remote R2 bucket: $BUCKET"
echo

SUCCESS=0
FAILED=0

while IFS= read -r line; do
  # Parse: key|blob_id|http_metadata_json
  KEY="${line%%|*}"
  REST="${line#*|}"
  BLOB_ID="${REST%%|*}"
  HTTP_META="${REST#*|}"

  BLOB_PATH="$BLOB_DIR/$BLOB_ID"

  if [[ ! -f "$BLOB_PATH" ]]; then
    echo "  SKIP (blob missing): $KEY"
    FAILED=$((FAILED + 1))
    continue
  fi

  # Determine content type from http_metadata JSON, or infer from extension
  CONTENT_TYPE=""
  if [[ "$HTTP_META" == *"contentType"* ]]; then
    CONTENT_TYPE=$(echo "$HTTP_META" | python3 -c "import sys,json; print(json.load(sys.stdin).get('contentType',''))" 2>/dev/null || true)
  fi

  # Fallback: infer from file extension
  if [[ -z "$CONTENT_TYPE" ]]; then
    EXT="${KEY##*.}"
    case "$EXT" in
      png)  CONTENT_TYPE="image/png" ;;
      jpg|jpeg) CONTENT_TYPE="image/jpeg" ;;
      gif)  CONTENT_TYPE="image/gif" ;;
      webp) CONTENT_TYPE="image/webp" ;;
      svg)  CONTENT_TYPE="image/svg+xml" ;;
      pdf)  CONTENT_TYPE="application/pdf" ;;
      *)    CONTENT_TYPE="application/octet-stream" ;;
    esac
  fi

  SIZE=$(wc -c < "$BLOB_PATH" | tr -d ' ')
  SIZE_KB=$((SIZE / 1024))

  if $DRY_RUN; then
    echo "  [dry-run] $KEY (${SIZE_KB}KB, $CONTENT_TYPE)"
  else
    echo -n "  Uploading: $KEY (${SIZE_KB}KB, $CONTENT_TYPE)... "
    if npx wrangler r2 object put "$BUCKET/$KEY" \
        --file="$BLOB_PATH" \
        --content-type="$CONTENT_TYPE" \
        --remote 2>/dev/null; then
      echo "OK"
    else
      echo "FAILED"
      FAILED=$((FAILED + 1))
      continue
    fi
  fi

  SUCCESS=$((SUCCESS + 1))
done <<< "$OBJECTS"

echo
echo "Done. $SUCCESS succeeded, $FAILED failed out of $TOTAL total."
