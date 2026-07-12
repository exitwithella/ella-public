#!/bin/bash
# Workers Builds runs `cf:build` for EVERY branch it builds — but applying
# migrations to the production D1 from a branch preview would change the live
# schema while prod still runs old code. Only migrate when building main
# (or when run outside Workers Builds, i.e. a manual `pnpm run deploy`).
set -e

branch="${WORKERS_CI_BRANCH:-}"

if [ -n "$branch" ] && [ "$branch" != "main" ]; then
  echo "Skipping deploy:database — branch build ($branch), migrations only run on main."
  exit 0
fi

exec pnpm run deploy:database
