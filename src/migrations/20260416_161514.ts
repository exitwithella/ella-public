import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`footer_easter_egg_local_variants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`image_id\` integer,
  	\`text\` text,
  	\`match_cities\` text,
  	\`match_region_code\` text,
  	\`match_center_lat\` numeric,
  	\`match_center_lon\` numeric,
  	\`match_radius_miles\` numeric,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_easter_egg_local_variants_order_idx\` ON \`footer_easter_egg_local_variants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_easter_egg_local_variants_parent_id_idx\` ON \`footer_easter_egg_local_variants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_easter_egg_local_variants_image_idx\` ON \`footer_easter_egg_local_variants\` (\`image_id\`);`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_microcopy\` text;`)
  await db.run(sql`ALTER TABLE \`landing_pages\` ADD \`hero_microcopy\` text;`)
  await db.run(sql`ALTER TABLE \`solutions\` ADD \`hero_microcopy\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`footer_easter_egg_local_variants\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_microcopy\`;`)
  await db.run(sql`ALTER TABLE \`landing_pages\` DROP COLUMN \`hero_microcopy\`;`)
  await db.run(sql`ALTER TABLE \`solutions\` DROP COLUMN \`hero_microcopy\`;`)
}
