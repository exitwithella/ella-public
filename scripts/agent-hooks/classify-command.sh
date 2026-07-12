#!/bin/bash
# Shared shell-command policy guard for Claude Code + Cursor.
#
# Turns the non-negotiable CLAUDE.md hard rules (anti-patterns #10-#13 and the
# production-write confirmation) into executable policy. Agent-agnostic:
# the per-agent adapters extract the command string, pipe it here on stdin,
# and translate the result into their own hook protocol.
#
# Contract:
#   stdin  = the shell command to evaluate
#   stdout = a human-readable reason, ONLY when the command is blocked
#   exit 0 = allow, exit 1 = block

CMD="$(cat)"

# Nothing to check.
[ -z "$CMD" ] && exit 0

# Anti-pattern #10 — pnpm only. Block `npm`/`yarn` invoked as a command word.
# `pnpm` and `npx` are word-distinct from `npm`, so they are never matched.
if printf '%s' "$CMD" | grep -qE '(^|[[:space:];&|(])(npm|yarn)([[:space:]]|$)'; then
  echo "Blocked: this project uses pnpm exclusively (anti-pattern #10). Use pnpm instead of npm/yarn. (npx and pnpm are allowed.)"
  exit 1
fi

# Anti-pattern #11 — oxlint/oxfmt only. Block `eslint`/`prettier` as a command word.
if printf '%s' "$CMD" | grep -qE '(^|[[:space:];&|(])(eslint|prettier)([[:space:]]|$)'; then
  echo "Blocked: this project uses oxlint/oxfmt exclusively (anti-pattern #11). Use 'pnpm lint' / 'pnpm format' instead of eslint/prettier."
  exit 1
fi

# Anti-pattern #12 — never delete the local D1 SQLite file. Block any `rm`
# invocation that also references a *.sqlite file (the dot keeps prose that
# merely mentions "sqlite" — e.g. a commit message — from matching). Drop
# specific tables instead.
if printf '%s' "$CMD" | grep -qE '(^|[[:space:];&|(])rm([[:space:]]|$)' \
  && printf '%s' "$CMD" | grep -qiE '\.sqlite'; then
  echo "Blocked: never delete the local D1 SQLite file (anti-pattern #12). It holds MCP keys, logins, and other state 'pnpm seed' cannot regenerate. Drop only the specific conflicting tables via 'npx wrangler d1 execute --local' instead."
  exit 1
fi

# Anti-pattern #13 — generate migrations, don't apply them locally.
# Block bare `payload migrate` (the apply command). `migrate:create` is allowed
# (the ':' prevents a match), and the REMOTE_BINDINGS=true deploy path is exempt.
if printf '%s' "$CMD" | grep -qE 'payload[[:space:]]+migrate($|[^:])'; then
  if ! printf '%s' "$CMD" | grep -qE 'REMOTE_BINDINGS=true'; then
    echo "Blocked: do not run 'payload migrate' against local D1 (anti-pattern #13) — local schema is applied automatically via pushDevSchema. To capture a production migration run 'npx payload migrate:create'; the deploy scripts apply it to remote D1."
    exit 1
  fi
fi

# Production-write guard — agents must never bypass the human confirmation in
# scripts/confirm-remote.ts. CONFIRM_REMOTE=yes is the CI-only escape hatch.
if printf '%s' "$CMD" | grep -qiE 'CONFIRM_REMOTE=yes'; then
  echo "Blocked: agents must never bypass the production-write confirmation (scripts/confirm-remote.ts). Do not set CONFIRM_REMOTE=yes — that flag is reserved for CI."
  exit 1
fi

exit 0
