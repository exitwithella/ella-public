#!/bin/bash
# Shared decision for the Linear MKT-team guard (Claude + Cursor).
# This project uses the MKT team exclusively.
#
#   args: $1 = tool name, $2 = team value (may be empty)
#   stdout (one word):
#     ALLOW   — not a team-scoped Linear tool, or team is already MKT
#     INJECT  — team-scoped Linear tool with no team set (add MKT)
#     BLOCK   — team-scoped Linear tool with a non-MKT team
#
# Team-scoped tools are matched by operation suffix AND a "linear" substring, so
# the same rule covers Claude's mcp__claude_ai_Linear__save_issue and Cursor's
# Linear MCP tool names alike.

TOOL="$1"
TEAM="$2"

SCOPED='(save_issue|create_issue|save_project|create_project|list_issues|list_issue_statuses|list_issue_labels|list_cycles|get_team)$'

printf '%s' "$TOOL" | grep -qiE 'linear' || { echo ALLOW; exit 0; }
printf '%s' "$TOOL" | grep -qE "$SCOPED" || { echo ALLOW; exit 0; }

if [ -z "$TEAM" ]; then
  echo INJECT
  exit 0
fi

case "$TEAM" in
  MKT | b3b0de7e-ed9d-42c0-8a0f-7433f6978882 | "Public Site") echo ALLOW ;;
  *) echo BLOCK ;;
esac
exit 0
