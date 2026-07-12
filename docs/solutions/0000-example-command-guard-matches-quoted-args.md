---
title: A command-policy guard must evaluate the invocation, not quoted arguments
date: 2026-07-12
category: tooling
module: agent-hooks
problem_type: tooling_decision
component: tooling
symptoms:
  - "git commit -m '...' aborted with a PreToolUse guard block even though the commit ran no forbidden command"
  - 'the blocked text merely quoted a banned word (rm, sqlite, npm, payload migrate) inside a message or echo/grep argument'
applies_when:
  - 'writing or extending the shared command guard (scripts/agent-hooks/classify-command.sh)'
  - 'a shell command passes free-text that quotes a forbidden command name or file'
resolution_type: code_fix
severity: low
tags: [hooks, command-guard, claude-code, cursor, false-positive, compound-engineering]
---

# A command-policy guard must evaluate the invocation, not quoted arguments

## Problem

The shared command guard (`scripts/agent-hooks/classify-command.sh`, wired into
Claude Code's `PreToolUse(Bash)` and Cursor's `beforeShellExecution`) ran its
regexes over the whole command string. A command whose _argument_ merely quotes
a banned word — a `git commit -m` message, an `echo`/`grep` string — was blocked
even though it invokes nothing forbidden. The guard was matching data, not the
command being run.

## Symptoms

- `git commit -m 'fix rm of the D1 dev.sqlite file'` → blocked by the
  anti-pattern-#12 rule because the message contains `rm` and `.sqlite`.
- `echo "do not run npm ci"`, `grep "payload migrate" logs` → blocked the same
  way.

## What Didn't Work

- **Using `git commit -F <file>` to keep trigger words off the command line.**
  This is a band-aid, not a fix: it only dodges one command, leaves every other
  quoted-text case (`echo`, `grep`, docs about the policy) still blocked, and
  pushes an undocumented ritual onto every future author — the exact implicit
  discipline these hooks exist to remove.
- Loosening the patterns would weaken enforcement of real invocations.

## Solution

Strip quoted spans from the command before matching, so only unquoted command
tokens are evaluated. Collapse newlines first — a quoted span can cross lines
(a multi-line commit message), and `sed` strips only within a line, so a naive
one-line-at-a-time strip leaves later lines of the message exposed:

```bash
SCAN=$(printf '%s' "$CMD" | tr '\n' ' ' | sed -e 's/"[^"]*"//g' -e "s/'[^']*'//g")
```

Match every rule against `$SCAN` instead of the raw command. Combined with the
already-anchored patterns (`(^|[;&|(\s])(npm|yarn)…`) and the `.sqlite`
file-extension check, the false-positive class disappears with no ritual:

- `git commit -m 'fix rm of x.sqlite'` → quoted span removed → allowed.
- `npm install`, `rm dev.sqlite`, `CONFIRM_REMOTE=yes …` → unquoted → still blocked.

## Why This Works

A command-policy guard should reason about the _command being invoked_, not
arbitrary string literals handed to it. Quoted spans are data; removing them
leaves the actual command tokens, which is what the policy is about.

## Prevention

- When adding a guard rule, match a command word or a file argument, and run it
  against the quote-stripped command — never a bare keyword over raw text.
- Accept the tradeoff: a banned word inside quotes (`rm "x.sqlite"`) slips
  through. This guard is an accidental-mistake guardrail, not a security
  boundary — an agent can bypass any rule trivially, so optimizing against
  adversarial evasion at the cost of everyday false positives is the wrong call.

## Related Issues

- Anti-patterns #10–#13 in CLAUDE.md are the rules this guard enforces.
