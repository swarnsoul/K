const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  console.log('--- Optimizing Giant PNG Assets ---');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Helper to downsample an image using browser canvas with high quality
  async function resizeImage(inputPath, maxDim, outputPath) {
    const inputBuf = fs.readFileSync(inputPath);
    const base64 = `data:image/png;base64,${inputBuf.toString('base64')}`;

    const result = await page.evaluate(async (src, maxD) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          let w = img.width;
          let h = img.height;
          if (w > maxD || h > maxD) {
            if (w > h) {
              h = Math.round((h * maxD) / w);
              w = maxD;
            } else {
              w = Math.round((w * maxD) / h);
              h = maxD;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/png'));
        };
        img.src = src;
      });
    }, base64, maxDim);

    const outData = Buffer.from(result.split(',')[1], 'base64');
    fs.writeFileSync(outputPath, outData);
    console.log(`Optimized ${path.basename(inputPath)}: ${(inputBuf.length/1024).toFixed(0)}KB -> ${(outData.length/1024).toFixed(0)}KB`);
  }

  // Optimize pinboard.png (was 10.7MB, displayed at ~232x372px) -> resize to 800px max (over 3x Retina)
  await resizeImage('public/assets/desk/pinboard.png', 900, 'public/assets/desk/pinboard.png');

  // Optimize plant_left.png (was 5.2MB, displayed at ~237x204px) -> resize to 800px max
  if (fs.existsSync('public/assets/desk/plant_left.png')) {
    await resizeImage('public/assets/desk/plant_left.png', 800, 'public/assets/desk/plant_left.png');
  }

  // Optimize about cards if any > 2MB
  const aboutCards = ['card-3.png', 'card-8.png', 'card-9.png', 'imgImage49.png', 'imgImage50.png', 'imgImage51.png'];
  for (const card of aboutCards) {
    const cardPath = path.join('public/assets/about', card);
    if (fs.existsSync(cardPath) && fs.statSync(cardPath).size > 1.5 * 1024 * 1024) {
      await resizeImage(cardPath, 1200, cardPath);
    }
  }

  await browser.close();
  console.log('--- Optimization Complete ---');
}

optimizeImages().catch(console.error);
