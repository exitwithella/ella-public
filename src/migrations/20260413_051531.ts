import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`caption\` text,
  	\`credit\` text,
  	\`category\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`excerpt\` text,
  	\`published_date\` text NOT NULL,
  	\`status\` text DEFAULT 'draft',
  	\`author_id\` integer,
  	\`featured_image_id\` integer,
  	\`tier\` text DEFAULT 'standard',
  	\`legacy_slug\` text,
  	\`show_newsletter_c_t_a\` integer DEFAULT true,
  	\`content\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`author_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_author_idx\` ON \`posts\` (\`author_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_featured_image_idx\` ON \`posts\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_meta_meta_image_idx\` ON \`posts\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	\`disciplines_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`disciplines_id\`) REFERENCES \`disciplines\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_rels_order_idx\` ON \`posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_parent_idx\` ON \`posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_path_idx\` ON \`posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_categories_id_idx\` ON \`posts_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_disciplines_id_idx\` ON \`posts_rels\` (\`disciplines_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_posts_id_idx\` ON \`posts_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_content_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`media_id\` integer,
  	\`media_position\` text DEFAULT 'right',
  	\`link_label\` text,
  	\`link_href\` text,
  	\`link_style\` text DEFAULT 'button',
  	\`badge\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_section_order_idx\` ON \`pages_blocks_content_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_section_parent_id_idx\` ON \`pages_blocks_content_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_section_path_idx\` ON \`pages_blocks_content_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_section_media_idx\` ON \`pages_blocks_content_section\` (\`media_id\`);`)
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
  await db.run(sql`CREATE TABLE \`pages_blocks_card_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text,
  	\`icon_name\` text,
  	\`icon_id\` integer,
  	\`link_label\` text,
  	\`link_href\` text,
  	\`anchor_target\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_card_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_grid_cards_order_idx\` ON \`pages_blocks_card_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_grid_cards_parent_id_idx\` ON \`pages_blocks_card_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_grid_cards_icon_idx\` ON \`pages_blocks_card_grid_cards\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_card_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`variant\` text DEFAULT 'feature',
  	\`columns\` text DEFAULT '3',
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_grid_order_idx\` ON \`pages_blocks_card_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_grid_parent_id_idx\` ON \`pages_blocks_card_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_grid_path_idx\` ON \`pages_blocks_card_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonial_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`layout\` text DEFAULT 'single',
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonial_block_order_idx\` ON \`pages_blocks_testimonial_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonial_block_parent_id_idx\` ON \`pages_blocks_testimonial_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonial_block_path_idx\` ON \`pages_blocks_testimonial_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_section\` (
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
  	\`bg_style\` text DEFAULT 'forest',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_section_order_idx\` ON \`pages_blocks_cta_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_section_parent_id_idx\` ON \`pages_blocks_cta_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_section_path_idx\` ON \`pages_blocks_cta_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_credibility_strip_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_credibility_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_credibility_strip_stats_order_idx\` ON \`pages_blocks_credibility_strip_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_credibility_strip_stats_parent_id_idx\` ON \`pages_blocks_credibility_strip_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_credibility_strip\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'logos',
  	\`statement\` text,
  	\`label\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_credibility_strip_order_idx\` ON \`pages_blocks_credibility_strip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_credibility_strip_parent_id_idx\` ON \`pages_blocks_credibility_strip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_credibility_strip_path_idx\` ON \`pages_blocks_credibility_strip\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_feature_deep_dive_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text,
  	\`visual_id\` integer,
  	\`visual_alt\` text,
  	\`testimonial_id\` integer,
  	\`link_label\` text,
  	\`link_href\` text,
  	FOREIGN KEY (\`visual_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`testimonial_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_feature_deep_dive\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_deep_dive_sections_order_idx\` ON \`pages_blocks_feature_deep_dive_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_deep_dive_sections_parent_id_idx\` ON \`pages_blocks_feature_deep_dive_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_deep_dive_sections_visual_idx\` ON \`pages_blocks_feature_deep_dive_sections\` (\`visual_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_deep_dive_sections_testimonial_idx\` ON \`pages_blocks_feature_deep_dive_sections\` (\`testimonial_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_feature_deep_dive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_id\` text,
  	\`section_label\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_deep_dive_order_idx\` ON \`pages_blocks_feature_deep_dive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_deep_dive_parent_id_idx\` ON \`pages_blocks_feature_deep_dive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_deep_dive_path_idx\` ON \`pages_blocks_feature_deep_dive\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`cmp_tbl_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`subheading\` text,
  	\`highlighted\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cmp_tbl\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cmp_tbl_columns_order_idx\` ON \`cmp_tbl_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cmp_tbl_columns_parent_id_idx\` ON \`cmp_tbl_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`cmp_tbl_rows_values\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`indicator\` text DEFAULT 'text',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cmp_tbl_rows\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cmp_tbl_rows_values_order_idx\` ON \`cmp_tbl_rows_values\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cmp_tbl_rows_values_parent_id_idx\` ON \`cmp_tbl_rows_values\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`cmp_tbl_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cmp_tbl\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cmp_tbl_rows_order_idx\` ON \`cmp_tbl_rows\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cmp_tbl_rows_parent_id_idx\` ON \`cmp_tbl_rows\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`cmp_tbl\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cmp_tbl_order_idx\` ON \`cmp_tbl\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cmp_tbl_parent_id_idx\` ON \`cmp_tbl\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`cmp_tbl_path_idx\` ON \`cmp_tbl\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_trust_security_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_trust_security\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_trust_security_sections_order_idx\` ON \`pages_blocks_trust_security_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_trust_security_sections_parent_id_idx\` ON \`pages_blocks_trust_security_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_trust_security\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`intro\` text,
  	\`link_label\` text,
  	\`link_href\` text,
  	\`pattern_svg_id\` integer,
  	\`pattern_color\` text,
  	\`background_color\` text,
  	\`content_background_color\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`pattern_svg_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_trust_security_order_idx\` ON \`pages_blocks_trust_security\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_trust_security_parent_id_idx\` ON \`pages_blocks_trust_security\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_trust_security_path_idx\` ON \`pages_blocks_trust_security\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_trust_security_pattern_svg_idx\` ON \`pages_blocks_trust_security\` (\`pattern_svg_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_numbered_steps_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_numbered_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_numbered_steps_steps_order_idx\` ON \`pages_blocks_numbered_steps_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_numbered_steps_steps_parent_id_idx\` ON \`pages_blocks_numbered_steps_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_numbered_steps_steps_image_idx\` ON \`pages_blocks_numbered_steps_steps\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_numbered_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_numbered_steps_order_idx\` ON \`pages_blocks_numbered_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_numbered_steps_parent_id_idx\` ON \`pages_blocks_numbered_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_numbered_steps_path_idx\` ON \`pages_blocks_numbered_steps\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_solutions_selector\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_solutions_selector_order_idx\` ON \`pages_blocks_solutions_selector\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_solutions_selector_parent_id_idx\` ON \`pages_blocks_solutions_selector\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_solutions_selector_path_idx\` ON \`pages_blocks_solutions_selector\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_faq_accordion\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`filter_by_category\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_accordion_order_idx\` ON \`pages_blocks_faq_accordion\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_accordion_parent_id_idx\` ON \`pages_blocks_faq_accordion\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_faq_accordion_path_idx\` ON \`pages_blocks_faq_accordion\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_pricing_journey\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`show_toggle\` integer DEFAULT false,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_pricing_journey_order_idx\` ON \`pages_blocks_pricing_journey\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_pricing_journey_parent_id_idx\` ON \`pages_blocks_pricing_journey\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_pricing_journey_path_idx\` ON \`pages_blocks_pricing_journey\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_newsletter_capture\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`subheading\` text,
  	\`placeholder\` text DEFAULT 'Your email address',
  	\`button_label\` text DEFAULT 'Subscribe',
  	\`success_message\` text DEFAULT 'You''re in. We''ll be in touch.',
  	\`microcopy\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_newsletter_capture_order_idx\` ON \`pages_blocks_newsletter_capture\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_newsletter_capture_parent_id_idx\` ON \`pages_blocks_newsletter_capture\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_newsletter_capture_path_idx\` ON \`pages_blocks_newsletter_capture\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_form_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`embed_type\` text,
  	\`form_id\` text,
  	\`embed_code\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_embed_order_idx\` ON \`pages_blocks_form_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_embed_parent_id_idx\` ON \`pages_blocks_form_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_embed_path_idx\` ON \`pages_blocks_form_embed\` (\`_path\`);`)
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
  	\`label\` text,
  	\`heading\` text,
  	\`body_style\` text DEFAULT 'body',
  	\`body\` text,
  	\`closer\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_bridge_section_order_idx\` ON \`pages_blocks_bridge_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_bridge_section_parent_id_idx\` ON \`pages_blocks_bridge_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_bridge_section_path_idx\` ON \`pages_blocks_bridge_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_product_features_items_badges\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_product_features_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_product_features_items_badges_order_idx\` ON \`pages_blocks_product_features_items_badges\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_product_features_items_badges_parent_id_idx\` ON \`pages_blocks_product_features_items_badges\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_product_features_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`screenshot_id\` integer NOT NULL,
  	FOREIGN KEY (\`screenshot_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_product_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_product_features_items_order_idx\` ON \`pages_blocks_product_features_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_product_features_items_parent_id_idx\` ON \`pages_blocks_product_features_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_product_features_items_screenshot_idx\` ON \`pages_blocks_product_features_items\` (\`screenshot_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_product_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`show_bottom_border\` integer DEFAULT true,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_product_features_order_idx\` ON \`pages_blocks_product_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_product_features_parent_id_idx\` ON \`pages_blocks_product_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_product_features_path_idx\` ON \`pages_blocks_product_features\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_squeeze_section_quotes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`attribution\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_squeeze_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_squeeze_section_quotes_order_idx\` ON \`pages_blocks_squeeze_section_quotes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_squeeze_section_quotes_parent_id_idx\` ON \`pages_blocks_squeeze_section_quotes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_squeeze_section_pressure_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_squeeze_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_squeeze_section_pressure_items_order_idx\` ON \`pages_blocks_squeeze_section_pressure_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_squeeze_section_pressure_items_parent_id_idx\` ON \`pages_blocks_squeeze_section_pressure_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_squeeze_section_erosion_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_squeeze_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_squeeze_section_erosion_items_order_idx\` ON \`pages_blocks_squeeze_section_erosion_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_squeeze_section_erosion_items_parent_id_idx\` ON \`pages_blocks_squeeze_section_erosion_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_squeeze_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`heading\` text NOT NULL,
  	\`body\` text,
  	\`closer\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_squeeze_section_order_idx\` ON \`pages_blocks_squeeze_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_squeeze_section_parent_id_idx\` ON \`pages_blocks_squeeze_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_squeeze_section_path_idx\` ON \`pages_blocks_squeeze_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_dilemma_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`heading\` text NOT NULL,
  	\`heading_accent\` text,
  	\`body\` text,
  	\`transition_line1\` text,
  	\`transition_line2\` text,
  	\`table_data\` text,
  	\`steps\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_dilemma_section_order_idx\` ON \`pages_blocks_dilemma_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dilemma_section_parent_id_idx\` ON \`pages_blocks_dilemma_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_dilemma_section_path_idx\` ON \`pages_blocks_dilemma_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_advisor_personas_personas\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`with_ella\` text NOT NULL,
  	\`icon_name\` text,
  	\`icon_id\` integer,
  	\`accent_color\` text DEFAULT 'forest',
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_advisor_personas\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_advisor_personas_personas_order_idx\` ON \`pages_blocks_advisor_personas_personas\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_advisor_personas_personas_parent_id_idx\` ON \`pages_blocks_advisor_personas_personas\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_advisor_personas_personas_icon_idx\` ON \`pages_blocks_advisor_personas_personas\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_advisor_personas\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`image_id\` integer NOT NULL,
  	\`image_quote_label\` text,
  	\`image_quote_text\` text,
  	\`image_quote_attribution\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_advisor_personas_order_idx\` ON \`pages_blocks_advisor_personas\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_advisor_personas_parent_id_idx\` ON \`pages_blocks_advisor_personas\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_advisor_personas_path_idx\` ON \`pages_blocks_advisor_personas\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_advisor_personas_image_idx\` ON \`pages_blocks_advisor_personas\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`status\` text DEFAULT 'draft',
  	\`published_date\` text,
  	\`parent_id\` integer,
  	\`hero_headline\` text NOT NULL,
  	\`hero_headline_animation\` text DEFAULT 'word-by-word',
  	\`hero_headline_line2\` text,
  	\`hero_headline_animation2\` text DEFAULT 'blur-fade',
  	\`hero_subheadline\` text,
  	\`hero_primary_cta_label\` text,
  	\`hero_primary_cta_href\` text,
  	\`hero_secondary_cta_label\` text,
  	\`hero_secondary_cta_href\` text,
  	\`hero_visual_id\` integer,
  	\`hero_style\` text DEFAULT 'default',
  	\`hero_highlight_text\` text,
  	\`hero_highlight_color\` text DEFAULT 'goldenrod',
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_visual_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_parent_idx\` ON \`pages\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_visual_idx\` ON \`pages\` (\`hero_visual_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`testimonials_id\` integer,
  	\`partners_id\` integer,
  	\`solutions_id\` integer,
  	\`faq_items_id\` integer,
  	\`pricing_tiers_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`partners_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`solutions_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faq_items_id\`) REFERENCES \`faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pricing_tiers_id\`) REFERENCES \`pricing_tiers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_testimonials_id_idx\` ON \`pages_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_partners_id_idx\` ON \`pages_rels\` (\`partners_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_solutions_id_idx\` ON \`pages_rels\` (\`solutions_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_faq_items_id_idx\` ON \`pages_rels\` (\`faq_items_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_pricing_tiers_id_idx\` ON \`pages_rels\` (\`pricing_tiers_id\`);`)
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_content_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`media_id\` integer,
  	\`media_position\` text DEFAULT 'right',
  	\`link_label\` text,
  	\`link_href\` text,
  	\`link_style\` text DEFAULT 'button',
  	\`badge\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_content_section_order_idx\` ON \`landing_pages_blocks_content_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_content_section_parent_id_idx\` ON \`landing_pages_blocks_content_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_content_section_path_idx\` ON \`landing_pages_blocks_content_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_content_section_media_idx\` ON \`landing_pages_blocks_content_section\` (\`media_id\`);`)
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
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_card_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text,
  	\`icon_name\` text,
  	\`icon_id\` integer,
  	\`link_label\` text,
  	\`link_href\` text,
  	\`anchor_target\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages_blocks_card_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_card_grid_cards_order_idx\` ON \`landing_pages_blocks_card_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_card_grid_cards_parent_id_idx\` ON \`landing_pages_blocks_card_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_card_grid_cards_icon_idx\` ON \`landing_pages_blocks_card_grid_cards\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_card_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`variant\` text DEFAULT 'feature',
  	\`columns\` text DEFAULT '3',
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_card_grid_order_idx\` ON \`landing_pages_blocks_card_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_card_grid_parent_id_idx\` ON \`landing_pages_blocks_card_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_card_grid_path_idx\` ON \`landing_pages_blocks_card_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_testimonial_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`layout\` text DEFAULT 'single',
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_testimonial_block_order_idx\` ON \`landing_pages_blocks_testimonial_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_testimonial_block_parent_id_idx\` ON \`landing_pages_blocks_testimonial_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_testimonial_block_path_idx\` ON \`landing_pages_blocks_testimonial_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_cta_section\` (
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
  	\`bg_style\` text DEFAULT 'forest',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_cta_section_order_idx\` ON \`landing_pages_blocks_cta_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_cta_section_parent_id_idx\` ON \`landing_pages_blocks_cta_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_cta_section_path_idx\` ON \`landing_pages_blocks_cta_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_credibility_strip_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages_blocks_credibility_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_credibility_strip_stats_order_idx\` ON \`landing_pages_blocks_credibility_strip_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_credibility_strip_stats_parent_id_idx\` ON \`landing_pages_blocks_credibility_strip_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_credibility_strip\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'logos',
  	\`statement\` text,
  	\`label\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_credibility_strip_order_idx\` ON \`landing_pages_blocks_credibility_strip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_credibility_strip_parent_id_idx\` ON \`landing_pages_blocks_credibility_strip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_credibility_strip_path_idx\` ON \`landing_pages_blocks_credibility_strip\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_feature_deep_dive_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text,
  	\`visual_id\` integer,
  	\`visual_alt\` text,
  	\`testimonial_id\` integer,
  	\`link_label\` text,
  	\`link_href\` text,
  	FOREIGN KEY (\`visual_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`testimonial_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages_blocks_feature_deep_dive\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_feature_deep_dive_sections_order_idx\` ON \`landing_pages_blocks_feature_deep_dive_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_feature_deep_dive_sections_parent_id_idx\` ON \`landing_pages_blocks_feature_deep_dive_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_feature_deep_dive_sections_visual_idx\` ON \`landing_pages_blocks_feature_deep_dive_sections\` (\`visual_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_feature_deep_dive_sections_testimon_idx\` ON \`landing_pages_blocks_feature_deep_dive_sections\` (\`testimonial_id\`);`)
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_feature_deep_dive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_id\` text,
  	\`section_label\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_feature_deep_dive_order_idx\` ON \`landing_pages_blocks_feature_deep_dive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_feature_deep_dive_parent_id_idx\` ON \`landing_pages_blocks_feature_deep_dive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_feature_deep_dive_path_idx\` ON \`landing_pages_blocks_feature_deep_dive\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_trust_security_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`body\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages_blocks_trust_security\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_trust_security_sections_order_idx\` ON \`landing_pages_blocks_trust_security_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_trust_security_sections_parent_id_idx\` ON \`landing_pages_blocks_trust_security_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_trust_security\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`intro\` text,
  	\`link_label\` text,
  	\`link_href\` text,
  	\`pattern_svg_id\` integer,
  	\`pattern_color\` text,
  	\`background_color\` text,
  	\`content_background_color\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`pattern_svg_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_trust_security_order_idx\` ON \`landing_pages_blocks_trust_security\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_trust_security_parent_id_idx\` ON \`landing_pages_blocks_trust_security\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_trust_security_path_idx\` ON \`landing_pages_blocks_trust_security\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_trust_security_pattern_svg_idx\` ON \`landing_pages_blocks_trust_security\` (\`pattern_svg_id\`);`)
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_numbered_steps_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages_blocks_numbered_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_numbered_steps_steps_order_idx\` ON \`landing_pages_blocks_numbered_steps_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_numbered_steps_steps_parent_id_idx\` ON \`landing_pages_blocks_numbered_steps_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_numbered_steps_steps_image_idx\` ON \`landing_pages_blocks_numbered_steps_steps\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_numbered_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_numbered_steps_order_idx\` ON \`landing_pages_blocks_numbered_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_numbered_steps_parent_id_idx\` ON \`landing_pages_blocks_numbered_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_numbered_steps_path_idx\` ON \`landing_pages_blocks_numbered_steps\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_solutions_selector\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_solutions_selector_order_idx\` ON \`landing_pages_blocks_solutions_selector\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_solutions_selector_parent_id_idx\` ON \`landing_pages_blocks_solutions_selector\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_solutions_selector_path_idx\` ON \`landing_pages_blocks_solutions_selector\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_faq_accordion\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`filter_by_category\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_faq_accordion_order_idx\` ON \`landing_pages_blocks_faq_accordion\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_faq_accordion_parent_id_idx\` ON \`landing_pages_blocks_faq_accordion\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_faq_accordion_path_idx\` ON \`landing_pages_blocks_faq_accordion\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_newsletter_capture\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`subheading\` text,
  	\`placeholder\` text DEFAULT 'Your email address',
  	\`button_label\` text DEFAULT 'Subscribe',
  	\`success_message\` text DEFAULT 'You''re in. We''ll be in touch.',
  	\`microcopy\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_newsletter_capture_order_idx\` ON \`landing_pages_blocks_newsletter_capture\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_newsletter_capture_parent_id_idx\` ON \`landing_pages_blocks_newsletter_capture\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_newsletter_capture_path_idx\` ON \`landing_pages_blocks_newsletter_capture\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_form_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`embed_type\` text,
  	\`form_id\` text,
  	\`embed_code\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_form_embed_order_idx\` ON \`landing_pages_blocks_form_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_form_embed_parent_id_idx\` ON \`landing_pages_blocks_form_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_form_embed_path_idx\` ON \`landing_pages_blocks_form_embed\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`landing_pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`campaign\` text,
  	\`status\` text DEFAULT 'draft',
  	\`hero_headline\` text NOT NULL,
  	\`hero_headline_animation\` text DEFAULT 'word-by-word',
  	\`hero_headline_line2\` text,
  	\`hero_headline_animation2\` text DEFAULT 'blur-fade',
  	\`hero_subheadline\` text,
  	\`hero_primary_cta_label\` text,
  	\`hero_primary_cta_href\` text,
  	\`hero_secondary_cta_label\` text,
  	\`hero_secondary_cta_href\` text,
  	\`hero_visual_id\` integer,
  	\`hero_style\` text DEFAULT 'default',
  	\`hero_highlight_text\` text,
  	\`hero_highlight_color\` text DEFAULT 'goldenrod',
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`hero_visual_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`landing_pages_slug_idx\` ON \`landing_pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_hero_hero_visual_idx\` ON \`landing_pages\` (\`hero_visual_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_meta_meta_image_idx\` ON \`landing_pages\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_updated_at_idx\` ON \`landing_pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_created_at_idx\` ON \`landing_pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`landing_pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`testimonials_id\` integer,
  	\`partners_id\` integer,
  	\`solutions_id\` integer,
  	\`faq_items_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`landing_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`partners_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`solutions_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faq_items_id\`) REFERENCES \`faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_rels_order_idx\` ON \`landing_pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_rels_parent_idx\` ON \`landing_pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_rels_path_idx\` ON \`landing_pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_rels_testimonials_id_idx\` ON \`landing_pages_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_rels_partners_id_idx\` ON \`landing_pages_rels\` (\`partners_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_rels_solutions_id_idx\` ON \`landing_pages_rels\` (\`solutions_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_rels_faq_items_id_idx\` ON \`landing_pages_rels\` (\`faq_items_id\`);`)
  await db.run(sql`CREATE TABLE \`categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`internal_label\` text,
  	\`description\` text,
  	\`path_prefix\` text,
  	\`sort_order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`disciplines\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text,
  	\`sort_order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`disciplines_slug_idx\` ON \`disciplines\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`disciplines_updated_at_idx\` ON \`disciplines\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`disciplines_created_at_idx\` ON \`disciplines\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`team_members\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`role\` text,
  	\`photo_id\` integer,
  	\`bio\` text,
  	\`is_author\` integer DEFAULT false,
  	\`linked_in\` text,
  	\`twitter\` text,
  	\`sort_order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`team_members_slug_idx\` ON \`team_members\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`team_members_photo_idx\` ON \`team_members\` (\`photo_id\`);`)
  await db.run(sql`CREATE INDEX \`team_members_updated_at_idx\` ON \`team_members\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`team_members_created_at_idx\` ON \`team_members\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`testimonials\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`quote\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`title\` text,
  	\`company\` text,
  	\`photo_id\` integer,
  	\`metrics_value\` text,
  	\`metrics_label\` text,
  	\`approved\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`testimonials_photo_idx\` ON \`testimonials\` (\`photo_id\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_updated_at_idx\` ON \`testimonials\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_created_at_idx\` ON \`testimonials\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`testimonials_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`disciplines_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`disciplines_id\`) REFERENCES \`disciplines\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`testimonials_rels_order_idx\` ON \`testimonials_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_rels_parent_idx\` ON \`testimonials_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_rels_path_idx\` ON \`testimonials_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_rels_disciplines_id_idx\` ON \`testimonials_rels\` (\`disciplines_id\`);`)
  await db.run(sql`CREATE TABLE \`partners\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`logo_id\` integer,
  	\`type\` text NOT NULL,
  	\`url\` text,
  	\`show_on_homepage\` integer DEFAULT false,
  	\`sort_order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`partners_logo_idx\` ON \`partners\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`partners_updated_at_idx\` ON \`partners\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`partners_created_at_idx\` ON \`partners\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`faq_items\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`category\` text,
  	\`show_on_pricing\` integer DEFAULT false,
  	\`sort_order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`faq_items_updated_at_idx\` ON \`faq_items\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`faq_items_created_at_idx\` ON \`faq_items\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pricing_tiers_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`feature\` text NOT NULL,
  	\`included\` text DEFAULT 'yes',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pricing_tiers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pricing_tiers_features_order_idx\` ON \`pricing_tiers_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pricing_tiers_features_parent_id_idx\` ON \`pricing_tiers_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pricing_tiers\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`price_amount\` numeric,
  	\`price_period\` text DEFAULT 'month',
  	\`price_custom_label\` text,
  	\`tagline\` text,
  	\`description\` text,
  	\`badge\` text,
  	\`annual_price_amount\` numeric,
  	\`cta_label\` text DEFAULT 'Get Started',
  	\`cta_href\` text,
  	\`highlighted\` integer DEFAULT false,
  	\`sort_order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`pricing_tiers_updated_at_idx\` ON \`pricing_tiers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pricing_tiers_created_at_idx\` ON \`pricing_tiers\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tools\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text,
  	\`tool_url\` text,
  	\`pricing_tier_id\` integer,
  	\`status\` text DEFAULT 'available',
  	\`icon_name\` text,
  	\`icon_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`pricing_tier_id\`) REFERENCES \`pricing_tiers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tools_slug_idx\` ON \`tools\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`tools_pricing_tier_idx\` ON \`tools\` (\`pricing_tier_id\`);`)
  await db.run(sql`CREATE INDEX \`tools_icon_idx\` ON \`tools\` (\`icon_id\`);`)
  await db.run(sql`CREATE INDEX \`tools_updated_at_idx\` ON \`tools\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tools_created_at_idx\` ON \`tools\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tools_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`disciplines_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tools\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`disciplines_id\`) REFERENCES \`disciplines\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tools_rels_order_idx\` ON \`tools_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`tools_rels_parent_idx\` ON \`tools_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tools_rels_path_idx\` ON \`tools_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`tools_rels_disciplines_id_idx\` ON \`tools_rels\` (\`disciplines_id\`);`)
  await db.run(sql`CREATE TABLE \`redirects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`from\` text NOT NULL,
  	\`to\` text NOT NULL,
  	\`type\` text DEFAULT '301',
  	\`source_domain\` text DEFAULT 'withella',
  	\`active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`redirects_from_idx\` ON \`redirects\` (\`from\`);`)
  await db.run(sql`CREATE INDEX \`redirects_updated_at_idx\` ON \`redirects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`redirects_created_at_idx\` ON \`redirects\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`solutions_blocks_content_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`body\` text,
  	\`media_id\` integer,
  	\`media_position\` text DEFAULT 'right',
  	\`link_label\` text,
  	\`link_href\` text,
  	\`link_style\` text DEFAULT 'button',
  	\`badge\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`solutions_blocks_content_section_order_idx\` ON \`solutions_blocks_content_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_content_section_parent_id_idx\` ON \`solutions_blocks_content_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_content_section_path_idx\` ON \`solutions_blocks_content_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_content_section_media_idx\` ON \`solutions_blocks_content_section\` (\`media_id\`);`)
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
  await db.run(sql`CREATE TABLE \`solutions_blocks_card_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text,
  	\`icon_name\` text,
  	\`icon_id\` integer,
  	\`link_label\` text,
  	\`link_href\` text,
  	\`anchor_target\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`solutions_blocks_card_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`solutions_blocks_card_grid_cards_order_idx\` ON \`solutions_blocks_card_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_card_grid_cards_parent_id_idx\` ON \`solutions_blocks_card_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_card_grid_cards_icon_idx\` ON \`solutions_blocks_card_grid_cards\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`solutions_blocks_card_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`variant\` text DEFAULT 'feature',
  	\`columns\` text DEFAULT '3',
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`solutions_blocks_card_grid_order_idx\` ON \`solutions_blocks_card_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_card_grid_parent_id_idx\` ON \`solutions_blocks_card_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_card_grid_path_idx\` ON \`solutions_blocks_card_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`solutions_blocks_testimonial_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`layout\` text DEFAULT 'single',
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`solutions_blocks_testimonial_block_order_idx\` ON \`solutions_blocks_testimonial_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_testimonial_block_parent_id_idx\` ON \`solutions_blocks_testimonial_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_testimonial_block_path_idx\` ON \`solutions_blocks_testimonial_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`solutions_blocks_cta_section\` (
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
  	\`bg_style\` text DEFAULT 'forest',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`solutions_blocks_cta_section_order_idx\` ON \`solutions_blocks_cta_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_cta_section_parent_id_idx\` ON \`solutions_blocks_cta_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_cta_section_path_idx\` ON \`solutions_blocks_cta_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`solutions_blocks_feature_deep_dive_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text,
  	\`visual_id\` integer,
  	\`visual_alt\` text,
  	\`testimonial_id\` integer,
  	\`link_label\` text,
  	\`link_href\` text,
  	FOREIGN KEY (\`visual_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`testimonial_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`solutions_blocks_feature_deep_dive\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`solutions_blocks_feature_deep_dive_sections_order_idx\` ON \`solutions_blocks_feature_deep_dive_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_feature_deep_dive_sections_parent_id_idx\` ON \`solutions_blocks_feature_deep_dive_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_feature_deep_dive_sections_visual_idx\` ON \`solutions_blocks_feature_deep_dive_sections\` (\`visual_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_feature_deep_dive_sections_testimonial_idx\` ON \`solutions_blocks_feature_deep_dive_sections\` (\`testimonial_id\`);`)
  await db.run(sql`CREATE TABLE \`solutions_blocks_feature_deep_dive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_id\` text,
  	\`section_label\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`solutions_blocks_feature_deep_dive_order_idx\` ON \`solutions_blocks_feature_deep_dive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_feature_deep_dive_parent_id_idx\` ON \`solutions_blocks_feature_deep_dive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_feature_deep_dive_path_idx\` ON \`solutions_blocks_feature_deep_dive\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`solutions_blocks_numbered_steps_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`solutions_blocks_numbered_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`solutions_blocks_numbered_steps_steps_order_idx\` ON \`solutions_blocks_numbered_steps_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_numbered_steps_steps_parent_id_idx\` ON \`solutions_blocks_numbered_steps_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_numbered_steps_steps_image_idx\` ON \`solutions_blocks_numbered_steps_steps\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`solutions_blocks_numbered_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`solutions_blocks_numbered_steps_order_idx\` ON \`solutions_blocks_numbered_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_numbered_steps_parent_id_idx\` ON \`solutions_blocks_numbered_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_numbered_steps_path_idx\` ON \`solutions_blocks_numbered_steps\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`solutions_blocks_form_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`embed_type\` text,
  	\`form_id\` text,
  	\`embed_code\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`solutions_blocks_form_embed_order_idx\` ON \`solutions_blocks_form_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_form_embed_parent_id_idx\` ON \`solutions_blocks_form_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_form_embed_path_idx\` ON \`solutions_blocks_form_embed\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`solutions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`discipline_id\` integer NOT NULL,
  	\`tagline\` text,
  	\`status\` text DEFAULT 'waitlist',
  	\`is_beachhead\` integer DEFAULT false,
  	\`hero_headline\` text NOT NULL,
  	\`hero_headline_animation\` text DEFAULT 'word-by-word',
  	\`hero_headline_line2\` text,
  	\`hero_headline_animation2\` text DEFAULT 'blur-fade',
  	\`hero_subheadline\` text,
  	\`hero_primary_cta_label\` text,
  	\`hero_primary_cta_href\` text,
  	\`hero_secondary_cta_label\` text,
  	\`hero_secondary_cta_href\` text,
  	\`hero_visual_id\` integer,
  	\`hero_style\` text DEFAULT 'default',
  	\`hero_highlight_text\` text,
  	\`hero_highlight_color\` text DEFAULT 'goldenrod',
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`discipline_id\`) REFERENCES \`disciplines\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_visual_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`solutions_slug_idx\` ON \`solutions\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`solutions_discipline_idx\` ON \`solutions\` (\`discipline_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_hero_hero_visual_idx\` ON \`solutions\` (\`hero_visual_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_meta_meta_image_idx\` ON \`solutions\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_updated_at_idx\` ON \`solutions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`solutions_created_at_idx\` ON \`solutions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`solutions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`testimonials_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`solutions_rels_order_idx\` ON \`solutions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_rels_parent_idx\` ON \`solutions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_rels_path_idx\` ON \`solutions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`solutions_rels_testimonials_id_idx\` ON \`solutions_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_metrics_order_idx\` ON \`case_studies_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_metrics_parent_id_idx\` ON \`case_studies_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`headline\` text,
  	\`summary\` text,
  	\`body\` text,
  	\`client_descriptor\` text,
  	\`client_firm_size\` text,
  	\`discipline_id\` integer,
  	\`featured\` integer DEFAULT false,
  	\`approved\` integer DEFAULT false,
  	\`cover_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`discipline_id\`) REFERENCES \`disciplines\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_discipline_idx\` ON \`case_studies\` (\`discipline_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_cover_image_idx\` ON \`case_studies\` (\`cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_updated_at_idx\` ON \`case_studies\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_created_at_idx\` ON \`case_studies\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`vanguard_events\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`date\` text NOT NULL,
  	\`location_type\` text DEFAULT 'virtual',
  	\`location_address\` text,
  	\`location_city\` text,
  	\`location_platform\` text,
  	\`registration_url\` text,
  	\`capacity\` numeric,
  	\`status\` text DEFAULT 'upcoming' NOT NULL,
  	\`vanguard_only\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`vanguard_events_updated_at_idx\` ON \`vanguard_events\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`vanguard_events_created_at_idx\` ON \`vanguard_events\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_mcp_api_keys\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`user_id\` integer NOT NULL,
  	\`label\` text,
  	\`description\` text,
  	\`posts_find\` integer DEFAULT false,
  	\`posts_create\` integer DEFAULT false,
  	\`posts_update\` integer DEFAULT false,
  	\`posts_delete\` integer DEFAULT false,
  	\`pages_find\` integer DEFAULT false,
  	\`pages_create\` integer DEFAULT false,
  	\`pages_update\` integer DEFAULT false,
  	\`pages_delete\` integer DEFAULT false,
  	\`landing_pages_find\` integer DEFAULT false,
  	\`landing_pages_create\` integer DEFAULT false,
  	\`landing_pages_update\` integer DEFAULT false,
  	\`landing_pages_delete\` integer DEFAULT false,
  	\`team_members_find\` integer DEFAULT false,
  	\`team_members_create\` integer DEFAULT false,
  	\`team_members_update\` integer DEFAULT false,
  	\`team_members_delete\` integer DEFAULT false,
  	\`categories_find\` integer DEFAULT false,
  	\`categories_create\` integer DEFAULT false,
  	\`categories_update\` integer DEFAULT false,
  	\`categories_delete\` integer DEFAULT false,
  	\`solutions_find\` integer DEFAULT false,
  	\`solutions_create\` integer DEFAULT false,
  	\`solutions_update\` integer DEFAULT false,
  	\`solutions_delete\` integer DEFAULT false,
  	\`testimonials_find\` integer DEFAULT false,
  	\`testimonials_create\` integer DEFAULT false,
  	\`testimonials_update\` integer DEFAULT false,
  	\`testimonials_delete\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`enable_a_p_i_key\` integer,
  	\`api_key\` text,
  	\`api_key_index\` text,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_mcp_api_keys_user_idx\` ON \`payload_mcp_api_keys\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_mcp_api_keys_updated_at_idx\` ON \`payload_mcp_api_keys\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_mcp_api_keys_created_at_idx\` ON \`payload_mcp_api_keys\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`posts_id\` integer,
  	\`pages_id\` integer,
  	\`landing_pages_id\` integer,
  	\`categories_id\` integer,
  	\`disciplines_id\` integer,
  	\`team_members_id\` integer,
  	\`testimonials_id\` integer,
  	\`partners_id\` integer,
  	\`faq_items_id\` integer,
  	\`pricing_tiers_id\` integer,
  	\`tools_id\` integer,
  	\`redirects_id\` integer,
  	\`solutions_id\` integer,
  	\`case_studies_id\` integer,
  	\`vanguard_events_id\` integer,
  	\`payload_mcp_api_keys_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`landing_pages_id\`) REFERENCES \`landing_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`disciplines_id\`) REFERENCES \`disciplines\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`team_members_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`partners_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faq_items_id\`) REFERENCES \`faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pricing_tiers_id\`) REFERENCES \`pricing_tiers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tools_id\`) REFERENCES \`tools\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`redirects_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`solutions_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`case_studies_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`vanguard_events_id\`) REFERENCES \`vanguard_events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`payload_mcp_api_keys_id\`) REFERENCES \`payload_mcp_api_keys\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_landing_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`landing_pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_disciplines_id_idx\` ON \`payload_locked_documents_rels\` (\`disciplines_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_team_members_id_idx\` ON \`payload_locked_documents_rels\` (\`team_members_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_testimonials_id_idx\` ON \`payload_locked_documents_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_partners_id_idx\` ON \`payload_locked_documents_rels\` (\`partners_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_faq_items_id_idx\` ON \`payload_locked_documents_rels\` (\`faq_items_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pricing_tiers_id_idx\` ON \`payload_locked_documents_rels\` (\`pricing_tiers_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tools_id_idx\` ON \`payload_locked_documents_rels\` (\`tools_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_redirects_id_idx\` ON \`payload_locked_documents_rels\` (\`redirects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_solutions_id_idx\` ON \`payload_locked_documents_rels\` (\`solutions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_case_studies_id_idx\` ON \`payload_locked_documents_rels\` (\`case_studies_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_vanguard_events_id_idx\` ON \`payload_locked_documents_rels\` (\`vanguard_events_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_payload_mcp_api_keys_id_idx\` ON \`payload_locked_documents_rels\` (\`payload_mcp_api_keys_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`payload_mcp_api_keys_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`payload_mcp_api_keys_id\`) REFERENCES \`payload_mcp_api_keys\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_payload_mcp_api_keys_id_idx\` ON \`payload_preferences_rels\` (\`payload_mcp_api_keys_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`site_name\` text DEFAULT 'ELLA',
  	\`logo_id\` integer,
  	\`logomark_id\` integer,
  	\`og_image_id\` integer,
  	\`social_links_linked_in\` text,
  	\`social_links_twitter\` text,
  	\`social_links_youtube\` text,
  	\`announcement_bar_enabled\` integer DEFAULT false,
  	\`announcement_bar_message\` text,
  	\`announcement_bar_link_label\` text,
  	\`announcement_bar_link_href\` text,
  	\`announcement_bar_style\` text DEFAULT 'forest',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`logomark_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_logo_idx\` ON \`site_settings\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_logomark_idx\` ON \`site_settings\` (\`logomark_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_og_image_idx\` ON \`site_settings\` (\`og_image_id\`);`)
  await db.run(sql`CREATE TABLE \`navigation_primary_nav_dropdown_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`href\` text,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navigation_primary_nav\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navigation_primary_nav_dropdown_items_order_idx\` ON \`navigation_primary_nav_dropdown_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navigation_primary_nav_dropdown_items_parent_id_idx\` ON \`navigation_primary_nav_dropdown_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`navigation_primary_nav\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text,
  	\`type\` text DEFAULT 'link',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navigation_primary_nav_order_idx\` ON \`navigation_primary_nav\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navigation_primary_nav_parent_id_idx\` ON \`navigation_primary_nav\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`navigation\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`primary_cta_label\` text DEFAULT 'Get Started',
  	\`primary_cta_href\` text DEFAULT '/get-started',
  	\`secondary_cta_label\` text DEFAULT 'Book a Demo',
  	\`secondary_cta_href\` text DEFAULT '/demo',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`footer_columns_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`link_type\` text DEFAULT 'external',
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_columns_links_order_idx\` ON \`footer_columns_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_links_parent_id_idx\` ON \`footer_columns_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_columns_order_idx\` ON \`footer_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_columns_parent_id_idx\` ON \`footer_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_legal_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_legal_links_order_idx\` ON \`footer_legal_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_legal_links_parent_id_idx\` ON \`footer_legal_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`bg_style\` text DEFAULT 'brand-black',
  	\`logomark_id\` integer,
  	\`footer_logo_id\` integer,
  	\`footer_logo_color\` text,
  	\`footer_logo_opacity\` numeric,
  	\`footer_logo_clip_percent\` numeric DEFAULT 25,
  	\`description\` text DEFAULT 'ELLA turns trust into action with tools built for advisor-led transitions.',
  	\`newsletter_section_enabled\` integer DEFAULT true,
  	\`newsletter_section_heading\` text DEFAULT 'Stay current',
  	\`newsletter_section_subheading\` text,
  	\`newsletter_section_placeholder\` text DEFAULT 'Your email address',
  	\`newsletter_section_button_label\` text DEFAULT 'Subscribe',
  	\`copyright_text\` text DEFAULT '© ELLA. All rights reserved.',
  	\`easter_egg_enabled\` integer DEFAULT false,
  	\`easter_egg_background_image_id\` integer,
  	\`easter_egg_text\` text DEFAULT 'Believe in Main Street',
  	\`easter_egg_local_image_id\` integer,
  	\`easter_egg_local_text\` text,
  	\`easter_egg_height\` numeric DEFAULT 400,
  	\`status_badge_enabled\` integer DEFAULT false,
  	\`status_badge_embed_html\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logomark_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`footer_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`easter_egg_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`easter_egg_local_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_logomark_idx\` ON \`footer\` (\`logomark_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_footer_logo_idx\` ON \`footer\` (\`footer_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_easter_egg_easter_egg_background_image_idx\` ON \`footer\` (\`easter_egg_background_image_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_easter_egg_easter_egg_local_image_idx\` ON \`footer\` (\`easter_egg_local_image_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`landing_pages_id\` integer,
  	\`solutions_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`landing_pages_id\`) REFERENCES \`landing_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`solutions_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_rels_order_idx\` ON \`footer_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_parent_idx\` ON \`footer_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_path_idx\` ON \`footer_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_pages_id_idx\` ON \`footer_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_landing_pages_id_idx\` ON \`footer_rels\` (\`landing_pages_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_solutions_id_idx\` ON \`footer_rels\` (\`solutions_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts_rels\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_content_section\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_card_grid_cards_capabilities\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_card_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_card_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonial_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_section\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_credibility_strip_stats\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_credibility_strip\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_feature_deep_dive_sections\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_feature_deep_dive\`;`)
  await db.run(sql`DROP TABLE \`cmp_tbl_columns\`;`)
  await db.run(sql`DROP TABLE \`cmp_tbl_rows_values\`;`)
  await db.run(sql`DROP TABLE \`cmp_tbl_rows\`;`)
  await db.run(sql`DROP TABLE \`cmp_tbl\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_trust_security_sections\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_trust_security\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_numbered_steps_steps\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_numbered_steps\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_solutions_selector\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq_accordion\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_pricing_journey\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_newsletter_capture\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_form_embed\`;`)
  await db.run(sql`DROP TABLE \`bfr_aftr_before_points\`;`)
  await db.run(sql`DROP TABLE \`bfr_aftr_after_points\`;`)
  await db.run(sql`DROP TABLE \`bfr_aftr\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_bridge_section_quotes\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_bridge_section\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_product_features_items_badges\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_product_features_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_product_features\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_squeeze_section_quotes\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_squeeze_section_pressure_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_squeeze_section_erosion_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_squeeze_section\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_dilemma_section\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_advisor_personas_personas\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_advisor_personas\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_content_section\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_card_grid_cards_capabilities\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_card_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_card_grid\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_testimonial_block\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_cta_section\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_credibility_strip_stats\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_credibility_strip\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_feature_deep_dive_sections\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_feature_deep_dive\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_trust_security_sections\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_trust_security\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_numbered_steps_steps\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_numbered_steps\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_solutions_selector\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_faq_accordion\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_newsletter_capture\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_form_embed\`;`)
  await db.run(sql`DROP TABLE \`landing_pages\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_rels\`;`)
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`DROP TABLE \`disciplines\`;`)
  await db.run(sql`DROP TABLE \`team_members\`;`)
  await db.run(sql`DROP TABLE \`testimonials\`;`)
  await db.run(sql`DROP TABLE \`testimonials_rels\`;`)
  await db.run(sql`DROP TABLE \`partners\`;`)
  await db.run(sql`DROP TABLE \`faq_items\`;`)
  await db.run(sql`DROP TABLE \`pricing_tiers_features\`;`)
  await db.run(sql`DROP TABLE \`pricing_tiers\`;`)
  await db.run(sql`DROP TABLE \`tools\`;`)
  await db.run(sql`DROP TABLE \`tools_rels\`;`)
  await db.run(sql`DROP TABLE \`redirects\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_content_section\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_card_grid_cards_capabilities\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_card_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_card_grid\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_testimonial_block\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_cta_section\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_feature_deep_dive_sections\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_feature_deep_dive\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_numbered_steps_steps\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_numbered_steps\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_form_embed\`;`)
  await db.run(sql`DROP TABLE \`solutions\`;`)
  await db.run(sql`DROP TABLE \`solutions_rels\`;`)
  await db.run(sql`DROP TABLE \`case_studies_metrics\`;`)
  await db.run(sql`DROP TABLE \`case_studies\`;`)
  await db.run(sql`DROP TABLE \`vanguard_events\`;`)
  await db.run(sql`DROP TABLE \`payload_mcp_api_keys\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`navigation_primary_nav_dropdown_items\`;`)
  await db.run(sql`DROP TABLE \`navigation_primary_nav\`;`)
  await db.run(sql`DROP TABLE \`navigation\`;`)
  await db.run(sql`DROP TABLE \`footer_columns_links\`;`)
  await db.run(sql`DROP TABLE \`footer_columns\`;`)
  await db.run(sql`DROP TABLE \`footer_legal_links\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`DROP TABLE \`footer_rels\`;`)
}
