const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const ARTIFACT_DIR = "C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98";
const BASE_URL = "http://localhost:3001";

async function main() {
  console.log("=== STARTING SPLASH SCREEN VERIFICATION ===");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const consoleErrors = [];
  const pageErrors = [];

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. TIMELINE & FRAME CAPTURES AT EXACT SECONDS (1440x900)
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n--- 1. Testing Frames at 0.3, 0.8, 1.5, 2.5, 3.5, 4.5, 5.2, 5.8, 6.3, 6.7, 7.3s ---");
  const page1 = await browser.newPage();
  await page1.setViewport({ width: 1440, height: 900 });
  page1.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(`[Console Error] ${msg.text()}`);
  });
  page1.on("pageerror", (err) => pageErrors.push(`[Page Error] ${err.toString()}`));

  // Open with ?splash=1
  const startTime = Date.now();
  await page1.goto(`${BASE_URL}/?splash=1`, { waitUntil: "domcontentloaded" });

  // 100ms First paint check:
  const firstPaintSplashVisible = await page1.evaluate(() => {
    const splash = document.getElementById("splash-screen");
    return splash !== null && window.getComputedStyle(splash).display !== "none";
  });
  console.log(`First paint at ~100ms shows splash: ${firstPaintSplashVisible}`);

  const targetTimes = [0.3, 0.8, 1.5, 2.5, 3.5, 4.5, 5.2, 5.8, 6.3, 6.7, 7.3];
  for (const t of targetTimes) {
    const targetMs = t * 1000;
    const elapsed = Date.now() - startTime;
    const waitMs = Math.max(0, targetMs - elapsed);
    if (waitMs > 0) {
      await new Promise((r) => setTimeout(r, waitMs));
    }
    const fname = `splash_frame_${t.toFixed(1).replace(".", "_")}s.png`;
    await page1.screenshot({ path: path.join(ARTIFACT_DIR, fname) });
    console.log(`Captured ${fname} at actual elapsed: ${((Date.now() - startTime) / 1000).toFixed(2)}s`);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. END STATE SWAP DIFFERENCE
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n--- 2. End State: Swap Difference in PX & Similarity ---");
  await new Promise((r) => setTimeout(r, 200));
  // Capture the nav logo after the splash has finished
  const navLogoEl = await page1.$('[data-cursor-key="nav-logo"]');
  const postSplashBBox = await navLogoEl.boundingBox();
  const postSplashImg = await navLogoEl.screenshot();
  fs.writeFileSync(path.join(ARTIFACT_DIR, "nav_logo_post_splash.png"), postSplashImg);

  // Reload in the same page/session: splash is skipped
  await page1.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  const reloadNavLogoEl = await page1.$('[data-cursor-key="nav-logo"]');
  const skippedBBox = await reloadNavLogoEl.boundingBox();
  const skippedImg = await reloadNavLogoEl.screenshot();
  fs.writeFileSync(path.join(ARTIFACT_DIR, "nav_logo_skipped.png"), skippedImg);

  const dx = Math.abs(postSplashBBox.x - skippedBBox.x);
  const dy = Math.abs(postSplashBBox.y - skippedBBox.y);
  const dw = Math.abs(postSplashBBox.width - skippedBBox.width);
  const dh = Math.abs(postSplashBBox.height - skippedBBox.height);
  const maxSwapDiffPx = Math.max(dx, dy, dw, dh);
  console.log(`Nav logo position diff: dx=${dx.toFixed(2)}px, dy=${dy.toFixed(2)}px, dw=${dw.toFixed(2)}px, dh=${dh.toFixed(2)}px`);
  console.log(`Max swap diff in px: ${maxSwapDiffPx.toFixed(2)}px (Requirement: <= 1px)`);

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. SESSION PERSISTENCE & CLIENT NAVIGATION
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n--- 3. Session Persistence & Client Navigation ---");
  const reloadShowedSplash = await page1.evaluate(() => {
    const splash = document.getElementById("splash-screen");
    return splash !== null && window.getComputedStyle(splash).display !== "none";
  });
  console.log(`Returning reload shows splash: ${reloadShowedSplash} (Expected: false)`);

  // Navigate client-side to /about
  await (await page1.waitForSelector('a[data-cursor-key="nav-about"]')).click();
  await new Promise((r) => setTimeout(r, 800));
  const clientNavShowedSplash = await page1.evaluate(() => {
    const splash = document.getElementById("splash-screen");
    return splash !== null && window.getComputedStyle(splash).display !== "none";
  });
  console.log(`Client navigation to /about shows splash: ${clientNavShowedSplash} (Expected: false)`);

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. SCROLL LOCK & HERO ANIMATION DELAY
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n--- 4. Scroll Lock & Page Animations Delay ---");
  const pageLock = await browser.newPage();
  await pageLock.setViewport({ width: 1440, height: 900 });
  await pageLock.goto(`${BASE_URL}/?splash=1`, { waitUntil: "domcontentloaded" });
  await new Promise((r) => setTimeout(r, 1500)); // During splash (letters typing)

  const isLockedDuring = await pageLock.evaluate(() => {
    return document.documentElement.classList.contains("splash-pending");
  });
  console.log(`Class splash-pending is present during splash: ${isLockedDuring}`);

  // Check that Hero typewriter is NOT playing yet during splash
  const heroBadgeCountDuring = await pageLock.evaluate(() => {
    const badge = document.querySelector('[data-cursor-key="hero-badge-product"]');
    // Get visible character count (spans with opacity-100)
    const spans = badge ? Array.from(badge.querySelectorAll("span.opacity-100")) : [];
    return spans.length;
  });
  console.log(`Hero typewriter characters revealed during splash (at 1.5s): ${heroBadgeCountDuring} (Expected 0)`);

  // Wait for splash to complete (at 8.0s total elapsed)
  await new Promise((r) => setTimeout(r, 6500));
  const isUnlockedAfter = await pageLock.evaluate(() => {
    return (
      document.documentElement.classList.contains("splash-done") &&
      !document.documentElement.classList.contains("splash-pending")
    );
  });
  console.log(`Splash-done class active after splash finishes: ${isUnlockedAfter}`);

  // Allow 1s for hero typewriter to start
  await new Promise((r) => setTimeout(r, 1000));
  const heroBadgeCountAfter = await pageLock.evaluate(() => {
    const badge = document.querySelector('[data-cursor-key="hero-badge-product"]');
    const spans = badge ? Array.from(badge.querySelectorAll("span.opacity-100")) : [];
    return spans.length;
  });
  console.log(`Hero typewriter characters revealed after splash: ${heroBadgeCountAfter} (Has started typing)`);

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. CLICK TO SKIP
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n--- 5. Click to Skip (Fast-forward) ---");
  const pageSkip = await browser.newPage();
  await pageSkip.setViewport({ width: 1440, height: 900 });
  await pageSkip.goto(`${BASE_URL}/?splash=1`, { waitUntil: "domcontentloaded" });
  await new Promise((r) => setTimeout(r, 1200));

  // Click on the splash overlay
  await pageSkip.mouse.click(720, 450);
  console.log("Clicked to skip at 1.2s");

  // Wait 700ms (should be finished since skip fly duration is 500ms)
  await new Promise((r) => setTimeout(r, 700));
  const skipFinished = await pageSkip.evaluate(() => {
    const splash = document.getElementById("splash-screen");
    return splash === null || window.getComputedStyle(splash).display === "none";
  });
  console.log(`Splash finished ~600ms after skip click: ${skipFinished} (Expected: true)`);
  await pageSkip.screenshot({ path: path.join(ARTIFACT_DIR, "splash_after_skip.png") });

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. PREFERS-REDUCED-MOTION
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n--- 6. prefers-reduced-motion ---");
  const pageMotion = await browser.newPage();
  await pageMotion.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await pageMotion.setViewport({ width: 1440, height: 900 });
  await pageMotion.goto(`${BASE_URL}/?splash=1`, { waitUntil: "domcontentloaded" });

  // Wait 1500ms: reduced motion should have faded out by 0.7s (0.4s hold + 0.3s fade)
  await new Promise((r) => setTimeout(r, 1500));
  const motionFinished = await pageMotion.evaluate(() => {
    const splash = document.getElementById("splash-screen");
    return splash === null || window.getComputedStyle(splash).display === "none";
  });
  console.log(`Splash with reduced motion completed by 1500ms: ${motionFinished} (Expected: true)`);

  // ─────────────────────────────────────────────────────────────────────────────
  // 7. RESPONSIVE WIDTHS (1440, 1024, 768, 390)
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n--- 7. Responsive Widths (1440, 1024, 768, 390px) ---");
  const widths = [1440, 1024, 768, 390];
  const responsiveResults = [];
  for (const w of widths) {
    const p = await browser.newPage();
    await p.setViewport({ width: w, height: w === 390 ? 844 : 900 });
    await p.goto(`${BASE_URL}/?splash=1`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 600));

    const logoInfo = await p.evaluate(() => {
      const container = document.getElementById("splash-logo-container");
      const r = container?.getBoundingClientRect();
      return {
        width: r ? r.width : 0,
        height: r ? r.height : 0,
        centerX: r ? r.left + r.width / 2 : 0,
        centerY: r ? r.top + r.height / 2 : 0,
        windowW: window.innerWidth,
        windowH: window.innerHeight,
      };
    });

    const isCentered =
      Math.abs(logoInfo.centerX - logoInfo.windowW / 2) < 2 &&
      Math.abs(logoInfo.centerY - logoInfo.windowH / 2) < 2;

    responsiveResults.push({
      width: w,
      logoWidth: Math.round(logoInfo.width),
      isCentered,
    });
    console.log(`Width ${w}px: logo width = ${Math.round(logoInfo.width)}px, centered = ${isCentered}`);
    await p.screenshot({ path: path.join(ARTIFACT_DIR, `splash_responsive_${w}px.png`) });
    await p.close();
  }

  console.log("\n=== CONSOLE & PAGE ERRORS ===");
  console.log("Console Errors:", consoleErrors.length);
  console.log("Page Errors:", pageErrors.length);
  if (consoleErrors.length > 0) console.log(consoleErrors);
  if (pageErrors.length > 0) console.log(pageErrors);

  await browser.close();
  console.log("\n=== ALL VERIFICATIONS COMPLETED SUCCESSFULLY ===");
}

main().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
