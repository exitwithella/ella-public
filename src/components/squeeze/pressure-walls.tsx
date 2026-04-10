"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  type MotionValue,
} from "motion/react";
import { useEffect } from "react";

export const defaultPressureItems = [
  "More clients",
  "Deeper engagements",
  "Shorter timelines",
  "Higher stakes",
  "Regulatory scrutiny",
  "Key-person risk",
];

export const defaultErosionItems = [
  "Owners Googling valuations",
  "ChatGPT drafting exit plans",
  "AI leveling the field",
  "Clients questioning fees",
  "Information parity",
  "Commoditized insights",
];

export function PressureWalls({
  step,
  totalSteps,
  scrollYProgress,
  pressureItems = defaultPressureItems,
  erosionItems = defaultErosionItems,
}: {
  step: number;
  totalSteps: number;
  scrollYProgress: MotionValue<number>;
  pressureItems?: string[];
  erosionItems?: string[];
}) {
  const leftItems = pressureItems;
  const rightItems = erosionItems;
  const stepVal = useMotionValue(step);
  // Bouncy spring for the step-based squeeze
  const springVal = useSpring(stepVal, {
    stiffness: 120,
    damping: 14,
    mass: 0.8,
  });

  useEffect(() => {
    stepVal.set(step);
  }, [step, stepVal]);

  // Walls close in based on steps (0-7 content blocks)
  // Using percentage-only values for proper animation interpolation
  // On narrow screens, 22% is safer; on wider screens we can go to 28%
  const leftWall = useTransform(springVal, [0, 7], ["0%", "22%"]);
  const rightWall = useTransform(springVal, [0, 7], ["0%", "22%"]);

  // Solid opacity — walls need to be readable
  const wallOpacity = useTransform(
    springVal,
    [0, 1, 4, 7],
    [0, 0.85, 0.92, 0.98],
  );

  // Edge glow
  const glowOpacity = useTransform(springVal, [0, 2, 7], [0, 0.3, 0.7]);

  // Label opacity — visible only while section is on screen and steps are progressing
  const stepOpacity = useTransform(
    springVal,
    [0, 0.5, 2, totalSteps - 0.5, totalSteps],
    [0, 0, 1, 1, 0],
  );
  // Hide labels when section is outside viewport (scroll progress < 0.1 or > 0.9)
  const sectionVisible = useTransform(
    scrollYProgress,
    [0, 0.1, 0.7, 0.8],
    [0, 1, 1, 0],
  );
  const labelOpacity = useTransform(
    () => stepOpacity.get() * sectionVisible.get(),
  );

  return (
    <>
      {/* Left pressure wall — light ash, hidden on mobile */}
      <motion.div
        className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 hidden md:block"
        style={{
          width: leftWall,
          opacity: wallOpacity,
          background:
            "linear-gradient(to right, rgba(232, 224, 210, 1) 0%, rgba(240, 234, 222, 0.97) 70%, rgba(246, 242, 234, 0.85) 100%)",
        }}
      />

      {/* Left labels — fixed to viewport center, fades in as wall expands, hidden on mobile */}
      <motion.div
        className="pointer-events-none fixed top-1/2 left-6 z-20 hidden -translate-y-1/2 flex-col items-start gap-2 md:flex"
        style={{
          opacity: labelOpacity,
        }}
      >
        <span className="text-ash-600 mb-1 font-mono text-[0.5625rem] font-semibold tracking-[0.12em] uppercase md:text-[0.625rem]">
          Growing Pressure
        </span>
        {leftItems.map((item, i) => (
          <motion.span
            key={item}
            className="text-ash-600 flex items-center gap-1 text-[0.625rem] font-medium whitespace-nowrap md:text-xs"
            style={{
              opacity: getItemOpacity(step, i, leftItems.length),
            }}
          >
            <span className="text-ash-400 text-[0.5rem] md:text-[0.625rem]">
              {"\u2192"}
            </span>
            <span className="hidden sm:inline">{item}</span>
            <span className="sm:hidden">{item.split(" ")[0]}</span>
            <span className="text-ash-400 text-[0.5rem] md:text-[0.625rem]">
              {"\u2192"}
            </span>
          </motion.span>
        ))}
      </motion.div>

      {/* Left glow edge — goldenrod, hidden on mobile */}
      <motion.div
        className="pointer-events-none absolute top-0 bottom-0 z-10 hidden md:block"
        style={{
          left: leftWall,
          width: "3px",
          opacity: glowOpacity,
          background: "oklch(0.72 0.015 65)",
          boxShadow:
            "0 0 16px 4px oklch(0.72 0.015 65 / 0.15), 0 0 40px 12px oklch(0.72 0.015 65 / 0.06)",
        }}
      />

      {/* Right pressure wall — light ash, hidden on mobile */}
      <motion.div
        className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 hidden md:block"
        style={{
          width: rightWall,
          opacity: wallOpacity,
          background:
            "linear-gradient(to left, rgba(232, 224, 210, 1) 0%, rgba(240, 234, 222, 0.97) 70%, rgba(246, 242, 234, 0.85) 100%)",
        }}
      />

      {/* Right labels — fixed to viewport center, fades in as wall expands, hidden on mobile */}
      <motion.div
        className="pointer-events-none fixed top-1/2 right-6 z-20 hidden -translate-y-1/2 flex-col items-end gap-2 md:flex"
        style={{
          opacity: labelOpacity,
        }}
      >
        <span className="text-ash-600 mb-1 font-mono text-[0.5625rem] font-semibold tracking-[0.12em] uppercase md:text-[0.625rem]">
          Eroding Advantage
        </span>
        {rightItems.map((item, i) => (
          <motion.span
            key={item}
            className="text-ash-600 flex items-center gap-1 text-[0.625rem] font-medium whitespace-nowrap md:text-xs"
            style={{
              opacity: getItemOpacity(step, i, rightItems.length),
            }}
          >
            <span className="text-ash-400 text-[0.5rem] md:text-[0.625rem]">
              {"\u2190"}
            </span>
            <span className="hidden sm:inline">{item}</span>
            <span className="sm:hidden">{item.split(" ")[0]}</span>
          </motion.span>
        ))}
      </motion.div>

      {/* Right glow edge — goldenrod, hidden on mobile */}
      <motion.div
        className="pointer-events-none absolute top-0 bottom-0 z-10 hidden md:block"
        style={{
          right: rightWall,
          width: "3px",
          opacity: glowOpacity,
          background: "oklch(0.72 0.015 65)",
          boxShadow:
            "0 0 16px 4px oklch(0.72 0.015 65 / 0.15), 0 0 40px 12px oklch(0.72 0.015 65 / 0.06)",
        }}
      />
    </>
  );
}

/** Stagger each item's appearance based on step progress */
function getItemOpacity(step: number, index: number, total: number): number {
  // Each item appears at a certain step threshold
  const threshold = 0.8 + index * 0.7;
  if (step < threshold) return 0;
  if (step > threshold + 0.7) return 1;
  return (step - threshold) / 1;
}
