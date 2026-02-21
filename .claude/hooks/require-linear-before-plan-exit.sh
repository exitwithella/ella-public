#!/bin/bash
# Hook: PreToolUse on ExitPlanMode
# Blocks plan finalization if Linear project and issues weren't created.
#
# Reads the session transcript (JSONL) and checks for:
# 1. At least one mcp__claude_ai_Linear__save_project call (project created)
# 2. At least one mcp__claude_ai_Linear__create_issue call (issues created)
# 3. At least one mcp__claude_ai_Linear__create_document call (plan doc attached)

INPUT=$(cat)
TRANSCRIPT=$(echo "$INPUT" | jq -r '.transcript_path // empty')

if [ -z "$TRANSCRIPT" ] || [ ! -f "$TRANSCRIPT" ]; then
  # Can't verify — allow through with a reminder
  echo '{"hookSpecificOutput":{"hookEventName":"PreToolUse","additionalContext":"WARNING: Could not verify Linear tracking. Ensure a Linear project, plan document, and issues exist for this plan in the MKT team before proceeding."}}'
  exit 0
fi

MISSING=""

if ! grep -q "mcp__claude_ai_Linear__save_project" "$TRANSCRIPT" 2>/dev/null; then
  MISSING="Linear project (mcp__claude_ai_Linear__save_project)"
fi

if ! grep -q "mcp__claude_ai_Linear__create_issue" "$TRANSCRIPT" 2>/dev/null; then
  if [ -n "$MISSING" ]; then
    MISSING="$MISSING, Linear issues (mcp__claude_ai_Linear__create_issue)"
  else
    MISSING="Linear issues (mcp__claude_ai_Linear__create_issue)"
  fi
fi

if ! grep -q "mcp__claude_ai_Linear__create_document" "$TRANSCRIPT" 2>/dev/null; then
  if [ -n "$MISSING" ]; then
    MISSING="$MISSING, plan document (mcp__claude_ai_Linear__create_document)"
  else
    MISSING="plan document (mcp__claude_ai_Linear__create_document)"
  fi
fi

if [ -n "$MISSING" ]; then
  echo "BLOCKED: Missing $MISSING. Per CLAUDE.md § Linear Project Tracking, you must create a Linear project in the MKT team, attach the plan as a document, and create issues for each implementation step before finalizing the plan." >&2
  exit 2
fi

exit 0
