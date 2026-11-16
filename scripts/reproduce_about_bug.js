const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const ARTIFACT_DIR = "C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98";
const BASE_URL = "http://localhost:3001";

async function checkNotesVisibility(page, label) {
  // Scroll down smoothly through all notes to give any IntersectionObserver / trigger a chance to fire
  await page.evaluate(async () => {
    const totalH = document.documentElement.scrollHeight;
    for (let y = 0; y <= totalH; y += 350) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
  });
  // Wait for animation or safety timer
  await new Promise((r) => setTimeout(r, 1800));

  return await page.evaluate((testLabel) => {
    // Select desktop visible notes (offsetParent !== null)
    const allNotes = Array.from(document.querySelectorAll('[data-cursor-key^="about-card-"]'));
    return allNotes.map((note) => {
      const key = note.getAttribute("data-cursor-key");
      const isDisplayed = note.offsetParent !== null;
      const textEl = note.querySelector("[data-unfold-text], p");
      const spans = textEl ? Array.from(textEl.querySelectorAll("span")) : [];
      const transparentSpans = spans.filter((s) => s.style.color === "transparent");
      const textContent = textEl?.textContent?.trim() || "";

      const textStyle = textEl ? window.getComputedStyle(textEl) : null;
      const sampleSpan = spans[0];
      const spanColor = sampleSpan ? sampleSpan.style.color : "no-spans";
      const spanComputedColor = sampleSpan ? window.getComputedStyle(sampleSpan).color : "none";

      const isVisible =
        textEl !== null &&
        transparentSpans.length === 0 &&
        textStyle?.opacity !== "0" &&
        textStyle?.visibility !== "hidden";

      return {
        key,
        isDisplayed,
        totalSpans: spans.length,
        transparentSpans: transparentSpans.length,
        spanStyleColor: spanColor,
        spanComputedColor,
        textOpacity: textStyle?.opacity,
        isVisible,
        textContent: textContent.substring(0, 30),
      };
    });
  }, label);
}

async function clickNav(page, selector) {
  const el = await page.waitForSelector(selector, { visible: true, timeout: 5000 });
  await el.click();
}

async function main() {
  console.log("Starting bug reproduction / verification script...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const consoleMessages = [];
  const pageErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleMessages.push(`[${msg.type()}] ${msg.text()}`);
    }
  });
  page.on("pageerror", (err) => pageErrors.push(`[PAGE_ERROR] ${err.toString()}`));

  await page.setViewport({ width: 1440, height: 900 });

  // ─────────────────────────────────────────────────────────────────────────────
  // CASE A: Open / then click "About" link in nav (client-side navigation)
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n=== Testing Case A: Home -> Click About ===");
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  // Click About link in DesktopHeader
  await clickNav(page, 'a[data-cursor-key="nav-about"]');
  await new Promise((r) => setTimeout(r, 1000));

  const caseAResults = await checkNotesVisibility(page, "Case A");
  const caseADesktop = caseAResults.filter((r) => r.isDisplayed);
  const caseAVisibleCount = caseADesktop.filter((r) => r.isVisible).length;
  console.log(`Case A Results: ${caseAVisibleCount}/${caseADesktop.length} desktop notes visible.`);
  caseADesktop.forEach((r) => {
    console.log(`  ${r.key}: isVisible=${r.isVisible}, spans=${r.totalSpans}, transparent=${r.transparentSpans}, styleColor=${r.spanStyleColor}, computedColor=${r.spanComputedColor}`);
  });

  // Scroll to note cards section and capture screenshot
  await page.evaluate(() => {
    const card = document.querySelector('[data-cursor-key="about-card-3"]') || document.querySelector('[data-cursor-key="about-card-1"]');
    if (card) card.scrollIntoView({ behavior: "instant", block: "center" });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "about_notes_client_nav.png"), fullPage: false });

  // ─────────────────────────────────────────────────────────────────────────────
  // CASE B: Open /about directly (hard refresh)
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n=== Testing Case B: Direct load /about ===");
  await page.goto(`${BASE_URL}/about`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  const caseBResults = await checkNotesVisibility(page, "Case B");
  const caseBDesktop = caseBResults.filter((r) => r.isDisplayed);
  const caseBVisibleCount = caseBDesktop.filter((r) => r.isVisible).length;
  console.log(`Case B Results: ${caseBVisibleCount}/${caseBDesktop.length} desktop notes visible.`);

  // ─────────────────────────────────────────────────────────────────────────────
  // CASE C: Home -> About -> Home -> About, Back/Forward, click About while on About
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n=== Testing Case C: Repeated visits, Back/Forward, Click on same page ===");
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  await clickNav(page, 'a[data-cursor-key="nav-about"]');
  await new Promise((r) => setTimeout(r, 800));
  await clickNav(page, 'a[data-cursor-key="nav-logo"]');
  await new Promise((r) => setTimeout(r, 800));
  await clickNav(page, 'a[data-cursor-key="nav-about"]');
  await new Promise((r) => setTimeout(r, 800));

  // Click About while already on About
  await clickNav(page, 'a[data-cursor-key="nav-about"]');
  await new Promise((r) => setTimeout(r, 500));

  // Back to Home
  await page.goBack();
  await new Promise((r) => setTimeout(r, 500));

  // Forward to About
  await page.goForward();
  await new Promise((r) => setTimeout(r, 500));

  const caseCResults = await checkNotesVisibility(page, "Case C");
  const caseCDesktop = caseCResults.filter((r) => r.isDisplayed);
  const caseCVisibleCount = caseCDesktop.filter((r) => r.isVisible).length;
  console.log(`Case C Results: ${caseCVisibleCount}/${caseCDesktop.length} desktop notes visible.`);

  // ─────────────────────────────────────────────────────────────────────────────
  // CASE D: Open /about directly, then go to Home and back to About with nav
  // ─────────────────────────────────────────────────────────────────────────────
  console.log("\n=== Testing Case D: /about direct -> Home -> About ===");
  await page.goto(`${BASE_URL}/about`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 600));

  // Navigate to Home
  await clickNav(page, 'a[data-cursor-key="nav-logo"]');
  await new Promise((r) => setTimeout(r, 1000));

  // Capture screenshot of Home after navigating back from About
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "home_after_about_nav.png"), fullPage: false });

  // Navigate back to About
  await clickNav(page, 'a[data-cursor-key="nav-about"]');
  await new Promise((r) => setTimeout(r, 800));

  const caseDResults = await checkNotesVisibility(page, "Case D");
  const caseDDesktop = caseDResults.filter((r) => r.isDisplayed);
  const caseDVisibleCount = caseDDesktop.filter((r) => r.isVisible).length;
  console.log(`Case D Results: ${caseDVisibleCount}/${caseDDesktop.length} desktop notes visible.`);

  console.log("\n=== SUMMARY ===");
  console.log(`Case A Visible: ${caseAVisibleCount}/${caseADesktop.length}`);
  console.log(`Case B Visible: ${caseBVisibleCount}/${caseBDesktop.length}`);
  console.log(`Case C Visible: ${caseCVisibleCount}/${caseCDesktop.length}`);
  console.log(`Case D Visible: ${caseDVisibleCount}/${caseDDesktop.length}`);
  console.log(`Console Errors: ${consoleMessages.length}`);
  console.log(`Page Errors: ${pageErrors.length}`);
  if (consoleMessages.length > 0) console.log("Console Errors:", consoleMessages);
  if (pageErrors.length > 0) console.log("Page Errors:", pageErrors);

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});