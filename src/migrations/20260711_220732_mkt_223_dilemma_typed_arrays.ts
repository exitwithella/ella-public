import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

/**
 * MKT-223: Convert the Dilemma Section block's `table_data` and `steps` JSON
 * columns into typed Payload array fields (their own child tables).
 *
 * The `up()` flow is strictly ordered so no data is lost:
 *   1. Create the two new array tables + indexes.
 *   2. Read the existing JSON out of `pages_blocks_dilemma_section`, parse it,
 *      and INSERT one row per array item into the new tables (defensive:
 *      per-row try/catch, skips null/invalid values).
 *   3. Only then DROP the old JSON columns.
 *
 * The `down()` flow reverses this: re-add the JSON columns, re-serialize the
 * array rows back into JSON, then drop the array tables.
 *
 * Note: the `pages` collection has drafts/versions disabled, so there is no
 * `_pages_v_blocks_dilemma_section` table to migrate.
 */

const newId = (): string => globalThis.crypto.randomUUID()

const toText = (value: unknown): string => (value == null ? '' : String(value))

/**
 * The D1 driver returns rows on `.results`; the libSQL driver uses `.rows`.
 * Read whichever is present so the migration is portable across adapters.
 */
const rowsOf = (result: unknown): Array<Record<string, unknown>> => {
  const r = result as { rows?: unknown[]; results?: unknown[] }
  return (r.rows ?? r.results ?? []) as Array<Record<string, unknown>>
}

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // 1. Create the new array tables (conventions match the adapter's generated
  //    schema for nested block arrays: text `_parent_id`, text PK `id`).
  await db.run(sql`CREATE TABLE \`pages_blocks_dilemma_section_table_data\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`dim\` text NOT NULL,
  	\`old\` text NOT NULL,
  	\`rigid\` text NOT NULL,
  	\`patch\` text NOT NULL,
  	\`ella\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_dilemma_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_dilemma_section_table_data_order_idx\` ON \`pages_blocks_dilemma_section_table_data\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_dilemma_section_table_data_parent_id_idx\` ON \`pages_blocks_dilemma_section_table_data\` (\`_parent_id\`);`,
  )

  await db.run(sql`CREATE TABLE \`pages_blocks_dilemma_section_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`sub\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_dilemma_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX \`pages_blocks_dilemma_section_steps_order_idx\` ON \`pages_blocks_dilemma_section_steps\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX \`pages_blocks_dilemma_section_steps_parent_id_idx\` ON \`pages_blocks_dilemma_section_steps\` (\`_parent_id\`);`,
  )

  // 2. Migrate existing JSON data into the new tables BEFORE dropping columns.
  const rows = rowsOf(
    await db.run(sql`SELECT \`id\`, \`table_data\`, \`steps\` FROM \`pages_blocks_dilemma_section\`;`),
  )

  for (const row of rows) {
    const parentId = row.id
    if (parentId == null) {
      continue
    }

    // Comparison table rows.
    if (typeof row.table_data === 'string' && row.table_data.length > 0) {
      try {
        const parsed = JSON.parse(row.table_data)
        if (Array.isArray(parsed)) {
          let order = 0
          for (const item of parsed) {
            if (item == null || typeof item !== 'object') {
              continue
            }
            order += 1
            await db.run(sql`INSERT INTO \`pages_blocks_dilemma_section_table_data\`
              (\`_order\`, \`_parent_id\`, \`id\`, \`dim\`, \`old\`, \`rigid\`, \`patch\`, \`ella\`)
              VALUES (${order}, ${parentId}, ${newId()}, ${toText(
                (item as Record<string, unknown>).dim,
              )}, ${toText((item as Record<string, unknown>).old)}, ${toText(
                (item as Record<string, unknown>).rigid,
              )}, ${toText((item as Record<string, unknown>).patch)}, ${toText(
                (item as Record<string, unknown>).ella,
              )});`)
          }
        }
      } catch {
        // Skip unparseable JSON — defaults will apply at render time.
      }
    }

    // Rigid platform steps.
    if (typeof row.steps === 'string' && row.steps.length > 0) {
      try {
        const parsed = JSON.parse(row.steps)
        if (Array.isArray(parsed)) {
          let order = 0
          for (const item of parsed) {
            if (item == null || typeof item !== 'object') {
              continue
            }
            order += 1
            await db.run(sql`INSERT INTO \`pages_blocks_dilemma_section_steps\`
              (\`_order\`, \`_parent_id\`, \`id\`, \`label\`, \`sub\`)
              VALUES (${order}, ${parentId}, ${newId()}, ${toText(
                (item as Record<string, unknown>).label,
              )}, ${toText((item as Record<string, unknown>).sub)});`)
          }
        }
      } catch {
        // Skip unparseable JSON — defaults will apply at render time.
      }
    }
  }

  // 3. Drop the old JSON columns now that data has been copied.
  await db.run(sql`ALTER TABLE \`pages_blocks_dilemma_section\` DROP COLUMN \`table_data\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_dilemma_section\` DROP COLUMN \`steps\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // 1. Re-add the JSON columns.
  await db.run(sql`ALTER TABLE \`pages_blocks_dilemma_section\` ADD \`table_data\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_dilemma_section\` ADD \`steps\` text;`)

  // 2. Re-serialize the array rows back into JSON on the parent block.
  const parents = rowsOf(await db.run(sql`SELECT \`id\` FROM \`pages_blocks_dilemma_section\`;`))

  for (const parent of parents) {
    const parentId = parent.id
    if (parentId == null) {
      continue
    }

    const tableRows = rowsOf(
      await db.run(
        sql`SELECT \`dim\`, \`old\`, \`rigid\`, \`patch\`, \`ella\` FROM \`pages_blocks_dilemma_section_table_data\` WHERE \`_parent_id\` = ${parentId} ORDER BY \`_order\` ASC;`,
      ),
    )
    if (tableRows.length > 0) {
      const tableData = JSON.stringify(
        tableRows.map((r) => ({
          dim: toText(r.dim),
          old: toText(r.old),
          rigid: toText(r.rigid),
          patch: toText(r.patch),
          ella: toText(r.ella),
        })),
      )
      await db.run(
        sql`UPDATE \`pages_blocks_dilemma_section\` SET \`table_data\` = ${tableData} WHERE \`id\` = ${parentId};`,
      )
    }

    const stepRows = rowsOf(
      await db.run(
        sql`SELECT \`label\`, \`sub\` FROM \`pages_blocks_dilemma_section_steps\` WHERE \`_parent_id\` = ${parentId} ORDER BY \`_order\` ASC;`,
      ),
    )
    if (stepRows.length > 0) {
      const steps = JSON.stringify(
        stepRows.map((r) => ({
          label: toText(r.label),
          sub: toText(r.sub),
        })),
      )
      await db.run(
        sql`UPDATE \`pages_blocks_dilemma_section\` SET \`steps\` = ${steps} WHERE \`id\` = ${parentId};`,
      )
    }
  }

  // 3. Drop the array tables.
  await db.run(sql`DROP TABLE \`pages_blocks_dilemma_section_table_data\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_dilemma_section_steps\`;`)
}
