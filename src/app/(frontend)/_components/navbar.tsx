import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import {
  NavbarWithLinksActionsAndCenteredLogo,
  NavbarLink,
  NavbarLogo,
} from '@/components/sections/navbar-with-links-actions-and-centered-logo'

import { EllaLogo } from '../_assets/logo'
import { navigation } from '../_lib/content'

export function Navbar() {
  return (
    <NavbarWithLinksActionsAndCenteredLogo
      links={
        <>
          {navigation.links.map((link) => (
            <NavbarLink key={link.href} href={link.href}>
              {link.label}
            </NavbarLink>
          ))}
          <NavbarLink href={navigation.actions.login.href} className="sm:hidden">
            {navigation.actions.login.label}
          </NavbarLink>
        </>
      }
      logo={
        <NavbarLogo href="/">
          <EllaLogo className="h-14 w-auto" />
        </NavbarLogo>
      }
      actions={
        <>
          <PlainButtonLink
            href={navigation.actions.bookDemo.href}
            target="_blank"
            rel="noopener"
            className="max-sm:hidden"
          >
            {navigation.actions.bookDemo.label}
          </PlainButtonLink>
          <PlainButtonLink
            href={navigation.actions.login.href}
            target="_blank"
            rel="noopener"
            className="max-sm:hidden"
          >
            {navigation.actions.login.label}
          </PlainButtonLink>
          <ButtonLink href={navigation.actions.signUp.href} target="_blank" rel="noopener">
            {navigation.actions.signUp.label}
          </ButtonLink>
        </>
      }
    />
  )
}
