"use client";

import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import Link from "next/link";
import { useLenis } from "@/components/SmoothScrollProvider";

// ─── Tunable Stacking & Hold Parameters ───────────────────────────────────────
export const HOLD_RATIO = 0.10;     // Hold distance after each frame landing (fraction of stageHeight, ~10vh)
export const HOLD_END_RATIO = 0.10; // Hold distance after the last frame lands (fraction of stageHeight)
export const STACK_PEEK = 0;        // Offset in px for earlier frames to peek out at top (0 = fully covered)

// ─── Project Wave Layer Definition ───────────────────────────────────────────
export interface WaveLayerData {
  d: string;
  fill: string;
}

export interface ProjectItem {
  id: string;
  href?: string;
  name: string;
  nameSize: string;
  nameWeight: string;
  nameColor: string;
  nameBoxHeight: string;
  title: string;
  tag: string;
  tagColor: string;
  tagBorderColor: string;
  tagSproutSvg: string;
  description: string;
  descriptionColor: string;
  descriptionWidth: string;
  contentTop: string;
  contentGap: string;
  contentWidth: string;
  folderSvg: string;
  folderInverted?: boolean;
  bannerBg: string;
  waveViewBox: string;
  waveWidth: number;
  waveHeight: number;
  waveLeft: string;
  waveTop: string;
  waveLayers: [WaveLayerData, WaveLayerData, WaveLayerData];
  waveTransform?: string;
  waveOrigin?: string;
  phoneImage?: string;
  phoneLeft?: string;
  phoneTop?: string;
  phoneWidth?: string;
  phoneHeight?: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "cirqell",
    href: "/work/cirqell",
    name: "CIQELL",
    nameSize: "text-[clamp(48px,11vw,128px)] xl:text-[128px]",
    nameWeight: "font-extrabold",
    nameColor: "text-[#8364fc]",
    nameBoxHeight: "h-[154px]",
    contentTop: "top-[38px]",
    contentGap: "gap-[5px]",
    contentWidth: "w-[528px]",
    title: "Cirqell | Social Connection Platform",
    tag: "0→1 Design",
    tagColor: "text-black",
    tagBorderColor: "border-black",
    tagSproutSvg: "/assets/projects/project-sprout-cirqell.svg",
    description: "Designing a meaningful social networking experience for creators, builders, and thinkers on Cirqell.",
    descriptionColor: "text-black",
    descriptionWidth: "w-[391px]",
    folderSvg: "/assets/projects/project-folder-cirqell-figma.svg",
    folderInverted: true,
    bannerBg: "#ece7ff",
    waveViewBox: "0 0 854 290",
    waveWidth: 854,
    waveHeight: 290,
    waveLeft: "-4px",
    waveTop: "175px",
    waveLayers: [
      {
        d: "M289.331 122.907C204.625 148.308 0 290 0 290H854V90.6535C854 90.6535 790.304 14.88 730.073 1.50747C669.841 -11.865 600.703 67.5035 515.198 90.6535C429.694 113.803 374.036 97.507 289.331 122.907Z",
        fill: "#B09DFB",
      },
      {
        d: "M289.331 188.592C204.625 204.007 0 290 0 290H854V169.017C854 169.017 790.304 123.031 730.073 114.915C669.841 106.799 600.703 154.968 515.198 169.017C429.694 183.067 374.036 173.177 289.331 188.592Z",
        fill: "#9378FB",
      },
      {
        d: "M289.331 225.468C204.625 235.277 0 290 0 290H854V213.011C854 213.011 790.304 183.747 730.073 178.582C669.841 173.418 600.703 204.07 515.198 213.011C429.694 221.952 374.036 215.658 289.331 225.468Z",
        fill: "#8364FC",
      },
    ],
    waveTransform: "scale(1.08, 1.06)",
    waveOrigin: "center center",
    phoneImage: "/assets/projects/project-cirqell-phone-figma.png",
    phoneLeft: "555px",
    phoneTop: "45px",
    phoneWidth: "252px",
    phoneHeight: "385px",
  },
  {
    id: "influcrush",
    href: "/work/influcrush",
    name: "INFLUCRUSH",
    nameSize: "text-[clamp(34px,8.5vw,90px)] xl:text-[90px]",
    nameWeight: "font-extrabold",
    nameColor: "text-[#ee3f64]",
    nameBoxHeight: "h-[90px]",
    contentTop: "top-[38px]",
    contentGap: "gap-[20px]",
    contentWidth: "w-[581px]",
    title: "INFLUCRUSH",
    tag: "0→1 Design",
    tagColor: "text-[#ee3f64]",
    tagBorderColor: "border-[#ee3f64]",
    tagSproutSvg: "/assets/projects/project-sprout-influcrush.svg",
    description: "Designing an engaging social experience for influencers and content creators on InfluCrush.",
    descriptionColor: "text-[#ee3f64]",
    descriptionWidth: "w-[391px]",
    folderSvg: "/assets/projects/project-folder-influcrush-figma.svg",
    folderInverted: false,
    bannerBg: "#fddffe",
    waveViewBox: "0 0 859 401",
    waveWidth: 859,
    waveHeight: 401,
    waveLeft: "-8px",
    waveTop: "69px",
    waveLayers: [
      {
        d: "M212.376 280.831C148.663 257.833 0 155.872 0 155.872V401H859V0C859 0 803.666 18.4737 771.551 35.7025C739.436 52.9313 653.72 165.814 612.144 188.962C570.567 212.11 539.121 211.992 497.211 234.679C455.3 257.365 439.717 306.019 383.277 319.581C326.836 333.143 276.089 303.828 212.376 280.831Z",
        fill: "#FFB8C7",
      },
      {
        d: "M212.376 301.783C148.663 282.796 0 198.612 0 198.612V401H859V69.9179C859 69.9179 803.666 85.1706 771.551 99.3954C739.436 113.62 653.72 206.821 612.144 225.933C570.567 245.045 539.121 244.947 497.211 263.678C455.3 282.409 439.717 322.58 383.277 333.777C326.836 344.974 276.089 320.771 212.376 301.783Z",
        fill: "#FF97AD",
      },
      {
        d: "M212.376 335.985C148.663 323.543 0 268.379 0 268.379V401H859V184.049C859 184.049 803.666 194.043 771.551 203.365C739.436 212.686 653.72 273.758 612.144 286.282C570.567 298.806 539.121 298.742 497.211 311.016C455.3 323.29 439.717 349.613 383.277 356.95C326.836 364.287 276.089 348.427 212.376 335.985Z",
        fill: "#EE3F64",
      },
    ],
    waveTransform: "scale(1.08, 1.06)",
    waveOrigin: "center center",
    phoneImage: "/assets/projects/project-influcrush-phone-figma.png",
    phoneLeft: "581px",
    phoneTop: "65px",
    phoneWidth: "243px",
    phoneHeight: "371px",
  },
  {
    id: "ecommerce",
    name: "COMING SOON",
    nameSize: "text-[clamp(30px,7.5vw,75px)] xl:text-[75px]",
    nameWeight: "font-black uppercase",
    nameColor: "text-[#d4845a]",
    nameBoxHeight: "h-[90px]",
    contentTop: "top-[57px]",
    contentGap: "gap-[5px]",
    contentWidth: "w-[551px]",
    title: "Coming soon",
    tag: "0→1 Design",
    tagColor: "text-[#d4845a]",
    tagBorderColor: "border-[#d4845a]",
    tagSproutSvg: "/assets/projects/project-sprout-card3.svg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    descriptionColor: "text-[#d4845a]",
    descriptionWidth: "w-[519px]",
    folderSvg: "/assets/projects/project-folder-card3-figma.svg",
    folderInverted: true,
    bannerBg: "#fdf8e7",
    waveViewBox: "0 0 757.5 479",
    waveWidth: 757.5,
    waveHeight: 479,
    waveLeft: "94.5px",
    waveTop: "-7px",
    waveLayers: [
      {
        d: "M562.5 204.5C593.388 145.072 605.5 0.000615438 675 0.000193278C744.5 -0.000228882 757.5 0.000193278 757.5 0.000193278V477H0C0 477 61.7538 436.558 103 413.5C144.246 390.442 186.141 361.61 245.5 344C304.859 326.391 383.787 358.334 443.5 328C503.213 297.666 531.612 263.929 562.5 204.5Z",
        fill: "#FFEDB3",
      },
      {
        d: "M592.748 254.488C618.844 205.525 618 141 668.5 106.5C719 71.9998 757.5 86.0002 757.5 86.0002V479H117.5C117.5 479 169.675 445.68 204.523 426.682C239.371 407.685 274.768 383.93 324.919 369.422C375.07 354.913 441.756 381.231 492.206 356.239C542.657 331.247 566.651 303.45 592.748 254.488Z",
        fill: "#FFE183",
      },
      {
        d: "M592.748 317.328C618.844 282.07 631 235.843 681.5 211C732 186.157 757.5 196 757.5 196V479H117.5C117.5 479 169.675 455.006 204.523 441.326C239.371 427.646 274.768 410.54 324.919 400.092C375.07 389.645 441.756 408.597 492.206 390.6C542.657 372.603 566.651 352.587 592.748 317.328Z",
        fill: "#FFD54F",
      },
    ],
    waveTransform: "scale(1.10, 1.06)",
    waveOrigin: "center center",
  },
];

// ─── Exact Figma Wave Component with Gentle Liquid Animation ─────────────────
// Uses the EXACT SVG paths extracted from Figma for each card.
// Gentle continuous drifting (8s, 10.5s, 13s) using GPU transforms.
// Pauses when off-screen; disabled with prefers-reduced-motion.
function FigmaCardWaves({
  project,
  isVisible,
}: {
  project: ProjectItem;
  isVisible: boolean;
}) {
  const [layer1, layer2, layer3] = project.waveLayers;

  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        left: project.waveLeft,
        top: project.waveTop,
        width: `${project.waveWidth}px`,
        height: `${project.waveHeight}px`,
        transform: project.waveTransform || "scale(1.08, 1.06)",
        transformOrigin: project.waveOrigin || "center center",
        zIndex: 1,
      }}
      aria-hidden="true"
    >
      {/* Wave Layer 1 (Top / Lightest) */}
      <div
        className="absolute inset-0 size-full will-change-transform"
        style={{
          animation: "wave-drift-layer-1 13s ease-in-out infinite",
          animationPlayState: isVisible ? "running" : "paused",
        }}
      >
        <svg
          viewBox={project.waveViewBox}
          className="block size-full"
        >
          <path d={layer1.d} fill={layer1.fill} />
        </svg>
      </div>

      {/* Wave Layer 2 (Mid) */}
      <div
        className="absolute inset-0 size-full will-change-transform"
        style={{
          animation: "wave-drift-layer-2 10.5s ease-in-out infinite",
          animationPlayState: isVisible ? "running" : "paused",
        }}
      >
        <svg
          viewBox={project.waveViewBox}
          className="block size-full"
        >
          <path d={layer2.d} fill={layer2.fill} />
        </svg>
      </div>

      {/* Wave Layer 3 (Bottom / Darkest) */}
      <div
        className="absolute inset-0 size-full will-change-transform"
        style={{
          animation: "wave-drift-layer-3 8s ease-in-out infinite",
          animationPlayState: isVisible ? "running" : "paused",
        }}
      >
        <svg
          viewBox={project.waveViewBox}
          className="block size-full"
        >
          <path d={layer3.d} fill={layer3.fill} />
        </svg>
      </div>

      <style jsx>{`
        @keyframes wave-drift-layer-1 {
          0% {
            transform: translate3d(0px, 0px, 0);
          }
          35% {
            transform: translate3d(-6px, 2px, 0);
          }
          70% {
            transform: translate3d(5px, -2px, 0);
          }
          100% {
            transform: translate3d(0px, 0px, 0);
          }
        }
        @keyframes wave-drift-layer-2 {
          0% {
            transform: translate3d(0px, 0px, 0);
          }
          40% {
            transform: translate3d(6px, -2px, 0);
          }
          75% {
            transform: translate3d(-5px, 2px, 0);
          }
          100% {
            transform: translate3d(0px, 0px, 0);
          }
        }
        @keyframes wave-drift-layer-3 {
          0% {
            transform: translate3d(0px, 0px, 0);
          }
          45% {
            transform: translate3d(-4px, 1.5px, 0);
          }
          80% {
            transform: translate3d(5px, -1px, 0);
          }
          100% {
            transform: translate3d(0px, 0px, 0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .will-change-transform {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// ─── Exact Project Folder Card Component (Figma Frame 192 / Frame 194) ────────
export function ProjectFolderCard({
  project,
}: {
  project: ProjectItem;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "100px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cardBody = (
    <div
      ref={cardRef}
      className="relative w-[896px] h-[533px] select-none bg-transparent shrink-0"
      data-node-id="783:965"
    >
      {/* 1. Folder Tab Background SVG (896px × 533px) */}
      <div
        className={`absolute inset-0 w-[896px] h-[533px] pointer-events-none select-none ${
          project.folderInverted ? "-scale-x-100" : ""
        }`}
      >
        <img
          src={project.folderSvg}
          alt=""
          className="block w-full h-full object-fill pointer-events-none select-none"
          draggable={false}
        />
      </div>

      {/* 2. Inner Light Banner Container (Figma Frame 194: 849px × 461px, left: 24px, top: 57px, rounded: 20px) */}
      <div
        className="absolute left-[24px] top-[57px] w-[849px] h-[461px] rounded-[20px] overflow-hidden select-none pointer-events-auto"
        style={{ backgroundColor: project.bannerBg, isolation: "isolate" }}
        data-node-id="783:967"
      >
        {/* Exact Figma Wave Illustration (behind text and phone, z-1) */}
        <FigmaCardWaves project={project} isVisible={isVisible} />

        {/* 3. Text & Tag Content (Figma Frame 197) */}
        <div
          className={`absolute left-[27px] ${project.contentTop} ${project.contentWidth} flex flex-col items-start ${project.contentGap} z-10 pointer-events-none select-none`}
          data-node-id="783:969"
        >
          {/* Tag Badge: Figma Frame 195 (140px × 37px, rounded-[200px], border) */}
          <div
            className={`border border-solid ${project.tagBorderColor} h-[37px] rounded-[200px] w-[140px] flex items-center justify-center shrink-0 select-none bg-transparent overflow-hidden`}
            data-node-id="783:970"
          >
            <div className="flex items-center justify-center gap-[4px] shrink-0" data-node-id="783:971">
              <div className="size-[24px] relative shrink-0" data-node-id="783:972">
                <img
                  src={project.tagSproutSvg}
                  alt=""
                  className="block size-full object-contain shrink-0"
                />
              </div>
              <span
                className={`font-['Inter'] font-normal text-[14px] leading-[33.378px] text-center whitespace-nowrap ${project.tagColor} w-[79px]`}
                data-node-id="783:973"
              >
                {project.tag}
              </span>
            </div>
          </div>

          {/* Big Project Name: Exact Figma (Inter Extra_Bold / Black, size 128px / 90px / 75px) */}
          <div
            className={`flex items-center font-['Inter'] ${project.nameWeight} ${project.nameSize} leading-none ${project.nameBoxHeight} ${project.nameColor} select-none not-italic shrink-0`}
            data-node-id="783:974"
          >
            <p className="leading-none whitespace-nowrap">{project.name}</p>
          </div>

          {/* Description Text: Exact Figma (Inter Regular, 13px, leading: 20px) */}
          <p
            className={`font-['Inter'] font-normal text-[13px] leading-[20px] ${project.descriptionWidth} select-none not-italic ${project.descriptionColor}`}
            data-node-id="783:975"
          >
            {project.description}
          </p>
        </div>

        {/* 4. 3D Phone Mockup: Topmost z-index (z-20), on top of waves, strictly inside inner panel */}
        {project.phoneImage && (
          <div
            className="absolute pointer-events-none select-none z-20"
            style={{
              left: project.phoneLeft,
              top: project.phoneTop,
              width: project.phoneWidth,
              height: project.phoneHeight,
            }}
            data-node-id="783:968"
          >
            <div className="relative size-full overflow-hidden">
              <img
                src={project.phoneImage}
                alt={project.title}
                className="block size-full object-contain pointer-events-none select-none"
                draggable={false}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (project.href) {
    return (
      <Link
        href={project.href}
        className="block relative w-[896px] h-[533px] select-none bg-transparent cursor-pointer rounded-[20px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8364fc]"
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
  const lenis = useLenis();

  // Cached layout metrics to ensure 60fps passive scrolling
  const metricsRef = useRef({
    stageH: 900,
    frameH: 533,
    cardScale: 1,
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
    cardScale: 1,
    runwayH: 2256,
    isFluid: false,
    topSpace: 52,
    framesTop: 242,
    isShort: false,
  });

  // Recompute runway height and frame dimensions on resize
  useEffect(() => {
    const updateMetrics = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const isFluid = vw < 1280;
      const isShort = vh < 838;

      // Exact Figma Desktop-8 specs: topSpace = 52px, framesTop = 242px, frameH = 533px
      const topSpace = isShort ? Math.max(35, Math.round(vh * 0.05)) : 52;
      const cardH = 103;
      const cardToFramesGap = isShort ? 45 : 87;
      const framesTop = topSpace + cardH + cardToFramesGap;
      const minBottomSpace = isShort ? 25 : 35;

      const availableForFrame = vh - framesTop - minBottomSpace;
      // Fixed aspect ratio scaling: card is 896 × 533
      const cardScale = Math.min(1, Math.max(0.5, availableForFrame / 533));
      const frameH = Math.round(533 * cardScale);

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
        cardScale,
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
        cardScale,
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

  // Passive scroll listener: 1:1 scroll progress, zero layout reads on scroll
  useEffect(() => {
    let rafId: number;

    const onScroll = (currentScroll = window.scrollY) => {
      if (!runwayRef.current) return;
      const runwayTop = runwayRef.current.offsetTop;
      const { H, hold, step, totalScrollDistance } = metricsRef.current;
      const N = PROJECTS_DATA.length;

      const deltaS = Math.max(0, Math.min(totalScrollDistance, currentScroll - runwayTop));

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

      frameRefs.current.forEach((el, idx) => {
        if (!el) return;
        const scale = metricsRef.current.cardScale;
        if (idx === 0) {
          el.style.transform = `translate3d(0, 0px, 0) scale(${scale})`;
        } else {
          const rawY = Math.max(0, idx - p) * H;
          const targetY = rawY === 0 ? idx * STACK_PEEK : rawY;
          el.style.transform = `translate3d(0, ${targetY.toFixed(2)}px, 0) scale(${scale})`;
        }
      });
    };

    let scheduled = false;
    const handleScroll = () => {
      if (!scheduled) {
        scheduled = true;
        rafId = requestAnimationFrame(() => {
          scheduled = false;
          onScroll(window.scrollY);
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    if (lenis) {
      const handleLenisScroll = (e: any) => {
        onScroll(e.scroll ?? window.scrollY);
      };
      lenis.on("scroll", handleLenisScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        lenis.off("scroll", handleLenisScroll);
        cancelAnimationFrame(rafId);
      };
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [lenis]);

  // Cursor tag arc animation loop
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
      data-node-id="649:1162"
      data-name="Desktop - 8"
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
              Figma: left: 53px, divider line at x: 438px
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
            {/* Bio Statement Box with corner handles (Exact Figma: 365.5px × 228.5px, left: 53px, top: 52px) */}
            <div
              className={
                metrics.isFluid
                  ? "relative w-full h-[228.5px]"
                  : "absolute left-[53px] w-[365.5px] h-[228.5px]"
              }
              style={{
                top: metrics.isFluid ? undefined : `${metrics.topSpace}px`,
              }}
              data-node-id="649:1181"
            >
              <div className="absolute left-0 top-0 size-[19.5px] bg-[#e3e3e3] border-[1.82px] border-black border-solid z-10" />
              <div className="absolute left-[19.5px] right-[19.5px] top-[8.8px] h-[1.82px] bg-black" />
              <div className="absolute right-0 top-0 size-[19.5px] bg-[#e3e3e3] border-[1.82px] border-black border-solid z-10" />

              <div className="absolute left-[8.8px] top-[19.5px] bottom-[19.5px] w-[1.82px] bg-black" />
              <div className="absolute right-[8.8px] top-[19.5px] bottom-[19.5px] w-[1.82px] bg-black" />

              <div className="absolute left-0 bottom-0 size-[19.5px] bg-[#e3e3e3] border-[1.82px] border-black border-solid z-10" />
              <div className="absolute left-[19.5px] right-[19.5px] bottom-[8.8px] h-[1.82px] bg-black" />
              <div className="absolute right-0 bottom-0 size-[19.5px] bg-[#e3e3e3] border-[1.82px] border-black border-solid z-10" />

              <div className="absolute left-[34px] top-[44px] w-[283px]">
                <p
                  className="font-['Inter'] font-normal text-[20px] leading-[35px] text-[#656565] w-[283px] not-italic tracking-normal"
                  data-node-id="649:1191"
                >
                  I design brands, products,<br />
                  and digital experiences. From<br />
                  the first sketch to the final<br />
                  pixel, everything in between.
                </p>
              </div>
            </div>

            {/* Disciplines / Skills List (Exact Figma: left: 53px, top: 637px, width: 385px, height: 177px) */}
            <div
              className={
                metrics.isFluid
                  ? "relative w-full h-[177px] flex flex-col justify-between"
                  : "absolute left-[53px] w-[385px] flex flex-col gap-[3px]"
              }
              style={{
                top: metrics.isFluid ? undefined : (metrics.isShort ? `${metrics.stageH - 177 - 24}px` : "637px"),
              }}
              data-node-id="649:1163"
            >
              <p className="font-['Inter'] font-normal text-[18px] leading-[30px] text-[#8364fc] w-full" data-node-id="649:1164">
                Product Design{" "}
              </p>
              <div className="h-0 relative shrink-0 w-full" data-node-id="649:1165">
                <div className="absolute inset-[-0.5px_0_0_0]">
                  <img src="/assets/line-8.svg" alt="" className="block w-full" />
                </div>
              </div>
              <p className="font-['Inter'] font-normal text-[18px] leading-[30px] text-[#8364fc] w-full" data-node-id="649:1166">
                UX Research{" "}
              </p>
              <div className="h-0 relative shrink-0 w-full" data-node-id="649:1167">
                <div className="absolute inset-[-0.5px_0_0_0]">
                  <img src="/assets/line-9.svg" alt="" className="block w-full" />
                </div>
              </div>
              <p className="font-['Inter'] font-normal text-[18px] leading-[30px] text-[#8364fc] w-full" data-node-id="649:1168">
                Design Systems{" "}
              </p>
              <div className="h-0 relative shrink-0 w-full" data-node-id="649:1169">
                <div className="absolute inset-[-0.5px_0_0_0]">
                  <img src="/assets/line-9.svg" alt="" className="block w-full" />
                </div>
              </div>
              <p className="font-['Inter'] font-normal text-[18px] leading-[30px] text-[#8364fc] w-full" data-node-id="649:1170">
                User Flows{" "}
              </p>
              <div className="h-0 relative shrink-0 w-full" data-node-id="649:1171">
                <div className="absolute inset-[-0.5px_0_0_0]">
                  <img src="/assets/line-9.svg" alt="" className="block w-full" />
                </div>
              </div>
              <p className="font-['Inter'] font-normal text-[18px] leading-[30px] text-[#8364fc] w-full" data-node-id="649:1172">
                Prototyping
              </p>
              <div className="h-0 relative shrink-0 w-full" data-node-id="649:1173">
                <div className="absolute inset-[-0.5px_0_0_0]">
                  <img src="/assets/line-9.svg" alt="" className="block w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* =================================================================
              RIGHT COLUMN: Heading Card + Stacking Project Frames
              Exact Figma: left: 491px (438px divider + 53px margin)
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
            {/* Purple Heading Card: Exact Figma Frame 50 (638px × 103px, left: 53px, top: 52px) */}
            <div
              className={
                metrics.isFluid
                  ? "relative w-full max-w-[638px] h-[103px] bg-[#8364fc] border border-solid border-white rounded-[9.078px] shadow-[0px_3.631px_9.078px_0px_rgba(0,0,0,0.25)] px-[22px] py-[17px] flex flex-col justify-center"
                  : "absolute left-[53px] w-[638px] h-[103px] bg-[#8364fc] border border-solid border-white rounded-[9.078px] shadow-[0px_3.631px_9.078px_0px_rgba(0,0,0,0.25)] px-[22px] py-[17px] flex flex-col justify-center"
              }
              style={{
                top: metrics.isFluid ? undefined : `${metrics.topSpace}px`,
              }}
              data-node-id="649:1176"
              data-cursor-key="projects-heading"
            >
              <h2
                className="font-['Architects_Daughter'] text-[30px] leading-[35px] text-white select-none not-italic"
                data-node-id="649:1179"
              >
                Projects that shaped my thinking
              </h2>
              <p
                className="font-['Inter'] font-normal text-[15px] leading-[30px] text-white select-none not-italic w-[580px] mt-[1px]"
                data-node-id="649:1180"
              >
                Each project challenged me to learn, iterate, and design with greater intention.
              </p>

              {/* Exact Figma Drop-Shaped Collaborator Cursor Tag */}
              <div
                ref={tagUnitRef}
                className="absolute left-[638px] top-[98px] size-[35px] pointer-events-none z-20 will-change-transform"
                data-node-id="649:1175"
              >
                <div className="relative size-[35px] -scale-x-100 origin-center pointer-events-none">
                  <img
                    src="/assets/projects/project-tag-drop-figma.svg"
                    alt="Card cursor tag"
                    className="absolute -left-[4px] top-0 w-[43px] h-[43px] max-w-none block pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Stacking Frames Container: Exact Figma Frame 198 (896px × 533px, left: 53px, top: 242px) */}
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
              data-node-id="783:964"
            >
              {PROJECTS_DATA.map((project, idx) => {
                const initialTranslateY = idx === 0 ? 0 : idx * (metrics.frameH + 10);

                return (
                  <div
                    key={project.id}
                    ref={(el) => {
                      frameRefs.current[idx] = el;
                    }}
                    className="absolute left-0 top-0 w-[896px] h-[533px] origin-top-left bg-transparent will-change-transform"
                    style={{
                      zIndex: 10 + idx,
                      transform: `translate3d(0, ${initialTranslateY}px, 0) scale(${metrics.cardScale})`,
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

function MobileProjectCardWrapper({ project }: { project: ProjectItem }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        if (w > 0) {
          setScale(w / 896);
        }
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full aspect-[896/533] overflow-hidden select-none">
      <div
        className="absolute left-0 top-0 w-[896px] h-[533px] origin-top-left pointer-events-auto"
        style={{ transform: `scale(${scale})` }}
      >
        <ProjectFolderCard project={project} />
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
        <div className="relative w-full bg-[#8364fc] border border-solid border-white rounded-[12px] sm:rounded-[16px] shadow-[0px_3.631px_9.078px_0px_rgba(0,0,0,0.25)] p-5 sm:p-7">
          <h2 className="font-['Architects_Daughter'] text-[clamp(22px,4.5vw,30px)] leading-tight text-white select-none not-italic">
            Projects that shaped my thinking
          </h2>
          <p className="font-['Inter'] font-normal text-[clamp(13px,3vw,15px)] leading-relaxed text-white mt-2 select-none not-italic">
            Each project challenged me to learn, iterate, and design with greater intention.
          </p>

          {/* Cursor Tag */}
          <div
            ref={tagUnitRef}
            className="absolute -right-1 -bottom-2.5 size-[28px] pointer-events-none z-20 will-change-transform"
            data-node-id="mobile-tag"
          >
            <div className="relative size-[28px] -scale-x-100 origin-center pointer-events-none">
              <img
                src="/assets/projects/project-tag-drop-figma.svg"
                alt="Card cursor tag"
                className="absolute -left-[3px] top-0 w-[34px] h-[34px] max-w-none block pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* 2. Bio Box with framing corners */}
        <div className="w-full max-w-[400px] mx-auto relative px-6 py-6">
          <div className="absolute left-0 top-0 size-[18px] bg-[#e3e3e3] border-[1.8px] border-black border-solid z-10" />
          <div className="absolute right-0 top-0 size-[18px] bg-[#e3e3e3] border-[1.8px] border-black border-solid z-10" />
          <div className="absolute left-[18px] right-[18px] top-[8px] h-[1.8px] bg-black" />

          <div className="absolute left-[8px] top-[18px] bottom-[18px] w-[1.8px] bg-black" />
          <div className="absolute right-[8px] top-[18px] bottom-[18px] w-[1.8px] bg-black" />

          <div className="absolute left-0 bottom-0 size-[18px] bg-[#e3e3e3] border-[1.8px] border-black border-solid z-10" />
          <div className="absolute right-0 bottom-0 size-[18px] bg-[#e3e3e3] border-[1.8px] border-black border-solid z-10" />
          <div className="absolute left-[18px] right-[18px] bottom-[8px] h-[1.8px] bg-black" />

          <p className="font-['Inter'] font-normal text-[clamp(15px,3.8vw,19px)] leading-[32px] text-[#656565] not-italic">
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
                  top: "84px",
                  marginBottom: isLast ? 0 : "8dvh",
                  zIndex: 10 + idx,
                }}
                data-node-id={`mobile-project-frame-${project.id}`}
                data-cursor-key={`project-${project.id}`}
                data-cursor-theme="pink"
              >
                <MobileProjectCardWrapper project={project} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Unified Responsive Component ─────────────────────────────────────────────
export function DesktopProjects() {
  return <ModeAProjects />;
}

export function MobileProjects() {
  return <ModeBProjects />;
}

export default function Projects() {
  return (
    <>
      <div className="hidden xl:block">
        <ModeAProjects />
      </div>
      <div className="xl:hidden">
        <ModeBProjects />
      </div>
    </>
  );
}
