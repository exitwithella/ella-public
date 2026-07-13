import type { GroupField } from 'payload'

import { ctaField } from './cta'
import { FONT_OPTIONS, IMAGE_FIT_OPTIONS, IMAGE_POSITION_OPTIONS } from './options'

export const heroField: GroupField = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'headlineAnimation',
      type: 'select',
      defaultValue: 'word-by-word',
      options: [
        { label: 'Word by Word', value: 'word-by-word' },
        { label: 'Blur Fade', value: 'blur-fade' },
      ],
      admin: {
        description: 'Animation style for the main headline.',
        width: '50%',
      },
    },
    {
      name: 'headlineLine2',
      type: 'text',
      admin: {
        description:
          'Optional second headline line. Renders below the main headline with its own animation.',
      },
    },
    {
      name: 'headlineAnimation2',
      type: 'select',
      defaultValue: 'blur-fade',
      options: [
        { label: 'Word by Word', value: 'word-by-word' },
        { label: 'Blur Fade', value: 'blur-fade' },
      ],
      admin: {
        description: 'Animation style for the second headline line.',
        width: '50%',
        condition: (_, siblingData) => Boolean(siblingData?.headlineLine2),
      },
    },
    {
      name: 'subheadline',
      type: 'textarea',
    },
    ctaField({ name: 'primaryCta' }),
    ctaField({ name: 'secondaryCta' }),
    {
      name: 'microcopy',
      type: 'text',
      admin: {
        description: 'Small trust signal below the CTAs (e.g. "Your first 3 clients are on us.")',
      },
    },
    {
      name: 'visual',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'visualFit',
      type: 'select',
      defaultValue: 'contain',
      options: IMAGE_FIT_OPTIONS,
      admin: {
        description:
          'Contain: image shown in full (screenshots). Crop: image fills the column height and may clip. Square: forced 1:1 aspect ratio with cropping.',
        width: '50%',
        condition: (_, siblingData) => Boolean(siblingData?.visual),
      },
    },
    {
      name: 'visualPosition',
      type: 'select',
      defaultValue: 'center',
      options: IMAGE_POSITION_OPTIONS,
      admin: {
        description: 'Focal point for cropping. Only applies when Visual Fit is "Crop".',
        width: '50%',
        condition: (_, siblingData) =>
          Boolean(siblingData?.visual) &&
          (siblingData?.visualFit === 'crop' || siblingData?.visualFit === 'square'),
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Deprecated — use the page-level Page Background setting instead. Kept for backward compatibility.',
        condition: () => false,
      },
    },
    {
      name: 'showLogoWatermark',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show the ELLA logo mark as a subtle background watermark in the hero.',
        condition: (_, siblingData) => siblingData?.style === 'minimal',
      },
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Centered', value: 'centered' },
        { label: 'Split', value: 'split' },
        { label: 'Split Full', value: 'split-full' },
        { label: 'Minimal', value: 'minimal' },
      ],
    },
    {
      name: 'headlineFont',
      type: 'select',
      defaultValue: 'display',
      options: FONT_OPTIONS,
      admin: {
        description: 'Font family override for the hero headline.',
        width: '50%',
      },
    },
    {
      name: 'highlightText',
      type: 'text',
      admin: {
        description:
          'Substring of the headline to render in accent color. Leave empty for no highlight.',
      },
    },
    {
      name: 'highlightColor',
      type: 'select',
      defaultValue: 'goldenrod',
      admin: {
        description: 'Color applied to the highlighted headline substring.',
      },
      options: [
        { label: 'Goldenrod', value: 'goldenrod' },
        { label: 'Moss', value: 'moss' },
        { label: 'Coral', value: 'coral' },
        { label: 'Ocean', value: 'ocean' },
      ],
    },
    {
      name: 'heroWallpaper',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show a textured gradient wallpaper behind the hero image.',
      },
    },
    {
      name: 'heroWallpaperColor',
      type: 'select',
      defaultValue: 'green',
      options: [
        { label: 'Green', value: 'green' },
        { label: 'Blue', value: 'blue' },
        { label: 'Purple', value: 'purple' },
        { label: 'Brown', value: 'brown' },
        { label: 'Sandstone', value: 'sandstone' },
        { label: 'Ash (Dark)', value: 'ash' },
      ],
      admin: {
        description: 'Gradient color for the hero wallpaper.',
        width: '50%',
        condition: (_, siblingData) => Boolean(siblingData?.heroWallpaper),
      },
    },
  ],
}
