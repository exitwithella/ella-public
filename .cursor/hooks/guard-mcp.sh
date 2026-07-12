#!/bin/bash
# Cursor beforeMCPExecution adapter for the Linear MKT-team guard.
# Cursor hooks can't mutate tool input, so a missing team is denied with an
# instruction to retry (Claude injects; Cursor instructs-and-retries). A wrong
# team is denied. Shared logic in scripts/agent-hooks/check-linear-team.sh.
#
# Note: beforeMCPExecution is desktop-only — Cursor cloud agents don't run it.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CHECK="$SCRIPT_DIR/../../scripts/agent-hooks/check-linear-team.sh"

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
TEAM=$(echo "$INPUT" | jq -r '.tool_input.team // empty')

case "$("$CHECK" "$TOOL_NAME" "$TEAM")" in
  INJECT)
    jq -n '{permission: "deny",
            agent_message: "This project uses the MKT team exclusively — retry this Linear call with team \"MKT\".",
            user_message: "Linear call blocked: retry with team MKT."}'
    ;;
  BLOCK)
    jq -n --arg t "$TEAM" \
      '{permission: "deny",
        agent_message: ("This project uses the MKT team exclusively — retry with team \"MKT\" instead of \"" + $t + "\"."),
        user_message: "Linear call blocked: wrong team."}'
    ;;
esac

exit 0
