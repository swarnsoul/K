"use client";

import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import Link from "next/link";

// ─── Tunable Stacking & Hold Parameters ───────────────────────────────────────
export const HOLD_RATIO = 0.10;     // Hold distance after each frame landing (fraction of stageHeight, ~10vh)
export const HOLD_END_RATIO = 0.10; // Hold distance after the last frame lands (fraction of stageHeight)
export const STACK_PEEK = 0;        // Offset in px for earlier frames to peek out at top (0 = fully covered)

// ─── Project Items Data ───────────────────────────────────────────────────────
// Exact Figma Desktop-8 (node 649:1162 / 701:1054) folder cards with dark banners,
// "0→1 Design" badge, large ghost project name, description and 3D angled phone mockups.
export interface ProjectItem {
  id: string;
  href?: string;
  name: string;
  nameSize: string;
  nameTracking: string;
  nameOpacity: string;
  title: string;
  tag: string;
  description: string;
  folderSvg: string;
  folderInverted?: boolean;
  bannerGradient: string;
  phoneImage?: string;
  phoneRight?: string;
  phoneTop?: string;
  phoneWidth?: string;
  phoneHeight?: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "cirqell",
    href: "/work/cirqell",
    name: "CIQELL",
    nameSize: "text-[52px] sm:text-[76px] lg:text-[128px]",
    nameTracking: "tracking-[0.1em]",
    nameOpacity: "text-white/15",
    title: "Cirqell | Social Connection Platform",
    tag: "0→1 Design",
    description: "Designing a meaningful social networking experience for creators, builders, and thinkers on Cirqell.",
    folderSvg: "/assets/projects/project-folder-cirqell.svg",
    folderInverted: true,
    bannerGradient: "from-[#002f82] to-[#111111]",
    phoneImage: "/assets/projects/project-cirqell-phone.png",
    phoneRight: "4.95%",
    phoneTop: "9.76%",
    phoneWidth: "29.7%",
    phoneHeight: "83.5%",
  },
  {
    id: "influcrush",
    href: "/work/influcrush",
    name: "INFLUCRUSH",
    nameSize: "text-[32px] sm:text-[46px] lg:text-[64px]",
    nameTracking: "tracking-[0.1em]",
    nameOpacity: "text-white/30",
    title: "INFLUCRUSH",
    tag: "0→1 Design",
    description: "Designing an engaging social experience for influencers and content creators on InfluCrush.",
    folderSvg: "/assets/projects/project-folder-influcrush.svg",
    folderInverted: false,
    bannerGradient: "from-[#76018c] to-[#020103]",
    phoneImage: "/assets/projects/project-influcrush-phone.png",
    phoneRight: "2%",
    phoneTop: "8.5%",
    phoneWidth: "31.4%",
    phoneHeight: "88.5%",
  },
  {
    id: "ecommerce",
    name: "E-COMMERCE",
    nameSize: "text-[34px] sm:text-[50px] lg:text-[72px]",
    nameTracking: "tracking-[0.1em]",
    nameOpacity: "text-white/20",
    title: "E-Commerce",
    tag: "0→1 Design",
    description: "Designing a seamless e-commerce experience with intentional interactions and fluid user flows.",
    folderSvg: "/assets/projects/project-folder-card3.svg",
    folderInverted: true,
    bannerGradient: "from-[#e6cc75] to-[#111111]",
    phoneImage: "/assets/projects/project-cirqell-phone.png",
    phoneRight: "4.95%",
    phoneTop: "9.76%",
    phoneWidth: "29.7%",
    phoneHeight: "83.5%",
  },
];

// ─── Project Folder Card Component (Exact Figma Frame 194) ────────────────────
export function ProjectFolderCard({
  project,
}: {
  project: ProjectItem;
}) {
  const cardBody = (
    <div className="relative w-full h-full select-none bg-transparent">
      {/* 1. Folder Tab Background SVG */}
      <div
        className={`absolute inset-0 w-full h-full pointer-events-none select-none ${
          project.folderInverted ? "-scale-x-100" : ""
        }`}
      >
        <img
          src={project.folderSvg}
          alt=""
          className="w-full h-full object-fill block pointer-events-none select-none"
          draggable={false}
        />
      </div>

      {/* 2. Inner Dark Banner Container (Matches Figma Frame 194) */}
      <div
        className={`absolute inset-[10.7%_2.65%_2.8%_2.65%] bg-gradient-to-b ${project.bannerGradient} rounded-[14px] sm:rounded-[20px] overflow-hidden select-none pointer-events-auto`}
      >
        {/* Left Column Content */}
        <div className="absolute left-[4.5%] sm:left-[3.2%] top-[7%] sm:top-[8.2%] w-[60%] sm:w-[58%] h-[85%] flex flex-col justify-between z-10 pointer-events-none select-none">
          <div className="flex flex-col gap-1 sm:gap-2">
            {/* Tag Badge */}
            <div className="border border-solid border-white h-[28px] sm:h-[34px] lg:h-[37px] rounded-[200px] w-fit px-3 sm:px-4 flex items-center gap-[6px] shrink-0 select-none">
              <img
                src="/assets/projects/project-sprout.svg"
                alt=""
                className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] lg:w-[24px] lg:h-[24px] shrink-0"
              />
              <span className="font-['Inter'] font-normal text-[11px] sm:text-[13px] lg:text-[14px] text-white whitespace-nowrap">
                {project.tag}
              </span>
            </div>

            {/* Big Ghost Project Name */}
            <div
              className={`flex flex-col font-['Inter'] font-extrabold select-none ${project.nameSize} ${project.nameTracking} ${project.nameOpacity} mt-1 sm:mt-2`}
            >
              <p className="leading-none whitespace-nowrap">{project.name}</p>
            </div>
          </div>

          {/* Description Text */}
          <p className="font-['Inter'] font-normal text-[11px] sm:text-[12.5px] lg:text-[13px] leading-[17px] sm:leading-[19px] lg:leading-[20px] text-white max-w-[391px] select-none line-clamp-3 sm:line-clamp-none">
            {project.description}
          </p>
        </div>

        {/* 3. Phone Mockup */}
        {project.phoneImage && (
          <div
            className="absolute pointer-events-none select-none"
            style={{
              right: project.phoneRight || "4.95%",
              top: project.phoneTop || "9.76%",
              width: project.phoneWidth || "29.7%",
              height: project.phoneHeight || "83.5%",
            }}
          >
            <img
              src={project.phoneImage}
              alt={project.title}
              className="w-full h-full object-contain pointer-events-none select-none"
              draggable={false}
            />
          </div>
        )}
      </div>
    </div>
  );

  if (project.href) {
    return (
      <Link
        href={project.href}
        className="block relative w-full h-full select-none bg-transparent cursor-pointer rounded-[20px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8364fc]"
        aria-label={`Open ${project.title} case study`}
      >
        {cardBody}
      </Link>
    );
  }

  return cardBody;
}

// ─── Cursor Tag Geometry & Motion (Figma Desktop-8) ───────────────────────────
const RIGHT_EDGE_RATIO  = 0.84;
const BOTTOM_EDGE_RATIO = 0.14;
const CARD_W  = 638;
const CARD_H  = 103;
const CARD_R  = 9.08;
const GAP_TAG = 25.16;
const R_CURVE = CARD_R + GAP_TAG;
const CX_REST = 655.5;
const CY_REST = 115.5;
const PERIOD_DESKTOP = 7.0;
const PERIOD_MOBILE  = 6.5;

export function getTagArcPoint(s: number): { cx: number; cy: number; dx: number; dy: number } {
  const Y_start = CARD_H - CARD_H * RIGHT_EDGE_RATIO;
  const X_end   = CARD_W - CARD_W * BOTTOM_EDGE_RATIO;

  const L1 = (CARD_H - CARD_R) - Y_start;
  const L2 = (Math.PI / 2) * R_CURVE;
  const L3 = (CARD_W - CARD_R) - X_end;
  const total = L1 + L2 + L3;
  const d = s * total;

  let cx: number, cy: number;

  if (d <= L1) {
    const t = L1 > 0 ? d / L1 : 0;
    cx = CARD_W + GAP_TAG;
    cy = Y_start + t * L1;
  } else if (d <= L1 + L2) {
    const phi = ((d - L1) / L2) * (Math.PI / 2);
    cx = (CARD_W - CARD_R) + R_CURVE * Math.cos(phi);
    cy = (CARD_H - CARD_R) + R_CURVE * Math.sin(phi);
  } else {
    const t = L3 > 0 ? (d - L1 - L2) / L3 : 0;
    cx = (CARD_W - CARD_R) - t * L3;
    cy = CARD_H + GAP_TAG;
  }

  return { cx, cy, dx: cx - CX_REST, dy: cy - CY_REST };
}

function restTimeOffset(period: number): number {
  const phiRest = Math.atan2(
    CY_REST - (CARD_H - CARD_R),
    CX_REST - (CARD_W - CARD_R)
  );

  const Y_start = CARD_H - CARD_H * RIGHT_EDGE_RATIO;
  const L1 = (CARD_H - CARD_R) - Y_start;
  const L2 = (Math.PI / 2) * R_CURVE;
  const L3 = (CARD_W - CARD_R) - (CARD_W - CARD_W * BOTTOM_EDGE_RATIO);
  const total = L1 + L2 + L3;

  const dRest = L1 + (phiRest / (Math.PI / 2)) * L2;
  const sRest = Math.max(0, Math.min(1, dRest / total));

  return (period / (2 * Math.PI)) * Math.acos(Math.max(-1, Math.min(1, 1 - 2 * sRest)));
}

// ─── Mode A: One Rigid Pinned Stage ───────────────────────────────────────────
function ModeAProjects() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tagUnitRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Cached layout metrics to ensure 60fps passive scrolling
  const metricsRef = useRef({
    stageH: 900,
    frameH: 533,
    frameGap: 10,
    H: 543,
    hold: 90,
    holdEnd: 90,
    step: 633,
    totalScrollDistance: 1356,
  });

  const [metrics, setMetrics] = useState({
    stageH: 900,
    frameH: 533,
    runwayH: 2256,
    isFluid: false,
    topSpace: 52,
    framesTop: 215,
    isShort: false,
  });

  // Recompute runway height and frame dimensions on resize
  useEffect(() => {
    const updateMetrics = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const isFluid = vw < 1280;
      const isShort = vh < 838;

      // Top space: at least 52px so handles are never cut off
      const topSpace = isShort ? Math.max(35, Math.round(vh * 0.05)) : 52;
      const cardH = 103;
      const cardToFramesGap = isShort ? 45 : 60;
      const framesTop = topSpace + cardH + cardToFramesGap;
      const minBottomSpace = isShort ? 25 : 35;

      const availableForFrame = vh - framesTop - minBottomSpace;
      const frameH = Math.max(260, Math.min(533, availableForFrame));

      const frameGap = 10;
      const H = frameH + frameGap;
      const hold = Math.round(vh * HOLD_RATIO);
      const holdEnd = Math.round(vh * HOLD_END_RATIO);
      const step = H + hold;
      const N = PROJECTS_DATA.length;
      const totalScrollDistance = (N - 1) * step + holdEnd;
      const runwayH = vh + totalScrollDistance;

      metricsRef.current = {
        stageH: vh,
        frameH,
        frameGap,
        H,
        hold,
        holdEnd,
        step,
        totalScrollDistance,
      };

      setMetrics({
        stageH: vh,
        frameH,
        runwayH,
        isFluid,
        topSpace,
        framesTop,
        isShort,
      });
    };

    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    return () => window.removeEventListener("resize", updateMetrics);
  }, []);

  // Passive scroll listener: 1:1 scroll progress, zero layout reads on scroll, zero React state updates on scroll
  useEffect(() => {
    let rafId: number;
    let cachedRunwayTop = 0;

    const updateRunwayTop = () => {
      if (runwayRef.current) {
        const rect = runwayRef.current.getBoundingClientRect();
        cachedRunwayTop = rect.top + window.scrollY;
      }
    };
    updateRunwayTop();
    window.addEventListener("resize", updateRunwayTop, { passive: true });

    const onScroll = () => {
      const { H, hold, step, totalScrollDistance } = metricsRef.current;
      const N = PROJECTS_DATA.length;

      // deltaS: scroll distance inside the pinned runway calculated purely from scrollY without layout reflow
      const currentScroll = window.scrollY;
      const deltaS = Math.max(0, Math.min(totalScrollDistance, currentScroll - cachedRunwayTop));

      // Calculate progress p in frame steps
      let p = 0;
      if (deltaS > 0) {
        const i = Math.floor(deltaS / step);
        if (i >= N - 1) {
          p = N - 1;
        } else {
          const offsetInStep = deltaS - i * step;
          if (offsetInStep <= hold) {
            p = i;
          } else {
            const travelOffset = offsetInStep - hold;
            const t = Math.min(1, Math.max(0, travelOffset / H));
            p = i + t;
          }
        }
      }

      // Update translateY for all frames directly on the DOM
      frameRefs.current.forEach((el, idx) => {
        if (!el) return;
        if (idx === 0) {
          el.style.transform = "translate3d(0, 0px, 0)";
        } else {
          // Frame k (idx >= 1): translateY = max(0, idx - p) * H + STACK_PEEK offset
          const rawY = Math.max(0, idx - p) * H;
          const targetY = rawY === 0 ? idx * STACK_PEEK : rawY;
          el.style.transform = `translate3d(0, ${targetY.toFixed(2)}px, 0)`;
        }
      });
    };

    let scheduled = false;
    const handleScroll = () => {
      if (!scheduled) {
        scheduled = true;
        rafId = requestAnimationFrame(() => {
          scheduled = false;
          onScroll();
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Also sync directly with Lenis scroll if present
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.on("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("resize", updateRunwayTop);
      window.removeEventListener("scroll", handleScroll);
      if (lenis) {
        lenis.off("scroll", handleScroll);
      }
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Cursor tag arc animation loop (constant 0deg orientation, smooth cosine arc)
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const T = PERIOD_DESKTOP;
    const startTime = performance.now() - restTimeOffset(T) * 1000;
    let rafId = 0;
    let isVisible = false;

    const loop = () => {
      if (!isVisible) {
        rafId = 0;
        return;
      }
      if (tagUnitRef.current) {
        const elapsed = (performance.now() - startTime) / 1000;
        const s = 0.5 - 0.5 * Math.cos((2 * Math.PI * elapsed) / T);
        const { dx, dy } = getTagArcPoint(s);
        tagUnitRef.current.style.transform = `translate3d(${dx.toFixed(2)}px,${dy.toFixed(2)}px,0)`;
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

    if (runwayRef.current) observer.observe(runwayRef.current);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={runwayRef}
      id="work"
      className="relative w-full"
      style={{ height: `${metrics.runwayH}px` }}
      data-node-id="111:2456"
    >
      {/* =====================================================================
          ONE RIGID PINNED STAGE
          Pins via CSS sticky top-0, releases as one single piece when runway ends.
          ===================================================================== */}
      <div
        ref={stageRef}
        className="sticky top-0 w-full h-[100dvh] overflow-clip flex items-center justify-center border-t border-b border-black bg-transparent select-none"
        data-node-id="mode-a-stage"
      >
        {/* Fixed 1440px canvas (>= 1280px) or Fluid container (1024px - 1279px) */}
        <div
          className={
            metrics.isFluid
              ? "relative w-full max-w-[1240px] px-8 flex flex-row"
              : "relative w-[1440px] shrink-0"
          }
          style={{
            height: metrics.isShort ? `${metrics.stageH}px` : "838px",
          }}
        >
          {/* =================================================================
              LEFT COLUMN: Bio Statement Box + Skills List
              Stays completely stationary inside the stage.
              ================================================================= */}
          <div
            className={
              metrics.isFluid
                ? "w-[32%] shrink-0 h-full border-r border-black relative pr-6 flex flex-col justify-between"
                : "absolute left-0 top-0 w-[438px] h-full border-r border-black"
            }
            style={{
              paddingTop: metrics.isFluid ? `${metrics.topSpace}px` : undefined,
              paddingBottom: metrics.isFluid ? (metrics.isShort ? "20px" : "24px") : undefined,
            }}
            data-node-id="stage-left-column"
          >
            {/* Bio Statement Box with corner handles */}
            <div
              className={
                metrics.isFluid
                  ? "relative w-full h-[228.5px]"
                  : "absolute left-[53px] w-[365.5px] h-[228.5px]"
              }
              style={{
                top: metrics.isFluid ? undefined : `${metrics.topSpace}px`,
              }}
              data-node-id="149:872"
            >
              <div className="absolute left-0 top-0 w-[19.5px] h-[19.5px] bg-[#e3e3e3] border-[1.82px] border-black z-10" />
              <div className="absolute left-[19.5px] right-[19.5px] top-[8.8px] h-[1.82px] bg-black" />
              <div className="absolute right-0 top-0 w-[19.5px] h-[19.5px] bg-[#e3e3e3] border-[1.82px] border-black z-10" />

              <div className="absolute left-[8.8px] top-[19.5px] bottom-[19.5px] w-[1.82px] bg-black" />
              <div className="absolute right-[8.8px] top-[19.5px] bottom-[19.5px] w-[1.82px] bg-black" />

              <div className="absolute left-0 bottom-0 w-[19.5px] h-[19.5px] bg-[#e3e3e3] border-[1.82px] border-black z-10" />
              <div className="absolute left-[19.5px] right-[19.5px] bottom-[8.8px] h-[1.82px] bg-black" />
              <div className="absolute right-0 bottom-0 w-[19.5px] h-[19.5px] bg-[#e3e3e3] border-[1.82px] border-black z-10" />

              <div className="absolute inset-[30px_20px_20px_30px] flex items-center">
                <p
                  className="font-['Inter'] font-normal text-[20px] leading-[35px] text-[#656565] w-[283px]"
                  data-node-id="149:883"
                >
                  I design brands, products, and digital experiences. From the first sketch to the final pixel, everything in between.
                </p>
              </div>
            </div>

            {/* Disciplines / Skills List */}
            <div
              className={
                metrics.isFluid
                  ? "relative w-full h-[177px] flex flex-col justify-between"
                  : "absolute left-[53px] w-[385px] h-[177px] flex flex-col justify-between"
              }
              style={{
                top: metrics.isFluid ? undefined : (metrics.isShort ? `${metrics.stageH - 177 - 24}px` : "637px"),
              }}
              data-node-id="133:656"
            >
              <div>
                <p className="font-['Inter'] font-normal text-[18px] leading-[30px] text-[#8364fc]">
                  Product Design{" "}
                </p>
                <img src="/assets/line-8.svg" alt="" className="w-full my-[1px] block" />
              </div>
              <div>
                <p className="font-['Inter'] font-normal text-[18px] leading-[30px] text-[#8364fc]">
                  UX Research{" "}
                </p>
                <img src="/assets/line-9.svg" alt="" className="w-full my-[1px] block" />
              </div>
              <div>
                <p className="font-['Inter'] font-normal text-[18px] leading-[30px] text-[#8364fc]">
                  Design Systems{" "}
                </p>
                <img src="/assets/line-9.svg" alt="" className="w-full my-[1px] block" />
              </div>
              <div>
                <p className="font-['Inter'] font-normal text-[18px] leading-[30px] text-[#8364fc]">
                  User Flows{" "}
                </p>
                <img src="/assets/line-9.svg" alt="" className="w-full my-[1px] block" />
              </div>
              <div>
                <p className="font-['Inter'] font-normal text-[18px] leading-[30px] text-[#8364fc]">
                  Prototyping
                </p>
                <img src="/assets/line-9.svg" alt="" className="w-full my-[1px] block" />
              </div>
            </div>
          </div>

          {/* =================================================================
              RIGHT COLUMN: Heading Card + Stacking Project Frames
              ================================================================= */}
          <div
            className={
              metrics.isFluid
                ? "w-[68%] h-full pl-6 sm:pl-10 relative flex flex-col"
                : "absolute left-[438px] top-0 w-[1002px] h-full"
            }
            style={{
              paddingTop: metrics.isFluid ? `${metrics.topSpace}px` : undefined,
            }}
            data-node-id="stage-right-column"
          >
            {/* Purple Heading Card with Subtext */}
            <div
              className={
                metrics.isFluid
                  ? "relative w-full max-w-[638px] h-[103px] bg-[#8364fc] border border-white rounded-[9.08px] shadow-[0px_3.63px_9.08px_rgba(0,0,0,0.25)] px-[22px] py-[17px] flex flex-col justify-center"
                  : "absolute left-[53px] w-[638px] h-[103px] bg-[#8364fc] border border-white rounded-[9.08px] shadow-[0px_3.63px_9.08px_rgba(0,0,0,0.25)] px-[22px] py-[17px] flex flex-col justify-center"
              }
              style={{
                top: metrics.isFluid ? undefined : `${metrics.topSpace}px`,
              }}
              data-node-id="149:897"
              data-cursor-key="projects-heading"
            >
              <h2
                className="font-['Architects_Daughter'] text-[30px] leading-[35px] text-white select-none"
                data-node-id="149:898"
              >
                Projects that shaped my thinking
              </h2>
              <p
                className="font-['Inter'] font-normal text-[15px] leading-[30px] text-white mt-[1px] select-none"
                data-node-id="149:900"
              >
                Each project challenged me to learn, iterate, and design with greater intention.
              </p>

              {/* Drop-Shaped Collaborator Cursor Tag */}
              <div
                ref={tagUnitRef}
                className="absolute left-[638px] top-[98px] w-[35px] h-[35px] pointer-events-none z-20 will-change-transform"
                data-node-id="149:890"
              >
                <div className="relative w-[35px] h-[35px] -scale-x-100 origin-center pointer-events-none">
                  <img
                    src="/assets/vector-2.svg"
                    alt="Card cursor tag"
                    className="absolute -left-[4px] top-0 w-[43px] h-[43px] max-w-none block pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Stacking Frames Container (All frames share this exact same box) */}
            <div
              className={
                metrics.isFluid
                  ? "relative w-full max-w-[896px] overflow-visible"
                  : "absolute left-[53px] w-[896px] overflow-visible"
              }
              style={{
                top: metrics.isFluid ? undefined : `${metrics.framesTop}px`,
                marginTop: metrics.isFluid ? (metrics.isShort ? "40px" : "55px") : undefined,
                height: `${metrics.frameH}px`,
              }}
              data-node-id="frames-stacking-area"
            >
              {PROJECTS_DATA.map((project, idx) => {
                const initialTranslateY = idx === 0 ? 0 : idx * (metrics.frameH + 10);

                return (
                  <div
                    key={project.id}
                    ref={(el) => {
                      frameRefs.current[idx] = el;
                    }}
                    className="absolute left-0 top-0 w-full bg-transparent will-change-transform"
                    style={{
                      height: `${metrics.frameH}px`,
                      zIndex: 10 + idx,
                      transform: `translate3d(0, ${initialTranslateY}px, 0)`,
                    }}
                    data-node-id={`project-frame-${project.id}`}
                    data-cursor-key={`project-${project.id}`}
                    data-cursor-theme="pink"
                  >
                    <ProjectFolderCard project={project} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mode B: Normal Flow + Single Sticky Frames Container ──────────────────────
function ModeBProjects() {
  const disciplines = [
    "Product Design",
    "UX Research",
    "Design Systems",
    "User Flows",
    "Prototyping",
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const tagUnitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const T = PERIOD_MOBILE;
    const startTime = performance.now() - restTimeOffset(T) * 1000;
    let rafId = 0;
    let isVisible = false;

    const loop = () => {
      if (!isVisible) {
        rafId = 0;
        return;
      }
      if (tagUnitRef.current) {
        const isTablet = window.innerWidth >= 768;
        const scale = isTablet ? 0.35 : 0.22;

        const elapsed = (performance.now() - startTime) / 1000;
        const s = 0.5 - 0.5 * Math.cos((2 * Math.PI * elapsed) / T);
        const { dx, dy } = getTagArcPoint(s);
        tagUnitRef.current.style.transform = `translate3d(${(dx * scale).toFixed(2)}px,${(dy * scale).toFixed(2)}px,0)`;
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
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full bg-transparent border-t border-b border-black py-8 sm:py-12 px-4 sm:px-6 md:px-8 select-none"
      data-node-id="mode-b-section"
    >
      <div className="max-w-[800px] mx-auto flex flex-col gap-6 sm:gap-8">
        {/* 1. Heading Card */}
        <div className="relative w-full bg-[#8364fc] border border-white rounded-[12px] sm:rounded-[16px] shadow-[0px_3.63px_9.08px_rgba(0,0,0,0.25)] p-5 sm:p-7">
          <h2 className="font-['Architects_Daughter'] text-[clamp(22px,4.5vw,30px)] leading-tight text-white select-none">
            Projects that shaped my thinking
          </h2>
          <p className="font-['Inter'] font-normal text-[clamp(13px,3vw,15px)] leading-relaxed text-white/90 mt-2 select-none">
            Each project challenged me to learn, iterate, and design with greater intention.
          </p>

          {/* Cursor Tag */}
          <div
            ref={tagUnitRef}
            className="absolute -right-1 -bottom-2.5 w-[28px] h-[28px] pointer-events-none z-20 will-change-transform"
            data-node-id="mobile-tag"
          >
            <div className="relative w-[28px] h-[28px] -scale-x-100 origin-center pointer-events-none">
              <img
                src="/assets/vector-2.svg"
                alt="Card cursor tag"
                className="absolute -left-[3px] top-0 w-[34px] h-[34px] max-w-none block pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* 2. Bio Box with framing corners */}
        <div className="w-full max-w-[400px] mx-auto relative px-6 py-6">
          <div className="absolute left-0 top-0 w-[18px] h-[18px] bg-[#e3e3e3] border-[1.8px] border-black z-10" />
          <div className="absolute right-0 top-0 w-[18px] h-[18px] bg-[#e3e3e3] border-[1.8px] border-black z-10" />
          <div className="absolute left-[18px] right-[18px] top-[8px] h-[1.8px] bg-black" />

          <div className="absolute left-[8px] top-[18px] bottom-[18px] w-[1.8px] bg-black" />
          <div className="absolute right-[8px] top-[18px] bottom-[18px] w-[1.8px] bg-black" />

          <div className="absolute left-0 bottom-0 w-[18px] h-[18px] bg-[#e3e3e3] border-[1.8px] border-black z-10" />
          <div className="absolute right-0 bottom-0 w-[18px] h-[18px] bg-[#e3e3e3] border-[1.8px] border-black z-10" />
          <div className="absolute left-[18px] right-[18px] bottom-[8px] h-[1.8px] bg-black" />

          <p className="font-['Inter'] font-normal text-[clamp(15px,3.8vw,19px)] leading-[32px] text-[#656565]">
            I design brands, products, and digital experiences. From the first sketch to the final pixel, everything in between.
          </p>
        </div>

        {/* 3. Skills List (each row min 44px tall) */}
        <div className="w-full max-w-[400px] mx-auto flex flex-col mb-4">
          {disciplines.map((item, idx) => (
            <div key={idx} className="flex flex-col min-h-[44px] justify-center">
              <span className="font-['Inter'] font-normal text-[16px] sm:text-[18px] text-[#8364fc] py-1.5">
                {item}{" "}
              </span>
              <div className="w-full h-px bg-[#8364fc] opacity-40 mb-1" />
            </div>
          ))}
        </div>

        {/* 4. Stacking Frames Container (All frames inside this one sticky container) */}
        <div
          className="w-full flex flex-col gap-0 relative"
          style={{ paddingBottom: "8dvh" }}
          data-node-id="mode-b-frames-container"
        >
          {PROJECTS_DATA.map((project, idx) => {
            const isLast = idx === PROJECTS_DATA.length - 1;
            return (
              <div
                key={project.id}
                className="sticky w-full aspect-[896/533] bg-transparent"
                style={{
                  top: "84px", // 12px + 72px nav pill
                  marginBottom: isLast ? 0 : "8dvh",
                  zIndex: 10 + idx,
                }}
                data-node-id={`mobile-project-frame-${project.id}`}
                data-cursor-key={`project-${project.id}`}
                data-cursor-theme="pink"
              >
                <ProjectFolderCard project={project} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Unified Responsive Component ─────────────────────────────────────────────
// Switches live between Mode A and Mode B using matchMedia:
// Mode A: (min-width: 1024px) and (min-height: 560px)
// Mode B: everything else
export default function Projects() {
  const [isModeA, setIsModeA] = useState(false);

  useLayoutEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px) and (min-height: 560px)");
    const updateMode = () => {
      setIsModeA(mql.matches);
    };

    updateMode();
    mql.addEventListener("change", updateMode);
    return () => mql.removeEventListener("change", updateMode);
  }, []);

  return isModeA ? <ModeAProjects /> : <ModeBProjects />;
}

export function DesktopProjects() {
  return <Projects />;
}

export function MobileProjects() {
  return <Projects />;
}
