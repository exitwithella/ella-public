#!/bin/bash
# Workers Builds runs this for every branch. Migrations are applied to
# production only from main (see deploy-database-if-main.sh). A branch whose
# migrations are not on prod yet cannot SSG against prod D1: Payload queries
# tables that do not exist there (the v4 failure is `no such table:
# team_members_rels`). Compile that branch against local D1 so the build can
# finish. The uploaded preview still uses the production binding at runtime.
set -euo pipefail

cd "$(dirname "$0")/.."

pnpm run check-migrations
bash scripts/deploy-database-if-main.sh

use_remote=true
branch="${WORKERS_CI_BRANCH:-}"

if [ -n "$branch" ] && [ "$branch" != "main" ]; then
  set +e
  # NEXT_PHASE selects the wrangler proxy in payload.config.ts. Workers Builds
  # sets NODE_ENV=production, and without this the config would look for a
  # Workers runtime context that does not exist during the build.
  NEXT_PHASE=phase-production-build \
    REMOTE_BINDINGS=true \
    NODE_OPTIONS=--no-deprecation \
    pnpm exec tsx scripts/pending-remote-migrations.ts
  status=$?
  set -e

  if [ "$status" -eq 2 ]; then
    echo "Prod D1 is behind this branch. Building against local D1 so Workers Builds can finish."
    echo "SSG output will not include production content. Runtime preview requests still use prod D1."
    use_remote=false
  elif [ "$status" -ne 0 ]; then
    echo "Could not read prod migration status (exit $status)."
    exit "$status"
  fi
fi

if [ "$use_remote" = true ]; then
  cross-env REMOTE_BINDINGS=true opennextjs-cloudflare build --env="${CLOUDFLARE_ENV:-}"
else
  opennextjs-cloudflare build --env="${CLOUDFLARE_ENV:-}"
fi
