import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_headline_animation\` text DEFAULT 'word-by-word';`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_headline_line2\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_headline_animation2\` text DEFAULT 'blur-fade';`)
  await db.run(sql`ALTER TABLE \`landing_pages\` ADD \`hero_headline_animation\` text DEFAULT 'word-by-word';`)
  await db.run(sql`ALTER TABLE \`landing_pages\` ADD \`hero_headline_line2\` text;`)
  await db.run(sql`ALTER TABLE \`landing_pages\` ADD \`hero_headline_animation2\` text DEFAULT 'blur-fade';`)
  await db.run(sql`ALTER TABLE \`solutions\` ADD \`hero_headline_animation\` text DEFAULT 'word-by-word';`)
  await db.run(sql`ALTER TABLE \`solutions\` ADD \`hero_headline_line2\` text;`)
  await db.run(sql`ALTER TABLE \`solutions\` ADD \`hero_headline_animation2\` text DEFAULT 'blur-fade';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_headline_animation\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_headline_line2\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_headline_animation2\`;`)
  await db.run(sql`ALTER TABLE \`landing_pages\` DROP COLUMN \`hero_headline_animation\`;`)
  await db.run(sql`ALTER TABLE \`landing_pages\` DROP COLUMN \`hero_headline_line2\`;`)
  await db.run(sql`ALTER TABLE \`landing_pages\` DROP COLUMN \`hero_headline_animation2\`;`)
  await db.run(sql`ALTER TABLE \`solutions\` DROP COLUMN \`hero_headline_animation\`;`)
  await db.run(sql`ALTER TABLE \`solutions\` DROP COLUMN \`hero_headline_line2\`;`)
  await db.run(sql`ALTER TABLE \`solutions\` DROP COLUMN \`hero_headline_animation2\`;`)
}
