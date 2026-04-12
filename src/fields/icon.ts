import type { TextField } from 'payload'

interface IconFieldAdminOptions {
  description?: string
  width?: string
  condition?: (data: Record<string, unknown>, siblingData: Record<string, unknown>) => boolean
}

interface IconFieldOptions {
  name?: string
  label?: string
  required?: boolean
  admin?: IconFieldAdminOptions
}

export function iconField(options: IconFieldOptions = {}): TextField {
  const { name = 'iconName', label = 'Icon', required = false, admin = {} } = options

  return {
    name,
    type: 'text',
    label,
    required,
    admin: {
      ...admin,
      components: {
        Field: '/components/admin/IconPickerField',
      },
    },
  }
}
