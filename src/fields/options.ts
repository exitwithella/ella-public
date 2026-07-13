/**
 * Shared select-field option sets. Each constant is the single source of truth
 * for an option list that was previously duplicated verbatim across the schema.
 * Values are unchanged from the inlined originals, so no D1 migration is needed.
 */

interface SelectOption {
  label: string
  value: string
}

/** Object-fit mode for images (hero visual, product-features screenshot). */
export const IMAGE_FIT_OPTIONS: SelectOption[] = [
  { label: 'Contain (show full image)', value: 'contain' },
  { label: 'Crop (fill area, may clip)', value: 'crop' },
  { label: 'Square (forced 1:1, cropped)', value: 'square' },
]

/** Nine-point focal position for cropped images. */
export const IMAGE_POSITION_OPTIONS: SelectOption[] = [
  { label: 'Center', value: 'center' },
  { label: 'Top', value: 'top' },
  { label: 'Bottom', value: 'bottom' },
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
  { label: 'Top Left', value: 'top left' },
  { label: 'Top Right', value: 'top right' },
  { label: 'Bottom Left', value: 'bottom left' },
  { label: 'Bottom Right', value: 'bottom right' },
]

/** FAQ category taxonomy (FAQ collection + FAQ accordion filter). */
export const FAQ_CATEGORY_OPTIONS: SelectOption[] = [
  { label: 'General', value: 'general' },
  { label: 'Pricing', value: 'pricing' },
  { label: 'Platform', value: 'platform' },
  { label: 'Exit Planning', value: 'exit-planning' },
  { label: 'Onboarding', value: 'onboarding' },
  { label: 'Security', value: 'security' },
]

/** Headline font families (hero headline). */
export const FONT_OPTIONS: SelectOption[] = [
  { label: 'Display (Termina)', value: 'display' },
  { label: 'Sans (DM Sans)', value: 'sans' },
  { label: 'Serif (Instrument Serif)', value: 'serif' },
  { label: 'Data (Manrope)', value: 'data' },
]

/** Display/Serif subset used by section headings (feature-showcase, bridge). */
export const DISPLAY_SERIF_FONT_OPTIONS: SelectOption[] = FONT_OPTIONS.filter(
  (option) => option.value === 'display' || option.value === 'serif',
)
