const fs = require('fs');

const p15 = JSON.parse(fs.readFileSync('scripts/parsed-15.json', 'utf8'));

function dumpSections(parsedList, title) {
  let currentFrame = null;
  const sections = [];

  for (const item of parsedList) {
    if (item.depth === 2 && item.name && item.name.startsWith('Frame ')) {
      currentFrame = { id: item.id, name: item.name, y: item.y, h: item.h, items: [] };
      sections.push(currentFrame);
    } else if (currentFrame) {
      currentFrame.items.push(item);
    }
  }

  const out = [];
  out.push('====================================');
  out.push('       ' + title);
  out.push('====================================');

  for (const s of sections) {
    out.push(`\n### ${s.name} (${s.id}) at y=${s.y}, h=${s.h}`);
    for (const it of s.items) {
      if (it.raw && it.raw.includes('<text')) {
        out.push(`    TEXT [depth ${it.depth}]: ${it.raw}`);
      } else if (it.raw && (it.raw.includes('<rounded-rectangle') || it.raw.includes('<image') || it.raw.includes('<vector'))) {
        out.push(`    SHAPE [depth ${it.depth}]: ${it.raw}`);
      }
    }
  }
  return out.join('\n');
}

fs.writeFileSync('scripts/cirqell-details.txt', dumpSections(p15, 'CIRQELL DETAILS'));
console.log('Saved scripts/cirqell-details.txt');
