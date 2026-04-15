import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_values_grid_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_values_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_values_grid_items_order_idx\` ON \`pages_blocks_values_grid_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_values_grid_items_parent_id_idx\` ON \`pages_blocks_values_grid_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_values_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`description\` text,
  	\`bg_style\` text DEFAULT 'sandstone',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_values_grid_order_idx\` ON \`pages_blocks_values_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_values_grid_parent_id_idx\` ON \`pages_blocks_values_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_values_grid_path_idx\` ON \`pages_blocks_values_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_feature_showcase_accordion_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text,
  	\`answer\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_feature_showcase\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_showcase_accordion_items_order_idx\` ON \`pages_blocks_feature_showcase_accordion_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_showcase_accordion_items_parent_id_idx\` ON \`pages_blocks_feature_showcase_accordion_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_feature_showcase_gallery_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`static_image_id\` integer NOT NULL,
  	\`animated_image_id\` integer,
  	\`caption\` text,
  	\`subcaption\` text,
  	\`bg_color\` text,
  	\`frame_image\` integer DEFAULT false,
  	\`anchor_target\` text,
  	FOREIGN KEY (\`static_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`animated_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_feature_showcase\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_showcase_gallery_items_order_idx\` ON \`pages_blocks_feature_showcase_gallery_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_showcase_gallery_items_parent_id_idx\` ON \`pages_blocks_feature_showcase_gallery_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_showcase_gallery_items_static_image_idx\` ON \`pages_blocks_feature_showcase_gallery_items\` (\`static_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_showcase_gallery_items_animated_ima_idx\` ON \`pages_blocks_feature_showcase_gallery_items\` (\`animated_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_feature_showcase\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
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
  	\`block_name\` text,
  	FOREIGN KEY (\`header_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_showcase_order_idx\` ON \`pages_blocks_feature_showcase\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_showcase_parent_id_idx\` ON \`pages_blocks_feature_showcase\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_showcase_path_idx\` ON \`pages_blocks_feature_showcase\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_showcase_header_image_idx\` ON \`pages_blocks_feature_showcase\` (\`header_image_id\`);`)
  await db.run(sql`CREATE TABLE \`prmpt_antm_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text NOT NULL,
  	\`annotation_label\` text NOT NULL,
  	\`annotation_detail\` text,
  	\`color\` text DEFAULT 'moss' NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`prmpt_antm\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`prmpt_antm_items_order_idx\` ON \`prmpt_antm_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`prmpt_antm_items_parent_id_idx\` ON \`prmpt_antm_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`prmpt_antm\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
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
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`prmpt_antm_order_idx\` ON \`prmpt_antm\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`prmpt_antm_parent_id_idx\` ON \`prmpt_antm\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`prmpt_antm_path_idx\` ON \`prmpt_antm\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pricing_page_trust_badges\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pricing_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pricing_page_trust_badges_order_idx\` ON \`pricing_page_trust_badges\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pricing_page_trust_badges_parent_id_idx\` ON \`pricing_page_trust_badges\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pricing_page_shared_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pricing_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pricing_page_shared_features_order_idx\` ON \`pricing_page_shared_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pricing_page_shared_features_parent_id_idx\` ON \`pricing_page_shared_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pricing_page_categories_rows\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`practitioner_indicator\` text DEFAULT 'check' NOT NULL,
  	\`practitioner_display_text\` text,
  	\`enterprise_indicator\` text DEFAULT 'check' NOT NULL,
  	\`enterprise_display_text\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pricing_page_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pricing_page_categories_rows_order_idx\` ON \`pricing_page_categories_rows\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pricing_page_categories_rows_parent_id_idx\` ON \`pricing_page_categories_rows\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pricing_page_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`default_open\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pricing_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pricing_page_categories_order_idx\` ON \`pricing_page_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pricing_page_categories_parent_id_idx\` ON \`pricing_page_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pricing_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_eyebrow\` text DEFAULT 'Pricing',
  	\`hero_headline\` text DEFAULT 'Invest in your practice.',
  	\`hero_subtitle\` text,
  	\`comparison_eyebrow\` text DEFAULT 'Compare Plans',
  	\`comparison_heading\` text DEFAULT 'Everything you need, nothing you don''t.',
  	\`closer_headline\` text DEFAULT 'Ready to systematize your practice?',
  	\`closer_subtitle\` text DEFAULT 'Get started today. No credit card required.',
  	\`closer_primary_cta_label\` text,
  	\`closer_primary_cta_href\` text,
  	\`closer_secondary_cta_label\` text,
  	\`closer_secondary_cta_href\` text,
  	\`closer_footnote\` text DEFAULT 'Annual billing saves the most. Cancel anytime.',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`script_injection_scripts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`enabled\` integer DEFAULT true,
  	\`placement\` text DEFAULT 'head' NOT NULL,
  	\`code\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`script_injection\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`script_injection_scripts_order_idx\` ON \`script_injection_scripts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`script_injection_scripts_parent_id_idx\` ON \`script_injection_scripts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`script_injection\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pricing_tiers\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`price_amount\` numeric,
  	\`price_period\` text DEFAULT 'year',
  	\`price_custom_label\` text,
  	\`price_per\` text DEFAULT 'user',
  	\`month_surcharge_percent\` numeric,
  	\`quarter_surcharge_percent\` numeric,
  	\`tagline\` text,
  	\`description\` text,
  	\`badge\` text,
  	\`max_advisors\` text,
  	\`max_clients\` text,
  	\`collaborators_per_client\` text,
  	\`features_header\` text,
  	\`cta_label\` text DEFAULT 'Get Started',
  	\`cta_href\` text,
  	\`highlighted\` integer DEFAULT false,
  	\`sort_order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pricing_tiers\`("id", "name", "price_amount", "price_period", "price_custom_label", "price_per", "month_surcharge_percent", "quarter_surcharge_percent", "tagline", "description", "badge", "max_advisors", "max_clients", "collaborators_per_client", "features_header", "cta_label", "cta_href", "highlighted", "sort_order", "updated_at", "created_at") SELECT "id", "name", "price_amount", "price_period", "price_custom_label", "price_per", "month_surcharge_percent", "quarter_surcharge_percent", "tagline", "description", "badge", "max_advisors", "max_clients", "collaborators_per_client", "features_header", "cta_label", "cta_href", "highlighted", "sort_order", "updated_at", "created_at" FROM \`pricing_tiers\`;`)
  await db.run(sql`DROP TABLE \`pricing_tiers\`;`)
  await db.run(sql`ALTER TABLE \`__new_pricing_tiers\` RENAME TO \`pricing_tiers\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`pricing_tiers_updated_at_idx\` ON \`pricing_tiers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pricing_tiers_created_at_idx\` ON \`pricing_tiers\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_content_section\` ADD \`layout\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_section\` ADD \`cover_image_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_section\` ADD \`cover_image_min_height\` text DEFAULT 'md';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_section\` ADD \`cover_image_object_position\` text DEFAULT 'center';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_cta_section\` ADD \`cover_image_overlay_opacity\` text DEFAULT '60';`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_section_cover_image_cover_image_image_idx\` ON \`pages_blocks_cta_section\` (\`cover_image_image_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_bridge_section\` ADD \`heading_style\` text DEFAULT 'display';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_bridge_section\` ADD \`link_label\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_bridge_section\` ADD \`link_href\` text;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_bridge_section\` ADD \`cover_image_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_bridge_section\` ADD \`cover_image_min_height\` text DEFAULT 'md';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_bridge_section\` ADD \`cover_image_object_position\` text DEFAULT 'center';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_bridge_section\` ADD \`cover_image_overlay_opacity\` text DEFAULT '60';`)
  await db.run(sql`CREATE INDEX \`pages_blocks_bridge_section_cover_image_cover_image_imag_idx\` ON \`pages_blocks_bridge_section\` (\`cover_image_image_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_product_features_items\` ADD \`screenshot_fit\` text DEFAULT 'contain';`)
  await db.run(sql`ALTER TABLE \`pages_blocks_product_features_items\` ADD \`screenshot_position\` text DEFAULT 'center';`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`page_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`page_background_opacity\` numeric DEFAULT 3;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`page_background_top\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`page_background_right\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`page_background_width\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_visual_fit\` text DEFAULT 'contain';`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_visual_position\` text DEFAULT 'center';`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_show_logo_watermark\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_headline_font\` text DEFAULT 'display';`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_hero_wallpaper\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_hero_wallpaper_color\` text DEFAULT 'green';`)
  await db.run(sql`CREATE INDEX \`pages_page_background_page_background_image_idx\` ON \`pages\` (\`page_background_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_background_image_idx\` ON \`pages\` (\`hero_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`landing_pages_blocks_content_section\` ADD \`layout\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`landing_pages_blocks_cta_section\` ADD \`cover_image_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`landing_pages_blocks_cta_section\` ADD \`cover_image_min_height\` text DEFAULT 'md';`)
  await db.run(sql`ALTER TABLE \`landing_pages_blocks_cta_section\` ADD \`cover_image_object_position\` text DEFAULT 'center';`)
  await db.run(sql`ALTER TABLE \`landing_pages_blocks_cta_section\` ADD \`cover_image_overlay_opacity\` text DEFAULT '60';`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_cta_section_cover_image_cover_image_idx\` ON \`landing_pages_blocks_cta_section\` (\`cover_image_image_id\`);`)
  await db.run(sql`ALTER TABLE \`landing_pages\` ADD \`hero_visual_fit\` text DEFAULT 'contain';`)
  await db.run(sql`ALTER TABLE \`landing_pages\` ADD \`hero_visual_position\` text DEFAULT 'center';`)
  await db.run(sql`ALTER TABLE \`landing_pages\` ADD \`hero_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`landing_pages\` ADD \`hero_show_logo_watermark\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`landing_pages\` ADD \`hero_headline_font\` text DEFAULT 'display';`)
  await db.run(sql`ALTER TABLE \`landing_pages\` ADD \`hero_hero_wallpaper\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`landing_pages\` ADD \`hero_hero_wallpaper_color\` text DEFAULT 'green';`)
  await db.run(sql`CREATE INDEX \`landing_pages_hero_hero_background_image_idx\` ON \`landing_pages\` (\`hero_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`solutions_blocks_content_section\` ADD \`layout\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`solutions_blocks_cta_section\` ADD \`cover_image_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`solutions_blocks_cta_section\` ADD \`cover_image_min_height\` text DEFAULT 'md';`)
  await db.run(sql`ALTER TABLE \`solutions_blocks_cta_section\` ADD \`cover_image_object_position\` text DEFAULT 'center';`)
  await db.run(sql`ALTER TABLE \`solutions_blocks_cta_section\` ADD \`cover_image_overlay_opacity\` text DEFAULT '60';`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_cta_section_cover_image_cover_image_ima_idx\` ON \`solutions_blocks_cta_section\` (\`cover_image_image_id\`);`)
  await db.run(sql`ALTER TABLE \`solutions\` ADD \`hero_visual_fit\` text DEFAULT 'contain';`)
  await db.run(sql`ALTER TABLE \`solutions\` ADD \`hero_visual_position\` text DEFAULT 'center';`)
  await db.run(sql`ALTER TABLE \`solutions\` ADD \`hero_background_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`solutions\` ADD \`hero_show_logo_watermark\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`solutions\` ADD \`hero_headline_font\` text DEFAULT 'display';`)
  await db.run(sql`ALTER TABLE \`solutions\` ADD \`hero_hero_wallpaper\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`solutions\` ADD \`hero_hero_wallpaper_color\` text DEFAULT 'green';`)
  await db.run(sql`CREATE INDEX \`solutions_hero_hero_background_image_idx\` ON \`solutions\` (\`hero_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`pricing_tiers_find\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`pricing_tiers_create\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`pricing_tiers_update\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`pricing_tiers_delete\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`index_now_enabled\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`site_settings\` ADD \`llms_txt\` text;`)
  await db.run(sql`ALTER TABLE \`navigation\` ADD \`login_link_enabled\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`navigation\` ADD \`login_link_label\` text DEFAULT 'Log in';`)
  await db.run(sql`ALTER TABLE \`navigation\` ADD \`login_link_href\` text DEFAULT 'https://app.withella.io';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`pages_blocks_values_grid_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_values_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_feature_showcase_accordion_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_feature_showcase_gallery_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_feature_showcase\`;`)
  await db.run(sql`DROP TABLE \`prmpt_antm_items\`;`)
  await db.run(sql`DROP TABLE \`prmpt_antm\`;`)
  await db.run(sql`DROP TABLE \`pricing_page_trust_badges\`;`)
  await db.run(sql`DROP TABLE \`pricing_page_shared_features\`;`)
  await db.run(sql`DROP TABLE \`pricing_page_categories_rows\`;`)
  await db.run(sql`DROP TABLE \`pricing_page_categories\`;`)
  await db.run(sql`DROP TABLE \`pricing_page\`;`)
  await db.run(sql`DROP TABLE \`script_injection_scripts\`;`)
  await db.run(sql`DROP TABLE \`script_injection\`;`)
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
  	\`bg_style\` text DEFAULT 'forest',
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
  await db.run(sql`CREATE TABLE \`__new_pages_blocks_bridge_section\` (
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
  await db.run(sql`INSERT INTO \`__new_pages_blocks_bridge_section\`("_order", "_parent_id", "_path", "id", "label", "heading", "body_style", "body", "closer", "bg_style", "block_name") SELECT "_order", "_parent_id", "_path", "id", "label", "heading", "body_style", "body", "closer", "bg_style", "block_name" FROM \`pages_blocks_bridge_section\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_bridge_section\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_blocks_bridge_section\` RENAME TO \`pages_blocks_bridge_section\`;`)
  await db.run(sql`CREATE INDEX \`pages_blocks_bridge_section_order_idx\` ON \`pages_blocks_bridge_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_bridge_section_parent_id_idx\` ON \`pages_blocks_bridge_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_bridge_section_path_idx\` ON \`pages_blocks_bridge_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages\` (
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
  await db.run(sql`INSERT INTO \`__new_pages\`("id", "title", "slug", "status", "published_date", "parent_id", "hero_headline", "hero_headline_animation", "hero_headline_line2", "hero_headline_animation2", "hero_subheadline", "hero_primary_cta_label", "hero_primary_cta_href", "hero_secondary_cta_label", "hero_secondary_cta_href", "hero_visual_id", "hero_style", "hero_highlight_text", "hero_highlight_color", "meta_title", "meta_description", "meta_image_id", "updated_at", "created_at") SELECT "id", "title", "slug", "status", "published_date", "parent_id", "hero_headline", "hero_headline_animation", "hero_headline_line2", "hero_headline_animation2", "hero_subheadline", "hero_primary_cta_label", "hero_primary_cta_href", "hero_secondary_cta_label", "hero_secondary_cta_href", "hero_visual_id", "hero_style", "hero_highlight_text", "hero_highlight_color", "meta_title", "meta_description", "meta_image_id", "updated_at", "created_at" FROM \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages\` RENAME TO \`pages\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_parent_idx\` ON \`pages\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_visual_idx\` ON \`pages\` (\`hero_visual_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
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
  	\`bg_style\` text DEFAULT 'forest',
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
  await db.run(sql`CREATE TABLE \`__new_landing_pages\` (
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
  await db.run(sql`INSERT INTO \`__new_landing_pages\`("id", "title", "slug", "campaign", "status", "hero_headline", "hero_headline_animation", "hero_headline_line2", "hero_headline_animation2", "hero_subheadline", "hero_primary_cta_label", "hero_primary_cta_href", "hero_secondary_cta_label", "hero_secondary_cta_href", "hero_visual_id", "hero_style", "hero_highlight_text", "hero_highlight_color", "meta_title", "meta_description", "meta_image_id", "updated_at", "created_at") SELECT "id", "title", "slug", "campaign", "status", "hero_headline", "hero_headline_animation", "hero_headline_line2", "hero_headline_animation2", "hero_subheadline", "hero_primary_cta_label", "hero_primary_cta_href", "hero_secondary_cta_label", "hero_secondary_cta_href", "hero_visual_id", "hero_style", "hero_highlight_text", "hero_highlight_color", "meta_title", "meta_description", "meta_image_id", "updated_at", "created_at" FROM \`landing_pages\`;`)
  await db.run(sql`DROP TABLE \`landing_pages\`;`)
  await db.run(sql`ALTER TABLE \`__new_landing_pages\` RENAME TO \`landing_pages\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`landing_pages_slug_idx\` ON \`landing_pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_hero_hero_visual_idx\` ON \`landing_pages\` (\`hero_visual_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_meta_meta_image_idx\` ON \`landing_pages\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_updated_at_idx\` ON \`landing_pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_created_at_idx\` ON \`landing_pages\` (\`created_at\`);`)
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
  	\`bg_style\` text DEFAULT 'forest',
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
  await db.run(sql`CREATE TABLE \`__new_solutions\` (
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
  await db.run(sql`INSERT INTO \`__new_solutions\`("id", "title", "slug", "discipline_id", "tagline", "status", "is_beachhead", "hero_headline", "hero_headline_animation", "hero_headline_line2", "hero_headline_animation2", "hero_subheadline", "hero_primary_cta_label", "hero_primary_cta_href", "hero_secondary_cta_label", "hero_secondary_cta_href", "hero_visual_id", "hero_style", "hero_highlight_text", "hero_highlight_color", "meta_title", "meta_description", "meta_image_id", "updated_at", "created_at") SELECT "id", "title", "slug", "discipline_id", "tagline", "status", "is_beachhead", "hero_headline", "hero_headline_animation", "hero_headline_line2", "hero_headline_animation2", "hero_subheadline", "hero_primary_cta_label", "hero_primary_cta_href", "hero_secondary_cta_label", "hero_secondary_cta_href", "hero_visual_id", "hero_style", "hero_highlight_text", "hero_highlight_color", "meta_title", "meta_description", "meta_image_id", "updated_at", "created_at" FROM \`solutions\`;`)
  await db.run(sql`DROP TABLE \`solutions\`;`)
  await db.run(sql`ALTER TABLE \`__new_solutions\` RENAME TO \`solutions\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`solutions_slug_idx\` ON \`solutions\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`solutions_discipline_idx\` ON \`solutions\` (\`discipline_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_hero_hero_visual_idx\` ON \`solutions\` (\`hero_visual_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_meta_meta_image_idx\` ON \`solutions\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_updated_at_idx\` ON \`solutions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`solutions_created_at_idx\` ON \`solutions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_pricing_tiers\` (
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
  await db.run(sql`INSERT INTO \`__new_pricing_tiers\`("id", "name", "price_amount", "price_period", "price_custom_label", "tagline", "description", "badge", "annual_price_amount", "cta_label", "cta_href", "highlighted", "sort_order", "updated_at", "created_at") SELECT "id", "name", "price_amount", "price_period", "price_custom_label", "tagline", "description", "badge", "annual_price_amount", "cta_label", "cta_href", "highlighted", "sort_order", "updated_at", "created_at" FROM \`pricing_tiers\`;`)
  await db.run(sql`DROP TABLE \`pricing_tiers\`;`)
  await db.run(sql`ALTER TABLE \`__new_pricing_tiers\` RENAME TO \`pricing_tiers\`;`)
  await db.run(sql`CREATE INDEX \`pricing_tiers_updated_at_idx\` ON \`pricing_tiers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pricing_tiers_created_at_idx\` ON \`pricing_tiers\` (\`created_at\`);`)
  await db.run(sql`ALTER TABLE \`pages_blocks_content_section\` DROP COLUMN \`layout\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_product_features_items\` DROP COLUMN \`screenshot_fit\`;`)
  await db.run(sql`ALTER TABLE \`pages_blocks_product_features_items\` DROP COLUMN \`screenshot_position\`;`)
  await db.run(sql`ALTER TABLE \`landing_pages_blocks_content_section\` DROP COLUMN \`layout\`;`)
  await db.run(sql`ALTER TABLE \`solutions_blocks_content_section\` DROP COLUMN \`layout\`;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`pricing_tiers_find\`;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`pricing_tiers_create\`;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`pricing_tiers_update\`;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`pricing_tiers_delete\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`index_now_enabled\`;`)
  await db.run(sql`ALTER TABLE \`site_settings\` DROP COLUMN \`llms_txt\`;`)
  await db.run(sql`ALTER TABLE \`navigation\` DROP COLUMN \`login_link_enabled\`;`)
  await db.run(sql`ALTER TABLE \`navigation\` DROP COLUMN \`login_link_label\`;`)
  await db.run(sql`ALTER TABLE \`navigation\` DROP COLUMN \`login_link_href\`;`)
}
