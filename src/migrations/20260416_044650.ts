import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_newsletter_capture_loops_list_ids\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`list_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_newsletter_capture\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_newsletter_capture_loops_list_ids_order_idx\` ON \`pages_blocks_newsletter_capture_loops_list_ids\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_newsletter_capture_loops_list_ids_parent_id_idx\` ON \`pages_blocks_newsletter_capture_loops_list_ids\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_newsletter_capture_loops_list_ids\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`list_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages_blocks_newsletter_capture\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_newsletter_capture_loops_list_ids_order_idx\` ON \`landing_pages_blocks_newsletter_capture_loops_list_ids\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_newsletter_capture_loops_list_ids_parent_id_idx\` ON \`landing_pages_blocks_newsletter_capture_loops_list_ids\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_blog_newsletter_loops_list_ids\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`list_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_blog_newsletter_loops_list_ids_order_idx\` ON \`site_settings_blog_newsletter_loops_list_ids\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_blog_newsletter_loops_list_ids_parent_id_idx\` ON \`site_settings_blog_newsletter_loops_list_ids\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_newsletter_section_loops_list_ids\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`list_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_newsletter_section_loops_list_ids_order_idx\` ON \`footer_newsletter_section_loops_list_ids\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_newsletter_section_loops_list_ids_parent_id_idx\` ON \`footer_newsletter_section_loops_list_ids\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_newsletter_capture\` ADD \`source\` text;`)
  await db.run(sql`ALTER TABLE \`landing_pages_blocks_newsletter_capture\` ADD \`source\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_newsletter_capture_loops_list_ids\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_newsletter_capture_loops_list_ids\`;`)
  await db.run(sql`DROP TABLE \`site_settings_blog_newsletter_loops_list_ids\`;`)
  await db.run(sql`DROP TABLE \`footer_newsletter_section_loops_list_ids\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_newsletter_capture\` DROP COLUMN \`source\`;`)
  await db.run(sql`ALTER TABLE \`landing_pages_blocks_newsletter_capture\` DROP COLUMN \`source\`;`)
}
