const fs = require('fs');

const dc = JSON.parse(fs.readFileSync('scripts/desk_dc_all.json', 'utf8'));
let out = '';

for (const [nodeId, content] of Object.entries(dc)) {
  out += `\n================ Node ${nodeId} ================\n`;
  for (const item of content) {
    if (typeof item.text === 'string') {
      out += item.text + '\n';
    }
  }
}

fs.writeFileSync('scripts/desk_dc_parsed.txt', out, 'utf8');
console.log('Saved desk_dc_parsed.txt');
