import Image from 'next/image'

import { EllaLogo } from '../_assets/logo'
import { navigation as fallbackNav } from '../_lib/content'
import { getNavigation } from '../_lib/get-navigation'
import { getSiteSettings } from '../_lib/get-site-settings'
import { NavbarClient } from './navbar-client'

export async function Navbar() {
  const [nav, siteSettings] = await Promise.all([getNavigation(), getSiteSettings()])

  const links =
    nav.primaryNav?.map((item) => ({
      label: item.label,
      href: item.href ?? undefined,
      type: (item.type ?? 'link') as 'link' | 'dropdown',
      dropdownItems:
        item.dropdownItems?.map((di) => ({
          label: di.label,
          href: di.href,
          description: di.description ?? undefined,
        })) ?? [],
    })) ?? []

  const primaryCta = {
    label: nav.primaryCta?.label || fallbackNav.actions.signUp.label,
    href: nav.primaryCta?.href || fallbackNav.actions.signUp.href,
  }

  const secondaryCta = {
    label: nav.secondaryCta?.label || fallbackNav.actions.bookDemo.label,
    href: nav.secondaryCta?.href || fallbackNav.actions.bookDemo.href,
  }

  const loginLink =
    nav.loginLink?.enabled && nav.loginLink.href
      ? { label: nav.loginLink.label || 'Log in', href: nav.loginLink.href }
      : undefined

  const logoMedia =
    typeof siteSettings.logo === 'object' && siteSettings.logo?.url ? siteSettings.logo : null

  const logo = logoMedia?.url ? (
    <Image
      src={logoMedia.url}
      alt={logoMedia.alt || 'ELLA'}
      width={logoMedia.width ?? 288}
      height={logoMedia.height ?? 124}
      className="h-14 w-auto"
      priority
    />
  ) : (
    <EllaLogo className="h-14 w-auto" />
  )

  return (
    <NavbarClient
      links={links}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      loginLink={loginLink}
      logo={logo}
    />
  )
}
