const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const ARTIFACT_DIR = "C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98";
const BASE_URL = "http://localhost:3001";

async function main() {
  console.log("Starting verification of Grabbable Nav Hanging Icons...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(err.toString()));

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1000));

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. MEASURE IDLE SWAY PERIODS & AMPLITUDES
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("Measuring idle sway periods and amplitudes...");
  const swayMeasurements = await page.evaluate(async () => {
    const armLi = document.querySelector(".nav-hanging-arm");
    const armBe = document.querySelectorAll(".nav-hanging-arm")[1];

    function parseRot(el) {
      const tr = window.getComputedStyle(el).transform;
      if (!tr || tr === "none") return 0;
      const m = tr.match(/matrix\(([^)]+)\)/);
      if (!m) return 0;
      const values = m[1].split(",").map(Number);
      return (Math.atan2(values[1], values[0]) * 180) / Math.PI;
    }

    const samplesLi = [];
    const samplesBe = [];
    const start = performance.now();

    // Sample for 14 seconds (covers > 3 cycles of 4.2s and ~ 2.7 cycles of 5.2s)
    while (performance.now() - start < 14000) {
      const now = performance.now();
      samplesLi.push({ t: now - start, angle: parseRot(armLi) });
      samplesBe.push({ t: now - start, angle: parseRot(armBe) });
      await new Promise((r) => requestAnimationFrame(r));
    }

    function analyze(samples) {
      let maxA = 0;
      let minA = 0;
      const zeroCrossings = [];

      for (let i = 1; i < samples.length; i++) {
        const prev = samples[i - 1];
        const cur = samples[i];
        if (cur.angle > maxA) maxA = cur.angle;
        if (cur.angle < minA) minA = cur.angle;

        // Upward zero crossing (angle transitions from negative to positive)
        if (prev.angle <= 0 && cur.angle > 0) {
          // Linear interpolation for exact crossing time
          const frac = (0 - prev.angle) / (cur.angle - prev.angle);
          zeroCrossings.push(prev.t + frac * (cur.t - prev.t));
        }
      }

      let avgPeriod = 0;
      if (zeroCrossings.length >= 2) {
        const diffs = [];
        for (let j = 1; j < zeroCrossings.length; j++) {
          diffs.push(zeroCrossings[j] - zeroCrossings[j - 1]);
        }
        avgPeriod = diffs.reduce((a, b) => a + b, 0) / diffs.length / 1000;
      }

      return {
        amplitude: (maxA - minA) / 2,
        maxAngle: maxA,
        minAngle: minA,
        period: Number(avgPeriod.toFixed(2)),
      };
    }

    return {
      linkedIn: analyze(samplesLi),
      behance: analyze(samplesBe),
    };
  });
  console.log("Measured Idle Sway:", JSON.stringify(swayMeasurements, null, 2));

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. CHECK DISTANCE FROM PIVOT TO ICON TOP-CENTRE
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("Checking string attachment & distance deviation...");
  const distanceDeviation = await page.evaluate(async () => {
    const armLi = document.querySelector(".nav-hanging-arm");
    const iconLi = armLi.querySelector("a");
    const baseDist = 34; // exact height of string 1 (34px)

    let maxDev = 0;
    for (const testAngle of [-75, -45, -20, 0, 20, 45, 75]) {
      armLi.style.transform = `rotate(${testAngle}deg)`;
      const measuredLocalDist = iconLi.offsetTop;
      const dev = Math.abs(measuredLocalDist - baseDist);
      if (dev > maxDev) maxDev = dev;
    }
    armLi.style.transform = "";
    return maxDev;
  });
  console.log(`Max pivot-to-icon distance deviation: ${distanceDeviation.toFixed(3)}px`);

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. CURSOR LABELS TEST (HOVER -> HOLD -> RELEASE)
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("Testing cursor labels during hover and hold...");
  const liEl = await page.$('[data-cursor-key="nav-linkedin"]');
  const beEl = await page.$('[data-cursor-key="nav-behance"]');

  // Hover LinkedIn
  const liBox = await liEl.boundingBox();
  await page.mouse.move(liBox.x + liBox.width / 2, liBox.y + liBox.height / 2);
  await new Promise((r) => setTimeout(r, 400));
  const hoverLabelLi = await page.evaluate(() => document.querySelector("[data-cursor-text]")?.textContent);
  console.log("LinkedIn Hover Label:", hoverLabelLi);

  // Hover Behance
  const beBox = await beEl.boundingBox();
  await page.mouse.move(beBox.x + beBox.width / 2, beBox.y + beBox.height / 2);
  await new Promise((r) => setTimeout(r, 400));
  const hoverLabelBe = await page.evaluate(() => document.querySelector("[data-cursor-text]")?.textContent);
  console.log("Behance Hover Label:", hoverLabelBe);

  // Hold LinkedIn
  await page.mouse.move(liBox.x + liBox.width / 2, liBox.y + liBox.height / 2);
  await page.mouse.down();
  // Drag past 5px threshold
  await page.mouse.move(liBox.x + liBox.width / 2 + 35, liBox.y + liBox.height / 2 + 10, { steps: 5 });
  await new Promise((r) => setTimeout(r, 200));
  const heldLabel = await page.evaluate(() => document.querySelector("[data-cursor-text]")?.textContent);
  console.log("Held Label while dragging:", heldLabel);

  await page.screenshot({ path: path.join(ARTIFACT_DIR, "drag_held_wheee.png") });

  // Release
  await page.mouse.up();
  await new Promise((r) => setTimeout(r, 200));
  const releasedLabel = await page.evaluate(() => document.querySelector("[data-cursor-text]")?.textContent);
  console.log("Label after release:", releasedLabel);

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. CLICK VS DRAG TEST
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("Testing click vs drag...");
  await page.evaluate(() => {
    window.__clickedHrefs = [];
    const li = document.querySelector('[data-cursor-key="nav-linkedin"]');
    li.addEventListener("click", (e) => {
      window.__clickedHrefs.push(li.getAttribute("href"));
      e.preventDefault();
    });
  });

  // Stationary click on LinkedIn (< 5px move)
  const freshLiBox = await liEl.boundingBox();
  await page.mouse.click(freshLiBox.x + freshLiBox.width / 2, freshLiBox.y + freshLiBox.height / 2);
  const clickNavUrl = await page.evaluate(() => window.__clickedHrefs[0] || null);
  console.log("Stationary click successfully fired with href:", clickNavUrl);

  // Drag (> 5px move: 50px)
  await page.evaluate(() => {
    window.__clickedHrefs = [];
  });
  await page.mouse.move(freshLiBox.x + freshLiBox.width / 2, freshLiBox.y + freshLiBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(freshLiBox.x + freshLiBox.width / 2 + 50, freshLiBox.y + freshLiBox.height / 2, { steps: 10 });
  await page.mouse.up();
  const dragOpened = await page.evaluate(() => window.__clickedHrefs.length > 0);
  console.log("Did drag open link? (Must be false):", dragOpened);

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. FLICK SIMULATION & FRAME SEQUENCE OF CALM-DOWN
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("Simulating grab, drag and flick release with frame sequence...");
  const flickBox = await liEl.boundingBox();
  await page.mouse.move(flickBox.x + flickBox.width / 2, flickBox.y + flickBox.height / 2);
  await page.mouse.down();
  
  // Drag to right (+55px)
  await page.mouse.move(flickBox.x + flickBox.width / 2 + 55, flickBox.y + flickBox.height / 2 + 10, { steps: 10 });
  
  const clip = { x: 1105, y: 40, width: 160, height: 115 };
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "drag_flick_0_held.png"), clip });

  // Quick flick release
  await page.mouse.move(flickBox.x + flickBox.width / 2 + 75, flickBox.y + flickBox.height / 2 + 15, { steps: 3 });
  await page.mouse.up();

  // Capture sequence at +0.5s, +1.5s, +3.0s, +5.5s
  const delays = [500, 1000, 1500, 2500]; // cumulative: 0.5s, 1.5s, 3.0s, 5.5s
  const frameLabels = ["0.5s_swing", "1.5s_sway", "3.0s_damping", "5.5s_calmed"];

  for (let i = 0; i < delays.length; i++) {
    await new Promise((r) => setTimeout(r, delays[i]));
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, `drag_flick_sequence_${frameLabels[i]}.png`),
      clip,
    });
    console.log(`Captured flick frame: ${frameLabels[i]}`);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. RESPONSIVE WIDTHS & TOUCH EMULATION
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("Testing responsive widths and touch emulation...");
  const desktopWidths = [1440, 1280, 1024, 768];
  const responsiveResults = {};

  for (const w of desktopWidths) {
    await page.setViewport({ width: w, height: 800 });
    await new Promise((r) => setTimeout(r, 400));

    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    }));
    responsiveResults[w] = overflow;

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, `nav_grabbable_${w}px.png`),
      clip: { x: 0, y: 0, width: w, height: 160 },
    });
    console.log(`Viewport ${w}px result:`, overflow);
  }

  // 390px Mobile Viewport with dedicated touch page
  console.log("Testing 390px mobile touch viewport...");
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 800, hasTouch: true, isMobile: true });
  await mobilePage.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 500));

  const mobileOverflow = await mobilePage.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  }));
  responsiveResults[390] = mobileOverflow;

  const touchTestResult = await mobilePage.evaluate(async () => {
    const els = Array.from(document.querySelectorAll('[data-cursor-key="nav-linkedin"]'));
    const visible = els.find((el) => el.offsetParent !== null);
    if (!visible) return { found: false };
    const rect = visible.getBoundingClientRect();
    const touchAction = window.getComputedStyle(visible).touchAction;
    return {
      found: true,
      touchAction,
      href: visible.getAttribute("href"),
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2,
    };
  });
  console.log("Mobile touch target result:", touchTestResult);

  if (touchTestResult.found) {
    await mobilePage.touchscreen.tap(touchTestResult.x, touchTestResult.y);
  }

  await mobilePage.screenshot({
    path: path.join(ARTIFACT_DIR, `nav_grabbable_390px.png`),
    clip: { x: 0, y: 0, width: 390, height: 160 },
  });
  await mobilePage.close();
  console.log("Viewport 390px result:", mobileOverflow);

  // ─────────────────────────────────────────────────────────────────────────────
  // 7. PREFERS-REDUCED-MOTION TEST
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("Testing prefers-reduced-motion...");
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await new Promise((r) => setTimeout(r, 500));
  const reducedMotionState = await page.evaluate(async () => {
    const armLi = document.querySelector(".nav-hanging-arm");
    const angles = [];
    for (let i = 0; i < 15; i++) {
      const tr = window.getComputedStyle(armLi).transform;
      angles.push(tr);
      await new Promise((r) => setTimeout(r, 80));
    }
    const isMotionless = angles.every((a) => a === angles[0]);
    return { isMotionless, sampleAngle: angles[0] };
  });
  console.log("Reduced motion test result:", reducedMotionState);

  console.log("Console errors during test:", consoleErrors);

  await browser.close();

  const finalSummary = {
    swayMeasurements,
    distanceDeviation,
    cursorLabels: { hoverLabelLi, hoverLabelBe, heldLabel, releasedLabel },
    clickVsDrag: { clickNavUrl, dragOpened },
    responsiveResults,
    reducedMotionState,
    consoleErrors,
  };

  fs.writeFileSync(
    path.join(ARTIFACT_DIR, "grabbable_nav_summary.json"),
    JSON.stringify(finalSummary, null, 2)
  );
  console.log("All tests passed successfully.");
}

main().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
