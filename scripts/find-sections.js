const fs = require('fs');

function inspectSections(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const lines = code.split('\n');
  console.log(`=== ${filePath} ===`);
  lines.forEach((l, idx) => {
    if (l.includes('<section') || l.includes('{/* ─')) {
      console.log(`L${idx+1}: ${l.trim()}`);
    }
  });
}

inspectSections('components/case-study/InfluCrushPage.tsx');
inspectSections('components/case-study/CirqellPage.tsx');
