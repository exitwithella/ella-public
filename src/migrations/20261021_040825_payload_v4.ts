import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_rels_order_idx\` ON \`users_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`users_rels_parent_idx\` ON \`users_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`users_rels_path_idx\` ON \`users_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`users_rels_users_id_idx\` ON \`users_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_users_v_version_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_users_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_users_v_version_sessions_order_idx\` ON \`_users_v_version_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_sessions_parent_id_idx\` ON \`_users_v_version_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_users_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_clerk_id\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version_api_key\` text,
  	\`version_api_key_last4\` text,
  	\`version_api_key_index\` text,
  	\`version_email\` text NOT NULL,
  	\`version_reset_password_token\` text,
  	\`version_reset_password_expiration\` text,
  	\`version_salt\` text,
  	\`version_hash\` text,
  	\`version_reset_password_requested_at\` text,
  	\`version_login_attempts\` numeric DEFAULT 0,
  	\`version_lock_until\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_users_v_parent_idx\` ON \`_users_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_clerk_id_idx\` ON \`_users_v\` (\`version_clerk_id\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_updated_at_idx\` ON \`_users_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_created_at_idx\` ON \`_users_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_email_idx\` ON \`_users_v\` (\`version_email\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_created_at_idx\` ON \`_users_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_updated_at_idx\` ON \`_users_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_users_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_users_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_users_v_rels_order_idx\` ON \`_users_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_rels_parent_idx\` ON \`_users_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_rels_path_idx\` ON \`_users_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_rels_users_id_idx\` ON \`_users_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`media_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`media_rels_order_idx\` ON \`media_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`media_rels_parent_idx\` ON \`media_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`media_rels_path_idx\` ON \`media_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`media_rels_users_id_idx\` ON \`media_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_media_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_alt\` text NOT NULL,
  	\`version_caption\` text,
  	\`version_credit\` text,
  	\`version_category\` text,
  	\`version_prefix\` text DEFAULT '',
  	\`version__objectkey\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version_url\` text,
  	\`version_thumbnail_u_r_l\` text,
  	\`version_filename\` text,
  	\`version_mime_type\` text,
  	\`version_filesize\` numeric,
  	\`version_width\` numeric,
  	\`version_height\` numeric,
  	\`version_original_filename\` text,
  	\`version_original_url\` text,
  	\`version_original_mime_type\` text,
  	\`version_original_filesize\` numeric,
  	\`version_original_width\` numeric,
  	\`version_original_height\` numeric,
  	\`version_original_prefix\` text,
  	\`version_original__objectkey\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_media_v_parent_idx\` ON \`_media_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_updated_at_idx\` ON \`_media_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_created_at_idx\` ON \`_media_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_filename_idx\` ON \`_media_v\` (\`version_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_original_version_original_filename_idx\` ON \`_media_v\` (\`version_original_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_created_at_idx\` ON \`_media_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_updated_at_idx\` ON \`_media_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_media_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_media_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_media_v_rels_order_idx\` ON \`_media_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_rels_parent_idx\` ON \`_media_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_rels_path_idx\` ON \`_media_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_rels_users_id_idx\` ON \`_media_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text NOT NULL,
  	\`version_slug\` text NOT NULL,
  	\`version_excerpt\` text,
  	\`version_published_date\` text NOT NULL,
  	\`version_status\` text DEFAULT 'draft',
  	\`version_author_id\` integer,
  	\`version_featured_image_id\` integer,
  	\`version_tier\` text DEFAULT 'standard',
  	\`version_legacy_slug\` text,
  	\`version_show_newsletter_c_t_a\` integer DEFAULT true,
  	\`version_content\` text,
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_author_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_author_idx\` ON \`_posts_v\` (\`version_author_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_featured_image_idx\` ON \`_posts_v\` (\`version_featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_meta_version_meta_image_idx\` ON \`_posts_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	\`disciplines_id\` integer,
  	\`posts_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`disciplines_id\`) REFERENCES \`disciplines\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_order_idx\` ON \`_posts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_parent_idx\` ON \`_posts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_path_idx\` ON \`_posts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_categories_id_idx\` ON \`_posts_v_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_disciplines_id_idx\` ON \`_posts_v_rels\` (\`disciplines_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_posts_id_idx\` ON \`_posts_v_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_users_id_idx\` ON \`_posts_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_content_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`layout\` text DEFAULT 'default',
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
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_section_order_idx\` ON \`_pages_v_blocks_content_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_section_parent_id_idx\` ON \`_pages_v_blocks_content_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_section_path_idx\` ON \`_pages_v_blocks_content_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_section_media_idx\` ON \`_pages_v_blocks_content_section\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_card_grid_cards_capabilities\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_card_grid_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_card_grid_cards_capabilities_order_idx\` ON \`_pages_v_blocks_card_grid_cards_capabilities\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_card_grid_cards_capabilities_parent_id_idx\` ON \`_pages_v_blocks_card_grid_cards_capabilities\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_card_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text,
  	\`icon_name\` text,
  	\`icon_id\` integer,
  	\`link_label\` text,
  	\`link_href\` text,
  	\`anchor_target\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_card_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_card_grid_cards_order_idx\` ON \`_pages_v_blocks_card_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_card_grid_cards_parent_id_idx\` ON \`_pages_v_blocks_card_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_card_grid_cards_icon_idx\` ON \`_pages_v_blocks_card_grid_cards\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_card_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`variant\` text DEFAULT 'feature',
  	\`columns\` text DEFAULT '3',
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_card_grid_order_idx\` ON \`_pages_v_blocks_card_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_card_grid_parent_id_idx\` ON \`_pages_v_blocks_card_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_card_grid_path_idx\` ON \`_pages_v_blocks_card_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_testimonial_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`layout\` text DEFAULT 'single',
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonial_block_order_idx\` ON \`_pages_v_blocks_testimonial_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonial_block_parent_id_idx\` ON \`_pages_v_blocks_testimonial_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_testimonial_block_path_idx\` ON \`_pages_v_blocks_testimonial_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`headline\` text,
  	\`body\` text,
  	\`primary_cta_label\` text,
  	\`primary_cta_href\` text,
  	\`secondary_cta_label\` text,
  	\`secondary_cta_href\` text,
  	\`closing_line\` text,
  	\`microcopy\` text,
  	\`bg_style\` text DEFAULT 'forest',
  	\`cover_image_image_id\` integer,
  	\`cover_image_min_height\` text DEFAULT 'md',
  	\`cover_image_object_position\` text DEFAULT 'center',
  	\`cover_image_overlay_opacity\` text DEFAULT '60',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`cover_image_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_section_order_idx\` ON \`_pages_v_blocks_cta_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_section_parent_id_idx\` ON \`_pages_v_blocks_cta_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_section_path_idx\` ON \`_pages_v_blocks_cta_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_section_cover_image_cover_image_imag_idx\` ON \`_pages_v_blocks_cta_section\` (\`cover_image_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_credibility_strip_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_credibility_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_credibility_strip_stats_order_idx\` ON \`_pages_v_blocks_credibility_strip_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_credibility_strip_stats_parent_id_idx\` ON \`_pages_v_blocks_credibility_strip_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_credibility_strip\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'logos',
  	\`statement\` text,
  	\`label\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_credibility_strip_order_idx\` ON \`_pages_v_blocks_credibility_strip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_credibility_strip_parent_id_idx\` ON \`_pages_v_blocks_credibility_strip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_credibility_strip_path_idx\` ON \`_pages_v_blocks_credibility_strip\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_feature_deep_dive_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text,
  	\`visual_id\` integer,
  	\`visual_alt\` text,
  	\`testimonial_id\` integer,
  	\`link_label\` text,
  	\`link_href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`visual_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`testimonial_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_feature_deep_dive\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_deep_dive_sections_order_idx\` ON \`_pages_v_blocks_feature_deep_dive_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_deep_dive_sections_parent_id_idx\` ON \`_pages_v_blocks_feature_deep_dive_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_deep_dive_sections_visual_idx\` ON \`_pages_v_blocks_feature_deep_dive_sections\` (\`visual_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_deep_dive_sections_testimonial_idx\` ON \`_pages_v_blocks_feature_deep_dive_sections\` (\`testimonial_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_feature_deep_dive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_id\` text,
  	\`section_label\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_deep_dive_order_idx\` ON \`_pages_v_blocks_feature_deep_dive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_deep_dive_parent_id_idx\` ON \`_pages_v_blocks_feature_deep_dive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_deep_dive_path_idx\` ON \`_pages_v_blocks_feature_deep_dive\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_cmp_tbl_v_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`subheading\` text,
  	\`highlighted\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_cmp_tbl_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_cmp_tbl_v_columns_order_idx\` ON \`_cmp_tbl_v_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_cmp_tbl_v_columns_parent_id_idx\` ON \`_cmp_tbl_v_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_cmp_tbl_v_rows_values\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text,
  	\`indicator\` text DEFAULT 'text',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_cmp_tbl_v_rows\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_cmp_tbl_v_rows_values_order_idx\` ON \`_cmp_tbl_v_rows_values\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_cmp_tbl_v_rows_values_parent_id_idx\` ON \`_cmp_tbl_v_rows_values\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_cmp_tbl_v_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_cmp_tbl_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_cmp_tbl_v_rows_order_idx\` ON \`_cmp_tbl_v_rows\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_cmp_tbl_v_rows_parent_id_idx\` ON \`_cmp_tbl_v_rows\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_cmp_tbl_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_cmp_tbl_v_order_idx\` ON \`_cmp_tbl_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_cmp_tbl_v_parent_id_idx\` ON \`_cmp_tbl_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_cmp_tbl_v_path_idx\` ON \`_cmp_tbl_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_trust_security_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_trust_security\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_trust_security_sections_order_idx\` ON \`_pages_v_blocks_trust_security_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_trust_security_sections_parent_id_idx\` ON \`_pages_v_blocks_trust_security_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_trust_security\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`intro\` text,
  	\`link_label\` text,
  	\`link_href\` text,
  	\`pattern_svg_id\` integer,
  	\`pattern_color\` text,
  	\`background_color\` text,
  	\`content_background_color\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`pattern_svg_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_trust_security_order_idx\` ON \`_pages_v_blocks_trust_security\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_trust_security_parent_id_idx\` ON \`_pages_v_blocks_trust_security\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_trust_security_path_idx\` ON \`_pages_v_blocks_trust_security\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_trust_security_pattern_svg_idx\` ON \`_pages_v_blocks_trust_security\` (\`pattern_svg_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_numbered_steps_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_numbered_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_numbered_steps_steps_order_idx\` ON \`_pages_v_blocks_numbered_steps_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_numbered_steps_steps_parent_id_idx\` ON \`_pages_v_blocks_numbered_steps_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_numbered_steps_steps_image_idx\` ON \`_pages_v_blocks_numbered_steps_steps\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_numbered_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_numbered_steps_order_idx\` ON \`_pages_v_blocks_numbered_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_numbered_steps_parent_id_idx\` ON \`_pages_v_blocks_numbered_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_numbered_steps_path_idx\` ON \`_pages_v_blocks_numbered_steps\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_solutions_selector\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_solutions_selector_order_idx\` ON \`_pages_v_blocks_solutions_selector\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_solutions_selector_parent_id_idx\` ON \`_pages_v_blocks_solutions_selector\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_solutions_selector_path_idx\` ON \`_pages_v_blocks_solutions_selector\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_faq_accordion\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`filter_by_category\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_faq_accordion_order_idx\` ON \`_pages_v_blocks_faq_accordion\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_faq_accordion_parent_id_idx\` ON \`_pages_v_blocks_faq_accordion\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_faq_accordion_path_idx\` ON \`_pages_v_blocks_faq_accordion\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_pricing_journey\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`show_toggle\` integer DEFAULT false,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_pricing_journey_order_idx\` ON \`_pages_v_blocks_pricing_journey\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_pricing_journey_parent_id_idx\` ON \`_pages_v_blocks_pricing_journey\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_pricing_journey_path_idx\` ON \`_pages_v_blocks_pricing_journey\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_newsletter_capture_segment_ids\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`segment_id\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_newsletter_capture\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_newsletter_capture_segment_ids_order_idx\` ON \`_pages_v_blocks_newsletter_capture_segment_ids\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_newsletter_capture_segment_ids_parent_id_idx\` ON \`_pages_v_blocks_newsletter_capture_segment_ids\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_newsletter_capture\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`subheading\` text,
  	\`placeholder\` text DEFAULT 'Your email address',
  	\`button_label\` text DEFAULT 'Subscribe',
  	\`success_message\` text DEFAULT 'You''re in. We''ll be in touch.',
  	\`microcopy\` text,
  	\`source\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_newsletter_capture_order_idx\` ON \`_pages_v_blocks_newsletter_capture\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_newsletter_capture_parent_id_idx\` ON \`_pages_v_blocks_newsletter_capture\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_newsletter_capture_path_idx\` ON \`_pages_v_blocks_newsletter_capture\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_form_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`embed_type\` text,
  	\`form_id\` text,
  	\`embed_code\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_embed_order_idx\` ON \`_pages_v_blocks_form_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_embed_parent_id_idx\` ON \`_pages_v_blocks_form_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_embed_path_idx\` ON \`_pages_v_blocks_form_embed\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_bfr_aftr_v_before_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bfr_aftr_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_bfr_aftr_v_before_points_order_idx\` ON \`_bfr_aftr_v_before_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_bfr_aftr_v_before_points_parent_id_idx\` ON \`_bfr_aftr_v_before_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_bfr_aftr_v_after_points\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bfr_aftr_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_bfr_aftr_v_after_points_order_idx\` ON \`_bfr_aftr_v_after_points\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_bfr_aftr_v_after_points_parent_id_idx\` ON \`_bfr_aftr_v_after_points\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_bfr_aftr_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`before_label\` text DEFAULT 'Without ELLA',
  	\`before_image_id\` integer,
  	\`before_caption\` text,
  	\`after_label\` text DEFAULT 'With ELLA',
  	\`after_image_id\` integer,
  	\`after_caption\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`before_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`after_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_bfr_aftr_v_order_idx\` ON \`_bfr_aftr_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_bfr_aftr_v_parent_id_idx\` ON \`_bfr_aftr_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_bfr_aftr_v_path_idx\` ON \`_bfr_aftr_v\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_bfr_aftr_v_before_before_image_idx\` ON \`_bfr_aftr_v\` (\`before_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_bfr_aftr_v_after_after_image_idx\` ON \`_bfr_aftr_v\` (\`after_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_bridge_section_quotes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`attribution\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_bridge_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_bridge_section_quotes_order_idx\` ON \`_pages_v_blocks_bridge_section_quotes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_bridge_section_quotes_parent_id_idx\` ON \`_pages_v_blocks_bridge_section_quotes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_bridge_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`heading\` text,
  	\`heading_style\` text DEFAULT 'display',
  	\`body_style\` text DEFAULT 'body',
  	\`body\` text,
  	\`closer\` text,
  	\`link_label\` text,
  	\`link_href\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`cover_image_image_id\` integer,
  	\`cover_image_min_height\` text DEFAULT 'md',
  	\`cover_image_object_position\` text DEFAULT 'center',
  	\`cover_image_overlay_opacity\` text DEFAULT '60',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`cover_image_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_bridge_section_order_idx\` ON \`_pages_v_blocks_bridge_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_bridge_section_parent_id_idx\` ON \`_pages_v_blocks_bridge_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_bridge_section_path_idx\` ON \`_pages_v_blocks_bridge_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_bridge_section_cover_image_cover_image_i_idx\` ON \`_pages_v_blocks_bridge_section\` (\`cover_image_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_product_features_items_badges\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_product_features_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_product_features_items_badges_order_idx\` ON \`_pages_v_blocks_product_features_items_badges\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_product_features_items_badges_parent_id_idx\` ON \`_pages_v_blocks_product_features_items_badges\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_product_features_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`screenshot_id\` integer NOT NULL,
  	\`screenshot_fit\` text DEFAULT 'contain',
  	\`screenshot_position\` text DEFAULT 'center',
  	\`_uuid\` text,
  	FOREIGN KEY (\`screenshot_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_product_features\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_product_features_items_order_idx\` ON \`_pages_v_blocks_product_features_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_product_features_items_parent_id_idx\` ON \`_pages_v_blocks_product_features_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_product_features_items_screenshot_idx\` ON \`_pages_v_blocks_product_features_items\` (\`screenshot_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_product_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`show_bottom_border\` integer DEFAULT true,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_product_features_order_idx\` ON \`_pages_v_blocks_product_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_product_features_parent_id_idx\` ON \`_pages_v_blocks_product_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_product_features_path_idx\` ON \`_pages_v_blocks_product_features\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_squeeze_section_quotes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`attribution\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_squeeze_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_squeeze_section_quotes_order_idx\` ON \`_pages_v_blocks_squeeze_section_quotes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_squeeze_section_quotes_parent_id_idx\` ON \`_pages_v_blocks_squeeze_section_quotes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_squeeze_section_pressure_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_squeeze_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_squeeze_section_pressure_items_order_idx\` ON \`_pages_v_blocks_squeeze_section_pressure_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_squeeze_section_pressure_items_parent_id_idx\` ON \`_pages_v_blocks_squeeze_section_pressure_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_squeeze_section_erosion_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_squeeze_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_squeeze_section_erosion_items_order_idx\` ON \`_pages_v_blocks_squeeze_section_erosion_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_squeeze_section_erosion_items_parent_id_idx\` ON \`_pages_v_blocks_squeeze_section_erosion_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_squeeze_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`heading\` text NOT NULL,
  	\`body\` text,
  	\`closer\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_squeeze_section_order_idx\` ON \`_pages_v_blocks_squeeze_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_squeeze_section_parent_id_idx\` ON \`_pages_v_blocks_squeeze_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_squeeze_section_path_idx\` ON \`_pages_v_blocks_squeeze_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_dilemma_section_table_data\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`dim\` text NOT NULL,
  	\`old\` text NOT NULL,
  	\`rigid\` text NOT NULL,
  	\`patch\` text NOT NULL,
  	\`ella\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_dilemma_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dilemma_section_table_data_order_idx\` ON \`_pages_v_blocks_dilemma_section_table_data\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dilemma_section_table_data_parent_id_idx\` ON \`_pages_v_blocks_dilemma_section_table_data\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_dilemma_section_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`sub\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_dilemma_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dilemma_section_steps_order_idx\` ON \`_pages_v_blocks_dilemma_section_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dilemma_section_steps_parent_id_idx\` ON \`_pages_v_blocks_dilemma_section_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_dilemma_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`heading\` text NOT NULL,
  	\`heading_accent\` text,
  	\`body\` text,
  	\`transition_line1\` text,
  	\`transition_line2\` text,
  	\`column_subtitles_old\` text,
  	\`column_subtitles_rigid\` text,
  	\`column_subtitles_patch\` text,
  	\`column_subtitles_ella\` text,
  	\`closer\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dilemma_section_order_idx\` ON \`_pages_v_blocks_dilemma_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dilemma_section_parent_id_idx\` ON \`_pages_v_blocks_dilemma_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_dilemma_section_path_idx\` ON \`_pages_v_blocks_dilemma_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_advisor_personas_personas\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`with_ella\` text NOT NULL,
  	\`icon_name\` text,
  	\`icon_id\` integer,
  	\`accent_color\` text DEFAULT 'forest',
  	\`_uuid\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_advisor_personas\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_advisor_personas_personas_order_idx\` ON \`_pages_v_blocks_advisor_personas_personas\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_advisor_personas_personas_parent_id_idx\` ON \`_pages_v_blocks_advisor_personas_personas\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_advisor_personas_personas_icon_idx\` ON \`_pages_v_blocks_advisor_personas_personas\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_advisor_personas\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`image_id\` integer NOT NULL,
  	\`image_quote_label\` text,
  	\`image_quote_text\` text,
  	\`image_quote_attribution\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_advisor_personas_order_idx\` ON \`_pages_v_blocks_advisor_personas\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_advisor_personas_parent_id_idx\` ON \`_pages_v_blocks_advisor_personas\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_advisor_personas_path_idx\` ON \`_pages_v_blocks_advisor_personas\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_advisor_personas_image_idx\` ON \`_pages_v_blocks_advisor_personas\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_values_grid_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_values_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_values_grid_items_order_idx\` ON \`_pages_v_blocks_values_grid_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_values_grid_items_parent_id_idx\` ON \`_pages_v_blocks_values_grid_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_values_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`description\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_values_grid_order_idx\` ON \`_pages_v_blocks_values_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_values_grid_parent_id_idx\` ON \`_pages_v_blocks_values_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_values_grid_path_idx\` ON \`_pages_v_blocks_values_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_feature_showcase_accordion_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_feature_showcase\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_showcase_accordion_items_order_idx\` ON \`_pages_v_blocks_feature_showcase_accordion_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_showcase_accordion_items_parent_id_idx\` ON \`_pages_v_blocks_feature_showcase_accordion_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_feature_showcase_gallery_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`static_image_id\` integer NOT NULL,
  	\`animated_image_id\` integer,
  	\`caption\` text,
  	\`subcaption\` text,
  	\`bg_color\` text,
  	\`frame_image\` integer DEFAULT false,
  	\`anchor_target\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`static_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`animated_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_feature_showcase\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_showcase_gallery_items_order_idx\` ON \`_pages_v_blocks_feature_showcase_gallery_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_showcase_gallery_items_parent_id_idx\` ON \`_pages_v_blocks_feature_showcase_gallery_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_showcase_gallery_items_static_im_idx\` ON \`_pages_v_blocks_feature_showcase_gallery_items\` (\`static_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_showcase_gallery_items_animated__idx\` ON \`_pages_v_blocks_feature_showcase_gallery_items\` (\`animated_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_feature_showcase\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_id\` text,
  	\`header_layout\` text DEFAULT 'text-only',
  	\`text_align\` text DEFAULT 'left',
  	\`section_label\` text,
  	\`heading\` text,
  	\`heading_font\` text DEFAULT 'display',
  	\`heading_size\` text DEFAULT 'default',
  	\`body\` text,
  	\`link_label\` text,
  	\`link_href\` text,
  	\`link_style\` text DEFAULT 'button',
  	\`header_image_id\` integer,
  	\`header_image_fit\` text DEFAULT 'cover',
  	\`gallery_columns\` text DEFAULT '3',
  	\`gallery_aspect\` text DEFAULT 'landscape',
  	\`gallery_align\` text DEFAULT 'left',
  	\`gallery_image_radius\` text DEFAULT 'rounded',
  	\`gallery_width\` text DEFAULT 'default',
  	\`wide_header\` integer DEFAULT false,
  	\`section_padding\` text DEFAULT 'default',
  	\`bg_color_override\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`header_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_showcase_order_idx\` ON \`_pages_v_blocks_feature_showcase\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_showcase_parent_id_idx\` ON \`_pages_v_blocks_feature_showcase\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_showcase_path_idx\` ON \`_pages_v_blocks_feature_showcase\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_feature_showcase_header_image_idx\` ON \`_pages_v_blocks_feature_showcase\` (\`header_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_prmpt_antm_v_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text NOT NULL,
  	\`annotation_label\` text NOT NULL,
  	\`annotation_detail\` text,
  	\`color\` text DEFAULT 'moss' NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_prmpt_antm_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_prmpt_antm_v_items_order_idx\` ON \`_prmpt_antm_v_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_prmpt_antm_v_items_parent_id_idx\` ON \`_prmpt_antm_v_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_prmpt_antm_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_id\` text,
  	\`section_label\` text,
  	\`heading\` text,
  	\`description\` text,
  	\`prompt_text\` text,
  	\`response_label\` text,
  	\`response_metadata\` text,
  	\`footer_left\` text,
  	\`footer_right\` text,
  	\`bg_color_override\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_prmpt_antm_v_order_idx\` ON \`_prmpt_antm_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_prmpt_antm_v_parent_id_idx\` ON \`_prmpt_antm_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_prmpt_antm_v_path_idx\` ON \`_prmpt_antm_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text NOT NULL,
  	\`version_slug\` text NOT NULL,
  	\`version_status\` text DEFAULT 'draft',
  	\`version_published_date\` text,
  	\`version_parent_id\` integer,
  	\`version_page_background_image_id\` integer,
  	\`version_page_background_opacity\` numeric DEFAULT 3,
  	\`version_page_background_top\` text,
  	\`version_page_background_right\` text,
  	\`version_page_background_width\` text,
  	\`version_hero_announcement_enabled\` integer DEFAULT false,
  	\`version_hero_announcement_text\` text,
  	\`version_hero_announcement_href\` text,
  	\`version_hero_announcement_cta_label\` text DEFAULT 'Learn more',
  	\`version_hero_headline\` text NOT NULL,
  	\`version_hero_headline_animation\` text DEFAULT 'word-by-word',
  	\`version_hero_headline_line2\` text,
  	\`version_hero_headline_animation2\` text DEFAULT 'blur-fade',
  	\`version_hero_subheadline\` text,
  	\`version_hero_primary_cta_label\` text,
  	\`version_hero_primary_cta_href\` text,
  	\`version_hero_secondary_cta_label\` text,
  	\`version_hero_secondary_cta_href\` text,
  	\`version_hero_microcopy\` text,
  	\`version_hero_visual_id\` integer,
  	\`version_hero_visual_fit\` text DEFAULT 'contain',
  	\`version_hero_visual_position\` text DEFAULT 'center',
  	\`version_hero_background_image_id\` integer,
  	\`version_hero_show_logo_watermark\` integer DEFAULT false,
  	\`version_hero_style\` text DEFAULT 'default',
  	\`version_hero_headline_font\` text DEFAULT 'display',
  	\`version_hero_highlight_text\` text,
  	\`version_hero_highlight_color\` text DEFAULT 'goldenrod',
  	\`version_hero_hero_wallpaper\` integer DEFAULT false,
  	\`version_hero_hero_wallpaper_color\` text DEFAULT 'green',
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_page_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_visual_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_parent_idx\` ON \`_pages_v\` (\`version_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_page_background_version_page_background_idx\` ON \`_pages_v\` (\`version_page_background_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_version_hero_visual_idx\` ON \`_pages_v\` (\`version_hero_visual_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_version_hero_background_image_idx\` ON \`_pages_v\` (\`version_hero_background_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_meta_version_meta_image_idx\` ON \`_pages_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`testimonials_id\` integer,
  	\`partners_id\` integer,
  	\`solutions_id\` integer,
  	\`faq_items_id\` integer,
  	\`pricing_tiers_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`partners_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`solutions_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faq_items_id\`) REFERENCES \`faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pricing_tiers_id\`) REFERENCES \`pricing_tiers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_order_idx\` ON \`_pages_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_parent_idx\` ON \`_pages_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_path_idx\` ON \`_pages_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_testimonials_id_idx\` ON \`_pages_v_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_partners_id_idx\` ON \`_pages_v_rels\` (\`partners_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_solutions_id_idx\` ON \`_pages_v_rels\` (\`solutions_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_faq_items_id_idx\` ON \`_pages_v_rels\` (\`faq_items_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_pricing_tiers_id_idx\` ON \`_pages_v_rels\` (\`pricing_tiers_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_users_id_idx\` ON \`_pages_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_landing_pages_v_blocks_content_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`layout\` text DEFAULT 'default',
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
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_landing_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_content_section_order_idx\` ON \`_landing_pages_v_blocks_content_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_content_section_parent_id_idx\` ON \`_landing_pages_v_blocks_content_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_content_section_path_idx\` ON \`_landing_pages_v_blocks_content_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_content_section_media_idx\` ON \`_landing_pages_v_blocks_content_section\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_landing_pages_v_blocks_card_grid_cards_capabilities\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_landing_pages_v_blocks_card_grid_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_card_grid_cards_capabilities_order_idx\` ON \`_landing_pages_v_blocks_card_grid_cards_capabilities\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_card_grid_cards_capabilities_parent_id_idx\` ON \`_landing_pages_v_blocks_card_grid_cards_capabilities\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_landing_pages_v_blocks_card_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text,
  	\`icon_name\` text,
  	\`icon_id\` integer,
  	\`link_label\` text,
  	\`link_href\` text,
  	\`anchor_target\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_landing_pages_v_blocks_card_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_card_grid_cards_order_idx\` ON \`_landing_pages_v_blocks_card_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_card_grid_cards_parent_id_idx\` ON \`_landing_pages_v_blocks_card_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_card_grid_cards_icon_idx\` ON \`_landing_pages_v_blocks_card_grid_cards\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`_landing_pages_v_blocks_card_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`variant\` text DEFAULT 'feature',
  	\`columns\` text DEFAULT '3',
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_landing_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_card_grid_order_idx\` ON \`_landing_pages_v_blocks_card_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_card_grid_parent_id_idx\` ON \`_landing_pages_v_blocks_card_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_card_grid_path_idx\` ON \`_landing_pages_v_blocks_card_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_landing_pages_v_blocks_testimonial_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`layout\` text DEFAULT 'single',
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_landing_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_testimonial_block_order_idx\` ON \`_landing_pages_v_blocks_testimonial_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_testimonial_block_parent_id_idx\` ON \`_landing_pages_v_blocks_testimonial_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_testimonial_block_path_idx\` ON \`_landing_pages_v_blocks_testimonial_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_landing_pages_v_blocks_cta_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`headline\` text,
  	\`body\` text,
  	\`primary_cta_label\` text,
  	\`primary_cta_href\` text,
  	\`secondary_cta_label\` text,
  	\`secondary_cta_href\` text,
  	\`closing_line\` text,
  	\`microcopy\` text,
  	\`bg_style\` text DEFAULT 'forest',
  	\`cover_image_image_id\` integer,
  	\`cover_image_min_height\` text DEFAULT 'md',
  	\`cover_image_object_position\` text DEFAULT 'center',
  	\`cover_image_overlay_opacity\` text DEFAULT '60',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`cover_image_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_landing_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_cta_section_order_idx\` ON \`_landing_pages_v_blocks_cta_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_cta_section_parent_id_idx\` ON \`_landing_pages_v_blocks_cta_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_cta_section_path_idx\` ON \`_landing_pages_v_blocks_cta_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_cta_section_cover_image_cover_im_idx\` ON \`_landing_pages_v_blocks_cta_section\` (\`cover_image_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_landing_pages_v_blocks_credibility_strip_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_landing_pages_v_blocks_credibility_strip\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_credibility_strip_stats_order_idx\` ON \`_landing_pages_v_blocks_credibility_strip_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_credibility_strip_stats_parent_id_idx\` ON \`_landing_pages_v_blocks_credibility_strip_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_landing_pages_v_blocks_credibility_strip\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`variant\` text DEFAULT 'logos',
  	\`statement\` text,
  	\`label\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_landing_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_credibility_strip_order_idx\` ON \`_landing_pages_v_blocks_credibility_strip\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_credibility_strip_parent_id_idx\` ON \`_landing_pages_v_blocks_credibility_strip\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_credibility_strip_path_idx\` ON \`_landing_pages_v_blocks_credibility_strip\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_landing_pages_v_blocks_feature_deep_dive_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text,
  	\`visual_id\` integer,
  	\`visual_alt\` text,
  	\`testimonial_id\` integer,
  	\`link_label\` text,
  	\`link_href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`visual_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`testimonial_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_landing_pages_v_blocks_feature_deep_dive\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_feature_deep_dive_sections_order_idx\` ON \`_landing_pages_v_blocks_feature_deep_dive_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_feature_deep_dive_sections_parent_id_idx\` ON \`_landing_pages_v_blocks_feature_deep_dive_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_feature_deep_dive_sections_visua_idx\` ON \`_landing_pages_v_blocks_feature_deep_dive_sections\` (\`visual_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_feature_deep_dive_sections_testi_idx\` ON \`_landing_pages_v_blocks_feature_deep_dive_sections\` (\`testimonial_id\`);`)
  await db.run(sql`CREATE TABLE \`_landing_pages_v_blocks_feature_deep_dive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_id\` text,
  	\`section_label\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_landing_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_feature_deep_dive_order_idx\` ON \`_landing_pages_v_blocks_feature_deep_dive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_feature_deep_dive_parent_id_idx\` ON \`_landing_pages_v_blocks_feature_deep_dive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_feature_deep_dive_path_idx\` ON \`_landing_pages_v_blocks_feature_deep_dive\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_landing_pages_v_blocks_trust_security_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`body\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_landing_pages_v_blocks_trust_security\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_trust_security_sections_order_idx\` ON \`_landing_pages_v_blocks_trust_security_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_trust_security_sections_parent_id_idx\` ON \`_landing_pages_v_blocks_trust_security_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_landing_pages_v_blocks_trust_security\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`intro\` text,
  	\`link_label\` text,
  	\`link_href\` text,
  	\`pattern_svg_id\` integer,
  	\`pattern_color\` text,
  	\`background_color\` text,
  	\`content_background_color\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`pattern_svg_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_landing_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_trust_security_order_idx\` ON \`_landing_pages_v_blocks_trust_security\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_trust_security_parent_id_idx\` ON \`_landing_pages_v_blocks_trust_security\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_trust_security_path_idx\` ON \`_landing_pages_v_blocks_trust_security\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_trust_security_pattern_svg_idx\` ON \`_landing_pages_v_blocks_trust_security\` (\`pattern_svg_id\`);`)
  await db.run(sql`CREATE TABLE \`_landing_pages_v_blocks_numbered_steps_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_landing_pages_v_blocks_numbered_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_numbered_steps_steps_order_idx\` ON \`_landing_pages_v_blocks_numbered_steps_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_numbered_steps_steps_parent_id_idx\` ON \`_landing_pages_v_blocks_numbered_steps_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_numbered_steps_steps_image_idx\` ON \`_landing_pages_v_blocks_numbered_steps_steps\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_landing_pages_v_blocks_numbered_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_landing_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_numbered_steps_order_idx\` ON \`_landing_pages_v_blocks_numbered_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_numbered_steps_parent_id_idx\` ON \`_landing_pages_v_blocks_numbered_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_numbered_steps_path_idx\` ON \`_landing_pages_v_blocks_numbered_steps\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_landing_pages_v_blocks_solutions_selector\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_landing_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_solutions_selector_order_idx\` ON \`_landing_pages_v_blocks_solutions_selector\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_solutions_selector_parent_id_idx\` ON \`_landing_pages_v_blocks_solutions_selector\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_solutions_selector_path_idx\` ON \`_landing_pages_v_blocks_solutions_selector\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_landing_pages_v_blocks_faq_accordion\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`filter_by_category\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_landing_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_faq_accordion_order_idx\` ON \`_landing_pages_v_blocks_faq_accordion\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_faq_accordion_parent_id_idx\` ON \`_landing_pages_v_blocks_faq_accordion\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_faq_accordion_path_idx\` ON \`_landing_pages_v_blocks_faq_accordion\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_landing_pages_v_blocks_newsletter_capture_segment_ids\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`segment_id\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_landing_pages_v_blocks_newsletter_capture\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_newsletter_capture_segment_ids_order_idx\` ON \`_landing_pages_v_blocks_newsletter_capture_segment_ids\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_newsletter_capture_segment_ids_parent_id_idx\` ON \`_landing_pages_v_blocks_newsletter_capture_segment_ids\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_landing_pages_v_blocks_newsletter_capture\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`subheading\` text,
  	\`placeholder\` text DEFAULT 'Your email address',
  	\`button_label\` text DEFAULT 'Subscribe',
  	\`success_message\` text DEFAULT 'You''re in. We''ll be in touch.',
  	\`microcopy\` text,
  	\`source\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_landing_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_newsletter_capture_order_idx\` ON \`_landing_pages_v_blocks_newsletter_capture\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_newsletter_capture_parent_id_idx\` ON \`_landing_pages_v_blocks_newsletter_capture\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_newsletter_capture_path_idx\` ON \`_landing_pages_v_blocks_newsletter_capture\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_landing_pages_v_blocks_form_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`embed_type\` text,
  	\`form_id\` text,
  	\`embed_code\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_landing_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_form_embed_order_idx\` ON \`_landing_pages_v_blocks_form_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_form_embed_parent_id_idx\` ON \`_landing_pages_v_blocks_form_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_blocks_form_embed_path_idx\` ON \`_landing_pages_v_blocks_form_embed\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_landing_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text NOT NULL,
  	\`version_slug\` text NOT NULL,
  	\`version_campaign\` text,
  	\`version_status\` text DEFAULT 'draft',
  	\`version_hero_announcement_enabled\` integer DEFAULT false,
  	\`version_hero_announcement_text\` text,
  	\`version_hero_announcement_href\` text,
  	\`version_hero_announcement_cta_label\` text DEFAULT 'Learn more',
  	\`version_hero_headline\` text NOT NULL,
  	\`version_hero_headline_animation\` text DEFAULT 'word-by-word',
  	\`version_hero_headline_line2\` text,
  	\`version_hero_headline_animation2\` text DEFAULT 'blur-fade',
  	\`version_hero_subheadline\` text,
  	\`version_hero_primary_cta_label\` text,
  	\`version_hero_primary_cta_href\` text,
  	\`version_hero_secondary_cta_label\` text,
  	\`version_hero_secondary_cta_href\` text,
  	\`version_hero_microcopy\` text,
  	\`version_hero_visual_id\` integer,
  	\`version_hero_visual_fit\` text DEFAULT 'contain',
  	\`version_hero_visual_position\` text DEFAULT 'center',
  	\`version_hero_background_image_id\` integer,
  	\`version_hero_show_logo_watermark\` integer DEFAULT false,
  	\`version_hero_style\` text DEFAULT 'default',
  	\`version_hero_headline_font\` text DEFAULT 'display',
  	\`version_hero_highlight_text\` text,
  	\`version_hero_highlight_color\` text DEFAULT 'goldenrod',
  	\`version_hero_hero_wallpaper\` integer DEFAULT false,
  	\`version_hero_hero_wallpaper_color\` text DEFAULT 'green',
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`landing_pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_visual_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_parent_idx\` ON \`_landing_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_version_version_slug_idx\` ON \`_landing_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_version_hero_version_hero_visual_idx\` ON \`_landing_pages_v\` (\`version_hero_visual_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_version_hero_version_hero_background_im_idx\` ON \`_landing_pages_v\` (\`version_hero_background_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_version_meta_version_meta_image_idx\` ON \`_landing_pages_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_version_version_updated_at_idx\` ON \`_landing_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_version_version_created_at_idx\` ON \`_landing_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_created_at_idx\` ON \`_landing_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_updated_at_idx\` ON \`_landing_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_landing_pages_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`testimonials_id\` integer,
  	\`partners_id\` integer,
  	\`solutions_id\` integer,
  	\`faq_items_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_landing_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`partners_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`solutions_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`faq_items_id\`) REFERENCES \`faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_rels_order_idx\` ON \`_landing_pages_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_rels_parent_idx\` ON \`_landing_pages_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_rels_path_idx\` ON \`_landing_pages_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_rels_testimonials_id_idx\` ON \`_landing_pages_v_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_rels_partners_id_idx\` ON \`_landing_pages_v_rels\` (\`partners_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_rels_solutions_id_idx\` ON \`_landing_pages_v_rels\` (\`solutions_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_rels_faq_items_id_idx\` ON \`_landing_pages_v_rels\` (\`faq_items_id\`);`)
  await db.run(sql`CREATE INDEX \`_landing_pages_v_rels_users_id_idx\` ON \`_landing_pages_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`categories_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_rels_order_idx\` ON \`categories_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`categories_rels_parent_idx\` ON \`categories_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_rels_path_idx\` ON \`categories_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`categories_rels_users_id_idx\` ON \`categories_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text NOT NULL,
  	\`version_slug\` text NOT NULL,
  	\`version_internal_label\` text,
  	\`version_description\` text,
  	\`version_path_prefix\` text,
  	\`version_sort_order\` numeric DEFAULT 0,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_parent_idx\` ON \`_categories_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_slug_idx\` ON \`_categories_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_updated_at_idx\` ON \`_categories_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_version_created_at_idx\` ON \`_categories_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_created_at_idx\` ON \`_categories_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_updated_at_idx\` ON \`_categories_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_rels_order_idx\` ON \`_categories_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_rels_parent_idx\` ON \`_categories_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_rels_path_idx\` ON \`_categories_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_rels_users_id_idx\` ON \`_categories_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`disciplines_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`disciplines\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`disciplines_rels_order_idx\` ON \`disciplines_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`disciplines_rels_parent_idx\` ON \`disciplines_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`disciplines_rels_path_idx\` ON \`disciplines_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`disciplines_rels_users_id_idx\` ON \`disciplines_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_disciplines_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text NOT NULL,
  	\`version_slug\` text NOT NULL,
  	\`version_description\` text,
  	\`version_sort_order\` numeric DEFAULT 0,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`disciplines\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_disciplines_v_parent_idx\` ON \`_disciplines_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_disciplines_v_version_version_slug_idx\` ON \`_disciplines_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_disciplines_v_version_version_updated_at_idx\` ON \`_disciplines_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_disciplines_v_version_version_created_at_idx\` ON \`_disciplines_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_disciplines_v_created_at_idx\` ON \`_disciplines_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_disciplines_v_updated_at_idx\` ON \`_disciplines_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_disciplines_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_disciplines_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_disciplines_v_rels_order_idx\` ON \`_disciplines_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_disciplines_v_rels_parent_idx\` ON \`_disciplines_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_disciplines_v_rels_path_idx\` ON \`_disciplines_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_disciplines_v_rels_users_id_idx\` ON \`_disciplines_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`team_members_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`team_members_rels_order_idx\` ON \`team_members_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`team_members_rels_parent_idx\` ON \`team_members_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`team_members_rels_path_idx\` ON \`team_members_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`team_members_rels_users_id_idx\` ON \`team_members_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_team_members_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text NOT NULL,
  	\`version_slug\` text NOT NULL,
  	\`version_role\` text,
  	\`version_photo_id\` integer,
  	\`version_bio\` text,
  	\`version_is_author\` integer DEFAULT false,
  	\`version_linked_in\` text,
  	\`version_twitter\` text,
  	\`version_sort_order\` numeric DEFAULT 0,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`team_members\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_team_members_v_parent_idx\` ON \`_team_members_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_team_members_v_version_version_slug_idx\` ON \`_team_members_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_team_members_v_version_version_photo_idx\` ON \`_team_members_v\` (\`version_photo_id\`);`)
  await db.run(sql`CREATE INDEX \`_team_members_v_version_version_updated_at_idx\` ON \`_team_members_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_team_members_v_version_version_created_at_idx\` ON \`_team_members_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_team_members_v_created_at_idx\` ON \`_team_members_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_team_members_v_updated_at_idx\` ON \`_team_members_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_team_members_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_team_members_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_team_members_v_rels_order_idx\` ON \`_team_members_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_team_members_v_rels_parent_idx\` ON \`_team_members_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_team_members_v_rels_path_idx\` ON \`_team_members_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_team_members_v_rels_users_id_idx\` ON \`_team_members_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_testimonials_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_quote\` text NOT NULL,
  	\`version_name\` text NOT NULL,
  	\`version_title\` text,
  	\`version_company\` text,
  	\`version_photo_id\` integer,
  	\`version_metrics_value\` text,
  	\`version_metrics_label\` text,
  	\`version_approved\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_testimonials_v_parent_idx\` ON \`_testimonials_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version_photo_idx\` ON \`_testimonials_v\` (\`version_photo_id\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version_updated_at_idx\` ON \`_testimonials_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version_created_at_idx\` ON \`_testimonials_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_created_at_idx\` ON \`_testimonials_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_updated_at_idx\` ON \`_testimonials_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_testimonials_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`disciplines_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_testimonials_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`disciplines_id\`) REFERENCES \`disciplines\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_testimonials_v_rels_order_idx\` ON \`_testimonials_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_rels_parent_idx\` ON \`_testimonials_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_rels_path_idx\` ON \`_testimonials_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_rels_disciplines_id_idx\` ON \`_testimonials_v_rels\` (\`disciplines_id\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_rels_users_id_idx\` ON \`_testimonials_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`partners_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`partners_rels_order_idx\` ON \`partners_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`partners_rels_parent_idx\` ON \`partners_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`partners_rels_path_idx\` ON \`partners_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`partners_rels_users_id_idx\` ON \`partners_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_partners_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text NOT NULL,
  	\`version_logo_id\` integer,
  	\`version_type\` text NOT NULL,
  	\`version_url\` text,
  	\`version_show_on_homepage\` integer DEFAULT false,
  	\`version_sort_order\` numeric DEFAULT 0,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`partners\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_partners_v_parent_idx\` ON \`_partners_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_version_version_logo_idx\` ON \`_partners_v\` (\`version_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_version_version_updated_at_idx\` ON \`_partners_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_version_version_created_at_idx\` ON \`_partners_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_created_at_idx\` ON \`_partners_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_updated_at_idx\` ON \`_partners_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_partners_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_partners_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_partners_v_rels_order_idx\` ON \`_partners_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_rels_parent_idx\` ON \`_partners_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_rels_path_idx\` ON \`_partners_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_partners_v_rels_users_id_idx\` ON \`_partners_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`faq_items_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`faq_items\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`faq_items_rels_order_idx\` ON \`faq_items_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`faq_items_rels_parent_idx\` ON \`faq_items_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`faq_items_rels_path_idx\` ON \`faq_items_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`faq_items_rels_users_id_idx\` ON \`faq_items_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_faq_items_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_question\` text NOT NULL,
  	\`version_answer\` text NOT NULL,
  	\`version_category\` text,
  	\`version_show_on_pricing\` integer DEFAULT false,
  	\`version_sort_order\` numeric DEFAULT 0,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`faq_items\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_faq_items_v_parent_idx\` ON \`_faq_items_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_faq_items_v_version_version_updated_at_idx\` ON \`_faq_items_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_faq_items_v_version_version_created_at_idx\` ON \`_faq_items_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_faq_items_v_created_at_idx\` ON \`_faq_items_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_faq_items_v_updated_at_idx\` ON \`_faq_items_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_faq_items_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_faq_items_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_faq_items_v_rels_order_idx\` ON \`_faq_items_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_faq_items_v_rels_parent_idx\` ON \`_faq_items_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_faq_items_v_rels_path_idx\` ON \`_faq_items_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_faq_items_v_rels_users_id_idx\` ON \`_faq_items_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`pricing_tiers_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pricing_tiers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pricing_tiers_rels_order_idx\` ON \`pricing_tiers_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pricing_tiers_rels_parent_idx\` ON \`pricing_tiers_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pricing_tiers_rels_path_idx\` ON \`pricing_tiers_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pricing_tiers_rels_users_id_idx\` ON \`pricing_tiers_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_pricing_tiers_v_version_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`feature\` text NOT NULL,
  	\`included\` text DEFAULT 'yes',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pricing_tiers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pricing_tiers_v_version_features_order_idx\` ON \`_pricing_tiers_v_version_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pricing_tiers_v_version_features_parent_id_idx\` ON \`_pricing_tiers_v_version_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pricing_tiers_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_name\` text NOT NULL,
  	\`version_price_amount\` numeric,
  	\`version_price_period\` text DEFAULT 'year',
  	\`version_price_custom_label\` text,
  	\`version_price_per\` text DEFAULT 'user',
  	\`version_month_surcharge_percent\` numeric,
  	\`version_quarter_surcharge_percent\` numeric,
  	\`version_tagline\` text,
  	\`version_description\` text,
  	\`version_badge\` text,
  	\`version_max_advisors\` text,
  	\`version_max_clients\` text,
  	\`version_collaborators_per_client\` text,
  	\`version_features_header\` text,
  	\`version_cta_label\` text DEFAULT 'Get Started',
  	\`version_cta_href\` text,
  	\`version_highlighted\` integer DEFAULT false,
  	\`version_sort_order\` numeric DEFAULT 0,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pricing_tiers\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pricing_tiers_v_parent_idx\` ON \`_pricing_tiers_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pricing_tiers_v_version_version_updated_at_idx\` ON \`_pricing_tiers_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pricing_tiers_v_version_version_created_at_idx\` ON \`_pricing_tiers_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pricing_tiers_v_created_at_idx\` ON \`_pricing_tiers_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pricing_tiers_v_updated_at_idx\` ON \`_pricing_tiers_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_pricing_tiers_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pricing_tiers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pricing_tiers_v_rels_order_idx\` ON \`_pricing_tiers_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_pricing_tiers_v_rels_parent_idx\` ON \`_pricing_tiers_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pricing_tiers_v_rels_path_idx\` ON \`_pricing_tiers_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_pricing_tiers_v_rels_users_id_idx\` ON \`_pricing_tiers_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_tools_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text NOT NULL,
  	\`version_slug\` text NOT NULL,
  	\`version_description\` text,
  	\`version_tool_url\` text,
  	\`version_pricing_tier_id\` integer,
  	\`version_status\` text DEFAULT 'available',
  	\`version_icon_name\` text,
  	\`version_icon_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tools\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_pricing_tier_id\`) REFERENCES \`pricing_tiers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_tools_v_parent_idx\` ON \`_tools_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_tools_v_version_version_slug_idx\` ON \`_tools_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_tools_v_version_version_pricing_tier_idx\` ON \`_tools_v\` (\`version_pricing_tier_id\`);`)
  await db.run(sql`CREATE INDEX \`_tools_v_version_version_icon_idx\` ON \`_tools_v\` (\`version_icon_id\`);`)
  await db.run(sql`CREATE INDEX \`_tools_v_version_version_updated_at_idx\` ON \`_tools_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_tools_v_version_version_created_at_idx\` ON \`_tools_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_tools_v_created_at_idx\` ON \`_tools_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_tools_v_updated_at_idx\` ON \`_tools_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_tools_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`disciplines_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_tools_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`disciplines_id\`) REFERENCES \`disciplines\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_tools_v_rels_order_idx\` ON \`_tools_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_tools_v_rels_parent_idx\` ON \`_tools_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_tools_v_rels_path_idx\` ON \`_tools_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_tools_v_rels_disciplines_id_idx\` ON \`_tools_v_rels\` (\`disciplines_id\`);`)
  await db.run(sql`CREATE INDEX \`_tools_v_rels_users_id_idx\` ON \`_tools_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`redirects_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`redirects_rels_order_idx\` ON \`redirects_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_parent_idx\` ON \`redirects_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_path_idx\` ON \`redirects_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_users_id_idx\` ON \`redirects_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_redirects_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_from\` text NOT NULL,
  	\`version_to\` text NOT NULL,
  	\`version_type\` text DEFAULT '301',
  	\`version_source_domain\` text DEFAULT 'withella',
  	\`version_active\` integer DEFAULT true,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_redirects_v_parent_idx\` ON \`_redirects_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_redirects_v_version_version_from_idx\` ON \`_redirects_v\` (\`version_from\`);`)
  await db.run(sql`CREATE INDEX \`_redirects_v_version_version_updated_at_idx\` ON \`_redirects_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_redirects_v_version_version_created_at_idx\` ON \`_redirects_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_redirects_v_created_at_idx\` ON \`_redirects_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_redirects_v_updated_at_idx\` ON \`_redirects_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_redirects_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_redirects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_redirects_v_rels_order_idx\` ON \`_redirects_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_redirects_v_rels_parent_idx\` ON \`_redirects_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_redirects_v_rels_path_idx\` ON \`_redirects_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_redirects_v_rels_users_id_idx\` ON \`_redirects_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_solutions_v_blocks_content_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`layout\` text DEFAULT 'default',
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
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_solutions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_content_section_order_idx\` ON \`_solutions_v_blocks_content_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_content_section_parent_id_idx\` ON \`_solutions_v_blocks_content_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_content_section_path_idx\` ON \`_solutions_v_blocks_content_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_content_section_media_idx\` ON \`_solutions_v_blocks_content_section\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_solutions_v_blocks_card_grid_cards_capabilities\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_solutions_v_blocks_card_grid_cards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_card_grid_cards_capabilities_order_idx\` ON \`_solutions_v_blocks_card_grid_cards_capabilities\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_card_grid_cards_capabilities_parent_id_idx\` ON \`_solutions_v_blocks_card_grid_cards_capabilities\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_solutions_v_blocks_card_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text,
  	\`icon_name\` text,
  	\`icon_id\` integer,
  	\`link_label\` text,
  	\`link_href\` text,
  	\`anchor_target\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_solutions_v_blocks_card_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_card_grid_cards_order_idx\` ON \`_solutions_v_blocks_card_grid_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_card_grid_cards_parent_id_idx\` ON \`_solutions_v_blocks_card_grid_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_card_grid_cards_icon_idx\` ON \`_solutions_v_blocks_card_grid_cards\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`_solutions_v_blocks_card_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`variant\` text DEFAULT 'feature',
  	\`columns\` text DEFAULT '3',
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_solutions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_card_grid_order_idx\` ON \`_solutions_v_blocks_card_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_card_grid_parent_id_idx\` ON \`_solutions_v_blocks_card_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_card_grid_path_idx\` ON \`_solutions_v_blocks_card_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_solutions_v_blocks_testimonial_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`layout\` text DEFAULT 'single',
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_solutions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_testimonial_block_order_idx\` ON \`_solutions_v_blocks_testimonial_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_testimonial_block_parent_id_idx\` ON \`_solutions_v_blocks_testimonial_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_testimonial_block_path_idx\` ON \`_solutions_v_blocks_testimonial_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_solutions_v_blocks_cta_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`headline\` text,
  	\`body\` text,
  	\`primary_cta_label\` text,
  	\`primary_cta_href\` text,
  	\`secondary_cta_label\` text,
  	\`secondary_cta_href\` text,
  	\`closing_line\` text,
  	\`microcopy\` text,
  	\`bg_style\` text DEFAULT 'forest',
  	\`cover_image_image_id\` integer,
  	\`cover_image_min_height\` text DEFAULT 'md',
  	\`cover_image_object_position\` text DEFAULT 'center',
  	\`cover_image_overlay_opacity\` text DEFAULT '60',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`cover_image_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_solutions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_cta_section_order_idx\` ON \`_solutions_v_blocks_cta_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_cta_section_parent_id_idx\` ON \`_solutions_v_blocks_cta_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_cta_section_path_idx\` ON \`_solutions_v_blocks_cta_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_cta_section_cover_image_cover_image__idx\` ON \`_solutions_v_blocks_cta_section\` (\`cover_image_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_solutions_v_blocks_feature_deep_dive_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text,
  	\`visual_id\` integer,
  	\`visual_alt\` text,
  	\`testimonial_id\` integer,
  	\`link_label\` text,
  	\`link_href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`visual_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`testimonial_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_solutions_v_blocks_feature_deep_dive\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_feature_deep_dive_sections_order_idx\` ON \`_solutions_v_blocks_feature_deep_dive_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_feature_deep_dive_sections_parent_id_idx\` ON \`_solutions_v_blocks_feature_deep_dive_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_feature_deep_dive_sections_visual_idx\` ON \`_solutions_v_blocks_feature_deep_dive_sections\` (\`visual_id\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_feature_deep_dive_sections_testimoni_idx\` ON \`_solutions_v_blocks_feature_deep_dive_sections\` (\`testimonial_id\`);`)
  await db.run(sql`CREATE TABLE \`_solutions_v_blocks_feature_deep_dive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_id\` text,
  	\`section_label\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_solutions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_feature_deep_dive_order_idx\` ON \`_solutions_v_blocks_feature_deep_dive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_feature_deep_dive_parent_id_idx\` ON \`_solutions_v_blocks_feature_deep_dive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_feature_deep_dive_path_idx\` ON \`_solutions_v_blocks_feature_deep_dive\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_solutions_v_blocks_numbered_steps_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_solutions_v_blocks_numbered_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_numbered_steps_steps_order_idx\` ON \`_solutions_v_blocks_numbered_steps_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_numbered_steps_steps_parent_id_idx\` ON \`_solutions_v_blocks_numbered_steps_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_numbered_steps_steps_image_idx\` ON \`_solutions_v_blocks_numbered_steps_steps\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_solutions_v_blocks_numbered_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`section_label\` text,
  	\`heading\` text,
  	\`subheading\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_solutions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_numbered_steps_order_idx\` ON \`_solutions_v_blocks_numbered_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_numbered_steps_parent_id_idx\` ON \`_solutions_v_blocks_numbered_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_numbered_steps_path_idx\` ON \`_solutions_v_blocks_numbered_steps\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_solutions_v_blocks_form_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`embed_type\` text,
  	\`form_id\` text,
  	\`embed_code\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_solutions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_form_embed_order_idx\` ON \`_solutions_v_blocks_form_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_form_embed_parent_id_idx\` ON \`_solutions_v_blocks_form_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_blocks_form_embed_path_idx\` ON \`_solutions_v_blocks_form_embed\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_solutions_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text NOT NULL,
  	\`version_slug\` text NOT NULL,
  	\`version_discipline_id\` integer NOT NULL,
  	\`version_tagline\` text,
  	\`version_status\` text DEFAULT 'waitlist',
  	\`version_is_beachhead\` integer DEFAULT false,
  	\`version_hero_announcement_enabled\` integer DEFAULT false,
  	\`version_hero_announcement_text\` text,
  	\`version_hero_announcement_href\` text,
  	\`version_hero_announcement_cta_label\` text DEFAULT 'Learn more',
  	\`version_hero_headline\` text NOT NULL,
  	\`version_hero_headline_animation\` text DEFAULT 'word-by-word',
  	\`version_hero_headline_line2\` text,
  	\`version_hero_headline_animation2\` text DEFAULT 'blur-fade',
  	\`version_hero_subheadline\` text,
  	\`version_hero_primary_cta_label\` text,
  	\`version_hero_primary_cta_href\` text,
  	\`version_hero_secondary_cta_label\` text,
  	\`version_hero_secondary_cta_href\` text,
  	\`version_hero_microcopy\` text,
  	\`version_hero_visual_id\` integer,
  	\`version_hero_visual_fit\` text DEFAULT 'contain',
  	\`version_hero_visual_position\` text DEFAULT 'center',
  	\`version_hero_background_image_id\` integer,
  	\`version_hero_show_logo_watermark\` integer DEFAULT false,
  	\`version_hero_style\` text DEFAULT 'default',
  	\`version_hero_headline_font\` text DEFAULT 'display',
  	\`version_hero_highlight_text\` text,
  	\`version_hero_highlight_color\` text DEFAULT 'goldenrod',
  	\`version_hero_hero_wallpaper\` integer DEFAULT false,
  	\`version_hero_hero_wallpaper_color\` text DEFAULT 'green',
  	\`version_meta_title\` text,
  	\`version_meta_description\` text,
  	\`version_meta_image_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_discipline_id\`) REFERENCES \`disciplines\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_visual_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_solutions_v_parent_idx\` ON \`_solutions_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_version_version_slug_idx\` ON \`_solutions_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_version_version_discipline_idx\` ON \`_solutions_v\` (\`version_discipline_id\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_version_hero_version_hero_visual_idx\` ON \`_solutions_v\` (\`version_hero_visual_id\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_version_hero_version_hero_background_image_idx\` ON \`_solutions_v\` (\`version_hero_background_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_version_meta_version_meta_image_idx\` ON \`_solutions_v\` (\`version_meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_version_version_updated_at_idx\` ON \`_solutions_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_version_version_created_at_idx\` ON \`_solutions_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_created_at_idx\` ON \`_solutions_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_updated_at_idx\` ON \`_solutions_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_solutions_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`testimonials_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_solutions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_solutions_v_rels_order_idx\` ON \`_solutions_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_rels_parent_idx\` ON \`_solutions_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_rels_path_idx\` ON \`_solutions_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_rels_testimonials_id_idx\` ON \`_solutions_v_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`_solutions_v_rels_users_id_idx\` ON \`_solutions_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`case_studies_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`case_studies_rels_order_idx\` ON \`case_studies_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_parent_idx\` ON \`case_studies_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_path_idx\` ON \`case_studies_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`case_studies_rels_users_id_idx\` ON \`case_studies_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_version_metrics\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`label\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_metrics_order_idx\` ON \`_case_studies_v_version_metrics\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_metrics_parent_id_idx\` ON \`_case_studies_v_version_metrics\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text NOT NULL,
  	\`version_slug\` text NOT NULL,
  	\`version_headline\` text,
  	\`version_summary\` text,
  	\`version_body\` text,
  	\`version_client_descriptor\` text,
  	\`version_client_firm_size\` text,
  	\`version_discipline_id\` integer,
  	\`version_featured\` integer DEFAULT false,
  	\`version_approved\` integer DEFAULT false,
  	\`version_cover_image_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`case_studies\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_discipline_id\`) REFERENCES \`disciplines\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_parent_idx\` ON \`_case_studies_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_slug_idx\` ON \`_case_studies_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_discipline_idx\` ON \`_case_studies_v\` (\`version_discipline_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_cover_image_idx\` ON \`_case_studies_v\` (\`version_cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_updated_at_idx\` ON \`_case_studies_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_version_version_created_at_idx\` ON \`_case_studies_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_created_at_idx\` ON \`_case_studies_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_updated_at_idx\` ON \`_case_studies_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_case_studies_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_case_studies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_order_idx\` ON \`_case_studies_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_parent_idx\` ON \`_case_studies_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_path_idx\` ON \`_case_studies_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_case_studies_v_rels_users_id_idx\` ON \`_case_studies_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`vanguard_events_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`vanguard_events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`vanguard_events_rels_order_idx\` ON \`vanguard_events_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`vanguard_events_rels_parent_idx\` ON \`vanguard_events_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`vanguard_events_rels_path_idx\` ON \`vanguard_events_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`vanguard_events_rels_users_id_idx\` ON \`vanguard_events_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_vanguard_events_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text NOT NULL,
  	\`version_slug\` text NOT NULL,
  	\`version_description\` text,
  	\`version_date\` text NOT NULL,
  	\`version_location_type\` text DEFAULT 'virtual',
  	\`version_location_address\` text,
  	\`version_location_city\` text,
  	\`version_location_platform\` text,
  	\`version_registration_url\` text,
  	\`version_capacity\` numeric,
  	\`version_status\` text DEFAULT 'upcoming' NOT NULL,
  	\`version_vanguard_only\` integer DEFAULT true,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`vanguard_events\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_vanguard_events_v_parent_idx\` ON \`_vanguard_events_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_vanguard_events_v_version_version_slug_idx\` ON \`_vanguard_events_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_vanguard_events_v_version_version_updated_at_idx\` ON \`_vanguard_events_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_vanguard_events_v_version_version_created_at_idx\` ON \`_vanguard_events_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_vanguard_events_v_created_at_idx\` ON \`_vanguard_events_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_vanguard_events_v_updated_at_idx\` ON \`_vanguard_events_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_vanguard_events_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_vanguard_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_vanguard_events_v_rels_order_idx\` ON \`_vanguard_events_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_vanguard_events_v_rels_parent_idx\` ON \`_vanguard_events_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_vanguard_events_v_rels_path_idx\` ON \`_vanguard_events_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_vanguard_events_v_rels_users_id_idx\` ON \`_vanguard_events_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_llm_instructions\` (
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`entity_slug\` text NOT NULL,
  	\`entity_type\` text NOT NULL,
  	\`additional_instructions\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_entity_slug_idx\` ON \`payload_llm_instructions\` (\`entity_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_updated_at_idx\` ON \`payload_llm_instructions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_created_at_idx\` ON \`payload_llm_instructions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_llm_instructions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_llm_instructions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_rels_order_idx\` ON \`payload_llm_instructions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_rels_parent_idx\` ON \`payload_llm_instructions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_rels_path_idx\` ON \`payload_llm_instructions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_rels_users_id_idx\` ON \`payload_llm_instructions_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_rels_order_idx\` ON \`site_settings_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_rels_parent_idx\` ON \`site_settings_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_rels_path_idx\` ON \`site_settings_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_rels_users_id_idx\` ON \`site_settings_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_blog_newsletter_segment_ids\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`segment_id\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_blog_newsletter_segment_ids_order_idx\` ON \`_site_settings_v_version_blog_newsletter_segment_ids\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_blog_newsletter_segment_ids_parent_id_idx\` ON \`_site_settings_v_version_blog_newsletter_segment_ids\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_organization_schema_same_as\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`url\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_organization_schema_same_as_order_idx\` ON \`_site_settings_v_version_organization_schema_same_as\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_organization_schema_same_as_parent_id_idx\` ON \`_site_settings_v_version_organization_schema_same_as\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_site_name\` text DEFAULT 'ELLA',
  	\`version_logo_id\` integer,
  	\`version_logomark_id\` integer,
  	\`version_social_links_linked_in\` text,
  	\`version_social_links_twitter\` text,
  	\`version_social_links_youtube\` text,
  	\`version_index_now_enabled\` integer DEFAULT false,
  	\`version_llms_txt\` text,
  	\`version_credits_body\` text,
  	\`version_announcement_bar_enabled\` integer DEFAULT false,
  	\`version_announcement_bar_message\` text,
  	\`version_announcement_bar_link_label\` text,
  	\`version_announcement_bar_link_href\` text,
  	\`version_announcement_bar_style\` text DEFAULT 'forest',
  	\`version_default_title\` text DEFAULT 'ELLA | Practice Systematization for Trusted Advisors' NOT NULL,
  	\`version_title_template\` text DEFAULT '%s | ELLA',
  	\`version_default_description\` text DEFAULT 'ELLA turns trust into action with tools built for advisor-led transitions. Go from intake to insight in a fraction of the time.' NOT NULL,
  	\`version_og_image_id\` integer,
  	\`version_twitter_handle\` text,
  	\`version_organization_schema_legal_name\` text,
  	\`version_organization_schema_founding_date\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_logomark_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_version_logo_idx\` ON \`_site_settings_v\` (\`version_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_version_logomark_idx\` ON \`_site_settings_v\` (\`version_logomark_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_version_og_image_idx\` ON \`_site_settings_v\` (\`version_og_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_created_at_idx\` ON \`_site_settings_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_updated_at_idx\` ON \`_site_settings_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_rels_order_idx\` ON \`_site_settings_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_rels_parent_idx\` ON \`_site_settings_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_rels_path_idx\` ON \`_site_settings_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_rels_users_id_idx\` ON \`_site_settings_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`navigation_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navigation_rels_order_idx\` ON \`navigation_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`navigation_rels_parent_idx\` ON \`navigation_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`navigation_rels_path_idx\` ON \`navigation_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`navigation_rels_users_id_idx\` ON \`navigation_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_navigation_v_version_primary_nav_dropdown_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`href\` text,
  	\`description\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_navigation_v_version_primary_nav\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_navigation_v_version_primary_nav_dropdown_items_order_idx\` ON \`_navigation_v_version_primary_nav_dropdown_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_navigation_v_version_primary_nav_dropdown_items_parent_id_idx\` ON \`_navigation_v_version_primary_nav_dropdown_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_navigation_v_version_primary_nav\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text,
  	\`type\` text DEFAULT 'link',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_navigation_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_navigation_v_version_primary_nav_order_idx\` ON \`_navigation_v_version_primary_nav\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_navigation_v_version_primary_nav_parent_id_idx\` ON \`_navigation_v_version_primary_nav\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_navigation_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_login_link_enabled\` integer DEFAULT false,
  	\`version_login_link_label\` text DEFAULT 'Log in',
  	\`version_login_link_href\` text DEFAULT 'https://app.withella.io',
  	\`version_primary_cta_label\` text DEFAULT 'Get Started',
  	\`version_primary_cta_href\` text DEFAULT '/get-started',
  	\`version_secondary_cta_label\` text DEFAULT 'Book a Demo',
  	\`version_secondary_cta_href\` text DEFAULT '/demo',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_navigation_v_created_at_idx\` ON \`_navigation_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_navigation_v_updated_at_idx\` ON \`_navigation_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_navigation_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_navigation_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_navigation_v_rels_order_idx\` ON \`_navigation_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_navigation_v_rels_parent_idx\` ON \`_navigation_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_navigation_v_rels_path_idx\` ON \`_navigation_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_navigation_v_rels_users_id_idx\` ON \`_navigation_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v_version_columns_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`link_type\` text DEFAULT 'external',
  	\`href\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_footer_v_version_columns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_version_columns_links_order_idx\` ON \`_footer_v_version_columns_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_columns_links_parent_id_idx\` ON \`_footer_v_version_columns_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v_version_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_footer_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_version_columns_order_idx\` ON \`_footer_v_version_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_columns_parent_id_idx\` ON \`_footer_v_version_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v_version_newsletter_section_segment_ids\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`segment_id\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_footer_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_version_newsletter_section_segment_ids_order_idx\` ON \`_footer_v_version_newsletter_section_segment_ids\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_newsletter_section_segment_ids_parent_id_idx\` ON \`_footer_v_version_newsletter_section_segment_ids\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v_version_legal_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_footer_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_version_legal_links_order_idx\` ON \`_footer_v_version_legal_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_legal_links_parent_id_idx\` ON \`_footer_v_version_legal_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v_version_easter_egg_local_variants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`image_id\` integer,
  	\`text\` text,
  	\`match_cities\` text,
  	\`match_region_code\` text,
  	\`match_country_code\` text,
  	\`match_center_lat\` numeric,
  	\`match_center_lon\` numeric,
  	\`match_radius_miles\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_footer_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_version_easter_egg_local_variants_order_idx\` ON \`_footer_v_version_easter_egg_local_variants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_easter_egg_local_variants_parent_id_idx\` ON \`_footer_v_version_easter_egg_local_variants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_easter_egg_local_variants_image_idx\` ON \`_footer_v_version_easter_egg_local_variants\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_bg_style\` text DEFAULT 'brand-black',
  	\`version_logomark_id\` integer,
  	\`version_footer_logo_id\` integer,
  	\`version_footer_logo_color\` text,
  	\`version_footer_logo_opacity\` numeric,
  	\`version_footer_logo_clip_percent\` numeric DEFAULT 25,
  	\`version_description\` text DEFAULT 'ELLA turns trust into action with tools built for advisor-led transitions.',
  	\`version_newsletter_section_enabled\` integer DEFAULT true,
  	\`version_newsletter_section_heading\` text DEFAULT 'Stay current',
  	\`version_newsletter_section_subheading\` text,
  	\`version_newsletter_section_placeholder\` text DEFAULT 'Your email address',
  	\`version_newsletter_section_button_label\` text DEFAULT 'Subscribe',
  	\`version_copyright_text\` text DEFAULT '© ELLA. All rights reserved.',
  	\`version_easter_egg_enabled\` integer DEFAULT false,
  	\`version_easter_egg_background_image_id\` integer,
  	\`version_easter_egg_text\` text DEFAULT 'Believe in Main Street',
  	\`version_easter_egg_local_image_id\` integer,
  	\`version_easter_egg_local_text\` text,
  	\`version_easter_egg_height\` numeric DEFAULT 400,
  	\`version_status_badge_enabled\` integer DEFAULT false,
  	\`version_status_badge_embed_html\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_logomark_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_footer_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_easter_egg_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_easter_egg_local_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_version_version_logomark_idx\` ON \`_footer_v\` (\`version_logomark_id\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_version_footer_logo_idx\` ON \`_footer_v\` (\`version_footer_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_easter_egg_version_easter_egg_backgrou_idx\` ON \`_footer_v\` (\`version_easter_egg_background_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_easter_egg_version_easter_egg_local_im_idx\` ON \`_footer_v\` (\`version_easter_egg_local_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_created_at_idx\` ON \`_footer_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_updated_at_idx\` ON \`_footer_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`landing_pages_id\` integer,
  	\`solutions_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_footer_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`landing_pages_id\`) REFERENCES \`landing_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`solutions_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_rels_order_idx\` ON \`_footer_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_rels_parent_idx\` ON \`_footer_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_rels_path_idx\` ON \`_footer_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_rels_pages_id_idx\` ON \`_footer_v_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_rels_landing_pages_id_idx\` ON \`_footer_v_rels\` (\`landing_pages_id\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_rels_solutions_id_idx\` ON \`_footer_v_rels\` (\`solutions_id\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_rels_users_id_idx\` ON \`_footer_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`pricing_page_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pricing_page\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pricing_page_rels_order_idx\` ON \`pricing_page_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pricing_page_rels_parent_idx\` ON \`pricing_page_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pricing_page_rels_path_idx\` ON \`pricing_page_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pricing_page_rels_users_id_idx\` ON \`pricing_page_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_pricing_page_v_version_trust_badges\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`text\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pricing_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pricing_page_v_version_trust_badges_order_idx\` ON \`_pricing_page_v_version_trust_badges\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pricing_page_v_version_trust_badges_parent_id_idx\` ON \`_pricing_page_v_version_trust_badges\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pricing_page_v_version_shared_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pricing_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pricing_page_v_version_shared_features_order_idx\` ON \`_pricing_page_v_version_shared_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pricing_page_v_version_shared_features_parent_id_idx\` ON \`_pricing_page_v_version_shared_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pricing_page_v_version_categories_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`practitioner_indicator\` text DEFAULT 'check' NOT NULL,
  	\`practitioner_display_text\` text,
  	\`enterprise_indicator\` text DEFAULT 'check' NOT NULL,
  	\`enterprise_display_text\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pricing_page_v_version_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pricing_page_v_version_categories_rows_order_idx\` ON \`_pricing_page_v_version_categories_rows\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pricing_page_v_version_categories_rows_parent_id_idx\` ON \`_pricing_page_v_version_categories_rows\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pricing_page_v_version_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`default_open\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pricing_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pricing_page_v_version_categories_order_idx\` ON \`_pricing_page_v_version_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pricing_page_v_version_categories_parent_id_idx\` ON \`_pricing_page_v_version_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pricing_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_eyebrow\` text DEFAULT 'Pricing',
  	\`version_hero_headline\` text DEFAULT 'Invest in your practice.',
  	\`version_hero_subtitle\` text,
  	\`version_comparison_eyebrow\` text DEFAULT 'Compare Plans',
  	\`version_comparison_heading\` text DEFAULT 'Everything you need, nothing you don''t.',
  	\`version_closer_headline\` text DEFAULT 'Ready to systematize your practice?',
  	\`version_closer_subtitle\` text DEFAULT 'Get started today. No credit card required.',
  	\`version_closer_primary_cta_label\` text,
  	\`version_closer_primary_cta_href\` text,
  	\`version_closer_secondary_cta_label\` text,
  	\`version_closer_secondary_cta_href\` text,
  	\`version_closer_footnote\` text DEFAULT 'Annual billing saves the most. Cancel anytime.',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_pricing_page_v_created_at_idx\` ON \`_pricing_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pricing_page_v_updated_at_idx\` ON \`_pricing_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_pricing_page_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pricing_page_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pricing_page_v_rels_order_idx\` ON \`_pricing_page_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_pricing_page_v_rels_parent_idx\` ON \`_pricing_page_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pricing_page_v_rels_path_idx\` ON \`_pricing_page_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_pricing_page_v_rels_users_id_idx\` ON \`_pricing_page_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`script_injection_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`script_injection\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`script_injection_rels_order_idx\` ON \`script_injection_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`script_injection_rels_parent_idx\` ON \`script_injection_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`script_injection_rels_path_idx\` ON \`script_injection_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`script_injection_rels_users_id_idx\` ON \`script_injection_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_script_injection_v_version_scripts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`enabled\` integer DEFAULT true,
  	\`placement\` text DEFAULT 'head' NOT NULL,
  	\`code\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_script_injection_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_script_injection_v_version_scripts_order_idx\` ON \`_script_injection_v_version_scripts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_script_injection_v_version_scripts_parent_id_idx\` ON \`_script_injection_v_version_scripts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_script_injection_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_script_injection_v_created_at_idx\` ON \`_script_injection_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_script_injection_v_updated_at_idx\` ON \`_script_injection_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_script_injection_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_script_injection_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_script_injection_v_rels_order_idx\` ON \`_script_injection_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_script_injection_v_rels_parent_idx\` ON \`_script_injection_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_script_injection_v_rels_path_idx\` ON \`_script_injection_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_script_injection_v_rels_users_id_idx\` ON \`_script_injection_v_rels\` (\`users_id\`);`)
  await db.run(sql`DROP TABLE \`payload_mcp_api_keys\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
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
  	FOREIGN KEY (\`vanguard_events_id\`) REFERENCES \`vanguard_events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "posts_id", "pages_id", "landing_pages_id", "categories_id", "disciplines_id", "team_members_id", "testimonials_id", "partners_id", "faq_items_id", "pricing_tiers_id", "tools_id", "redirects_id", "solutions_id", "case_studies_id", "vanguard_events_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "posts_id", "pages_id", "landing_pages_id", "categories_id", "disciplines_id", "team_members_id", "testimonials_id", "partners_id", "faq_items_id", "pricing_tiers_id", "tools_id", "redirects_id", "solutions_id", "case_studies_id", "vanguard_events_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
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
  await db.run(sql`CREATE TABLE \`__new_payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_preferences_rels\`("id", "order", "parent_id", "path", "users_id") SELECT "id", "order", "parent_id", "path", "users_id" FROM \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_preferences_rels\` RENAME TO \`payload_preferences_rels\`;`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`api_key\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`api_key_last4\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`api_key_index\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`reset_password_requested_at\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`prefix\` text DEFAULT '';`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`_objectkey\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_filename\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_url\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_prefix\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original__objectkey\` text;`)
  await db.run(sql`CREATE INDEX \`media_original_original_filename_idx\` ON \`media\` (\`original_filename\`);`)
  await db.run(sql`ALTER TABLE \`posts_rels\` ADD \`users_id\` integer REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`posts_rels_users_id_idx\` ON \`posts_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_rels\` ADD \`users_id\` integer REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`pages_rels_users_id_idx\` ON \`pages_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`landing_pages_rels\` ADD \`users_id\` integer REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`landing_pages_rels_users_id_idx\` ON \`landing_pages_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`testimonials_rels\` ADD \`users_id\` integer REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`testimonials_rels_users_id_idx\` ON \`testimonials_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`tools_rels\` ADD \`users_id\` integer REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`tools_rels_users_id_idx\` ON \`tools_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`solutions_rels\` ADD \`users_id\` integer REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`solutions_rels_users_id_idx\` ON \`solutions_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`footer_rels\` ADD \`users_id\` integer REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`footer_rels_users_id_idx\` ON \`footer_rels\` (\`users_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
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
  	\`pricing_tiers_find\` integer DEFAULT false,
  	\`pricing_tiers_create\` integer DEFAULT false,
  	\`pricing_tiers_update\` integer DEFAULT false,
  	\`pricing_tiers_delete\` integer DEFAULT false,
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
  await db.run(sql`DROP TABLE \`users_rels\`;`)
  await db.run(sql`DROP TABLE \`_users_v_version_sessions\`;`)
  await db.run(sql`DROP TABLE \`_users_v\`;`)
  await db.run(sql`DROP TABLE \`_users_v_rels\`;`)
  await db.run(sql`DROP TABLE \`media_rels\`;`)
  await db.run(sql`DROP TABLE \`_media_v\`;`)
  await db.run(sql`DROP TABLE \`_media_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_content_section\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_card_grid_cards_capabilities\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_card_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_card_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_testimonial_block\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta_section\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_credibility_strip_stats\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_credibility_strip\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_feature_deep_dive_sections\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_feature_deep_dive\`;`)
  await db.run(sql`DROP TABLE \`_cmp_tbl_v_columns\`;`)
  await db.run(sql`DROP TABLE \`_cmp_tbl_v_rows_values\`;`)
  await db.run(sql`DROP TABLE \`_cmp_tbl_v_rows\`;`)
  await db.run(sql`DROP TABLE \`_cmp_tbl_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_trust_security_sections\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_trust_security\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_numbered_steps_steps\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_numbered_steps\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_solutions_selector\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_faq_accordion\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_pricing_journey\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_newsletter_capture_segment_ids\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_newsletter_capture\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_form_embed\`;`)
  await db.run(sql`DROP TABLE \`_bfr_aftr_v_before_points\`;`)
  await db.run(sql`DROP TABLE \`_bfr_aftr_v_after_points\`;`)
  await db.run(sql`DROP TABLE \`_bfr_aftr_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_bridge_section_quotes\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_bridge_section\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_product_features_items_badges\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_product_features_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_product_features\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_squeeze_section_quotes\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_squeeze_section_pressure_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_squeeze_section_erosion_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_squeeze_section\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_dilemma_section_table_data\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_dilemma_section_steps\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_dilemma_section\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_advisor_personas_personas\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_advisor_personas\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_values_grid_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_values_grid\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_feature_showcase_accordion_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_feature_showcase_gallery_items\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_feature_showcase\`;`)
  await db.run(sql`DROP TABLE \`_prmpt_antm_v_items\`;`)
  await db.run(sql`DROP TABLE \`_prmpt_antm_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_landing_pages_v_blocks_content_section\`;`)
  await db.run(sql`DROP TABLE \`_landing_pages_v_blocks_card_grid_cards_capabilities\`;`)
  await db.run(sql`DROP TABLE \`_landing_pages_v_blocks_card_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`_landing_pages_v_blocks_card_grid\`;`)
  await db.run(sql`DROP TABLE \`_landing_pages_v_blocks_testimonial_block\`;`)
  await db.run(sql`DROP TABLE \`_landing_pages_v_blocks_cta_section\`;`)
  await db.run(sql`DROP TABLE \`_landing_pages_v_blocks_credibility_strip_stats\`;`)
  await db.run(sql`DROP TABLE \`_landing_pages_v_blocks_credibility_strip\`;`)
  await db.run(sql`DROP TABLE \`_landing_pages_v_blocks_feature_deep_dive_sections\`;`)
  await db.run(sql`DROP TABLE \`_landing_pages_v_blocks_feature_deep_dive\`;`)
  await db.run(sql`DROP TABLE \`_landing_pages_v_blocks_trust_security_sections\`;`)
  await db.run(sql`DROP TABLE \`_landing_pages_v_blocks_trust_security\`;`)
  await db.run(sql`DROP TABLE \`_landing_pages_v_blocks_numbered_steps_steps\`;`)
  await db.run(sql`DROP TABLE \`_landing_pages_v_blocks_numbered_steps\`;`)
  await db.run(sql`DROP TABLE \`_landing_pages_v_blocks_solutions_selector\`;`)
  await db.run(sql`DROP TABLE \`_landing_pages_v_blocks_faq_accordion\`;`)
  await db.run(sql`DROP TABLE \`_landing_pages_v_blocks_newsletter_capture_segment_ids\`;`)
  await db.run(sql`DROP TABLE \`_landing_pages_v_blocks_newsletter_capture\`;`)
  await db.run(sql`DROP TABLE \`_landing_pages_v_blocks_form_embed\`;`)
  await db.run(sql`DROP TABLE \`_landing_pages_v\`;`)
  await db.run(sql`DROP TABLE \`_landing_pages_v_rels\`;`)
  await db.run(sql`DROP TABLE \`categories_rels\`;`)
  await db.run(sql`DROP TABLE \`_categories_v\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_rels\`;`)
  await db.run(sql`DROP TABLE \`disciplines_rels\`;`)
  await db.run(sql`DROP TABLE \`_disciplines_v\`;`)
  await db.run(sql`DROP TABLE \`_disciplines_v_rels\`;`)
  await db.run(sql`DROP TABLE \`team_members_rels\`;`)
  await db.run(sql`DROP TABLE \`_team_members_v\`;`)
  await db.run(sql`DROP TABLE \`_team_members_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_testimonials_v\`;`)
  await db.run(sql`DROP TABLE \`_testimonials_v_rels\`;`)
  await db.run(sql`DROP TABLE \`partners_rels\`;`)
  await db.run(sql`DROP TABLE \`_partners_v\`;`)
  await db.run(sql`DROP TABLE \`_partners_v_rels\`;`)
  await db.run(sql`DROP TABLE \`faq_items_rels\`;`)
  await db.run(sql`DROP TABLE \`_faq_items_v\`;`)
  await db.run(sql`DROP TABLE \`_faq_items_v_rels\`;`)
  await db.run(sql`DROP TABLE \`pricing_tiers_rels\`;`)
  await db.run(sql`DROP TABLE \`_pricing_tiers_v_version_features\`;`)
  await db.run(sql`DROP TABLE \`_pricing_tiers_v\`;`)
  await db.run(sql`DROP TABLE \`_pricing_tiers_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_tools_v\`;`)
  await db.run(sql`DROP TABLE \`_tools_v_rels\`;`)
  await db.run(sql`DROP TABLE \`redirects_rels\`;`)
  await db.run(sql`DROP TABLE \`_redirects_v\`;`)
  await db.run(sql`DROP TABLE \`_redirects_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_solutions_v_blocks_content_section\`;`)
  await db.run(sql`DROP TABLE \`_solutions_v_blocks_card_grid_cards_capabilities\`;`)
  await db.run(sql`DROP TABLE \`_solutions_v_blocks_card_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`_solutions_v_blocks_card_grid\`;`)
  await db.run(sql`DROP TABLE \`_solutions_v_blocks_testimonial_block\`;`)
  await db.run(sql`DROP TABLE \`_solutions_v_blocks_cta_section\`;`)
  await db.run(sql`DROP TABLE \`_solutions_v_blocks_feature_deep_dive_sections\`;`)
  await db.run(sql`DROP TABLE \`_solutions_v_blocks_feature_deep_dive\`;`)
  await db.run(sql`DROP TABLE \`_solutions_v_blocks_numbered_steps_steps\`;`)
  await db.run(sql`DROP TABLE \`_solutions_v_blocks_numbered_steps\`;`)
  await db.run(sql`DROP TABLE \`_solutions_v_blocks_form_embed\`;`)
  await db.run(sql`DROP TABLE \`_solutions_v\`;`)
  await db.run(sql`DROP TABLE \`_solutions_v_rels\`;`)
  await db.run(sql`DROP TABLE \`case_studies_rels\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_version_metrics\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v\`;`)
  await db.run(sql`DROP TABLE \`_case_studies_v_rels\`;`)
  await db.run(sql`DROP TABLE \`vanguard_events_rels\`;`)
  await db.run(sql`DROP TABLE \`_vanguard_events_v\`;`)
  await db.run(sql`DROP TABLE \`_vanguard_events_v_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_llm_instructions\`;`)
  await db.run(sql`DROP TABLE \`payload_llm_instructions_rels\`;`)
  await db.run(sql`DROP TABLE \`site_settings_rels\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_blog_newsletter_segment_ids\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_organization_schema_same_as\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_rels\`;`)
  await db.run(sql`DROP TABLE \`navigation_rels\`;`)
  await db.run(sql`DROP TABLE \`_navigation_v_version_primary_nav_dropdown_items\`;`)
  await db.run(sql`DROP TABLE \`_navigation_v_version_primary_nav\`;`)
  await db.run(sql`DROP TABLE \`_navigation_v\`;`)
  await db.run(sql`DROP TABLE \`_navigation_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_version_columns_links\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_version_columns\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_version_newsletter_section_segment_ids\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_version_legal_links\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_version_easter_egg_local_variants\`;`)
  await db.run(sql`DROP TABLE \`_footer_v\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_rels\`;`)
  await db.run(sql`DROP TABLE \`pricing_page_rels\`;`)
  await db.run(sql`DROP TABLE \`_pricing_page_v_version_trust_badges\`;`)
  await db.run(sql`DROP TABLE \`_pricing_page_v_version_shared_features\`;`)
  await db.run(sql`DROP TABLE \`_pricing_page_v_version_categories_rows\`;`)
  await db.run(sql`DROP TABLE \`_pricing_page_v_version_categories\`;`)
  await db.run(sql`DROP TABLE \`_pricing_page_v\`;`)
  await db.run(sql`DROP TABLE \`_pricing_page_v_rels\`;`)
  await db.run(sql`DROP TABLE \`script_injection_rels\`;`)
  await db.run(sql`DROP TABLE \`_script_injection_v_version_scripts\`;`)
  await db.run(sql`DROP TABLE \`_script_injection_v\`;`)
  await db.run(sql`DROP TABLE \`_script_injection_v_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_posts_rels\` (
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
  await db.run(sql`INSERT INTO \`__new_posts_rels\`("id", "order", "parent_id", "path", "categories_id", "disciplines_id", "posts_id") SELECT "id", "order", "parent_id", "path", "categories_id", "disciplines_id", "posts_id" FROM \`posts_rels\`;`)
  await db.run(sql`DROP TABLE \`posts_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_posts_rels\` RENAME TO \`posts_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`posts_rels_order_idx\` ON \`posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_parent_idx\` ON \`posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_path_idx\` ON \`posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_categories_id_idx\` ON \`posts_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_disciplines_id_idx\` ON \`posts_rels\` (\`disciplines_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_posts_id_idx\` ON \`posts_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_rels\` (
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
  await db.run(sql`INSERT INTO \`__new_pages_rels\`("id", "order", "parent_id", "path", "testimonials_id", "partners_id", "solutions_id", "faq_items_id", "pricing_tiers_id") SELECT "id", "order", "parent_id", "path", "testimonials_id", "partners_id", "solutions_id", "faq_items_id", "pricing_tiers_id" FROM \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_rels\` RENAME TO \`pages_rels\`;`)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_testimonials_id_idx\` ON \`pages_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_partners_id_idx\` ON \`pages_rels\` (\`partners_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_solutions_id_idx\` ON \`pages_rels\` (\`solutions_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_faq_items_id_idx\` ON \`pages_rels\` (\`faq_items_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_pricing_tiers_id_idx\` ON \`pages_rels\` (\`pricing_tiers_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_landing_pages_rels\` (
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
  await db.run(sql`INSERT INTO \`__new_landing_pages_rels\`("id", "order", "parent_id", "path", "testimonials_id", "partners_id", "solutions_id", "faq_items_id") SELECT "id", "order", "parent_id", "path", "testimonials_id", "partners_id", "solutions_id", "faq_items_id" FROM \`landing_pages_rels\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_landing_pages_rels\` RENAME TO \`landing_pages_rels\`;`)
  await db.run(sql`CREATE INDEX \`landing_pages_rels_order_idx\` ON \`landing_pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_rels_parent_idx\` ON \`landing_pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_rels_path_idx\` ON \`landing_pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_rels_testimonials_id_idx\` ON \`landing_pages_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_rels_partners_id_idx\` ON \`landing_pages_rels\` (\`partners_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_rels_solutions_id_idx\` ON \`landing_pages_rels\` (\`solutions_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_rels_faq_items_id_idx\` ON \`landing_pages_rels\` (\`faq_items_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_testimonials_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`disciplines_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`disciplines_id\`) REFERENCES \`disciplines\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_testimonials_rels\`("id", "order", "parent_id", "path", "disciplines_id") SELECT "id", "order", "parent_id", "path", "disciplines_id" FROM \`testimonials_rels\`;`)
  await db.run(sql`DROP TABLE \`testimonials_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_testimonials_rels\` RENAME TO \`testimonials_rels\`;`)
  await db.run(sql`CREATE INDEX \`testimonials_rels_order_idx\` ON \`testimonials_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_rels_parent_idx\` ON \`testimonials_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_rels_path_idx\` ON \`testimonials_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_rels_disciplines_id_idx\` ON \`testimonials_rels\` (\`disciplines_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_tools_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`disciplines_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tools\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`disciplines_id\`) REFERENCES \`disciplines\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_tools_rels\`("id", "order", "parent_id", "path", "disciplines_id") SELECT "id", "order", "parent_id", "path", "disciplines_id" FROM \`tools_rels\`;`)
  await db.run(sql`DROP TABLE \`tools_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_tools_rels\` RENAME TO \`tools_rels\`;`)
  await db.run(sql`CREATE INDEX \`tools_rels_order_idx\` ON \`tools_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`tools_rels_parent_idx\` ON \`tools_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tools_rels_path_idx\` ON \`tools_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`tools_rels_disciplines_id_idx\` ON \`tools_rels\` (\`disciplines_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_solutions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`testimonials_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_solutions_rels\`("id", "order", "parent_id", "path", "testimonials_id") SELECT "id", "order", "parent_id", "path", "testimonials_id" FROM \`solutions_rels\`;`)
  await db.run(sql`DROP TABLE \`solutions_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_solutions_rels\` RENAME TO \`solutions_rels\`;`)
  await db.run(sql`CREATE INDEX \`solutions_rels_order_idx\` ON \`solutions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_rels_parent_idx\` ON \`solutions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_rels_path_idx\` ON \`solutions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`solutions_rels_testimonials_id_idx\` ON \`solutions_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_footer_rels\` (
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
  await db.run(sql`INSERT INTO \`__new_footer_rels\`("id", "order", "parent_id", "path", "pages_id", "landing_pages_id", "solutions_id") SELECT "id", "order", "parent_id", "path", "pages_id", "landing_pages_id", "solutions_id" FROM \`footer_rels\`;`)
  await db.run(sql`DROP TABLE \`footer_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_footer_rels\` RENAME TO \`footer_rels\`;`)
  await db.run(sql`CREATE INDEX \`footer_rels_order_idx\` ON \`footer_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_parent_idx\` ON \`footer_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_path_idx\` ON \`footer_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_pages_id_idx\` ON \`footer_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_landing_pages_id_idx\` ON \`footer_rels\` (\`landing_pages_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_solutions_id_idx\` ON \`footer_rels\` (\`solutions_id\`);`)
  await db.run(sql`DROP INDEX \`media_original_original_filename_idx\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`prefix\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`_objectkey\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_filename\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_url\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_filesize\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_width\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_height\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_prefix\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original__objectkey\`;`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`payload_mcp_api_keys_id\` integer REFERENCES payload_mcp_api_keys(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_payload_mcp_api_keys_id_idx\` ON \`payload_locked_documents_rels\` (\`payload_mcp_api_keys_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_preferences_rels\` ADD \`payload_mcp_api_keys_id\` integer REFERENCES payload_mcp_api_keys(id);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_payload_mcp_api_keys_id_idx\` ON \`payload_preferences_rels\` (\`payload_mcp_api_keys_id\`);`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`api_key\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`api_key_last4\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`api_key_index\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`reset_password_requested_at\`;`)
}
