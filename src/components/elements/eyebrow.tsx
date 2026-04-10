import { clsx } from "clsx/lite";
import type { ComponentProps } from "react";

const colorClass = {
  auto: "text-theme-accent",
  moss: "text-moss-600",
  ash: "text-ash-1000",
  light: "text-ash-100",
  "ash-dark": "text-ash-700",
} as const;

const sizeClass = {
  xs: "text-xs",
  sm: "text-sm",
} as const;

export function Eyebrow({
  children,
  color = "auto",
  size = "xs",
  className,
  ...props
}: {
  color?: keyof typeof colorClass;
  size?: keyof typeof sizeClass;
} & ComponentProps<"p">) {
  return (
    <p
      className={clsx(
        "font-semibold tracking-widest uppercase",
        sizeClass[size],
        colorClass[color],
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
