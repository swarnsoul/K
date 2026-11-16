const fs = require('fs');
const xml = fs.readFileSync('scripts/meta_443_103.xml', 'utf8');
const idx = xml.indexOf('id="443:268"');
console.log(xml.slice(idx, idx + 2000));
