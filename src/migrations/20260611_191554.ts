import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`users\` ADD \`clerk_id\` text;`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_clerk_id_idx\` ON \`users\` (\`clerk_id\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`users_clerk_id_idx\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`clerk_id\`;`)
}
