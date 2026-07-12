#!/bin/bash
# Claude Code Stop hook: nudge to capture a lesson when the branch has a
# fix/perf/refactor commit but no solution doc. Blocking (exit 2), but fires at
# most once per HEAD state — guarded by stop_hook_active and a HEAD-keyed
# sentinel — so it can never loop.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HEURISTIC="$SCRIPT_DIR/../../scripts/agent-hooks/should-nudge-compound.sh"

INPUT=$(cat)

# Loop guard 1: never re-block once the hook is already driving the stop.
[ "$(echo "$INPUT" | jq -r '.stop_hook_active // false')" = "true" ] && exit 0

"$HEURISTIC" || exit 0

HEAD_SHA=$(git rev-parse HEAD 2>/dev/null) || exit 0

# Loop guard 2: one nudge per branch state, keyed by HEAD.
SENTINEL=$(git rev-parse --git-path compound-nudged 2>/dev/null)
if [ -n "$SENTINEL" ] && [ -f "$SENTINEL" ] && [ "$(cat "$SENTINEL")" = "$HEAD_SHA" ]; then
  exit 0
fi
[ -n "$SENTINEL" ] && printf '%s' "$HEAD_SHA" >"$SENTINEL"

echo "This branch has a fix/perf/refactor commit but no docs/solutions entry. If you solved a non-obvious problem, run /ce-compound to capture the lesson before finishing. If nothing here is worth remembering, just stop again — this nudge won't repeat for this commit." >&2
exit 2
