import { test, expect } from '@playwright/test'

test.describe('Production smoke', () => {
  test('homepage returns 200 with expected title and heading', async ({ page }) => {
    const response = await page.goto('/')
    expect(response, 'page.goto returned no response').not.toBeNull()
    expect(response!.status(), 'homepage HTTP status').toBe(200)

    await expect(page).toHaveTitle(/ELLA/i)

    const h1 = page.locator('h1').first()
    await expect(h1).toBeVisible()
    const h1Text = (await h1.textContent())?.replace(/\s+/g, ' ').trim() ?? ''
    expect(h1Text.length, `h1 rendered empty: ${JSON.stringify(h1Text)}`).toBeGreaterThan(0)
  })

  test('every image on the homepage returns 200 with image/* content-type', async ({
    page,
    request,
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // currentSrc is the URL the browser actually selected from <img>/<picture>
    // srcsets. Avoids hand-parsing srcset (which is complex when individual URLs
    // contain commas — Cloudflare image transforms do, e.g. /cdn-cgi/image/
    // width=1920,quality=75,format=auto/...). If we want broader srcset coverage
    // later we can resize the viewport and re-collect.
    const urls = await page.evaluate(() => {
      const collected = new Set<string>()
      for (const img of document.querySelectorAll<HTMLImageElement>('img')) {
        const url = img.currentSrc || img.src
        if (url) collected.add(url)
      }
      return [...collected]
    })

    expect(urls.length, 'expected at least one image on the homepage').toBeGreaterThan(0)

    const sawEdgeRewrite = urls.some((u) => u.includes('/cdn-cgi/image/'))
    expect(
      sawEdgeRewrite,
      'expected at least one image rewritten through /cdn-cgi/image/ (image-loader wiring)',
    ).toBe(true)

    const results = await Promise.all(
      urls.map(async (url): Promise<string | null> => {
        try {
          const res = await request.get(url, { failOnStatusCode: false, timeout: 10_000 })
          const status = res.status()
          const contentType = res.headers()['content-type'] ?? ''
          if (status !== 200) return `${url} -> HTTP ${status}`
          if (!contentType.startsWith('image/')) return `${url} -> content-type ${contentType}`
          return null
        } catch (err) {
          return `${url} -> fetch error: ${(err as Error).message}`
        }
      }),
    )
    const failures = results.filter((r): r is string => r !== null)
    expect(failures, `broken images:\n  ${failures.join('\n  ')}`).toEqual([])
  })

  test('/admin login page renders without 500', async ({ page }) => {
    const response = await page.goto('/admin')
    expect(response, 'page.goto returned no response').not.toBeNull()
    expect(response!.status(), '/admin HTTP status').toBeLessThan(500)

    await expect(page.locator('input[name="email"]')).toBeVisible({ timeout: 15_000 })
  })

  test('SEO endpoints return 200 with expected content-types', async ({ request }) => {
    const endpoints: { path: string; expectedType: RegExp }[] = [
      { path: '/sitemap.xml', expectedType: /xml/ },
      { path: '/robots.txt', expectedType: /text\/plain/ },
      { path: '/llms.txt', expectedType: /text\/plain|text\/markdown/ },
    ]

    const results = await Promise.all(
      endpoints.map(async ({ path, expectedType }): Promise<string | null> => {
        const res = await request.get(path, { failOnStatusCode: false, timeout: 10_000 })
        const status = res.status()
        const contentType = res.headers()['content-type'] ?? ''
        if (status !== 200) return `${path} -> HTTP ${status}`
        if (!expectedType.test(contentType)) {
          return `${path} -> content-type ${contentType} (expected ${expectedType})`
        }
        return null
      }),
    )
    const failures = results.filter((r): r is string => r !== null)
    expect(failures, `broken SEO endpoints:\n  ${failures.join('\n  ')}`).toEqual([])
  })
})
