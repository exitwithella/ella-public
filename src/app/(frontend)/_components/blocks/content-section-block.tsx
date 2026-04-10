import { RichText } from "@payloadcms/richtext-lexical/react";

import { ButtonLink, PlainButtonLink } from "@/components/elements/button";
import { Container } from "@/components/elements/container";
import { Eyebrow } from "@/components/elements/eyebrow";
import { Heading } from "@/components/elements/heading";
import { isDarkTheme, ThemeSection } from "@/components/elements/theme-section";
import { ArrowNarrowRightIcon } from "@/components/icons/arrow-narrow-right-icon";
import type { Page, Solution } from "@/payload-types";

type ContentSectionData =
  | Extract<
      NonNullable<Page["layout"]>[number],
      { blockType: "content-section" }
    >
  | Extract<
      NonNullable<Solution["layout"]>[number],
      { blockType: "content-section" }
    >;

interface ContentSectionBlockProps {
  block: ContentSectionData;
}

export function ContentSectionBlock({ block }: ContentSectionBlockProps) {
  const mediaPos = block.mediaPosition ?? "none";
  const hasMedia = mediaPos !== "none" && block.media;
  const isTwoColumn = hasMedia && (mediaPos === "left" || mediaPos === "right");

  return (
    <ThemeSection bgStyle={block.bgStyle} className="py-20 md:py-28">
      <Container>
        {/* Badge */}
        {block.badge && (
          <span
            className="bg-theme-surface text-theme-accent mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase"
          >
            {block.badge}
          </span>
        )}

        {/* Section label */}
        {block.sectionLabel && (
          <Eyebrow className="mb-4">
            {block.sectionLabel}
          </Eyebrow>
        )}

        {/* Full-width media above */}
        {hasMedia && mediaPos === "top" && (
          <div className="bg-theme-surface mb-10 flex aspect-video items-center justify-center rounded-sm">
            <span className="text-theme-text-muted text-sm">Visual</span>
          </div>
        )}

        {/* Content layout */}
        <div
          className={
            isTwoColumn
              ? `flex flex-col gap-10 md:flex-row md:items-start md:gap-16 ${mediaPos === "left" ? "md:flex-row-reverse" : ""}`
              : ""
          }
        >
          {/* Text column */}
          <div className={isTwoColumn ? "flex-1" : "max-w-[680px]"}>
            {block.heading && (
              <Heading>
                {block.heading}
              </Heading>
            )}

            {block.body && (
              <div
                className={`prose prose-lg mt-6 max-w-none text-theme-text-secondary ${isDarkTheme(block.bgStyle) ? "prose-invert" : ""}`}
              >
                <RichText data={block.body} />
              </div>
            )}

            {/* Link */}
            {block.link?.href && block.link?.label && (
              <div className="mt-8">
                {block.link.style === "button" ? (
                  <ButtonLink
                    href={block.link.href}
                    size="lg"
                  >
                    {block.link.label}
                  </ButtonLink>
                ) : (
                  <PlainButtonLink
                    href={block.link.href}
                    size="lg"
                  >
                    {block.link.label} <ArrowNarrowRightIcon />
                  </PlainButtonLink>
                )}
              </div>
            )}
          </div>

          {/* Media column (two-column mode) */}
          {isTwoColumn && (
            <div className="flex-1">
              <div className="bg-theme-surface flex aspect-video items-center justify-center rounded-sm">
                <span className="text-theme-text-muted text-sm">Visual</span>
              </div>
            </div>
          )}
        </div>
      </Container>
    </ThemeSection>
  );
}
