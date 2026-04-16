import { ImageResponse } from 'next/og'

export const alt = 'ELLA — Practice Systematization for Trusted Advisors'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Root-level Open Graph image fallback. Used only when a page has no `meta.image`
 * and SiteSettings has no `ogImage` configured. Pages with either of those
 * populated bypass this file via `openGraph.images` set in generateMetadata.
 *
 * Uses the default Satori font (no custom font loading) to keep the Cloudflare
 * Workers bundle lean and avoid runtime font fetches.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#F5F5F0',
        padding: '96px',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          fontSize: 28,
          color: '#5A6B4A',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          marginBottom: 40,
          fontWeight: 600,
        }}
      >
        ELLA
      </div>
      <div
        style={{
          fontSize: 84,
          color: '#2A2E26',
          lineHeight: 1.08,
          letterSpacing: '-0.02em',
          maxWidth: 960,
          fontWeight: 600,
        }}
      >
        Practice systematization for trusted advisors.
      </div>
      <div
        style={{
          fontSize: 28,
          color: '#5C635A',
          marginTop: 48,
          maxWidth: 880,
          lineHeight: 1.4,
        }}
      >
        From intake to insight — built hand-in-hand with advisors who stake their reputation on
        trust.
      </div>
    </div>,
    {
      ...size,
    },
  )
}
