const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const pixelmatchLib = require("pixelmatch");
const pixelmatch = pixelmatchLib.default || pixelmatchLib;
const { PNG } = require("pngjs");

const ARTIFACT_DIR = "C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98";
const BASE_URL = "http://localhost:3001";

async function main() {
  console.log("Launching Puppeteer...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });
  page.on("pageerror", (err) => {
    consoleErrors.push(err.toString());
  });

  // 1. Load Home Page at 1440px
  console.log("Navigating to Home Page at 1440px...");
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1000));

  // Find the nav card element
  const navCard = await page.$('[data-node-id="314:103"]');
  if (!navCard) {
    throw new Error("Could not find nav card [data-node-id='314:103']");
  }

  // Get nav bounding box (including the hanging icons extending below)
  const navBox = await page.evaluate(() => {
    const el = document.querySelector('[data-node-id="314:103"]');
    const rect = el.getBoundingClientRect();
    // Hanging icons extend about 48px below the 58px card
    return {
      x: Math.round(rect.x),
      y: Math.round(rect.y),
      width: Math.round(rect.width),
      height: Math.round(rect.height + 55), // cover hanging icons
    };
  });
  console.log("Nav bounding box at 1440px:", navBox);

  // Capture frame sequence at 0s, 1.5s, 3s, 4.5s
  console.log("Capturing frame sequence at 0s, 1.5s, 3s, 4.5s...");
  const frames = [0, 1500, 3000, 4500];
  const framePaths = [];

  for (let i = 0; i < frames.length; i++) {
    const delay = i === 0 ? frames[i] : frames[i] - frames[i - 1];
    if (delay > 0) {
      await new Promise((r) => setTimeout(r, delay));
    }
    const frameName = `nav_sway_frame_${frames[i]}ms.png`;
    const framePath = path.join(ARTIFACT_DIR, frameName);
    
    // Screenshot just the gold rail & hanging assembly
    const hangingUnit = await page.$('[data-node-id="597:925"]');
    if (hangingUnit) {
      await hangingUnit.screenshot({
        path: framePath,
      });
      framePaths.push(framePath);
      console.log(`Saved sway frame at ${frames[i]}ms to ${frameName}`);
    }
  }

  // Capture full nav bar at 1440px
  const liveNavPath = path.join(ARTIFACT_DIR, "rendered_nav_bar_1440.png");
  await page.screenshot({
    path: liveNavPath,
    clip: {
      x: navBox.x,
      y: navBox.y,
      width: navBox.width,
      height: navBox.height,
    },
  });
  console.log("Saved live nav bar screenshot to rendered_nav_bar_1440.png");

  // Visual similarity comparison
  // Compare gold rail & hanging unit at rest with Figma screenshot
  console.log("Computing similarity score...");
  const figmaGoldRailPath = path.join(ARTIFACT_DIR, "figma_nav_gold_rail.png");
  const liveHangingPath = path.join(ARTIFACT_DIR, "live_gold_rail.png");
  
  const hangingUnit = await page.$('[data-node-id="597:925"]');
  await hangingUnit.screenshot({ path: liveHangingPath });

  // Read both images with sharp and resize to identical dimensions (129x87)
  const figmaBuf = await sharp(figmaGoldRailPath).resize(129, 87).ensureAlpha().raw().toBuffer();
  const liveBuf = await sharp(liveHangingPath).resize(129, 87).ensureAlpha().raw().toBuffer();

  const diffPng = new PNG({ width: 129, height: 87 });
  const mismatchedPixels = pixelmatch(
    figmaBuf,
    liveBuf,
    diffPng.data,
    129,
    87,
    { threshold: 0.15 }
  );
  const totalPixels = 129 * 87;
  const similarityScore = (totalPixels - mismatchedPixels) / totalPixels;
  console.log(`Gold Rail & Icons similarity score: ${similarityScore.toFixed(4)} (${(similarityScore * 100).toFixed(2)}%)`);

  // Test Hover & Custom Cursor
  console.log("Testing cursor labels for LinkedIn & Behance...");
  const linkedinEl = await page.$('[data-cursor-key="nav-linkedin"]');
  const behanceEl = await page.$('[data-cursor-key="nav-behance"]');

  let linkedinLabel = null;
  let behanceLabel = null;

  if (linkedinEl) {
    const box = await linkedinEl.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await new Promise((r) => setTimeout(r, 200));
    linkedinLabel = await page.evaluate(() => {
      const badge = document.querySelector("#custom-cursor-bubble");
      return badge ? badge.textContent.trim() : null;
    });
    console.log("LinkedIn cursor label on hover:", linkedinLabel);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "hover_nav_linkedin.png") });
  }

  if (behanceEl) {
    const box = await behanceEl.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await new Promise((r) => setTimeout(r, 200));
    behanceLabel = await page.evaluate(() => {
      const badge = document.querySelector("#custom-cursor-bubble");
      return badge ? badge.textContent.trim() : null;
    });
    console.log("Behance cursor label on hover:", behanceLabel);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, "hover_nav_behance.png") });
  }

  // Check link attributes
  const linkProps = await page.evaluate(() => {
    const li = document.querySelector('[data-cursor-key="nav-linkedin"]');
    const be = document.querySelector('[data-cursor-key="nav-behance"]');
    return {
      linkedin: {
        href: li ? li.getAttribute("href") : null,
        target: li ? li.getAttribute("target") : null,
        rel: li ? li.getAttribute("rel") : null,
        ariaLabel: li ? li.getAttribute("aria-label") : null,
      },
      behance: {
        href: be ? be.getAttribute("href") : null,
        target: be ? be.getAttribute("target") : null,
        rel: be ? be.getAttribute("rel") : null,
        ariaLabel: be ? be.getAttribute("aria-label") : null,
      },
    };
  });
  console.log("Link attributes:", JSON.stringify(linkProps, null, 2));

  // Test responsive viewports
  console.log("Testing responsive viewports (1440, 1280, 1024, 768, 390)...");
  const widths = [1440, 1280, 1024, 768, 390];
  const responsiveResults = {};

  for (const w of widths) {
    await page.setViewport({ width: w, height: 800, deviceScaleFactor: 1 });
    await new Promise((r) => setTimeout(r, 500));
    
    // Check horizontal scroll / overflow
    const overflow = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    });
    responsiveResults[w] = overflow;

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, `nav_responsive_${w}px.png`),
      clip: { x: 0, y: 0, width: w, height: 160 },
    });
    console.log(`Viewport ${w}px overflow check:`, overflow);
  }

  // Test About Page at 1440px and 390px
  console.log("Testing About Page (/about)...");
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(`${BASE_URL}/about`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 500));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "about_nav_1440px.png"),
    clip: { x: 0, y: 0, width: 1440, height: 160 },
  });

  await page.setViewport({ width: 390, height: 800, deviceScaleFactor: 1 });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "about_nav_390px.png"),
    clip: { x: 0, y: 0, width: 390, height: 160 },
  });

  console.log("Console errors during test:", consoleErrors);

  await browser.close();
  console.log("Test finished successfully.");

  const summary = {
    similarityScore,
    linkedinLabel,
    behanceLabel,
    linkProps,
    responsiveResults,
    consoleErrors,
  };
  fs.writeFileSync(
    path.join(ARTIFACT_DIR, "nav_test_summary.json"),
    JSON.stringify(summary, null, 2)
  );
}

main().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
