"use client";

import React, { useState, useEffect, useRef, startTransition } from "react";
import { onHeroReveal } from "@/lib/splashSignal";

export function lerpAngle(current: number, target: number, t: number): number {
  let diff = (target - current) % 360;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return current + diff * t;
}

export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

export function getBoxDistance(r1: DOMRect, r2: DOMRect): number {
  const dx = Math.max(0, r1.left - r2.right, r2.left - r1.right);
  const dy = Math.max(0, r1.top - r2.bottom, r2.top - r1.bottom);
  return Math.hypot(dx, dy);
}

// --- Badge Arc Geometry & Settings ---
export const BADGE_ARC_CONFIG = {
  // Variable limit line: vertical line ~15% of badge width inside side edge
  limitRatio: 0.15,
};

export function getNearestPointOnRoundedRect(cx: number, cy: number, W: number, H: number, r: number) {
  if (cx < r && cy < r) {
    const dx = cx - r;
    const dy = cy - r;
    const len = Math.hypot(dx, dy);
    if (len === 0) return { px: 0, py: r, dist: r, nx: -1, ny: 0 };
    return { px: r + (dx / len) * r, py: r + (dy / len) * r, dist: len - r, nx: dx / len, ny: dy / len };
  } else if (cx < r && cy > H - r) {
    const dx = cx - r;
    const dy = cy - (H - r);
    const len = Math.hypot(dx, dy);
    if (len === 0) return { px: 0, py: H - r, dist: r, nx: -1, ny: 0 };
    return { px: r + (dx / len) * r, py: (H - r) + (dy / len) * r, dist: len - r, nx: dx / len, ny: dy / len };
  } else if (cx > W - r && cy < r) {
    const dx = cx - (W - r);
    const dy = cy - r;
    const len = Math.hypot(dx, dy);
    if (len === 0) return { px: W, py: r, dist: r, nx: 1, ny: 0 };
    return { px: (W - r) + (dx / len) * r, py: r + (dy / len) * r, dist: len - r, nx: dx / len, ny: dy / len };
  } else if (cx > W - r && cy > H - r) {
    const dx = cx - (W - r);
    const dy = cy - (H - r);
    const len = Math.hypot(dx, dy);
    if (len === 0) return { px: W, py: H - r, dist: r, nx: 1, ny: 0 };
    return { px: (W - r) + (dx / len) * r, py: (H - r) + (dy / len) * r, dist: len - r, nx: dx / len, ny: dy / len };
  } else if (cx < 0) {
    const py = Math.max(r, Math.min(H - r, cy));
    return { px: 0, py, dist: -cx, nx: -1, ny: 0 };
  } else if (cx > W) {
    const py = Math.max(r, Math.min(H - r, cy));
    return { px: W, py, dist: cx - W, nx: 1, ny: 0 };
  } else if (cy < 0) {
    const px = Math.max(r, Math.min(W - r, cx));
    return { px, py: 0, dist: -cy, nx: 0, ny: -1 };
  } else if (cy > H) {
    const px = Math.max(r, Math.min(W - r, cx));
    return { px, py: H, dist: cy - H, nx: 0, ny: 1 };
  } else {
    return { px: cx, py: 0, dist: 0, nx: 0, ny: -1 };
  }
}

export function getArcOffsetPink(s: number, limitRatio = BADGE_ARC_CONFIG.limitRatio) {
  const W = 192.29, H = 63.38, r = 7.2;
  const D = 25.73; // constant distance from badge boundary (measured to rounded corner)
  const limitX = Math.max(r, W * limitRatio - 1.2); // ~27.6px <= 28.84px (15% limit line)

  const phi0 = Math.atan2(77.38 - (H - r), -18 - r);
  const phi1 = Math.PI;
  const R_curve = r + D;

  const L1 = (phi1 - phi0) * R_curve;
  const L2 = Math.max(0, (H - r) - r);
  const L3 = (Math.PI / 2) * R_curve;
  const L4 = Math.max(0, limitX - r);
  const total = L1 + L2 + L3 + L4;

  const d = s * total;

  let x: number, y: number;
  if (d <= L1) {
    const t = d / L1;
    const phi = phi0 + t * (phi1 - phi0);
    x = r + R_curve * Math.cos(phi);
    y = (H - r) + R_curve * Math.sin(phi);
  } else if (d <= L1 + L2) {
    const t = (d - L1) / L2;
    x = -D;
    y = (H - r) - t * ((H - r) - r);
  } else if (d <= L1 + L2 + L3) {
    const t = (d - L1 - L2) / L3;
    const phi = Math.PI + t * (Math.PI / 2);
    x = r + R_curve * Math.cos(phi);
    y = r + R_curve * Math.sin(phi);
  } else {
    const t = (d - L1 - L2 - L3) / L4;
    x = r + t * (limitX - r);
    y = -D;
  }

  return { dx: x - (-18), dy: y - 77.38, x, y };
}

export function getArcOffsetPurple(s: number, limitRatio = BADGE_ARC_CONFIG.limitRatio) {
  const W = 182.47, H = 59.01, r = 9.08;
  const D = 21.80; // constant distance from badge boundary
  const limitX = Math.min(W - r, W - (W * limitRatio - 1.2)); // 15% limit line

  const phi0 = Math.atan2(-11.44 - r, 196.47 - (W - r));
  const phi1 = 0;
  const R_curve = r + D;

  const L1 = (phi1 - phi0) * R_curve;
  const L2 = Math.max(0, (H - r) - r);
  const L3 = (Math.PI / 2) * R_curve;
  const L4 = Math.max(0, (W - r) - limitX);
  const total = L1 + L2 + L3 + L4;

  const d = s * total;

  let x: number, y: number;
  if (d <= L1) {
    const t = d / L1;
    const phi = phi0 + t * (phi1 - phi0);
    x = (W - r) + R_curve * Math.cos(phi);
    y = r + R_curve * Math.sin(phi);
  } else if (d <= L1 + L2) {
    const t = (d - L1) / L2;
    x = W + D;
    y = r + t * ((H - r) - r);
  } else if (d <= L1 + L2 + L3) {
    const t = (d - L1 - L2) / L3;
    const phi = 0 + t * (Math.PI / 2);
    x = (W - r) + R_curve * Math.cos(phi);
    y = (H - r) + R_curve * Math.sin(phi);
  } else {
    const t = (d - L1 - L2 - L3) / L4;
    x = (W - r) - t * ((W - r) - limitX);
    y = H + D;
  }

  return { dx: x - 196.47, dy: y - (-11.44), x, y };
}

export function createArcController(config: {
  minDuration: number;
  maxDuration: number;
  minPause: number;
  maxPause: number;
  initialS?: number;
  initialPause?: number;
}) {
  let s = config.initialS ?? 0;          // current position along arc [0, 1]
  let fromS = s;
  let targetS = 1.0;
  let duration = config.minDuration + Math.random() * (config.maxDuration - config.minDuration);
  let elapsed = 0;
  let state: "pause" | "move" = "pause";
  let pauseDuration = config.initialPause ?? 0.8; // initial short pause before first movement
  let pauseElapsed = 0;
  let movingForward = true; // true: towards limit (s -> 1), false: towards rest (s -> 0)
  let midHesitated = false; // whether mid-arc hesitation occurred in this leg

  const easeInOut = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  return {
    update(dt: number): number {
      if (state === "pause") {
        pauseElapsed += dt;
        if (pauseElapsed >= pauseDuration) {
          state = "move";
          elapsed = 0;
          pauseElapsed = 0;
          fromS = s;
          midHesitated = false;

          if (movingForward) {
            // Going towards limit: 75% full travel (1.0), 25% partial (0.45 - 0.70)
            const isPartial = Math.random() < 0.25;
            targetS = isPartial ? 0.45 + Math.random() * 0.25 : 1.0;
            duration = config.minDuration + Math.random() * (config.maxDuration - config.minDuration);
            if (isPartial) duration *= Math.max(0.4, (targetS - fromS));
          } else {
            // Going back towards rest: 80% full return to 0, 20% partial turnaround
            const isPartial = Math.random() < 0.20 && fromS > 0.6;
            targetS = isPartial ? 0.25 + Math.random() * 0.20 : 0.0;
            duration = config.minDuration + Math.random() * (config.maxDuration - config.minDuration);
            if (isPartial) duration *= Math.max(0.4, Math.abs(targetS - fromS));
          }
          duration = Math.max(config.minDuration * 0.7, duration);
        }
      } else if (state === "move") {
        elapsed += dt;
        const progress = Math.min(1, elapsed / duration);
        s = fromS + (targetS - fromS) * easeInOut(progress);

        // Occasional mid-arc hesitation (between 45% and 55% progress)
        if (!midHesitated && progress >= 0.45 && progress <= 0.55) {
          if (Math.random() < 0.06) {
            midHesitated = true;
            state = "pause";
            pauseElapsed = 0;
            pauseDuration = 0.5 + Math.random() * 0.6; // 0.5 - 1.1s brief pause
            fromS = s;
            return s;
          }
        }

        if (progress >= 1) {
          s = targetS;
          state = "pause";
          pauseElapsed = 0;
          pauseDuration = config.minPause + Math.random() * (config.maxPause - config.minPause);
          if (s <= 0.05) {
            movingForward = true;
            s = 0;
          } else if (s >= 0.4) {
            movingForward = false;
          } else {
            movingForward = !movingForward;
          }
        }
      }

      return clamp(s, 0, 1);
    },
    getS(): number {
      return s;
    }
  };
}

const TEXT_A = "Product Designer";
const TEXT_B = "UI/UX Designer";
const TEXT_C =
  "I design experiences that live at the edge of instinct and intention where every detail has a purpose.";

function formatLiveTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const h12 = hours % 12 || 12;
  const mm = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const ampm = hours >= 12 ? "pm" : "am";
  return `${h12}:${mm} ${ampm}`;
}

function TypewriterText({
  text,
  visibleCount,
  showCaret,
  caretColor = "bg-white",
}: {
  text: string;
  visibleCount: number;
  showCaret: boolean;
  caretColor?: string;
}) {
  return (
    <span className="relative inline">
      {/* Screen reader full text */}
      <span className="sr-only">{text}</span>
      {/* Visible characters with exact reserved layout positions */}
      <span aria-hidden="true">
        {text.split("").map((char, index) => {
          const isRevealed = index < visibleCount;
          const isCurrentTypingChar = index === visibleCount - 1;
          return (
            <React.Fragment key={index}>
              <span className={isRevealed ? "opacity-100" : "opacity-0 select-none"}>
                {char}
              </span>
              {showCaret && isCurrentTypingChar && (
                <span
                  className={`inline-block w-[1.5px] -mr-[1.5px] h-[0.9em] align-baseline ml-[0.5px] ${caretColor} animate-caret`}
                />
              )}
            </React.Fragment>
          );
        })}
        {showCaret && visibleCount === 0 && (
          <span
            className={`inline-block w-[1.5px] -mr-[1.5px] h-[0.9em] align-baseline ml-[0.5px] ${caretColor} animate-caret`}
          />
        )}
      </span>
    </span>
  );
}

function useHeroInteractions() {
  const [liveTime, setLiveTime] = useState("2:12 pm");
  const [isHovered, setIsHovered] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  const [typingState, setTypingState] = useState({
    badge1Count: 0,
    badge1Caret: false,
    badge2Count: 0,
    badge2Caret: false,
    bioCount: 0,
    bioCaret: false,
  });

  const [roamingState, setRoamingState] = useState({
    pink: false,
    purple: false,
  });

  // 1. Live Time Update aligned to exact minute (starts when hero reveals)
  useEffect(() => {
    let isCancelled = false;
    let timeoutId: NodeJS.Timeout;
    let intervalId: ReturnType<typeof setInterval>;

    async function initLiveTime() {
      await onHeroReveal();
      if (isCancelled) return;
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      if (isCancelled) return;

      setTimeout(() => {
        if (!isCancelled) {
          setLiveTime(formatLiveTime(new Date()));
        }
      }, 150);

      const now = new Date();
      const msUntilNextMinute =
        (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

      timeoutId = setTimeout(() => {
        if (isCancelled) return;
        setLiveTime(formatLiveTime(new Date()));
        intervalId = setInterval(() => {
          if (isCancelled) return;
          setLiveTime(formatLiveTime(new Date()));
        }, 60000);
      }, msUntilNextMinute);
    }

    initLiveTime();

    return () => {
      isCancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  // 2. Typewriter Sequenced Animation & Collaborator Roaming Trigger
  useEffect(() => {
    let isCancelled = false;
    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    async function runTypewriter() {
      // Wait for splash screen slide to be ~70% revealed before starting typewriter animation
      await onHeroReveal();
      if (isCancelled) return;
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      if (isCancelled) return;
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      if (isCancelled) return;

      // Start safety timer only AFTER splash is done
      safetyTimer = setTimeout(() => {
        if (!isCancelled) {
          setTypingState({
            badge1Count: TEXT_A.length,
            badge1Caret: false,
            badge2Count: TEXT_B.length,
            badge2Caret: false,
            bioCount: TEXT_C.length,
            bioCaret: false,
          });
        }
      }, 5500);

      // Check prefers-reduced-motion
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setTypingState({
          badge1Count: TEXT_A.length,
          badge1Caret: false,
          badge2Count: TEXT_B.length,
          badge2Caret: false,
          bioCount: TEXT_C.length,
          bioCaret: false,
        });
        setRoamingState({ pink: false, purple: false });
        return;
      }

      await sleep(30);
      if (isCancelled) return;

      // Text A: "Product Designer"
      startTransition(() => {
        setTypingState((s) => ({ ...s, badge1Caret: true }));
      });
      for (let i = 1; i <= TEXT_A.length; i++) {
        if (isCancelled) return;
        await sleep(50 + Math.random() * 20);
        startTransition(() => {
          setTypingState((s) => ({ ...s, badge1Count: i }));
        });
      }
      await sleep(350);
      if (isCancelled) return;
      startTransition(() => {
        setTypingState((s) => ({ ...s, badge1Caret: false }));
        setRoamingState((s) => ({ ...s, pink: true }));
      });

      // Short pause between A and B
      await sleep(300);
      if (isCancelled) return;

      // Text B: "UI/UX Designer"
      startTransition(() => {
        setTypingState((s) => ({ ...s, badge2Caret: true }));
      });
      for (let i = 1; i <= TEXT_B.length; i++) {
        if (isCancelled) return;
        await sleep(50 + Math.random() * 20);
        startTransition(() => {
          setTypingState((s) => ({ ...s, badge2Count: i }));
        });
      }
      await sleep(350);
      if (isCancelled) return;
      startTransition(() => {
        setTypingState((s) => ({ ...s, badge2Caret: false }));
        setRoamingState((s) => ({ ...s, purple: true }));
      });

      // Short pause between B and C
      await sleep(300);
      if (isCancelled) return;

      // Text C: Bio Box
      startTransition(() => {
        setTypingState((s) => ({ ...s, bioCaret: true }));
      });
      for (let i = 1; i <= TEXT_C.length; i++) {
        if (isCancelled) return;
        await sleep(45 + Math.random() * 20);
        startTransition(() => {
          setTypingState((s) => ({ ...s, bioCount: i }));
        });
      }
      await sleep(450);
      if (isCancelled) return;
      startTransition(() => {
        setTypingState((s) => ({ ...s, bioCaret: false }));
      });
    }

    let safetyTimer: NodeJS.Timeout | null = null;
    runTypewriter();

    return () => {
      isCancelled = true;
      if (safetyTimer) clearTimeout(safetyTimer);
    };
  }, []);

  return {
    liveTime,
    isHovered,
    setIsHovered,
    isToggled,
    setIsToggled,
    showRealPhoto: isToggled || isHovered,
    typingState,
    roamingState,
  };
}

export function DesktopHero() {
  const {
    liveTime,
    setIsHovered,
    setIsToggled,
    showRealPhoto,
    typingState,
    roamingState,
  } = useHeroInteractions();

  const portraitRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  const penRef = useRef<HTMLDivElement>(null);

  const pinkUnitRef = useRef<HTMLDivElement>(null);
  const pinkBadgeRef = useRef<HTMLDivElement>(null);
  const pinkCursorRef = useRef<HTMLDivElement>(null);

  const purpleUnitRef = useRef<HTMLDivElement>(null);
  const purpleBadgeRef = useRef<HTMLDivElement>(null);
  const purpleCursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isCancelled = false;
    let animationFrameId: number;

    async function startLoop() {
      if (
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      // Wait until hero reveals (at ~70% of splash slide) before running cursor physics loop
      await onHeroReveal();
      if (isCancelled) return;
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      if (isCancelled) return;
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      if (isCancelled) return;

      let pinkStart: number | null = null;
      let purpleStart: number | null = null;

      const pinkArc = createArcController({
        minDuration: 3.2,
        maxDuration: 4.5,
        minPause: 0.4,
        maxPause: 1.0,
      });

      const purpleArc = createArcController({
        minDuration: 3.5,
        maxDuration: 4.8,
        minPause: 0.5,
        maxPause: 1.2,
      });

      let currentPinkAngle = -105.11;
      let currentPurpleAngle = 18.0;
      let lastTimestamp: number | null = null;
      let lastCheckTime = 0;

      const loop = (timestamp: number) => {
        if (isCancelled) return;
        const t = timestamp / 1000;
        const deltaSec = lastTimestamp !== null ? Math.min(0.1, (timestamp - lastTimestamp) / 1000) : 0.016;
        lastTimestamp = timestamp;

      // --- Pink Collaborator Unit: Soft Drift & Arc Travel along Left Side ---
      if (pinkUnitRef.current && pinkCursorRef.current) {
        if (roamingState.pink && pinkStart === null) pinkStart = t;
        const dt = roamingState.pink && pinkStart !== null ? Math.max(0, t - pinkStart) : 0;
        const easeIn = roamingState.pink ? clamp(dt / 1.2, 0, 1) : 0;

        // Arrow movement along arc (runs around LEFT side, starts at bottom-left rest, travels to top-left limit)
        const pinkS = roamingState.pink ? pinkArc.update(deltaSec) : 0;
        const arcPink = getArcOffsetPink(pinkS);

        // Badge wander motion: ~4.2s cycle (speed 3.5-5.5s), horizontal span 62px (55-80px), vertical span 51px (35-55px)
        const w1 = (2 * Math.PI) / 4.2;
        let dx = (69.0 + 31.0 * Math.sin(w1 * dt) + 2.0 * Math.cos(2 * w1 * dt)) * easeIn;
        const dyBase = -1.0 + 38.0 * Math.pow(pinkS, 0.7);
        const dyWander = 6.0 * Math.cos(w1 * dt * 0.9) + 2.0 * Math.sin(2 * w1 * dt);
        let dy = (dyBase + dyWander) * easeIn;

        // Subtle micro-wobble
        const wOrbit1 = (2 * Math.PI) / 3.8;
        const ox = (arcPink.dx + 0.8 * Math.cos(wOrbit1 * dt)) * easeIn;
        const oy = (arcPink.dy + 0.6 * Math.sin(wOrbit1 * dt)) * easeIn;

        // Tail always faces badge, tip points outward along normal d
        const nearP = getNearestPointOnRoundedRect(arcPink.x, arcPink.y, 192.29, 63.38, 7.2);
        const outAngleP = (Math.atan2(nearP.ny, nearP.nx) * 180) / Math.PI;
        // Native vector.svg tail-to-tip angle is -128.16deg. At rest s=0, blends seamlessly from -105.11deg
        const blendP = Math.max(0, 1 - pinkS / 0.15);
        const targetAngleP = (outAngleP - (-128.16)) - 13.20 * blendP;
        currentPinkAngle = lerpAngle(currentPinkAngle, targetAngleP, 0.12);

        pinkUnitRef.current.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
        pinkCursorRef.current.style.transform = `translate3d(${ox.toFixed(2)}px, ${oy.toFixed(2)}px, 0) rotate(${currentPinkAngle.toFixed(2)}deg)`;
      }

      // --- Purple Collaborator Unit: Soft Drift & Arc Travel along Right Side ---
      if (purpleUnitRef.current && purpleCursorRef.current) {
        if (roamingState.purple && purpleStart === null) purpleStart = t;
        const dt = roamingState.purple && purpleStart !== null ? Math.max(0, t - purpleStart) : 0;
        const easeIn = roamingState.purple ? clamp(dt / 1.2, 0, 1) : 0;

        // Arrow movement along arc (runs around RIGHT side, starts at top-right rest, travels to bottom-right limit)
        const purpleS = roamingState.purple ? purpleArc.update(deltaSec) : 0;
        const arcPurple = getArcOffsetPurple(purpleS);

        // Badge wander motion: ~4.8s cycle (independent, 3.5-5.5s), horizontal span 64px (55-80px), vertical span 46px (35-55px)
        const w2 = (2 * Math.PI) / 4.8;
        let dx = (-58.0 - 30.0 * Math.sin(w2 * dt) + 2.0 * Math.cos(2 * w2 * dt)) * easeIn;
        let dy = (5.0 + 20.0 * Math.cos(w2 * dt * 0.85) + 3.0 * Math.sin(2 * w2 * dt)) * easeIn;

        // Subtle micro-wobble
        const wOrbit2 = (2 * Math.PI) / 3.5;
        const ox = (arcPurple.dx - 0.8 * Math.cos(wOrbit2 * dt)) * easeIn;
        const oy = (arcPurple.dy + 0.6 * Math.sin(wOrbit2 * dt)) * easeIn;

        // Tail always faces badge, tip points outward along normal d
        const nearU = getNearestPointOnRoundedRect(arcPurple.x, arcPurple.y, 182.47, 59.01, 9.08);
        const outAngleU = (Math.atan2(nearU.ny, nearU.nx) * 180) / Math.PI;
        // Native vector1.svg tail-to-tip angle is -46.76deg. Smooth transition from resting angle at s=0
        const blendU = Math.max(0, 1 - purpleS / 0.15);
        const targetAngleU = (outAngleU - (-46.76)) + 12.88 * blendU;
        currentPurpleAngle = lerpAngle(currentPurpleAngle, targetAngleU, 0.12);

        purpleUnitRef.current.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
        purpleCursorRef.current.style.transform = `translate3d(${ox.toFixed(2)}px, ${oy.toFixed(2)}px, 0) rotate(${currentPurpleAngle.toFixed(2)}deg)`;
      }

      // --- Runtime Distance & Clearance Measurement ---
      if (t - lastCheckTime > 0.25) {
        lastCheckTime = t;
        if (
          portraitRef.current &&
          pinkBadgeRef.current &&
          pinkCursorRef.current &&
          purpleBadgeRef.current &&
          purpleCursorRef.current
        ) {
          const portraitRect = portraitRef.current.getBoundingClientRect();
          const headingRect = headingRef.current?.getBoundingClientRect();
          const bioRect = bioRef.current?.getBoundingClientRect();
          const stampRect = stampRef.current?.getBoundingClientRect();
          const penRect = penRef.current?.getBoundingClientRect();
          const pinkB = pinkBadgeRef.current.getBoundingClientRect();
          const pinkC = pinkCursorRef.current.getBoundingClientRect();
          const purpleB = purpleBadgeRef.current.getBoundingClientRect();
          const purpleC = purpleCursorRef.current.getBoundingClientRect();

          const clearances: Record<string, number> = {
            pinkCursor_to_portrait: getBoxDistance(pinkC, portraitRect),
            pinkBadge_to_portrait: getBoxDistance(pinkB, portraitRect),
            pinkCursor_to_heading: headingRect ? getBoxDistance(pinkC, headingRect) : 999,
            pinkBadge_to_heading: headingRect ? getBoxDistance(pinkB, headingRect) : 999,
            pinkCursor_to_bio: bioRect ? getBoxDistance(pinkC, bioRect) : 999,
            pinkBadge_to_bio: bioRect ? getBoxDistance(pinkB, bioRect) : 999,
            purpleCursor_to_portrait: getBoxDistance(purpleC, portraitRect),
            purpleBadge_to_portrait: getBoxDistance(purpleB, portraitRect),
            purpleCursor_to_stamp: stampRect ? getBoxDistance(purpleC, stampRect) : 999,
            purpleBadge_to_stamp: stampRect ? getBoxDistance(purpleB, stampRect) : 999,
            purpleCursor_to_pen: penRect ? getBoxDistance(purpleC, penRect) : 999,
            purpleBadge_to_pen: penRect ? getBoxDistance(purpleB, penRect) : 999,
            pink_to_purple: getBoxDistance(pinkB, purpleB),
          };

          (window as any).__heroClearances = clearances;

        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
  }

  startLoop();

  return () => {
    isCancelled = true;
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  };
}, [roamingState.pink, roamingState.purple]);

  return (
    <section
      className="relative w-[1440px] h-[849px] overflow-hidden bg-transparent"
      data-node-id="140:671-hero"
    >
      {/* Hero Content Frame (Frame 33) */}
      <div
        className="absolute left-[213px] top-[153px] w-[1013.48px] h-[657px]"
        data-node-id="140:718"
      >
        {/* Central Character Portrait with Hover/Tap Crossfade */}
        <div
          ref={portraitRef}
          className="absolute left-[283px] top-0 w-[410px] h-[580px] rounded-[229.67px] overflow-hidden cursor-pointer select-none group z-10 outline-none focus-visible:ring-2 focus-visible:ring-[#8364fc]"
          data-node-id="140:747"
          data-cursor-key="hero-portrait"
          data-state={showRealPhoto ? "real" : "cartoon"}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          onClick={() => setIsToggled((prev) => !prev)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsToggled((prev) => !prev);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Toggle portrait: cartoon to real photo"
        >
          {/* Cartoon Image (Default) */}
          <img
            src="/assets/des-ida-gner2.png"
            alt="Kanak Cartoon Portrait"
            loading="eager"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover rounded-[229.67px] pointer-events-none transition-opacity duration-200 ease-in-out motion-reduce:transition-none ${
              showRealPhoto ? "opacity-0" : "opacity-100"
            }`}
          />
          {/* Real Photo Image (Hover State) */}
          <img
            src="/assets/des-ida-gner1.png"
            alt="Kanak Real Photo Portrait"
            loading="eager"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover rounded-[229.67px] pointer-events-none transition-opacity duration-200 ease-in-out motion-reduce:transition-none ${
              showRealPhoto ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Hey, I'm Kanak ! */}
        <div
          ref={headingRef}
          className="absolute left-[640px] top-[62.69px] w-[265.57px]"
          data-node-id="140:719"
        >
          <div className="font-['Architects_Daughter'] text-[44.96px] leading-[59.53px] text-black capitalize">
            <p className="mb-0">Hey,</p>
            <p>I’m Kanak !</p>
          </div>
        </div>

        {/* Pink Collaborator Unit: Product Designer Badge + Arrow (Outside Bottom-Left Corner) */}
        <div
          ref={pinkUnitRef}
          className="collaborator-unit absolute left-[693.80px] top-[227.00px] w-[235.20px] h-[102.81px] pointer-events-none z-20"
          data-node-id="140:720"
        >
          {/* Collaborator Cursor 1 (Arrow) - Outside Bottom-Left Corner */}
          <div
            ref={pinkCursorRef}
            className="absolute left-0 top-[51.95px] w-[49.81px] h-[50.86px] rotate-[-105.11deg] pointer-events-none z-20 origin-center"
            data-node-id="140:721"
          >
            <img
              src="/assets/vector.svg"
              alt="Pointer arrow"
              className="w-full h-full block"
            />
          </div>
          {/* Badge */}
          <div
            ref={pinkBadgeRef}
            className="absolute left-[42.91px] top-0 w-[192.29px] h-[63.38px] bg-[#ee3f64] border-[3.6px] border-white rounded-[7.2px] shadow-[0px_2.88px_7.2px_rgba(0,0,0,0.25)] flex items-center justify-center pointer-events-auto"
            data-node-id="140:722"
            data-cursor-key="hero-badge-product"
          >
            <span
              className="font-['Architects_Daughter'] text-[18px] leading-[16.75px] text-white text-center"
              data-node-id="140:723"
            >
              <TypewriterText
                text={TEXT_A}
                visibleCount={typingState.badge1Count}
                showCaret={typingState.badge1Caret}
                caretColor="bg-white"
              />
            </span>
          </div>
        </div>

        {/* Purple Collaborator Unit: UI/UX Designer Badge + Arrow (Outside Top-Right Corner) */}
        <div
          ref={purpleUnitRef}
          className="collaborator-unit absolute left-[49px] top-[365px] w-[221.38px] h-[95.88px] pointer-events-none z-20"
          data-node-id="140:724"
        >
          {/* Badge */}
          <div
            ref={purpleBadgeRef}
            className="absolute left-0 top-[36.87px] w-[182.47px] h-[59.01px] bg-[#8364fc] border-[4.54px] border-white rounded-[9.08px] shadow-[0px_3.63px_9.08px_rgba(0,0,0,0.25)] flex items-center justify-center pointer-events-auto"
            data-node-id="140:725"
            data-cursor-key="hero-badge-uiux"
          >
            <span
              className="font-['Architects_Daughter'] text-[18.16px] leading-[25.11px] text-white text-center"
              data-node-id="140:726"
            >
              <TypewriterText
                text={TEXT_B}
                visibleCount={typingState.badge2Count}
                showCaret={typingState.badge2Caret}
                caretColor="bg-white"
              />
            </span>
          </div>
          {/* Collaborator Cursor 2 (Arrow) - Outside Top-Right Corner */}
          <div
            ref={purpleCursorRef}
            className="absolute left-[171.57px] top-0 w-[49.81px] h-[50.86px] rotate-[18deg] pointer-events-none z-20 origin-center"
            data-node-id="140:727"
          >
            <img
              src="/assets/vector1.svg"
              alt="Pointer arrow"
              className="w-full h-full block"
            />
          </div>
        </div>

        {/* Location Stamp (India [live time] Jaipur, Rajasthan) */}
        <div
          ref={stampRef}
          className="absolute left-[49px] top-[62px] w-[172px] h-[180px] pointer-events-auto"
          data-node-id="140:742"
          data-cursor-key="hero-stamp"
        >
          {/* Scalloped Union Background */}
          <img
            src="/assets/union.svg"
            alt="Stamp frame"
            className="absolute inset-0 w-full h-full block pointer-events-none"
            data-node-id="140:743"
          />
          {/* Top text */}
          <div className="absolute top-[18px] left-[18px] right-[18px] flex justify-between font-['Architects_Daughter'] text-[15px] leading-[18.16px] text-black">
            <span>India</span>
            <span
              id="live-time-display"
              suppressHydrationWarning
              className="min-w-[55px] text-right"
              data-node-id="140:744"
            >
              {liveTime}
            </span>
          </div>
          {/* Hawa Mahal Illustration */}
          <div
            className="absolute left-[35.5px] top-[39px] w-[101px] h-[101px]"
            data-node-id="140:745"
          >
            <img
              src="/assets/hawa-mahal.png"
              alt="Hawa Mahal Jaipur"
              className="w-full h-full object-contain pointer-events-none"
            />
          </div>
          {/* Bottom text */}
          <div className="absolute bottom-[15px] left-0 right-0 text-center font-['Architects_Daughter'] text-[15px] leading-[18.16px] text-black pointer-events-none">
            Jaipur, Rajasthan
          </div>
        </div>

        {/* Floating Pen Tool Sticker */}
        <div
          ref={penRef}
          className="absolute left-[179px] top-[197px] w-[104.09px] h-[104.09px] flex items-center justify-center pointer-events-auto"
          data-node-id="140:746"
          data-cursor-key="hero-pen"
        >
          <div className="rotate-[-32.09deg] w-[75.51px] h-[75.51px]">
            <img
              src="/assets/pen-tool.png"
              alt="Pen tool illustration"
              className="w-full h-full object-contain pointer-events-none"
            />
          </div>
        </div>

        {/* Bio Card with Framing Handles */}
        <div
          ref={bioRef}
          className="absolute left-[720px] top-[368px] w-[280.48px] h-[122.38px] pointer-events-auto"
          data-node-id="140:728"
          data-cursor-key="hero-badge-status"
        >
          {/* Handles & Frame Lines */}
          <div
            className="absolute inset-0 flex flex-col justify-between pointer-events-none"
            data-node-id="140:729"
          >
            {/* Top row */}
            <div
              className="flex items-center justify-between w-full h-[17.69px]"
              data-node-id="140:730"
            >
              <div className="w-[17.69px] h-[17.69px] bg-[#d9d9d9] border-[1.82px] border-black shrink-0" />
              <img src="/assets/line-4.svg" alt="" className="w-[246.37px]" />
              <div className="w-[17.69px] h-[17.69px] bg-[#d9d9d9] border-[1.82px] border-black shrink-0" />
            </div>
            {/* Bottom row */}
            <div
              className="flex items-center justify-between w-full h-[17.69px]"
              data-node-id="140:734"
            >
              <div className="w-[17.69px] h-[17.69px] bg-[#d9d9d9] border-[1.82px] border-black shrink-0" />
              <img src="/assets/line-4.svg" alt="" className="w-[246.37px]" />
              <div className="w-[17.69px] h-[17.69px] bg-[#d9d9d9] border-[1.82px] border-black shrink-0" />
            </div>
          </div>
          {/* Vertical side lines */}
          <div
            className="absolute left-[9px] top-[16px] w-[264px] h-[91px] pointer-events-none"
            data-node-id="140:738"
          >
            <img
              src="/assets/frame-37.svg"
              alt=""
              className="w-full h-full block"
            />
          </div>
          {/* Text with Typewriter Effect */}
          <div
            className="absolute left-[28px] top-[25px] w-[226.4px] font-['Inter'] font-normal text-[14px] leading-[20px] text-black"
            data-node-id="140:741"
          >
            <TypewriterText
              text={TEXT_C}
              visibleCount={typingState.bioCount}
              showCaret={typingState.bioCaret}
              caretColor="bg-black"
            />
          </div>
        </div>

        {/* Scroll Down */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[627px] w-[122px] flex items-center justify-center gap-[6px]"
          data-node-id="140:748"
        >
          <span
            className="font-['Inter'] font-normal text-[13.62px] leading-[18.16px] text-black text-center"
            data-node-id="140:749"
          >
            Scroll Down
          </span>
          <div
            className="w-[16px] h-[16px] flex items-center justify-center rotate-90"
            data-node-id="140:750"
          >
            <img
              src="/assets/arrow-1.svg"
              alt="Scroll arrow"
              className="w-[16px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function MobileHero() {
  const {
    liveTime,
    setIsHovered,
    setIsToggled,
    showRealPhoto,
    typingState,
    roamingState,
  } = useHeroInteractions();

  const portraitRef = useRef<HTMLDivElement>(null);
  const pinkUnitRef = useRef<HTMLDivElement>(null);
  const pinkCursorRef = useRef<HTMLDivElement>(null);
  const purpleUnitRef = useRef<HTMLDivElement>(null);
  const purpleCursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isCancelled = false;
    let animationFrameId: number;

    async function startLoop() {
      if (
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      await onHeroReveal();
      if (isCancelled) return;
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      if (isCancelled) return;

      let pinkStart: number | null = null;
      let purpleStart: number | null = null;

      const pinkArc = createArcController({
        minDuration: 3.2,
        maxDuration: 4.5,
        minPause: 0.4,
        maxPause: 1.0,
      });

      const purpleArc = createArcController({
        minDuration: 3.5,
        maxDuration: 4.8,
        minPause: 0.5,
        maxPause: 1.2,
      });

      let currentPinkAngle = -105.11;
      let currentPurpleAngle = 18.0;
      let lastTimestamp: number | null = null;

      const loop = (timestamp: number) => {
        if (isCancelled) return;
        const t = timestamp / 1000;
        const deltaSec = lastTimestamp !== null ? Math.min(0.1, (timestamp - lastTimestamp) / 1000) : 0.016;
        lastTimestamp = timestamp;

      const isTablet = typeof window !== "undefined" && window.innerWidth >= 768;
      const scale = isTablet ? 0.35 : 0.15;

      // Pink Unit
      if (roamingState.pink && pinkUnitRef.current && pinkCursorRef.current) {
        if (pinkStart === null) pinkStart = t;
        const dt = Math.max(0, t - pinkStart);
        const easeIn = clamp(dt / 1.2, 0, 1);

        const pinkS = pinkArc.update(deltaSec);
        const arcPink = getArcOffsetPink(pinkS);

        const w1 = (2 * Math.PI) / 4.2;
        const dx = (69.0 + 31.0 * Math.sin(w1 * dt) + 2.0 * Math.cos(2 * w1 * dt)) * scale * easeIn;
        const dyBase = -1.0 + 38.0 * Math.pow(pinkS, 0.7);
        const dyWander = 6.0 * Math.cos(w1 * dt * 0.9) + 2.0 * Math.sin(2 * w1 * dt);
        const dy = (dyBase + dyWander) * scale * easeIn;

        const wOrbit1 = (2 * Math.PI) / 3.8;
        const ox = (arcPink.dx * scale + 0.5 * Math.cos(wOrbit1 * dt)) * easeIn;
        const oy = (arcPink.dy * scale + 0.4 * Math.sin(wOrbit1 * dt)) * easeIn;

        // Tail always faces badge, tip points outward along normal d
        const nearP = getNearestPointOnRoundedRect(arcPink.x, arcPink.y, 192.29, 63.38, 7.2);
        const outAngleP = (Math.atan2(nearP.ny, nearP.nx) * 180) / Math.PI;
        const blendP = Math.max(0, 1 - pinkS / 0.15);
        const targetAngleP = (outAngleP - (-128.16)) - 13.20 * blendP;
        currentPinkAngle = lerpAngle(currentPinkAngle, targetAngleP, 0.12);

        pinkUnitRef.current.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
        pinkCursorRef.current.style.transform = `translate3d(${ox.toFixed(2)}px, ${oy.toFixed(2)}px, 0) rotate(${currentPinkAngle.toFixed(2)}deg)`;
      }

      // Purple Unit
      if (roamingState.purple && purpleUnitRef.current && purpleCursorRef.current) {
        if (purpleStart === null) purpleStart = t;
        const dt = Math.max(0, t - purpleStart);
        const easeIn = clamp(dt / 1.2, 0, 1);

        const purpleS = purpleArc.update(deltaSec);
        const arcPurple = getArcOffsetPurple(purpleS);

        const w2 = (2 * Math.PI) / 4.8;
        const dx = (-58.0 - 30.0 * Math.sin(w2 * dt) + 2.0 * Math.cos(2 * w2 * dt)) * scale * easeIn;
        const dy = (5.0 + 20.0 * Math.cos(w2 * dt * 0.85) + 3.0 * Math.sin(2 * w2 * dt)) * scale * easeIn;

        const wOrbit2 = (2 * Math.PI) / 3.5;
        const ox = (arcPurple.dx * scale - 0.5 * Math.cos(wOrbit2 * dt)) * easeIn;
        const oy = (arcPurple.dy * scale + 0.4 * Math.sin(wOrbit2 * dt)) * easeIn;

        // Tail always faces badge, tip points outward along normal d
        const nearU = getNearestPointOnRoundedRect(arcPurple.x, arcPurple.y, 182.47, 59.01, 9.08);
        const outAngleU = (Math.atan2(nearU.ny, nearU.nx) * 180) / Math.PI;
        const blendU = Math.max(0, 1 - purpleS / 0.15);
        const targetAngleU = (outAngleU - (-46.76)) + 12.88 * blendU;
        currentPurpleAngle = lerpAngle(currentPurpleAngle, targetAngleU, 0.12);

        purpleUnitRef.current.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
        purpleCursorRef.current.style.transform = `translate3d(${ox.toFixed(2)}px, ${oy.toFixed(2)}px, 0) rotate(${currentPurpleAngle.toFixed(2)}deg)`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
  }

  startLoop();

  return () => {
    isCancelled = true;
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  };
}, [roamingState.pink, roamingState.purple]);

  return (
    <section className="relative w-full bg-transparent overflow-hidden pt-12 pb-14 px-4 sm:px-6 md:px-10 flex flex-col items-center">
      {/* Content Flow */}
      <div className="relative z-10 w-full max-w-[680px] flex flex-col items-center gap-6">
        {/* Headline */}
        <div
          data-node-id="mobile-heading"
          className="text-center font-['Architects_Daughter'] text-[32px] sm:text-[40px] md:text-[45px] leading-tight text-black capitalize"
        >
          <p className="mb-0">Hey,</p>
          <p>I’m Kanak !</p>
        </div>

        {/* Badges Row with Typewriter Text & Collaborator Arrows */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 my-2">
          {/* Pink Unit: Arrow + Product Designer Badge (Bottom-Left Outside) */}
          <div
            ref={pinkUnitRef}
            className="collaborator-unit relative flex items-center pointer-events-none"
          >
            <div className="bg-[#ee3f64] border-[3px] border-white rounded-[8px] shadow-[0px_2.88px_7.2px_rgba(0,0,0,0.25)] px-4 py-2 flex items-center justify-center relative z-10">
              <span className="font-['Architects_Daughter'] text-[16px] sm:text-[18px] text-white">
                <TypewriterText
                  text={TEXT_A}
                  visibleCount={typingState.badge1Count}
                  showCaret={typingState.badge1Caret}
                  caretColor="bg-white"
                />
              </span>
            </div>
            {/* Pink arrow indicator at bottom-left outside */}
            <div
              ref={pinkCursorRef}
              data-node-id="mobile-pink-cursor"
              className="absolute -left-2 -bottom-2 w-[28px] h-[26px] rotate-[-105.11deg] pointer-events-none z-20 origin-center"
            >
              <img
                src="/assets/vector.svg"
                alt="Pointer arrow"
                className="w-full h-full block"
              />
            </div>
          </div>

          {/* Purple Unit: UI/UX Designer Badge + Arrow (Top-Right) */}
          <div
            ref={purpleUnitRef}
            className="collaborator-unit relative flex items-center pointer-events-none"
          >
            <div className="bg-[#8364fc] border-[3px] border-white rounded-[9px] shadow-[0px_3.63px_9.08px_rgba(0,0,0,0.25)] px-4 py-2 flex items-center justify-center relative z-10">
              <span className="font-['Architects_Daughter'] text-[16px] sm:text-[18px] text-white">
                <TypewriterText
                  text={TEXT_B}
                  visibleCount={typingState.badge2Count}
                  showCaret={typingState.badge2Caret}
                  caretColor="bg-white"
                />
              </span>
            </div>
            {/* Purple arrow indicator at top-right outside */}
            <div
              ref={purpleCursorRef}
              data-node-id="mobile-purple-cursor"
              className="absolute -right-2 -top-2 w-[26px] h-[27px] rotate-[18deg] pointer-events-none z-20 origin-center"
            >
              <img
                src="/assets/vector1.svg"
                alt="Pointer arrow"
                className="w-full h-full block"
              />
            </div>
          </div>
        </div>

        {/* Central Portrait Visual with Floating Stickers */}
        <div className="relative my-2 flex items-center justify-center">
          {/* Central Portrait with Tap Toggle Crossfade */}
          <div
            ref={portraitRef}
            data-node-id="mobile-portrait"
            data-cursor-key="hero-portrait"
            data-state={showRealPhoto ? "real" : "cartoon"}
            className="w-[260px] h-[340px] sm:w-[320px] sm:h-[430px] md:w-[360px] md:h-[480px] rounded-[180px] overflow-hidden shadow-lg relative bg-[#2da6ff] cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#8364fc]"
            onClick={() => setIsToggled((prev) => !prev)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsToggled((prev) => !prev);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Toggle portrait: cartoon to real photo"
          >
            {/* Cartoon Image */}
            <img
              src="/assets/des-ida-gner2.png"
              alt="Kanak Cartoon Portrait"
              loading="eager"
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover rounded-[180px] transition-opacity duration-200 ease-in-out motion-reduce:transition-none pointer-events-none ${
                showRealPhoto ? "opacity-0" : "opacity-100"
              }`}
            />
            {/* Real Photo Image */}
            <img
              src="/assets/des-ida-gner1.png"
              alt="Kanak Real Photo Portrait"
              loading="eager"
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover rounded-[180px] transition-opacity duration-200 ease-in-out motion-reduce:transition-none pointer-events-none ${
                showRealPhoto ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          {/* Location Stamp floating on left/bottom */}
          <div className="absolute -left-2 sm:-left-8 bottom-4 w-[130px] sm:w-[155px] h-[138px] sm:h-[162px] shadow-sm">
            <img
              src="/assets/union.svg"
              alt="Stamp frame"
              className="absolute inset-0 w-full h-full block"
            />
            <div className="absolute top-[14px] left-[14px] right-[14px] flex justify-between font-['Architects_Daughter'] text-[12px] sm:text-[14px] text-black">
              <span>India</span>
              <span id="mobile-live-time-display" suppressHydrationWarning className="min-w-[48px] text-right">
                {liveTime}
              </span>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-[32px] sm:top-[36px] w-[75px] sm:w-[90px] h-[75px] sm:h-[90px]">
              <img
                src="/assets/hawa-mahal.png"
                alt="Hawa Mahal"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="absolute bottom-[10px] sm:bottom-[12px] left-0 right-0 text-center font-['Architects_Daughter'] text-[12px] sm:text-[14px] text-black">
              Jaipur, Rajasthan
            </div>
          </div>

          {/* Pen Tool sticker floating on right/top */}
          <div className="absolute -right-2 sm:-right-6 top-8 w-[65px] sm:w-[85px] h-[65px] sm:h-[85px] rotate-[-30deg]">
            <img
              src="/assets/pen-tool.png"
              alt="Pen tool"
              className="w-full h-full object-contain drop-shadow"
            />
          </div>
        </div>

        {/* Bio Framing Card */}
        <div className="w-full max-w-[380px] relative px-6 py-5 my-2">
          {/* Corner handles & borders */}
          <div className="absolute left-0 top-0 w-[16px] h-[16px] bg-[#d9d9d9] border-[1.8px] border-black" />
          <div className="absolute right-0 top-0 w-[16px] h-[16px] bg-[#d9d9d9] border-[1.8px] border-black" />
          <div className="absolute left-[16px] right-[16px] top-[7px] h-[1.8px] bg-black" />

          <div className="absolute left-[7px] top-[16px] bottom-[16px] w-[1.8px] bg-black" />
          <div className="absolute right-[7px] top-[16px] bottom-[16px] w-[1.8px] bg-black" />

          <div className="absolute left-0 bottom-0 w-[16px] h-[16px] bg-[#d9d9d9] border-[1.8px] border-black" />
          <div className="absolute right-0 bottom-0 w-[16px] h-[16px] bg-[#d9d9d9] border-[1.8px] border-black" />
          <div className="absolute left-[16px] right-[16px] bottom-[7px] h-[1.8px] bg-black" />

          <p className="font-['Inter'] font-normal text-[14px] sm:text-[15px] leading-[22px] text-black text-center">
            <TypewriterText
              text={TEXT_C}
              visibleCount={typingState.bioCount}
              showCaret={typingState.bioCaret}
              caretColor="bg-black"
            />
          </p>
        </div>

        {/* Scroll Down */}
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="font-['Inter'] font-normal text-[14px] text-black">
            Scroll Down
          </span>
          <div className="w-4 h-4 flex items-center justify-center rotate-90">
            <img src="/assets/arrow-1.svg" alt="" className="w-4" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  return (
    <>
      <div className="hidden xl:block">
        <DesktopHero />
      </div>
      <div className="xl:hidden">
        <MobileHero />
      </div>
    </>
  );
}
