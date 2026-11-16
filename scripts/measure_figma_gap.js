const fs = require('fs');

// Measured Figma values from nodes 584:920 and 584:918 in Frame 33:
const arrow = {
  x: 530.963,
  y: 498.006,
  width: 49.864, // or 49.81px from metadata
  height: 50.852, // or 50.86px from metadata
};

const label = {
  x: 570.0,
  y: 535.0,
  width: 182.0,
  height: 53.0,
  padding: "0 13px",
  radius: 9.078,
  borderWidth: 4.539,
};

// (a) Vector from arrow tip (hotspot) to label top-left corner:
// Arrow tip with scaleX(-1) is at the top-left of arrow box: (530.96, 498.01)
const tip = { x: arrow.x, y: arrow.y };
const offsetVector = {
  dx: label.x - tip.x, // 570.0 - 530.963 = 39.037px
  dy: label.y - tip.y, // 535.0 - 498.006 = 36.994px
};

console.log('--- FIGMA MEASUREMENTS ---');
console.log('Arrow width:', arrow.width.toFixed(2), 'px');
console.log('Arrow height:', arrow.height.toFixed(2), 'px');
console.log('Label height:', label.height.toFixed(2), 'px');
console.log('Label width:', label.width.toFixed(2), 'px');
console.log('Offset vector dx:', offsetVector.dx.toFixed(2), 'px');
console.log('Offset vector dy:', offsetVector.dy.toFixed(2), 'px');

// (d) Gap between the arrow's bounding box and the label's box:
// Arrow box: [530.96, 498.01] to [580.82, 548.86]
// Label box: [570.00, 535.00] to [752.00, 588.00]
// Note: In bounding box space, arrow ends at X=580.82, label starts at X=570.
// But the arrow shape itself is a triangle/kite pointing UP-LEFT.
// The bottom-right tail of the arrow in SVG coordinates:
// In raw SVG, the left barb is near (9.08, 25.29) and right barb is near (41.22, 56.31).
// With scaleX(-1):
// The right barb becomes the left barb, and the left barb (9.08, 25.29) becomes the bottom-right point!
// Let's compute the actual geometry.
