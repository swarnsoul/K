"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { SPLASH_TIMING, GREETINGS_SEQUENCE, GreetingItem } from "@/lib/splashTiming";
import { markSplashDone, markHeroRevealed } from "@/lib/splashSignal";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  const panelRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isSkippedRef = useRef(false);
  const isFinishedRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const timeoutIdsRef = useRef<NodeJS.Timeout[]>([]);
  const animsRef = useRef<Animation[]>([]);

  const cleanup = useCallback(() => {
    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current = [];
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    animsRef.current.forEach((a) => {
      try {
        a.cancel();
      } catch {
        // ignore
      }
    });
    animsRef.current = [];
  }, []);

  const finishSplash = useCallback(() => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    cleanup();

    if (panelRef.current) {
      panelRef.current.style.display = "none";
      panelRef.current.style.willChange = "auto";
    }

    if (typeof window !== "undefined") {
      (window as any).__splashEndTime = performance.now();
    }

    // Clean up wrapper transforms completely to prevent containing-block bugs
    const heroWrapper = document.getElementById("hero-reveal-wrapper");
    if (heroWrapper) {
      heroWrapper.style.transform = "";
      heroWrapper.style.willChange = "";
    }
    const mainContent = document.getElementById("main-page-content");
    if (mainContent) {
      mainContent.removeAttribute("inert");
      mainContent.removeAttribute("aria-hidden");
      mainContent.style.transform = "";
      mainContent.style.willChange = "";
    }
    const headers = document.querySelectorAll("header");
    headers.forEach((h) => {
      (h as HTMLElement).style.transform = "";
      (h as HTMLElement).style.willChange = "";
    });

    // Restore focus to body/document
    try {
      document.body.focus();
    } catch {
      // ignore
    }

    markSplashDone();
    setVisible(false);
  }, [cleanup]);

  useEffect(() => {
    const isClient = typeof window !== "undefined";
    if (!isClient) return;

    const search = window.location.search;
    const forceSplash = search.includes("splash=1");
    const pathname = window.location.pathname;
    const isSubpage = pathname !== "/";
    let hasVisited = false;
    try {
      hasVisited = !!sessionStorage.getItem("visited_session");
    } catch {
      // ignore
    }

    if (isSubpage || (!forceSplash && hasVisited)) {
      finishSplash();
      return;
    }

    // Mark session visited immediately so reloads don't replay splash
    try {
      sessionStorage.setItem("visited_session", "true");
    } catch {
      // ignore
    }

    // Ensure scroll lock class is present
    document.documentElement.classList.add("splash-pending");
    document.documentElement.classList.remove("splash-skip");

    // Block physical wheel/touch scrolling during splash
    const blockScroll = (e: Event) => {
      e.preventDefault();
    };
    window.addEventListener("wheel", blockScroll, { passive: false });
    window.addEventListener("touchmove", blockScroll, { passive: false });

    // Set inert and aria-hidden on main content while splash is active
    const mainContent = document.getElementById("main-page-content");
    if (mainContent) {
      mainContent.setAttribute("inert", "");
      mainContent.setAttribute("aria-hidden", "true");
    }

    const panel = panelRef.current;
    if (!panel) {
      window.removeEventListener("wheel", blockScroll);
      window.removeEventListener("touchmove", blockScroll);
      finishSplash();
      return;
    }

    // Preload hero images inside requestIdleCallback to avoid main-thread stutters
    const preloadHeroImages = () => {
      const runDecode = () => {
        try {
          const img1 = new Image();
          img1.src = "/assets/des-ida-gner1.png";
          const img2 = new Image();
          img2.src = "/assets/des-ida-gner2.png";
          if (img1.decode) img1.decode().catch(() => {});
          if (img2.decode) img2.decode().catch(() => {});
        } catch {
          // ignore
        }
      };

      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        (window as any).requestIdleCallback(runDecode, { timeout: 2000 });
      } else {
        setTimeout(runDecode, 100);
      }
    };
    preloadHeroImages();

    // 1. Reduced motion check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      // Show only item 0 ("Hello!")
      itemRefs.current.forEach((el, idx) => {
        if (el) el.style.opacity = idx === 0 ? "1" : "0";
      });

      const t1 = setTimeout(() => {
        panel.style.willChange = "opacity";
        const fadeAnim = panel.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          {
            duration: SPLASH_TIMING.REDUCED_MOTION_FADE_MS,
            fill: "forwards",
          }
        );
        fadeAnim.onfinish = () => {
          finishSplash();
        };
        const tFadeFallback = setTimeout(() => {
          finishSplash();
        }, SPLASH_TIMING.REDUCED_MOTION_FADE_MS + 50);
        timeoutIdsRef.current.push(tFadeFallback);
      }, SPLASH_TIMING.REDUCED_MOTION_HOLD_MS);

      timeoutIdsRef.current.push(t1);

      return () => {
        window.removeEventListener("wheel", blockScroll);
        window.removeEventListener("touchmove", blockScroll);
        cleanup();
      };
    }

    // Helper: Run upward slide of panel and parallax reveal of page content
    const runSlideAndReveal = async (slideDurationMs: number, revealDurationMs: number) => {
      if (isFinishedRef.current) return;
      panel.style.willChange = "transform";

      const heroWrapper = document.getElementById("hero-reveal-wrapper") || document.getElementById("main-page-content");
      const headers = document.querySelectorAll("header");

      // Set initial reveal positions
      if (heroWrapper) {
        heroWrapper.style.willChange = "transform";
      }
      headers.forEach((h) => {
        (h as HTMLElement).style.willChange = "transform";
      });

      // 1. Panel upward slide: translate3d(0, 0, 0) -> translate3d(0, -100%, 0)
      const panelAnim = panel.animate(
        [
          { transform: "translate3d(0, 0, 0)" },
          { transform: "translate3d(0, -100%, 0)" },
        ],
        {
          duration: slideDurationMs,
          easing: SPLASH_TIMING.SLIDE_EASING,
          fill: "forwards",
        }
      );
      animsRef.current.push(panelAnim);

      // 2. Hero parallax reveal: translate3d(0, 10vh, 0) -> translate3d(0, 0, 0)
      let heroAnim: Animation | null = null;
      if (heroWrapper) {
        heroAnim = heroWrapper.animate(
          [
            { transform: `translate3d(0, ${SPLASH_TIMING.HERO_REVEAL_DISTANCE}, 0)` },
            { transform: "translate3d(0, 0, 0)" },
          ],
          {
            duration: revealDurationMs,
            easing: SPLASH_TIMING.HERO_REVEAL_EASING,
            fill: "forwards",
          }
        );
        animsRef.current.push(heroAnim);
      }

      // 3. Counter-animate fixed nav headers so they remain stationary in screen coordinates
      headers.forEach((h) => {
        const headerAnim = h.animate(
          [
            { transform: `translate3d(0, -${SPLASH_TIMING.HERO_REVEAL_DISTANCE}, 0)` },
            { transform: "translate3d(0, 0, 0)" },
          ],
          {
            duration: revealDurationMs,
            easing: SPLASH_TIMING.HERO_REVEAL_EASING,
            fill: "forwards",
          }
        );
        animsRef.current.push(headerAnim);
      });

      // Trigger hero typewriter & cursors at 70% of slide
      const heroTriggerMs = slideDurationMs * SPLASH_TIMING.HERO_TRIGGER_PERCENT;
      const tHero = setTimeout(() => {
        markHeroRevealed();
      }, heroTriggerMs);
      timeoutIdsRef.current.push(tHero);

      // Await animations finish
      try {
        await panelAnim.finished;
        if (heroAnim) {
          await heroAnim.finished;
        }
      } catch {
        // Animation cancelled or interrupted
      }

      finishSplash();
    };

    // 2. Skip Handler (Click / Tap / Any key press)
    const handleSkip = () => {
      if (isSkippedRef.current || isFinishedRef.current) return;
      isSkippedRef.current = true;
      cleanup();

      // Immediately show final "Hello!" (index 6) in the center
      const lastIndex = GREETINGS_SEQUENCE.length - 1;
      itemRefs.current.forEach((el, idx) => {
        if (el) el.style.opacity = idx === lastIndex ? "1" : "0";
      });

      // Run fast slide immediately (0.5s)
      runSlideAndReveal(SPLASH_TIMING.SKIP_SLIDE_MS, SPLASH_TIMING.SKIP_SLIDE_MS);
    };

    window.addEventListener("pointerdown", handleSkip);
    window.addEventListener("mousedown", handleSkip);
    window.addEventListener("touchstart", handleSkip);
    window.addEventListener("keydown", handleSkip);

    // 3. Font Loading & Two rAFs Paint Preparation
    const startSequence = async () => {
      const fontTimeout = new Promise<void>((resolve) =>
        setTimeout(resolve, SPLASH_TIMING.MAX_FONT_WAIT_MS)
      );

      const loadFonts = async () => {
        try {
          if (document.fonts) {
            await Promise.all([
              document.fonts.load('128px "Architects Daughter"'),
              document.fonts.load('128px "Noto Sans Devanagari"'),
              document.fonts.load('128px "Noto Sans JP"'),
            ]);
            await document.fonts.ready;
          }
        } catch {
          // ignore
        }
      };

      await Promise.race([loadFonts(), fontTimeout]);

      // Wait until two animation frames have painted
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            resolve();
          });
        });
      });

      if (isSkippedRef.current || isFinishedRef.current) return;

      // Expose timeline start time and panel element for verification
      (window as any).__splashStartTime = performance.now();
      (window as any).__panelElement = panel;

      // 4. Quick Instant-Cut Language Changes (No fade, no smart animation)
      const wordDuration = SPLASH_TIMING.WORD_DURATION_MS; // 200ms
      const totalDuration = SPLASH_TIMING.TOTAL_GREETINGS_MS; // 1550ms
      const lastIndex = GREETINGS_SEQUENCE.length - 1; // 6

      let currentActiveIdx = 0;
      const startTime = performance.now();

      const tick = (now: number) => {
        if (isSkippedRef.current || isFinishedRef.current) return;
        const elapsed = now - startTime;

        let nextIdx = Math.floor(elapsed / wordDuration);
        if (nextIdx > lastIndex) {
          nextIdx = lastIndex;
        }

        if (nextIdx !== currentActiveIdx) {
          // Instant cut: hide old word, show new word immediately
          const prevEl = itemRefs.current[currentActiveIdx];
          const nextEl = itemRefs.current[nextIdx];
          if (prevEl) prevEl.style.opacity = "0";
          if (nextEl) nextEl.style.opacity = "1";
          currentActiveIdx = nextIdx;
        }

        if (elapsed >= totalDuration) {
          // Final greeting hold complete, start smooth upward slide of purple screen
          runSlideAndReveal(SPLASH_TIMING.SLIDE_MS, SPLASH_TIMING.HERO_REVEAL_MS);
          return;
        }

        rafIdRef.current = requestAnimationFrame(tick);
      };

      rafIdRef.current = requestAnimationFrame(tick);
    };

    startSequence();

    // 6. Absolute 10s Fail-Safe
    const tSafety = setTimeout(() => {
      finishSplash();
    }, SPLASH_TIMING.SAFETY_TIMEOUT_MS);
    timeoutIdsRef.current.push(tSafety);

    return () => {
      window.removeEventListener("wheel", blockScroll);
      window.removeEventListener("touchmove", blockScroll);
      window.removeEventListener("pointerdown", handleSkip);
      window.removeEventListener("mousedown", handleSkip);
      window.removeEventListener("touchstart", handleSkip);
      window.removeEventListener("keydown", handleSkip);
      cleanup();
    };
  }, [finishSplash, cleanup]);

  if (!visible) return null;

  const getFontClass = (script: GreetingItem["script"]) => {
    switch (script) {
      case "devanagari":
        return "font-devanagari";
      case "japanese":
        return "font-japanese";
      default:
        return "font-architects";
    }
  };

  return (
    <div
      ref={panelRef}
      id="splash-screen"
      className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-auto select-none overflow-hidden bg-[#8364fc] border-b border-black border-solid min-h-[100vh] h-[100lvh]"
      style={{
        paddingTop: "env(safe-area-inset-top, 0px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        paddingLeft: "env(safe-area-inset-left, 0px)",
        paddingRight: "env(safe-area-inset-right, 0px)",
        willChange: "transform",
      }}
      aria-hidden="true"
      role="presentation"
    >
      {/* Fixed greetings container: all greetings overlap in the exact same center position */}
      <div
        id="splash-words-container"
        className="relative flex items-center justify-center w-full max-w-[90vw] select-none pointer-events-none"
        style={{
          height: "var(--splash-line-pitch)",
        }}
      >
        {GREETINGS_SEQUENCE.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            id={`splash-item-${idx}`}
            className="absolute inset-0 flex items-center justify-center text-center text-white select-none pointer-events-none"
            style={{
              opacity: idx === 0 ? 1 : 0,
              transition: "none",
            }}
          >
            <span
              className={`greeting-text font-normal not-italic tracking-normal select-none inline-block whitespace-nowrap ${getFontClass(
                item.script
              )}`}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
