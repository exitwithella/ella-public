import { RichText } from "@payloadcms/richtext-lexical/react";

import { Container } from "@/components/elements/container";
import { Heading } from "@/components/elements/heading";
import { isDarkTheme, ThemeSection } from "@/components/elements/theme-section";
import type { Page } from "@/payload-types";

type BridgeSectionData = Extract<
  NonNullable<Page["layout"]>[number],
  { blockType: "bridge-section" }
>;

interface BridgeSectionBlockProps {
  block: BridgeSectionData;
}

export function BridgeSectionBlock({ block }: BridgeSectionBlockProps) {
  return (
    <ThemeSection bgStyle={block.bgStyle} className="py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-2xl">
          {/* Heading — Termina */}
          <Heading className="mb-8 font-bold">
            {block.heading}
          </Heading>

          {/* Body — DM Sans richText */}
          {block.body && (
            <div
              className={`prose prose-lg max-w-none [&_p]:mb-5 [&_p]:leading-relaxed ${isDarkTheme(block.bgStyle) ? "prose-invert" : ""}`}
            >
              <RichText data={block.body} />
            </div>
          )}

          {/* Quotes — Instrument Serif, stacked */}
          {block.quotes && block.quotes.length > 0 && (
            <div className="mt-10 space-y-8">
              {block.quotes.map((quote) => (
                <blockquote
                  key={quote.id}
                  className="border-moss-400 border-l-2 pl-6"
                >
                  <p
                    className="text-theme-text font-serif text-xl/relaxed md:text-2xl/relaxed"
                  >
                    {quote.text}
                  </p>
                  {quote.attribution && (
                    <footer
                      className="text-theme-text-muted mt-3 text-sm font-medium"
                    >
                      {quote.attribution}
                    </footer>
                  )}
                </blockquote>
              ))}
            </div>
          )}

          {/* Closer — DM Sans medium weight, standalone */}
          {block.closer && (
            <p
              className="text-theme-text-secondary mt-10 text-base font-medium md:text-lg"
            >
              {block.closer}
            </p>
          )}
        </div>
      </Container>
    </ThemeSection>
  );
}
