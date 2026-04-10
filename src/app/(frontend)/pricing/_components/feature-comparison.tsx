import { Container } from "@/components/elements/container";
import { Eyebrow } from "@/components/elements/eyebrow";
import { Heading } from "@/components/elements/heading";

// Reuse CellValue pattern from comparison-table-block.tsx
function CellValue({
  text,
  indicator,
}: {
  text?: string;
  indicator?: "check" | "cross" | "partial" | "text";
}) {
  if (indicator === "check") {
    return (
      <span className="text-moss-600 inline-flex items-center justify-center gap-1.5">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 8l3.5 3.5L13 4.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {text && <span className="sr-only">Yes</span>}
      </span>
    );
  }
  if (indicator === "cross") {
    return (
      <span className="text-ash-400 inline-flex items-center justify-center gap-1.5">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 2l10 10M12 2L2 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        {text && <span className="sr-only">No</span>}
      </span>
    );
  }
  if (indicator === "partial") {
    return (
      <span className="text-goldenrod-600 inline-flex items-center justify-center gap-1.5">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 7h8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        {text && <span className="text-ash-600 text-sm">{text}</span>}
      </span>
    );
  }
  // 'text' or default
  return <span className="text-ash-700 text-sm">{text ?? "—"}</span>;
}

type FeatureRow = {
  label: string;
  practitioner: {
    indicator?: "check" | "cross" | "partial" | "text";
    text?: string;
  };
  enterprise: {
    indicator?: "check" | "cross" | "partial" | "text";
    text?: string;
  };
};

type FeatureCategory = {
  name: string;
  rows: FeatureRow[];
};

const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    name: "Core Platform",
    rows: [
      {
        label: "Active client engagements",
        practitioner: { indicator: "text", text: "Up to 25" },
        enterprise: { indicator: "text", text: "Unlimited" },
      },
      {
        label: "Exit planning workflows",
        practitioner: { indicator: "check" },
        enterprise: { indicator: "check" },
      },
      {
        label: "Document generation",
        practitioner: { indicator: "check" },
        enterprise: { indicator: "check" },
      },
      {
        label: "Custom templates",
        practitioner: { indicator: "check" },
        enterprise: { indicator: "check" },
      },
      {
        label: "Client portal",
        practitioner: { indicator: "check" },
        enterprise: { indicator: "check" },
      },
    ],
  },
  {
    name: "AI & Intelligence",
    rows: [
      {
        label: "AI-assisted analysis (Sensemaking)",
        practitioner: { indicator: "check" },
        enterprise: { indicator: "check" },
      },
      {
        label: "Context-aware insights",
        practitioner: { indicator: "check" },
        enterprise: { indicator: "check" },
      },
      {
        label: "Smart deliverables",
        practitioner: { indicator: "check" },
        enterprise: { indicator: "check" },
      },
    ],
  },
  {
    name: "Collaboration & Team",
    rows: [
      {
        label: "Advisor seats",
        practitioner: { indicator: "text", text: "1 advisor" },
        enterprise: { indicator: "text", text: "Unlimited" },
      },
      {
        label: "Team workspace",
        practitioner: { indicator: "cross" },
        enterprise: { indicator: "check" },
      },
      {
        label: "Admin dashboard",
        practitioner: { indicator: "cross" },
        enterprise: { indicator: "check" },
      },
    ],
  },
  {
    name: "Security & Compliance",
    rows: [
      {
        label: "Encryption at rest and in transit",
        practitioner: { indicator: "check" },
        enterprise: { indicator: "check" },
      },
      {
        label: "SOC 2 compliant infrastructure",
        practitioner: { indicator: "check" },
        enterprise: { indicator: "check" },
      },
      {
        label: "SSO / SAML",
        practitioner: { indicator: "cross" },
        enterprise: { indicator: "check" },
      },
      {
        label: "Custom data retention policies",
        practitioner: { indicator: "cross" },
        enterprise: { indicator: "check" },
      },
    ],
  },
  {
    name: "Support",
    rows: [
      {
        label: "Email support",
        practitioner: { indicator: "check" },
        enterprise: { indicator: "check" },
      },
      {
        label: "Priority support",
        practitioner: { indicator: "cross" },
        enterprise: { indicator: "check" },
      },
      {
        label: "Dedicated success manager",
        practitioner: { indicator: "cross" },
        enterprise: { indicator: "check" },
      },
      {
        label: "Custom onboarding",
        practitioner: { indicator: "cross" },
        enterprise: { indicator: "check" },
      },
    ],
  },
];

export function FeatureComparison() {
  return (
    <section className="bg-sandstone-50 py-24 md:py-32">
      <Container>
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <Eyebrow size="sm" className="mb-3">
            Compare Plans
          </Eyebrow>
          <Heading className="text-3xl md:text-4xl">
            Everything you need, nothing you don't.
          </Heading>
        </div>

        {/* Desktop table */}
        <div className="border-ash-200 mx-auto hidden max-w-4xl overflow-x-auto rounded-sm border md:block">
          <table className="w-full border-collapse text-sm">
            <colgroup>
              <col className="w-1/2" />
              <col className="w-1/4" />
              <col className="w-1/4" />
            </colgroup>
            <thead>
              <tr>
                <th
                  className="bg-ash-100 px-6 py-5 text-left"
                  aria-hidden="true"
                />
                <th
                  scope="col"
                  className="font-display bg-moss-50 text-moss-800 px-6 py-5 text-center text-sm font-bold tracking-wide uppercase"
                >
                  Practitioner
                </th>
                <th
                  scope="col"
                  className="bg-ash-100 text-ash-600 font-display px-6 py-5 text-center text-sm font-bold tracking-wide uppercase"
                >
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {FEATURE_CATEGORIES.map((category) => (
                <>
                  <tr key={`cat-${category.name}`}>
                    <td
                      colSpan={3}
                      className="bg-ash-100 text-ash-600 font-display border-ash-200 border-t px-6 py-3 text-xs font-semibold tracking-widest uppercase"
                    >
                      {category.name}
                    </td>
                  </tr>
                  {category.rows.map((row, rowIdx) => (
                    <tr
                      key={`${category.name}-${row.label}`}
                      className={
                        rowIdx % 2 === 0
                          ? "bg-sandstone-50/60"
                          : "bg-sandstone-50/60"
                      }
                    >
                      <th
                        scope="row"
                        className="border-ash-100 text-ash-800 border-t px-6 py-4 text-left text-sm font-normal"
                      >
                        {row.label}
                      </th>
                      <td className="border-ash-100 bg-moss-50/40 border-t px-6 py-4 text-center">
                        <CellValue
                          indicator={row.practitioner.indicator}
                          text={row.practitioner.text}
                        />
                      </td>
                      <td className="border-ash-100 border-t px-6 py-4 text-center">
                        <CellValue
                          indicator={row.enterprise.indicator}
                          text={row.enterprise.text}
                        />
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: stacked cards, one per tier */}
        <div className="mx-auto max-w-lg space-y-6 md:hidden">
          {/* Practitioner card */}
          <div className="border-moss-200 bg-moss-50 rounded-sm border p-5">
            <h3 className="font-display border-moss-200 text-moss-800 mb-4 border-b pb-3 text-sm font-bold tracking-wide uppercase">
              Practitioner
            </h3>
            {FEATURE_CATEGORIES.map((category) => (
              <div key={category.name} className="mb-4">
                <Eyebrow color="ash" className="mb-2">
                  {category.name}
                </Eyebrow>
                <dl className="space-y-2.5">
                  {category.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-start justify-between gap-4"
                    >
                      <dt className="text-ash-600 text-sm">{row.label}</dt>
                      <dd className="text-moss-800 text-right text-sm font-medium">
                        <CellValue
                          indicator={row.practitioner.indicator}
                          text={row.practitioner.text}
                        />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          {/* Enterprise card */}
          <div className="border-ash-200 bg-sandstone-50 rounded-sm border p-5">
            <h3 className="font-display border-ash-200 text-ash-600 mb-4 border-b pb-3 text-sm font-bold tracking-wide uppercase">
              Enterprise
            </h3>
            {FEATURE_CATEGORIES.map((category) => (
              <div key={category.name} className="mb-4">
                <Eyebrow color="ash" className="mb-2">
                  {category.name}
                </Eyebrow>
                <dl className="space-y-2.5">
                  {category.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-start justify-between gap-4"
                    >
                      <dt className="text-ash-600 text-sm">{row.label}</dt>
                      <dd className="text-ash-700 text-right text-sm">
                        <CellValue
                          indicator={row.enterprise.indicator}
                          text={row.enterprise.text}
                        />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
