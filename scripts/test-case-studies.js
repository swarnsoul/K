const puppeteer = require("puppeteer");
const path = require("path");

const ARTIFACT_DIR = "C:\\Users\\acer\\.gemini\\antigravity\\brain\\4e5d3daf-196b-4036-a731-fc1f17b54f98";

async function run() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  console.log("1. Visiting home page...");
  await page.goto("http://localhost:3001", { waitUntil: "networkidle2" });

  // Scroll to projects section
  console.log("2. Scrolling to #work...");
  await page.evaluate(() => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 1200));

  // Check Cirqell card link
  const cirqellLink = await page.$('a[href="/work/cirqell"]');
  console.log("Cirqell card link found:", !!cirqellLink);

  if (cirqellLink) {
    const box = await cirqellLink.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await new Promise((r) => setTimeout(r, 400));
    }

    console.log("3. Clicking Cirqell card via Next.js client Link...");
    await cirqellLink.click();
    await page.waitForFunction(() => window.location.pathname === "/work/cirqell", { timeout: 10000 });
    console.log("Navigated successfully to:", await page.evaluate(() => window.location.pathname));
  } else {
    await page.goto("http://localhost:3001/work/cirqell", { waitUntil: "networkidle2" });
  }

  // Ensure scroll is at top
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 1000));

  // Cirqell desktop screenshots
  console.log("Capturing Cirqell desktop hero...");
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "cirqell_desktop_hero.png"),
    clip: { x: 0, y: 0, width: 1440, height: 1100 },
  });

  console.log("Capturing Cirqell desktop process and screens...");
  await page.evaluate(() => window.scrollTo(0, 1500));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "cirqell_desktop_screens.png"),
    clip: { x: 0, y: 0, width: 1440, height: 1100 },
  });

  console.log("Capturing Cirqell desktop visual showcase...");
  await page.evaluate(() => window.scrollTo(0, 3600));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "cirqell_desktop_showcase.png"),
    clip: { x: 0, y: 0, width: 1440, height: 1100 },
  });

  console.log("Capturing Cirqell desktop design system...");
  await page.evaluate(() => window.scrollTo(0, 7500));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "cirqell_desktop_design_system.png"),
    clip: { x: 0, y: 0, width: 1440, height: 1100 },
  });

  // Switch to mobile viewport (390x844 iPhone 14)
  console.log("Capturing Cirqell mobile screenshots (390px)...");
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "cirqell_mobile_hero.png"),
    clip: { x: 0, y: 0, width: 390, height: 800 },
  });

  // Now test InfluCrush
  console.log("4. Testing InfluCrush from home page...");
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3001", { waitUntil: "networkidle2" });
  await page.evaluate(() => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 1200));

  const influcrushLink = await page.$('a[href="/work/influcrush"]');
  console.log("InfluCrush card link found:", !!influcrushLink);

  if (influcrushLink) {
    const box = await influcrushLink.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await new Promise((r) => setTimeout(r, 400));
    }

    console.log("5. Clicking InfluCrush card via Next.js client Link...");
    await influcrushLink.click();
    await page.waitForFunction(() => window.location.pathname === "/work/influcrush", { timeout: 10000 });
    console.log("Navigated successfully to:", await page.evaluate(() => window.location.pathname));
  } else {
    await page.goto("http://localhost:3001/work/influcrush", { waitUntil: "networkidle2" });
  }

  // Ensure scroll is at top
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 1000));

  // InfluCrush desktop screenshots
  console.log("Capturing InfluCrush desktop hero...");
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "influcrush_desktop_hero.png"),
    clip: { x: 0, y: 0, width: 1440, height: 1100 },
  });

  console.log("Capturing InfluCrush desktop process and showcase...");
  await page.evaluate(() => window.scrollTo(0, 1600));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "influcrush_desktop_showcase.png"),
    clip: { x: 0, y: 0, width: 1440, height: 1100 },
  });

  console.log("Capturing InfluCrush desktop flows and wireframes...");
  await page.evaluate(() => window.scrollTo(0, 5200));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "influcrush_desktop_flows.png"),
    clip: { x: 0, y: 0, width: 1440, height: 1100 },
  });

  console.log("Capturing InfluCrush desktop design system...");
  await page.evaluate(() => window.scrollTo(0, 7500));
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "influcrush_desktop_design_system.png"),
    clip: { x: 0, y: 0, width: 1440, height: 1100 },
  });

  // Switch to mobile viewport (390x844 iPhone 14)
  console.log("Capturing InfluCrush mobile screenshots (390px)...");
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, "influcrush_mobile_hero.png"),
    clip: { x: 0, y: 0, width: 390, height: 800 },
  });

  await browser.close();
  console.log("ALL VERIFICATIONS AND SCREENSHOTS SUCCEEDED!");
}

run().catch((e) => {
  console.error("Test error:", e);
  process.exit(1);
});
