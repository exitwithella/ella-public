import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pricing_tiers\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`pricing_tiers\` ADD \`badge\` text;`)
  await db.run(sql`ALTER TABLE \`pricing_tiers\` ADD \`annual_price_amount\` numeric;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pricing_tiers\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`pricing_tiers\` DROP COLUMN \`badge\`;`)
  await db.run(sql`ALTER TABLE \`pricing_tiers\` DROP COLUMN \`annual_price_amount\`;`)
}
