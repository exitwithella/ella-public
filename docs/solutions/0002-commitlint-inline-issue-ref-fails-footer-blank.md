---
title: An inline MKT- issue reference in the commit body fails commitlint's footer-leading-blank rule
date: 2026-07-12
category: tooling
module: git-hooks
problem_type: tooling_decision
component: tooling
symptoms:
  - "commit-msg hook fails with: footer must have leading blank line [footer-leading-blank]"
  - 'the commit body reads fine and has a blank line before the Co-Authored-By footer, yet commitlint still rejects it'
applies_when:
  - 'writing a conventional-commit message whose body mentions an issue id like MKT-123 in prose'
  - 'the message also has a real footer (Co-Authored-By, BREAKING CHANGE, etc.)'
resolution_type: workaround
severity: low
tags: [commitlint, husky, conventional-commits, git, mkt, compound-engineering]
---

# An inline MKT- issue reference in the commit body fails commitlint's footer-leading-blank rule

## Problem

`commitlint.config.js` sets `parserPreset.parserOpts.issuePrefixes: ['MKT-']`.
That makes the parser treat any `MKT-<n>` token as an issue **reference**, which
it classifies as a footer. When such a token appears inside a body paragraph
(not the last block), the parser sees a footer that isn't preceded by a blank
line and fails `footer-leading-blank` — even though the human-authored footer
(`Co-Authored-By:`) is correctly spaced.

## Symptoms

- `git commit` aborts at the commit-msg hook:
  `✖ footer must have leading blank line [footer-leading-blank]`.
- The body clearly has a blank line before `Co-Authored-By:`, so the error looks
  wrong until you notice an inline `MKT-175` in an earlier paragraph.

## What Didn't Work

- Rewording to remove ordinary `word:` colons (e.g. "Verified:") — those are not
  the trigger. The trigger is specifically the `MKT-` issue token.
- Adding/adjusting blank lines around the real footer — the false footer is the
  inline reference, not the `Co-Authored-By` line.

## Solution

Keep `MKT-` issue references in the **subject line only** (e.g.
`fix(cms): … (MKT-175)`); write the body without inline `MKT-<n>` tokens. Refer
to prior work by description ("the draft-leak fix") rather than by id. Validate a
draft message before committing:

```bash
npx commitlint --edit /tmp/msg.txt
```

## Why This Works

The subject is parsed as the header, not scanned for footer references, so an
issue id there is safe. Removing inline ids from the body leaves `Co-Authored-By:`
as the only footer, which is correctly blank-line separated, so the rule passes.

## Prevention

- One issue id per message, in the subject. If a body genuinely must cite
  another issue, put it in the footer block (after the blank line) as a proper
  reference, not mid-paragraph.
- Prefer `git commit -F <file>` + `npx commitlint --edit <file>` to catch this
  before the hook does.

## Related Issues

- `commitlint.config.js` — the `issuePrefixes: ['MKT-']` parser option is the root.
