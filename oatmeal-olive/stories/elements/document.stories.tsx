import type { Meta, StoryObj } from '@storybook/react-vite'
import { Document } from '../../components/elements/document'

const meta: Meta<typeof Document> = {
  title: 'Elements/Document',
  component: Document,
}
export default meta
type Story = StoryObj<typeof Document>

export const Default: Story = {
  render: () => (
    <div className="mx-auto max-w-2xl p-10">
      <Document>
        <p>
          This is a document component that provides prose styling for long-form content. It handles paragraphs,{' '}
          <a href="#">links with underlines</a>, and other typographic elements.
        </p>
        <h2>Section heading</h2>
        <p>
          Document styling includes consistent spacing, <strong>bold text emphasis</strong>, and proper list formatting
          for both ordered and unordered lists.
        </p>
        <ul>
          <li>First unordered item</li>
          <li>Second unordered item</li>
          <li>Third unordered item</li>
        </ul>
        <h2>Another section</h2>
        <ol>
          <li>First ordered item</li>
          <li>Second ordered item</li>
          <li>Third ordered item</li>
        </ol>
        <p>
          The Document component uses square markers for unordered lists and decimal numbering for ordered lists, with
          consistent indentation and spacing throughout.
        </p>
      </Document>
    </div>
  ),
}
