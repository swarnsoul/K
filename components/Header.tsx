"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { onSplashDone } from "@/lib/splashSignal";

interface PendulumItem {
  angle: number;             // radians
  velocity: number;          // rad/s
  secondaryAngle: number;    // radians (icon trailing string)
  secondaryVelocity: number; // rad/s
  isDragging: boolean;
  pointerId: number | null;
  dragStartX: number;
  dragStartY: number;
  hasMovedPastThreshold: boolean;
  targetAngle: number;
  // Parameters
  stiffness: number;
  damping: number;
  windPeriod: number;
  windAmp: number;
  windPhase: number;
  pivotLocalX: number;
  pivotLocalY: number;
}

/**
 * Gold rail with two hanging hooks and swaying & grabbable LinkedIn & Behance icons.
 * Continuous physical pendulum simulation:
 * - Idle sway: LinkedIn ~4.2s (±3°), Behance ~5.2s (±2.5°)
 * - Grab and swing with pointer / touch, release with flick momentum, calms down in ~5-6s
 * - String strictly attached to hook pivot at all times (deviation <= 1px)
 */
export function NavHangingUnit({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const armLinkedInRef = useRef<HTMLDivElement>(null);
  const armBehanceRef = useRef<HTMLDivElement>(null);
  const iconLinkedInRef = useRef<HTMLAnchorElement>(null);
  const iconBehanceRef = useRef<HTMLAnchorElement>(null);

  // Store simulation state in ref (frame-rate independent, zero React re-renders)
  const simRef = useRef<{
    linkedIn: PendulumItem;
    behance: PendulumItem;
    cachedRect: DOMRect | null;
    prefersReducedMotion: boolean;
  }>({
    linkedIn: {
      angle: 0,
      velocity: 0,
      secondaryAngle: 0,
      secondaryVelocity: 0,
      isDragging: false,
      pointerId: null,
      dragStartX: 0,
      dragStartY: 0,
      hasMovedPastThreshold: false,
      targetAngle: 0,
      stiffness: 8.0,
      damping: 0.90,
      windPeriod: 4.2,
      // Target amplitude 3.0 deg (0.05236 rad) with w_d = 2*PI/4.2
      windAmp: 0.3098,
      windPhase: 0.0,
      pivotLocalX: 34.5,
      pivotLocalY: 13.0,
    },
    behance: {
      angle: 0,
      velocity: 0,
      secondaryAngle: 0,
      secondaryVelocity: 0,
      isDragging: false,
      pointerId: null,
      dragStartX: 0,
      dragStartY: 0,
      hasMovedPastThreshold: false,
      targetAngle: 0,
      stiffness: 8.0,
      damping: 0.90,
      windPeriod: 5.2,
      // Target amplitude 2.5 deg (0.04363 rad) with w_d = 2*PI/5.2
      windAmp: 0.2892,
      windPhase: 1.8,
      pivotLocalX: 94.5,
      pivotLocalY: 15.0,
    },
    cachedRect: null,
    prefersReducedMotion: false,
  });

  useEffect(() => {
    const sim = simRef.current;
    const armLi = armLinkedInRef.current;
    const armBe = armBehanceRef.current;
    const iconLi = iconLinkedInRef.current;
    const iconBe = iconBehanceRef.current;
    const container = containerRef.current;

    if (!armLi || !armBe || !iconLi || !iconBe || !container) return;

    // Check prefers-reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    sim.prefersReducedMotion = mq.matches;
    const onMotionChange = (e: MediaQueryListEvent) => {
      sim.prefersReducedMotion = e.matches;
    };
    mq.addEventListener("change", onMotionChange);

    function updateRect() {
      if (container) {
        sim.cachedRect = container.getBoundingClientRect();
      }
    }
    updateRect();
    window.addEventListener("resize", updateRect, { passive: true });
    window.addEventListener("scroll", updateRect, { passive: true });

    let animId: number;
    let lastTime = performance.now();
    let simTime = 0;
    let accumulator = 0;
    const fixedDt = 1 / 120; // 120Hz physics sub-steps
    const MAX_DRAG_ANGLE = (80 * Math.PI) / 180; // clamp angle to +/- 80 deg

    function computeTargetAngle(item: PendulumItem, pointerX: number, pointerY: number) {
      if (!sim.cachedRect) return;
      const scale = sim.cachedRect.width / 129;
      const pivotScreenX = sim.cachedRect.left + item.pivotLocalX * scale;
      const pivotScreenY = sim.cachedRect.top + item.pivotLocalY * scale;

      const dx = pointerX - pivotScreenX;
      const dy = pointerY - pivotScreenY;

      // Math.max(0.1, dy) prevents flipping upside down if dragged above hook
      let target = Math.atan2(dx, Math.max(0.1, dy));
      item.targetAngle = Math.max(-MAX_DRAG_ANGLE, Math.min(MAX_DRAG_ANGLE, target));
    }

    function stepItem(item: PendulumItem) {
      // Wind torque (disabled under prefers-reduced-motion)
      const windTorque = sim.prefersReducedMotion
        ? 0
        : item.windAmp * Math.sin((2 * Math.PI * simTime) / item.windPeriod + item.windPhase);

      if (item.isDragging) {
        // Follow target angle with a light, natural spring
        const K_drag = 180;
        const D_drag = 20;
        const accel = K_drag * (item.targetAngle - item.angle) - D_drag * item.velocity;
        item.velocity += accel * fixedDt;
        item.angle += item.velocity * fixedDt;
        item.angle = Math.max(-MAX_DRAG_ANGLE, Math.min(MAX_DRAG_ANGLE, item.angle));
      } else {
        // Rigid pendulum equation: alpha = -stiffness * sin(theta) - damping * omega + windTorque
        const accel =
          -item.stiffness * Math.sin(item.angle) - item.damping * item.velocity + windTorque;
        item.velocity += accel * fixedDt;
        item.angle += item.velocity * fixedDt;
        item.angle = Math.max(-MAX_DRAG_ANGLE, Math.min(MAX_DRAG_ANGLE, item.angle));
      }

      // Secondary lag motion on icon (rotation about icon's top center driven by angular velocity)
      const K_sec = 120;
      const D_sec = 16;
      const C_lag = 0.75;
      const secAccel =
        -K_sec * item.secondaryAngle - D_sec * item.secondaryVelocity - C_lag * item.velocity;
      item.secondaryVelocity += secAccel * fixedDt;
      item.secondaryAngle += item.secondaryVelocity * fixedDt;
      const maxSec = (4 * Math.PI) / 180;
      item.secondaryAngle = Math.max(-maxSec, Math.min(maxSec, item.secondaryAngle));
    }

    let isStarted = false;
    onSplashDone().then(() => {
      isStarted = true;
      lastTime = performance.now();
    });

    function loop(now: number) {
      animId = requestAnimationFrame(loop);
      if (!isStarted) return;

      let dt = (now - lastTime) / 1000;
      lastTime = now;
      if (dt > 0.1) dt = 0.1; // clamp delta on tab switch or pause

      accumulator += dt;

      while (accumulator >= fixedDt) {
        accumulator -= fixedDt;
        simTime += fixedDt;

        stepItem(sim.linkedIn);
        stepItem(sim.behance);
      }

      // Render to DOM via direct style transforms
      if (!armLi || !iconLi || !armBe || !iconBe) return;
      const degLi = (sim.linkedIn.angle * 180) / Math.PI;
      const iconDegLi = (sim.linkedIn.secondaryAngle * 180) / Math.PI;
      armLi.style.transform = `rotate(${degLi.toFixed(3)}deg)`;
      iconLi.style.transform = `rotate(${iconDegLi.toFixed(3)}deg)`;

      const degBe = (sim.behance.angle * 180) / Math.PI;
      const iconDegBe = (sim.behance.secondaryAngle * 180) / Math.PI;
      armBe.style.transform = `rotate(${degBe.toFixed(3)}deg)`;
      iconBe.style.transform = `rotate(${iconDegBe.toFixed(3)}deg)`;
    }

    animId = requestAnimationFrame(loop);

    // Pause time delta when document visibility changes
    const onVisibilityChange = () => {
      lastTime = performance.now();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Native pointer interactions
    function startDrag(key: "linkedIn" | "behance", e: PointerEvent) {
      if (e.button !== 0) return;
      if (!armLi || !armBe || !iconLi || !iconBe) return;
      const item = sim[key];
      const arm = key === "linkedIn" ? armLi : armBe;
      const otherArm = key === "linkedIn" ? armBe : armLi;
      const icon = key === "linkedIn" ? iconLi : iconBe;

      updateRect();
      try {
        icon.setPointerCapture(e.pointerId);
      } catch (_) {}

      item.isDragging = true;
      item.pointerId = e.pointerId;
      item.dragStartX = e.clientX;
      item.dragStartY = e.clientY;
      item.hasMovedPastThreshold = false;

      arm.style.zIndex = "30";
      otherArm.style.zIndex = "10";

      computeTargetAngle(item, e.clientX, e.clientY);
    }

    function onPointerMove(e: PointerEvent) {
      if (!iconLi || !iconBe) return;
      (["linkedIn", "behance"] as const).forEach((key) => {
        const item = sim[key];
        const icon = key === "linkedIn" ? iconLi : iconBe;
        if (!item.isDragging || item.pointerId !== e.pointerId) return;

        const dist = Math.hypot(e.clientX - item.dragStartX, e.clientY - item.dragStartY);
        if (dist >= 5 && !item.hasMovedPastThreshold) {
          item.hasMovedPastThreshold = true;
          icon.setAttribute("data-state", "held");
          icon.setAttribute("data-holding", "true");
          document.documentElement.setAttribute("data-nav-holding", "true");
        }

        computeTargetAngle(item, e.clientX, e.clientY);
      });
    }

    function onPointerUp(e: PointerEvent) {
      if (!iconLi || !iconBe) return;
      (["linkedIn", "behance"] as const).forEach((key) => {
        const item = sim[key];
        const icon = key === "linkedIn" ? iconLi : iconBe;
        if (item.pointerId !== e.pointerId) return;

        item.isDragging = false;
        item.pointerId = null;
        item.velocity = Math.max(-12, Math.min(12, item.velocity));

        try {
          icon.releasePointerCapture(e.pointerId);
        } catch (_) {}

        icon.removeAttribute("data-state");
        icon.removeAttribute("data-holding");
        document.documentElement.removeAttribute("data-nav-holding");
      });
    }

    const onLiDown = (e: PointerEvent) => startDrag("linkedIn", e);
    const onBeDown = (e: PointerEvent) => startDrag("behance", e);
    const preventDrag = (e: DragEvent) => e.preventDefault();

    const onNativeClick = (key: "linkedIn" | "behance", e: MouseEvent) => {
      const item = sim[key];
      if (item.hasMovedPastThreshold) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        item.hasMovedPastThreshold = false;
      }
    };
    const onLiClick = (e: MouseEvent) => onNativeClick("linkedIn", e);
    const onBeClick = (e: MouseEvent) => onNativeClick("behance", e);

    iconLi.addEventListener("pointerdown", onLiDown);
    iconBe.addEventListener("pointerdown", onBeDown);
    iconLi.addEventListener("dragstart", preventDrag);
    iconBe.addEventListener("dragstart", preventDrag);
    iconLi.addEventListener("click", onLiClick, true);
    iconBe.addEventListener("click", onBeClick, true);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      mq.removeEventListener("change", onMotionChange);

      iconLi.removeEventListener("pointerdown", onLiDown);
      iconBe.removeEventListener("pointerdown", onBeDown);
      iconLi.removeEventListener("dragstart", preventDrag);
      iconBe.removeEventListener("dragstart", preventDrag);
      iconLi.removeEventListener("click", onLiClick, true);
      iconBe.removeEventListener("click", onBeClick, true);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  const handleClick = (
    key: "linkedIn" | "behance",
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    const item = simRef.current[key];
    if (item.hasMovedPastThreshold) {
      e.preventDefault();
      e.stopPropagation();
      item.hasMovedPastThreshold = false;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-[129px] h-[20px] shrink-0 overflow-visible select-none ${className}`}
      data-node-id="597:925"
    >
      {/* Gold rail (Rectangle 51) */}
      <div
        className="absolute left-0 top-0 w-[129px] h-[20px] bg-[#e3bf65] border border-[#3d2b0e] border-solid rounded-[20px] pointer-events-auto"
        data-node-id="597:917"
      />

      {/* Hooks (Frame 185, Polygon 1 & Polygon 2) */}
      <div
        className="absolute left-[1.5px] top-[2px] w-[126px] h-[16px] pointer-events-none"
        data-node-id="597:926"
      >
        <img
          alt=""
          className="block w-full h-full pointer-events-none"
          src="/assets/nav-hooks.svg"
        />
      </div>

      {/* LinkedIn Hanging Pendulum (String 1 + Icon) */}
      <div
        ref={armLinkedInRef}
        className="absolute left-[14.5px] top-[13px] w-[40px] h-[74px] pointer-events-auto nav-hanging-arm z-10"
        style={{ transformOrigin: "50% 0px" }}
      >
        {/* String 1 (Rectangle 52) */}
        <div
          className="absolute left-[19.5px] top-0 w-px h-[34px] bg-[#3d2b0e] rounded-[20px] pointer-events-none"
          data-node-id="597:932"
        />

        {/* LinkedIn Icon (image 18) */}
        <a
          ref={iconLinkedInRef}
          href="https://www.linkedin.com/in/kanakprajapati/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Kanak's LinkedIn profile"
          data-cursor-key="nav-linkedin"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          onClick={(e) => handleClick("linkedIn", e)}
          className="absolute left-0 top-[34px] w-[40px] h-[40px] rounded-[10px] shadow-[0px_4px_8px_rgba(0,0,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8364fc] cursor-grab active:cursor-grabbing touch-none select-none nav-hanging-icon block no-squiggle"
          style={{ transformOrigin: "50% 0px" }}
          data-node-id="597:940"
        >
          <img
            src="/assets/nav-linkedin.png"
            alt="LinkedIn"
            className="w-full h-full object-cover block pointer-events-none select-none"
            draggable={false}
          />
        </a>
      </div>

      {/* Behance Hanging Pendulum (String 2 + Icon) */}
      <div
        ref={armBehanceRef}
        className="absolute left-[74.5px] top-[15px] w-[40px] h-[72px] pointer-events-auto nav-hanging-arm z-10"
        style={{ transformOrigin: "50% 0px" }}
      >
        {/* String 2 (Rectangle 53) */}
        <div
          className="absolute left-[19.5px] top-0 w-px h-[32px] bg-[#3d2b0e] rounded-[20px] pointer-events-none"
          data-node-id="597:934"
        />

        {/* Behance Icon (Frame 184 / image 19) */}
        <a
          ref={iconBehanceRef}
          href="https://www.behance.net/swarnsoul"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Kanak's Behance portfolio"
          data-cursor-key="nav-behance"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          onClick={(e) => handleClick("behance", e)}
          className="absolute left-0 top-[32px] w-[40px] h-[40px] rounded-[10px] shadow-[0px_4px_8px_rgba(0,0,0,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8364fc] cursor-grab active:cursor-grabbing touch-none select-none nav-hanging-icon block no-squiggle"
          style={{ transformOrigin: "50% 0px" }}
          data-node-id="597:945"
        >
          <img
            src="/assets/nav-behance.png"
            alt="Behance"
            className="w-full h-full object-cover block pointer-events-none select-none"
            draggable={false}
          />
        </a>
      </div>
    </div>
  );
}

export function DesktopNavbarContent({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative w-[1088px] h-[58px] bg-white rounded-[20px] shadow-[0px_4px_5px_rgba(0,0,0,0.25)] flex items-center pointer-events-auto overflow-visible ${className}`}
      data-node-id="314:103"
    >
      {/* Logo */}
      <Link
        href="/"
        className="absolute left-[20px] top-[12.5px] w-[65px] h-[33px] shrink-0 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8364fc] rounded no-squiggle"
        data-node-id="314:104"
        data-cursor-key="nav-logo"
      >
        <img
          src="/assets/logo-nav-vectorized.svg"
          alt="Kanak Logo"
          className="w-full h-full object-contain block"
        />
      </Link>

      {/* Navigation Links */}
      <nav
        className="absolute left-[394.5px] top-[19px] w-[235px] h-[20px] flex items-center justify-between shrink-0"
        data-node-id="314:143"
      >
        <Link
          href="/#work"
          className="w-[42.78px] h-[20px] flex items-center justify-center font-['Almarena_Neue',sans-serif] text-[15px] leading-[20px] text-black text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8364fc] rounded link-squiggle"
          data-node-id="314:144"
          data-cursor-key="nav-work"
        >
          Work
        </Link>
        <a
          href="/Kanak-Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[57.38px] h-[20px] flex items-center justify-center font-['Almarena_Neue',sans-serif] text-[15px] leading-[20px] text-black text-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8364fc] rounded link-squiggle"
          data-node-id="314:145"
          data-cursor-key="nav-resume"
        >
          Resume
        </a>
        <Link
          href="/about"
          className="w-[43.38px] h-[20px] flex items-center justify-center font-['Almarena_Neue',sans-serif] text-[15px] leading-[20px] text-black text-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8364fc] rounded link-squiggle"
          data-node-id="314:146"
          data-cursor-key="nav-about"
        >
          About
        </Link>
        <Link
          href="/#contact"
          className="w-[57.38px] h-[20px] flex items-center justify-center font-['Almarena_Neue',sans-serif] text-[15px] leading-[20px] text-black text-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8364fc] rounded link-squiggle"
          data-node-id="314:147"
          data-cursor-key="nav-contact"
        >
          Contact
        </Link>
      </nav>

      {/* Frame 185: Gold Rail + Swaying & Grabbable Hanging Icons */}
      <div className="absolute left-[939px] top-[19px] overflow-visible">
        <NavHangingUnit />
      </div>
    </div>
  );
}

export function DesktopHeader() {
  return (
    <header
      className="absolute top-0 left-0 w-full h-[120px] flex items-center justify-center z-50 pointer-events-none overflow-visible"
      data-node-id="314:102"
    >
      <DesktopNavbarContent />
    </header>
  );
}

/**
 * Floating Navigation Bar that slides in smoothly when the user reaches the footer section.
 */
export function FooterFloatingNav() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const footerEl = document.getElementById("contact");
    if (!footerEl) return;

    // Observe when user reaches footer (with negative bottom margin so middle sections remain clean)
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px 0px -35% 0px",
        threshold: 0,
      }
    );

    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-12"
      }`}
      aria-hidden={!isVisible}
    >
      <div
        className={`pointer-events-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? "scale-100" : "scale-95"
        }`}
      >
        <DesktopNavbarContent className="shadow-[0px_10px_30px_rgba(0,0,0,0.18),0px_4px_8px_rgba(0,0,0,0.1)]" />
      </div>
    </div>
  );
}

export function MobileHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 px-4 py-3 bg-white/95 backdrop-blur-md border-b border-gray-100 flex justify-center overflow-visible">
      <div className="w-full max-w-[1024px] min-h-[48px] flex items-center justify-between relative overflow-visible">
        {/* Logo */}
        <Link
          href="/"
          className="w-[60px] h-[30px] relative shrink-0 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8364fc] rounded no-squiggle"
          data-cursor-key="nav-logo"
        >
          <img
            src="/assets/logo-nav-vectorized.svg"
            alt="Kanak Logo"
            className="w-full h-full object-contain block"
          />
        </Link>

        {/* Tablet Navigation (visible md to xl) */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/#work"
            className="font-['Almarena_Neue',sans-serif] text-[15px] text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8364fc] rounded px-1 link-squiggle"
            data-cursor-key="nav-work"
          >
            Work
          </Link>
          <a
            href="/Kanak-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-['Almarena_Neue',sans-serif] text-[15px] text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8364fc] rounded px-1 link-squiggle"
            data-cursor-key="nav-resume"
          >
            Resume
          </a>
          <Link
            href="/about"
            className="font-['Almarena_Neue',sans-serif] text-[15px] text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8364fc] rounded px-1 link-squiggle"
            data-cursor-key="nav-about"
          >
            About
          </Link>
          <Link
            href="/#contact"
            className="font-['Almarena_Neue',sans-serif] text-[15px] text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8364fc] rounded px-1 link-squiggle"
            data-cursor-key="nav-contact"
          >
            Contact
          </Link>
        </nav>

        {/* Right side: Gold Rail + Hanging Icons & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-visible">
          <div className="scale-[0.82] sm:scale-100 origin-right overflow-visible">
            <NavHangingUnit />
          </div>

          {/* Mobile Hamburger Toggle (< md) */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-[40px] h-[40px] flex flex-col items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8364fc] rounded shrink-0"
          >
            <span
              className={`block w-5 h-0.5 bg-black transition-transform duration-200 ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-black transition-opacity duration-200 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-black transition-transform duration-200 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-[54px] left-0 right-0 bg-white rounded-[16px] shadow-[0px_8px_20px_rgba(0,0,0,0.15)] border border-gray-100 p-2 flex flex-col z-50">
            <Link
              href="/#work"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center px-4 font-['Almarena_Neue',sans-serif] text-[16px] text-black border-b border-gray-50 link-squiggle"
            >
              Work
            </Link>
            <a
              href="/Kanak-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center px-4 font-['Almarena_Neue',sans-serif] text-[16px] text-black border-b border-gray-50 link-squiggle"
            >
              Resume
            </a>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center px-4 font-['Almarena_Neue',sans-serif] text-[16px] text-black border-b border-gray-50 link-squiggle"
            >
              About
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] flex items-center px-4 font-['Almarena_Neue',sans-serif] text-[16px] text-black border-b border-gray-50 link-squiggle"
            >
              Contact
            </Link>
            <div className="pt-2 pb-1 px-4 flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/kanakprajapati/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-black font-['Almarena_Neue',sans-serif] no-squiggle"
              >
                <img src="/assets/nav-linkedin.png" alt="LinkedIn" className="w-5 h-5 rounded" />
                LinkedIn
              </a>
              <a
                href="https://www.behance.net/swarnsoul"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-black font-['Almarena_Neue',sans-serif] no-squiggle"
              >
                <img src="/assets/nav-behance.png" alt="Behance" className="w-5 h-5 rounded" />
                Behance
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default function Header() {
  return (
    <>
      <div className="hidden xl:block">
        <DesktopHeader />
      </div>
      <div className="xl:hidden">
        <MobileHeader />
      </div>
    </>
  );
}
