import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_cta_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`headline\` text,
  	\`body\` text,
  	\`primary_cta_label\` text,
  	\`primary_cta_href\` text,
  	\`secondary_cta_label\` text,
  	\`secondary_cta_href\` text,
  	\`closing_line\` text,
  	\`microcopy\` text,
  	\`bg_style\` text DEFAULT 'forest-dark',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_cta_section\`("_order", "_parent_id", "_path", "id", "headline", "body", "primary_cta_label", "primary_cta_href", "secondary_cta_label", "secondary_cta_href", "closing_line", "microcopy", "bg_style", "block_name") SELECT "_order", "_parent_id", "_path", "id", "headline", "body", "primary_cta_label", "primary_cta_href", "secondary_cta_label", "secondary_cta_href", "closing_line", "microcopy", "bg_style", "block_name" FROM \`pages_blocks_cta_section\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_section\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_cta_section\` RENAME TO \`pages_blocks_cta_section\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_section_order_idx\` ON \`pages_blocks_cta_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_section_parent_id_idx\` ON \`pages_blocks_cta_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_section_path_idx\` ON \`pages_blocks_cta_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new_landing_pages_blocks_cta_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`headline\` text,
  	\`body\` text,
  	\`primary_cta_label\` text,
  	\`primary_cta_href\` text,
  	\`secondary_cta_label\` text,
  	\`secondary_cta_href\` text,
  	\`closing_line\` text,
  	\`microcopy\` text,
  	\`bg_style\` text DEFAULT 'forest-dark',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_landing_pages_blocks_cta_section\`("_order", "_parent_id", "_path", "id", "headline", "body", "primary_cta_label", "primary_cta_href", "secondary_cta_label", "secondary_cta_href", "closing_line", "microcopy", "bg_style", "block_name") SELECT "_order", "_parent_id", "_path", "id", "headline", "body", "primary_cta_label", "primary_cta_href", "secondary_cta_label", "secondary_cta_href", "closing_line", "microcopy", "bg_style", "block_name" FROM \`landing_pages_blocks_cta_section\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_cta_section\`;`)
  await db.run(sql`ALTER TABLE \`__new_landing_pages_blocks_cta_section\` RENAME TO \`landing_pages_blocks_cta_section\`;`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_cta_section_order_idx\` ON \`landing_pages_blocks_cta_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_cta_section_parent_id_idx\` ON \`landing_pages_blocks_cta_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_cta_section_path_idx\` ON \`landing_pages_blocks_cta_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new_solutions_blocks_cta_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`headline\` text,
  	\`body\` text,
  	\`primary_cta_label\` text,
  	\`primary_cta_href\` text,
  	\`secondary_cta_label\` text,
  	\`secondary_cta_href\` text,
  	\`closing_line\` text,
  	\`microcopy\` text,
  	\`bg_style\` text DEFAULT 'forest-dark',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_solutions_blocks_cta_section\`("_order", "_parent_id", "_path", "id", "headline", "body", "primary_cta_label", "primary_cta_href", "secondary_cta_label", "secondary_cta_href", "closing_line", "microcopy", "bg_style", "block_name") SELECT "_order", "_parent_id", "_path", "id", "headline", "body", "primary_cta_label", "primary_cta_href", "secondary_cta_label", "secondary_cta_href", "closing_line", "microcopy", "bg_style", "block_name" FROM \`solutions_blocks_cta_section\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_cta_section\`;`)
  await db.run(sql`ALTER TABLE \`__new_solutions_blocks_cta_section\` RENAME TO \`solutions_blocks_cta_section\`;`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_cta_section_order_idx\` ON \`solutions_blocks_cta_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_cta_section_parent_id_idx\` ON \`solutions_blocks_cta_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_cta_section_path_idx\` ON \`solutions_blocks_cta_section\` (\`_path\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_cta_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`headline\` text NOT NULL,
  	\`body\` text,
  	\`primary_cta_label\` text,
  	\`primary_cta_href\` text,
  	\`secondary_cta_label\` text,
  	\`secondary_cta_href\` text,
  	\`closing_line\` text,
  	\`microcopy\` text,
  	\`bg_style\` text DEFAULT 'forest-dark',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_blocks_cta_section\`("_order", "_parent_id", "_path", "id", "headline", "body", "primary_cta_label", "primary_cta_href", "secondary_cta_label", "secondary_cta_href", "closing_line", "microcopy", "bg_style", "block_name") SELECT "_order", "_parent_id", "_path", "id", "headline", "body", "primary_cta_label", "primary_cta_href", "secondary_cta_label", "secondary_cta_href", "closing_line", "microcopy", "bg_style", "block_name" FROM \`pages_blocks_cta_section\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_section\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_cta_section\` RENAME TO \`pages_blocks_cta_section\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_section_order_idx\` ON \`pages_blocks_cta_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_section_parent_id_idx\` ON \`pages_blocks_cta_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_section_path_idx\` ON \`pages_blocks_cta_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new_landing_pages_blocks_cta_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`headline\` text NOT NULL,
  	\`body\` text,
  	\`primary_cta_label\` text,
  	\`primary_cta_href\` text,
  	\`secondary_cta_label\` text,
  	\`secondary_cta_href\` text,
  	\`closing_line\` text,
  	\`microcopy\` text,
  	\`bg_style\` text DEFAULT 'forest-dark',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_landing_pages_blocks_cta_section\`("_order", "_parent_id", "_path", "id", "headline", "body", "primary_cta_label", "primary_cta_href", "secondary_cta_label", "secondary_cta_href", "closing_line", "microcopy", "bg_style", "block_name") SELECT "_order", "_parent_id", "_path", "id", "headline", "body", "primary_cta_label", "primary_cta_href", "secondary_cta_label", "secondary_cta_href", "closing_line", "microcopy", "bg_style", "block_name" FROM \`landing_pages_blocks_cta_section\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_cta_section\`;`)
  await db.run(sql`ALTER TABLE \`__new_landing_pages_blocks_cta_section\` RENAME TO \`landing_pages_blocks_cta_section\`;`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_cta_section_order_idx\` ON \`landing_pages_blocks_cta_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_cta_section_parent_id_idx\` ON \`landing_pages_blocks_cta_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_cta_section_path_idx\` ON \`landing_pages_blocks_cta_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new_solutions_blocks_cta_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`headline\` text NOT NULL,
  	\`body\` text,
  	\`primary_cta_label\` text,
  	\`primary_cta_href\` text,
  	\`secondary_cta_label\` text,
  	\`secondary_cta_href\` text,
  	\`closing_line\` text,
  	\`microcopy\` text,
  	\`bg_style\` text DEFAULT 'forest-dark',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_solutions_blocks_cta_section\`("_order", "_parent_id", "_path", "id", "headline", "body", "primary_cta_label", "primary_cta_href", "secondary_cta_label", "secondary_cta_href", "closing_line", "microcopy", "bg_style", "block_name") SELECT "_order", "_parent_id", "_path", "id", "headline", "body", "primary_cta_label", "primary_cta_href", "secondary_cta_label", "secondary_cta_href", "closing_line", "microcopy", "bg_style", "block_name" FROM \`solutions_blocks_cta_section\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_cta_section\`;`)
  await db.run(sql`ALTER TABLE \`__new_solutions_blocks_cta_section\` RENAME TO \`solutions_blocks_cta_section\`;`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_cta_section_order_idx\` ON \`solutions_blocks_cta_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_cta_section_parent_id_idx\` ON \`solutions_blocks_cta_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_cta_section_path_idx\` ON \`solutions_blocks_cta_section\` (\`_path\`);`)
}
