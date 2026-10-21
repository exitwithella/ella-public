export type MigrationRunStatus = {
  name: string
  ran: boolean
}

/** Names of migration files that are not recorded as applied. */
export function pendingMigrationNames(statuses: readonly MigrationRunStatus[]): string[] {
  return statuses.filter((status) => !status.ran).map((status) => status.name)
}
