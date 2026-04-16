import { getCloudflareContext } from '@opennextjs/cloudflare'
import dynamic from 'next/dynamic'
import { headers } from 'next/headers'

import type { Footer as FooterGlobal } from '@/payload-types'

import { getFooter } from '../_lib/get-footer'

const PullToRevealWrapper = dynamic(
  () =>
    import('@/components/sections/pull-to-reveal').then((mod) => ({
      default: mod.PullToRevealWrapper,
    })),
  { ssr: true },
)

type EasterEgg = NonNullable<FooterGlobal['easterEgg']>
type LocalVariant = NonNullable<EasterEgg['localVariants']>[number]

interface GeoInfo {
  city: string | null
  regionCode: string | null
  region: string | null
  country: string | null
  lat: number | null
  lon: number | null
}

async function getGeoInfo(): Promise<GeoInfo> {
  // Touch headers() so Next.js opts out of static rendering — this component
  // must re-evaluate per request to read the caller's geo data.
  try {
    await headers()
  } catch {
    // Ignore in build/prerender contexts.
  }

  try {
    const { cf } = await getCloudflareContext({ async: true })
    if (!cf) {
      return { city: null, regionCode: null, region: null, country: null, lat: null, lon: null }
    }

    const lat = Number(cf.latitude)
    const lon = Number(cf.longitude)
    return {
      city: typeof cf.city === 'string' ? cf.city.toLowerCase() : null,
      regionCode: typeof cf.regionCode === 'string' ? cf.regionCode.toUpperCase() : null,
      region: typeof cf.region === 'string' ? cf.region.toLowerCase() : null,
      country: typeof cf.country === 'string' ? cf.country.toUpperCase() : null,
      lat: Number.isFinite(lat) && lat !== 0 ? lat : null,
      lon: Number.isFinite(lon) && lon !== 0 ? lon : null,
    }
  } catch {
    return { city: null, regionCode: null, region: null, country: null, lat: null, lon: null }
  }
}

const EARTH_RADIUS_MILES = 3958.8
const toRad = (deg: number) => (deg * Math.PI) / 180

/**
 * Haversine distance in miles. Conservative enough for city-scale geo-fencing.
 */
function milesBetween(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.min(1, Math.sqrt(a)))
}

function variantMatches(variant: LocalVariant, geo: GeoInfo): boolean {
  const cities = (variant.matchCities ?? '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
  if (cities.length > 0 && geo.city && cities.includes(geo.city)) return true

  if (variant.matchRegionCode && geo.regionCode) {
    if (variant.matchRegionCode.trim().toUpperCase() === geo.regionCode) return true
  }

  if (variant.matchCountryCode && geo.country) {
    if (variant.matchCountryCode.trim().toUpperCase() === geo.country) return true
  }

  if (
    typeof variant.matchCenterLat === 'number' &&
    typeof variant.matchCenterLon === 'number' &&
    typeof variant.matchRadiusMiles === 'number' &&
    variant.matchRadiusMiles > 0 &&
    geo.lat !== null &&
    geo.lon !== null
  ) {
    const distance = milesBetween(geo.lat, geo.lon, variant.matchCenterLat, variant.matchCenterLon)
    if (distance <= variant.matchRadiusMiles) return true
  }

  return false
}

/**
 * Legacy PA check used when `localImage`/`localText` are set but no
 * `localVariants` match. Bounding box roughly covers Pennsylvania.
 */
function isPennsylvania(geo: GeoInfo): boolean {
  if (geo.regionCode === 'PA' || geo.region === 'pennsylvania') return true
  if (geo.lat !== null && geo.lon !== null) {
    if (geo.lat >= 39.7 && geo.lat <= 42.3 && geo.lon >= -80.5 && geo.lon <= -74.7) return true
  }
  return false
}

export async function EasterEggWrapper({ children }: { children: React.ReactNode }) {
  const footer = await getFooter()
  const egg = footer.easterEgg
  const enabled = egg?.enabled ?? false

  if (!enabled) {
    return <>{children}</>
  }

  const geo = await getGeoInfo()

  // Try localVariants first (new, editor-ordered system).
  const matched = (egg?.localVariants ?? []).find((v) => variantMatches(v, geo))

  const variantImg =
    matched && typeof matched.image === 'object' && matched.image?.url ? matched.image.url : null

  // Legacy fallback: `localImage`/`localText` for Pennsylvania visitors.
  const legacyImg =
    !matched && isPennsylvania(geo) && typeof egg?.localImage === 'object' && egg.localImage?.url
      ? egg.localImage.url
      : null

  const defaultImg =
    typeof egg?.backgroundImage === 'object' && egg.backgroundImage?.url
      ? egg.backgroundImage.url
      : null

  const bgImage = variantImg ?? legacyImg ?? defaultImg

  const defaultText = egg?.text ?? 'Believe in Main Street'
  const text =
    matched?.text ||
    (!matched && isPennsylvania(geo) && egg?.localText ? egg.localText : null) ||
    defaultText

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
