#!/bin/bash
# Cursor beforeShellExecution adapter for the shared command guard.
# Extracts the command, delegates to classify-command.sh, and on a block
# returns a deny permission with the reason. Silent allow otherwise.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLASSIFIER="$SCRIPT_DIR/../../scripts/agent-hooks/classify-command.sh"

INPUT=$(cat)
CMD=$(echo "$INPUT" | jq -r '.command // empty')

[ -z "$CMD" ] && exit 0

REASON=$(printf '%s' "$CMD" | "$CLASSIFIER")
if [ $? -ne 0 ]; then
  jq -n --arg msg "$REASON" \
    '{permission: "deny", agent_message: $msg, user_message: $msg}'
  exit 0
fi

exit 0
