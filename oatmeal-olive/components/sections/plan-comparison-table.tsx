import { clsx } from 'clsx/lite'
import { type ComponentProps, type ReactNode } from 'react'
import { Container } from '../elements/container'
import { CheckmarkIcon } from '../icons/checkmark-icon'
import { MinusIcon } from '../icons/minus-icon'

function FeatureGroup<Plan extends string>({
  group,
  plans,
}: {
  group: {
    title: ReactNode
    features: { name: ReactNode; value: ReactNode | Record<Plan, ReactNode> }[]
  }
  plans: Plan[]
}) {
  return (
    <tbody>
      <tr>
        <th
          colSpan={plans.length + 1}
          scope="colgroup"
          className="border-t border-b border-t-olive-950/5 border-b-olive-950/10 pt-14 pb-4 font-semibold text-olive-950 dark:border-t-white/5 dark:border-b-white/10 dark:text-white"
        >
          {group.title}
        </th>
      </tr>
      {group.features.map((feature) => (
        <tr key={String(feature.name)} className="group">
          <th
            scope="row"
            className="border-t border-olive-950/5 py-4 pr-3 font-normal text-olive-700 group-first:border-olive-950/10 dark:border-white/5 dark:text-olive-400 dark:group-first:border-white/10"
          >
            {feature.name}
          </th>
          {plans.map((plan) => {
            // Type guard narrows feature.value to a per-plan record when it's an
            // object containing the current plan key. Cast through unknown first
            // to avoid the any escape hatch.
            const value = ((v: unknown): v is Record<Plan, ReactNode> =>
              typeof v === 'object' && v !== null && plan in v)(feature.value)
              ? feature.value[plan]
              : feature.value

            return (
              <td
                key={plan}
                className="border-t border-olive-950/5 px-3 py-4 text-center text-olive-700 group-first:border-olive-950/10 dark:border-white/10 dark:text-olive-400 dark:group-first:border-white/10"
              >
                {value === true ? (
                  <CheckmarkIcon aria-label="Included" className="stroke-olive-950 dark:stroke-white" />
                ) : value === false ? (
                  <MinusIcon aria-label="Not included" className="stroke-olive-950 dark:stroke-white" />
                ) : (
                  value
                )}
              </td>
            )
          })}
        </tr>
      ))}
    </tbody>
  )
}

export function PlanComparisonTable<const Plan extends string>({
  plans,
  features,
  className,
  ...props
}: {
  plans: Plan[]
  features: {
    title: ReactNode
    features: { name: ReactNode; value: ReactNode | Record<Plan, ReactNode> }[]
  }[]
} & ComponentProps<'section'>) {
  return (
    <section className={clsx('py-16', className)} {...props}>
      <Container>
        {/* Desktop: full multi-column comparison table */}
        <table className="w-full border-collapse text-left text-sm/5 max-sm:hidden">
          <colgroup>
            <col className="w-2/5" />
            {plans.map((plan) => (
              <col key={plan} style={{ width: `calc(60% / ${plans.length})` }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th className="sticky top-(--scroll-padding-top) bg-olive-100 py-5 pr-3 text-base/7 font-medium text-olive-950 dark:bg-olive-950 dark:text-white">
                Compare features
              </th>
              {plans.map((plan) => (
                <th
                  key={plan}
                  className="sticky top-(--scroll-padding-top) bg-olive-100 p-3 text-center font-semibold text-olive-950 dark:bg-olive-950 dark:text-white"
                >
                  {plan}
                </th>
              ))}
            </tr>
          </thead>
          {features.map((group) => (
            <FeatureGroup key={String(group.title)} group={group} plans={plans} />
          ))}
        </table>

        {/* Mobile: stacked layout — one section per plan, all features visible.
            Replaces ElTabGroup (which required client JS for tab state).
            A stacked layout is better for a marketing comparison: readers can
            scroll through all plans rather than only seeing one at a time. */}
        <div className="sm:hidden">
          {plans.map((plan) => (
            <div key={plan} className="mb-8">
              <h3 className="border-b border-olive-950/10 px-2 py-4 text-sm/5 font-semibold text-olive-950 dark:border-white/10 dark:text-white">
                {plan}
              </h3>
              <table className="w-full border-collapse text-left text-sm/5">
                <colgroup>
                  <col className="w-3/4" />
                  <col className="w-1/4" />
                </colgroup>
                {features.map((group) => (
                  <FeatureGroup key={String(group.title)} group={group} plans={[plan]} />
                ))}
              </table>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
