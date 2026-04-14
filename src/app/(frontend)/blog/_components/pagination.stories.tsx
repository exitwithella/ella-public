import type { Meta, StoryObj } from '@storybook/react-vite'

import { Pagination } from './pagination'

const meta: Meta = {
  title: 'ELLA/Blog/Pagination',
}
export default meta
type Story = StoryObj

export const MiddlePage: Story = {
  name: 'Page 3 of 8',
  render: () => (
    <div className="p-6">
      <Pagination currentPage={3} totalPages={8} basePath="/blog" />
    </div>
  ),
}

export const FirstPage: Story = {
  name: 'First page',
  render: () => (
    <div className="p-6">
      <Pagination currentPage={1} totalPages={5} basePath="/blog" />
    </div>
  ),
}

export const LastPage: Story = {
  name: 'Last page',
  render: () => (
    <div className="p-6">
      <Pagination currentPage={5} totalPages={5} basePath="/blog" />
    </div>
  ),
}
