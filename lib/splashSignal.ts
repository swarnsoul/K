/**
 * Splash Screen Global Signal
 * Coordinates page animations (hero typewriter, collaboration cursors,
 * nav sway, sticky unfolds) with the splash screen lifecycle.
 */

let splashDonePromise: Promise<void> | null = null;
let resolveSplashDone: (() => void) | null = null;

let heroRevealPromise: Promise<void> | null = null;
let resolveHeroReveal: (() => void) | null = null;

export function isSplashPending(): boolean {
  if (typeof window === "undefined") return false;
  return document.documentElement.classList.contains("splash-pending");
}

export function onSplashDone(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  // Already finished or skipped
  if (
    document.documentElement.classList.contains("splash-done") ||
    document.documentElement.classList.contains("splash-skip")
  ) {
    return Promise.resolve();
  }

  if (!splashDonePromise) {
    splashDonePromise = new Promise<void>((resolve) => {
      resolveSplashDone = resolve;

      const handleEvent = () => {
        window.removeEventListener("splash-completed", handleEvent);
        resolve();
      };
      window.addEventListener("splash-completed", handleEvent);

      // Failsafe timer (10s): resolve regardless
      setTimeout(() => {
        resolve();
      }, 10000);
    });
  }

  return splashDonePromise;
}

export function onHeroReveal(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  // Already revealed or finished
  if (
    document.documentElement.classList.contains("splash-done") ||
    document.documentElement.classList.contains("splash-skip")
  ) {
    return Promise.resolve();
  }

  if (!heroRevealPromise) {
    heroRevealPromise = new Promise<void>((resolve) => {
      resolveHeroReveal = resolve;

      const handleEvent = () => {
        window.removeEventListener("hero-reveal", handleEvent);
        resolve();
      };
      window.addEventListener("hero-reveal", handleEvent);

      // Failsafe timer (10s)
      setTimeout(() => {
        resolve();
      }, 10000);
    });
  }

  return heroRevealPromise;
}

export function markHeroRevealed(): void {
  if (typeof window === "undefined") return;

  window.dispatchEvent(new CustomEvent("hero-reveal"));

  if (resolveHeroReveal) {
    resolveHeroReveal();
    resolveHeroReveal = null;
  }
}

export function markSplashDone(): void {
  if (typeof window === "undefined") return;

  markHeroRevealed();

  document.documentElement.classList.remove("splash-pending");
  document.documentElement.classList.add("splash-done");

  try {
    sessionStorage.setItem("visited_session", "true");
  } catch {
    // ignore sessionStorage errors
  }

  window.dispatchEvent(new CustomEvent("splash-completed"));

  if (resolveSplashDone) {
    resolveSplashDone();
    resolveSplashDone = null;
  }
}
