import { NavbarClient } from './navbar-client'
import { EllaLogo } from '../_assets/logo'
import { getNavigation } from '../_lib/get-navigation'
import { navigation as fallbackNav } from '../_lib/content'

export async function Navbar() {
  const nav = await getNavigation()

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

  return (
    <NavbarClient
      links={links}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      logo={<EllaLogo className="h-14 w-auto" />}
    />
  )
}
