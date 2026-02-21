import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'

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
          className="border-t-ash-950/5 border-b-ash-950/10 text-ash-950 border-t border-b pt-14 pb-4 font-semibold"
        >
          {group.title}
        </th>
      </tr>
      {group.features.map((feature) => (
        <tr key={String(feature.name)} className="group">
          <th
            scope="row"
            className="border-ash-950/5 text-ash-700 group-first:border-ash-950/10 border-t py-4 pr-3 font-normal"
          >
            {feature.name}
          </th>
          {plans.map((plan) => {
            const value = ((v: unknown): v is Record<Plan, ReactNode> =>
              typeof v === 'object' && v !== null && plan in v)(feature.value)
              ? feature.value[plan]
              : feature.value

            return (
              <td
                key={plan}
                className="border-ash-950/5 text-ash-700 group-first:border-ash-950/10 border-t px-3 py-4 text-center"
              >
                {value === true ? (
                  <CheckmarkIcon aria-label="Included" className="stroke-ash-950" />
                ) : value === false ? (
                  <MinusIcon aria-label="Not included" className="stroke-ash-950" />
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
        <table className="w-full border-collapse text-left text-sm/5 max-sm:hidden">
          <colgroup>
            <col className="w-2/5" />
            {plans.map((plan) => (
              <col key={plan} style={{ width: `calc(60% / ${plans.length})` }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th className="bg-ash-100 text-ash-950 sticky top-(--scroll-padding-top) py-5 pr-3 text-base/7 font-medium">
                Compare features
              </th>
              {plans.map((plan) => (
                <th
                  key={plan}
                  className="bg-ash-100 text-ash-950 sticky top-(--scroll-padding-top) p-3 text-center font-semibold"
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

        <div className="sm:hidden">
          {plans.map((plan) => (
            <div key={plan} className="mb-8">
              <h3 className="border-ash-950/10 text-ash-950 border-b px-2 py-4 text-sm/5 font-semibold">
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
