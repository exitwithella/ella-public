import { Container } from "@/components/elements/container";
import { ArrowNarrowRightIcon } from "@/components/icons/arrow-narrow-right-icon";
import type { PricingTier } from "@/payload-types";

interface TierCardsProps {
  tiers: PricingTier[];
}

function formatPrice(tier: PricingTier): {
  display: string;
  period: string | null;
} {
  const price = tier.price;
  if (!price) return { display: "Contact us", period: null };

  if (price.period === "custom") {
    return { display: price.customLabel ?? "Contact us", period: null };
  }

  if (price.amount == null || price.amount === 0) {
    return { display: "Free", period: null };
  }

  const dollars = Math.round(price.amount / 100);
  return { display: `$${dollars}`, period: "/mo" };
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="text-moss-600 mt-0.5 shrink-0"
    >
      <path
        d="M3 8l3.5 3.5L13 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TierCard({ tier }: { tier: PricingTier }) {
  const isHighlighted = Boolean(tier.highlighted);
  const { display: priceDisplay, period: pricePeriod } = formatPrice(tier);
  const isContactUs = pricePeriod === null && priceDisplay !== "Free";

  const ctaHref = tier.cta?.href ?? "https://app.exitwithella.io/sign-up";
  const ctaLabel = tier.cta?.label ?? "Get Started";

  return (
    <div
      className={`relative flex flex-col rounded-sm p-8 ${
        isHighlighted
          ? "border-moss-300 bg-moss-50 border-2"
          : "border-ash-200 bg-sandstone-50 border"
      }`}
    >
      {/* Badge */}
      {tier.badge && (
        <div className="mb-4">
          <span className="bg-moss-100 text-moss-700 font-display inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase">
            {tier.badge}
          </span>
        </div>
      )}

      {/* Tier name */}
      <h2 className="font-display text-ash-900 mb-1 text-xl font-bold tracking-tight">
        {tier.name}
      </h2>

      {/* Tagline */}
      {tier.tagline && (
        <p className="text-ash-1000 mb-6 text-sm">{tier.tagline}</p>
      )}

      {/* Price */}
      <div className="mb-6">
        {isContactUs ? (
          <p className="font-display text-ash-900 text-3xl font-bold">
            {priceDisplay}
          </p>
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="font-display text-ash-900 text-4xl font-bold">
              {priceDisplay}
            </span>
            {pricePeriod && (
              <span className="text-ash-1000 text-base">{pricePeriod}</span>
            )}
          </div>
        )}
      </div>

      {/* Description */}
      {tier.description && (
        <p className="text-ash-600 border-ash-200 mb-8 border-b pb-8 text-sm/relaxed">
          {tier.description}
        </p>
      )}

      {/* Feature list */}
      {tier.features && tier.features.length > 0 && (
        <ul className="mb-8 flex-1 space-y-3">
          {tier.features.map((f) => (
            <li key={f.id} className="flex items-start gap-2.5">
              <CheckIcon />
              <span className="text-ash-700 text-sm">{f.feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      <a
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
          isHighlighted
            ? "bg-moss-700 text-ash-100 hover:bg-moss-800"
            : "border-ash-300 text-ash-700 hover:bg-ash-100 border bg-transparent"
        }`}
      >
        {ctaLabel}
        {!isHighlighted && <ArrowNarrowRightIcon className="h-4 w-4" />}
      </a>
    </div>
  );
}

export function TierCards({ tiers }: TierCardsProps) {
  if (tiers.length === 0) return null;

  return (
    <section className="bg-ash-100 py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {tiers.map((tier) => (
              <TierCard key={tier.id} tier={tier} />
            ))}
          </div>
          <p className="text-ash-1000 mt-6 text-center text-sm">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </Container>
    </section>
  );
}
