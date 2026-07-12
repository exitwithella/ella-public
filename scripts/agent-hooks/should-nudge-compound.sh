#!/bin/bash
# Shared heuristic for the compound-capture Stop/stop hooks.
#
# Exit 0 ("nudge warranted") when the current branch, measured against its
# merge-base with origin/main, contains a fix:/perf:/refactor: conventional
# commit but has NOT added a solution doc under docs/solutions/. Those commit
# types encode a solved problem worth capturing; feat/content/style/docs/chore
# never trigger a nudge. Exit 1 otherwise (nothing to nudge about).
#
# Loop protection and output formatting live in the per-agent adapters.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$REPO_ROOT" || exit 1

BASE=$(git merge-base HEAD origin/main 2>/dev/null)
[ -z "$BASE" ] && BASE=$(git merge-base HEAD main 2>/dev/null)
[ -z "$BASE" ] && exit 1

# A fix/perf/refactor conventional commit on the branch?
if ! git log --format='%s' "$BASE..HEAD" 2>/dev/null \
  | grep -qE '^(fix|perf|refactor)(\([^)]*\))?!?:'; then
  exit 1
fi

# A real solution doc added on the branch — committed, staged, or untracked —
# excluding the README and generated INDEX. If present, the lesson is captured.
{
  git diff --name-only --diff-filter=A "$BASE..HEAD" -- 'docs/solutions/*.md' 2>/dev/null
  git diff --cached --name-only --diff-filter=A -- 'docs/solutions/*.md' 2>/dev/null
  git ls-files --others --exclude-standard -- 'docs/solutions/*.md' 2>/dev/null
} | grep -vE '/(README|INDEX)\.md$' | grep -q . && exit 1

exit 0
