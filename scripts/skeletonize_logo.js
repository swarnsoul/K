const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  const svg = fs.readFileSync("public/assets/logo-nav-vectorized.svg", "utf-8");

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body>
        <canvas id="c" width="650" height="330"></canvas>
      </body>
    </html>
  `);

  const result = await page.evaluate(async (svgString) => {
    const c = document.getElementById("c");
    const ctx = c.getContext("2d");
    const img = new Image();
    const svg64 = btoa(svgString.replace('width="65" height="32.9505"', 'width="650" height="330"'));
    img.src = "data:image/svg+xml;base64," + svg64;
    await new Promise((r) => (img.onload = r));
    ctx.drawImage(img, 0, 0, 650, 330);

    const W = 650, H = 330;
    const imgData = ctx.getImageData(0, 0, W, H);
    const data = imgData.data;

    // Binary grid: 1 = black, 0 = white
    const grid = new Uint8Array(W * H);
    for (let i = 0; i < W * H; i++) {
      grid[i] = data[i * 4 + 3] > 100 ? 1 : 0;
    }

    // Zhang-Suen Thinning Algorithm
    function thin(binary) {
      let changed = true;
      const b = new Uint8Array(binary);
      const toZero = [];

      while (changed) {
        changed = false;
        // Step 1
        for (let y = 1; y < H - 1; y++) {
          for (let x = 1; x < W - 1; x++) {
            const idx = y * W + x;
            if (b[idx] !== 1) continue;

            const p2 = b[(y - 1) * W + x];
            const p3 = b[(y - 1) * W + x + 1];
            const p4 = b[y * W + x + 1];
            const p5 = b[(y + 1) * W + x + 1];
            const p6 = b[(y + 1) * W + x];
            const p7 = b[(y + 1) * W + x - 1];
            const p8 = b[y * W + x - 1];
            const p9 = b[(y - 1) * W + x - 1];

            const B = p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
            if (B < 2 || B > 6) continue;

            let A = 0;
            if (p2 === 0 && p3 === 1) A++;
            if (p3 === 0 && p4 === 1) A++;
            if (p4 === 0 && p5 === 1) A++;
            if (p5 === 0 && p6 === 1) A++;
            if (p6 === 0 && p7 === 1) A++;
            if (p7 === 0 && p8 === 1) A++;
            if (p8 === 0 && p9 === 1) A++;
            if (p9 === 0 && p2 === 1) A++;

            if (A !== 1) continue;

            if (p2 * p4 * p6 !== 0) continue;
            if (p4 * p6 * p8 !== 0) continue;

            toZero.push(idx);
            changed = true;
          }
        }
        for (const idx of toZero) b[idx] = 0;
        toZero.length = 0;

        // Step 2
        for (let y = 1; y < H - 1; y++) {
          for (let x = 1; x < W - 1; x++) {
            const idx = y * W + x;
            if (b[idx] !== 1) continue;

            const p2 = b[(y - 1) * W + x];
            const p3 = b[(y - 1) * W + x + 1];
            const p4 = b[y * W + x + 1];
            const p5 = b[(y + 1) * W + x + 1];
            const p6 = b[(y + 1) * W + x];
            const p7 = b[(y + 1) * W + x - 1];
            const p8 = b[y * W + x - 1];
            const p9 = b[(y - 1) * W + x - 1];

            const B = p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
            if (B < 2 || B > 6) continue;

            let A = 0;
            if (p2 === 0 && p3 === 1) A++;
            if (p3 === 0 && p4 === 1) A++;
            if (p4 === 0 && p5 === 1) A++;
            if (p5 === 0 && p6 === 1) A++;
            if (p6 === 0 && p7 === 1) A++;
            if (p7 === 0 && p8 === 1) A++;
            if (p8 === 0 && p9 === 1) A++;
            if (p9 === 0 && p2 === 1) A++;

            if (A !== 1) continue;

            if (p2 * p4 * p8 !== 0) continue;
            if (p2 * p6 * p8 !== 0) continue;

            toZero.push(idx);
            changed = true;
          }
        }
        for (const idx of toZero) b[idx] = 0;
        toZero.length = 0;
      }
      return b;
    }

    const skel = thin(grid);

    // Collect skeleton pixels
    const pts = [];
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (skel[y * W + x] === 1) {
          pts.push({ x: x / 10, y: y / 10 });
        }
      }
    }

    return { totalSkeletonPoints: pts.length, samplePoints: pts.slice(0, 30) };
  }, svg);

  console.log("Skeletonization done! Total points:", result.totalSkeletonPoints);
  await browser.close();
})();
