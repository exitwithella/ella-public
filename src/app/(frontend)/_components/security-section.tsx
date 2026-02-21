import { Container } from '@/components/elements/container'
import { security } from '../_lib/content'

export function SecuritySection() {
  return (
    <section className="bg-ella-green-50 py-20">
      <Container>
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-12 max-w-3xl">
            <h2 className="text-3xl font-semibold text-ella-green sm:text-4xl">
              {security.headline}
            </h2>
            <p className="mt-4 text-lg text-ella-slate/80">{security.description}</p>
          </div>

          {/* Content Grid */}
          <div className="grid gap-10 lg:grid-cols-3">
            {/* Main Feature */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-ella-green">{security.features[0].title}</h3>
                  <p className="mt-2 text-sm text-ella-slate/70">
                    {security.features[0].description}
                  </p>
                </div>

                {/* Badges Grid */}
                <div>
                  <h4 className="mb-3 font-semibold text-ella-green">You&apos;re in Good Hands</h4>
                  <div className="grid grid-cols-2 gap-px bg-gray-200">
                    {security.badges.map((badge, index) => (
                      <div key={index} className="bg-ella-green-50 p-3 text-sm text-ella-slate/80">
                        {badge}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Side Features */}
            <div className="space-y-8">
              {security.features.slice(1).map((feature, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-ella-green">{feature.title}</h3>
                  <p className="mt-2 text-sm text-ella-slate/70">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
