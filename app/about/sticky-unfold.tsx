"use client";

import React, { useLayoutEffect, useRef } from "react";
import { onSplashDone, isSplashPending } from "@/lib/splashSignal";

interface StickyUnfoldProps {
  children: React.ReactNode;
  side?: "left" | "right";
  tiltVariation?: number; // e.g. -3 to +3 degrees
  delay?: number; // optional start delay in ms
  className?: string;
  style?: React.CSSProperties;
}

export default function StickyUnfold({
  children,
  side = "right",
  tiltVariation = 0,
  delay = 0,
  className = "",
  style = {},
}: StickyUnfoldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const paperWrapperRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const flapsRef = useRef<HTMLDivElement>(null);

  const isRight = side === "right";
  const hasTriggeredRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const paperEl = (container.querySelector("[data-unfold-paper]") ||
      container.firstElementChild) as HTMLElement | null;
    const tapeEl = (container.querySelector("[data-unfold-tape]") ||
      container.querySelector('[data-name="Container"].bg-\\[\\#ffd54f\\]') ||
      container.querySelector(".bg-\\[\\#ffd54f\\]")) as HTMLElement | null;
    const photoEl = container.querySelector("[data-unfold-photo], [data-name^='image']") as HTMLElement | null;
    const sparkEl = sparkRef.current;
    const flapsEl = flapsRef.current;
    const wrapperEl = paperWrapperRef.current;

    // Helper to force final visible state (failsafe against any interruption or stall)
    const forceComplete = () => {
      if (sparkEl) sparkEl.style.display = "none";
      if (flapsEl) flapsEl.style.display = "none";
      if (wrapperEl) wrapperEl.style.opacity = "1";
      if (paperEl) {
        paperEl.style.opacity = "";
        paperEl.style.transform = "";
        paperEl.style.clipPath = "";
        paperEl.style.willChange = "";
      }
      if (tapeEl) {
        tapeEl.style.opacity = "";
        tapeEl.style.transform = "";
        tapeEl.style.willChange = "";
      }
      if (photoEl) {
        photoEl.style.opacity = "";
        photoEl.style.transform = "";
        photoEl.style.willChange = "";
      }
      charSpans.forEach((span) => {
        span.style.color = "inherit";
      });
    };

    // Prepare characters for typewriter effect idempotently.
    // Progressive enhancement: all characters start VISIBLE (color: inherit).
    const charSpans: HTMLElement[] = [];
    const textEls = container.querySelectorAll("[data-unfold-text], p");
    textEls.forEach((textEl) => {
      const el = textEl as HTMLElement;

      // Idempotency: if already split on a previous render, reuse existing .unfold-char spans
      if (el.getAttribute("data-chars-split") === "true") {
        const existingSpans = Array.from(el.querySelectorAll<HTMLElement>(".unfold-char"));
        existingSpans.forEach((span) => {
          span.style.color = "inherit"; // ensure visible by default
          charSpans.push(span);
        });
        return;
      }

      if (!el.getAttribute("aria-label")) {
        el.setAttribute("aria-label", el.textContent || "");
      }

      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];
      let currentNode = walker.nextNode();
      while (currentNode) {
        textNodes.push(currentNode as Text);
        currentNode = walker.nextNode();
      }

      textNodes.forEach((node) => {
        const text = node.nodeValue || "";
        if (!text) return;
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < text.length; i++) {
          const span = document.createElement("span");
          span.className = "unfold-char";
          span.textContent = text[i];
          // Progressive enhancement: start VISIBLE so text is never permanently lost
          span.style.color = "inherit";
          span.style.display = "inline";
          span.setAttribute("aria-hidden", "true");
          fragment.appendChild(span);
          charSpans.push(span);
        }
        node.parentNode?.replaceChild(fragment, node);
      });

      el.setAttribute("data-chars-split", "true");
    });

    // If container is hidden (e.g. mobile duplicate on desktop via display: none), skip animation
    if (container.offsetParent === null) {
      forceComplete();
      return;
    }

    // Check prefers-reduced-motion: respect accessibility and reveal immediately
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      forceComplete();
      hasTriggeredRef.current = true;
      return;
    }

    let safetyTimer: NodeJS.Timeout | null = null;

    // Helper to start the animation (fast 0.65s timeline)
    const startAnimation = async () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;

      // If on home page with splash active, wait for it; otherwise resolve immediately
      if (isSplashPending()) {
        await onSplashDone();
      }

      // Check if user already scrolled past the card (e.g. fast scrolling down)
      const currentRect = container.getBoundingClientRect();
      if (currentRect.bottom < 0) {
        forceComplete();
        return;
      }

      // Arm typewriter characters: now that animation actively runs, hide them so they type out
      charSpans.forEach((s) => {
        s.style.color = "transparent";
      });

      // Safety fallback: force all text visible after 1.2s to guarantee no permanent blank state
      safetyTimer = setTimeout(() => {
        forceComplete();
      }, 1200);

      // Fast, snappy timeline (~0.65s total, 2x faster than old 1.3s timeline)
      const DURATION_SPARK = 140;
      const START_FOLD = 0;
      const START_UNFOLD = 70;
      const END_UNFOLD = 400;
      const START_WRITE = 300;
      const END_WRITE = 540;
      const START_TAPE = 440;
      const TOTAL_DURATION = 650;

      const swooshPath = sparkEl?.querySelector(".unfold-swoosh") as SVGPathElement | null;
      const dropletsGroup = sparkEl?.querySelector(".unfold-droplets") as SVGGElement | null;

      // Direction-aware values
      const foldOrigin = isRight ? "85% 50%" : "15% 50%";
      const initialFoldTilt = isRight ? (-35 + tiltVariation) : (35 - tiltVariation);

      // Initially reveal wrapper and prepare paper, tape, photo
      if (wrapperEl) {
        wrapperEl.style.opacity = "1";
      }
      if (sparkEl) {
        sparkEl.style.opacity = "1";
      }
      if (paperEl) {
        paperEl.style.opacity = "0";
        paperEl.style.willChange = "transform, opacity";
        paperEl.style.transformOrigin = foldOrigin;
      }
      if (tapeEl) {
        tapeEl.style.opacity = "0";
        tapeEl.style.transform = "translateY(-10px)";
        tapeEl.style.willChange = "transform, opacity";
      }
      if (photoEl) {
        photoEl.style.opacity = "0";
        photoEl.style.transform = "scale(0.9)";
        photoEl.style.willChange = "transform, opacity";
      }

      if (flapsEl) {
        flapsEl.style.transformOrigin = foldOrigin;
      }

      let lastRevealedIndex = -1;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = Math.max(0, now - startTime);

        // 1. SPARK PHASE (0 to 140ms, fades by 300ms)
        if (sparkEl) {
          if (elapsed < DURATION_SPARK) {
            const p = Math.min(1, elapsed / DURATION_SPARK);
            const easeP = 1 - Math.pow(1 - p, 3);
            if (swooshPath) {
              swooshPath.style.strokeDashoffset = String(130 * (1 - easeP));
            }
            if (dropletsGroup) {
              const dropScale = p < 0.7 ? (p / 0.7) * 1.15 : 1.15 - ((p - 0.7) / 0.3) * 0.15;
              dropletsGroup.style.transform = `scale(${dropScale})`;
              dropletsGroup.style.opacity = String(Math.min(1, p * 2));
            }
          } else if (elapsed < START_UNFOLD) {
            if (swooshPath) swooshPath.style.strokeDashoffset = "0";
            if (dropletsGroup) {
              dropletsGroup.style.transform = "scale(1)";
              dropletsGroup.style.opacity = "1";
            }
          } else if (elapsed < START_WRITE) {
            const fadeP = (elapsed - START_UNFOLD) / (START_WRITE - START_UNFOLD);
            sparkEl.style.opacity = String(Math.max(0, 1 - fadeP));
            const driftX = isRight ? -12 * fadeP : 12 * fadeP;
            const baseFlip = isRight ? "" : "scaleX(-1)";
            sparkEl.style.transform = `translate(${driftX}px, ${-16 * fadeP}px) ${baseFlip}`.trim();
          } else {
            sparkEl.style.display = "none";
          }
        }

        // 2. FOLDED PLANE & UNFOLD (0ms to 400ms)
        if (paperEl) {
          if (elapsed < START_UNFOLD) {
            // Folded diamond appears immediately and rotates into place
            const appearP = Math.min(1, elapsed / 50);
            paperEl.style.opacity = String(appearP);
            paperEl.style.transform = `scale(0.45) rotate(${initialFoldTilt}deg)`;

            const diamondPoly = isRight
              ? "polygon(50% 8%, 92% 50%, 50% 92%, 8% 50%)"
              : "polygon(50% 8%, 8% 50%, 50% 92%, 92% 50%)";
            paperEl.style.clipPath = diamondPoly;

            if (flapsEl) {
              flapsEl.style.opacity = String(appearP);
              flapsEl.style.transform = `scale(0.45) rotate(${initialFoldTilt}deg)`;
            }
          } else if (elapsed < END_UNFOLD) {
            // Dynamic unfold with spring overshoot (70ms to 400ms)
            const unfoldP = (elapsed - START_UNFOLD) / (END_UNFOLD - START_UNFOLD);

            const c1 = 1.25;
            const c3 = c1 + 1;
            const easeP = 1 + c3 * Math.pow(unfoldP - 1, 3) + c1 * Math.pow(unfoldP - 1, 2);

            const currentScale = 0.45 + (1 - 0.45) * easeP;
            const currentRot = initialFoldTilt * (1 - easeP);

            paperEl.style.opacity = "1";
            paperEl.style.transform = `scale(${currentScale}) rotate(${currentRot}deg)`;

            // Polygon morphs smoothly to full rectangle
            const r1x = 50 * (1 - unfoldP);
            const r1y = 8 * (1 - unfoldP);
            const r2x = 92 + (100 - 92) * unfoldP;
            const r2y = 50 * (1 - unfoldP);
            const r3x = 50 + (100 - 50) * unfoldP;
            const r3y = 92 + (100 - 92) * unfoldP;
            const r4x = 8 * (1 - unfoldP);
            const r4y = 50 + (100 - 50) * unfoldP;

            const p1x = isRight ? r1x : 100 - r1x;
            const p1y = r1y;
            const p2x = isRight ? r2x : 100 - r2x;
            const p2y = r2y;
            const p3x = isRight ? r3x : 100 - r3x;
            const p3y = r3y;
            const p4x = isRight ? r4x : 100 - r4x;
            const p4y = r4y;

            paperEl.style.clipPath = `polygon(${p1x}% ${p1y}%, ${p2x}% ${p2y}%, ${p3x}% ${p3y}%, ${p4x}% ${p4y}%)`;

            // Flaps fade smoothly as paper unfolds
            if (flapsEl) {
              const flapFadeP = Math.min(1, unfoldP * 1.5);
              flapsEl.style.opacity = String(Math.max(0, 1 - flapFadeP));
              flapsEl.style.transform = `scale(${currentScale}) rotate(${currentRot}deg)`;
            }
          } else {
            // Fully unfolded
            paperEl.style.opacity = "1";
            paperEl.style.transform = "none";
            paperEl.style.clipPath = "none";
            if (flapsEl) flapsEl.style.display = "none";
          }
        }

        // 3. WRITE & PHOTO PHASE (300ms to 540ms)
        if (elapsed >= START_WRITE && charSpans.length > 0) {
          const writeP = Math.min(1, (elapsed - START_WRITE) / (END_WRITE - START_WRITE));
          const targetIndex = Math.min(charSpans.length - 1, Math.floor(writeP * charSpans.length));
          if (targetIndex > lastRevealedIndex) {
            for (let i = lastRevealedIndex + 1; i <= targetIndex; i++) {
              charSpans[i].style.color = "inherit";
            }
            lastRevealedIndex = targetIndex;
          }
        }

        if (photoEl) {
          if (elapsed < START_WRITE) {
            photoEl.style.opacity = "0";
            photoEl.style.transform = "scale(0.9)";
          } else {
            const photoP = Math.min(1, (elapsed - START_WRITE) / (END_WRITE - START_WRITE));
            const easePhoto = 1 - Math.pow(1 - photoP, 2);
            photoEl.style.opacity = String(photoP);
            photoEl.style.transform = `scale(${0.9 + 0.1 * easePhoto})`;
          }
        }

        // 4. TAPE STAMP (440ms to 620ms)
        if (tapeEl) {
          if (elapsed < START_TAPE) {
            tapeEl.style.opacity = "0";
            tapeEl.style.transform = "translateY(-10px)";
          } else {
            const tapeP = Math.min(1, (elapsed - START_TAPE) / (TOTAL_DURATION - START_TAPE));
            const easeTape = 1 - Math.pow(1 - tapeP, 3);
            tapeEl.style.opacity = "1";
            tapeEl.style.transform = `translateY(${-10 * (1 - easeTape)}px)`;
          }
        }

        // Continue animation or complete
        if (elapsed < TOTAL_DURATION) {
          animFrameRef.current = requestAnimationFrame(tick);
        } else {
          if (safetyTimer) clearTimeout(safetyTimer);
          forceComplete();
        }
      };

      animFrameRef.current = requestAnimationFrame(tick);
    };

    let observer: IntersectionObserver | null = null;

    // Check viewport on next frame
    // Trigger early: 200px before the card enters the viewport so animation is ready or finished on screen
    const initFrame = requestAnimationFrame(() => {
      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight || document.documentElement.clientHeight;
      const triggerThreshold = windowH + 200; // 200px before bottom edge of viewport
      const inView = rect.top < triggerThreshold && rect.bottom > -200;

      if (inView) {
        startAnimation();
      } else {
        observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.isIntersecting) {
                startAnimation();
                observer?.disconnect();
                break;
              }
            }
          },
          {
            rootMargin: "200px 0px 200px 0px", // Trigger 200px before entering viewport
          }
        );

        observer.observe(container);
      }
    });

    return () => {
      cancelAnimationFrame(initFrame);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      if (safetyTimer) clearTimeout(safetyTimer);
      if (observer) observer.disconnect();
      forceComplete();
      hasTriggeredRef.current = false;
    };
  }, [delay, tiltVariation, isRight]);

  return (
    <div
      ref={containerRef}
      className={`relative size-full ${className}`}
      style={style}
      data-side={side}
    >
      {/* Spark Overlay (Swoosh + Droplets) */}
      <div
        ref={sparkRef}
        className={`absolute ${
          isRight ? "-left-[10%]" : "-right-[10%]"
        } -top-[20%] w-[55%] h-[55%] pointer-events-none z-30 overflow-visible`}
        style={{
          opacity: 0,
          transformOrigin: "center center",
          transform: isRight ? "none" : "scaleX(-1)",
        }}
      >
        <svg
          viewBox="0 0 140 100"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Swoosh stroke */}
          <path
            className="unfold-swoosh"
            d="M 15 65 C 28 18, 75 14, 105 35"
            stroke="#dad1ff"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="130"
            strokeDashoffset="130"
          />
          {/* Droplets group */}
          <g
            className="unfold-droplets"
            style={{
              transformOrigin: "115px 35px",
              transform: "scale(0)",
              opacity: 0,
            }}
          >
            {/* Curved dash 1 */}
            <path
              d="M 112 24 C 118 28, 122 34, 124 42"
              stroke="#dad1ff"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Curved dash 2 */}
            <path
              d="M 102 12 C 107 14, 111 18, 113 24"
              stroke="#dad1ff"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Droplet dot */}
            <circle cx="128" cy="50" r="3.5" fill="#dad1ff" />
          </g>
        </svg>
      </div>

      {/* Main Container Wrapper - Visible by default (progressive enhancement) */}
      <div
        ref={paperWrapperRef}
        className="relative size-full"
        style={{ opacity: 1 }}
      >
        {/* Folded Flaps Overlay */}
        <div
          ref={flapsRef}
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            opacity: 0,
            transformOrigin: isRight ? "85% 50%" : "15% 50%",
          }}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full overflow-visible"
          >
            {/* Flap 1: Upper flap in #dad1ff */}
            <polygon
              points={isRight ? "50,8 8,50 24,18" : "50,8 92,50 76,18"}
              fill="#dad1ff"
              opacity="0.95"
            />
            {/* Flap 2: Lower flap in #dad1ff */}
            <polygon
              points={isRight ? "92,50 50,92 84,84" : "8,50 50,92 16,84"}
              fill="#dad1ff"
              opacity="0.95"
            />
            {/* Dotted perforation line on the lower flap */}
            <line
              x1={isRight ? "92" : "8"}
              y1="50"
              x2="50"
              y2="92"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeDasharray="2.5 2.5"
            />
          </svg>
        </div>

        {/* Children (Paper note & tape) */}
        {children}
      </div>
    </div>
  );
}
