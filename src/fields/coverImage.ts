import type { GroupField } from 'payload'

export const coverImageField: GroupField = {
  name: 'coverImage',
  type: 'group',
  admin: {
    description:
      'Optional full-width background image. Content overlays on top with a scrim for readability.',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Lifestyle or background image. Displayed as object-fit: cover.',
      },
    },
    {
      name: 'minHeight',
      type: 'select',
      dbName: 'cover_h',
      defaultValue: 'md',
      options: [
        { label: 'Small (320px)', value: 'sm' },
        { label: 'Medium (400px)', value: 'md' },
        { label: 'Large (560px)', value: 'lg' },
      ],
      admin: {
        description: 'Minimum height of the section when a cover image is active.',
        condition: (_, siblingData) => !!siblingData?.image,
      },
    },
    {
      name: 'objectPosition',
      type: 'select',
      dbName: 'cover_pos',
      defaultValue: 'center',
      options: [
        { label: 'Top', value: 'top' },
        { label: 'Center', value: 'center' },
        { label: 'Bottom', value: 'bottom' },
      ],
      admin: {
        description: 'Vertical focal point of the image.',
        condition: (_, siblingData) => !!siblingData?.image,
      },
    },
    {
      name: 'overlayOpacity',
      type: 'select',
      dbName: 'cover_opa',
      defaultValue: '60',
      options: [
        { label: 'Light (40%)', value: '40' },
        { label: 'Medium (60%)', value: '60' },
        { label: 'Heavy (80%)', value: '80' },
      ],
      admin: {
        description: 'Darkness of the scrim overlay for text readability.',
        condition: (_, siblingData) => !!siblingData?.image,
      },
    },
  ],
}
