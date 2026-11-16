const fs = require('fs');
const xml = fs.readFileSync('scripts/meta_285_57.xml', 'utf8');
const textMatch = xml.match(/<text [^>]+>/g);
console.log('Sample text tags:');
console.log(textMatch ? textMatch.slice(0, 5) : 'None');
