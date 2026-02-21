#!/bin/bash
# PostToolUse hook: auto-format files Claude edits with oxfmt

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

case "$FILE_PATH" in
  *.ts | *.tsx | *.js | *.jsx | *.json | *.jsonc | *.css)
    oxfmt --write "$FILE_PATH" 2>/dev/null
    ;;
esac

exit 0
