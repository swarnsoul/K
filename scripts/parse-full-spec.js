const fs = require('fs');

function parseSpec(xmlPath, outPath) {
  const xml = fs.readFileSync(xmlPath, 'utf8');
  const lines = xml.split('\n');

  const topSections = [];
  let currentSection = null;
  let sectionStack = [];

  // Helper to extract attributes from a tag string
  function getAttrs(tagStr) {
    const attrs = {};
    const regex = /([a-zA-Z0-9_-]+)="([^"]*)"/g;
    let m;
    while ((m = regex.exec(tagStr)) !== null) {
      attrs[m[1]] = m[2];
    }
    return attrs;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Check depth by indent
    const indent = line.search(/\S/);

    if (trimmed.startsWith('<frame ') && trimmed.includes('name="Frame ')) {
      const attrs = getAttrs(trimmed);
      // Top section frame under Frame 80 has depth around 4 spaces
      if (indent === 4) {
        currentSection = {
          id: attrs.id,
          name: attrs.name,
          x: parseFloat(attrs.x || 0),
          y: parseFloat(attrs.y || 0),
          width: parseFloat(attrs.width || 0),
          height: parseFloat(attrs.height || 0),
          elements: []
        };
        topSections.push(currentSection);
      }
    }

    if (currentSection) {
      if (trimmed.startsWith('<text ')) {
        const attrs = getAttrs(trimmed);
        currentSection.elements.push({
          type: 'text',
          id: attrs.id,
          name: attrs.name,
          x: parseFloat(attrs.x || 0),
          y: parseFloat(attrs.y || 0),
          width: parseFloat(attrs.width || 0),
          height: parseFloat(attrs.height || 0),
        });
      } else if (trimmed.startsWith('<rounded-rectangle ') || trimmed.startsWith('<rectangle ') || trimmed.startsWith('<vector ')) {
        const attrs = getAttrs(trimmed);
        currentSection.elements.push({
          type: trimmed.split(' ')[0].slice(1),
          id: attrs.id,
          name: attrs.name,
          x: parseFloat(attrs.x || 0),
          y: parseFloat(attrs.y || 0),
          width: parseFloat(attrs.width || 0),
          height: parseFloat(attrs.height || 0),
        });
      }
    }
  }

  fs.writeFileSync(outPath, JSON.stringify(topSections, null, 2));
  console.log(`Parsed ${topSections.length} sections to ${outPath}`);
}

parseSpec('scripts/meta_285_57.xml', 'scripts/spec_influcrush.json');
parseSpec('scripts/meta_443_103.xml', 'scripts/spec_cirqell.json');
