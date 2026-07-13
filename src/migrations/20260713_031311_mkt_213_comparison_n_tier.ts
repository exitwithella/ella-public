import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

/**
 * MKT-213: Migrate the pricing-page comparison table from two hardcoded
 * `practitioner`/`enterprise` groups per row to a per-tier `values` array
 * linked (by relationship) to the pricing-tiers collection.
 *
 * The generated schema statements are kept, but the data-copy step is
 * hand-written so existing comparison content survives: create the new
 * `values` table, copy the two group columns into it (resolving the tier
 * ids by NAME so prod ids don't need to match seed), and only then drop the
 * old columns. `down()` reverses it — re-add the columns, copy `values`
 * rows back by tier name, then drop the array table.
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

  await db.run(sql`ALTER TABLE \`pricing_page_categories_rows\` DROP COLUMN \`practitioner_indicator\`;`)
  await db.run(
    sql`ALTER TABLE \`pricing_page_categories_rows\` DROP COLUMN \`practitioner_display_text\`;`,
  )
  await db.run(sql`ALTER TABLE \`pricing_page_categories_rows\` DROP COLUMN \`enterprise_indicator\`;`)
  await db.run(
    sql`ALTER TABLE \`pricing_page_categories_rows\` DROP COLUMN \`enterprise_display_text\`;`,
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(
    sql`ALTER TABLE \`pricing_page_categories_rows\` ADD \`practitioner_indicator\` text DEFAULT 'check' NOT NULL;`,
  )
  await db.run(sql`ALTER TABLE \`pricing_page_categories_rows\` ADD \`practitioner_display_text\` text;`)
  await db.run(
    sql`ALTER TABLE \`pricing_page_categories_rows\` ADD \`enterprise_indicator\` text DEFAULT 'check' NOT NULL;`,
  )
  await db.run(sql`ALTER TABLE \`pricing_page_categories_rows\` ADD \`enterprise_display_text\` text;`)

  // Copy `values` rows back into the group columns by tier name.
  const tiers = rowsOf(await db.run(sql`SELECT \`id\`, \`name\` FROM \`pricing_tiers\`;`))
  const nameById = new Map(tiers.map((t) => [String(t.id), String(t.name)]))

  const values = rowsOf(
    await db.run(
      sql`SELECT \`_parent_id\`, \`tier_id\`, \`indicator\`, \`display_text\` FROM \`pricing_page_categories_rows_values\`;`,
    ),
  )

  for (const v of values) {
    const parentId = v._parent_id
    if (parentId == null) continue
    const name = nameById.get(String(v.tier_id))
    const indicator = toIndicator(v.indicator)
    const text = v.display_text == null ? null : String(v.display_text)

    if (name === 'Practitioner') {
      await db.run(
        sql`UPDATE \`pricing_page_categories_rows\` SET \`practitioner_indicator\` = ${indicator}, \`practitioner_display_text\` = ${text} WHERE \`id\` = ${parentId};`,
      )
    } else if (name === 'Enterprise') {
      await db.run(
        sql`UPDATE \`pricing_page_categories_rows\` SET \`enterprise_indicator\` = ${indicator}, \`enterprise_display_text\` = ${text} WHERE \`id\` = ${parentId};`,
      )
    }
  }

  await db.run(sql`DROP TABLE \`pricing_page_categories_rows_values\`;`)
}
