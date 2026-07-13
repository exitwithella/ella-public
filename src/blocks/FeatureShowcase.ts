import type { Block } from 'payload'

import { bgStyleField } from '../fields/bgStyle'
import { ctaField } from '../fields/cta'
import { DISPLAY_SERIF_FONT_OPTIONS } from '../fields/options'

export const FeatureShowcaseBlock: Block = {
  slug: 'feature-showcase',
  labels: {
    singular: 'Feature Showcase',
    plural: 'Feature Showcases',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      admin: {
        description: 'HTML id for anchor links (e.g. "portfolio-analytics")',
      },
    },

    // ── Header layout ──
    {
      name: 'headerLayout',
      type: 'select',
      defaultValue: 'text-only',
      options: [
        { label: 'Text Only', value: 'text-only' },
        { label: 'Text Left / Image Right (1fr / 2fr)', value: 'text-left' },
        { label: 'Text Left / Image Right (1fr / 1fr)', value: 'text-left-even' },
        { label: 'Image Left / Text Right (2fr / 1fr)', value: 'image-left' },
        { label: 'Eyebrow Left / Heading Right', value: 'eyebrow-left' },
      ],
      admin: {
        description:
          'Layout for the header area. Text-only spans full width. Split layouts pair text with a hero image.',
      },
    },
    {
      name: 'textAlign',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      admin: {
        description: 'Text alignment within the text column (text-only layout)',
        condition: (_, siblingData) => siblingData?.headerLayout === 'text-only',
      },
    },

    // ── Header content ──
    {
      name: 'sectionLabel',
      type: 'text',
      admin: {
        description: 'Eyebrow label above the heading (e.g. "Portfolio Analytics")',
      },
    },
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'headingFont',
      type: 'select',
      defaultValue: 'display',
      options: DISPLAY_SERIF_FONT_OPTIONS,
      admin: {
        description: 'Font family for the heading.',
        width: '50%',
      },
    },
    {
      name: 'headingSize',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default (h2)', value: 'default' },
        { label: 'Large (h1 size)', value: 'large' },
        { label: 'Small (h3 size)', value: 'small' },
      ],
      admin: {
        description: 'Visual size of the heading. Does not change the HTML tag (always h2).',
      },
    },
    {
      name: 'body',
      type: 'richText',
      admin: {
        description: 'Supporting paragraph text below the heading.',
      },
    },
    ctaField({
      name: 'link',
      admin: {
        description: 'Optional CTA button or text link below the body.',
      },
      withStyle: true,
    }),

    // ── Header image (split layouts only) ──
    {
      name: 'headerImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Large hero screenshot for the split header layout.',
        condition: (_, siblingData) =>
          siblingData?.headerLayout === 'text-left' ||
          siblingData?.headerLayout === 'text-left-even' ||
          siblingData?.headerLayout === 'image-left',
      },
    },
    {
      name: 'headerImageFit',
      type: 'select',
      defaultValue: 'cover',
      options: [
        { label: 'Cover (fill, crop edges)', value: 'cover' },
        { label: 'Contain (fit entire image)', value: 'contain' },
        { label: 'Square (1:1 crop)', value: 'square' },
      ],
      admin: {
        description: 'How the header image is sized within its container.',
        width: '50%',
        condition: (_, siblingData) =>
          siblingData?.headerLayout === 'text-left' ||
          siblingData?.headerLayout === 'text-left-even' ||
          siblingData?.headerLayout === 'image-left',
      },
    },

    // ── Accordion (split layouts only) ──
    {
      name: 'accordionItems',
      type: 'array',
      admin: {
        description: 'Optional accordion details below the body text (split layouts only).',
        condition: (_, siblingData) =>
          siblingData?.headerLayout === 'text-left' ||
          siblingData?.headerLayout === 'text-left-even' ||
          siblingData?.headerLayout === 'image-left',
      },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'richText' },
      ],
    },

    // ── Gallery ──
    {
      name: 'galleryColumns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '3 columns', value: '3' },
        { label: '4 columns', value: '4' },
      ],
      admin: {
        description: 'Number of gallery columns on desktop.',
      },
    },
    {
      name: 'galleryAspect',
      type: 'select',
      defaultValue: 'landscape',
      options: [
        { label: 'Landscape (4:3)', value: 'landscape' },
        { label: 'Portrait (3:4)', value: 'portrait' },
        { label: 'Square (1:1)', value: 'square' },
      ],
      admin: {
        description: 'Aspect ratio for gallery item images.',
      },
    },
    {
      name: 'galleryAlign',
      type: 'select',
      defaultValue: 'left',
      options: [
        { label: 'Left (default)', value: 'left' },
        { label: 'Right (push items to end)', value: 'end' },
      ],
      admin: {
        description:
          'Alignment of gallery items within the grid. "Right" leaves empty columns on the left when there are fewer items than columns.',
      },
    },
    {
      name: 'galleryImageRadius',
      type: 'select',
      defaultValue: 'rounded',
      options: [
        { label: 'Rounded', value: 'rounded' },
        { label: 'Sharp (no radius)', value: 'sharp' },
      ],
      admin: {
        description: 'Border radius on gallery card images.',
      },
    },
    {
      name: 'galleryWidth',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default (contained)', value: 'default' },
        { label: 'Wide (edge-to-edge feel)', value: 'wide' },
      ],
      admin: {
        description:
          'Gallery container width. "Wide" uses a 1680px max-width with minimal padding.',
      },
    },
    {
      name: 'wideHeader',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Match the header width to the wide gallery container instead of the default container.',
        condition: (_, siblingData) => siblingData?.galleryWidth === 'wide',
      },
    },
    {
      name: 'galleryItems',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      admin: {
        description:
          'Gallery items. Each has a static image and an optional animated GIF that plays on hover.',
      },
      fields: [
        {
          name: 'staticImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'The default still image (PNG, JPG, or WebP).',
          },
        },
        {
          name: 'animatedImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional animated version (GIF or WebM) shown on hover.',
          },
        },
        {
          name: 'caption',
          type: 'text',
          admin: {
            description: 'Short caption underneath the image.',
          },
        },
        {
          name: 'subcaption',
          type: 'text',
          admin: {
            description: 'Smaller description line below the caption.',
          },
        },
        {
          name: 'bgColor',
          type: 'text',
          admin: {
            description:
              'Per-card background override. Accepts any CSS variable (e.g. "var(--color-goldenrod-200)") or raw CSS color. Leave empty to inherit the section theme.',
          },
        },
        {
          name: 'frameImage',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description:
              'Add padding around the image so the background color shows as a frame. Only visible when a background color is set.',
            condition: (_, siblingData) => !!siblingData?.bgColor,
          },
        },
        {
          name: 'anchorTarget',
          type: 'text',
          admin: {
            description:
              'ID of a section to scroll to when this card is clicked (without #). Makes the card a link.',
          },
        },
      ],
    },

    {
      name: 'sectionPadding',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Extra (160px)', value: 'extra' },
      ],
      admin: {
        description: 'Vertical padding for this section. "Extra" adds generous 160px top/bottom.',
      },
    },
    {
      name: 'bgColorOverride',
      type: 'text',
      admin: {
        description:
          'CSS color override for the section background (e.g. "var(--color-sandstone-200)"). Overrides bgStyle when set.',
      },
    },
    bgStyleField,
  ],
}
