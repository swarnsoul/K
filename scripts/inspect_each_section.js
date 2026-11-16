const fs = require('fs');
const xml = fs.readFileSync('scripts/meta_443_103.xml', 'utf8');

const sectionIds = [
  '443:312', // Navbar
  '443:358', // Hero Intro
  '443:106', // Hero Banner
  '443:110', // Design Process
  '443:166', // Key Screens
  '443:171', // Problem Space
  '443:175', // Key Challenges
  '443:180', // Bento
  '443:182', // Opportunity
  '443:186', // 4 Pillars
  '443:199', // Validation
  '443:203', // Key Insights
  '443:207', // Info Architecture
  '443:228', // User Flow
  '443:256', // Ideation
  '443:262', // Wireframes
  '443:268', // Solution
  '443:275', // HiFi Screens
  '443:294', // Design System
  '443:300', // Accessibility
  '443:304', // Business Impact
  '443:308'  // Reflection
];

// Let's write a function to extract all text nodes and images inside each section
sectionIds.forEach(id => {
  const startTag = `id="${id}"`;
  const pos = xml.indexOf(startTag);
  if (pos === -1) {
    console.log(`Section ${id} not found`);
    return;
  }
  // find the closing tag for this frame
  // Just print the frame opening line
  const lineStart = xml.lastIndexOf('<', pos);
  const lineEnd = xml.indexOf('>', pos);
  console.log(`\n================ ${id} ================`);
  console.log(xml.substring(lineStart, lineEnd + 1));
});
