const fs = require('fs');

function analyzeXml(filePath, name) {
  const xml = fs.readFileSync(filePath, 'utf8');
  console.log(`\n================== ${name} ==================`);
  
  // Extract all text tags
  const textRegex = /<text id="([^"]+)" name="([^"]*)"(?:[^>]*)>([\s\S]*?)<\/text>/g;
  let match;
  let count = 0;
  const sections = {};

  // Find all frames
  const frameRegex = /<frame id="([^"]+)" name="([^"]+)" x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)">/g;
  const frames = [];
  while ((match = frameRegex.exec(xml)) !== null) {
    frames.push({
      id: match[1],
      name: match[2],
      x: parseFloat(match[3]),
      y: parseFloat(match[4]),
      w: parseFloat(match[5]),
      h: parseFloat(match[6]),
      index: match.index
    });
  }
  
  // Sort frames by y position
  frames.sort((a, b) => a.y - b.y);
  
  console.log(`Found ${frames.length} frames.`);
  for (const f of frames) {
    if (f.w >= 1000) {
      console.log(`Frame: ${f.name} (id: ${f.id}) at y=${f.y}, w=${f.w}, h=${f.h}`);
    }
  }
}

analyzeXml('scripts/meta_285_57.xml', 'InfluCrush');
analyzeXml('scripts/meta_443_103.xml', 'Cirqell');
