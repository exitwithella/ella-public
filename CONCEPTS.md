# Concepts

Shared domain vocabulary for this project — entities, named processes, and status concepts with project-specific meaning. Seeded with core domain vocabulary, then accretes as ce-compound and ce-compound-refresh process learnings; direct edits are fine. Glossary only, not a spec or catch-all.

## Deploy

### Remote bindings
The opt-in that points a process at the production database and media store. Left unset, the same process uses the local development database. A build that turns the switch on reads live content and must not also push schema.

A local migration-status check is not a production check. The local database records schema pushes under a development batch, so every committed migration looks unapplied there even when production has already run them.

### Branch preview
A preview of a non-production branch. It is a version of the production worker and uses the production database, so schema that exists only on the branch is unavailable until that migration runs from the production branch. Compiling the branch against the local database lets the build finish; it does not change what the preview reads at runtime.

### Staging
A separately deployed worker with its own database, used to apply and exercise a migration before it reaches production. It is started by hand. Branch previews are not a substitute for it.
