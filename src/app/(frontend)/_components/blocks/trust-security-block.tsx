import { RichText } from "@payloadcms/richtext-lexical/react";
import type { ReactNode } from "react";

import { ButtonLink } from "@/components/elements/button";
import { Container } from "@/components/elements/container";
import { Heading } from "@/components/elements/heading";
import { isDarkTheme, ThemeSection } from "@/components/elements/theme-section";
import type { Media, Page } from "@/payload-types";

type TrustSecurityData = Extract<
  NonNullable<Page["layout"]>[number],
  { blockType: "trust-security" }
>;

interface TrustSecurityBlockProps {
  block: TrustSecurityData;
}

/**
 * Parses *asterisk-wrapped* segments into <em> elements.
 */
function parseEmphasis(text: string): ReactNode[] {
  const parts = text.split(/(\*[^*]+\*|_[^_]+_)/);
  return parts.map((part, i) => {
    if (
      (part.startsWith("*") && part.endsWith("*")) ||
      (part.startsWith("_") && part.endsWith("_"))
    ) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

async function fetchSvgDataUri(media: Media): Promise<string | null> {
  const url = media.url;
  if (!url || !media.mimeType?.includes("svg")) return null;

  try {
    const absoluteUrl = url.startsWith("http")
      ? url
      : `${process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000"}${url}`;
    const res = await fetch(absoluteUrl, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const svg = await res.text();
    const encoded = encodeURIComponent(svg);
    return `url("data:image/svg+xml,${encoded}")`;
  } catch {
    return null;
  }
}

const patternStyle = (dataUri: string, color: string | null | undefined) =>
  ({
    maskImage: dataUri,
    WebkitMaskImage: dataUri,
    maskRepeat: "repeat",
    WebkitMaskRepeat: "repeat",
    maskSize: "400px",
    WebkitMaskSize: "400px",
    backgroundColor: color || undefined,
  }) as const;

const bgColorStyle = (color: string | null | undefined) =>
  color ? ({ backgroundColor: color } as const) : undefined;

export async function TrustSecurityBlock({ block }: TrustSecurityBlockProps) {
  const patternMedia =
    block.patternSvg && typeof block.patternSvg !== "number"
      ? block.patternSvg
      : null;
  const patternDataUri = patternMedia
    ? await fetchSvgDataUri(patternMedia)
    : null;
  const sections = block.sections ?? [];

  return (
    <ThemeSection
      bgStyle={block.bgStyle}
      className="py-16 md:py-20"
      style={bgColorStyle(block.backgroundColor)}
    >
      <Container>
        <div className="relative flex min-h-[400px] flex-col items-end overflow-hidden">
          {patternDataUri && (
            <div
              className="absolute inset-0 z-0"
              style={patternStyle(patternDataUri, block.patternColor)}
            />
          )}

          <div
            className="bg-theme-bg relative z-10 mx-6 mt-auto p-6 md:mx-10 lg:mx-16 lg:px-12 lg:pt-12"
            style={bgColorStyle(block.contentBackgroundColor)}
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-10">
              <div>
                {block.heading && (
                  <Heading className="mb-3 text-xl md:text-2xl">
                    {parseEmphasis(block.heading)}
                  </Heading>
                )}

                {block.intro && (
                  <div
                    className={`prose prose-sm [&_p]:text-sm [&_p]:leading-snug [&_p+p]:mt-2 text-theme-text-secondary mb-6 max-w-none ${isDarkTheme(block.bgStyle) ? "prose-invert" : ""}`}
                  >
                    <RichText data={block.intro} />
                  </div>
                )}

                {block.link?.href && block.link.label && (
                  <ButtonLink href={block.link.href} color="auto">
                    {block.link.label}
                  </ButtonLink>
                )}
              </div>

              {sections.length > 0 && (
                <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2 md:gap-y-6">
                  {sections.map((item) => (
                    <div
                      key={item.id}
                      className="border-theme-border border-t pt-3"
                    >
                      <h3 className="text-theme-text mb-1.5 text-sm font-bold tracking-wider uppercase">
                        {parseEmphasis(item.title)}
                      </h3>
                      {item.body && (
                        <p className="text-theme-text-secondary text-xs/relaxed">
                          {item.body}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </ThemeSection>
  );
}
