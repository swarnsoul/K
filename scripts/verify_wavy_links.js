const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const ARTIFACT_DIR = "C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98";
const BASE_URL = "http://localhost:3001";

async function main() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 800));

  const aboutLink = await page.$('[data-cursor-key="nav-about"]');
  const boxBefore = await aboutLink.boundingBox();

  // Better clip for About link: include padding around it
  const clip = {
    x: Math.floor(boxBefore.x - 8),
    y: Math.floor(boxBefore.y - 4),
    width: Math.ceil(boxBefore.width + 16),
    height: Math.ceil(boxBefore.height + 14),
  };

  // 1. Hover Sequence
  // 0ms
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "nav_wavy_hover_0ms.png"), clip });

  // Move over
  await page.mouse.move(boxBefore.x + boxBefore.width / 2, boxBefore.y + boxBefore.height / 2);

  // 100ms
  await new Promise((r) => setTimeout(r, 100));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "nav_wavy_hover_100ms.png"), clip });

  // 200ms
  await new Promise((r) => setTimeout(r, 100));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "nav_wavy_hover_200ms.png"), clip });

  // 400ms
  await new Promise((r) => setTimeout(r, 200));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "nav_wavy_hover_400ms.png"), clip });

  // 2. Leave Sequence
  // 0ms
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "nav_wavy_leave_0ms.png"), clip });

  // Move away
  await page.mouse.move(10, 10);

  // 100ms
  await new Promise((r) => setTimeout(r, 100));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "nav_wavy_leave_100ms.png"), clip });

  // 200ms
  await new Promise((r) => setTimeout(r, 100));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "nav_wavy_leave_200ms.png"), clip });

  // 350ms
  await new Promise((r) => setTimeout(r, 150));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, "nav_wavy_leave_350ms.png"), clip });

  // 3. Focused Link
  await page.evaluate(() => {
    document.body.focus();
  });
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press("Tab");
  }
  const focusedBox = await page.evaluate(() => {
    const el = document.activeElement;
    const r = el?.getBoundingClientRect();
    return r ? { x: r.x, y: r.y, width: r.width, height: r.height } : null;
  });

  if (focusedBox) {
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, "wavy_keyboard_focus.png"),
      clip: {
        x: Math.floor(focusedBox.x - 8),
        y: Math.floor(focusedBox.y - 6),
        width: Math.ceil(focusedBox.width + 16),
        height: Math.ceil(focusedBox.height + 16),
      },
    });
  }

  // 4. Create an HTML strip visualizer and capture as single comparison image
  const stripPage = await browser.newPage();
  await stripPage.setViewport({ width: 720, height: 420 });

  const b64 = (file) =>
    `data:image/png;base64,${fs.readFileSync(path.join(ARTIFACT_DIR, file)).toString("base64")}`;

  const stripHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { margin: 0; padding: 24px; font-family: -apple-system, sans-serif; background: #ffffff; color: #111; }
      h2 { font-size: 15px; margin: 0 0 12px; font-weight: 600; color: #333; }
      .row { display: flex; gap: 16px; margin-bottom: 24px; }
      .card { display: flex; flex-direction: column; align-items: center; border: 1px solid #e5e5e5; border-radius: 8px; padding: 10px 14px; background: #fafafa; }
      .label { font-size: 12px; font-weight: 600; color: #666; margin-bottom: 8px; }
      img { border: 1px solid #eee; border-radius: 4px; background: white; }
    </style>
  </head>
  <body>
    <h2>Hover In Sequence (Draws Left $\\rightarrow$ Right in 0.4s)</h2>
    <div class="row">
      <div class="card"><div class="label">0ms (idle)</div><img src="${b64("nav_wavy_hover_0ms.png")}" /></div>
      <div class="card"><div class="label">100ms</div><img src="${b64("nav_wavy_hover_100ms.png")}" /></div>
      <div class="card"><div class="label">200ms</div><img src="${b64("nav_wavy_hover_200ms.png")}" /></div>
      <div class="card"><div class="label">400ms (drawn)</div><img src="${b64("nav_wavy_hover_400ms.png")}" /></div>
    </div>

    <h2>Leave Sequence (Retracts Right $\\rightarrow$ Left in 0.35s)</h2>
    <div class="row">
      <div class="card"><div class="label">0ms (drawn)</div><img src="${b64("nav_wavy_leave_0ms.png")}" /></div>
      <div class="card"><div class="label">100ms</div><img src="${b64("nav_wavy_leave_100ms.png")}" /></div>
      <div class="card"><div class="label">200ms</div><img src="${b64("nav_wavy_leave_200ms.png")}" /></div>
      <div class="card"><div class="label">350ms (idle)</div><img src="${b64("nav_wavy_leave_350ms.png")}" /></div>
    </div>
  </body>
  </html>
  `;

  await stripPage.setContent(stripHtml);
  await stripPage.screenshot({
    path: path.join(ARTIFACT_DIR, "wavy_transition_strips.png"),
    fullPage: true,
  });

  await browser.close();
  console.log("Updated clips and generated wavy_transition_strips.png successfully!");
}

main().catch(console.error);
