import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import Link from 'next/link'

import type { Category, Media, Post, TeamMember } from '@/payload-types'

import { calculateReadingTime, formatPublishedDate } from '../_lib/utils'
import { BlogCard } from './blog-card'
import { NewsletterCTA } from './newsletter-cta'

interface PostDetailProps {
  post: Post
}

export function PostDetail({ post }: PostDetailProps) {
  const readingTime = calculateReadingTime(post.content)
  const image =
    post.featuredImage && typeof post.featuredImage === 'object'
      ? (post.featuredImage as Media)
      : null
  const author = post.author && typeof post.author === 'object' ? (post.author as TeamMember) : null
  const authorPhoto =
    author?.photo && typeof author.photo === 'object' ? (author.photo as Media) : null
  const relatedPosts = Array.isArray(post.relatedPosts)
    ? (post.relatedPosts.filter((p) => typeof p === 'object') as Post[])
    : []

  return (
    <article>
      {/* Header */}
      <header className="bg-sandstone-50 py-16 md:py-24">
        <div className="mx-auto w-full max-w-[720px] px-6">
          {/* Category tags */}
          {Array.isArray(post.categories) && post.categories.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {post.categories.map((cat) => {
                if (typeof cat !== 'object') return null
                const c = cat as Category
                return (
                  <Link
                    key={c.id}
                    href={`/blog?category=${c.slug}`}
                    className="bg-moss-100 text-moss-700 hover:bg-moss-200 rounded-full px-3 py-0.5 text-xs font-medium tracking-wide transition-colors"
                  >
                    {c.title}
                  </Link>
                )
              })}
            </div>
          )}

          {/* Title */}
          <h1 className="text-ash-950 font-serif text-3xl/tight leading-tight md:text-4xl/tight lg:text-5xl/tight">
            {post.title}
          </h1>

          {/* Byline */}
          <div className="mt-8 flex items-center gap-4">
            {author && (
              <div className="bg-ash-200 relative size-12 shrink-0 overflow-hidden rounded-full">
                {authorPhoto?.url ? (
                  <Image
                    src={authorPhoto.url}
                    alt={authorPhoto.alt || author.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                ) : (
                  <span className="text-ash-400 absolute inset-0 flex items-center justify-center text-sm font-semibold">
                    {author.name.charAt(0)}
                  </span>
                )}
              </div>
            )}
            <div>
              {author && (
                <p className="text-ash-800 text-sm font-semibold">
                  {author.name}
                  {author.role && (
                    <span className="text-ash-1000 font-normal"> · {author.role}</span>
                  )}
                </p>
              )}
              <p className="text-ash-1000 mt-0.5 text-sm">
                {formatPublishedDate(post.publishedDate)} · {readingTime} min read
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Featured image */}
      {image?.url && (
        <div className="mx-auto w-full max-w-[960px] px-6 py-8">
          <div className="bg-ash-200 relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={image.url}
              alt={image.alt || post.title}
              fill
              className="object-cover"
              sizes="(max-width: 960px) 100vw, 960px"
              priority
            />
          </div>
        </div>
      )}

      {/* Body */}
      <div className="mx-auto w-full max-w-[720px] px-6 py-8 md:py-12">
        {post.content && (
          <div className="prose prose-lg [&_h2]:font-display [&_h2]:text-ash-900 [&_h3]:font-display [&_h3]:text-ash-900 [&_p]:text-ash-700 [&_li]:text-ash-700 [&_blockquote]:border-moss-400 [&_blockquote]:text-ash-700 [&_a]:text-moss-700 hover:[&_a]:text-moss-600 max-w-none text-[1.0625rem]/[1.65] [&_a]:underline [&_a]:underline-offset-2 [&_blockquote]:border-l-2 [&_blockquote]:pl-6 [&_blockquote]:font-serif [&_blockquote]:text-xl [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:text-lg [&_h3]:font-semibold [&_p]:mb-5 [&_p]:leading-[1.65]">
            <RichText data={post.content} />
          </div>
        )}

        {/* Newsletter CTA */}
        {post.showNewsletterCTA && (
          <div className="mt-12">
            <NewsletterCTA />
          </div>
        )}
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-ash-100 py-16">
          <div className="mx-auto w-full max-w-[960px] px-6">
            <h2 className="font-display text-ash-900 mb-8 text-xl font-semibold">
              Related Reading
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.slice(0, 3).map((related) => (
                <BlogCard key={related.id} post={related} variant="featured" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <div className="mx-auto w-full max-w-[720px] px-6 py-8">
        <Link
          href="/blog"
          className="text-moss-700 hover:text-moss-600 inline-flex items-center gap-2 text-sm font-medium transition-colors"
        >
          ← Back to Blog
        </Link>
      </div>
    </article>
  )
}
