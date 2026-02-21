import Link from 'next/link'
import { Container } from '@/components/elements/container'
import { EllaLogo } from '../_assets/logo'
import { footer } from '../_lib/content'

export function Footer() {
  return (
    <footer className="bg-ella-slate py-12">
      <Container>
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <EllaLogo className="h-12 w-auto [&_path]:fill-ella-cream" />

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footer.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ella-cream/70 transition-colors hover:text-ella-cream"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-sm text-ella-cream/50">{footer.copyright}</p>
        </div>
      </Container>
    </footer>
  )
}
