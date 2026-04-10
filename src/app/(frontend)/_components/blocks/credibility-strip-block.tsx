import { Container } from "@/components/elements/container";
import { Eyebrow } from "@/components/elements/eyebrow";
import { ThemeSection } from "@/components/elements/theme-section";
import type { Page } from "@/payload-types";

type CredibilityStripData = Extract<
  NonNullable<Page["layout"]>[number],
  { blockType: "credibility-strip" }
>;

interface CredibilityStripBlockProps {
  block: CredibilityStripData;
}

export function CredibilityStripBlock({ block }: CredibilityStripBlockProps) {
  if (block.variant === "text" && block.statement) {
    return (
      <ThemeSection bgStyle={block.bgStyle} className="py-10">
        <Container>
          <p className="text-theme-text mx-auto max-w-2xl text-center font-serif text-lg/relaxed md:text-xl/relaxed">
            {block.statement}
          </p>
        </Container>
      </ThemeSection>
    );
  }

  // logos / stats / combined variants — placeholder until logo assets are available
  return (
    <ThemeSection bgStyle={block.bgStyle} className="py-8">
      <Container>
        {block.label && (
          <Eyebrow className="mb-4 text-center">
            {block.label}
          </Eyebrow>
        )}
        {block.stats && block.stats.length > 0 && (
          <dl className="flex flex-wrap justify-center gap-8">
            {block.stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <dt className="font-display text-theme-text text-3xl font-bold">
                  {stat.value}
                </dt>
                <dd className="text-theme-text-secondary text-sm">{stat.label}</dd>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </ThemeSection>
  );
}
