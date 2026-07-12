/**
 * Shared manifest of Payload globals that the content-sync pipeline moves.
 *
 * Imported by both src/dump.ts and src/seed.ts so the dumped and seeded sets
 * can't drift — a global dumped but never seeded (or vice versa) is a silently
 * lossy round-trip.
 */
export const GLOBAL_SLUGS = [
  'site-settings',
  'navigation',
  'footer',
  'pricing-page',
  'script-injection',
] as const
