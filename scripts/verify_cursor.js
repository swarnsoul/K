const puppeteer = require("puppeteer");

async function main() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:3001/", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1000));

  const li = await page.$('[data-cursor-key="nav-linkedin"]');
  const box = await li.boundingBox();
  console.log("LinkedIn bounding box:", box);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await new Promise((r) => setTimeout(r, 400));

  const textLi = await page.evaluate(() => {
    return document.querySelector("[data-cursor-text]")?.textContent;
  });
  console.log("Hover text on LinkedIn:", textLi);

  const be = await page.$('[data-cursor-key="nav-behance"]');
  const boxBe = await be.boundingBox();
  console.log("Behance bounding box:", boxBe);
  await page.mouse.move(boxBe.x + boxBe.width / 2, boxBe.y + boxBe.height / 2);
  await new Promise((r) => setTimeout(r, 400));

  const textBe = await page.evaluate(() => {
    return document.querySelector("[data-cursor-text]")?.textContent;
  });
  console.log("Hover text on Behance:", textBe);

  await browser.close();
}

main().catch(console.error);
