const fs = require('fs');

function extractTypography(xmlPath, name) {
  const xml = fs.readFileSync(xmlPath, 'utf8');
  console.log(`\n================ Typography in ${name} ================`);
  const textMatches = [...xml.matchAll(/<text id="([^"]+)" name="([^"]*)"([^>]*)>([\s\S]*?)<\/text>/g)];
  
  const styles = new Map();
  for (const m of textMatches) {
    const rawAttrs = m[3];
    const textContent = m[2] || m[4].trim().replace(/\s+/g, ' ');
    // Extract font size, family, weight, fill
    const fontSize = rawAttrs.match(/fontSize="([^"]+)"/)?.[1];
    const fontWeight = rawAttrs.match(/fontWeight="([^"]+)"/)?.[1];
    const fontFamily = rawAttrs.match(/fontFamily="([^"]+)"/)?.[1];
    const fill = rawAttrs.match(/fill="([^"]+)"/)?.[1];
    const lineHeight = rawAttrs.match(/lineHeight="([^"]+)"/)?.[1];
    const letterSpacing = rawAttrs.match(/letterSpacing="([^"]+)"/)?.[1];

    const key = `${fontFamily || 'Inter'}-${fontWeight || '400'}-${fontSize || '16'}-${fill || '#000'}`;
    if (!styles.has(key)) {
      styles.set(key, {
        sample: textContent.slice(0, 40),
        fontFamily,
        fontWeight,
        fontSize,
        lineHeight,
        letterSpacing,
        fill,
        count: 1
      });
    } else {
      styles.get(key).count++;
    }
  }

  for (const [k, v] of styles.entries()) {
    console.log(`Style [${v.count}x]: font=${v.fontFamily} w=${v.fontWeight} size=${v.fontSize} lh=${v.lineHeight} fill=${v.fill} | eg: "${v.sample}"`);
  }
}

extractTypography('scripts/meta_285_57.xml', 'InfluCrush');
