#!/bin/bash
# Cursor stop hook: nudge to capture a lesson when the branch has a
# fix/perf/refactor commit but no solution doc. Returns a single auto-submitted
# follow-up; the loop_count guard makes it self-terminating.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HEURISTIC="$SCRIPT_DIR/../../scripts/agent-hooks/should-nudge-compound.sh"

INPUT=$(cat)

# Only on a clean completion, and only once (a follow-up bumps loop_count to 1).
[ "$(echo "$INPUT" | jq -r '.status // empty')" = "completed" ] || exit 0
[ "$(echo "$INPUT" | jq -r '.loop_count // 0')" -ge 1 ] 2>/dev/null && exit 0

"$HEURISTIC" || exit 0

jq -n '{followup_message: "This branch has a fix/perf/refactor commit but no docs/solutions entry. If you solved a non-obvious problem, run /ce-compound to capture the lesson. If nothing here is worth remembering, finish without it."}'
