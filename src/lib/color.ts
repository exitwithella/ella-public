/** Mix a CSS color (including custom-property references) with transparency. */
export function ca(color: string, opacity: number): string {
  return `color-mix(in oklch, ${color} ${Math.round(opacity * 100)}%, transparent)`
}
