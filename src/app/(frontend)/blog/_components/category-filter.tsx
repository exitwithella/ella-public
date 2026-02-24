import Link from 'next/link'

import type { Category } from '@/payload-types'

interface CategoryFilterProps {
  categories: Category[]
  activeSlug?: string
  baseHref?: string
}

export function CategoryFilter({
  categories,
  activeSlug,
  baseHref = '/blog',
}: CategoryFilterProps) {
  const isAll = !activeSlug

  return (
    <nav aria-label="Filter by category" className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
      <Link
        href={baseHref}
        className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
          isAll
            ? 'bg-moss-700 text-ash-50'
            : 'bg-ash-100 text-ash-600 hover:bg-ash-200 hover:text-ash-800'
        }`}
      >
        All
      </Link>
      {categories.map((cat) => {
        const isActive = cat.slug === activeSlug
        const href = `${baseHref}?category=${cat.slug}`

        return (
          <Link
            key={cat.id}
            href={href}
            className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              isActive
                ? 'bg-moss-700 text-ash-50'
                : 'bg-ash-100 text-ash-600 hover:bg-ash-200 hover:text-ash-800'
            }`}
          >
            {cat.title}
          </Link>
        )
      })}
    </nav>
  )
}
