#!/bin/bash
# Claude Code PreToolUse(Bash) adapter for the shared command guard.
# Extracts the command, delegates the policy decision to classify-command.sh,
# and on a block writes the reason to stderr and exits 2 (Claude's "deny" code).

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLASSIFIER="$SCRIPT_DIR/../../scripts/agent-hooks/classify-command.sh"

INPUT=$(cat)
CMD=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

[ -z "$CMD" ] && exit 0

REASON=$(printf '%s' "$CMD" | "$CLASSIFIER")
if [ $? -ne 0 ]; then
  echo "$REASON" >&2
  exit 2
fi

exit 0
