const sharp = require('sharp');
const fs = require('fs');

async function locateCardPeaks() {
  const imgBuf = await sharp('scripts/diff_results/side_by_side_1024.png').ensureAlpha().raw().toBuffer();
  const w = 672, h = 1024;

  // Let's compute tape detection: tape is yellow #ffd54f: r > 240, g in 200..225, b in 60..90
  const isTape = (r, g, b) => (r > 230 && g > 190 && g < 230 && b > 50 && b < 100);

  console.log('Finding Tape centers for each card in Left (Figma) vs Right (Rendered):');
  
  // Left tape y positions
  const leftTapes = [];
  const rightTapes = [];

  for (let y = 120; y < 530; y++) {
    let lCount = 0, rCount = 0;
    for (let x = 0; x < 336; x++) {
      const lIdx = (y * w + x) * 4;
      const rIdx = (y * w + (x + 336)) * 4;
      if (isTape(imgBuf[lIdx], imgBuf[lIdx+1], imgBuf[lIdx+2])) lCount++;
      if (isTape(imgBuf[rIdx], imgBuf[rIdx+1], imgBuf[rIdx+2])) rCount++;
    }
    if (lCount > 10) leftTapes.push({ y, count: lCount });
    if (rCount > 10) rightTapes.push({ y, count: rCount });
  }

  // Cluster tape y-ranges
  function cluster(arr) {
    const clusters = [];
    let cur = [];
    for (const item of arr) {
      if (cur.length === 0 || item.y === cur[cur.length-1].y + 1) {
        cur.push(item);
      } else {
        const avgY = cur.reduce((s, it) => s + it.y, 0) / cur.length;
        clusters.push({ avgY, startY: cur[0].y, endY: cur[cur.length-1].y, y1440: Math.round(avgY * 4401 / 1024) });
        cur = [item];
      }
    }
    if (cur.length > 0) {
      const avgY = cur.reduce((s, it) => s + it.y, 0) / cur.length;
      clusters.push({ avgY, startY: cur[0].y, endY: cur[cur.length-1].y, y1440: Math.round(avgY * 4401 / 1024) });
    }
    return clusters;
  }

  const leftClusters = cluster(leftTapes);
  const rightClusters = cluster(rightTapes);

  console.log('\nLeft (Figma Reference) Tape Y-centers:');
  leftClusters.forEach((c, idx) => console.log(`  Card ${idx+1}: y_1024 = ${c.avgY.toFixed(1)} -> y_1440 = ${c.y1440}px`));

  console.log('\nRight (Rendered Page) Tape Y-centers:');
  rightClusters.forEach((c, idx) => console.log(`  Card ${idx+1}: y_1024 = ${c.avgY.toFixed(1)} -> y_1440 = ${c.y1440}px`));
}
locateCardPeaks();
