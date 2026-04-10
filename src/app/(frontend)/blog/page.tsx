import type { Metadata } from "next";

import { Container } from "@/components/elements/container";
import { Eyebrow } from "@/components/elements/eyebrow";
import { Heading } from "@/components/elements/heading";

import { BlogCard } from "./_components/blog-card";
import { CategoryFilter } from "./_components/category-filter";
import { Pagination } from "./_components/pagination";
import { getAllCategories } from "./_lib/get-categories";
import { getPublishedPosts } from "./_lib/get-posts";

export const metadata: Metadata = {
  title: "Blog — ELLA",
  description:
    "Practical perspectives on advisory practice, systematization, and what's changing in the profession.",
  openGraph: {
    title: "ELLA Blog",
    description:
      "Practical perspectives on advisory practice, systematization, and what's changing in the profession.",
    url: "https://withella.io/blog",
  },
};

const STANDARD_PAGE_SIZE = 10;

interface BlogPageProps {
  searchParams: Promise<{ category?: string; page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category: categorySlug, page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10));

  const [allPosts, categories] = await Promise.all([
    getPublishedPosts(),
    getAllCategories(),
  ]);

  // Partition into tiers — editorial placements ignore category filter
  const heroPosts = allPosts.filter((p) => p.tier === "hero");
  const featuredPosts = allPosts.filter((p) => p.tier === "featured");

  // Standard tier: remaining posts, optionally filtered by category
  let standardPosts = allPosts.filter((p) => p.tier === "standard" || !p.tier);
  if (categorySlug) {
    standardPosts = standardPosts.filter(
      (p) =>
        Array.isArray(p.categories) &&
        p.categories.some(
          (c) => typeof c === "object" && c.slug === categorySlug,
        ),
    );
  }

  const heroPost = heroPosts[0] ?? null;

  // Paginate standard stream
  const totalStandard = standardPosts.length;
  const totalPages = Math.ceil(totalStandard / STANDARD_PAGE_SIZE);
  const paginatedStandard = standardPosts.slice(
    (currentPage - 1) * STANDARD_PAGE_SIZE,
    currentPage * STANDARD_PAGE_SIZE,
  );

  return (
    <>
      {/* Hero section */}
      <section className="bg-sandstone-50 py-20 md:py-28">
        <Container>
          <Eyebrow size="sm" className="mb-4">
            The ELLA Blog
          </Eyebrow>
          <Heading as="h1" className="max-w-2xl text-balance">
            Thinking clearly about advisory practice.
          </Heading>
          <p className="text-ash-600 mt-5 max-w-xl text-lg/relaxed">
            Practical perspectives on practice systematization, advisor-led
            transitions, and what's changing in the profession.
          </p>
        </Container>
      </section>

      {/* Tier 1 — Hero article */}
      {heroPost && (
        <section className="bg-sandstone-50 pb-8">
          <Container>
            <BlogCard post={heroPost} variant="hero" />
          </Container>
        </section>
      )}

      {/* Tier 2 — Featured / Editor's picks */}
      {featuredPosts.length > 0 && (
        <section className="bg-sandstone-50 py-12">
          <Container>
            <h2 className="font-display text-ash-700 mb-6 text-sm font-semibold tracking-widest uppercase">
              Editor's Picks
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} variant="featured" />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Tier 3 — Standard stream with category filter */}
      <section className="bg-sandstone-50 py-12 md:py-16">
        <Container>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-ash-700 text-sm font-semibold tracking-widest uppercase">
              All Posts
            </h2>
            {categories.length > 0 && (
              <CategoryFilter
                categories={categories}
                activeSlug={categorySlug}
              />
            )}
          </div>

          {paginatedStandard.length > 0 ? (
            <div className="grid gap-4">
              {paginatedStandard.map((post) => (
                <BlogCard key={post.id} post={post} variant="standard" />
              ))}
            </div>
          ) : (
            <p className="text-ash-1000 py-12 text-center text-base">
              No posts yet in this category.
            </p>
          )}

          {totalPages > 1 && (
            <div className="mt-10">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/blog"
                categorySlug={categorySlug}
              />
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
