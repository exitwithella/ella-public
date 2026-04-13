import { headers } from 'next/headers'

import { PullToRevealWrapper } from '@/components/sections/pull-to-reveal'

import { getFooter } from '../_lib/get-footer'

// Erie, PA and surrounding area — use this for tighter geo targeting
// async function isErieArea(): Promise<boolean> {
//   try {
//     const hdrs = await headers()
//     const city = hdrs.get('cf-ipcity')?.toLowerCase()
//     const erieCities = new Set([
//       'erie', 'millcreek', 'harborcreek', 'fairview', 'edinboro',
//       'north east', 'corry', 'meadville', 'girard', 'waterford',
//       'union city', 'lake city',
//     ])
//     if (city && erieCities.has(city)) return true
//     const lat = Number(hdrs.get('cf-iplatitude'))
//     const lon = Number(hdrs.get('cf-iplongitude'))
//     if (lat && lon) {
//       const dlat = Math.abs(lat - 42.13)
//       const dlon = Math.abs(lon - -80.08)
//       if (dlat < 0.7 && dlon < 0.9) return true
//     }
//     return false
//   } catch {
//     return false
//   }
// }

async function isPennsylvania(): Promise<boolean> {
  try {
    const hdrs = await headers()
    // Cloudflare Workers injects geo headers from the cf object
    const region = hdrs.get('cf-ipregion')?.toLowerCase()
    if (region === 'pa' || region === 'pennsylvania') return true

    // Fallback: check coordinates (PA bounding box roughly 39.7–42.3 lat, -80.5–-74.7 lon)
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

  let bgImage: string | null = null
  let text = egg?.text ?? 'Believe in Main Street'

  if (enabled) {
    const isLocal = await isPennsylvania()

    const localImg =
      isLocal && typeof egg?.localImage === 'object' && egg.localImage?.url
        ? egg.localImage.url
        : null

    const defaultImg =
      typeof egg?.backgroundImage === 'object' && egg.backgroundImage?.url
        ? egg.backgroundImage.url
        : null

    bgImage = localImg ?? defaultImg

    if (isLocal && egg?.localText) {
      text = egg.localText
    }
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
