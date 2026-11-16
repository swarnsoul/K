const fs = require('fs');

function printFrameXml(filePath, frameId) {
  const xml = fs.readFileSync(filePath, 'utf8');
  const target = `<frame id="${frameId}"`;
  const idx = xml.indexOf(target);
  if (idx === -1) return console.log('Not found');
  console.log(xml.slice(idx, idx + 3500));
}

console.log('=== InfluCrush Hero Intro (314:149) ===');
printFrameXml('scripts/meta_285_57.xml', '314:149');
