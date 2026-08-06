import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_announcement_enabled\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_announcement_text\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_announcement_href\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_announcement_cta_label\` text DEFAULT 'Learn more';`)
  await db.run(sql`ALTER TABLE \`landing_pages\` ADD \`hero_announcement_enabled\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`landing_pages\` ADD \`hero_announcement_text\` text;`)
  await db.run(sql`ALTER TABLE \`landing_pages\` ADD \`hero_announcement_href\` text;`)
  await db.run(sql`ALTER TABLE \`landing_pages\` ADD \`hero_announcement_cta_label\` text DEFAULT 'Learn more';`)
  await db.run(sql`ALTER TABLE \`solutions\` ADD \`hero_announcement_enabled\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`solutions\` ADD \`hero_announcement_text\` text;`)
  await db.run(sql`ALTER TABLE \`solutions\` ADD \`hero_announcement_href\` text;`)
  await db.run(sql`ALTER TABLE \`solutions\` ADD \`hero_announcement_cta_label\` text DEFAULT 'Learn more';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_announcement_enabled\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_announcement_text\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_announcement_href\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_announcement_cta_label\`;`)
  await db.run(sql`ALTER TABLE \`landing_pages\` DROP COLUMN \`hero_announcement_enabled\`;`)
  await db.run(sql`ALTER TABLE \`landing_pages\` DROP COLUMN \`hero_announcement_text\`;`)
  await db.run(sql`ALTER TABLE \`landing_pages\` DROP COLUMN \`hero_announcement_href\`;`)
  await db.run(sql`ALTER TABLE \`landing_pages\` DROP COLUMN \`hero_announcement_cta_label\`;`)
  await db.run(sql`ALTER TABLE \`solutions\` DROP COLUMN \`hero_announcement_enabled\`;`)
  await db.run(sql`ALTER TABLE \`solutions\` DROP COLUMN \`hero_announcement_text\`;`)
  await db.run(sql`ALTER TABLE \`solutions\` DROP COLUMN \`hero_announcement_href\`;`)
  await db.run(sql`ALTER TABLE \`solutions\` DROP COLUMN \`hero_announcement_cta_label\`;`)
}
