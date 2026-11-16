const fs = require('fs');
const xml = fs.readFileSync('scripts/meta_285_57.xml', 'utf8');

const sIdx = xml.indexOf('314:149');
const eIdx = xml.indexOf('320:181');
console.log('sIdx:', sIdx, 'eIdx:', eIdx);
if (sIdx > eIdx) {
  console.log('320:181 is before 314:149 in the XML!');
  console.log(xml.slice(sIdx, sIdx + 1500));
} else {
  console.log(xml.slice(sIdx, eIdx));
}
