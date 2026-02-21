import {
  FooterWithLinksAndSocialIcons,
  FooterLink,
} from '@/components/sections/footer-with-links-and-social-icons'

import { footer } from '../_lib/content'

export function Footer() {
  return (
    <FooterWithLinksAndSocialIcons
      links={
        <>
          {footer.links.map((link) => (
            <FooterLink key={link.href} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </>
      }
      fineprint={<p>{footer.copyright}</p>}
    />
  )
}
