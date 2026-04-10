"use client";

import { clsx } from "clsx/lite";
import {
  type ComponentProps,
  type ReactNode,
  useCallback,
  useRef,
} from "react";

export function NavbarLink({
  children,
  href,
  className,
  ...props
}: { href: string } & Omit<ComponentProps<"a">, "href">) {
  return (
    <a
      href={href}
      className={clsx(
        "group inline-flex items-center justify-between gap-2 text-3xl/10 font-medium text-ash-950 lg:text-sm/7",
        className,
      )}
      {...props}
    >
      {children}
      <span
        className="inline-flex p-1.5 opacity-0 group-hover:opacity-100 lg:hidden"
        aria-hidden="true"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </span>
    </a>
  );
}

export function NavbarLogo({
  className,
  href,
  ...props
}: { href: string } & Omit<ComponentProps<"a">, "href">) {
  return (
    <a
      href={href}
      aria-label="ELLA home"
      {...props}
      className={clsx("inline-flex items-stretch", className)}
    />
  );
}

export function NavbarWithLinksActionsAndCenteredLogo({
  links,
  logo,
  actions,
  className,
  ...props
}: {
  links: ReactNode;
  logo: ReactNode;
  actions: ReactNode;
} & ComponentProps<"header">) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openMenu = useCallback(() => dialogRef.current?.showModal(), []);
  const closeMenu = useCallback(() => dialogRef.current?.close(), []);

  return (
    <header
      className={clsx("sticky top-0 z-10 bg-sandstone-50", className)}
      {...props}
    >
      <style>{`:root { --scroll-padding-top: 5.25rem }`}</style>
      <nav aria-label="Main">
        <div className="mx-auto flex h-(--scroll-padding-top) max-w-7xl items-center gap-4 px-6 lg:px-10">
          <div className="flex flex-1 gap-8 max-lg:hidden">{links}</div>
          <div className="flex items-center">{logo}</div>
          <div className="flex flex-1 items-center justify-end gap-4">
            <div className="flex shrink-0 items-center gap-5">{actions}</div>

            <button
              onClick={openMenu}
              aria-label="Open menu"
              className="text-ash-950 hover:bg-ash-950/10 inline-flex rounded-full p-1.5 lg:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3.748 8.248a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75ZM3.748 15.75a.75.75 0 0 1 .75-.751h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <dialog ref={dialogRef} className="backdrop:bg-transparent">
          <div className="bg-sandstone-50 fixed inset-0 px-6 py-6 lg:px-10">
            <div className="flex justify-end">
              <button
                onClick={closeMenu}
                aria-label="Close menu"
                className="text-ash-950 hover:bg-ash-950/10 inline-flex rounded-full p-1.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 flex flex-col gap-6">{links}</div>
          </div>
        </dialog>
      </nav>
    </header>
  );
}
