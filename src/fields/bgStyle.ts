import type { SelectField } from 'payload'

export const bgStyleField: SelectField = {
  name: 'bgStyle',
  type: 'select',
  defaultValue: 'sandstone',
  options: [
    { label: 'Sandstone', value: 'sandstone' },
    { label: 'White', value: 'white' },
    { label: 'Mint', value: 'mint' },
    { label: 'Goldenrod', value: 'goldenrod' },
    { label: 'Forest', value: 'forest' },
    { label: 'Tannery', value: 'tannery' },
    { label: 'Leather', value: 'leather' },
    { label: 'Ocean', value: 'ocean' },
    { label: 'Ash', value: 'ash' },
    { label: 'Brand Black', value: 'brand-black' },
  ],
  admin: { width: '50%' },
}
