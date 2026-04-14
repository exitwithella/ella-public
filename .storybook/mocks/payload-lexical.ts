// Stub type for Storybook — matches the shape blocks import from @payloadcms/richtext-lexical/lexical
export interface SerializedEditorState {
  root: {
    type: string
    children: Record<string, unknown>[]
    direction: string | null
    format: string
    indent: number
    version: number
  }
}
