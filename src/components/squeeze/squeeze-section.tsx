"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "motion/react";
import { useRef, useState, useCallback } from "react";

import { PressureWalls } from "./pressure-walls";
import { SqueezeContent, type SqueezeQuote } from "./squeeze-content";
import { TensionThreads } from "./tension-threads";

export interface SqueezeSectionProps {
  label?: string | null;
  heading: string;
  quotes: SqueezeQuote[];
  closer?: string | null;
  pressureItems: string[];
  erosionItems: string[];
  bodyParagraphs: string[];
}

function SectionHeader({
  label,
  heading,
}: {
  label?: string | null;
  heading: string;
}) {
  return (
    <div className="relative z-20 mb-20 text-center md:mb-28">
      {label && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <span className="text-goldenrod-600 text-xs tracking-[0.3em] uppercase md:text-sm">
            {label}
          </span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        viewport={{ once: true }}
        className="text-foreground font-serif text-4xl leading-[1.1] text-balance md:text-6xl lg:text-7xl"
      >
        {heading}
      </motion.h2>
    </div>
  );
}

export function SqueezeSection({
  label,
  heading,
  bodyParagraphs,
  quotes,
  closer,
  pressureItems,
  erosionItems,
}: SqueezeSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [squeezeValue, setSqueezeValue] = useState(0);
  const [step, setStep] = useState(0);

  const totalSteps = bodyParagraphs.length + quotes.length + (closer ? 1 : 0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const squeezeRaw = useTransform(scrollYProgress, [0.0, 0.55], [0, 1]);
  const squeeze = useSpring(squeezeRaw, { stiffness: 60, damping: 25 });

  useMotionValueEvent(squeeze, "change", (latest) => {
    setSqueezeValue(latest);
  });

  const handleStepChange = useCallback((newStep: number) => {
    setStep(newStep);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-32 md:pt-48"
    >
      <div className="sticky top-0 flex min-h-screen flex-col justify-center py-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 90% 80% at center, rgba(245, 240, 232, ${1 - squeezeValue * 0.1}) 0%, rgba(${Math.round(240 - squeezeValue * 15)}, ${Math.round(235 - squeezeValue * 18)}, ${Math.round(220 - squeezeValue * 22)}, 1) 85%)`,
          }}
        />

        <TensionThreads squeeze={squeezeValue} />

        <PressureWalls
          step={step}
          totalSteps={totalSteps}
          scrollYProgress={scrollYProgress}
          pressureItems={pressureItems}
          erosionItems={erosionItems}
        />

        <SectionHeader label={label} heading={heading} />
        <SqueezeContent
          step={step}
          onStepChange={handleStepChange}
          bodyParagraphs={bodyParagraphs}
          quotes={quotes}
          closer={closer}
          pressureItems={pressureItems}
          erosionItems={erosionItems}
        />
      </div>
    </section>
  );
}
