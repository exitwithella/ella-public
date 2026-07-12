# Solutions — the compound-engineering ledger

This directory is the project's durable memory of **solved problems**. Each file
captures one bug, gotcha, or hard-won decision so the next session (human or
agent) can search here instead of re-debugging from scratch. This is the
"compound" step of the plan → work → review → **compound** loop: every solved
problem should make the next one cheaper.

## When to add an entry

Run `/ce-compound` (it writes the file for you) after you:

- fixed a **non-obvious bug** — the cause wasn't where the symptom was, or the
  first two fixes didn't work;
- hit a **gotcha** in the toolchain, CMS, runtime, or deploy path that cost real
  time and will recur;
- made a **tradeoff or decision** worth remembering (why we chose X over Y).

Do **not** add an entry for routine feature work, copy changes, or anything the
code, CLAUDE.md, or git history already explains. New marketing sections don't
warrant a solution doc; fixed defects and durable learnings do. The Stop hook
nudges you when a branch has a `fix:`/`perf:`/`refactor:` commit but no new
solution doc — that nudge is the reminder, not a mandate to invent one.

## File format

- **Filename:** `NNNN-kebab-title.md`, zero-padded 4-digit sequence
  (`0001-…`, `0002-…`). `0000-…` is the seed example.
- **Frontmatter:** YAML, following the canonical contract in
  `.agents/skills/ce-compound/references/schema.yaml`. `/ce-compound` and its
  validators (`scripts/validate-frontmatter.py`) own that schema — don't
  hand-maintain a second copy here.

The fields the **index generator** reads are `title`, `date`, `tags`, and the
first `symptoms` entry. Keep those accurate; the rest is for humans reading the
full doc.

## INDEX.md and the Cursor rule are generated — never hand-edit

`INDEX.md` (one line per solution) and `.cursor/rules/compound-lessons.mdc` are
rebuilt from frontmatter by `scripts/agent-hooks/gen-lessons-index.sh`, which
runs automatically whenever a file under `docs/solutions/` is edited. To rebuild
by hand:

```bash
bash scripts/agent-hooks/gen-lessons-index.sh
```

Only the small index is injected into agent context (Claude via a SessionStart
hook, Cursor via the always-applied rule) — the substance stays in these files,
so CLAUDE.md and AGENTS.md stop growing.
