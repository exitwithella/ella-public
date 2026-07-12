import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

/**
 * MKT-223: Convert the Dilemma Section block's `table_data` and `steps` JSON
 * columns into typed Payload array fields (their own child tables).
 *
 * The generated schema statements are kept as-is; the data-copy step in the
 * middle is hand-written so existing JSON content survives: create the new
 * array tables, copy parsed JSON rows into them, and only then drop the old
 * columns. `down()` re-serializes the rows back to JSON before dropping the
 * array tables.
 */

const newId = (): string => globalThis.crypto.randomUUID()

const toText = (value: unknown): string => (value == null ? '' : String(value))

/** The D1 driver returns rows on `.results`; the libSQL driver uses `.rows`. */
const rowsOf = (result: unknown): Array<Record<string, unknown>> => {
  const r = result as { rows?: unknown[]; results?: unknown[] }
  return (r.rows ?? r.results ?? []) as Array<Record<string, unknown>>
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
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

  // Copy existing JSON content into the new array tables BEFORE dropping the
  // columns. Defensive per-row parsing: invalid JSON is skipped and the
  // frontend falls back to its built-in defaults.
  const rows = rowsOf(
    await db.run(sql`SELECT \`id\`, \`table_data\`, \`steps\` FROM \`pages_blocks_dilemma_section\`;`),
  )

  for (const row of rows) {
    const parentId = row.id
    if (parentId == null) {
      continue
    }

    if (typeof row.table_data === 'string' && row.table_data.length > 0) {
      try {
        const parsed = JSON.parse(row.table_data)
        if (Array.isArray(parsed)) {
          let order = 0
          for (const item of parsed) {
            if (item == null || typeof item !== 'object') {
              continue
            }
            const record = item as Record<string, unknown>
            order += 1
            await db.run(sql`INSERT INTO \`pages_blocks_dilemma_section_table_data\`
              (\`_order\`, \`_parent_id\`, \`id\`, \`dim\`, \`old\`, \`rigid\`, \`patch\`, \`ella\`)
              VALUES (${order}, ${parentId}, ${newId()}, ${toText(record.dim)}, ${toText(
                record.old,
              )}, ${toText(record.rigid)}, ${toText(record.patch)}, ${toText(record.ella)});`)
          }
        }
      } catch {
        // Skip unparseable JSON — defaults apply at render time.
      }
    }

    if (typeof row.steps === 'string' && row.steps.length > 0) {
      try {
        const parsed = JSON.parse(row.steps)
        if (Array.isArray(parsed)) {
          let order = 0
          for (const item of parsed) {
            if (item == null || typeof item !== 'object') {
              continue
            }
            const record = item as Record<string, unknown>
            order += 1
            await db.run(sql`INSERT INTO \`pages_blocks_dilemma_section_steps\`
              (\`_order\`, \`_parent_id\`, \`id\`, \`label\`, \`sub\`)
              VALUES (${order}, ${parentId}, ${newId()}, ${toText(record.label)}, ${toText(
                record.sub,
              )});`)
          }
        }
      } catch {
        // Skip unparseable JSON — defaults apply at render time.
      }
    }
  }

  await db.run(sql`ALTER TABLE \`pages_blocks_dilemma_section\` DROP COLUMN \`table_data\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_dilemma_section\` DROP COLUMN \`steps\`;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_dilemma_section\` ADD \`table_data\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_dilemma_section\` ADD \`steps\` text;`)

  // Re-serialize array rows back to JSON on the parent block.
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

  await db.run(sql`DROP TABLE \`pages_blocks_dilemma_section_table_data\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_dilemma_section_steps\`;`)
}
