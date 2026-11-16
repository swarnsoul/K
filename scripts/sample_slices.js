const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  const svg = fs.readFileSync("public/assets/logo-nav-vectorized.svg", "utf-8");

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="background:#fff;">
        <canvas id="c" width="650" height="330"></canvas>
      </body>
    </html>
  `);

  const waypoints = await page.evaluate(async (svgString) => {
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
    function isBlack(x, y) {
      if (x < 0 || x >= W || y < 0 || y >= H) return false;
      return data[(y * W + x) * 4 + 3] > 100;
    }

    // Sample key slices along x
    const xSlices = [];
    for (let x = 10; x < 640; x += 20) {
      const yHits = [];
      for (let y = 10; y < 320; y++) {
        if (isBlack(x, y)) {
          // Find run of black pixels
          const startY = y;
          while (y < 320 && isBlack(x, y)) y++;
          const midY = (startY + y - 1) / 2;
          yHits.push(midY / 10);
        }
      }
      xSlices.push({ x: x / 10, yHits });
    }
    return xSlices;
  }, svg);

  console.log("X slices across the logo:", JSON.stringify(waypoints, null, 2));
  await browser.close();
})();
