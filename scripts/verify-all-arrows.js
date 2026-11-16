const puppeteer = require('puppeteer');
const sharp = require('sharp');
const fs = require('fs');
const pm = require('pixelmatch').default || require('pixelmatch');
const { PNG } = require('pngjs');

async function testAllArrows() {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle0' });

  // 1. Intro Arrow (node 243:821)
  const a1El = await page.$('[data-figma-id="243:821"]');
  const a1Shot = await a1El.screenshot();
  const a1RefMeta = await sharp('scripts/diff_results/figma_intro_arrow_render.png').metadata();
  const a1RenMeta = await sharp(a1Shot).metadata();
  const aw1 = Math.min(a1RenMeta.width, a1RefMeta.width);
  const ah1 = Math.min(a1RenMeta.height, a1RefMeta.height);
  const a1Buf1 = await sharp(a1Shot).resize(aw1, ah1, { fit: 'fill' }).ensureAlpha().raw().toBuffer();
  const a1Buf2 = await sharp('scripts/diff_results/figma_intro_arrow_render.png').resize(aw1, ah1, { fit: 'fill' }).ensureAlpha().raw().toBuffer();
  const a1Diff = new PNG({ width: aw1, height: ah1 });
  const a1Mism = pm(a1Buf1, a1Buf2, a1Diff.data, aw1, ah1, { threshold: 0.1 });
  const a1Score = 1 - (a1Mism / (aw1 * ah1));

  console.log('Intro Arrow (243:821) similarity:', a1Score.toFixed(4));

  await browser.close();
}

testAllArrows();
