/**
 * One-off script: adds 5 new FAQ items to the pricing page.
 * Only creates — does not update existing FAQs.
 *
 * Usage: pnpm tsx scripts/seed-new-faqs.ts
 */
import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../src/payload.config'

function makeParagraph(text: string) {
  return {
    type: 'paragraph',
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
    textFormat: 0,
    textStyle: '',
    children: [
      { type: 'text', version: 1, text, format: 0, detail: 0, mode: 'normal' as const, style: '' },
    ],
  }
}

function makeBulletList(...items: string[]) {
  return {
    type: 'list',
    listType: 'bullet' as const,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
    start: 1,
    tag: 'ul',
    children: items.map((text, i) => ({
      type: 'listitem',
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
      value: i + 1,
      children: [
        {
          type: 'text',
          version: 1,
          text,
          format: 0,
          detail: 0,
          mode: 'normal' as const,
          style: '',
        },
      ],
    })),
  }
}

function richText(...nodes: Record<string, unknown>[]) {
  return {
    root: {
      type: 'root',
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
      children: nodes,
    },
  }
}

function paragraphs(...texts: string[]) {
  return richText(...texts.map(makeParagraph))
}

const NEW_FAQS = [
  {
    question: 'What is the Exit Goal?',
    answer: paragraphs(
      "As you're guiding your client through the exit process, it's helpful to have a sentence or two summing up where they're at and their goal for exiting. This should be simple and readable at a glance, but incorporate the personal, business, and financial aspects of the exit.",
      'Think of it as your North Star for guiding your client to success.',
    ),
    category: 'exit-planning' as const,
    showOnPricing: true,
    sortOrder: 11,
  },
  {
    question: 'How Does ELLA Handle the Personal Side of Exit Planning?',
    answer: paragraphs(
      'Currently, ELLA has some basic functionality for capturing personal desires to work towards the exit. For example, the Exit Goal and space to add short "tags" or "badges" on the dashboard for each owner to reflect their exit expectations.',
      "The personal side of exit planning remains a core focus for ELLA, and we're working on adding more functionality in the future.",
    ),
    category: 'exit-planning' as const,
    showOnPricing: true,
    sortOrder: 12,
  },
  {
    question: 'What is the Exit Team?',
    answer: paragraphs(
      'The Exit Team is a group of advisors, collaborators, and other professionals (such as accountants, lawyers, financial advisors, and others) who are involved in the exit process.',
      'The exit team also includes the business owner(s) and people from their company or family who are involved in the exit process.',
    ),
    category: 'exit-planning' as const,
    showOnPricing: true,
    sortOrder: 13,
  },
  {
    question: 'What Counts as an Active Client?',
    answer: richText(
      makeParagraph(
        'Each client can be enabled or disabled as needed. If you disable a client, you lose the following functionality:',
      ),
      makeBulletList(
        "You'll no longer be able to add or edit information about that client.",
        'Sensemaking will no longer work, but existing chats will still be accessible.',
        'The client portal will be disabled, so Collaborators and Small Business Owners will no longer be able to access any information about the client. Advisors in your organization will still be able to access them.',
      ),
      makeParagraph(
        'Only active clients count towards billing limits. Inactive clients can be made active any time to regain full functionality.',
      ),
    ),
    category: 'pricing' as const,
    showOnPricing: true,
    sortOrder: 14,
  },
  {
    question: 'What if I need more clients or advisors than are included on the Core plan?',
    answer: paragraphs(
      'We are still formalizing our enterprise program, which will include custom pricing, support, compliance features, and whitelabeling.',
    ),
    category: 'pricing' as const,
    showOnPricing: true,
    sortOrder: 15,
  },
]

async function main() {
  const payload = await getPayload({ config })

  for (const faq of NEW_FAQS) {
    const existing = await payload.find({
      collection: 'faq-items',
      where: { question: { equals: faq.question } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  Skipped (already exists): ${faq.question.slice(0, 60)}`)
      continue
    }

    await payload.create({ collection: 'faq-items', data: faq as any })
    console.log(`✓ Created: ${faq.question.slice(0, 60)}`)
  }

  process.exit(0)
}

main()
