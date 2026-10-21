/**
 * Exit 0 when every committed migration is recorded on the database this
 * process is bound to. Exit 2 when any are pending. Callers set
 * REMOTE_BINDINGS and NEXT_PHASE so this reads production D1 through wrangler.
 */
import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../src/payload.config'
import { pendingMigrationNames } from './pending-migrations'

const payload = await getPayload({ config })
const statuses = await payload.db.migrateStatus()

if (!statuses) {
  console.error('migrateStatus returned no result')
  process.exit(1)
}

const pending = pendingMigrationNames(statuses)
if (pending.length > 0) {
  console.error(`Pending migrations:\n${pending.join('\n')}`)
  process.exit(2)
}

process.exit(0)
