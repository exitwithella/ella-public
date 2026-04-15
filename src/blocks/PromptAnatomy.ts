import type { Block } from 'payload'

import { bgStyleField } from '../fields/bgStyle'

export const PromptAnatomyBlock: Block = {
  slug: 'prompt-anatomy',
  dbName: 'prmpt_antm',
  labels: {
    singular: 'Prompt Anatomy',
    plural: 'Prompt Anatomies',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      admin: {
        description: 'HTML id for anchor links (e.g. "anatomy-of-a-prompt")',
      },
    },
    {
      name: 'sectionLabel',
      type: 'text',
      admin: {
        description: 'Eyebrow label above the heading (e.g. "ANATOMY OF A PROMPT")',
      },
    },
    {
      name: 'heading',
      type: 'text',
      admin: {
        description: 'Section headline, rendered in Termina.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description:
          'Optional supporting text, right-aligned on desktop (e.g. "A Sensemaking response, annotated to show where each conclusion originates.")',
      },
    },
    {
      name: 'promptText',
      type: 'textarea',
      admin: {
        description:
          "The advisor's question displayed in italic serif at the top of the response card.",
      },
    },
    {
      name: 'responseLabel',
      type: 'text',
      admin: {
        description: 'Label in the response header bar (e.g. "RISK BREAKDOWN").',
      },
    },
    {
      name: 'responseMetadata',
      type: 'text',
      admin: {
        description: 'Right-side metadata in the response header (e.g. "5 sources referenced").',
      },
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 8,
      admin: {
        description:
          'Each item is a finding (shown in the central card) paired with its source annotation (shown in the margin). Items auto-alternate between left and right margins.',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          admin: {
            description: 'Finding heading shown in the response card.',
          },
        },
        {
          name: 'body',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Finding body text.',
          },
        },
        {
          name: 'annotationLabel',
          type: 'text',
          required: true,
          admin: {
            description:
              'Short label for the margin annotation (e.g. "Fact Finding", "Uploaded Documents").',
          },
        },
        {
          name: 'annotationDetail',
          type: 'textarea',
          admin: {
            description: 'Longer explanation for the annotation source.',
          },
        },
        {
          name: 'color',
          type: 'select',
          defaultValue: 'moss',
          required: true,
          options: [
            { label: 'Moss (green)', value: 'moss' },
            { label: 'Goldenrod (amber)', value: 'goldenrod' },
          ],
          admin: {
            description: 'Accent color for the connector line, dot, and annotation highlight.',
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'footerLeft',
      type: 'text',
      admin: {
        description:
          'Footer left text (e.g. "One question. Five conclusions. Six months of structured engagement data.")',
      },
    },
    {
      name: 'footerRight',
      type: 'text',
      admin: {
        description: 'Footer right text (e.g. "Sensemaking"), rendered in italic.',
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
