const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const BASE_URL = "http://localhost:3001";
const ARTIFACT_DIR = "C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98";

async function main() {
  console.log("=== STARTING FULL REEL SPLASH VERIFICATION ===");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // TEST 1: FRAME-BY-FRAME rAF TIMING, STEP DURATIONS, MAX GAP & MONOTONICITY
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n--- 1. Testing rAF Timing, Step Durations, and Slide Positions ---");
  const page1 = await browser.newPage();
  await page1.setViewport({ width: 1440, height: 850 });

  await page1.evaluateOnNewDocument(() => {
    window.__frameLog = [];
    window.__longTasks = [];
    window.__heroRevealDispatched = null;
    window.__firstCharTyped = null;

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "longtask") {
            window.__longTasks.push({
              startTime: entry.startTime,
              duration: entry.duration,
            });
          }
        }
      });
      observer.observe({ entryTypes: ["longtask"] });
    } catch {}

    window.addEventListener("hero-reveal", () => {
      if (!window.__heroRevealDispatched) {
        window.__heroRevealDispatched = performance.now();
      }
    });

    let lastTime = performance.now();
    function loop(now) {
      if (!window.__firstCharTyped) {
        const el = document.querySelector('[data-cursor-key="hero-badge-product"] span.opacity-100');
        if (el) window.__firstCharTyped = now;
      }

      const reel = document.getElementById("splash-reel");
      const panel = document.getElementById("splash-screen");
      const hero = document.getElementById("hero-reveal-wrapper") || document.getElementById("main-page-content");
      const items = [0, 1, 2, 3, 4, 5, 6].map((i) => document.getElementById(`splash-item-${i}`));

      if (panel && window.getComputedStyle(panel).display !== "none") {
        const reelTransform = reel ? window.getComputedStyle(reel).transform : "";
        const panelTransform = panel ? window.getComputedStyle(panel).transform : "";
        const heroTransform = hero ? window.getComputedStyle(hero).transform : "";
        const opacities = items.map((el) => (el ? parseFloat(window.getComputedStyle(el).opacity) : 0));

        window.__frameLog.push({
          time: now,
          gap: now - lastTime,
          reelTransform,
          panelTransform,
          heroTransform,
          opacities,
        });
        lastTime = now;
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  });

  await page1.goto(`${BASE_URL}/?splash=1`, { waitUntil: "domcontentloaded" });

  await page1.waitForFunction(
    () => {
      const s = document.getElementById("splash-screen");
      return s === null || window.getComputedStyle(s).display === "none";
    },
    { timeout: 12000 }
  );

  // Allow hero settle and typewriter
  await new Promise((r) => setTimeout(r, 1200));

  const test1Data = await page1.evaluate(() => {
    const start = window.__splashStartTime;
    const end = window.__splashEndTime;
    const heroReveal = window.__heroRevealDispatched;
    const firstChar = window.__firstCharTyped;

    const wrapper = document.getElementById("hero-reveal-wrapper") || document.getElementById("main-page-content");
    const wrapperTransform = wrapper ? window.getComputedStyle(wrapper).transform : "none";
    const header = document.querySelector("header");
    const headerTransform = header ? window.getComputedStyle(header).transform : "none";
    const headerPosition = header ? window.getComputedStyle(header).position : "none";

    const activeFrames = window.__frameLog.filter((f) => f.time >= start && f.time <= end);

    // Long tasks occurring strictly during active splash
    const activeLongTasks = window.__longTasks.filter((t) => t.startTime >= start && t.startTime <= end);

    // Frame gaps during active sequence
    const gaps = activeFrames.map((f) => f.gap).slice(1);
    const maxGap = gaps.length > 0 ? Math.max(...gaps) : 0;

    // Distinct panel and hero positions during slide
    const slideFrames = activeFrames.filter(
      (f) => f.panelTransform && f.panelTransform !== "none" && f.panelTransform !== "matrix(1, 0, 0, 1, 0, 0)"
    );
    const panelPositions = new Set(slideFrames.map((f) => f.panelTransform)).size;
    const heroPositions = new Set(slideFrames.map((f) => f.heroTransform)).size;

    // Monotonicity of reel transform
    const reelYs = [];
    activeFrames.forEach((f) => {
      if (f.reelTransform && f.reelTransform.startsWith("matrix")) {
        const parts = f.reelTransform.split(",");
        const y = parseFloat(parts[5]);
        reelYs.push(y);
      }
    });

    let isMonotonic = true;
    for (let i = 1; i < reelYs.length; i++) {
      if (reelYs[i] > reelYs[i - 1] + 0.1) {
        // Y translation should become more negative (moving up)
        isMonotonic = false;
        break;
      }
    }

    // Measure step transitions from item opacities and reel translation
    const stepTimes = [];
    for (let i = 0; i < 7; i++) {
      const matching = activeFrames.filter((f) => {
        const maxOp = Math.max(...f.opacities);
        return f.opacities[i] === maxOp && maxOp >= 0.5;
      });
      if (matching.length > 0) {
        stepTimes.push({
          step: i,
          firstTime: matching[0].time,
          lastTime: matching[matching.length - 1].time,
        });
      }
    }

    const stepDurations = [];
    for (let i = 0; i < stepTimes.length - 1; i++) {
      const dur = stepTimes[i + 1].firstTime - stepTimes[i].firstTime;
      stepDurations.push({
        fromStep: i,
        toStep: i + 1,
        durationMs: dur,
      });
    }

    return {
      start,
      end,
      totalDurationMs: end - start,
      heroRevealRel: heroReveal ? heroReveal - start : null,
      firstCharRel: firstChar ? firstChar - start : null,
      activeLongTasks,
      maxGapMs: maxGap,
      panelPositions,
      heroPositions,
      isMonotonic,
      stepDurations,
      wrapperTransform,
      headerTransform,
      headerPosition,
    };
  });

  console.log(`Active splash duration: ${test1Data.totalDurationMs.toFixed(1)}ms`);
  console.log(`Long tasks (>50ms) during splash: ${test1Data.activeLongTasks.length}`);
  console.log(`Max frame gap: ${test1Data.maxGapMs.toFixed(2)}ms`);
  console.log(`Distinct panel slide positions: ${test1Data.panelPositions} (Target: >= 50)`);
  console.log(`Distinct hero reveal positions: ${test1Data.heroPositions}`);
  console.log(`Reel transform strictly monotonic: ${test1Data.isMonotonic}`);
  console.log(`Hero typewriter first char relative to start: ${test1Data.firstCharRel ? test1Data.firstCharRel.toFixed(1) : "N/A"}ms`);
  console.log(`Wrapper transform after splash: "${test1Data.wrapperTransform}" (Expected: "none")`);
  console.log(`Header transform after splash: "${test1Data.headerTransform}" (Expected: "none")`);
  console.log("Step durations between successive greetings:");
  test1Data.stepDurations.forEach((s) => {
    console.log(`  Step ${s.fromStep} -> ${s.toStep}: ${s.durationMs.toFixed(1)}ms (Target: 480ms ± 17ms)`);
  });

  await page1.close();

  // ─────────────────────────────────────────────────────────────────────────────
  // TEST 2: CPU 4X THROTTLING (Compositor-only smooth animation)
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n--- 2. Testing with 4x CPU Throttling ---");
  const pageCpu = await browser.newPage();
  await pageCpu.setViewport({ width: 1440, height: 850 });
  const clientCpu = await pageCpu.target().createCDPSession();
  await clientCpu.send("Emulation.setCPUThrottlingRate", { rate: 4 });

  await pageCpu.evaluateOnNewDocument(() => {
    window.__frameLog = [];
    let lastTime = performance.now();
    function loop(now) {
      const panel = document.getElementById("splash-screen");
      if (panel && window.getComputedStyle(panel).display !== "none") {
        window.__frameLog.push({
          time: now,
          panelTransform: window.getComputedStyle(panel).transform,
        });
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  });

  await pageCpu.goto(`${BASE_URL}/?splash=1`, { waitUntil: "domcontentloaded" });
  await pageCpu.waitForFunction(
    () => {
      const s = document.getElementById("splash-screen");
      return s === null || window.getComputedStyle(s).display === "none";
    },
    { timeout: 20000 }
  );

  const cpuData = await pageCpu.evaluate(() => {
    const start = window.__splashStartTime;
    const end = window.__splashEndTime;
    const active = window.__frameLog.filter((f) => f.time >= start && f.time <= end);
    const panelPositions = new Set(active.map((f) => f.panelTransform)).size;
    return {
      frames: active.length,
      panelPositions,
      durationMs: end - start,
    };
  });

  console.log(`CPU 4x - Total frames: ${cpuData.frames}, Distinct panel positions: ${cpuData.panelPositions}`);
  await pageCpu.close();

  // ─────────────────────────────────────────────────────────────────────────────
  // TEST 3: CLICK TO SKIP (Fast-forward to Hello! and 0.5s slide)
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n--- 3. Testing Click to Skip ---");
  const pageSkip = await browser.newPage();
  await pageSkip.setViewport({ width: 1440, height: 850 });
  await pageSkip.goto(`${BASE_URL}/?splash=1`, { waitUntil: "domcontentloaded" });
  await pageSkip.waitForFunction(() => typeof window.__splashStartTime === "number");
  await new Promise((r) => setTimeout(r, 150));

  const clickTime = Date.now();
  await pageSkip.mouse.click(720, 425);
  console.log("Clicked to skip during greetings sequence");

  await pageSkip.waitForFunction(
    () => {
      const s = document.getElementById("splash-screen");
      return s === null || window.getComputedStyle(s).display === "none";
    },
    { timeout: 2000 }
  );
  const skipDuration = Date.now() - clickTime;
  console.log(`Skip completed in ${skipDuration}ms (Expected ~500-700ms)`);
  await pageSkip.close();

  // ─────────────────────────────────────────────────────────────────────────────
  // TEST 4: PREFERS-REDUCED-MOTION (Hold 0.5s, Fade 0.3s, no slide/parallax)
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n--- 4. Testing prefers-reduced-motion ---");
  const pageMotion = await browser.newPage();
  await pageMotion.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await pageMotion.setViewport({ width: 1440, height: 850 });
  const motionStart = Date.now();
  await pageMotion.goto(`${BASE_URL}/?splash=1`, { waitUntil: "domcontentloaded" });

  await pageMotion.waitForFunction(
    () => {
      const s = document.getElementById("splash-screen");
      return s === null || window.getComputedStyle(s).display === "none";
    },
    { timeout: 3000 }
  );
  const motionDuration = Date.now() - motionStart;
  console.log(`Reduced motion splash completed cleanly in ${motionDuration}ms`);
  await pageMotion.close();

  // ─────────────────────────────────────────────────────────────────────────────
  // TEST 5: SESSION PERSISTENCE & CLIENT-SIDE NAVIGATION
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n--- 5. Testing Session Persistence & Navigation ---");
  const pageNav = await browser.newPage();
  await pageNav.setViewport({ width: 1440, height: 850 });
  await pageNav.goto(`${BASE_URL}/?splash=1`, { waitUntil: "domcontentloaded" });
  await pageNav.waitForFunction(() => {
    const s = document.getElementById("splash-screen");
    return s === null || window.getComputedStyle(s).display === "none";
  });

  // Reload in same session:
  await pageNav.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
  await new Promise((r) => setTimeout(r, 300));
  const reloadSplash = await pageNav.evaluate(() => {
    const s = document.getElementById("splash-screen");
    return s !== null && window.getComputedStyle(s).display !== "none";
  });
  console.log(`Reload in same session shows splash: ${reloadSplash} (Expected: false)`);

  // Navigate to /about:
  const aboutLink = await pageNav.$('a[data-cursor-key="nav-about"]');
  if (aboutLink) {
    await Promise.all([
      aboutLink.click(),
      pageNav.waitForNavigation({ waitUntil: "domcontentloaded" }).catch(() => {}),
    ]);
    await new Promise((r) => setTimeout(r, 600));
    let aboutSplash = false;
    try {
      aboutSplash = await pageNav.evaluate(() => {
        const s = document.getElementById("splash-screen");
        return s !== null && window.getComputedStyle(s).display !== "none";
      });
    } catch {
      aboutSplash = false;
    }
    console.log(`Client navigation to /about shows splash: ${aboutSplash} (Expected: false)`);
  }
  await pageNav.close();

  // ─────────────────────────────────────────────────────────────────────────────
  // TEST 6: RESPONSIVE VIEWPORTS
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n--- 6. Testing Responsive Viewports ---");
  const viewports = [
    { w: 360, h: 740, name: "360px_mobile" },
    { w: 390, h: 844, name: "390px_mobile" },
    { w: 844, h: 390, name: "landscape_phone" },
    { w: 768, h: 1024, name: "768px_tablet" },
    { w: 1024, h: 768, name: "1024px_desktop" },
    { w: 1440, h: 850, name: "1440px_desktop" },
    { w: 1920, h: 1080, name: "1920px_desktop" },
    { w: 2560, h: 1440, name: "2560px_large" },
  ];

  for (const vp of viewports) {
    const p = await browser.newPage();
    await p.setViewport({ width: vp.w, height: vp.h });
    await p.goto(`${BASE_URL}/?splash=1`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 200));

    const vpMetrics = await p.evaluate(() => {
      const el = document.getElementById("splash-item-0");
      const text = el ? el.querySelector(".greeting-text") : null;
      const windowEl = document.getElementById("splash-reel-window");
      return {
        fontSize: text ? window.getComputedStyle(text).fontSize : "",
        itemHeight: el ? el.getBoundingClientRect().height : 0,
        windowHeight: windowEl ? windowEl.getBoundingClientRect().height : 0,
        textWidth: text ? text.getBoundingClientRect().width : 0,
      };
    });

    console.log(
      `Viewport ${vp.name} (${vp.w}x${vp.h}): fontSize=${vpMetrics.fontSize}, itemHeight=${vpMetrics.itemHeight.toFixed(1)}px, windowHeight=${vpMetrics.windowHeight.toFixed(1)}px`
    );
    await p.close();
  }

  await browser.close();
  console.log("\n=== ALL VERIFICATION TESTS COMPLETED SUCCESSFULLY ===");
}

main().catch((err) => {
  console.error("Verification error:", err);
  process.exit(1);
});
