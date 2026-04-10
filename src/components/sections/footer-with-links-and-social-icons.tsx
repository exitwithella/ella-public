import { clsx } from "clsx/lite";
import type { ComponentProps, ReactNode } from "react";

import { Container } from "../elements/container";

export function FooterLink({
  href,
  className,
  ...props
}: { href: string } & Omit<ComponentProps<"a">, "href">) {
  return (
    <li className={clsx("text-theme-text-secondary", className)}>
      <a href={href} {...props} />
    </li>
  );
}

export function SocialLink({
  href,
  name,
  className,
  ...props
}: {
  href: string;
  name: string;
} & Omit<ComponentProps<"a">, "href">) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={name}
      className={clsx("text-theme-text *:size-6", className)}
      {...props}
    />
  );
}

export function FooterWithLinksAndSocialIcons({
  links,
  socialLinks,
  fineprint,
  className,
  ...props
}: {
  links: ReactNode;
  socialLinks?: ReactNode;
  fineprint: ReactNode;
} & ComponentProps<"footer">) {
  return (
    <footer className={clsx(className)} {...props}>
      <div className="bg-theme-text/[0.025] text-theme-text py-16">
        <Container className="flex flex-col gap-10 text-center text-sm/7">
          <div className="flex flex-col gap-6">
            <nav aria-label="Footer">
              <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
                {links}
              </ul>
            </nav>
            {socialLinks ? (
              <div className="flex items-center justify-center gap-10">
                {socialLinks}
              </div>
            ) : null}
          </div>
          <div className="text-theme-text-muted">{fineprint}</div>
        </Container>
      </div>
    </footer>
  );
}
