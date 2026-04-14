import type { Meta, StoryObj } from '@storybook/react-vite'

import DilemmaSection from './dilemma'

const meta: Meta = {
  title: 'ELLA/Interactive/Dilemma',
}
export default meta
type Story = StoryObj

export const InitialState: Story = {
  name: 'Initial state',
  render: () => (
    <DilemmaSection
      label="The advisor dilemma"
      heading="Every tool you try solves one problem"
      headingAccent="and creates three more"
      body="You have tried CRMs, spreadsheets, project management tools. None of them understand how advisors actually work."
      transitionLine1="What if there was a better way?"
      transitionLine2="One platform, built from the ground up for trusted advisors."
      tableData={[
        { dim: 'Client data', old: 'Spreadsheets', rigid: 'Generic CRM', patch: 'Multiple tools', ella: 'Unified hub' },
        { dim: 'Workflows', old: 'Mental notes', rigid: 'Rigid templates', patch: 'Duct tape', ella: 'Adaptive flows' },
        { dim: 'Succession', old: 'Ignored', rigid: 'Not supported', patch: 'External firm', ella: 'Built in' },
      ]}
      steps={[
        { label: 'Connect', sub: 'Import your practice data' },
        { label: 'Systematize', sub: 'Build repeatable workflows' },
        { label: 'Scale', sub: 'Grow with confidence' },
      ]}
    />
  ),
}
