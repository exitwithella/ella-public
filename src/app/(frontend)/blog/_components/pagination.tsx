import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  categorySlug?: string
}

export function Pagination({ currentPage, totalPages, basePath, categorySlug }: PaginationProps) {
  if (totalPages <= 1) return null

  function pageHref(page: number) {
    const params = new URLSearchParams()
    if (categorySlug) params.set('category', categorySlug)
    if (page > 1) params.set('page', String(page))
    const qs = params.toString()
    return qs ? `${basePath}?${qs}` : basePath
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={pageHref(currentPage - 1)}
          className="border-ash-200 text-ash-600 hover:border-moss-300 hover:text-ash-900 rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
        >
          ← Previous
        </Link>
      )}

      <span className="text-ash-1000 text-sm">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages && (
        <Link
          href={pageHref(currentPage + 1)}
          className="border-ash-200 text-ash-600 hover:border-moss-300 hover:text-ash-900 rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
        >
          Next →
        </Link>
      )}
    </nav>
  )
}
