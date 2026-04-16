import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_microcopy\` text;`)
  await db.run(sql`ALTER TABLE \`landing_pages\` ADD \`hero_microcopy\` text;`)
  await db.run(sql`ALTER TABLE \`solutions\` ADD \`hero_microcopy\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_microcopy\`;`)
  await db.run(sql`ALTER TABLE \`landing_pages\` DROP COLUMN \`hero_microcopy\`;`)
  await db.run(sql`ALTER TABLE \`solutions\` DROP COLUMN \`hero_microcopy\`;`)
}
