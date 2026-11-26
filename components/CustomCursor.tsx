"use client";

import React, { useEffect, useRef, useState } from "react";
import { resolveCursorLabel } from "@/lib/cursorLabels";

class CustomCursorErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.warn("CustomCursor Error caught by ErrorBoundary:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default function CustomCursor() {
  return (
    <CustomCursorErrorBoundary>
      <CustomCursorInner />
    </CustomCursorErrorBoundary>
  );
}

function CustomCursorInner() {
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [isPinkTheme, setIsPinkTheme] = useState(false);
  const isPinkThemeRef = useRef(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // 1. Device check: only enable on devices with hover and fine pointer (real mouse)
    const hasFinePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!hasFinePointer) {
      return;
    }

    setEnabled(true);
    setMounted(true);
    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  useEffect(() => {
    if (!enabled || !containerRef.current || !arrowRef.current || !badgeRef.current || !textRef.current) {
      return;
    }

    const arrowEl = arrowRef.current;
    const badgeEl = badgeRef.current;
    const textEl = textRef.current;

    // Prefers-reduced-motion
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mqMotion.matches;
    const onMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mqMotion.addEventListener("change", onMotionChange);

    // Responsive scale (< 1024px -> 0.85)
    let responsiveScale = window.innerWidth < 1024 ? 0.85 : 1.0;
    const onResize = () => {
      responsiveScale = window.innerWidth < 1024 ? 0.85 : 1.0;
      wakeLoop();
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Target positions and current lerped positions
    let targetX = -100;
    let targetY = -100;
    let arrowX = -100;
    let arrowY = -100;
    let badgeX = -100;
    let badgeY = -100;

    // Exact Figma offsets (from arrow tip hotspot (0, 0) to label top-left corner)
    const BASE_OFFSET_X = 39;
    const BASE_OFFSET_Y = 37;
    let badgeOffsetX = BASE_OFFSET_X;
    let badgeOffsetY = BASE_OFFSET_Y;

    // Interactive scale states
    let isHoveringInteractive = false;
    let isMouseDown = false;
    let arrowTargetScale = 1.0;
    let currentArrowScale = 1.0;
    let badgeTargetScale = 1.0;
    let currentBadgeScale = 1.0;

    // Badge enter/exit animation
    let badgeTargetOpacity = 0;
    let currentBadgeOpacity = 0;
    let badgeTargetEnterScale = 0.85;
    let currentBadgeEnterScale = 0.85;

    // Visibility
    let isPointerInWindow = false;
    let isOverInput = false;

    // Loop management
    let isRunning = false;
    let rafId: number | null = null;

    // Text label state & crossfade
    let currentLabelText = "";
    let activeLabelElement: HTMLElement | null = null;
    let textFadeTimeout: NodeJS.Timeout | null = null;
    let isOverCompanionsSection = false;

    function wakeLoop() {
      if (!isRunning && isPointerInWindow) {
        isRunning = true;
        rafId = requestAnimationFrame(tick);
      }
    }

    function updateLabel(text: string | null) {
      if (text && text.trim().length > 0) {
        const trimmed = text.trim();
        if (trimmed !== currentLabelText) {
          if (currentBadgeOpacity > 0.1) {
            // Crossfade text in ~100ms
            textEl.style.opacity = "0";
            if (textFadeTimeout) clearTimeout(textFadeTimeout);
            textFadeTimeout = setTimeout(() => {
              textEl.textContent = trimmed;
              textEl.style.opacity = "1";
            }, 50);
          } else {
            // First show
            textEl.textContent = trimmed;
            textEl.style.opacity = "1";
          }
          currentLabelText = trimmed;
        }
        badgeTargetOpacity = 1;
        badgeTargetEnterScale = 1;
      } else {
        badgeTargetOpacity = 0;
        badgeTargetEnterScale = 0.85;
        currentLabelText = "";
      }
      wakeLoop();
    }

    // MutationObserver to watch active element's attributes (e.g. data-state, data-cursor)
    const observer = new MutationObserver(() => {
      if (activeLabelElement && document.body.contains(activeLabelElement)) {
        const newLabel = resolveCursorLabel(activeLabelElement);
        updateLabel(newLabel);
      }
    });

    function setTrackedElement(el: HTMLElement | null) {
      if (activeLabelElement === el) return;
      observer.disconnect();
      activeLabelElement = el;
      if (el) {
        observer.observe(el, {
          attributes: true,
          attributeFilter: ["data-state", "data-cursor", "data-cursor-key", "aria-pressed", "data-physics-dragging", "data-holding"],
        });
      }
    }

    // Document-level mutation observer to track global data-physics-dragging and data-nav-holding
    const docObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "data-physics-dragging") {
          const isDragging = document.documentElement.hasAttribute("data-physics-dragging");
          if (isDragging) {
            updateLabel("Got you!");
          } else if (activeLabelElement) {
            updateLabel(resolveCursorLabel(activeLabelElement));
          } else {
            updateLabel(null);
          }
        } else if (m.attributeName === "data-nav-holding") {
          const isNavHolding = document.documentElement.hasAttribute("data-nav-holding");
          if (isNavHolding) {
            updateLabel("Wheee!");
          } else if (activeLabelElement) {
            updateLabel(resolveCursorLabel(activeLabelElement));
          } else {
            updateLabel(null);
          }
        } else if (m.attributeName === "data-modal-open") {
          const isModalOpen = document.documentElement.hasAttribute("data-modal-open");
          if (isModalOpen) {
            setTrackedElement(null);
            updateLabel(null);
          } else if (activeLabelElement) {
            updateLabel(resolveCursorLabel(activeLabelElement));
          } else {
            updateLabel(null);
          }
        }
      }
    });
    docObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-physics-dragging", "data-nav-holding", "data-modal-open"],
    });

    // ─── Tick Loop ─────────────────────────────────────────────────────────────
    function tick() {
      const arrowLerp = prefersReducedMotion ? 1 : 0.4;
      const badgeLerp = prefersReducedMotion ? 1 : 0.2;

      arrowX += (targetX - arrowX) * arrowLerp;
      arrowY += (targetY - arrowY) * arrowLerp;

      // Scale offset proportionally with current scale & responsive scale
      const scaleMultiplier = currentArrowScale * responsiveScale;
      const effOffsetX = badgeOffsetX * scaleMultiplier;
      const effOffsetY = badgeOffsetY * scaleMultiplier;

      const badgeW = (badgeEl.offsetWidth || 182) * responsiveScale;
      const badgeH = (badgeEl.offsetHeight || 53) * responsiveScale;

      let badgeTargetX = targetX + effOffsetX;
      let badgeTargetY = targetY + effOffsetY;

      // Viewport Edge Containment: keep badge cleanly within the visible viewport with 16px margins
      const maxBadgeX = window.innerWidth - badgeW - 16;
      const minBadgeX = 16;
      const maxBadgeY = window.innerHeight - badgeH - 16;
      const minBadgeY = 16;

      if (badgeTargetX > maxBadgeX) {
        badgeTargetX = maxBadgeX;
      }
      if (badgeTargetX < minBadgeX) {
        badgeTargetX = minBadgeX;
      }
      if (badgeTargetY > maxBadgeY) {
        badgeTargetY = Math.max(minBadgeY, targetY - badgeH - 12);
      }
      if (badgeTargetY < minBadgeY) {
        badgeTargetY = minBadgeY;
      }

      badgeX += (badgeTargetX - badgeX) * badgeLerp;
      badgeY += (badgeTargetY - badgeY) * badgeLerp;

      function checkCompanionsHit() {
        if (!isPointerInWindow) return;
        if (document.documentElement.hasAttribute("data-physics-dragging")) {
          if (currentLabelText !== "Got you!") {
            updateLabel("Got you!");
          }
        } else {
          const hit = document.elementFromPoint(targetX, targetY) as HTMLElement | null;
          const iconEl = hit?.closest("[data-cursor-key^='tool-']") as HTMLElement | null;
          if (iconEl && iconEl.getAttribute("data-cursor-key") !== "tool-heading") {
            if (activeLabelElement !== iconEl) {
              setTrackedElement(iconEl);
              updateLabel(resolveCursorLabel(iconEl));
            }
          } else if (activeLabelElement && activeLabelElement.getAttribute("data-cursor-key")?.startsWith("tool-")) {
            setTrackedElement(null);
            updateLabel(null);
          }
        }
      }
      (window as any).__checkCursorUnderPoint = checkCompanionsHit;

      // While pointer is over the companions section, re-evaluate element under point
      if (isOverCompanionsSection && isPointerInWindow) {
        checkCompanionsHit();
      }

      // Calculate scales
      let effArrowTarget = arrowTargetScale;
      let effBadgeTarget = badgeTargetScale;
      if (prefersReducedMotion) {
        effArrowTarget = 1.0;
        effBadgeTarget = 1.0;
      }

      currentArrowScale += (effArrowTarget - currentArrowScale) * 0.35;
      currentBadgeScale += (effBadgeTarget - currentBadgeScale) * 0.35;
      currentBadgeEnterScale += (badgeTargetEnterScale - currentBadgeEnterScale) * 0.35;
      currentBadgeOpacity += (badgeTargetOpacity - currentBadgeOpacity) * 0.35;

      // Apply transforms
      const totalArrowScale = currentArrowScale * responsiveScale;
      const totalBadgeScale = currentBadgeEnterScale * currentBadgeScale * responsiveScale;

      arrowEl.style.transform = `translate3d(${arrowX.toFixed(2)}px, ${arrowY.toFixed(2)}px, 0) scale(${totalArrowScale.toFixed(3)})`;
      badgeEl.style.transform = `translate3d(${badgeX.toFixed(2)}px, ${badgeY.toFixed(2)}px, 0) scale(${totalBadgeScale.toFixed(3)})`;
      badgeEl.style.opacity = currentBadgeOpacity.toFixed(3);

      // Check if idle
      const distArrow = Math.hypot(targetX - arrowX, targetY - arrowY);
      const distBadge = Math.hypot(badgeTargetX - badgeX, badgeTargetY - badgeY);
      const scaleDiff =
        Math.abs(effArrowTarget - currentArrowScale) +
        Math.abs(badgeTargetEnterScale - currentBadgeEnterScale) +
        Math.abs(badgeTargetOpacity - currentBadgeOpacity);

      if (distArrow < 0.05 && distBadge < 0.05 && scaleDiff < 0.005) {
        // Snap
        arrowX = targetX;
        arrowY = targetY;
        badgeX = badgeTargetX;
        badgeY = badgeTargetY;
        currentArrowScale = effArrowTarget;
        currentBadgeEnterScale = badgeTargetEnterScale;
        currentBadgeOpacity = badgeTargetOpacity;

        arrowEl.style.transform = `translate3d(${arrowX.toFixed(2)}px, ${arrowY.toFixed(2)}px, 0) scale(${totalArrowScale.toFixed(3)})`;
        badgeEl.style.transform = `translate3d(${badgeX.toFixed(2)}px, ${badgeY.toFixed(2)}px, 0) scale(${totalBadgeScale.toFixed(3)})`;
        badgeEl.style.opacity = currentBadgeOpacity.toFixed(3);

        isRunning = false;
        rafId = null;
        return;
      }

      rafId = requestAnimationFrame(tick);
    }

    // ─── Pointer Event Handlers ────────────────────────────────────────────────
    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isPointerInWindow) {
        isPointerInWindow = true;
        arrowX = targetX;
        arrowY = targetY;
        badgeX = targetX + badgeOffsetX;
        badgeY = targetY + badgeOffsetY;
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const companionsSection = target.closest(
        "[data-node-id='169:859'], [data-node-id='163:619'], [aria-label*='companions']"
      );
      isOverCompanionsSection = !!companionsSection;

      // 1. Text input / iframe check: show native I-beam, hide custom cursor
      const textInput = target.closest("input, textarea, select, [contenteditable], iframe");
      if (textInput) {
        isOverInput = true;
        arrowEl.style.opacity = "0";
        badgeTargetOpacity = 0;
        badgeTargetEnterScale = 0.85;
        wakeLoop();
        return;
      } else {
        if (isOverInput) {
          isOverInput = false;
        }
        arrowEl.style.opacity = "1";
      }

      // 2. Interactive hover check (links and buttons grow slightly: scale 1.1)
      const interactive = target.closest("a, button, [role='button']:not([data-cursor-key='hero-portrait']), input[type='submit'], input[type='button']");
      isHoveringInteractive = !!interactive;
      arrowTargetScale = isHoveringInteractive ? 1.1 : 1.0;
      if (isMouseDown) {
        arrowTargetScale *= 0.9;
      }

      // Cursor theme check: project cards use high-contrast pink variant from Hero
      const isPinkTarget = !!target.closest("[data-cursor-theme='pink'], [data-cursor-key^='project-']");
      if (isPinkTarget !== isPinkThemeRef.current) {
        isPinkThemeRef.current = isPinkTarget;
        setIsPinkTheme(isPinkTarget);
      }

      // 3. Label resolution by event delegation (data-cursor-key or data-cursor)
      if (document.documentElement.hasAttribute("data-modal-open")) {
        setTrackedElement(null);
        updateLabel(null);
      } else if (document.documentElement.hasAttribute("data-physics-dragging")) {
        updateLabel("Got you!");
      } else if (document.documentElement.hasAttribute("data-nav-holding")) {
        updateLabel("Wheee!");
      } else {
        const labelled = target.closest("[data-cursor-key], [data-cursor]") as HTMLElement | null;
        if (labelled) {
          setTrackedElement(labelled);
          const label = resolveCursorLabel(labelled);
          updateLabel(label);
        } else {
          setTrackedElement(null);
          updateLabel(null);
        }
      }

      // 4. Viewport Edge Handling (smooth edge containment)
      const badgeW = badgeEl.offsetWidth || 182;
      const badgeH = badgeEl.offsetHeight || 53;

      // Only flip to the left if the cursor is at the extreme edge where clamping would place the badge behind the cursor
      if (targetX > window.innerWidth - 48) {
        badgeOffsetX = -(badgeW + 8);
        badgeOffsetY = 8;
      } else {
        badgeOffsetX = BASE_OFFSET_X;
        badgeOffsetY = BASE_OFFSET_Y;
      }

      wakeLoop();
    };

    const onPointerDown = () => {
      isMouseDown = true;
      arrowTargetScale = (isHoveringInteractive ? 1.1 : 1.0) * 0.9;
      badgeTargetScale = 0.95;
      wakeLoop();
    };

    const onPointerUp = () => {
      isMouseDown = false;
      arrowTargetScale = isHoveringInteractive ? 1.1 : 1.0;
      badgeTargetScale = 1.0;
      wakeLoop();
    };

    const onMouseLeaveDoc = () => {
      isPointerInWindow = false;
      arrowEl.style.opacity = "0";
      badgeTargetOpacity = 0;
      badgeTargetEnterScale = 0.85;
      if (isPinkThemeRef.current) {
        isPinkThemeRef.current = false;
        setIsPinkTheme(false);
      }
      wakeLoop();
    };

    const onMouseEnterDoc = () => {
      isPointerInWindow = true;
      if (!isOverInput) {
        arrowEl.style.opacity = "1";
      }
      wakeLoop();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeaveDoc);
    document.addEventListener("mouseenter", onMouseEnterDoc);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (textFadeTimeout) clearTimeout(textFadeTimeout);
      observer.disconnect();
      docObserver.disconnect();
      mqMotion.removeEventListener("change", onMotionChange);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("mouseleave", onMouseLeaveDoc);
      document.removeEventListener("mouseenter", onMouseEnterDoc);
      delete (window as any).__checkCursorUnderPoint;
    };
  }, [enabled]);

  if (!mounted || !enabled) {
    return null;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          :root {
            --cursor-fill: #65ff6c;
            --cursor-outline: #ffffff;
            --cursor-outline-width: 4.539px;
            --cursor-radius: 9.078px;
            --cursor-shadow: 0px 3.631px 9.078px 0px rgba(0, 0, 0, 0.25);
            --cursor-label-text: #000000;
            --cursor-font-family: 'Architects Daughter', cursive, sans-serif;
            --cursor-font-size: 18.156px;
            --cursor-line-height: 25.114px;
            --cursor-label-offset-x: 39px;
            --cursor-label-offset-y: 37px;
          }
          html.custom-cursor-active,
          html.custom-cursor-active * {
            cursor: none !important;
          }
          html.custom-cursor-active input,
          html.custom-cursor-active textarea,
          html.custom-cursor-active [contenteditable],
          html.custom-cursor-active [contenteditable] * {
            cursor: text !important;
          }
          html.custom-cursor-active select {
            cursor: default !important;
          }
        `,
      }} />

      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden"
        aria-hidden="true"
      >
        {/* =====================================================================
            1. BADGE BUBBLE (Exact Figma node 584:918 & 584:921, dynamically adapts
            to Hero Pink #ee3f64 on project cards with high-contrast readable text)
            ===================================================================== */}
        <div
          ref={badgeRef}
          data-cursor-badge
          className="absolute left-0 top-0 pointer-events-none will-change-transform opacity-0 origin-top-left z-[10]"
        >
          <div
            className="inline-flex items-center justify-center select-none transition-colors duration-150 ease-in-out"
            style={{
              backgroundColor: isPinkTheme ? "#EE3F64" : "var(--cursor-fill)",
              borderWidth: "var(--cursor-outline-width)",
              borderStyle: "solid",
              borderColor: "var(--cursor-outline)",
              borderRadius: "var(--cursor-radius)",
              boxShadow: isPinkTheme
                ? "0px 3.631px 12px 0px rgba(0, 0, 0, 0.45)"
                : "var(--cursor-shadow)",
              padding: "0 14px",
              minHeight: "53px",
              maxWidth: "320px",
              boxSizing: "border-box",
            }}
          >
            <span
              ref={textRef}
              data-cursor-text
              className="block select-none text-center transition-colors duration-150 ease-in-out whitespace-nowrap"
              style={{
                fontFamily: "var(--cursor-font-family)",
                fontSize: "var(--cursor-font-size)",
                lineHeight: "var(--cursor-line-height)",
                color: isPinkTheme ? "#000000" : "var(--cursor-label-text)",
                fontWeight: 400,
              }}
            />
          </div>
        </div>

        {/* =====================================================================
            2. ARROW (Green #65FF6C default, switches smoothly to Hero Pink #EE3F64
            over project cards with 150ms crossfade, matching Figma Hero).
            Tip hotspot lands exactly at (0, 0).
            Z-order: z-[20], above badge.
            ===================================================================== */}
        <div
          ref={arrowRef}
          data-cursor-arrow
          className="absolute left-0 top-0 pointer-events-none will-change-transform opacity-0 z-[20]"
          style={{
            width: "49.81px",
            height: "50.86px",
            transformOrigin: "0 0",
          }}
        >
          <div
            className="absolute pointer-events-none origin-center"
            style={{
              left: "0px",
              top: "-1px",
              width: "49.81px",
              height: "50.86px",
              transform: "scaleX(-1)",
            }}
          >
            {/* Default Green Arrow */}
            <img
              src="/assets/cursor-arrow-green.svg"
              alt=""
              className="absolute pointer-events-none block max-w-none transition-opacity duration-150 ease-in-out"
              style={{
                left: "-18.23%",
                top: "-10.71%",
                width: "calc(100% + 36.46%)",
                height: "calc(100% + 35.7%)",
                opacity: isPinkTheme ? 0 : 1,
              }}
              draggable={false}
            />
            {/* Hero Pink Arrow (High Contrast on Dark/Purple Cards) */}
            <img
              src="/assets/cursor-arrow-pink.svg"
              alt=""
              className="absolute pointer-events-none block max-w-none transition-opacity duration-150 ease-in-out"
              style={{
                left: "-18.23%",
                top: "-10.71%",
                width: "calc(100% + 36.46%)",
                height: "calc(100% + 35.7%)",
                opacity: isPinkTheme ? 1 : 0,
              }}
              draggable={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}
