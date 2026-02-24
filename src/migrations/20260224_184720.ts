import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_card_grid_cards_capabilities\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_card_grid_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_grid_cards_capabilities_order_idx\` ON \`pages_blocks_card_grid_cards_capabilities\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_grid_cards_capabilities_parent_id_idx\` ON \`pages_blocks_card_grid_cards_capabilities\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`bfr_aftr_before_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bfr_aftr\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bfr_aftr_before_points_order_idx\` ON \`bfr_aftr_before_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`bfr_aftr_before_points_parent_id_idx\` ON \`bfr_aftr_before_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`bfr_aftr_after_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bfr_aftr\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bfr_aftr_after_points_order_idx\` ON \`bfr_aftr_after_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`bfr_aftr_after_points_parent_id_idx\` ON \`bfr_aftr_after_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`bfr_aftr\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`before_label\` text DEFAULT 'Without ELLA',
  	\`before_image_id\` integer,
  	\`before_caption\` text,
  	\`after_label\` text DEFAULT 'With ELLA',
  	\`after_image_id\` integer,
  	\`after_caption\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`before_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`after_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bfr_aftr_order_idx\` ON \`bfr_aftr\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`bfr_aftr_parent_id_idx\` ON \`bfr_aftr\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`bfr_aftr_path_idx\` ON \`bfr_aftr\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`bfr_aftr_before_before_image_idx\` ON \`bfr_aftr\` (\`before_image_id\`);`)
  await db.run(sql`CREATE INDEX \`bfr_aftr_after_after_image_idx\` ON \`bfr_aftr\` (\`after_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_bridge_section_quotes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`attribution\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_bridge_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_bridge_section_quotes_order_idx\` ON \`pages_blocks_bridge_section_quotes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_bridge_section_quotes_parent_id_idx\` ON \`pages_blocks_bridge_section_quotes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_bridge_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text,
  	\`closer\` text,
  	\`bg_style\` text DEFAULT 'ash-light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_bridge_section_order_idx\` ON \`pages_blocks_bridge_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_bridge_section_parent_id_idx\` ON \`pages_blocks_bridge_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_bridge_section_path_idx\` ON \`pages_blocks_bridge_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_card_grid_cards_capabilities\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages_blocks_card_grid_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_card_grid_cards_capabilities_order_idx\` ON \`landing_pages_blocks_card_grid_cards_capabilities\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_card_grid_cards_capabilities_parent_id_idx\` ON \`landing_pages_blocks_card_grid_cards_capabilities\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`solutions_blocks_card_grid_cards_capabilities\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`solutions_blocks_card_grid_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`solutions_blocks_card_grid_cards_capabilities_order_idx\` ON \`solutions_blocks_card_grid_cards_capabilities\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_card_grid_cards_capabilities_parent_id_idx\` ON \`solutions_blocks_card_grid_cards_capabilities\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_credibility_strip\` ADD \`statement\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_trust_security\` ADD \`closing_line\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_highlight_text\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_highlight_color\` text DEFAULT 'goldenrod';`)
  await db.run(sql`ALTER TABLE \`landing_pages_blocks_credibility_strip\` ADD \`statement\` text;`)
  await db.run(sql`ALTER TABLE \`landing_pages_blocks_trust_security\` ADD \`closing_line\` text;`)
  await db.run(sql`ALTER TABLE \`landing_pages\` ADD \`hero_highlight_text\` text;`)
  await db.run(sql`ALTER TABLE \`landing_pages\` ADD \`hero_highlight_color\` text DEFAULT 'goldenrod';`)
  await db.run(sql`ALTER TABLE \`solutions_blocks_trust_security\` ADD \`closing_line\` text;`)
  await db.run(sql`ALTER TABLE \`solutions\` ADD \`hero_highlight_text\` text;`)
  await db.run(sql`ALTER TABLE \`solutions\` ADD \`hero_highlight_color\` text DEFAULT 'goldenrod';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_card_grid_cards_capabilities\`;`)
  await db.run(sql`DROP TABLE \`bfr_aftr_before_points\`;`)
  await db.run(sql`DROP TABLE \`bfr_aftr_after_points\`;`)
  await db.run(sql`DROP TABLE \`bfr_aftr\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_bridge_section_quotes\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_bridge_section\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_card_grid_cards_capabilities\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_card_grid_cards_capabilities\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_credibility_strip\` DROP COLUMN \`statement\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_trust_security\` DROP COLUMN \`closing_line\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_highlight_text\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_highlight_color\`;`)
  await db.run(sql`ALTER TABLE \`landing_pages_blocks_credibility_strip\` DROP COLUMN \`statement\`;`)
  await db.run(sql`ALTER TABLE \`landing_pages_blocks_trust_security\` DROP COLUMN \`closing_line\`;`)
  await db.run(sql`ALTER TABLE \`landing_pages\` DROP COLUMN \`hero_highlight_text\`;`)
  await db.run(sql`ALTER TABLE \`landing_pages\` DROP COLUMN \`hero_highlight_color\`;`)
  await db.run(sql`ALTER TABLE \`solutions_blocks_trust_security\` DROP COLUMN \`closing_line\`;`)
  await db.run(sql`ALTER TABLE \`solutions\` DROP COLUMN \`hero_highlight_text\`;`)
  await db.run(sql`ALTER TABLE \`solutions\` DROP COLUMN \`hero_highlight_color\`;`)
}
