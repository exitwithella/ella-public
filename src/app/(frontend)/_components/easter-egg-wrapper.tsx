import dynamic from 'next/dynamic'
import { headers } from 'next/headers'

import { getFooter } from '../_lib/get-footer'

const PullToRevealWrapper = dynamic(
  () =>
    import('@/components/sections/pull-to-reveal').then((mod) => ({
      default: mod.PullToRevealWrapper,
    })),
  { ssr: true },
)

async function isPennsylvania(): Promise<boolean> {
  try {
    const hdrs = await headers()
    const region = hdrs.get('cf-ipregion')?.toLowerCase()
    if (region === 'pa' || region === 'pennsylvania') return true

    const lat = Number(hdrs.get('cf-iplatitude'))
    const lon = Number(hdrs.get('cf-iplongitude'))
    if (lat && lon && lat >= 39.7 && lat <= 42.3 && lon >= -80.5 && lon <= -74.7) return true

    return false
  } catch {
    return false
  }
}

export async function EasterEggWrapper({ children }: { children: React.ReactNode }) {
  const footer = await getFooter()
  const egg = footer.easterEgg
  const enabled = egg?.enabled ?? false

  if (!enabled) {
    return <>{children}</>
  }

  const isLocal = await isPennsylvania()

  const localImg =
    isLocal && typeof egg?.localImage === 'object' && egg.localImage?.url
      ? egg.localImage.url
      : null

  const defaultImg =
    typeof egg?.backgroundImage === 'object' && egg.backgroundImage?.url
      ? egg.backgroundImage.url
      : null

  const bgImage = localImg ?? defaultImg
  let text = egg?.text ?? 'Believe in Main Street'
  if (isLocal && egg?.localText) {
    text = egg.localText
  }

  return (
    <PullToRevealWrapper
      enabled={enabled}
      backgroundUrl={bgImage}
      text={text}
      height={egg?.height ?? 400}
    >
      {children}
    </PullToRevealWrapper>
  )
}
