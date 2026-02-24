import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
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
  	\`bg_style\` text DEFAULT 'cream',
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_section_order_idx\` ON \`pages_blocks_content_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_section_parent_id_idx\` ON \`pages_blocks_content_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_section_path_idx\` ON \`pages_blocks_content_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_section_media_idx\` ON \`pages_blocks_content_section\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_card_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text,
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
  	\`bg_style\` text DEFAULT 'cream',
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
  	\`bg_style\` text DEFAULT 'cream',
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
  	\`label\` text,
  	\`bg_style\` text DEFAULT 'cream',
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
  	\`bg_style\` text DEFAULT 'cream',
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
  	\`bg_style\` text DEFAULT 'cream',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cmp_tbl_order_idx\` ON \`cmp_tbl\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cmp_tbl_parent_id_idx\` ON \`cmp_tbl\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`cmp_tbl_path_idx\` ON \`cmp_tbl\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_trust_security_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`body\` text,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_trust_security\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_trust_security_items_order_idx\` ON \`pages_blocks_trust_security_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_trust_security_items_parent_id_idx\` ON \`pages_blocks_trust_security_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_trust_security_items_icon_idx\` ON \`pages_blocks_trust_security_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_trust_security\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`intro\` text,
  	\`bg_style\` text DEFAULT 'ash-light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_trust_security_order_idx\` ON \`pages_blocks_trust_security\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_trust_security_parent_id_idx\` ON \`pages_blocks_trust_security\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_trust_security_path_idx\` ON \`pages_blocks_trust_security\` (\`_path\`);`)
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
  	\`bg_style\` text DEFAULT 'cream',
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
  	\`bg_style\` text DEFAULT 'cream',
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
  	\`bg_style\` text DEFAULT 'cream',
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
  	\`bg_style\` text DEFAULT 'cream',
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
  	\`bg_style\` text DEFAULT 'ash-light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_newsletter_capture_order_idx\` ON \`pages_blocks_newsletter_capture\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_newsletter_capture_parent_id_idx\` ON \`pages_blocks_newsletter_capture\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_newsletter_capture_path_idx\` ON \`pages_blocks_newsletter_capture\` (\`_path\`);`)
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
  	\`bg_style\` text DEFAULT 'cream',
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_content_section_order_idx\` ON \`landing_pages_blocks_content_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_content_section_parent_id_idx\` ON \`landing_pages_blocks_content_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_content_section_path_idx\` ON \`landing_pages_blocks_content_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_content_section_media_idx\` ON \`landing_pages_blocks_content_section\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_card_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text,
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
  	\`bg_style\` text DEFAULT 'cream',
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
  	\`bg_style\` text DEFAULT 'cream',
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
  	\`label\` text,
  	\`bg_style\` text DEFAULT 'cream',
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
  	\`bg_style\` text DEFAULT 'cream',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_feature_deep_dive_order_idx\` ON \`landing_pages_blocks_feature_deep_dive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_feature_deep_dive_parent_id_idx\` ON \`landing_pages_blocks_feature_deep_dive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_feature_deep_dive_path_idx\` ON \`landing_pages_blocks_feature_deep_dive\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_trust_security_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`body\` text,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages_blocks_trust_security\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_trust_security_items_order_idx\` ON \`landing_pages_blocks_trust_security_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_trust_security_items_parent_id_idx\` ON \`landing_pages_blocks_trust_security_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_trust_security_items_icon_idx\` ON \`landing_pages_blocks_trust_security_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`landing_pages_blocks_trust_security\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`intro\` text,
  	\`bg_style\` text DEFAULT 'ash-light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`landing_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_trust_security_order_idx\` ON \`landing_pages_blocks_trust_security\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_trust_security_parent_id_idx\` ON \`landing_pages_blocks_trust_security\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`landing_pages_blocks_trust_security_path_idx\` ON \`landing_pages_blocks_trust_security\` (\`_path\`);`)
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
  	\`bg_style\` text DEFAULT 'cream',
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
  	\`bg_style\` text DEFAULT 'cream',
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
  	\`bg_style\` text DEFAULT 'cream',
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
  	\`bg_style\` text DEFAULT 'ash-light',
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
  	\`hero_subheadline\` text,
  	\`hero_primary_cta_label\` text,
  	\`hero_primary_cta_href\` text,
  	\`hero_secondary_cta_label\` text,
  	\`hero_secondary_cta_href\` text,
  	\`hero_visual_id\` integer,
  	\`hero_style\` text DEFAULT 'default',
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
  	\`logo_id\` integer NOT NULL,
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
  	\`bg_style\` text DEFAULT 'cream',
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`solutions_blocks_content_section_order_idx\` ON \`solutions_blocks_content_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_content_section_parent_id_idx\` ON \`solutions_blocks_content_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_content_section_path_idx\` ON \`solutions_blocks_content_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_content_section_media_idx\` ON \`solutions_blocks_content_section\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`solutions_blocks_card_grid_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text NOT NULL,
  	\`body\` text,
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
  	\`bg_style\` text DEFAULT 'cream',
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
  	\`bg_style\` text DEFAULT 'cream',
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
  	\`bg_style\` text DEFAULT 'cream',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`solutions_blocks_feature_deep_dive_order_idx\` ON \`solutions_blocks_feature_deep_dive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_feature_deep_dive_parent_id_idx\` ON \`solutions_blocks_feature_deep_dive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_feature_deep_dive_path_idx\` ON \`solutions_blocks_feature_deep_dive\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`solutions_blocks_trust_security_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`body\` text,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`solutions_blocks_trust_security\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`solutions_blocks_trust_security_items_order_idx\` ON \`solutions_blocks_trust_security_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_trust_security_items_parent_id_idx\` ON \`solutions_blocks_trust_security_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_trust_security_items_icon_idx\` ON \`solutions_blocks_trust_security_items\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`solutions_blocks_trust_security\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`heading\` text,
  	\`intro\` text,
  	\`bg_style\` text DEFAULT 'ash-light',
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`solutions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`solutions_blocks_trust_security_order_idx\` ON \`solutions_blocks_trust_security\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_trust_security_parent_id_idx\` ON \`solutions_blocks_trust_security\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`solutions_blocks_trust_security_path_idx\` ON \`solutions_blocks_trust_security\` (\`_path\`);`)
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
  	\`hero_subheadline\` text,
  	\`hero_primary_cta_label\` text,
  	\`hero_primary_cta_href\` text,
  	\`hero_secondary_cta_label\` text,
  	\`hero_secondary_cta_href\` text,
  	\`hero_visual_id\` integer,
  	\`hero_style\` text DEFAULT 'default',
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
  	\`href\` text NOT NULL,
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
  	\`newsletter_section_enabled\` integer DEFAULT true,
  	\`newsletter_section_heading\` text DEFAULT 'Stay current',
  	\`newsletter_section_subheading\` text,
  	\`newsletter_section_placeholder\` text DEFAULT 'Your email address',
  	\`newsletter_section_button_label\` text DEFAULT 'Subscribe',
  	\`copyright_text\` text DEFAULT '© ELLA. All rights reserved.',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`DROP TABLE \`pages_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_feature_grid_features\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_feature_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials_testimonials\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonials\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`authors\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_posts\` (
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
  await db.run(sql`INSERT INTO \`__new_posts\`("id", "title", "slug", "excerpt", "published_date", "status", "author_id", "featured_image_id", "tier", "legacy_slug", "show_newsletter_c_t_a", "content", "meta_title", "meta_description", "meta_image_id", "updated_at", "created_at") SELECT "id", "title", "slug", "excerpt", "published_date", "status", "author_id", "featured_image_id", "tier", "legacy_slug", "show_newsletter_c_t_a", "content", "meta_title", "meta_description", "meta_image_id", "updated_at", "created_at" FROM \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`ALTER TABLE \`__new_posts\` RENAME TO \`posts\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_author_idx\` ON \`posts\` (\`author_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_featured_image_idx\` ON \`posts\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_meta_meta_image_idx\` ON \`posts\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
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
  	FOREIGN KEY (\`payload_mcp_api_keys_id\`) REFERENCES \`payload_mcp_api_keys\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "posts_id", "pages_id", "landing_pages_id", "categories_id", "disciplines_id", "team_members_id", "testimonials_id", "partners_id", "faq_items_id", "pricing_tiers_id", "tools_id", "redirects_id", "solutions_id", "payload_mcp_api_keys_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "posts_id", "pages_id", "landing_pages_id", "categories_id", "disciplines_id", "team_members_id", "testimonials_id", "partners_id", "faq_items_id", "pricing_tiers_id", "tools_id", "redirects_id", "solutions_id", "payload_mcp_api_keys_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
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
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_payload_mcp_api_keys_id_idx\` ON \`payload_locked_documents_rels\` (\`payload_mcp_api_keys_id\`);`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`caption\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`credit\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`category\` text;`)
  await db.run(sql`ALTER TABLE \`posts_rels\` ADD \`disciplines_id\` integer REFERENCES disciplines(id);`)
  await db.run(sql`ALTER TABLE \`posts_rels\` ADD \`posts_id\` integer REFERENCES posts(id);`)
  await db.run(sql`CREATE INDEX \`posts_rels_disciplines_id_idx\` ON \`posts_rels\` (\`disciplines_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_posts_id_idx\` ON \`posts_rels\` (\`posts_id\`);`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`status\` text DEFAULT 'draft';`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`published_date\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`parent_id\` integer REFERENCES pages(id);`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_headline\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_subheadline\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_primary_cta_label\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_primary_cta_href\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_secondary_cta_label\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_secondary_cta_href\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_visual_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_style\` text DEFAULT 'default';`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`meta_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`pages_parent_idx\` ON \`pages\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_visual_idx\` ON \`pages\` (\`hero_visual_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages\` (\`meta_image_id\`);`)
  await db.run(sql`ALTER TABLE \`categories\` ADD \`internal_label\` text;`)
  await db.run(sql`ALTER TABLE \`categories\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`categories\` ADD \`sort_order\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`landing_pages_find\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`landing_pages_create\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`landing_pages_update\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`landing_pages_delete\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`team_members_find\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`team_members_create\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`team_members_update\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`team_members_delete\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`solutions_find\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`solutions_create\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`solutions_update\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`solutions_delete\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`testimonials_find\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`testimonials_create\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`testimonials_update\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`testimonials_delete\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`authors_find\`;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`authors_create\`;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`authors_update\`;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`authors_delete\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`headline\` text NOT NULL,
  	\`subheadline\` text,
  	\`cta_text\` text,
  	\`cta_link\` text,
  	\`background_image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_order_idx\` ON \`pages_blocks_hero\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_parent_id_idx\` ON \`pages_blocks_hero\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_path_idx\` ON \`pages_blocks_hero\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_background_image_idx\` ON \`pages_blocks_hero\` (\`background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_order_idx\` ON \`pages_blocks_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_parent_id_idx\` ON \`pages_blocks_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_path_idx\` ON \`pages_blocks_content\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_feature_grid_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`icon_id\` integer,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_feature_grid\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_grid_features_order_idx\` ON \`pages_blocks_feature_grid_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_grid_features_parent_id_idx\` ON \`pages_blocks_feature_grid_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_grid_features_icon_idx\` ON \`pages_blocks_feature_grid_features\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_feature_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`headline\` text,
  	\`subheadline\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_grid_order_idx\` ON \`pages_blocks_feature_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_grid_parent_id_idx\` ON \`pages_blocks_feature_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_feature_grid_path_idx\` ON \`pages_blocks_feature_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`quote\` text NOT NULL,
  	\`author\` text NOT NULL,
  	\`company\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_testimonials_order_idx\` ON \`pages_blocks_testimonials_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_testimonials_parent_id_idx\` ON \`pages_blocks_testimonials_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_order_idx\` ON \`pages_blocks_testimonials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_parent_id_idx\` ON \`pages_blocks_testimonials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonials_path_idx\` ON \`pages_blocks_testimonials\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`headline\` text NOT NULL,
  	\`description\` text,
  	\`button_text\` text,
  	\`button_link\` text,
  	\`background_color\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_order_idx\` ON \`pages_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_parent_id_idx\` ON \`pages_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_path_idx\` ON \`pages_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`authors\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`bio\` text,
  	\`avatar_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`avatar_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`authors_slug_idx\` ON \`authors\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`authors_avatar_idx\` ON \`authors\` (\`avatar_id\`);`)
  await db.run(sql`CREATE INDEX \`authors_updated_at_idx\` ON \`authors\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`authors_created_at_idx\` ON \`authors\` (\`created_at\`);`)
  await db.run(sql`DROP TABLE \`pages_blocks_content_section\`;`)
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
  await db.run(sql`DROP TABLE \`pages_blocks_trust_security_items\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_trust_security\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_numbered_steps_steps\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_numbered_steps\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_solutions_selector\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_faq_accordion\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_pricing_journey\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_newsletter_capture\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_content_section\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_card_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_card_grid\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_testimonial_block\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_cta_section\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_credibility_strip_stats\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_credibility_strip\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_feature_deep_dive_sections\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_feature_deep_dive\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_trust_security_items\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_trust_security\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_numbered_steps_steps\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_numbered_steps\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_solutions_selector\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_faq_accordion\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_newsletter_capture\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_blocks_form_embed\`;`)
  await db.run(sql`DROP TABLE \`landing_pages\`;`)
  await db.run(sql`DROP TABLE \`landing_pages_rels\`;`)
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
  await db.run(sql`DROP TABLE \`solutions_blocks_card_grid_cards\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_card_grid\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_testimonial_block\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_cta_section\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_feature_deep_dive_sections\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_feature_deep_dive\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_trust_security_items\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_trust_security\`;`)
  await db.run(sql`DROP TABLE \`solutions_blocks_form_embed\`;`)
  await db.run(sql`DROP TABLE \`solutions\`;`)
  await db.run(sql`DROP TABLE \`solutions_rels\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`navigation_primary_nav_dropdown_items\`;`)
  await db.run(sql`DROP TABLE \`navigation_primary_nav\`;`)
  await db.run(sql`DROP TABLE \`navigation\`;`)
  await db.run(sql`DROP TABLE \`footer_columns_links\`;`)
  await db.run(sql`DROP TABLE \`footer_columns\`;`)
  await db.run(sql`DROP TABLE \`footer_legal_links\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`published_date\` text NOT NULL,
  	\`author_id\` integer,
  	\`featured_image_id\` integer,
  	\`meta_description\` text,
  	\`video_embed\` text,
  	\`content\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`author_id\`) REFERENCES \`authors\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_posts\`("id", "title", "slug", "published_date", "author_id", "featured_image_id", "meta_description", "video_embed", "content", "updated_at", "created_at") SELECT "id", "title", "slug", "published_date", "author_id", "featured_image_id", "meta_description", "video_embed", "content", "updated_at", "created_at" FROM \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`ALTER TABLE \`__new_posts\` RENAME TO \`posts\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_author_idx\` ON \`posts\` (\`author_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_featured_image_idx\` ON \`posts\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_posts_rels\`("id", "order", "parent_id", "path", "categories_id") SELECT "id", "order", "parent_id", "path", "categories_id" FROM \`posts_rels\`;`)
  await db.run(sql`DROP TABLE \`posts_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_posts_rels\` RENAME TO \`posts_rels\`;`)
  await db.run(sql`CREATE INDEX \`posts_rels_order_idx\` ON \`posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_parent_idx\` ON \`posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_path_idx\` ON \`posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_categories_id_idx\` ON \`posts_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`meta_description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages\`("id", "title", "slug", "meta_description", "updated_at", "created_at") SELECT "id", "title", "slug", "meta_description", "updated_at", "created_at" FROM \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages\` RENAME TO \`pages\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`posts_id\` integer,
  	\`pages_id\` integer,
  	\`authors_id\` integer,
  	\`categories_id\` integer,
  	\`payload_mcp_api_keys_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`authors_id\`) REFERENCES \`authors\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`payload_mcp_api_keys_id\`) REFERENCES \`payload_mcp_api_keys\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "posts_id", "pages_id", "authors_id", "categories_id", "payload_mcp_api_keys_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "posts_id", "pages_id", "authors_id", "categories_id", "payload_mcp_api_keys_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_authors_id_idx\` ON \`payload_locked_documents_rels\` (\`authors_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_payload_mcp_api_keys_id_idx\` ON \`payload_locked_documents_rels\` (\`payload_mcp_api_keys_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`authors_find\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`authors_create\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`authors_update\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` ADD \`authors_delete\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`landing_pages_find\`;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`landing_pages_create\`;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`landing_pages_update\`;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`landing_pages_delete\`;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`team_members_find\`;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`team_members_create\`;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`team_members_update\`;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`team_members_delete\`;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`solutions_find\`;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`solutions_create\`;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`solutions_update\`;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`solutions_delete\`;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`testimonials_find\`;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`testimonials_create\`;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`testimonials_update\`;`)
  await db.run(sql`ALTER TABLE \`payload_mcp_api_keys\` DROP COLUMN \`testimonials_delete\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`caption\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`credit\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`category\`;`)
  await db.run(sql`ALTER TABLE \`categories\` DROP COLUMN \`internal_label\`;`)
  await db.run(sql`ALTER TABLE \`categories\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`categories\` DROP COLUMN \`sort_order\`;`)
}
