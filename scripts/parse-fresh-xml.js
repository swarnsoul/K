const fs = require('fs');
const raw = fs.readFileSync('scripts/fresh_meta.json', 'utf8');
const dataStr = raw.split('\ndata: ')[1] || raw;
const parsed = JSON.parse(dataStr);
const xml = parsed.result.content[1].text;

function printSlice(startStr, endStr) {
  const p1 = xml.indexOf(startStr);
  if (p1 === -1) { console.log('NOT FOUND:', startStr); return; }
  const p2 = endStr ? xml.indexOf(endStr, p1) : p1 + 1000;
  console.log(xml.substring(p1, p2 + (endStr ? endStr.length : 0)));
}

console.log('=== Frame 182 ===');
printSlice('<frame id="563:923"', '</frame>\n</frame>');

console.log('=== Component 29 (Lamp) ===');
printSlice('<component-set id="546:943"', '</component-set>');

console.log('=== Component 28 (Diary) ===');
printSlice('<component-set id="546:928"', '</component-set>');
