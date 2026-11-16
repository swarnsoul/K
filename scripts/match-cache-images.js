const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const cacheDir = path.join(process.env.APPDATA, 'Figma/DesktopProfile/v43/Cache/Cache_Data');
const refsDir = path.resolve('scripts/desk_refs');

async function main() {
  const refFiles = fs.readdirSync(refsDir).filter(f => f.endsWith('.png'));
  const cacheFiles = fs.readdirSync(cacheDir);

  console.log(`Analyzing ${refFiles.length} refs against ${cacheFiles.length} cache files...`);

  // First compute a simple downscaled perceptual fingerprint (16x16) for each ref
  const refFingerprints = {};
  for (const rf of refFiles) {
    const p = path.join(refsDir, rf);
    const buf = await sharp(p).resize(16, 16, { fit: 'fill' }).toColorspace('b-w').raw().toBuffer();
    refFingerprints[rf] = buf;
  }

  const matches = {};

  for (const cf of cacheFiles) {
    const cp = path.join(cacheDir, cf);
    try {
      const stat = fs.statSync(cp);
      if (stat.size < 5000) continue;
      const meta = await sharp(cp).metadata();
      if (!['png', 'jpeg', 'webp'].includes(meta.format)) continue;

      const cBuf = await sharp(cp).resize(16, 16, { fit: 'fill' }).toColorspace('b-w').raw().toBuffer();

      for (const [rf, rBuf] of Object.entries(refFingerprints)) {
        let diff = 0;
        for (let i = 0; i < 256; i++) {
          diff += Math.abs(cBuf[i] - rBuf[i]);
        }
        const avgDiff = diff / 256;
        if (avgDiff < 20) { // strong match
          if (!matches[rf] || matches[rf].avgDiff > avgDiff) {
            matches[rf] = {
              cacheFile: cf,
              format: meta.format,
              width: meta.width,
              height: meta.height,
              size: stat.size,
              avgDiff: avgDiff.toFixed(2)
            };
          }
        }
      }
    } catch (e) {}
  }

  console.log('\nMatches found:');
  console.table(matches);
  fs.writeFileSync('scripts/cache_matches.json', JSON.stringify(matches, null, 2));
}

main().catch(console.error);
