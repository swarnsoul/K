const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const { PNG } = require("pngjs");

const ARTIFACT_DIR = "C:/Users/acer/.gemini/antigravity/brain/4e5d3daf-196b-4036-a731-fc1f17b54f98";

async function run() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3001/", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 500));

  const clip = {
    x: 1110,
    y: 45,
    width: 140,
    height: 95,
  };

  const timestamps = [0, 1500, 3000, 4500];
  const images = [];

  for (const t of timestamps) {
    await page.evaluate((timeMs) => {
      const selectors = [
        ".nav-hanging-arm-linkedin",
        ".nav-hanging-arm-behance",
        ".nav-hanging-icon-linkedin",
        ".nav-hanging-icon-behance",
      ];
      selectors.forEach((sel) => {
        const el = document.querySelector(sel);
        if (!el) return;
        el.style.animation = "";
        const a = el.getAnimations()[0];
        if (a) {
          a.pause();
          a.currentTime = timeMs;
          const tr = window.getComputedStyle(el).transform;
          el.style.animation = "none";
          el.style.transform = tr;
        }
      });
    }, t);

    // Wait a tick for paint
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(r)));

    const filename = `nav_sway_frame_${t}ms.png`;
    const outPath = path.join(ARTIFACT_DIR, filename);
    await page.screenshot({ path: outPath, clip });
    console.log(`Captured ${filename} at currentTime = ${t}ms`);

    const png = PNG.sync.read(fs.readFileSync(outPath));
    images.push(png);
  }

  function countDiff(a, b) {
    let diff = 0;
    for (let i = 0; i < a.data.length; i += 4) {
      if (
        Math.abs(a.data[i] - b.data[i]) > 10 ||
        Math.abs(a.data[i + 1] - b.data[i + 1]) > 10 ||
        Math.abs(a.data[i + 2] - b.data[i + 2]) > 10
      ) {
        diff++;
      }
    }
    return diff;
  }

  console.log("Diff 0ms vs 1500ms:", countDiff(images[0], images[1]));
  console.log("Diff 1500ms vs 3000ms:", countDiff(images[1], images[2]));
  console.log("Diff 3000ms vs 4500ms:", countDiff(images[2], images[3]));

  await browser.close();
}

run().catch(console.error);
