import type { Meta, StoryObj } from '@storybook/react-vite'
import { ButtonLink } from '../../components/elements/button'
import {
  NavbarLink,
  NavbarLogo,
  NavbarWithLinksActionsAndCenteredLogo,
} from '../../components/sections/navbar-with-links-actions-and-centered-logo'
import {
  NavbarLink as NavbarLinkCentered,
  NavbarLogo as NavbarLogoCentered,
  NavbarWithLogoActionsAndCenteredLinks,
} from '../../components/sections/navbar-with-logo-actions-and-centered-links'
import {
  NavbarLink as NavbarLinkLeft,
  NavbarLogo as NavbarLogoLeft,
  NavbarWithLogoActionsAndLeftAlignedLinks,
} from '../../components/sections/navbar-with-logo-actions-and-left-aligned-links'

const meta: Meta = {
  title: 'Sections/Navigation',
}
export default meta
type Story = StoryObj

const logoContent = (
  <span className="font-display text-lg font-semibold text-olive-950">Oatmeal</span>
)

const links = (
  <>
    <NavbarLink href="#">Features</NavbarLink>
    <NavbarLink href="#">Pricing</NavbarLink>
    <NavbarLink href="#">Docs</NavbarLink>
    <NavbarLink href="#">Blog</NavbarLink>
  </>
)

const actions = (
  <>
    <NavbarLink href="#">Sign in</NavbarLink>
    <ButtonLink href="#" size="md">Get started</ButtonLink>
  </>
)

export const LogoLeftLinksCenter: Story = {
  name: 'Logo left, links centered',
  render: () => (
    <div className="min-h-24">
      <NavbarWithLogoActionsAndCenteredLinks
        logo={<NavbarLogoCentered href="/">{logoContent}</NavbarLogoCentered>}
        links={
          <>
            <NavbarLinkCentered href="#">Features</NavbarLinkCentered>
            <NavbarLinkCentered href="#">Pricing</NavbarLinkCentered>
            <NavbarLinkCentered href="#">Docs</NavbarLinkCentered>
            <NavbarLinkCentered href="#">Blog</NavbarLinkCentered>
          </>
        }
        actions={actions}
      />
    </div>
  ),
}

export const LogoLeftLinksLeft: Story = {
  name: 'Logo left, links left-aligned',
  render: () => (
    <div className="min-h-24">
      <NavbarWithLogoActionsAndLeftAlignedLinks
        logo={<NavbarLogoLeft href="/">{logoContent}</NavbarLogoLeft>}
        links={
          <>
            <NavbarLinkLeft href="#">Features</NavbarLinkLeft>
            <NavbarLinkLeft href="#">Pricing</NavbarLinkLeft>
            <NavbarLinkLeft href="#">Docs</NavbarLinkLeft>
            <NavbarLinkLeft href="#">Blog</NavbarLinkLeft>
          </>
        }
        actions={actions}
      />
    </div>
  ),
}

export const LogoCentered: Story = {
  name: 'Logo centered, links both sides',
  render: () => (
    <div className="min-h-24">
      <NavbarWithLinksActionsAndCenteredLogo
        logo={<NavbarLogo href="/">{logoContent}</NavbarLogo>}
        links={links}
        actions={actions}
      />
    </div>
  ),
}
