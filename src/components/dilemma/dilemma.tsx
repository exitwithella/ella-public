"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  type Variants,
  type MotionValue,
} from "framer-motion";

// ─── Brand colors (via CSS custom properties from global stylesheet) ───
const ASH_50 = "var(--color-ash-50)";
const ASH_100 = "var(--color-ash-100)";
const ASH_200 = "var(--color-ash-200)";
const ASH_300 = "var(--color-ash-300)";
const ASH_400 = "var(--color-ash-400)";
const ASH_700 = "var(--color-ash-700)";
const ASH_900 = "var(--color-ash-900)";

const MOSS_50 = "var(--color-moss-50)";
const MOSS_400 = "var(--color-moss-400)";
const MOSS_700 = "var(--color-moss-700)";
const MOSS_800 = "var(--color-moss-800)";

const GOLDENROD = "var(--color-goldenrod)";
const GOLDENROD_50 = "var(--color-goldenrod-50)";
const GOLDENROD_100 = "var(--color-goldenrod-100)";
const GOLDENROD_700 = "var(--color-goldenrod-700)";

const CORAL = "var(--color-coral-500)";

const CREAM = "var(--color-sandstone)";

const OCEAN_50 = "var(--color-ocean-50)";
const OCEAN_400 = "var(--color-ocean-400)";
const OCEAN_600 = "var(--color-ocean-600)";
const OCEAN_700 = "var(--color-ocean-700)";

/** Mix a CSS custom property color with transparency */
function ca(color: string, opacity: number): string {
  return `color-mix(in oklch, ${color} ${Math.round(opacity * 100)}%, transparent)`;
}

// ─── Spring configs (slightly overdamped for confident, deliberate feel) ───
const SPRING_DEFAULT = { type: "spring" as const, stiffness: 250, damping: 25 };
const SPRING_SLOW = { type: "spring" as const, stiffness: 200, damping: 28 };
const SPRING_SNAPPY = { type: "spring" as const, stiffness: 300, damping: 22 };

// ─── Client data (bleed panel) ───
const CL_A = {
  name: "Marcus Chen",
  color: MOSS_700,
  frags: ["Revenue: $4.2M", "EBITDA: 18.3%", "Marcus Chen", "Tax basis: $890K"],
};
const CL_B = {
  name: "Sarah Okonkwo",
  color: OCEAN_600,
  frags: ["Revenue: $2.8M", "SDE: $620K", "Sarah Okonkwo", "LOI: $3.1M"],
};

const DRIFT_A = [
  { sx: 15, sy: 14, ex: 78, ey: 28 },
  { sx: 10, sy: 40, ex: 82, ey: 55 },
  { sx: 22, sy: 62, ex: 72, ey: 38 },
  { sx: 14, sy: 80, ex: 76, ey: 72 },
];
const DRIFT_B = [
  { sx: 85, sy: 20, ex: 22, ey: 35 },
  { sx: 90, sy: 45, ex: 18, ey: 60 },
  { sx: 78, sy: 68, ex: 28, ey: 24 },
  { sx: 86, sy: 82, ex: 24, ey: 76 },
];

// ─── Rigid steps ───
const STEPS = [
  {
    label: "Step 1: Intake Form",
    sub: "Their questions. Their order. No deviation.",
  },
  {
    label: "Step 2: Financial Upload",
    sub: "Must use their template — your format won't work.",
  },
  {
    label: "Step 3: Gap Analysis",
    sub: "Locked methodology. Skip nothing, customize nothing.",
  },
  {
    label: "Step 4: Value Driver Scoring",
    sub: "Their rubric applied to your client. Same score, different business.",
  },
  {
    label: "Step 5: Report Generation",
    sub: "90 pages. Same structure. Same jargon. Every single client.",
  },
];

// ─── Table data ───
const TABLE_ROWS = [
  {
    dim: "Client intake",
    old: "Paper forms, email",
    rigid: "Their intake form, their questions, their order",
    patch: "Paste documents into ChatGPT and hope for the best",
    ella: "Malleable templates that adapt to your process",
  },
  {
    dim: "Analysis",
    old: "Manual, memory-based",
    rigid: "Locked scoring rubric — same funnel, every client",
    patch: "Powerful summaries — with no client boundaries",
    ella: "Contextual AI within a sandboxed workspace",
  },
  {
    dim: "Deliverables",
    old: "Handwritten in Word",
    rigid: "90-page template, identical for every client",
    patch: "AI drafts that sound generic and need heavy editing",
    ella: "Documents reflecting the actual owner and business",
  },
  {
    dim: "Methodology",
    old: "Yours, but only in your head",
    rigid: "Theirs — you adapt to the software",
    patch: "Whatever you prompt, every time, from scratch",
    ella: "Yours — systematized, extensible, in the platform",
  },
  {
    dim: "Knowledge",
    old: "Walks out the door",
    rigid: "Trapped in their system, their format",
    patch: "Vanishes when the chat window closes",
    ella: "Compounds across every engagement",
  },
];

// ─── Hooks ───

function useBreakpoint() {
  const [w, setW] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { isMobile: w < 768, w };
}

// ─── Status pill text options ───
const STATUS_TEXTS = [
  "Two categories of tools. Neither designed for how advisors actually work.",
  "One locks you in. The other leaves you exposed.",
  "Same output every client. Or no consistent output at all.",
  "Rigid or improvised. Sound familiar?",
];

function getStatusIndex(progress: number): number {
  if (progress < 0.2) return 0;
  if (progress < 0.5) return 1;
  if (progress < 0.8) return 2;
  return 3;
}

function getStatusColors(progress: number) {
  if (progress < 0.3) return { color: ASH_400, bg: ASH_100 };
  if (progress < 0.7) return { color: ASH_700, bg: ASH_200 };
  return { color: GOLDENROD_700, bg: GOLDENROD_50 };
}

// ═══════════════════════════════════════════════════════════
// RAILS PANEL — "Rigid Platforms"
// ═══════════════════════════════════════════════════════════

function RailsPanel({
  vizProgress,
  compact,
}: {
  vizProgress: MotionValue<number>;
  compact: boolean;
}) {
  const visibleSteps = compact ? STEPS.slice(0, 3).concat([STEPS[4]]) : STEPS;
  const progress = useTransform(vizProgress, (v) => v);

  return (
    <div
      style={{
        background: "var(--color-sandstone-50)",
        border: `1px dashed ${ASH_300}`,
        padding: compact ? "16px 14px" : "20px 18px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: compact ? "12px" : "16px",
          paddingBottom: compact ? "10px" : "12px",
          borderBottom: `1px dashed ${ASH_200}`,
        }}
      >
        <div style={{ width: "6px", height: "6px", background: OCEAN_700 }} />
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: compact ? "0.625rem" : "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: OCEAN_700,
          }}
        >
          Legacy Platform — Fixed Workflow
        </span>
      </div>

      {/* Steps */}
      <div style={{ flex: 1 }}>
        {visibleSteps.map((step, i) => {
          const origIdx = STEPS.indexOf(step);
          return (
            <StepRow
              key={origIdx}
              step={step}
              origIdx={origIdx}
              isLast={i >= visibleSteps.length - 1}
              compact={compact}
              vizProgress={vizProgress}
            />
          );
        })}

        {/* Compact ellipsis */}
        {compact && (
          <div
            style={{
              textAlign: "center",
              color: ASH_400,
              fontSize: "0.6875rem",
              padding: "2px 0 2px 28px",
              letterSpacing: "0.2em",
            }}
          >
            • • •
          </div>
        )}
      </div>

      {/* Identical output stack — appears at progress 0.52 */}
      <OutputStack vizProgress={vizProgress} compact={compact} />
    </div>
  );
}

function StepRow({
  step,
  origIdx,
  isLast,
  compact,
  vizProgress,
}: {
  step: (typeof STEPS)[0];
  origIdx: number;
  isLast: boolean;
  compact: boolean;
  vizProgress: MotionValue<number>;
}) {
  const sp = useTransform(vizProgress, (p) =>
    Math.max(0, Math.min(1, (p - origIdx * 0.08) / 0.12)),
  );
  const locked = useTransform(sp, (v) => v >= 1);

  const borderColor = useTransform(locked, (l) => (l ? OCEAN_700 : ASH_200));
  const bgColor = useTransform(locked, (l) =>
    l ? OCEAN_700 : "var(--color-sandstone-50)",
  );
  const connectorBg = useTransform(locked, (l) => (l ? OCEAN_700 : ASH_200));
  const opacity = useTransform(sp, (v) => (v > 0 ? 1 : 0.25));
  const textColor = useTransform(locked, (l) => (l ? OCEAN_700 : ASH_700));
  const subColor = useTransform(locked, (l) => (l ? OCEAN_400 : ASH_400));
  const lockedOpacity = useTransform(locked, (l) => (l ? 1 : 0));

  return (
    <div
      style={{
        display: "flex",
        gap: compact ? "8px" : "10px",
        marginBottom: isLast ? 0 : "2px",
      }}
    >
      {/* Step indicator */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: compact ? "20px" : "24px",
          flexShrink: 0,
        }}
      >
        <motion.div
          style={{
            width: compact ? "20px" : "24px",
            height: compact ? "20px" : "24px",
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor,
            background: bgColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
          transition={SPRING_DEFAULT}
        >
          <LockedIcon locked={locked} compact={compact} origIdx={origIdx} />
        </motion.div>
        {!isLast && (
          <motion.div
            style={{
              width: "1.5px",
              flex: 1,
              minHeight: compact ? "8px" : "12px",
              background: connectorBg,
            }}
            transition={SPRING_DEFAULT}
          />
        )}
      </div>

      {/* Step text */}
      <motion.div
        style={{
          padding: compact ? "1px 0 10px" : "2px 0 14px",
          opacity,
        }}
        transition={SPRING_SLOW}
      >
        <motion.div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: compact ? "0.75rem" : "0.8125rem",
            fontWeight: 600,
            color: textColor,
          }}
          transition={SPRING_DEFAULT}
        >
          {step.label}
        </motion.div>
        <motion.div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: compact ? "0.625rem" : "0.6875rem",
            fontStyle: "italic",
            color: subColor,
            lineHeight: 1.4,
            marginTop: "2px",
          }}
          transition={SPRING_DEFAULT}
        >
          {step.sub}
        </motion.div>
      </motion.div>

      {/* LOCKED badge */}
      {!compact && (
        <motion.div
          style={{
            alignSelf: "flex-start",
            marginTop: "4px",
            fontSize: "0.5625rem",
            fontWeight: 700,
            color: OCEAN_700,
            background: OCEAN_50,
            padding: "2px 6px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            flexShrink: 0,
            opacity: lockedOpacity,
          }}
          transition={SPRING_DEFAULT}
        >
          LOCKED
        </motion.div>
      )}
    </div>
  );
}

function LockedIcon({
  locked,
  compact,
  origIdx,
}: {
  locked: MotionValue<boolean>;
  compact: boolean;
  origIdx: number;
}) {
  const scale = useTransform(locked, (l) => (l ? 1 : 0));
  const numberOpacity = useTransform(locked, (l) => (l ? 0 : 1));

  return (
    <>
      <motion.svg
        width="10"
        height="10"
        viewBox="0 0 12 12"
        fill="none"
        style={{
          scale,
          position: "absolute",
        }}
        transition={SPRING_SNAPPY}
      >
        <rect
          x="3"
          y="1"
          width="6"
          height="4"
          rx="1"
          stroke="white"
          strokeWidth="1.3"
          fill="none"
        />
        <rect x="2" y="5" width="8" height="6" rx="1.5" fill="white" />
      </motion.svg>
      <motion.span
        style={{
          fontSize: compact ? "0.5625rem" : "0.625rem",
          fontWeight: 700,
          color: ASH_400,
          opacity: numberOpacity,
        }}
        transition={SPRING_DEFAULT}
      >
        {origIdx + 1}
      </motion.span>
    </>
  );
}

function OutputStack({
  vizProgress,
  compact,
}: {
  vizProgress: MotionValue<number>;
  compact: boolean;
}) {
  const show = useTransform(vizProgress, (p) => p > 0.52);
  const opacity = useTransform(vizProgress, (p) =>
    p > 0.52 ? Math.min(1, (p - 0.52) * 4) : 0,
  );

  const stackVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        ...SPRING_DEFAULT,
        delay: i * 0.08,
      },
    }),
  };

  return (
    <motion.div
      style={{
        marginTop: compact ? "8px" : "12px",
        paddingTop: compact ? "8px" : "12px",
        borderTop: `1px solid ${ca(OCEAN_700, 0.07)}`,
        opacity,
      }}
      transition={SPRING_SLOW}
    >
      <div
        style={{
          fontSize: "0.625rem",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: OCEAN_400,
          marginBottom: "8px",
          textAlign: "center",
        }}
      >
        Output: identical every time
      </div>
      <div style={{ position: "relative", height: compact ? "48px" : "60px" }}>
        {["Client A", "Client B", "Client C"].map((n, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={stackVariants}
            initial="hidden"
            animate="visible"
            style={{
              position: "absolute",
              top: `${i * (compact ? 4 : 6)}px`,
              left: "50%",
              x: "-50%",
              width: "85%",
              background: "var(--color-sandstone-50)",
              border: `1px solid ${ca(OCEAN_700, 0.13)}`,
              padding: compact ? "4px 8px" : "6px 10px",
              zIndex: 3 - i,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: compact ? "0.5625rem" : "0.625rem",
                  fontWeight: 600,
                  color: OCEAN_700,
                }}
              >
                {n}
              </span>
              <span style={{ fontSize: "0.5625rem", color: ASH_400 }}>90 pages</span>
            </div>
            {!compact && (
              <div style={{ display: "flex", gap: "2px", marginTop: "4px" }}>
                {[55, 40, 65, 30, 50, 45].map((w, j) => (
                  <div
                    key={j}
                    style={{
                      height: "2px",
                      width: `${w}%`,
                      background: ca(OCEAN_700, 0.08),
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// BLEED PANEL — "Consumer AI"
// ═══════════════════════════════════════════════════════════

function BleedPanel({
  vizProgress,
  compact,
}: {
  vizProgress: MotionValue<number>;
  compact: boolean;
}) {
  const cardOpacity = useTransform(vizProgress, (p) =>
    Math.max(0.3, 1 - p * 0.6),
  );
  const cardBlur = useTransform(vizProgress, (p) => `blur(${p * 1}px)`);
  const integrityAlpha = useTransform(
    vizProgress,
    (p) => Math.max(0, 1 - p * 1.8) * 0.2,
  );
  const gapSize = useTransform(vizProgress, (p) => 3 + p * 16);
  const dividerBlur = useTransform(vizProgress, (p) => `blur(${p * 2}px)`);
  const warningOpacity = useTransform(vizProgress, (p) =>
    p > 0.5 ? (p - 0.5) * 0.45 : 0,
  );
  const labelOpacity = useTransform(vizProgress, (p) =>
    p > 0.6 ? Math.min(1, (p - 0.6) * 2.5) : 0,
  );

  const mkCard = (cl: typeof CL_A) => (
    <motion.div
      style={{
        flex: 1,
        opacity: cardOpacity,
        filter: cardBlur,
      }}
      transition={SPRING_SLOW}
    >
      <div
        style={{
          background: "var(--color-sandstone-50)",
          padding: compact ? "8px" : "10px",
          border: `1px solid ${ca(cl.color, 0.13)}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            marginBottom: compact ? "4px" : "6px",
            paddingBottom: compact ? "4px" : "5px",
            borderBottom: `1px solid ${ca(cl.color, 0.06)}`,
          }}
        >
          <div style={{ width: "5px", height: "5px", background: cl.color }} />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: compact ? "0.5rem" : "0.5625rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: cl.color,
            }}
          >
            {cl.name}
          </span>
        </div>
        {cl.frags.slice(0, compact ? 2 : 3).map((f, i) => (
          <div
            key={i}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: compact ? "0.5rem" : "0.5625rem",
              color: ASH_700,
              padding: "1.5px 0",
            }}
          >
            {f}
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div
      style={{
        background: "var(--color-sandstone-50)",
        border: `1px dashed ${ASH_300}`,
        padding: compact ? "14px 12px" : "16px 14px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: compact ? "10px" : "12px",
          paddingBottom: compact ? "8px" : "10px",
          borderBottom: `1px dashed ${ASH_200}`,
        }}
      >
        <div style={{ width: "6px", height: "6px", background: GOLDENROD }} />
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: compact ? "0.5625rem" : "0.625rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: GOLDENROD_700,
          }}
        >
          Consumer AI — No Guardrails
        </span>
      </div>

      <div
        style={{
          position: "relative",
          flex: 1,
          minHeight: compact ? "140px" : "180px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: compact ? "6px" : "10px",
            height: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          {mkCard(CL_A)}
          {mkCard(CL_B)}
        </div>

        {/* Divider dissolve */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "4%",
            bottom: "4%",
            width: "1.5px",
            transform: "translateX(-50%)",
            zIndex: 5,
          }}
        >
          <DividerLine
            integrityAlpha={integrityAlpha}
            gapSize={gapSize}
            blur={dividerBlur}
          />
        </div>

        {/* Drifting fragments — desktop only */}
        {!compact && (
          <>
            {CL_A.frags.map((f, i) => (
              <DriftingFragment
                key={`a${i}`}
                fragment={f}
                drift={DRIFT_A[i]}
                startOffset={0.08 + i * 0.1}
                color={CL_A.color}
                vizProgress={vizProgress}
              />
            ))}
            {CL_B.frags.map((f, i) => (
              <DriftingFragment
                key={`b${i}`}
                fragment={f}
                drift={DRIFT_B[i]}
                startOffset={0.1 + i * 0.1}
                color={CL_B.color}
                vizProgress={vizProgress}
              />
            ))}
          </>
        )}

        {/* Warning border */}
        <motion.div
          style={{
            position: "absolute",
            inset: "-2px",
            border: `1.5px solid ${CORAL}`,
            opacity: warningOpacity,
            pointerEvents: "none",
            zIndex: 20,
          }}
          transition={SPRING_SLOW}
        />
      </div>

      {/* Bottom label */}
      <motion.div
        style={{
          marginTop: compact ? "8px" : "10px",
          paddingTop: "8px",
          borderTop: `1px solid ${ca(GOLDENROD, 0.08)}`,
          textAlign: "center",
          opacity: labelOpacity,
        }}
        transition={SPRING_SLOW}
      >
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.625rem",
            fontStyle: "italic",
            color: GOLDENROD_700,
            lineHeight: 1.4,
          }}
        >
          Freedom, but no boundaries. Built for everyone — which means built for
          no one.
        </div>
      </motion.div>
    </div>
  );
}

function DividerLine({
  integrityAlpha,
  gapSize,
  blur,
}: {
  integrityAlpha: MotionValue<number>;
  gapSize: MotionValue<number>;
  blur: MotionValue<string>;
}) {
  // We need to use the raw values here due to CSS gradient complexity
  const [alpha, setAlpha] = useState(0.2);
  const [gap, setGap] = useState(3);
  const [blurVal, setBlurVal] = useState("blur(0px)");

  useEffect(() => {
    const unsubAlpha = integrityAlpha.on("change", setAlpha);
    const unsubGap = gapSize.on("change", setGap);
    const unsubBlur = blur.on("change", setBlurVal);
    return () => {
      unsubAlpha();
      unsubGap();
      unsubBlur();
    };
  }, [integrityAlpha, gapSize, blur]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `repeating-linear-gradient(to bottom, ${ca(ASH_400, alpha)} 0px, ${ca(ASH_400, alpha)} 3px, transparent 3px, transparent ${gap}px)`,
        filter: blurVal,
      }}
    />
  );
}

function DriftingFragment({
  fragment,
  drift,
  startOffset,
  color,
  vizProgress,
}: {
  fragment: string;
  drift: { sx: number; sy: number; ex: number; ey: number } | undefined;
  startOffset: number;
  color: string;
  vizProgress: MotionValue<number>;
}) {
  if (!drift) return null;

  const fp = useTransform(vizProgress, (p) =>
    Math.max(0, Math.min(1, (p - startOffset) / 0.35)),
  );
  // Ease out cubic
  const easedProgress = useTransform(fp, (v) => 1 - Math.pow(1 - v, 3));
  const left = useTransform(
    easedProgress,
    (e) => `${drift.sx + (drift.ex - drift.sx) * e}%`,
  );
  const top = useTransform(
    easedProgress,
    (e) => `${drift.sy + (drift.ey - drift.sy) * e}%`,
  );
  const opacity = useTransform(fp, (v) =>
    v === 0 ? 0 : Math.min(0.75, 0.2 + v * 0.55),
  );

  return (
    <motion.div
      style={{
        position: "absolute",
        left,
        top,
        opacity,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "0.5625rem",
          fontWeight: 500,
          color,
          background: ca(color, 0.05),
          border: `1px solid ${ca(color, 0.13)}`,
          padding: "2px 6px",
          whiteSpace: "nowrap",
        }}
      >
        {fragment}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// TABLE COMPONENTS
// ═══════════════════════════════════════════════════════════

function AnimatedCheck({
  visible,
  delay,
}: {
  visible: boolean;
  delay: number;
}) {
  return (
    <motion.span
      initial={{ scale: 0, backgroundColor: "rgba(0,0,0,0)" }}
      animate={{
        scale: visible ? 1 : 0,
        backgroundColor: visible ? ca(MOSS_400, 0.13) : "rgba(0,0,0,0)",
      }}
      transition={{
        ...SPRING_SNAPPY,
        delay: delay / 1000,
      }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "20px",
        height: "20px",
        flexShrink: 0,
        backgroundColor: "rgba(0,0,0,0)",
      }}
    >
      <motion.svg
        width="12"
        height="9"
        viewBox="0 0 13 10"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, delay: (delay + 150) / 1000 }}
      >
        <motion.path
          d="M1 5L4.5 8.5L12 1"
          stroke={MOSS_700}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="20"
          initial={{ strokeDashoffset: 20 }}
          animate={{ strokeDashoffset: visible ? 0 : 20 }}
          transition={{ duration: 0.4, delay: (delay + 80) / 1000 }}
        />
      </motion.svg>
    </motion.span>
  );
}

// Table row variants for staggered animation
const rowVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      ...SPRING_DEFAULT,
      delay: delay / 1000,
    },
  }),
};

const cellVariants: Variants = {
  hidden: { opacity: 0, x: 14 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      ...SPRING_DEFAULT,
      delay: delay / 1000,
    },
  }),
};

function TRow({
  row,
  index,
  phase,
  scanReached,
}: {
  row: (typeof TABLE_ROWS)[0];
  index: number;
  phase: number;
  scanReached: boolean;
}) {
  const rd = index * 80;
  const showOld = phase >= 1;
  const showRigid = phase >= 2;
  const showPatch = phase >= 3;
  const ellaIn = scanReached;
  const defeated = scanReached;

  const cell: React.CSSProperties = {
    padding: "16px 12px",
    display: "flex",
    alignItems: "center",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.75rem",
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr 1fr 1fr 1fr",
        borderBottom: `1px dashed ${ASH_200}`,
        minHeight: "66px",
      }}
    >
      {/* Label */}
      <motion.div
        custom={rd}
        variants={rowVariants}
        initial="hidden"
        animate={showOld ? "visible" : "hidden"}
        style={{
          ...cell,
          fontWeight: 600,
          color: ASH_900,
          fontSize: "0.8125rem",
        }}
      >
        {row.dim}
      </motion.div>

      {/* Old Way */}
      <motion.div
        custom={rd + 40}
        variants={cellVariants}
        initial="hidden"
        animate={showOld ? "visible" : "hidden"}
        style={{
          ...cell,
          fontStyle: "italic",
          color: ASH_400,
          background: ca(ASH_100, 0.25),
          opacity: defeated ? 0.35 : 1,
          textDecorationLine: defeated ? "line-through" : "none",
          textDecorationColor: defeated ? ca(ASH_200, 0.5) : undefined,
        }}
        transition={SPRING_DEFAULT}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <span style={{ color: ASH_200, fontSize: "0.75rem", fontWeight: 700 }}>
            ✕
          </span>
          {row.old}
        </span>
      </motion.div>

      {/* Rigid */}
      <motion.div
        custom={rd + 40}
        variants={cellVariants}
        initial="hidden"
        animate={showRigid ? "visible" : "hidden"}
        style={{
          ...cell,
          color: OCEAN_700,
          background: OCEAN_50,
          opacity: defeated ? 0.4 : 1,
          textDecorationLine: defeated ? "line-through" : "none",
          textDecorationColor: defeated ? ca(OCEAN_400, 0.5) : undefined,
          borderLeft:
            showRigid && !defeated
              ? `2px solid ${ca(OCEAN_700, 0.21)}`
              : "2px solid rgba(0,0,0,0)",
        }}
        transition={SPRING_DEFAULT}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            style={{ flexShrink: 0 }}
          >
            <rect
              x="3"
              y="1"
              width="6"
              height="4"
              rx="1"
              stroke={defeated ? OCEAN_400 : OCEAN_700}
              strokeWidth="1.2"
              fill="none"
            />
            <rect
              x="2"
              y="5"
              width="8"
              height="6"
              rx="1.5"
              fill={defeated ? OCEAN_400 : OCEAN_700}
              fillOpacity="0.5"
            />
          </svg>
          {row.rigid}
        </span>
      </motion.div>

      {/* Consumer AI */}
      <motion.div
        custom={rd + 40}
        variants={cellVariants}
        initial="hidden"
        animate={showPatch ? "visible" : "hidden"}
        style={{
          ...cell,
          color: GOLDENROD_700,
          background: ca(GOLDENROD_100, 0.31),
          opacity: defeated ? 0.4 : 1,
          textDecorationLine: defeated ? "line-through" : "none",
          textDecorationColor: defeated ? ca(GOLDENROD, 0.31) : undefined,
          borderLeft:
            showPatch && !defeated
              ? `2px solid ${ca(GOLDENROD, 0.27)}`
              : "2px solid rgba(0,0,0,0)",
        }}
        transition={SPRING_DEFAULT}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          {row.patch}
        </span>
      </motion.div>

      {/* ELLA */}
      <motion.div
        initial={{ opacity: 0, x: 22 }}
        animate={{
          opacity: ellaIn ? 1 : 0,
          x: ellaIn ? 0 : 22,
        }}
        transition={{
          ...SPRING_DEFAULT,
          delay: (rd * 0.4) / 1000,
        }}
        style={{
          ...cell,
          fontWeight: 500,
          color: MOSS_700,
          background: MOSS_50,
          position: "relative",
          overflow: "hidden",
          borderLeft: ellaIn
            ? `3px solid ${MOSS_400}`
            : "3px solid rgba(0,0,0,0)",
        }}
      >
        <AnimatePresence>
          {ellaIn && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0.6 }}
              animate={{ scaleX: 1, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: (rd * 0.4) / 1000,
              }}
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(90deg, ${ca(MOSS_400, 0.15)}, transparent)`,
                transformOrigin: "left",
                pointerEvents: "none",
              }}
            />
          )}
        </AnimatePresence>
        <span
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <AnimatedCheck visible={ellaIn} delay={rd * 0.4 + 100} />
          {row.ella}
        </span>
      </motion.div>
    </div>
  );
}

// ─── Mobile table card ───

function MobileTableCard({
  row,
  index,
  phase,
  scanReached,
}: {
  row: (typeof TABLE_ROWS)[0];
  index: number;
  phase: number;
  scanReached: boolean;
}) {
  const showOld = phase >= 1;
  const showRigid = phase >= 2;
  const showPatch = phase >= 3;
  const ellaIn = scanReached;
  const defeated = scanReached;
  const rd = index * 120;

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...SPRING_DEFAULT,
        delay: rd / 1000,
      },
    },
  };

  const optionVariants: Variants = {
    hidden: { opacity: 0, y: 8 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        ...SPRING_DEFAULT,
        delay: delay / 1000,
      },
    }),
  };

  const optionStyle = (
    bg: string,
    color: string,
    borderColor: string,
    isDefeated: boolean,
  ): React.CSSProperties => ({
    padding: "10px 12px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.8125rem",
    lineHeight: 1.4,
    color,
    background: bg,
    borderLeft: `3px solid ${borderColor}`,
    opacity: isDefeated ? 0.4 : 1,
    textDecorationLine: isDefeated ? "line-through" : "none",
    textDecorationColor: isDefeated ? ca(borderColor, 0.38) : undefined,
  });

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={phase >= 1 ? "visible" : "hidden"}
      style={{
        background: "var(--color-sandstone-50)",
        border: `1px dashed ${ASH_300}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "14px 16px 10px",
          borderBottom: `1px dashed ${ASH_200}`,
        }}
      >
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.6875rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: ASH_700,
          }}
        >
          {row.dim}
        </div>
      </div>

      <div
        style={{
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <motion.div
          custom={rd + 40}
          variants={optionVariants}
          initial="hidden"
          animate={showOld ? "visible" : "hidden"}
          style={optionStyle(ca(ASH_100, 0.25), ASH_400, ASH_200, defeated)}
        >
          <div
            style={{
              fontSize: "0.5625rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: ASH_400,
              marginBottom: "4px",
            }}
          >
            The Old Way
          </div>
          <div style={{ fontStyle: "italic" }}>{row.old}</div>
        </motion.div>

        <motion.div
          custom={rd + 40}
          variants={optionVariants}
          initial="hidden"
          animate={showRigid ? "visible" : "hidden"}
          style={optionStyle(OCEAN_50, OCEAN_700, OCEAN_700, defeated)}
        >
          <div
            style={{
              fontSize: "0.5625rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: OCEAN_400,
              marginBottom: "4px",
            }}
          >
            Rigid Platform
          </div>
          <div>{row.rigid}</div>
        </motion.div>

        <motion.div
          custom={rd + 40}
          variants={optionVariants}
          initial="hidden"
          animate={showPatch ? "visible" : "hidden"}
          style={optionStyle(
            ca(GOLDENROD_100, 0.38),
            GOLDENROD_700,
            GOLDENROD,
            defeated,
          )}
        >
          <div
            style={{
              fontSize: "0.5625rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: GOLDENROD_700,
              marginBottom: "4px",
            }}
          >
            Consumer AI
          </div>
          <div>{row.patch}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: ellaIn ? 1 : 0,
            y: ellaIn ? 0 : 10,
          }}
          transition={{
            ...SPRING_DEFAULT,
            delay: (rd * 0.5) / 1000,
          }}
          style={{
            padding: "12px 12px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.8125rem",
            fontWeight: 500,
            lineHeight: 1.4,
            color: MOSS_700,
            background: MOSS_50,
            borderLeft: `3px solid ${ellaIn ? MOSS_400 : "rgba(0,0,0,0)"}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <AnimatePresence>
            {ellaIn && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0.6 }}
                animate={{ scaleX: 1, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(90deg, ${ca(MOSS_400, 0.13)}, transparent)`,
                  transformOrigin: "left",
                  pointerEvents: "none",
                }}
              />
            )}
          </AnimatePresence>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                fontSize: "0.5625rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: MOSS_700,
                marginBottom: "4px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <AnimatedCheck visible={ellaIn} delay={rd * 0.4 + 100} />
              With ELLA
            </div>
            <div>{row.ella}</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════

export interface DilemmaSectionProps {
  label?: string;
  heading?: string;
  headingAccent?: string;
  body?: string;
  transitionLine1?: string;
  transitionLine2?: string;
  tableData?: Array<{
    dim: string;
    old: string;
    rigid: string;
    patch: string;
    ella: string;
  }>;
  steps?: Array<{ label: string; sub: string }>;
}

export default function DilemmaSection(props: DilemmaSectionProps = {}) {
  const resolvedTableRows = props.tableData ?? TABLE_ROWS;
  const resolvedSteps = props.steps ?? STEPS;
  const { isMobile } = useBreakpoint();
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const [tablePhase, setTablePhase] = useState(0);
  const [scanReached, setScanReached] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const timers = useRef<NodeJS.Timeout[]>([]);
  const seqStarted = useRef(false);

  // Motion scroll progress — track element position in viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Viz completes within the scroll runway (~200-250vh of total section height)
  const vizEnd = isMobile ? 0.4 : 0.45;
  const vizProgress = useTransform(scrollYProgress, [0, vizEnd], [0, 1]);

  // For status pill and transition copy (need raw value)
  const [vizProgressValue, setVizProgressValue] = useState(0);
  useEffect(() => {
    return vizProgress.on("change", setVizProgressValue);
  }, [vizProgress]);

  const allLocked = scanReached.every(Boolean);

  useEffect(() => {
    if (!tableRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !seqStarted.current) {
          seqStarted.current = true;
          setTablePhase(1);
          timers.current.push(setTimeout(() => setTablePhase(2), 300));
          timers.current.push(setTimeout(() => setTablePhase(3), 600));
          timers.current.push(
            setTimeout(() => {
              setTablePhase(4);
              resolvedTableRows.forEach((_, i) => {
                timers.current.push(
                  setTimeout(
                    () => {
                      setScanReached((prev) => {
                        const n = [...prev];
                        n[i] = true;
                        return n;
                      });
                    },
                    i * (isMobile ? 200 : 100),
                  ),
                );
              });
            }, 1000),
          );
        }
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.08 },
    );
    obs.observe(tableRef.current);
    return () => {
      obs.disconnect();
      timers.current.forEach(clearTimeout);
    };
  }, [isMobile]);

  // Transition copy in-view trigger
  const transitionRef = useRef<HTMLDivElement>(null);
  const transitionInView = useInView(transitionRef, {
    once: true,
    margin: "-10%",
  });

  const statusIndex = getStatusIndex(vizProgressValue);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          paddingTop: isMobile ? "48px" : "80px",
          paddingBottom: isMobile ? "80px" : "120px",
        }}
      >
        {/* ─── SCROLL RUNWAY: pins header + caption + viz while scroll drives animations ─── */}
        <div style={{ minHeight: isMobile ? "140vh" : "175vh" }}>
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              paddingTop: isMobile ? "16px" : "24px",
              paddingBottom: isMobile ? "24px" : "32px",
            }}
          >
            {/* ─── HEADER ─── */}
            <div
              style={{
                textAlign: "center",
                maxWidth: "680px",
                margin: "0 auto 48px",
                padding: isMobile ? "0 20px" : "0 32px",
              }}
            >
              <div
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: ASH_400,
                  marginBottom: "16px",
                }}
              >
                {props.label ?? "The Advisor\u2019s Dilemma"}
              </div>
              <h2
                className="text-4xl font-serif font-normal text-theme-text mb-4"
              >
                {props.heading ?? "Rigid or improvised."}
                <br />
                <span className="text-theme-text-muted">
                  {props.headingAccent ?? "Those aren\u2019t the only options."}
                </span>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: isMobile ? "0.9375rem" : "1.0625rem",
                  color: ASH_700,
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {props.body ??
                  "Rigid platforms were built for advisors but don\u2019t respect your methodology. Consumer AI tools are powerful but weren\u2019t built for client work. Advisors shouldn\u2019t have to choose."}
              </p>
            </div>

            {/* ─── STICKY CAPTION ─── */}
            <div
              style={{
                position: "sticky",
                top: isMobile ? "12px" : "20px",
                zIndex: 20,
                textAlign: "center",
                padding: isMobile ? "0 20px" : "0 32px",
                marginBottom: isMobile ? "24px" : "32px",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  background: ca(CREAM, 0.93),
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  padding: isMobile ? "10px 20px" : "12px 28px",
                  borderRadius: "2px",
                  border: `1px solid ${ca(ASH_200, 0.5)}`,
                  minHeight: isMobile ? "40px" : "44px",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.p
                    key={statusIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    style={{
                      fontFamily: "'DM Serif Display', Georgia, serif",
                      fontSize: isMobile ? "0.9375rem" : "1.125rem",
                      color: ASH_700,
                      lineHeight: 1.4,
                      margin: 0,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {STATUS_TEXTS[statusIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* ─── VISUALIZATION ─── */}
            <div
              style={{
                maxWidth: isMobile ? "100%" : "820px",
                margin: "0 auto",
                padding: isMobile ? "0 16px" : "0 24px",
              }}
            >
              {isMobile ? (
                /* ═══ MOBILE: Stacked ═══ */
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        top: "-12px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: "0.625rem",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: OCEAN_700,
                        background: OCEAN_50,
                        padding: "4px 12px",
                        zIndex: 10,
                        whiteSpace: "nowrap",
                        border: `1px solid ${ca(OCEAN_700, 0.15)}`,
                      }}
                    >
                      Rigid Platforms
                    </div>
                    <RailsPanel vizProgress={vizProgress} compact={true} />
                  </div>

                  <div
                    style={{
                      textAlign: "center",
                      padding: "4px 0",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      color: ASH_400,
                      letterSpacing: "0.06em",
                    }}
                  >
                    — or —
                  </div>

                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        top: "-12px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: "0.625rem",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: GOLDENROD_700,
                        background: GOLDENROD_100,
                        padding: "4px 12px",
                        zIndex: 10,
                        whiteSpace: "nowrap",
                        border: `1px solid ${ca(GOLDENROD, 0.15)}`,
                      }}
                    >
                      Consumer AI
                    </div>
                    <BleedPanel vizProgress={vizProgress} compact={true} />
                  </div>
                </div>
              ) : (
                /* ═══ DESKTOP: Side-by-side ═══ */
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    minHeight: "440px",
                    alignItems: "stretch",
                  }}
                >
                  <div style={{ flex: "0 0 58%", position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        top: "-12px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: "0.625rem",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: OCEAN_700,
                        background: OCEAN_50,
                        padding: "4px 12px",
                        zIndex: 10,
                        whiteSpace: "nowrap",
                        border: `1px solid ${ca(OCEAN_700, 0.15)}`,
                      }}
                    >
                      Rigid Platforms
                    </div>
                    <RailsPanel vizProgress={vizProgress} compact={false} />
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: "20px 0",
                    }}
                  >
                    <div
                      style={{
                        width: "1px",
                        flex: 1,
                        background: ca(ASH_200, 0.38),
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.6875rem",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        padding: "6px 0",
                        color: ASH_400,
                      }}
                    >
                      OR
                    </span>
                    <div
                      style={{
                        width: "1px",
                        flex: 1,
                        background: ca(ASH_200, 0.38),
                      }}
                    />
                  </div>

                  <div style={{ flex: "0 0 38%", position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        top: "-12px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: "0.625rem",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: GOLDENROD_700,
                        background: GOLDENROD_100,
                        padding: "4px 12px",
                        zIndex: 10,
                        whiteSpace: "nowrap",
                        border: `1px solid ${ca(GOLDENROD, 0.15)}`,
                      }}
                    >
                      Consumer AI
                    </div>
                    <BleedPanel vizProgress={vizProgress} compact={false} />
                  </div>
                </div>
              )}

              {/* Status caption (sticky version rendered above viz) */}
            </div>
          </div>
          {/* end sticky frame */}
        </div>
        {/* end scroll runway */}

        {/* ─── TRANSITION COPY ─── */}
        <motion.div
          ref={transitionRef}
          initial={{ opacity: 0, y: 12 }}
          animate={
            vizProgressValue > 0.7
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 12 }
          }
          transition={SPRING_SLOW}
          style={{
            textAlign: "center",
            padding: isMobile ? "40px 20px 44px" : "52px 32px 56px",
          }}
        >
          <p
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: isMobile ? "1.125rem" : "clamp(1.125rem, 2.2vw, 1.5rem)",
              color: ASH_900,
              lineHeight: 1.4,
              margin: "0 0 6px",
            }}
          >
            {props.transitionLine1 ??
              "What if your tools were built for advisory work \u2014"}
          </p>
          <p
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: isMobile ? "1.125rem" : "clamp(1.125rem, 2.2vw, 1.5rem)",
              color: MOSS_700,
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {props.transitionLine2 ??
              "and adapted to your methodology, not the other way around?"}
          </p>
        </motion.div>

        {/* ═══ TABLE ═══ */}
        <div
          ref={tableRef}
          style={{
            maxWidth: "1080px",
            margin: "0 auto",
            padding: isMobile ? "0 16px" : "0 20px",
          }}
        >
          {isMobile ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {resolvedTableRows.map((row, i) => (
                <MobileTableCard
                  key={i}
                  row={row}
                  index={i}
                  phase={tablePhase}
                  scanReached={scanReached[i]}
                />
              ))}
            </div>
          ) : (
            <div
              style={{
                background: "var(--color-sandstone-50)",
                border: `1px dashed ${ASH_300}`,
                overflow: "hidden",
              }}
            >
              {/* Table header */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr 1fr 1fr 1fr",
                  borderBottom: `1px dashed ${ASH_300}`,
                }}
              >
                <div style={{ padding: "18px 12px" }} />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: tablePhase >= 1 ? 1 : 0 }}
                  transition={SPRING_DEFAULT}
                  style={{
                    padding: "18px 12px",
                    background: ca(ASH_100, 0.25),
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.625rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: ASH_400,
                      marginBottom: "3px",
                    }}
                  >
                    The Old Way
                  </div>
                  <div
                    style={{
                      fontSize: "0.6875rem",
                      color: ASH_400,
                      fontStyle: "italic",
                    }}
                  >
                    Manual, memory-based
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: tablePhase >= 2 ? 1 : 0 }}
                  transition={{ ...SPRING_DEFAULT, delay: 0.06 }}
                  style={{
                    padding: "18px 12px",
                    background: OCEAN_50,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.625rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: OCEAN_700,
                      marginBottom: "3px",
                    }}
                  >
                    The Rigid Platform
                  </div>
                  <div
                    style={{
                      fontSize: "0.6875rem",
                      color: OCEAN_400,
                      fontStyle: "italic",
                    }}
                  >
                    Their process, not yours
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: tablePhase >= 3 ? 1 : 0 }}
                  transition={{ ...SPRING_DEFAULT, delay: 0.06 }}
                  style={{
                    padding: "18px 12px",
                    background: ca(GOLDENROD_100, 0.38),
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.625rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: GOLDENROD_700,
                      marginBottom: "3px",
                    }}
                  >
                    Consumer AI
                  </div>
                  <div
                    style={{
                      fontSize: "0.6875rem",
                      color: GOLDENROD_700,
                      fontStyle: "italic",
                    }}
                  >
                    Powerful, unprotected
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: tablePhase >= 4 ? 1 : 0 }}
                  transition={SPRING_DEFAULT}
                  style={{
                    padding: "18px 12px",
                    background: MOSS_50,
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    borderLeft:
                      tablePhase >= 4
                        ? `3px solid ${MOSS_400}`
                        : "3px solid rgba(0,0,0,0)",
                  }}
                >
                  <AnimatePresence>
                    {tablePhase >= 4 && (
                      <motion.div
                        initial={{ scaleX: 0, opacity: 0.5 }}
                        animate={{ scaleX: 1, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: `linear-gradient(90deg, ${ca(MOSS_400, 0.15)}, transparent)`,
                          transformOrigin: "left",
                          pointerEvents: "none",
                        }}
                      />
                    )}
                  </AnimatePresence>
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div
                      style={{
                        fontSize: "0.625rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: MOSS_700,
                        marginBottom: "3px",
                      }}
                    >
                      With ELLA
                    </div>
                    <div
                      style={{
                        fontSize: "0.6875rem",
                        color: MOSS_700,
                        fontStyle: "italic",
                      }}
                    >
                      Your methodology, systematized
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Table rows */}
              {resolvedTableRows.map((row, i) => (
                <TRow
                  key={i}
                  row={row}
                  index={i}
                  phase={tablePhase}
                  scanReached={scanReached[i]}
                />
              ))}
            </div>
          )}

          {/* Closer */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{
              opacity: allLocked ? 1 : 0,
              y: allLocked ? 0 : 14,
            }}
            transition={{ ...SPRING_SLOW, delay: 0.3 }}
            style={{
              textAlign: "center",
              padding: isMobile ? "36px 0 0" : "48px 0 0",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: isMobile ? "1.375rem" : "clamp(1.25rem, 2.5vw, 1.75rem)",
                color: ASH_900,
                lineHeight: 1.3,
                margin: 0,
              }}
            >
              Hours to the first real conversation. Not weeks.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
