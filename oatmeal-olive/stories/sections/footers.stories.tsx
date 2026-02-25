import type { Meta, StoryObj } from '@storybook/react-vite'
import { FooterCategory, FooterLink, FooterWithLinkCategories } from '../../components/sections/footer-with-link-categories'
import { FooterLink as SimpleFooterLink, FooterWithLinksAndSocialIcons, SocialLink } from '../../components/sections/footer-with-links-and-social-icons'
import {
  FooterCategory as NewsletterCategory,
  FooterLink as NewsletterFooterLink,
  FooterWithNewsletterFormCategoriesAndSocialIcons,
  NewsletterForm,
  SocialLink as NewsletterSocialLink,
} from '../../components/sections/footer-with-newsletter-form-categories-and-social-icons'

const meta: Meta = {
  title: 'Sections/Footers',
}
export default meta
type Story = StoryObj

const socialLinks = (
  <>
    <SocialLink href="#" name="Twitter">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    </SocialLink>
    <SocialLink href="#" name="LinkedIn">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    </SocialLink>
  </>
)

export const WithLinkCategories: Story = {
  name: 'With link categories',
  render: () => (
    <FooterWithLinkCategories
      links={
        <>
          <FooterCategory title="Product">
            <FooterLink href="#">Features</FooterLink>
            <FooterLink href="#">Pricing</FooterLink>
            <FooterLink href="#">Changelog</FooterLink>
            <FooterLink href="#">Roadmap</FooterLink>
          </FooterCategory>
          <FooterCategory title="Company">
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Blog</FooterLink>
            <FooterLink href="#">Careers</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </FooterCategory>
          <FooterCategory title="Resources">
            <FooterLink href="#">Documentation</FooterLink>
            <FooterLink href="#">API Reference</FooterLink>
            <FooterLink href="#">Status</FooterLink>
            <FooterLink href="#">Support</FooterLink>
          </FooterCategory>
          <FooterCategory title="Legal">
            <FooterLink href="#">Privacy</FooterLink>
            <FooterLink href="#">Terms</FooterLink>
            <FooterLink href="#">Cookie policy</FooterLink>
          </FooterCategory>
        </>
      }
      fineprint="© 2025 Oatmeal, Inc. All rights reserved."
    />
  ),
}

export const WithLinksAndSocialIcons: Story = {
  name: 'With links and social icons',
  render: () => (
    <FooterWithLinksAndSocialIcons
      links={
        <>
          <SimpleFooterLink href="#">Features</SimpleFooterLink>
          <SimpleFooterLink href="#">Pricing</SimpleFooterLink>
          <SimpleFooterLink href="#">About</SimpleFooterLink>
          <SimpleFooterLink href="#">Blog</SimpleFooterLink>
          <SimpleFooterLink href="#">Privacy</SimpleFooterLink>
          <SimpleFooterLink href="#">Terms</SimpleFooterLink>
        </>
      }
      socialLinks={socialLinks}
      fineprint="© 2025 Oatmeal, Inc. All rights reserved."
    />
  ),
}

export const WithNewsletterFormCategoriesAndSocialIcons: Story = {
  name: 'With newsletter, categories, and social icons',
  render: () => (
    <FooterWithNewsletterFormCategoriesAndSocialIcons
      cta={
        <NewsletterForm
          headline={<span className="font-semibold text-olive-950">Stay up to date</span>}
          subheadline={<p>Get product updates, tips, and resources delivered to your inbox.</p>}
        />
      }
      links={
        <>
          <NewsletterCategory title="Product">
            <NewsletterFooterLink href="#">Features</NewsletterFooterLink>
            <NewsletterFooterLink href="#">Pricing</NewsletterFooterLink>
            <NewsletterFooterLink href="#">Changelog</NewsletterFooterLink>
          </NewsletterCategory>
          <NewsletterCategory title="Company">
            <NewsletterFooterLink href="#">About</NewsletterFooterLink>
            <NewsletterFooterLink href="#">Blog</NewsletterFooterLink>
            <NewsletterFooterLink href="#">Careers</NewsletterFooterLink>
          </NewsletterCategory>
          <NewsletterCategory title="Legal">
            <NewsletterFooterLink href="#">Privacy</NewsletterFooterLink>
            <NewsletterFooterLink href="#">Terms</NewsletterFooterLink>
          </NewsletterCategory>
        </>
      }
      fineprint="© 2025 Oatmeal, Inc. All rights reserved."
      socialLinks={
        <>
          <NewsletterSocialLink href="#" name="Twitter">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
            </svg>
          </NewsletterSocialLink>
          <NewsletterSocialLink href="#" name="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </NewsletterSocialLink>
        </>
      }
    />
  ),
}
