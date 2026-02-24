import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Container } from '@/components/elements/container'
import type { Media } from '@/payload-types'

import { BlogCard } from '../_components/blog-card'
import { CategoryFilter } from '../_components/category-filter'
import { Pagination } from '../_components/pagination'
import { PostDetail } from '../_components/post-detail'
import { getCategoryByPrefix } from '../_lib/get-categories'
import { getAllPostSlugs, getPostByPath, getPublishedPosts } from '../_lib/get-posts'

interface SlugPageProps {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<{ page?: string }>
}

const STANDARD_PAGE_SIZE = 10

export async function generateStaticParams() {
  const slugPaths = await getAllPostSlugs()
  return slugPaths.map((segments) => ({ slug: segments }))
}

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug: segments } = await params

  // Try to resolve as post
  const post = await getPostByPath(segments)
  if (post) {
    const ogImage =
      post.featuredImage && typeof post.featuredImage === 'object'
        ? ((post.featuredImage as Media).url ?? undefined)
        : undefined

    return {
      title: post.meta?.title ?? `${post.title} — ELLA`,
      description: post.meta?.description ?? post.excerpt ?? undefined,
      openGraph: {
        title: post.meta?.title ?? post.title,
        description: post.meta?.description ?? post.excerpt ?? undefined,
        url: `https://withella.io/blog/${segments.join('/')}`,
        images: ogImage ? [{ url: ogImage }] : undefined,
      },
    }
  }

  // Try category prefix listing
  if (segments.length === 1) {
    const category = await getCategoryByPrefix(segments[0])
    if (category) {
      return {
        title: `${category.title} — ELLA Blog`,
        description: category.description ?? undefined,
      }
    }
  }

  return { title: 'Not Found — ELLA' }
}

export default async function SlugPage({ params, searchParams }: SlugPageProps) {
  const { slug: segments } = await params
  const { page: pageParam } = await searchParams
  const currentPage = Math.max(1, parseInt(pageParam ?? '1', 10))

  // 1. Try to resolve as a blog post
  const post = await getPostByPath(segments)
  if (post) {
    return <PostDetail post={post} />
  }

  // 2. Single segment — check if it's a category prefix (sub-listing)
  if (segments.length === 1) {
    const category = await getCategoryByPrefix(segments[0])
    if (category) {
      const allPosts = await getPublishedPosts({ categorySlug: category.slug })
      const totalPages = Math.ceil(allPosts.length / STANDARD_PAGE_SIZE)
      const paginated = allPosts.slice(
        (currentPage - 1) * STANDARD_PAGE_SIZE,
        currentPage * STANDARD_PAGE_SIZE,
      )

      return (
        <>
          <section className="bg-ash-50 py-20 md:py-24">
            <Container>
              <p className="text-moss-600 mb-3 text-sm font-semibold tracking-widest uppercase">
                Category
              </p>
              <h1 className="font-display text-ash-950 text-4xl font-semibold tracking-tight md:text-5xl">
                {category.title}
              </h1>
              {category.description && (
                <p className="text-ash-600 mt-4 max-w-xl text-lg/relaxed">{category.description}</p>
              )}
            </Container>
          </section>

          <section className="bg-ash-50 py-12">
            <Container>
              <div className="mb-4">
                <CategoryFilter
                  categories={[category]}
                  activeSlug={category.slug}
                  baseHref="/blog"
                />
              </div>

              {paginated.length > 0 ? (
                <div className="grid gap-4">
                  {paginated.map((p) => (
                    <BlogCard key={p.id} post={p} variant="standard" />
                  ))}
                </div>
              ) : (
                <p className="text-ash-500 py-12 text-center">No posts in this category yet.</p>
              )}

              {totalPages > 1 && (
                <div className="mt-10">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    basePath={`/blog/${segments[0]}`}
                  />
                </div>
              )}
            </Container>
          </section>
        </>
      )
    }
  }

  // Nothing matched
  notFound()
}
