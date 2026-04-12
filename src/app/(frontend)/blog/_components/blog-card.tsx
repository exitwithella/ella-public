import Image from 'next/image'
import Link from 'next/link'

import type { Category, Media, Post, TeamMember } from '@/payload-types'

import { calculateReadingTime, formatPublishedDate, getPostUrl } from '../_lib/utils'

interface BlogCardProps {
  post: Post
  variant: 'hero' | 'featured' | 'standard'
}

function CategoryTags({ categories }: { categories: Post['categories'] }) {
  if (!Array.isArray(categories) || categories.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        if (typeof cat !== 'object') return null
        const c = cat as Category
        return (
          <span
            key={c.id}
            className="bg-moss-100 text-moss-700 rounded-full px-3 py-0.5 text-xs font-medium tracking-wide"
          >
            {c.title}
          </span>
        )
      })}
    </div>
  )
}

function AuthorByline({
  author,
  date,
  readingTime,
  compact = false,
}: {
  author: Post['author']
  date: string
  readingTime: number
  compact?: boolean
}) {
  const a = typeof author === 'object' ? (author as TeamMember) : null
  const photo = a?.photo && typeof a.photo === 'object' ? (a.photo as Media) : null

  return (
    <div className="text-ash-1000 flex items-center gap-3">
      {a && !compact && (
        <div className="bg-ash-200 relative size-10 shrink-0 overflow-hidden rounded-full">
          {photo?.url ? (
            <Image
              src={photo.url}
              alt={photo.alt || a.name}
              fill
              className="object-cover"
              sizes="40px"
            />
          ) : (
            <span className="text-ash-400 absolute inset-0 flex items-center justify-center text-sm font-semibold">
              {a.name.charAt(0)}
            </span>
          )}
        </div>
      )}
      <div className={compact ? 'flex items-center gap-2 text-xs' : 'flex flex-col text-sm'}>
        {a && !compact && <span className="text-ash-700 font-medium">{a.name}</span>}
        <div className="flex items-center gap-2">
          <span>{formatPublishedDate(date)}</span>
          <span aria-hidden="true">·</span>
          <span>{readingTime} min read</span>
        </div>
      </div>
    </div>
  )
}

export function BlogCard({ post, variant }: BlogCardProps) {
  const href = getPostUrl(post)
  const readingTime = calculateReadingTime(post.content)
  const image =
    post.featuredImage && typeof post.featuredImage === 'object'
      ? (post.featuredImage as Media)
      : null

  if (variant === 'hero') {
    return (
      <article className="group border-ash-200 bg-sandstone-50 overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-md">
        <Link href={href} className="block lg:flex">
          {/* Image — 60% on desktop */}
          <div className="bg-ash-200 relative aspect-[16/9] shrink-0 overflow-hidden lg:aspect-auto lg:w-[60%]">
            {image?.url ? (
              <Image
                src={image.url}
                alt={image.alt || post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            ) : (
              <div
                className="bg-moss-100 absolute inset-0 flex items-center justify-center"
                aria-hidden="true"
              >
                <span className="text-moss-400 font-display text-4xl font-bold">ELLA</span>
              </div>
            )}
          </div>

          {/* Content — 40% on desktop */}
          <div className="flex flex-col justify-center gap-4 p-8 lg:w-[40%] lg:p-10">
            <CategoryTags categories={post.categories} />
            <h2 className="text-ash-900 group-hover:text-moss-700 font-serif text-2xl/tight leading-tight transition-colors md:text-3xl/tight">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="text-ash-600 line-clamp-3 text-base/relaxed">{post.excerpt}</p>
            )}
            <AuthorByline
              author={post.author}
              date={post.publishedDate}
              readingTime={readingTime}
            />
          </div>
        </Link>
      </article>
    )
  }

  if (variant === 'featured') {
    return (
      <article className="group border-ash-200 bg-sandstone-50 hover:border-moss-300 flex flex-col overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md">
        <Link href={href} className="flex flex-1 flex-col">
          {/* Image — 16:9 */}
          <div className="bg-ash-200 relative aspect-[16/9] shrink-0 overflow-hidden">
            {image?.url ? (
              <Image
                src={image.url}
                alt={image.alt || post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="bg-moss-100 absolute inset-0 flex items-center justify-center">
                <span className="text-moss-400 font-display text-2xl font-bold">ELLA</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col gap-3 p-6">
            <CategoryTags categories={post.categories} />
            <h2 className="text-ash-900 group-hover:text-moss-700 line-clamp-2 font-serif text-xl/snug transition-colors md:text-2xl/snug">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="text-ash-600 line-clamp-2 grow text-sm/relaxed">{post.excerpt}</p>
            )}
            <AuthorByline
              author={post.author}
              date={post.publishedDate}
              readingTime={readingTime}
              compact
            />
          </div>
        </Link>
      </article>
    )
  }

  // standard — horizontal compact
  return (
    <article className="group border-ash-200 bg-sandstone-50 hover:border-moss-300 flex gap-4 overflow-hidden rounded-xl border p-4 shadow-sm transition-all hover:shadow-md">
      {/* Thumbnail */}
      {image?.url && (
        <Link
          href={href}
          className="bg-ash-200 relative size-20 shrink-0 overflow-hidden rounded-lg md:size-24"
        >
          <Image
            src={image.url}
            alt={image.alt || post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="96px"
          />
        </Link>
      )}

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <CategoryTags categories={post.categories} />
        <Link href={href}>
          <h2 className="text-ash-900 group-hover:text-moss-700 line-clamp-2 text-sm/snug font-semibold transition-colors md:text-base/snug">
            {post.title}
          </h2>
        </Link>
        <AuthorByline
          author={post.author}
          date={post.publishedDate}
          readingTime={readingTime}
          compact
        />
      </div>
    </article>
  )
}
