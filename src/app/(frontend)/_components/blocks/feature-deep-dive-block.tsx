import { RichText } from "@payloadcms/richtext-lexical/react";

import { Container } from "@/components/elements/container";
import { Eyebrow } from "@/components/elements/eyebrow";
import { Heading } from "@/components/elements/heading";
import { ThemeSection } from "@/components/elements/theme-section";
import type { Page, Testimonial } from "@/payload-types";

type FeatureDeepDiveData = Extract<
  NonNullable<Page["layout"]>[number],
  { blockType: "feature-deep-dive" }
>;

interface FeatureDeepDiveBlockProps {
  block: FeatureDeepDiveData;
}

function TestimonialEmbed({
  testimonial,
}: {
  testimonial: number | Testimonial;
}) {
  if (typeof testimonial === "number") return null;
  return (
    <blockquote className="border-moss-400 bg-theme-surface mt-8 rounded-sm border-l-2 p-6">
      {testimonial.quote && (
        <p className="text-theme-text font-serif text-lg/relaxed">
          {testimonial.quote}
        </p>
      )}
      {(testimonial.name || testimonial.title) && (
        <footer className="text-theme-text mt-3 text-sm font-medium">
          {[testimonial.name, testimonial.title].filter(Boolean).join(", ")}
        </footer>
      )}
    </blockquote>
  );
}

export function FeatureDeepDiveBlock({ block }: FeatureDeepDiveBlockProps) {
  return (
    <ThemeSection
      bgStyle={block.bgStyle}
      id={block.sectionId ?? undefined}
      className="py-20 md:py-28"
    >
      <Container>
        {/* Section label — h2 for correct heading hierarchy (h1 hero → h2 section → h3 items) */}
        {block.sectionLabel && (
          <Eyebrow className="mb-4">{block.sectionLabel}</Eyebrow>
        )}

        {/* Alternating sections */}
        {block.sections && block.sections.length > 0 && (
          <div className="space-y-20 md:space-y-28">
            {block.sections.map((section, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={section.id}
                  className={`flex flex-col gap-10 md:flex-row md:items-center md:gap-16 ${!isEven ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Text side */}
                  <div className="flex-1">
                    <Heading as="h3" className="mb-4 font-bold">
                      {section.heading}
                    </Heading>
                    {section.body && (
                      <div className="prose prose-lg text-theme-text-secondary max-w-none">
                        <RichText data={section.body} />
                      </div>
                    )}
                    {section.testimonial && (
                      <TestimonialEmbed testimonial={section.testimonial} />
                    )}
                    {section.link?.href && section.link?.label && (
                      <a
                        href={section.link.href}
                        className="text-moss-700 hover:text-moss-800 mt-6 inline-flex items-center gap-1 text-sm font-semibold"
                      >
                        {section.link.label} <span aria-hidden="true">→</span>
                      </a>
                    )}
                  </div>

                  {/* Visual side — placeholder when no image */}
                  <div className="flex-1">
                    <div
                      className="bg-theme-surface flex aspect-video items-center justify-center rounded-sm"
                      aria-hidden="true"
                    >
                      <span className="text-theme-text-muted text-sm">
                        Product visual
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </ThemeSection>
  );
}
