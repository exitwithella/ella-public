import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

/**
 * MKT-213: Migrate the pricing-page comparison table from two hardcoded
 * `practitioner`/`enterprise` groups per row to a per-tier `values` array
 * linked (by relationship) to the pricing-tiers collection.
 *
 * EXPAND step only — deliberately rollback-safe. `up()` creates the new
 * `values` table and backfills it from the existing `practitioner`/
 * `enterprise` group columns (resolving tier ids by NAME so prod ids need
 * not match seed), but it does NOT drop those old columns. Leaving them in
 * place means the previous Worker version (whose Payload config still reads
 * the group columns) keeps working after this deploys, so a Worker rollback
 * does not strand old code against a schema it can't read. `down()` simply
 * drops the `values` table; the group columns were never touched.
 *
 * The matching CONTRACT step — dropping the now-orphaned
 * `practitioner_*`/`enterprise_*` columns once this release is confirmed
 * stable — is a deliberate follow-up migration, not part of this one. Until
 * then the columns linger unused (Payload ignores DB columns absent from the
 * config); new comparison rows get their NOT NULL defaults.
 */

const newId = (): string => globalThis.crypto.randomUUID()

/** The D1 driver returns rows on `.results`; the libSQL driver uses `.rows`. */
const rowsOf = (result: unknown): Array<Record<string, unknown>> => {
  const r = result as { rows?: unknown[]; results?: unknown[] }
  return (r.rows ?? r.results ?? []) as Array<Record<string, unknown>>
}

const toIndicator = (value: unknown): string => {
  const v = value == null ? '' : String(value)
  return v === 'check' || v === 'cross' || v === 'text' ? v : 'check'
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pricing_page_categories_rows_values\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tier_id\` integer NOT NULL,
  	\`indicator\` text DEFAULT 'check' NOT NULL,
  	\`display_text\` text,
  	FOREIGN KEY (\`tier_id\`) REFERENCES \`pricing_tiers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pricing_page_categories_rows\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pricing_page_categories_rows_values_order_idx\` ON \`pricing_page_categories_rows_values\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pricing_page_categories_rows_values_parent_id_idx\` ON \`pricing_page_categories_rows_values\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pricing_page_categories_rows_values_tier_idx\` ON \`pricing_page_categories_rows_values\` (\`tier_id\`);`,
  )

  // Resolve tier ids by name (prod ids need not match seed). If a tier is
  // missing, that column is skipped and the cell renders as excluded.
  const tiers = rowsOf(await db.run(sql`SELECT \`id\`, \`name\` FROM \`pricing_tiers\`;`))
  const tierIdByName = new Map(tiers.map((t) => [String(t.name), t.id]))
  const practitionerId = tierIdByName.get('Practitioner') ?? null
  const enterpriseId = tierIdByName.get('Enterprise') ?? null

  // Copy the two group columns into the new array table BEFORE dropping them.
  const rows = rowsOf(
    await db.run(sql`SELECT \`id\`, \`practitioner_indicator\`, \`practitioner_display_text\`,
      \`enterprise_indicator\`, \`enterprise_display_text\` FROM \`pricing_page_categories_rows\`;`),
  )

  for (const row of rows) {
    const parentId = row.id
    if (parentId == null) continue

    const columns = [
      {
        tierId: practitionerId,
        indicator: row.practitioner_indicator,
        text: row.practitioner_display_text,
      },
      {
        tierId: enterpriseId,
        indicator: row.enterprise_indicator,
        text: row.enterprise_display_text,
      },
    ]

    let order = 0
    for (const col of columns) {
      if (col.tierId == null) continue
      order += 1
      await db.run(sql`INSERT INTO \`pricing_page_categories_rows_values\`
        (\`_order\`, \`_parent_id\`, \`id\`, \`tier_id\`, \`indicator\`, \`display_text\`)
        VALUES (${order}, ${parentId}, ${newId()}, ${col.tierId}, ${toIndicator(col.indicator)}, ${
          col.text == null ? null : String(col.text)
        });`)
    }
  }

  // NOTE: the old practitioner_*/enterprise_* columns are intentionally left in
  // place (expand step). Dropping them is a later CONTRACT migration.
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // up() only added the values table (the group columns were never dropped),
  // so reverting is just dropping that table.
  await db.run(sql`DROP TABLE \`pricing_page_categories_rows_values\`;`)
}
