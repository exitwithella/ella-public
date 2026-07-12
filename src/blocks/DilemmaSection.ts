import type { Block } from 'payload'

export const DilemmaSectionBlock: Block = {
  slug: 'dilemma-section',
  labels: {
    singular: 'Dilemma Section',
    plural: 'Dilemma Sections',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      admin: {
        description: 'Eyebrow text above the heading, e.g. "The Advisor\'s Dilemma"',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Main heading, e.g. "Rigid or improvised."',
      },
    },
    {
      name: 'headingAccent',
      type: 'text',
      admin: {
        description:
          'Secondary heading line rendered in a lighter color, e.g. "Those aren\'t the only options."',
      },
    },
    {
      name: 'body',
      type: 'textarea',
      admin: {
        description: 'Intro paragraph below the heading.',
      },
    },
    {
      name: 'transitionLine1',
      type: 'text',
      admin: {
        description:
          'First line of the transition copy between the visualization and table, e.g. "What if your tools were built for advisory work —"',
      },
    },
    {
      name: 'transitionLine2',
      type: 'text',
      admin: {
        description:
          'Second line of the transition copy (rendered in moss/green), e.g. "and adapted to your methodology, not the other way around?"',
      },
    },
    {
      name: 'columnSubtitles',
      type: 'group',
      admin: {
        description:
          'Italic subtitles under the four comparison-table column headers (desktop layout). Leave empty to use built-in defaults.',
      },
      fields: [
        {
          name: 'old',
          type: 'text',
          admin: { description: '"The Old Way" subtitle, e.g. "Manual, memory-based"' },
        },
        {
          name: 'rigid',
          type: 'text',
          admin: { description: '"The Rigid Platform" subtitle, e.g. "Their process, not yours"' },
        },
        {
          name: 'patch',
          type: 'text',
          admin: { description: '"Consumer AI" subtitle, e.g. "Powerful, unprotected"' },
        },
        {
          name: 'ella',
          type: 'text',
          admin: { description: '"With ELLA" subtitle, e.g. "Your methodology, systematized"' },
        },
      ],
    },
    {
      name: 'closer',
      type: 'text',
      admin: {
        description:
          'Final line below the table once every row resolves, e.g. "Hours to the first real conversation. Not weeks."',
      },
    },
    {
      name: 'tableData',
      type: 'json',
      admin: {
        description:
          'Optional JSON override for comparison table rows. Array of objects with keys: dim, old, rigid, patch, ella. Leave empty to use built-in defaults.',
      },
    },
    {
      name: 'steps',
      type: 'json',
      admin: {
        description:
          'Optional JSON override for rigid platform steps. Array of objects with keys: label, sub. Leave empty to use built-in defaults.',
      },
    },
  ],
}
