import { describe, expect, it } from 'vitest'

import { pendingMigrationNames } from '../../scripts/pending-migrations'

describe('pendingMigrationNames', () => {
  it('returns only migrations that have not been recorded', () => {
    expect(
      pendingMigrationNames([
        { name: '20260101_existing', ran: true },
        { name: '20261021_040825_payload_v4', ran: false },
      ]),
    ).toEqual(['20261021_040825_payload_v4'])
  })

  it('returns an empty list when every migration has run', () => {
    expect(pendingMigrationNames([{ name: '20260101_existing', ran: true }])).toEqual([])
  })
})
