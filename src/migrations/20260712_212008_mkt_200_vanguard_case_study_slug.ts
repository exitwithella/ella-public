import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`case_studies\` ADD \`slug\` text NOT NULL;`)
  await db.run(sql`CREATE UNIQUE INDEX \`case_studies_slug_idx\` ON \`case_studies\` (\`slug\`);`)
  await db.run(sql`ALTER TABLE \`vanguard_events\` ADD \`slug\` text NOT NULL;`)
  await db.run(sql`CREATE UNIQUE INDEX \`vanguard_events_slug_idx\` ON \`vanguard_events\` (\`slug\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`case_studies_slug_idx\`;`)
  await db.run(sql`ALTER TABLE \`case_studies\` DROP COLUMN \`slug\`;`)
  await db.run(sql`DROP INDEX \`vanguard_events_slug_idx\`;`)
  await db.run(sql`ALTER TABLE \`vanguard_events\` DROP COLUMN \`slug\`;`)
}
