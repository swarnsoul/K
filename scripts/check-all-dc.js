const fs = require('fs');
const dc = JSON.parse(fs.readFileSync('scripts/designContexts.json', 'utf8'));

const ids = [
  '233:696',
  '233:716',
  '233:731',
  '233:745',
  '233:705',
  '239:764',
  '239:776',
  '239:788',
  '243:807',
  '255:887',
  '257:888',
  '265:96'
];

for (const id of ids) {
  const item = dc[id];
  console.log(`\n=================== ID: ${id} ===================`);
  if (!item || !item[0] || !item[0].text) {
    console.log('No text in dc');
    continue;
  }
  const code = item[0].text;
  console.log(code.slice(0, 400));
}
