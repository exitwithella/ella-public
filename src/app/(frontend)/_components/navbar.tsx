import {
  NavbarWithLinksActionsAndCenteredLogo,
  NavbarLink,
  NavbarLogo,
} from '@/components/sections/navbar-with-links-actions-and-centered-logo'
import { ButtonLink } from '@/components/elements/button'
import { EllaLogo } from '../_assets/logo'
import { navigation } from '../_lib/content'

export function Navbar() {
  return (
    <NavbarWithLinksActionsAndCenteredLogo
      className="!bg-ella-cream"
      links={
        <>
          {navigation.links.map((link) => (
            <NavbarLink key={link.href} href={link.href} className="!text-ella-green">
              {link.label}
            </NavbarLink>
          ))}
        </>
      }
      logo={
        <NavbarLogo href="/">
          <EllaLogo className="h-14 w-auto" />
        </NavbarLogo>
      }
      actions={
        <>
          <NavbarLink
            href={navigation.actions.bookDemo.href}
            target="_blank"
            className="!text-ella-green max-lg:hidden"
          >
            {navigation.actions.bookDemo.label}
          </NavbarLink>
          <NavbarLink
            href={navigation.actions.login.href}
            target="_blank"
            className="!text-ella-green max-lg:hidden"
          >
            {navigation.actions.login.label}
          </NavbarLink>
          <ButtonLink
            href={navigation.actions.signUp.href}
            target="_blank"
            className="!bg-ella-gold !text-white hover:!bg-ella-leather"
          >
            {navigation.actions.signUp.label}
          </ButtonLink>
        </>
      }
    />
  )
}
