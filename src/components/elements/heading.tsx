import { clsx } from "clsx/lite";
import type { ComponentProps, ElementType } from "react";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const sizeDefaults: Record<HeadingTag, string> = {
  h1: "text-4xl font-semibold md:text-5xl",
  h2: "text-4xl font-bold",
  h3: "text-xl font-semibold md:text-2xl",
  h4: "text-lg font-semibold",
  h5: "text-base font-semibold",
  h6: "text-sm font-semibold",
};

const colorClass = {
  auto: "text-theme-text",
  dark: "text-ash-900",
  light: "text-ash-100",
  cream: "text-ash-100",
} as const;

export function Heading<T extends HeadingTag = "h2">({
  as,
  children,
  color = "auto",
  className,
  ...props
}: { as?: T; color?: keyof typeof colorClass } & Omit<
  ComponentProps<T>,
  "as"
>) {
  const tag = as ?? ("h2" as T);
  const Tag = tag as ElementType;
  return (
    <Tag
      className={clsx(
        "font-display tracking-tight",
        sizeDefaults[tag],
        colorClass[color],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
