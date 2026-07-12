---
title: Command-guard hooks match quoted arguments, so describe policy via commit -F
date: 2026-07-12
category: tooling
module: agent-hooks
problem_type: tooling_decision
component: tooling
symptoms:
  - "git commit -m '...' aborted with a PreToolUse guard block even though the commit ran no forbidden command"
  - "the blocked message text merely described the policy (mentioned rm, sqlite, or a forbidden command name)"
applies_when:
  - "editing or committing changes to the shared command guard (scripts/agent-hooks/classify-command.sh)"
  - "a shell command carries free-text that quotes a forbidden command name or file"
resolution_type: workflow_improvement
severity: low
tags: [hooks, command-guard, claude-code, cursor, git-commit, compound-engineering]
---

# Command-guard hooks match quoted arguments, so describe policy via commit -F

## Problem

The shared command guard (`scripts/agent-hooks/classify-command.sh`, wired into
Claude Code's `PreToolUse(Bash)` and Cursor's `beforeShellExecution`) inspects
the **entire command string**. A `git commit -m "…"` whose message merely
*describes* a forbidden action is itself a command string containing the trigger
words, so the guard blocks the commit — even though the commit executes nothing
forbidden.

## Symptoms

- `git commit -m 'fix rm of the local D1 sqlite file'` → blocked by the
  anti-pattern-#12 rule, because the message contains `rm` and `sqlite`.
- Any Bash command that quotes `CONFIRM_REMOTE=yes`, `payload migrate`, `npm`,
  etc. as literal text can trip the corresponding rule.

## What Didn't Work

- Loosening the rules defeats their purpose.
- Trying to make the regexes parse shell quoting is brittle — the guard would
  need a full shell tokenizer to know an argument is quoted text, not a command.

## Solution

Two complementary fixes:

1. **Tighten patterns to real invocations.** The D1 rule now requires a
   `.sqlite` file *extension* (`\.sqlite`), so prose that says "sqlite" no
   longer matches while `rm dev.sqlite` still does.
2. **Keep trigger text out of the command line.** Put commit messages in a file
   and use `git commit -F <file>` (write the file with the editor/Write tool,
   not `echo`). The Bash command line then carries only a path, so the guard
   sees no trigger words.

## Why This Works

The guard's unit of analysis is the command string. Anything that keeps
forbidden *words* out of that string — a file-based message, a tighter pattern
that only matches an actual file argument — sidesteps the false positive without
weakening enforcement of real invocations.

## Prevention

- When a commit/PR touches the guard itself or describes a forbidden command,
  author the message in a file and commit with `-F`.
- When adding a new guard rule, prefer patterns anchored to a command word or a
  file extension over a bare keyword that could appear in prose.

## Related Issues

- Anti-patterns #10–#13 in CLAUDE.md are the rules this guard enforces.
