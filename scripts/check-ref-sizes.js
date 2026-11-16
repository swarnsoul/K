const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function checkRefSizes() {
  const dir = 'scripts/figma_refs';
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f.endsWith('.png')) {
      const meta = await sharp(path.join(dir, f)).metadata();
      console.log(`${f.padEnd(20)}: ${meta.width} x ${meta.height}`);
    }
  }
}
checkRefSizes();
