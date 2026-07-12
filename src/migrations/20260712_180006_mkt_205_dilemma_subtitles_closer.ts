import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_dilemma_section\` ADD \`column_subtitles_old\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_dilemma_section\` ADD \`column_subtitles_rigid\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_dilemma_section\` ADD \`column_subtitles_patch\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_dilemma_section\` ADD \`column_subtitles_ella\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_dilemma_section\` ADD \`closer\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages_blocks_dilemma_section\` DROP COLUMN \`column_subtitles_old\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_dilemma_section\` DROP COLUMN \`column_subtitles_rigid\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_dilemma_section\` DROP COLUMN \`column_subtitles_patch\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_dilemma_section\` DROP COLUMN \`column_subtitles_ella\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_dilemma_section\` DROP COLUMN \`closer\`;`)
}
