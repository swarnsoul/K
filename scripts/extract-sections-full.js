const fs = require('fs');

function extractAllSections(filePath, projectName) {
  const xml = fs.readFileSync(filePath, 'utf8');
  console.log(`\n======================================================`);
  console.log(`       ALL SECTIONS IN ${projectName.toUpperCase()}`);
  console.log(`======================================================`);

  // Regex to match top-level section frames inside Frame 80
  // Frame 80 is the parent frame containing Frame 86, 87, 88, 89, 90, 91, 92, 94, 95, 96, 97, 98, 99, 100, 101, 102, 108, 103, 104, 105, 106, 107
  const sectionRegex = /<frame id="([^"]+)" name="(Frame \d+)" x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)">/g;
  let match;
  const sections = [];
  while ((match = sectionRegex.exec(xml)) !== null) {
    sections.push({
      id: match[1],
      name: match[2],
      x: parseFloat(match[3]),
      y: parseFloat(match[4]),
      w: parseFloat(match[5]),
      h: parseFloat(match[6]),
      rawIndex: match.index
    });
  }

  // Deduplicate and filter to main frames (w >= 1400)
  const mainSections = sections.filter(s => s.w >= 1400).sort((a, b) => a.y - b.y);

  for (let i = 0; i < mainSections.length; i++) {
    const s = mainSections[i];
    // Find section snippet
    const nextIdx = (i < mainSections.length - 1) ? mainSections[i+1].rawIndex : xml.length;
    const snippet = xml.slice(s.rawIndex, nextIdx);

    // Get direct child frames/texts
    const texts = [...snippet.matchAll(/<text id="([^"]+)" name="([^"]*)" x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)"/g)].map(t => ({
      text: t[2].trim().replace(/\s+/g, ' ').slice(0, 80),
      x: parseFloat(t[3]),
      y: parseFloat(t[4]),
      w: parseFloat(t[5]),
      h: parseFloat(t[6])
    }));

    // Find first-level children inside section
    const childFrames = [...snippet.matchAll(/<frame id="([^"]+)" name="([^"]+)" x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)"/g)]
      .slice(1) // exclude self
      .map(f => ({
        name: f[2],
        x: parseFloat(f[3]),
        y: parseFloat(f[4]),
        w: parseFloat(f[5]),
        h: parseFloat(f[6])
      }));

    console.log(`\n[Section ${i+1}] ${s.name} (id: ${s.id}) at y=${s.y}, h=${s.h}, w=${s.w}`);
    if (childFrames.length > 0) {
      console.log(`  Child Frames (${childFrames.length}):`, childFrames.slice(0, 5).map(cf => `${cf.name} (x=${cf.x}, y=${cf.y}, w=${cf.w}, h=${cf.h})`).join(', '));
    }
    if (texts.length > 0) {
      console.log(`  Texts (${texts.length}):`);
      texts.slice(0, 4).forEach(t => console.log(`    - "${t.text}" at x=${t.x}, y=${t.y}, w=${t.w}, h=${t.h}`));
    }
  }
}

extractAllSections('scripts/meta_285_57.xml', 'InfluCrush');
extractAllSections('scripts/meta_443_103.xml', 'Cirqell');
