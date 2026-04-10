import { ButtonLink, PlainButtonLink } from "@/components/elements/button";
import { Container } from "@/components/elements/container";
import { ArrowNarrowRightIcon } from "@/components/icons/arrow-narrow-right-icon";

import { aboutCloser } from "../_lib/content";

export function AboutCloser() {
  return (
    <section className="bg-moss-900 py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-ash-100 mb-8 font-serif text-2xl/snug md:text-3xl/snug">
            {aboutCloser.headline}
          </h2>

          <p className="text-ash-200 mb-10 text-lg/relaxed">
            {aboutCloser.body}
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <ButtonLink
              href={aboutCloser.primaryCta.href}
              size="lg"
              color="light"
              target="_blank"
              rel="noopener"
              className="text-moss-900 hover:bg-ash-100 w-full sm:w-auto"
            >
              {aboutCloser.primaryCta.label}
            </ButtonLink>
            <PlainButtonLink
              href={aboutCloser.secondaryCta.href}
              size="lg"
              color="light"
              target="_blank"
              rel="noopener"
              className="w-full justify-center sm:w-auto"
            >
              {aboutCloser.secondaryCta.label} <ArrowNarrowRightIcon />
            </PlainButtonLink>
          </div>

          <p className="text-ash-400 mt-4 text-sm">{aboutCloser.microcopy}</p>
        </div>
      </Container>
    </section>
  );
}
