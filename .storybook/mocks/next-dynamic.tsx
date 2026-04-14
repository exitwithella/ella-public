import type { ComponentType } from 'react'

interface DynamicOptions {
  ssr?: boolean
  loading?: ComponentType
}

export default function dynamic<P extends object>(
  loader: () => Promise<{ default: ComponentType<P> } | ComponentType<P>>,
  _options?: DynamicOptions,
): ComponentType<P> {
  // Eagerly resolve the loader for Storybook (no lazy/SSR boundary)
  let Component: ComponentType<P> | null = null
  let loadError: Error | null = null

  const promise = loader().then(
    (mod) => {
      Component = 'default' in mod ? mod.default : mod
    },
    (err) => {
      loadError = err
    },
  )

  return function DynamicWrapper(props: P) {
    if (loadError) throw loadError
    if (!Component) throw promise // Trigger Suspense boundary
    return <Component {...props} />
  }
}
