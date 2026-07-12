#!/bin/bash
# Claude Code SessionStart hook: inject the compounding-lessons index as
# additionalContext so prior solved problems are searchable from turn one.
# Capped at ~4KB on line boundaries; the substance stays in docs/solutions/.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INDEX_FILE="$SCRIPT_DIR/../../docs/solutions/INDEX.md"

[ -f "$INDEX_FILE" ] || exit 0

CONTENT=$(awk '
  BEGIN { n = 0 }
  { n += length($0) + 1
    if (n > 4096) { print "…(index truncated — see docs/solutions/INDEX.md)"; exit }
    print }
' "$INDEX_FILE")

[ -z "$CONTENT" ] && exit 0

jq -n --arg ctx "$CONTENT" \
  '{hookSpecificOutput: {hookEventName: "SessionStart", additionalContext: $ctx}}'
