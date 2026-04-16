import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`site_settings_organization_schema_same_as\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_organization_schema_same_as_order_idx\` ON \`site_settings_organization_schema_same_as\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_organization_schema_same_as_parent_id_idx\` ON \`site_settings_organization_schema_same_as\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`default_title\` text DEFAULT 'ELLA | Practice Systematization for Trusted Advisors' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`title_template\` text DEFAULT '%s | ELLA';`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`default_description\` text DEFAULT 'ELLA turns trust into action with tools built for advisor-led transitions. Go from intake to insight in a fraction of the time.' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`twitter_handle\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`organization_schema_legal_name\` text;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`organization_schema_founding_date\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`site_settings_organization_schema_same_as\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`default_title\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`title_template\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`default_description\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`twitter_handle\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`organization_schema_legal_name\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`organization_schema_founding_date\`;`)
}
