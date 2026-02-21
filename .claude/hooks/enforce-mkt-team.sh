#!/bin/bash
# Hook: PreToolUse on all Linear tools that accept a team parameter
# Ensures the MKT team is always used for this project.
# If a different team is specified, blocks the call.
# If no team is specified, injects MKT.

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
TOOL_INPUT=$(echo "$INPUT" | jq -r '.tool_input // empty')

# Only care about tools that have a team parameter
TEAM=$(echo "$TOOL_INPUT" | jq -r '.team // empty')

# Tools that accept a team parameter
case "$TOOL_NAME" in
  mcp__claude_ai_Linear__create_issue|\
  mcp__claude_ai_Linear__save_project|\
  mcp__claude_ai_Linear__list_issue_statuses|\
  mcp__claude_ai_Linear__list_issue_labels|\
  mcp__claude_ai_Linear__list_issues|\
  mcp__claude_ai_Linear__list_cycles|\
  mcp__claude_ai_Linear__get_team)
    if [ -z "$TEAM" ]; then
      # No team specified — inject MKT
      UPDATED=$(echo "$TOOL_INPUT" | jq '. + {"team": "MKT"}')
      echo "{\"hookSpecificOutput\":{\"hookEventName\":\"PreToolUse\",\"updatedInput\":$UPDATED,\"additionalContext\":\"Team automatically set to MKT for this project.\"}}"
      exit 0
    elif [ "$TEAM" != "MKT" ] && [ "$TEAM" != "b3b0de7e-ed9d-42c0-8a0f-7433f6978882" ] && [ "$TEAM" != "Public Site" ]; then
      # Wrong team specified — block
      echo "BLOCKED: This project uses the MKT team exclusively. You specified team '$TEAM'. Change it to 'MKT'." >&2
      exit 2
    fi
    ;;
esac

exit 0
