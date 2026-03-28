import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Create pages_blocks_trust_security_sections
  await db.run(sql`CREATE TABLE \`pages_blocks_trust_security_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`body\` text,
  	\`bullet_heading\` text,
  	\`column\` text DEFAULT 'left',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_trust_security\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_trust_security_sections_order_idx\` ON \`pages_blocks_trust_security_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_trust_security_sections_parent_id_idx\` ON \`pages_blocks_trust_security_sections\` (\`_parent_id\`);`)

  // Create pages_blocks_trust_security_sections_bullet_items
  await db.run(sql`CREATE TABLE \`pages_blocks_trust_security_sections_bullet_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_trust_security_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_trust_security_sections_bullet_items_order_idx\` ON \`pages_blocks_trust_security_sections_bullet_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_trust_security_sections_bullet_items_parent_id_idx\` ON \`pages_blocks_trust_security_sections_bullet_items\` (\`_parent_id\`);`)

  // Create landing_pages_blocks_trust_security_sections
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_trust_security_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`body\` text,
  	\`bullet_heading\` text,
  	\`column\` text DEFAULT 'left',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages_blocks_trust_security\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_trust_security_sections_order_idx\` ON \`landing_pages_blocks_trust_security_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_trust_security_sections_parent_id_idx\` ON \`landing_pages_blocks_trust_security_sections\` (\`_parent_id\`);`)

  // Create landing_pages_blocks_trust_security_sections_bullet_items
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_trust_security_sections_bullet_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages_blocks_trust_security_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_trust_security_sections_bullet_items_order_idx\` ON \`landing_pages_blocks_trust_security_sections_bullet_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_trust_security_sections_bullet_items_parent_id_idx\` ON \`landing_pages_blocks_trust_security_sections_bullet_items\` (\`_parent_id\`);`)

  // Create solutions_blocks_trust_security_sections
  await db.run(sql`CREATE TABLE \`solutions_blocks_trust_security_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`body\` text,
  	\`bullet_heading\` text,
  	\`column\` text DEFAULT 'left',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`solutions_blocks_trust_security\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`solutions_blocks_trust_security_sections_order_idx\` ON \`solutions_blocks_trust_security_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_trust_security_sections_parent_id_idx\` ON \`solutions_blocks_trust_security_sections\` (\`_parent_id\`);`)

  // Create solutions_blocks_trust_security_sections_bullet_items
  await db.run(sql`CREATE TABLE \`solutions_blocks_trust_security_sections_bullet_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`solutions_blocks_trust_security_sections\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`solutions_blocks_trust_security_sections_bullet_items_order_idx\` ON \`solutions_blocks_trust_security_sections_bullet_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_trust_security_sections_bullet_items_parent_id_idx\` ON \`solutions_blocks_trust_security_sections_bullet_items\` (\`_parent_id\`);`)

  // Drop old items tables (old schema had items with icon_id)
  await db.run(sql`DROP TABLE \`pages_blocks_trust_security_items\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_trust_security_items\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_trust_security_items\`;`)

  // Drop closing_line column from trust_security parent tables
  await db.run(sql`ALTER TABLE \`pages_blocks_trust_security\` DROP COLUMN \`closing_line\`;`)
  await db.run(sql`ALTER TABLE \`landing_pages_blocks_trust_security\` DROP COLUMN \`closing_line\`;`)
  await db.run(sql`ALTER TABLE \`solutions_blocks_trust_security\` DROP COLUMN \`closing_line\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Restore old items tables
  await db.run(sql`CREATE TABLE \`pages_blocks_trust_security_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`body\` text,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_trust_security\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_trust_security_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`body\` text,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages_blocks_trust_security\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE TABLE \`solutions_blocks_trust_security_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`body\` text,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`solutions_blocks_trust_security\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`ALTER TABLE \`pages_blocks_trust_security\` ADD \`closing_line\` text;`)
  await db.run(sql`ALTER TABLE \`landing_pages_blocks_trust_security\` ADD \`closing_line\` text;`)
  await db.run(sql`ALTER TABLE \`solutions_blocks_trust_security\` ADD \`closing_line\` text;`)
  await db.run(sql`DROP TABLE \`pages_blocks_trust_security_sections_bullet_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_trust_security_sections\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_trust_security_sections_bullet_items\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_trust_security_sections\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_trust_security_sections_bullet_items\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_trust_security_sections\`;`)
}
