---
name: conventional-commit
description: Create conventional commits following the project's commitlint configuration. Use when committing changes, running /commit, or when the user asks for help with commit messages. Ensures commits follow the type(scope): subject format with proper MKT- issue references.
---

# Conventional Commit Skill

Create commits that pass commitlint validation and match the project's commit style.

## First: Read the Configuration

**Always read `commitlint.config.js` before creating a commit** to understand:

- Allowed commit types (`type-enum` rule)
- Scope requirements
- Issue prefixes (`parserPreset.parserOpts.issuePrefixes`) — currently `MKT-`
- Any custom rules or overrides

The configuration is the source of truth. Rules may change over time.

## Commit Format

```
type(scope): subject

[optional body]

[optional footer]
```

## Allowed Types

| Type       | When to Use                                                   |
| ---------- | ------------------------------------------------------------- |
| `feat`     | New feature or capability                                     |
| `fix`      | Bug fix                                                       |
| `style`    | Formatting, visual changes with no logic change               |
| `refactor` | Code restructure with no behavior change                      |
| `perf`     | Performance improvement                                       |
| `content`  | Copy, text, or content-only changes (marketing site specific) |
| `chore`    | Tooling, config, dependency updates                           |
| `ci`       | CI/CD changes                                                 |
| `build`    | Build system changes                                          |
| `docs`     | Documentation only                                            |
| `test`     | Test-only changes                                             |
| `revert`   | Reverts a previous commit                                     |

## Scope Inference

Infer scope from changed files:

| Directory/Pattern                                                           | Suggested Scope                      |
| --------------------------------------------------------------------------- | ------------------------------------ |
| `src/app/(frontend)/page.tsx`, `src/app/(frontend)/_components/hero*`       | `homepage`                           |
| `src/app/(frontend)/platform/**`                                            | `platform`                           |
| `src/app/(frontend)/solutions/exit-planning/**`                             | `exit-planning`                      |
| `src/app/(frontend)/pricing/**`                                             | `pricing`                            |
| `src/app/(frontend)/about/**`                                               | `about`                              |
| `src/app/(frontend)/blog/**`                                                | `blog`                               |
| `src/app/(frontend)/resources/**`                                           | `resources`                          |
| `src/app/(frontend)/_components/navbar*`, `src/components/sections/navbar*` | `nav`                                |
| `src/app/(frontend)/_components/footer*`, `src/components/sections/footer*` | `footer`                             |
| `src/collections/**`, `src/blocks/**`, `src/payload.config.ts`              | `cms`                                |
| `.github/**`, `vitest*`, `playwright*`                                      | `ci`                                 |
| `package.json`, `pnpm-lock.yaml`, `*.config.*`, `.claude/**`, `.husky/**`   | `config`                             |
| `src/components/**` (shared)                                                | omit scope or use most relevant area |
| `_planning/**`                                                              | `docs`                               |

If changes span multiple unrelated areas, omit scope.

## Issue References

Check for issue ID in this order:

1. **Branch name**: Parse `MKT-` prefixed IDs from current branch name
2. **Linear context**: If Linear MCP is available, check for associated issue
3. **Skip**: For tooling/config commits without a specific issue

Issue reference goes in commit footer:

```
MKT-42
```

## No Header Length Limit

This project has removed the default 72-character header limit. Descriptive subject lines are preferred over truncated ones. Still aim for clarity and conciseness.

## Examples

### Content change

```
content(homepage): update hero headline to clarity-first copy

Switch from "systematize" to "organize and protect" based on advisor
research — advisors respond better to outcome language than process language.
```

### Feature commit

```
feat(homepage): add 3-pillar card grid with anchor links

Implement the WithCoverage-inspired pillar card architecture. Each card
anchors to its deep-dive section below. Mobile collapses to single column.
```

### CMS schema change

```
chore(cms): add testimonial collection with author and role fields

Separate commit per CLAUDE.md conventions — schema changes get their own
commit so they can be reviewed in isolation from frontend consumers.
```

### Config change

```
chore(config): replace ESLint + Prettier with OXC (oxlint + oxfmt)
```

## Commit Workflow

1. Read `commitlint.config.js` to get current rules and types
2. Run `git status` and `git diff` to understand changes
3. Determine type based on nature of changes (must be in `type-enum`)
4. Infer scope from files modified (or omit if broad)
5. Write subject: imperative mood, focus on "what changed"
6. Add body explaining "why" if the change isn't self-evident
7. Check branch name for MKT- issue reference
8. Create commit using HEREDOC format for proper formatting

## Quality Checklist

Before committing, verify:

- [ ] Type is in the `type-enum` list from commitlint config
- [ ] Subject uses imperative mood ("add" not "added")
- [ ] Scope matches affected area (if used, must be lowercase)
- [ ] Body explains "why" not just "what" (if included)
- [ ] Body has leading blank line
- [ ] No pure whites (`#fff`) or other design anti-patterns introduced
- [ ] No secrets or sensitive files staged
- [ ] No `.env` files staged
