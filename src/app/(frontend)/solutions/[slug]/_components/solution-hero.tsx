import Link from "next/link";

import { ButtonLink, PlainButtonLink } from "@/components/elements/button";
import { Container } from "@/components/elements/container";
import { ArrowNarrowRightIcon } from "@/components/icons/arrow-narrow-right-icon";
import type { Solution } from "@/payload-types";

const HIGHLIGHT_COLOR_MAP: Record<string, string> = {
  goldenrod: "text-goldenrod-500",
  moss: "text-moss-600",
  coral: "text-coral-500",
  ocean: "text-ocean-600",
};

interface SolutionHeroProps {
  hero: Solution["hero"];
  title: string;
}

function HighlightedHeadline({
  text,
  highlight,
  highlightClass,
}: {
  text: string;
  highlight?: string | null;
  highlightClass: string;
}) {
  if (!highlight || !text.includes(highlight)) {
    return <>{text}</>;
  }

  const before = text.slice(0, text.indexOf(highlight));
  const after = text.slice(text.indexOf(highlight) + highlight.length);

  return (
    <>
      {before}
      <span className={highlightClass}>{highlight}</span>
      {after}
    </>
  );
}

export function SolutionHero({ hero, title }: SolutionHeroProps) {
  const highlightClass =
    HIGHLIGHT_COLOR_MAP[hero.highlightColor ?? "goldenrod"] ??
    "text-goldenrod-500";

  const primaryHref =
    hero.primaryCta?.href ?? "https://app.exitwithella.io/sign-up";
  const primaryLabel = hero.primaryCta?.label ?? "Get Started";
  const secondaryHref =
    hero.secondaryCta?.href ??
    "https://cal.com/team/ella/ella-intro?overlayCalendar=true";
  const secondaryLabel = hero.secondaryCta?.label ?? "Book a Demo";

  return (
    <section className="bg-sandstone-50 py-24 md:py-32">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="text-ash-1000 flex items-center gap-2 text-sm">
            <li>
              <Link
                href="/solutions"
                className="hover:text-ash-700 transition-colors"
              >
                Solutions
              </Link>
            </li>
            <li aria-hidden="true" className="text-ash-300">
              /
            </li>
            <li className="text-ash-700 font-medium">{title}</li>
          </ol>
        </nav>

        {/* Headline */}
        <h1 className="font-display text-ash-950 max-w-3xl text-3xl font-semibold tracking-tight text-balance md:text-4xl xl:text-5xl">
          <HighlightedHeadline
            text={hero.headline}
            highlight={hero.highlightText}
            highlightClass={highlightClass}
          />
        </h1>

        {/* Subheadline */}
        {hero.subheadline && (
          <p className="text-ash-600 mt-6 max-w-xl text-lg/relaxed">
            {hero.subheadline}
          </p>
        )}

        {/* CTAs */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <ButtonLink
            href={primaryHref}
            size="lg"
            target="_blank"
            rel="noopener"
            className="w-full sm:w-auto"
          >
            {primaryLabel}
          </ButtonLink>
          <PlainButtonLink
            href={secondaryHref}
            size="lg"
            target="_blank"
            rel="noopener"
            className="w-full sm:w-auto"
          >
            {secondaryLabel} <ArrowNarrowRightIcon />
          </PlainButtonLink>
        </div>
      </Container>
    </section>
  );
}
