import { clsx } from "clsx/lite";
import type { ComponentProps } from "react";

const sizes = {
  lg: "px-4 py-2",
  md: "px-3 py-1",
};

type ButtonColor = "auto" | "dark/light" | "light";

export function Button({
  size = "md",
  type = "button",
  color = "auto",
  className,
  ...props
}: {
  size?: keyof typeof sizes;
  color?: ButtonColor;
} & ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex shrink-0 items-center justify-center gap-1 rounded-full text-sm/7 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent",
        color === "auto" &&
          "bg-theme-text text-theme-bg hover:opacity-90",
        color === "dark/light" &&
          "bg-ash-950 text-ash-100 hover:bg-ash-800",
        color === "light" &&
          "bg-sandstone-50 text-ash-950 hover:bg-ash-100",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function ButtonLink({
  size = "md",
  color = "auto",
  className,
  href,
  ...props
}: {
  href: string;
  size?: keyof typeof sizes;
  color?: ButtonColor;
} & Omit<ComponentProps<"a">, "href">) {
  return (
    <a
      href={href}
      className={clsx(
        "inline-flex shrink-0 items-center justify-center gap-1 rounded-full text-sm/7 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent",
        color === "auto" &&
          "bg-theme-text text-theme-bg hover:opacity-90",
        color === "dark/light" &&
          "bg-ash-950 text-ash-100 hover:bg-ash-800",
        color === "light" &&
          "bg-sandstone-50 text-ash-950 hover:bg-ash-100",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function SoftButton({
  size = "md",
  type = "button",
  className,
  ...props
}: {
  size?: keyof typeof sizes;
} & ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-theme-text/10 text-sm/7 font-medium text-theme-text hover:bg-theme-text/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function SoftButtonLink({
  size = "md",
  href,
  className,
  ...props
}: {
  href: string;
  size?: keyof typeof sizes;
} & Omit<ComponentProps<"a">, "href">) {
  return (
    <a
      href={href}
      className={clsx(
        "inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-theme-text/10 text-sm/7 font-medium text-theme-text hover:bg-theme-text/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function PlainButton({
  size = "md",
  color = "auto",
  type = "button",
  className,
  ...props
}: {
  size?: keyof typeof sizes;
  color?: ButtonColor;
} & ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm/7 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent",
        color === "auto" && "text-theme-text hover:bg-theme-text/10",
        color === "dark/light" && "text-ash-950 hover:bg-ash-950/10",
        color === "light" && "text-ash-100 hover:bg-sandstone-50/15",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function PlainButtonLink({
  size = "md",
  color = "auto",
  href,
  className,
  ...props
}: {
  href: string;
  size?: keyof typeof sizes;
  color?: ButtonColor;
} & Omit<ComponentProps<"a">, "href">) {
  return (
    <a
      href={href}
      className={clsx(
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm/7 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent",
        color === "auto" && "text-theme-text hover:bg-theme-text/10",
        color === "dark/light" && "text-ash-950 hover:bg-ash-950/10",
        color === "light" && "text-ash-100 hover:bg-sandstone-50/15",
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
