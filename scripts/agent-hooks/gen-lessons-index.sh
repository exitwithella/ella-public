#!/bin/bash
# Rebuilds the compounding-lessons index from docs/solutions/ frontmatter:
#   - docs/solutions/INDEX.md              (one line per solution)
#   - .cursor/rules/compound-lessons.mdc   (always-applied Cursor rule, index inlined)
#
# Runs as a hook (Claude PostToolUse Edit|Write, Cursor afterFileEdit) and can be
# run by hand. As a hook it short-circuits immediately unless the edited file is
# under docs/solutions/. Writes are idempotent — unchanged output is not rewritten.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Read hook stdin only when piped (avoid blocking on manual/interactive runs).
INPUT=""
if [ ! -t 0 ]; then
  INPUT=$(cat)
fi

# Hook mode: skip work unless the edit touched docs/solutions/.
if [ -n "$INPUT" ]; then
  FILE_PATH=$(printf '%s' "$INPUT" | jq -r '(.tool_input.file_path // .file_path // empty)' 2>/dev/null)
  case "$FILE_PATH" in
    *docs/solutions/*) ;;   # regenerate
    *) exit 0 ;;            # unrelated edit — short-circuit fast
  esac
fi

node "$SCRIPT_DIR/gen-lessons-index.mjs" "$REPO_ROOT" || exit 0
exit 0
