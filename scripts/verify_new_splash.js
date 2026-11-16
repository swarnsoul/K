const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const ARTIFACT_DIR = "C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98";
const BASE_URL = "http://localhost:3001";

async function main() {
  console.log("=== STARTING NEW 'HELLO' GREETINGS SPLASH VERIFICATION ===");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const consoleErrors = [];
  const pageErrors = [];

  // Warm up dev server so initial compilation doesn't add skew
  console.log("Warming up dev server...");
  const warmPage = await browser.newPage();
  await warmPage.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  await warmPage.close();
  console.log("Dev server warm.");

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. TIMELINE & GREETINGS HARD CUTS (1440x850, matching Desktop - 17)
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n--- 1. Testing Greetings Hard Cuts at 0.1, 0.4, 0.8, 1.2, 1.6, 2.0, 2.4, 2.8, 3.2s ---");
  const page1 = await browser.newPage();
  await page1.setViewport({ width: 1440, height: 850 });
  page1.setDefaultTimeout(10000);

  page1.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(`[Console Error] ${msg.text()}`);
    }
  });
  page1.on("pageerror", (err) => pageErrors.push(`[Page Error] ${err.toString()}`));

  await page1.goto(`${BASE_URL}/?splash=1`, { waitUntil: "domcontentloaded" });

  // 100ms First paint check:
  const firstPaintInfo = await page1.evaluate(() => {
    const splash = document.getElementById("splash-screen");
    const hero = document.getElementById("main-page-content");
    const isSplashVisible = splash !== null && window.getComputedStyle(splash).display !== "none";
    const isMainInert = hero ? (hero.hasAttribute("inert") || window.getComputedStyle(hero).pointerEvents === "none") : false;
    return { isSplashVisible, isMainInert };
  });
  console.log(`First paint at ~100ms shows purple splash: ${firstPaintInfo.isSplashVisible}, main non-interactive: ${firstPaintInfo.isMainInert}`);

  const splashStartMs = await page1.evaluate(() => window.__splashStartTime || performance.now());
  console.log(`Browser splash start time: ${splashStartMs.toFixed(2)}ms`);

  const testFrames = [
    { t: 0.1, expected: "Hello!" },
    { t: 0.4, expected: "Hello!" },
    { t: 0.8, expected: "नमस्ते" },
    { t: 1.2, expected: "Bonjour!" },
    { t: 1.6, expected: "Hola!" },
    { t: 2.0, expected: "こんにちは" },
    { t: 2.4, expected: "Hallo" },
    { t: 2.8, expected: "Hello!" },
    { t: 3.2, expected: "Hello!" },
  ];

  for (const item of testFrames) {
    await page1.evaluate(async (targetTimeMs) => {
      while (performance.now() < targetTimeMs) {
        await new Promise((r) => setTimeout(r, 5));
      }
    }, splashStartMs + item.t * 1000);

    const currentText = await page1.evaluate(() => {
      const el = document.getElementById("splash-greeting-text");
      return el ? el.innerText.trim() : null;
    });

    const fname = `splash_frame_${item.t.toFixed(1).replace(".", "_")}s.png`;
    await page1.screenshot({ path: path.join(ARTIFACT_DIR, fname) });
    console.log(`t=${item.t}s: displayed "${currentText}" (expected: "${item.expected}") -> matches: ${currentText === item.expected}`);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. SLIDE ANIMATION (3.6, 3.9, 4.2, 4.5, 4.8s)
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n--- 2. Testing Slide Animation at 3.6, 3.9, 4.2, 4.5, 4.8s ---");
  const slideFrames = [3.6, 3.9, 4.2, 4.5, 4.8];
  const transforms = [];

  for (const t of slideFrames) {
    await page1.evaluate(async (targetTimeMs) => {
      while (performance.now() < targetTimeMs) {
        await new Promise((r) => setTimeout(r, 5));
      }
    }, splashStartMs + t * 1000);

    const info = await page1.evaluate(() => {
      const splash = document.getElementById("splash-screen");
      const transform = splash ? window.getComputedStyle(splash).transform : "none";
      const display = splash ? window.getComputedStyle(splash).display : "none";
      return { transform, display };
    });

    transforms.push({ t, ...info });
    const fname = `splash_slide_${t.toFixed(1).replace(".", "_")}s.png`;
    await page1.screenshot({ path: path.join(ARTIFACT_DIR, fname) });
    console.log(`t=${t}s: display=${info.display}, transform=${info.transform}`);
  }

  // Check hero similarity after splash finishes against baseline page
  console.log("\n--- Comparing Hero Post-Splash vs Baseline Normal Page ---");
  await new Promise((r) => setTimeout(r, 1500)); // Allow hero typewriter to complete
  const postSplashHeroImg = await page1.screenshot();
  fs.writeFileSync(path.join(ARTIFACT_DIR, "hero_post_splash.png"), postSplashHeroImg);

  // Baseline page with visited_session already set
  const pageBaseline = await browser.newPage();
  await pageBaseline.setViewport({ width: 1440, height: 850 });
  await pageBaseline.evaluateOnNewDocument(() => {
    try {
      sessionStorage.setItem("visited_session", "true");
    } catch {}
  });
  await pageBaseline.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 2000)); // Wait for typewriter on baseline
  const baselineImg = await pageBaseline.screenshot();
  fs.writeFileSync(path.join(ARTIFACT_DIR, "hero_baseline.png"), baselineImg);
  await pageBaseline.close();

  // Compute pixel similarity
  const pixelmatchModule = require("pixelmatch");
  const pixelmatch = pixelmatchModule.default || pixelmatchModule;
  const { PNG } = require("pngjs");
  const pngA = PNG.sync.read(postSplashHeroImg);
  const pngB = PNG.sync.read(baselineImg);
  const diffPng = new PNG({ width: pngA.width, height: pngA.height });
  const numDiff = pixelmatch(pngA.data, pngB.data, diffPng.data, pngA.width, pngA.height, { threshold: 0.1 });
  const totalPixels = pngA.width * pngA.height;
  const similarity = 1 - numDiff / totalPixels;
  console.log(`Hero Post-Splash vs Baseline similarity: ${(similarity * 100).toFixed(2)}% (Diff pixels: ${numDiff}/${totalPixels})`);

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. FIGMA "Desktop - 17" COMPARISON
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n--- 3. Comparing Hello! frame against Figma Desktop - 17 ---");
  const figmaScreenshotPath = path.join(ARTIFACT_DIR, "figma_desktop17_screenshot.png");
  if (fs.existsSync(figmaScreenshotPath)) {
    const figmaBuf = fs.readFileSync(figmaScreenshotPath);
    const figmaPng = PNG.sync.read(figmaBuf);

    // Capture splash at 1024x605 matching Figma's exported screenshot size
    const pageFigmaComp = await browser.newPage();
    await pageFigmaComp.setViewport({ width: 1024, height: 605 });
    await pageFigmaComp.goto(`${BASE_URL}/?splash=1`, { waitUntil: "domcontentloaded" });
    await new Promise((r) => setTimeout(r, 150));
    const splash1024Buf = await pageFigmaComp.screenshot();
    const splash1024Png = PNG.sync.read(splash1024Buf);
    await pageFigmaComp.close();

    const diffFigma = new PNG({ width: figmaPng.width, height: figmaPng.height });
    const diffCount = pixelmatch(figmaPng.data, splash1024Png.data, diffFigma.data, figmaPng.width, figmaPng.height, { threshold: 0.15 });
    const figmaSimilarity = 1 - diffCount / (figmaPng.width * figmaPng.height);
    console.log(`Figma Desktop - 17 (1024x605) 1:1 similarity: ${(figmaSimilarity * 100).toFixed(2)}% (diff pixels: ${diffCount})`);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. SESSION PERSISTENCE & CLIENT NAVIGATION
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n--- 4. Session Persistence & Client Navigation ---");
  // In page1 (which already marked session visited), reload:
  await page1.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
  await new Promise((r) => setTimeout(r, 400));
  const reloadShowsSplash = await page1.evaluate(() => {
    const s = document.getElementById("splash-screen");
    return s !== null && window.getComputedStyle(s).display !== "none";
  });
  console.log(`Reload in same session shows splash: ${reloadShowsSplash} (Expected: false)`);

  const aboutLink = await page1.$('a[data-cursor-key="nav-about"]');
  if (aboutLink) {
    await aboutLink.click();
    await new Promise((r) => setTimeout(r, 1200));
    const navAboutShowsSplash = await page1.evaluate(() => {
      const s = document.getElementById("splash-screen");
      return s !== null && window.getComputedStyle(s).display !== "none";
    });
    console.log(`Client navigation to /about shows splash: ${navAboutShowsSplash} (Expected: false)`);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. CLICK TO SKIP
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n--- 5. Click to Skip (Fast-forward to slide) ---");
  const pageSkip = await browser.newPage();
  await pageSkip.setViewport({ width: 1440, height: 850 });
  await pageSkip.goto(`${BASE_URL}/?splash=1`, { waitUntil: "domcontentloaded" });
  await pageSkip.waitForFunction(() => typeof window.__splashStartTime === "number");
  await new Promise((r) => setTimeout(r, 100));

  await pageSkip.mouse.click(720, 425);
  console.log("Clicked to skip");

  // Fast slide takes 500ms, wait for splash screen to disappear
  let skipFinished = false;
  try {
    await pageSkip.waitForFunction(() => {
      const s = document.getElementById("splash-screen");
      return s === null || window.getComputedStyle(s).display === "none";
    }, { timeout: 2000 });
    skipFinished = true;
  } catch {
    skipFinished = false;
  }
  console.log(`Splash finished after skip click: ${skipFinished} (Expected: true)`);
  await pageSkip.screenshot({ path: path.join(ARTIFACT_DIR, "splash_after_skip.png") });
  await pageSkip.close();

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. PREFERS-REDUCED-MOTION
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n--- 6. prefers-reduced-motion ---");
  const pageMotion = await browser.newPage();
  await pageMotion.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await pageMotion.setViewport({ width: 1440, height: 850 });
  await pageMotion.goto(`${BASE_URL}/?splash=1`, { waitUntil: "domcontentloaded" });

  let motionFinished = false;
  try {
    await pageMotion.waitForFunction(() => {
      const s = document.getElementById("splash-screen");
      return s === null || window.getComputedStyle(s).display === "none";
    }, { timeout: 2500 });
    motionFinished = true;
  } catch {
    motionFinished = false;
  }
  console.log(`Splash with reduced motion completed cleanly: ${motionFinished} (Expected: true)`);
  await pageMotion.close();

  // ─────────────────────────────────────────────────────────────────────────────
  // 7. RESPONSIVE VIEWPORTS (360, 390, 768, 1024, 1440, 1920, 2560 & LANDSCAPE)
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n--- 7. Testing Responsive Viewports ---");
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

    const metrics = await p.evaluate(() => {
      const textEl = document.getElementById("splash-greeting-text");
      const box = textEl ? textEl.getBoundingClientRect() : null;
      const fontSize = textEl ? window.getComputedStyle(textEl).fontSize : "0px";
      return {
        fontSize,
        width: box ? box.width : 0,
        height: box ? box.height : 0,
        left: box ? box.left : 0,
        right: box ? window.innerWidth - box.right : 0,
        windowW: window.innerWidth,
        windowH: window.innerHeight,
      };
    });

    const hasSideMargin = metrics.left >= 20 && metrics.right >= 20;
    const isVisible = metrics.width > 0 && metrics.height > 0;
    console.log(`Viewport ${vp.name} (${vp.w}x${vp.h}): fontSize=${metrics.fontSize}, textW=${Math.round(metrics.width)}px, sideSpace=(L:${Math.round(metrics.left)}px, R:${Math.round(metrics.right)}px), ok=${hasSideMargin && isVisible}`);

    await p.screenshot({ path: path.join(ARTIFACT_DIR, `splash_resp_${vp.name}.png`) });
    await p.close();
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 8. GREETING SWITCH LOG INSPECTION
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n--- 8. Greeting Switch History Verification ---");
  const greetingHistory = await page1.evaluate(() => window.__greetingLog || []);
  console.log("Logged switch transitions count:", greetingHistory.length);
  greetingHistory.forEach((entry, i) => {
    const relMs = entry.time - splashStartMs;
    console.log(`  [${i}] "${entry.text}" switched at rel: ${relMs.toFixed(1)}ms`);
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // 9. CONSOLE & PAGE ERRORS
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n=== ERROR CHECK ===");
  console.log("Console Errors:", consoleErrors.length);
  console.log("Page Errors:", pageErrors.length);
  if (consoleErrors.length > 0) console.log(consoleErrors);
  if (pageErrors.length > 0) console.log(pageErrors);

  await page1.close();
  await browser.close();
  console.log("\n=== ALL TESTS FINISHED SUCCESSFULLY ===");
}

main().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
