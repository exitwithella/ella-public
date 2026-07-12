import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

/**
 * MKT-205: The Dilemma Section block gained a `columnSubtitles` group and a
 * `closer` text field (exposing the last hardcoded strings to the CMS). Local
 * dev picked the columns up via pushDevSchema; this migration adds them for
 * production D1. Columns are nullable — the frontend falls back to built-in
 * defaults when unset.
 */

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(
    sql`ALTER TABLE \`pages_blocks_dilemma_section\` ADD \`column_subtitles_old\` text;`,
  )
  await db.run(
    sql`ALTER TABLE \`pages_blocks_dilemma_section\` ADD \`column_subtitles_rigid\` text;`,
  )
  await db.run(
    sql`ALTER TABLE \`pages_blocks_dilemma_section\` ADD \`column_subtitles_patch\` text;`,
  )
  await db.run(
    sql`ALTER TABLE \`pages_blocks_dilemma_section\` ADD \`column_subtitles_ella\` text;`,
  )
  await db.run(sql`ALTER TABLE \`pages_blocks_dilemma_section\` ADD \`closer\` text;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(
    sql`ALTER TABLE \`pages_blocks_dilemma_section\` DROP COLUMN \`column_subtitles_old\`;`,
  )
  await db.run(
    sql`ALTER TABLE \`pages_blocks_dilemma_section\` DROP COLUMN \`column_subtitles_rigid\`;`,
  )
  await db.run(
    sql`ALTER TABLE \`pages_blocks_dilemma_section\` DROP COLUMN \`column_subtitles_patch\`;`,
  )
  await db.run(
    sql`ALTER TABLE \`pages_blocks_dilemma_section\` DROP COLUMN \`column_subtitles_ella\`;`,
  )
  await db.run(sql`ALTER TABLE \`pages_blocks_dilemma_section\` DROP COLUMN \`closer\`;`)
}
