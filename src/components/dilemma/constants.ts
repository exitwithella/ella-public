// ─── Spring configs (slightly overdamped for confident, deliberate feel) ───
export const SPRING_DEFAULT = { type: 'spring' as const, stiffness: 250, damping: 25 }
export const SPRING_SLOW = { type: 'spring' as const, stiffness: 200, damping: 28 }
export const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 300, damping: 22 }

// ─── Shared shapes ───
export interface Step {
  label: string
  sub: string
}

export interface TableRow {
  dim: string
  old: string
  rigid: string
  patch: string
  ella: string
}

export interface Drift {
  sx: number
  sy: number
  ex: number
  ey: number
}

export interface ClientCard {
  name: string
  color: string
  frags: string[]
}

// ─── Client data (bleed panel) ───
export const CL_A: ClientCard = {
  name: 'Marcus Chen',
  color: 'var(--color-moss-700)',
  frags: ['Revenue: $4.2M', 'EBITDA: 18.3%', 'Marcus Chen', 'Tax basis: $890K'],
}
export const CL_B: ClientCard = {
  name: 'Sarah Okonkwo',
  color: 'var(--color-ocean-600)',
  frags: ['Revenue: $2.8M', 'SDE: $620K', 'Sarah Okonkwo', 'LOI: $3.1M'],
}

export const DRIFT_A: Drift[] = [
  { sx: 15, sy: 14, ex: 78, ey: 28 },
  { sx: 10, sy: 40, ex: 82, ey: 55 },
  { sx: 22, sy: 62, ex: 72, ey: 38 },
  { sx: 14, sy: 80, ex: 76, ey: 72 },
]
export const DRIFT_B: Drift[] = [
  { sx: 85, sy: 20, ex: 22, ey: 35 },
  { sx: 90, sy: 45, ex: 18, ey: 60 },
  { sx: 78, sy: 68, ex: 28, ey: 24 },
  { sx: 86, sy: 82, ex: 24, ey: 76 },
]

// ─── Rigid steps ───
export const STEPS: Step[] = [
  {
    label: 'Step 1: Intake Form',
    sub: 'Their questions. Their order. No deviation.',
  },
  {
    label: 'Step 2: Financial Upload',
    sub: "Must use their template — your format won't work.",
  },
  {
    label: 'Step 3: Gap Analysis',
    sub: 'Locked methodology. Skip nothing, customize nothing.',
  },
  {
    label: 'Step 4: Value Driver Scoring',
    sub: 'Their rubric applied to your client. Same score, different business.',
  },
  {
    label: 'Step 5: Report Generation',
    sub: '90 pages. Same structure. Same jargon. Every single client.',
  },
]

// ─── Table data ───
export const TABLE_ROWS: TableRow[] = [
  {
    dim: 'Client intake',
    old: 'Paper forms, email',
    rigid: 'Their intake form, their questions, their order',
    patch: 'Paste documents into ChatGPT and hope for the best',
    ella: 'Malleable templates that adapt to your process',
  },
  {
    dim: 'Analysis',
    old: 'Manual, memory-based',
    rigid: 'Locked scoring rubric — same funnel, every client',
    patch: 'Powerful summaries — with no client boundaries',
    ella: 'Contextual AI within a sandboxed workspace',
  },
  {
    dim: 'Deliverables',
    old: 'Handwritten in Word',
    rigid: '90-page template, identical for every client',
    patch: 'AI drafts that sound generic and need heavy editing',
    ella: 'Documents reflecting the actual owner and business',
  },
  {
    dim: 'Methodology',
    old: 'Yours, but only in your head',
    rigid: 'Theirs — you adapt to the software',
    patch: 'Whatever you prompt, every time, from scratch',
    ella: 'Yours — systematized, extensible, in the platform',
  },
  {
    dim: 'Knowledge',
    old: 'Walks out the door',
    rigid: 'Trapped in their system, their format',
    patch: 'Vanishes when the chat window closes',
    ella: 'Compounds across every engagement',
  },
]

// ─── Status pill text options ───
export const STATUS_TEXTS = [
  'Two categories of tools. Neither designed for how advisors actually work.',
  'One locks you in. The other leaves you exposed.',
  'Same output every client. Or no consistent output at all.',
  'Rigid or improvised. Sound familiar?',
]

export function getStatusIndex(progress: number): number {
  if (progress < 0.2) return 0
  if (progress < 0.5) return 1
  if (progress < 0.8) return 2
  return 3
}
