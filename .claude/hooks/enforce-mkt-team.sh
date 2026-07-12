#!/bin/bash
# Claude Code PreToolUse adapter for the Linear MKT-team guard.
# Registered under matcher mcp__claude_ai_Linear__.*
# Injects team=MKT when absent, blocks a non-MKT team. Shared logic in
# scripts/agent-hooks/check-linear-team.sh.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CHECK="$SCRIPT_DIR/../../scripts/agent-hooks/check-linear-team.sh"

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
TOOL_INPUT=$(echo "$INPUT" | jq -c '.tool_input // {}')
TEAM=$(echo "$TOOL_INPUT" | jq -r '.team // empty')

case "$("$CHECK" "$TOOL_NAME" "$TEAM")" in
  INJECT)
    UPDATED=$(echo "$TOOL_INPUT" | jq '. + {"team": "MKT"}')
    echo "{\"hookSpecificOutput\":{\"hookEventName\":\"PreToolUse\",\"updatedInput\":$UPDATED,\"additionalContext\":\"Team automatically set to MKT for this project.\"}}"
    ;;
  BLOCK)
    echo "BLOCKED: This project uses the MKT team exclusively. You specified team '$TEAM'. Change it to 'MKT'." >&2
    exit 2
    ;;
esac

exit 0
