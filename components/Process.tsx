"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { onSplashDone } from "@/lib/splashSignal";

// ─── Brand Colors ─────────────────────────────────────────────────────────────
const BRAND_PURPLE = "#8364fc";
const COLOR_BLACK = "#000000";

// ─── Typewriter Heading Constants & Logic ──────────────────────────────────────
interface CharData {
  id: number;
  char: string;
  color: string;
  pauseAfter?: number;
}

interface WordData {
  chars: CharData[];
}

function createHeadingData() {
  let currentId = 0;
  const flatItems: CharData[] = [];

  function makeWord(
    specs: Array<{ text: string; color: string; pauseAfterLast?: number }>
  ): WordData {
    const chars: CharData[] = [];
    for (const spec of specs) {
      for (let i = 0; i < spec.text.length; i++) {
        const isLast = i === spec.text.length - 1;
        const item: CharData = {
          id: currentId++,
          char: spec.text[i],
          color: spec.color,
          pauseAfter: isLast ? spec.pauseAfterLast : undefined,
        };
        chars.push(item);
        flatItems.push(item);
      }
    }
    return { chars };
  }

  function makeSpace(color: string): CharData {
    const item: CharData = { id: currentId++, char: " ", color };
    flatItems.push(item);
    return item;
  }

  // Line 1: "The spacing, the hover state, the empty state."
  const line1: Array<{ word: WordData; trailingSpace?: CharData }> = [
    { word: makeWord([{ text: "The", color: COLOR_BLACK }]), trailingSpace: makeSpace(COLOR_BLACK) },
    { word: makeWord([{ text: "spacing,", color: COLOR_BLACK }]), trailingSpace: makeSpace(COLOR_BLACK) },
    { word: makeWord([{ text: "the", color: BRAND_PURPLE }]), trailingSpace: makeSpace(BRAND_PURPLE) },
    { word: makeWord([{ text: "hover", color: BRAND_PURPLE }]), trailingSpace: makeSpace(BRAND_PURPLE) },
    { word: makeWord([{ text: "state", color: BRAND_PURPLE }, { text: ",", color: COLOR_BLACK }]), trailingSpace: makeSpace(COLOR_BLACK) },
    { word: makeWord([{ text: "the", color: COLOR_BLACK }]), trailingSpace: makeSpace(COLOR_BLACK) },
    { word: makeWord([{ text: "empty", color: COLOR_BLACK }]), trailingSpace: makeSpace(COLOR_BLACK) },
    { word: makeWord([{ text: "state.", color: COLOR_BLACK, pauseAfterLast: 250 }]) },
  ];

  // Line 2: "These are not finishing touches. They are the work."
  const line2: Array<{ word: WordData; trailingSpace?: CharData }> = [
    { word: makeWord([{ text: "These", color: BRAND_PURPLE }]), trailingSpace: makeSpace(BRAND_PURPLE) },
    { word: makeWord([{ text: "are", color: BRAND_PURPLE }]), trailingSpace: makeSpace(BRAND_PURPLE) },
    { word: makeWord([{ text: "not", color: BRAND_PURPLE }]), trailingSpace: makeSpace(COLOR_BLACK) },
    { word: makeWord([{ text: "finishing", color: COLOR_BLACK }]), trailingSpace: makeSpace(COLOR_BLACK) },
    { word: makeWord([{ text: "touches.", color: COLOR_BLACK, pauseAfterLast: 250 }]), trailingSpace: makeSpace(BRAND_PURPLE) },
    { word: makeWord([{ text: "They", color: BRAND_PURPLE }]), trailingSpace: makeSpace(BRAND_PURPLE) },
    { word: makeWord([{ text: "are", color: BRAND_PURPLE }]), trailingSpace: makeSpace(BRAND_PURPLE) },
    { word: makeWord([{ text: "the", color: BRAND_PURPLE }]), trailingSpace: makeSpace(BRAND_PURPLE) },
    { word: makeWord([{ text: "work.", color: BRAND_PURPLE }]) },
  ];

  return { line1, line2, flatItems, totalChars: currentId };
}

const HEADING_DATA = createHeadingData();

function TypewriterHeading({
  className = "",
  style,
  dataNodeId,
  isMobile = false,
}: {
  className?: string;
  style?: React.CSSProperties;
  dataNodeId?: string;
  isMobile?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const caretTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasStartedRef = useRef<boolean>(false);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-tw-id]"));
    const charMap = new Map<number, HTMLElement>();
    spans.forEach((s) => {
      const id = parseInt(s.getAttribute("data-tw-id") || "-1", 10);
      if (id >= 0) charMap.set(id, s);
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((span) => { span.style.opacity = "1"; });
      hasStartedRef.current = true;
      return;
    }

    let lastActiveSpan: HTMLElement | null = null;

    const startTyping = async () => {
      await onSplashDone();
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;

      const step = (nextIndex: number) => {
        const charSpan = charMap.get(nextIndex - 1);
        if (charSpan) {
          charSpan.style.opacity = "1";
          if (lastActiveSpan && lastActiveSpan !== charSpan) {
            lastActiveSpan.classList.remove("tw-char-caret");
          }
          charSpan.classList.add("tw-char-caret");
          lastActiveSpan = charSpan;
        }

        if (nextIndex >= HEADING_DATA.totalChars) {
          caretTimerRef.current = setTimeout(() => {
            if (lastActiveSpan) lastActiveSpan.classList.remove("tw-char-caret");
          }, 1000);
          return;
        }

        const prevItem = HEADING_DATA.flatItems[nextIndex - 1];
        let delay = 45 + (Math.random() * 30 - 15);
        if (prevItem?.pauseAfter) delay += prevItem.pauseAfter;

        timerRef.current = setTimeout(() => { step(nextIndex + 1); }, delay);
      };

      step(1);
    };

    const rect = el.getBoundingClientRect();
    const windowH = window.innerHeight || document.documentElement.clientHeight;
    const inView = rect.top < windowH * 0.75 && rect.bottom > 0;

    if (inView) {
      startTyping();
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              observer.disconnect();
              startTyping();
              break;
            }
          }
        },
        { rootMargin: "100px 0px" }
      );
      observer.observe(el);
      return () => {
        observer.disconnect();
        if (timerRef.current) clearTimeout(timerRef.current);
        if (caretTimerRef.current) clearTimeout(caretTimerRef.current);
      };
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (caretTimerRef.current) clearTimeout(caretTimerRef.current);
    };
  }, []);

  const renderChar = (item: CharData) => (
    <span
      key={item.id}
      data-tw-id={item.id}
      className="relative inline-block transition-none"
      style={{ opacity: 0, color: item.color }}
      aria-hidden="true"
    >
      {item.char}
    </span>
  );

  return (
    <div
      ref={containerRef}
      className={className}
      style={style}
      data-node-id={dataNodeId}
      aria-label="The spacing, the hover state, the empty state. These are not finishing touches. They are the work."
      role="heading"
      aria-level={2}
    >
      <p aria-hidden="true" className="select-text relative">
        {HEADING_DATA.line1.map((item, idx) => (
          <React.Fragment key={idx}>
            <span className="inline-block whitespace-nowrap">
              {item.word.chars.map(renderChar)}
            </span>
            {item.trailingSpace && (
              <span
                data-tw-id={item.trailingSpace.id}
                className="relative inline transition-none"
                style={{ opacity: 0, color: item.trailingSpace.color }}
              >
                {" "}
              </span>
            )}
          </React.Fragment>
        ))}
        {isMobile ? <br className="hidden sm:inline" /> : <br />}
        {isMobile ? " " : null}
        {HEADING_DATA.line2.map((item, idx) => (
          <React.Fragment key={idx}>
            <span className="inline-block whitespace-nowrap">
              {item.word.chars.map(renderChar)}
            </span>
            {item.trailingSpace && (
              <span
                data-tw-id={item.trailingSpace.id}
                className="relative inline transition-none"
                style={{ opacity: 0, color: item.trailingSpace.color }}
              >
                {" "}
              </span>
            )}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
}

// ─── 4 Process Steps Data ─────────────────────────────────────────────────────
export const PROCESS_STEPS = [
  {
    id: "step-1",
    shortLabel: 'Initial "Why"',
    colorName: "blue",
    svg: "/assets/process-folder-blue.svg",
    title: 'Understanding the Initial "Why"',
    body: "I help people build things, but they rarely define what problem they're solving. Once I know what and who I'm solving it for, everything gets much much easier.",
  },
  {
    id: "step-2",
    shortLabel: "Business Goals",
    colorName: "yellow",
    svg: "/assets/process-folder-yellow.svg",
    title: "Understanding Business Goals",
    body: "It's not just about making things look good — every project has set goals. Whether it's profit, reach, or recognition, goals need to be clearly defined.",
  },
  {
    id: "step-3",
    shortLabel: "Iterative Designs",
    colorName: "pink",
    svg: "/assets/process-folder-pink.svg",
    title: "Iterative Designs",
    body: "Using mood boards, wireframes, style guides, and design reviews, I refine the look and feel step-by-step, until the client is happy (within reason!).",
  },
  {
    id: "step-4",
    shortLabel: "Implementation",
    colorName: "purple",
    svg: "/assets/process-folder-purple.svg",
    title: "Collaborative Implementation",
    body: "Skipping working with the implementation team is a mistake. I want to make sure my designs are actually executable. A great design means nothing if it can't be built.",
  },
];

// ─── Process Tag Geometry & Motion (Matches Section 2 Arc Movement) ─────────────
const PROCESS_CARD_W = 416;
const PROCESS_CARD_H = 67.16;
const PROCESS_CARD_R = 5.92;

// Rest position of tail relative to badge top-left:
// left: 924, top: 264. Badge is at left: 961, top: 196.4
const PROCESS_REST_X = 924 - 961; // -37
const PROCESS_REST_Y = 264 - 196.4; // 67.6
const PROCESS_TAIL_W = 38;
const PROCESS_TAIL_H = 38;

const PROCESS_CX_REST = PROCESS_REST_X + PROCESS_TAIL_W / 2; // -18
const PROCESS_CY_REST = PROCESS_REST_Y + PROCESS_TAIL_H / 2; // 86.6

const PROCESS_CORNER_X = PROCESS_CARD_R; // 5.92
const PROCESS_CORNER_Y = PROCESS_CARD_H - PROCESS_CARD_R; // 61.24
const PROCESS_R_CURVE = Math.hypot(
  PROCESS_CX_REST - PROCESS_CORNER_X,
  PROCESS_CY_REST - PROCESS_CORNER_Y
); // ≈ 34.861

// Arc path around bottom-left corner:
// 1. Left edge: Y_start down to cornerY
const PROCESS_Y_START = 25;
const PROCESS_L1 = PROCESS_CORNER_Y - PROCESS_Y_START; // 36.24

// 2. Corner circular arc from PI (180 deg) down to PI/2 (90 deg)
const PROCESS_L2 = (Math.PI / 2) * PROCESS_R_CURVE; // ≈ 54.76

// 3. Bottom edge: cornerX rightward to X_end
const PROCESS_X_END = 80;
const PROCESS_L3 = PROCESS_X_END - PROCESS_CORNER_X; // 74.08

const PROCESS_TOTAL = PROCESS_L1 + PROCESS_L2 + PROCESS_L3; // ≈ 165.08

// Rest position along the arc:
const PROCESS_ANGLE_REST = Math.atan2(
  PROCESS_CY_REST - PROCESS_CORNER_Y,
  PROCESS_CX_REST - PROCESS_CORNER_X
);
const PROCESS_ARC_FRAC = (Math.PI - PROCESS_ANGLE_REST) / (Math.PI / 2);
const PROCESS_D_REST = PROCESS_L1 + PROCESS_ARC_FRAC * PROCESS_L2;
const PROCESS_S_REST = PROCESS_D_REST / PROCESS_TOTAL; // ≈ 0.3915577

const PERIOD_PROCESS_DESKTOP = 7.0;
const PERIOD_PROCESS_MOBILE = 6.5;

function processRestTimeOffset(period: number): number {
  return (period / (2 * Math.PI)) * Math.acos(Math.max(-1, Math.min(1, 1 - 2 * PROCESS_S_REST)));
}

export function getProcessTagArcPoint(s: number): { cx: number; cy: number; dx: number; dy: number } {
  const d = s * PROCESS_TOTAL;
  let cx: number;
  let cy: number;

  if (d <= PROCESS_L1) {
    const t = PROCESS_L1 > 0 ? d / PROCESS_L1 : 0;
    cx = PROCESS_CORNER_X - PROCESS_R_CURVE;
    cy = PROCESS_Y_START + t * PROCESS_L1;
  } else if (d <= PROCESS_L1 + PROCESS_L2) {
    const phiFrac = (d - PROCESS_L1) / PROCESS_L2;
    const angle = Math.PI - phiFrac * (Math.PI / 2);
    cx = PROCESS_CORNER_X + PROCESS_R_CURVE * Math.cos(angle);
    cy = PROCESS_CORNER_Y + PROCESS_R_CURVE * Math.sin(angle);
  } else {
    const t = PROCESS_L3 > 0 ? (d - PROCESS_L1 - PROCESS_L2) / PROCESS_L3 : 0;
    cx = PROCESS_CORNER_X + t * PROCESS_L3;
    cy = PROCESS_CORNER_Y + PROCESS_R_CURVE;
  }

  return {
    cx,
    cy,
    dx: cx - PROCESS_CX_REST,
    dy: cy - PROCESS_CY_REST,
  };
}

const SCROLL_PER_STEP_VH = 70; // 70vh of scroll per step
const TOTAL_STEPS = 4;

// ─── Desktop Sticky Scroll Process Section ───────────────────────────────────
export function DesktopProcess() {
  const outerRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [frameScale, setFrameScale] = useState(1);

  // Cursor tag arc animation loop (constant orientation, smooth cosine arc matching Section 2)
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const T = PERIOD_PROCESS_DESKTOP;
    const startTime = performance.now() - processRestTimeOffset(T) * 1000;
    let rafId = 0;
    let isVisible = false;

    const loop = () => {
      if (!isVisible) {
        rafId = 0;
        return;
      }
      if (tagRef.current) {
        const elapsed = (performance.now() - startTime) / 1000;
        const s = 0.5 - 0.5 * Math.cos((2 * Math.PI * elapsed) / T);
        const { dx, dy } = getProcessTagArcPoint(s);
        tagRef.current.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            if (!rafId) rafId = requestAnimationFrame(loop);
          } else if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = 0;
          }
        }
      },
      { rootMargin: "100px 0px" }
    );

    if (outerRef.current) observer.observe(outerRef.current);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Dynamically compute scale so the 1440 × 842px canvas fits viewport cleanly
  useEffect(() => {
    const updateScale = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scaleW = vw / 1440;
      const scaleH = vh / 842;
      setFrameScale(Math.min(1, scaleW, scaleH));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Track scroll inside the outer container (pinned 70vh per step)
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const handleScroll = () => {
      const rect = outer.getBoundingClientRect();
      const scrolled = -rect.top;
      const totalScrollable = outer.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      const rawStep = Math.floor(progress * TOTAL_STEPS);
      setActiveStep(Math.min(TOTAL_STEPS - 1, Math.max(0, rawStep)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToStep = (idx: number) => {
    const outer = outerRef.current;
    if (!outer) return;
    const totalScrollable = outer.offsetHeight - window.innerHeight;
    const targetScroll = outer.offsetTop + (idx / TOTAL_STEPS) * totalScrollable + 5;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    // Outer scroll tracking container: 4 steps * 70vh + 100vh = 380vh
    <div
      ref={outerRef}
      id="process"
      style={{ height: `calc(${TOTAL_STEPS * SCROLL_PER_STEP_VH}vh + 100vh)` }}
      className="relative w-full"
    >
      {/* Sticky panel pinned to viewport during scroll */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden bg-white flex items-center justify-center select-none"
      >
        {/* Dotted background matching design */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #c8bfe7 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
            opacity: 0.45,
            zIndex: 0,
          }}
        />

        {/* Scaled 1440 × 842 Figma Frame (node 649:1371) */}
        <div
          style={{
            width: 1440,
            height: 842,
            position: "relative",
            flexShrink: 0,
            transform: `scale(${frameScale})`,
            transformOrigin: "center center",
            zIndex: 1,
          }}
          data-node-id="649:1371"
        >
          {/* 1. Typewriter Quote Headline (x=38.03, y=22.61, w=1050.45, h=127.45) */}
          <TypewriterHeading
            className="font-['Architects_Daughter'] text-[41px] leading-[56.5px] text-black absolute"
            style={{ left: 38.03, top: 22.61, width: 1050.45 }}
            dataNodeId="649:1372"
            isMobile={false}
          />

          {/* 2. Step Navigator Tracker on Left Side (replaces centered bottom dots) */}
          <div
            className="absolute flex flex-col gap-5 z-20"
            style={{ left: 38.03, top: 310 }}
            aria-label="Process steps progress"
          >
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => scrollToStep(idx)}
                  className="group flex items-center gap-3.5 text-left cursor-pointer transition-all duration-300"
                  style={{
                    opacity: isActive ? 1 : 0.45,
                  }}
                  aria-label={`Jump to step ${idx + 1}: ${step.title}`}
                >
                  {/* Vertical active indicator bar */}
                  <div
                    style={{
                      width: 3.5,
                      height: isActive ? 36 : 22,
                      borderRadius: 2,
                      backgroundColor: isActive ? BRAND_PURPLE : "#c8bfe7",
                      boxShadow: isActive ? "0 0 10px rgba(131, 100, 252, 0.45)" : "none",
                      transition: "all 300ms ease",
                    }}
                  />

                  {/* Step Number */}
                  <span
                    className="font-['Architects_Daughter'] font-bold text-lg leading-none"
                    style={{
                      color: isActive ? BRAND_PURPLE : "#6b628a",
                      transition: "color 300ms ease",
                    }}
                  >
                    0{idx + 1}
                  </span>

                  {/* Step Label */}
                  <span
                    className="font-['Almarena_Neue',sans-serif] font-semibold text-[14px] leading-tight"
                    style={{
                      color: isActive ? "#151322" : "#7c759c",
                      transition: "color 300ms ease",
                    }}
                  >
                    {step.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 3. Badge: "Common steps for most projects" (x=961, y=196.4, w=416, h=67.16) */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              left: 961,
              top: 196.4,
              width: 416,
              height: 67.16,
              backgroundColor: "#8364fc",
              borderRadius: 5.92,
              border: "0.652px solid white",
              boxShadow: "0px 2.37px 5.92px rgba(0,0,0,0.25)",
              zIndex: 5,
            }}
            data-node-id="679:1581"
          >
            <span
              className="font-['Architects_Daughter'] text-white text-center"
              style={{ fontSize: 24, lineHeight: "35px" }}
              data-node-id="679:1582"
            >
              Common steps for most projects
            </span>
          </div>

          {/* 4. Speech bubble pointer/tail (x=925, y=264, w=38, h=38)
              Glides along a smooth arc around the bottom-left corner of the badge, matching Section 2! */}
          <div
            ref={tagRef}
            className="absolute pointer-events-none will-change-transform"
            style={{
              left: 924,
              top: 264,
              width: 38,
              height: 38,
              zIndex: 5,
            }}
            data-node-id="679:1579"
            aria-hidden
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/process-speech-tail.svg"
              alt=""
              className="w-full h-full block"
            />
          </div>

          {/* 5. Ellipse shadow under girl's feet (left=440.75, top=570.55, w=335.1, h=242.02) */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: 440.75,
              top: 570.55,
              width: 335.1,
              height: 242.02,
              zIndex: 1,
            }}
            data-node-id="674:1545"
            aria-hidden
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/process-shadow.svg"
              alt=""
              className="w-full h-full block"
            />
          </div>

          {/* 6. FIXED LAYER: Girl's body (BEHIND the folder)
              NEVER changes, moves, or flickers during scroll! */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: 393.66,
              top: 183.98,
              width: 333.49,
              height: 573.54,
              zIndex: 2,
            }}
            data-node-id="674:1538"
            data-name="Object"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/process-girl-body.png"
              alt="Kanak holding project folder"
              className="w-full h-full block object-contain"
            />
          </div>

          {/* 7. DYNAMIC LAYER: The File & Text (ONLY THIS CHANGES ON SCROLL)
              Positioned at left=652.44, top=324.89, width=383.98, height=328.7
              Smooth 300ms crossfade between the 4 steps! */}
          <div
            className="absolute"
            style={{
              left: 652.44,
              top: 324.89,
              width: 383.98,
              height: 328.7,
              zIndex: 3,
            }}
            data-node-id="674:1552"
          >
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.id}
                className="absolute inset-0"
                style={{
                  opacity: activeStep === idx ? 1 : 0,
                  transition: "opacity 300ms ease-in-out",
                  pointerEvents: activeStep === idx ? "auto" : "none",
                }}
                aria-hidden={activeStep !== idx}
              >
                {/* Colored Folder SVG */}
                <div
                  className="absolute"
                  style={{
                    left: -34.9,
                    top: -21.07,
                    width: 431.38,
                    height: 380.06,
                  }}
                  data-name="colored folder"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={step.svg}
                    alt={`${step.colorName} file`}
                    className="w-full h-full block"
                  />
                </div>

                {/* Text Frame rotated 11.58deg and centered on the folder face */}
                <div
                  className="absolute flex items-center justify-center pointer-events-none"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 296.75,
                    height: 213.26,
                  }}
                  data-name="Frame 187"
                >
                  <div
                    style={{
                      transform: "rotate(11.58deg)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                      color: "white",
                    }}
                  >
                    {/* Increased title font size to 18px */}
                    <p
                      className="font-['Almarena_Neue',sans-serif] font-extrabold text-white"
                      style={{
                        fontSize: 18,
                        lineHeight: "28px",
                        width: 282,
                        margin: 0,
                      }}
                    >
                      {step.title}
                    </p>
                    {/* Increased body font size to 15px */}
                    <p
                      className="font-['Almarena_Neue'] text-white font-normal"
                      style={{
                        fontSize: 15,
                        lineHeight: "23.5px",
                        width: 268,
                        margin: 0,
                        opacity: 0.96,
                      }}
                    >
                      {step.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 8. FIXED LAYER: Girl's hand (ON TOP of the folder)
              NEVER changes, moves, or flickers during scroll!
              Fingers firmly grip the right edge of whichever folder is visible. */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: 960.24,
              top: 488.36,
              width: 86.1,
              height: 98.32,
              filter: "drop-shadow(-3.7px 1.8px 6.5px rgba(0,0,0,0.5))",
              zIndex: 4,
            }}
            data-node-id="674:1540"
            data-name="Object"
            aria-hidden
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/process-girl-hand.png"
              alt=""
              className="w-full h-full block object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile & Tablet Responsive Process Section ──────────────────────────────
export function MobileProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const mobileTagRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const T = PERIOD_PROCESS_MOBILE;
    const startTime = performance.now() - processRestTimeOffset(T) * 1000;
    let rafId = 0;
    let isVisible = false;

    const loop = () => {
      if (!isVisible) {
        rafId = 0;
        return;
      }
      if (mobileTagRef.current) {
        const isTablet = window.innerWidth >= 768;
        const scale = isTablet ? 0.35 : 0.22;

        const elapsed = (performance.now() - startTime) / 1000;
        const s = 0.5 - 0.5 * Math.cos((2 * Math.PI * elapsed) / T);
        const { dx, dy } = getProcessTagArcPoint(s);
        mobileTagRef.current.style.transform = `translate3d(${(dx * scale).toFixed(2)}px, ${(dy * scale).toFixed(2)}px, 0)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            if (!rafId) rafId = requestAnimationFrame(loop);
          } else if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = 0;
          }
        }
      },
      { rootMargin: "100px 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-white py-12 sm:py-16 px-4 sm:px-6 md:px-8 flex flex-col items-center overflow-hidden">
      {/* Dotted background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #c8bfe7 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
          opacity: 0.45,
          zIndex: 0,
        }}
      />

      <div className="relative z-10 w-full max-w-[700px] flex flex-col gap-8 sm:gap-10">
        {/* Heading */}
        <TypewriterHeading
          className="font-['Architects_Daughter'] text-[24px] sm:text-[30px] md:text-[36px] leading-tight text-black"
          isMobile={true}
        />

        {/* Badge with animated cursor tail */}
        <div className="relative self-start">
          <div
            className="px-4 py-2 text-white font-['Architects_Daughter'] text-[18px] sm:text-[20px]"
            style={{
              backgroundColor: BRAND_PURPLE,
              borderRadius: 6,
              border: "0.65px solid white",
              boxShadow: "0px 2.37px 5.92px rgba(0,0,0,0.25)",
            }}
          >
            Common steps for most projects
          </div>
          <div
            ref={mobileTagRef}
            className="absolute -left-2 -bottom-2.5 w-[22px] h-[22px] pointer-events-none z-10 will-change-transform"
            aria-hidden
          >
            <img
              src="/assets/process-speech-tail.svg"
              alt=""
              className="w-full h-full block"
            />
          </div>
        </div>

        {/* Interactive Step Switcher for Mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PROCESS_STEPS.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap"
              style={{
                backgroundColor: activeStep === idx ? BRAND_PURPLE : "#f3f0ff",
                color: activeStep === idx ? "white" : "#4a3f7a",
                boxShadow: activeStep === idx ? "0 2px 8px rgba(131,100,252,0.3)" : "none",
              }}
            >
              Step {idx + 1}
            </button>
          ))}
        </div>

        {/* Active Step Card */}
        <div className="relative w-full flex flex-col items-center">
          <div
            className="w-full relative flex items-center justify-center py-6"
            style={{ minHeight: "340px" }}
          >
            {/* The Folder SVG + Text */}
            <div
              className="relative"
              style={{
                width: "min(340px, 90vw)",
                height: "calc(min(340px, 90vw) * (328.7 / 383.98))",
              }}
            >
              {/* Folder SVG */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROCESS_STEPS[activeStep].svg}
                alt=""
                className="w-full h-full object-contain"
              />

              {/* Text inside the folder */}
              <div
                className="absolute inset-0 flex items-center justify-center p-6 text-white text-center"
                style={{ transform: "rotate(11.58deg)" }}
              >
                <div className="flex flex-col gap-2.5 max-w-[250px]">
                  <h4 className="font-['Almarena_Neue',sans-serif] font-extrabold text-[16px] sm:text-[17px] leading-snug">
                    {PROCESS_STEPS[activeStep].title}
                  </h4>
                  <p className="font-['Almarena_Neue'] text-[13px] sm:text-[14px] leading-relaxed opacity-95">
                    {PROCESS_STEPS[activeStep].body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All Steps Summary List below */}
        <div className="flex flex-col gap-4 mt-2">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className="cursor-pointer p-4 rounded-xl border transition-all flex items-start gap-4"
              style={{
                borderColor: activeStep === idx ? BRAND_PURPLE : "#e5e7eb",
                backgroundColor: activeStep === idx ? "#faf8ff" : "white",
              }}
            >
              <div
                className="w-3.5 h-3.5 rounded-full shrink-0 mt-1"
                style={{
                  backgroundColor:
                    idx === 0 ? "#468CC6" : idx === 1 ? "#F9C746" : idx === 2 ? "#CF1A64" : "#8830A0",
                }}
              />
              <div className="flex flex-col gap-1">
                <h4 className="font-['Almarena_Neue',sans-serif] font-bold text-sm text-black">
                  {step.title}
                </h4>
                <p className="font-['Almarena_Neue'] text-xs text-[#4a3f7a] leading-relaxed">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Default Export ───────────────────────────────────────────────────────────
export default function Process() {
  return (
    <>
      <div className="hidden xl:block">
        <DesktopProcess />
      </div>
      <div className="xl:hidden">
        <MobileProcess />
      </div>
    </>
  );
}
