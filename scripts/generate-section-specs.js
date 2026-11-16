const fs = require('fs');

function dumpDetailedSpec(metaFile, outFile) {
  const xml = fs.readFileSync(metaFile, 'utf8');
  // Match each top-level frame under Frame 80
  const sections = [];
  const frameRegex = /<frame id="([^"]+)" name="(Frame \d+)" x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)">([\s\S]*?)<\/frame>/g;
  
  // Also handle single-tag sections or image 3
  const lines = xml.split('\n');
  let currentSection = null;
  let sectionContent = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed.startsWith('<frame ') && trimmed.includes('name="Frame ') && line.startsWith('    <frame')) {
      if (currentSection) {
        currentSection.raw = sectionContent.join('\n');
        sections.push(currentSection);
      }
      const id = trimmed.match(/id="([^"]+)"/)[1];
      const name = trimmed.match(/name="([^"]+)"/)[1];
      const x = parseFloat(trimmed.match(/x="([^"]+)"/)[1]);
      const y = parseFloat(trimmed.match(/y="([^"]+)"/)[1]);
      const w = parseFloat(trimmed.match(/width="([^"]+)"/)[1]);
      const h = parseFloat(trimmed.match(/height="([^"]+)"/)[1]);
      currentSection = { id, name, x, y, width: w, height: h };
      sectionContent = [line];
    } else if (currentSection) {
      if (line.startsWith('    <frame') || (line.startsWith('  </frame>') && !line.startsWith('    </frame>'))) {
        currentSection.raw = sectionContent.join('\n');
        sections.push(currentSection);
        currentSection = null;
        sectionContent = [];
      } else {
        sectionContent.push(line);
      }
    }
  }
  if (currentSection) {
    currentSection.raw = sectionContent.join('\n');
    sections.push(currentSection);
  }

  // For each section, parse texts and child shapes
  sections.forEach(s => {
    s.texts = [];
    s.shapes = [];
    const textMatches = s.raw.matchAll(/<text id="([^"]+)" name="([^"]+)" x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)" \/>/g);
    for (const tm of textMatches) {
      s.texts.push({ id: tm[1], text: tm[2], x: parseFloat(tm[3]), y: parseFloat(tm[4]), w: parseFloat(tm[5]), h: parseFloat(tm[6]) });
    }
    const shapeMatches = s.raw.matchAll(/<(rounded-rectangle|rectangle|vector) id="([^"]+)" name="([^"]+)" x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)" \/>/g);
    for (const sm of shapeMatches) {
      s.shapes.push({ type: sm[1], id: sm[2], name: sm[3], x: parseFloat(sm[4]), y: parseFloat(sm[5]), w: parseFloat(sm[6]), h: parseFloat(sm[7]) });
    }
    delete s.raw;
  });

  fs.writeFileSync(outFile, JSON.stringify(sections, null, 2));
  console.log(`Saved ${sections.length} detailed sections to ${outFile}`);
}

dumpDetailedSpec('scripts/meta_285_57.xml', 'scripts/detailed_influcrush.json');
dumpDetailedSpec('scripts/meta_443_103.xml', 'scripts/detailed_cirqell.json');
