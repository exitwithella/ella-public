#!/bin/bash
# Cursor afterFileEdit hook: auto-format edited files with oxfmt.
# Parity with the Claude Code PostToolUse hook (.claude/hooks/auto-format.sh).

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.file_path // empty')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

case "$FILE_PATH" in
  *.ts | *.tsx | *.js | *.jsx | *.json | *.jsonc | *.css)
    oxfmt --write "$FILE_PATH" 2>/dev/null
    ;;
esac

exit 0
