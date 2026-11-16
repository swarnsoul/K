const fs = require('fs');

function verifyTexts(xmlPath, componentPath, name) {
  const xml = fs.readFileSync(xmlPath, 'utf8');
  const code = fs.readFileSync(componentPath, 'utf8');
  console.log(`\n================ Checking Texts: ${name} ================`);

  // Extract all text tags from xml
  const textNames = [...xml.matchAll(/<text id="[^"]+" name="([^"]*)"/g)].map(m => m[1]);
  console.log(`Total Figma text elements: ${textNames.length}`);

  let missing = [];
  let found = 0;
  for (const t of textNames) {
    // clean text
    const clean = t.replace(/&amp;/g, '&')
                   .replace(/&#39;/g, "'")
                   .replace(/&quot;/g, '"')
                   .replace(/\s+/g, ' ')
                   .trim();
    if (clean.length < 5) continue; // skip tiny single chars/numbers

    // check if present in code
    // simple check: first 30 chars
    const searchSample = clean.slice(0, 35);
    if (code.includes(searchSample) || code.includes(clean.slice(0, 25))) {
      found++;
    } else {
      missing.push(clean);
    }
  }

  console.log(`Matched: ${found} text strings.`);
  if (missing.length > 0) {
    console.log(`Missing/Different (${missing.length}):`);
    missing.slice(0, 10).forEach(m => console.log(`  - "${m.slice(0, 80)}"`));
  } else {
    console.log('ALL texts matched perfectly!');
  }
}

verifyTexts('scripts/meta_285_57.xml', 'components/case-study/InfluCrushPage.tsx', 'InfluCrush');
verifyTexts('scripts/meta_443_103.xml', 'components/case-study/CirqellPage.tsx', 'Cirqell');
