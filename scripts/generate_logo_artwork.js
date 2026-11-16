const fs = require("fs");

const svg = fs.readFileSync("public/assets/logo-nav-vectorized.svg", "utf-8");

// Extract all <path ... /> tags
const pathTags = svg.match(/<path[^>]+>/g) || [];

const tsContent = `/**
 * Logo Artwork Vectors
 * Extracted directly from public/assets/logo-nav-vectorized.svg
 */

export const LOGO_STROKES = {
  // Path 1: Long vertical stroke in middle of first 'क' (top to bottom)
  path1_vertical: "M 13.25 0.7 L 13.25 30.2",

  // Path 2: Continuous letters stroke (left to right)
  path2_letters: [
    "M 13.25 12.6",
    "C 10.5 14.0, 6.0 16.8, 3.2 16.4",
    "C 1.0 16.0, 1.0 13.0, 2.6 11.4",
    "C 4.6 9.4, 9.5 9.6, 13.25 11.8",
    "C 16.5 10.0, 20.8 9.8, 23.2 11.5",
    "C 24.6 12.5, 24.4 14.8, 22.8 16.8",
    "C 20.8 19.5, 17.5 22.2, 17.0 21.0",
    "C 16.5 19.5, 18.2 17.5, 20.5 16.0",
    "C 22.8 14.5, 25.8 13.5, 27.8 12.8",
    "C 29.8 12.2, 32.2 13.5, 32.0 15.6",
    "C 31.8 17.8, 29.2 18.5, 27.5 17.5",
    "C 26.2 16.5, 26.8 14.2, 28.5 13.0",
    "C 30.2 11.6, 32.8 11.0, 34.2 12.2",
    "C 35.8 14.2, 36.8 20.0, 35.5 21.6",
    "C 34.2 22.4, 33.2 20.5, 33.8 18.5",
    "C 34.5 16.2, 36.5 13.5, 38.0 11.8",
    "C 39.5 10.5, 43.0 9.8, 45.8 11.2",
    "C 47.8 12.2, 48.5 14.0, 47.2 16.0",
    "C 45.5 17.5, 42.5 17.5, 40.5 15.5",
    "C 39.8 14.5, 40.2 13.0, 42.0 11.5",
    "C 44.5 9.5, 47.5 8.5, 48.8 6.4",
    "L 48.8 21.6",
    "C 48.8 17.5, 51.2 14.2, 53.8 11.5",
    "C 56.5 9.6, 58.2 10.8, 58.0 13.5",
    "C 57.8 16.2, 55.5 18.8, 53.5 20.2",
    "C 51.8 21.0, 51.5 19.5, 52.0 17.8",
    "C 52.8 15.2, 55.8 13.2, 58.5 11.8",
    "C 61.2 10.2, 63.5 7.8, 62.5 6.4",
  ].join(" "),

  // Path 3: Horizontal top line (right to left)
  path3_topLine: [
    "M 62.5 6.4",
    "C 63.8 5.0, 62.2 3.8, 59.5 3.8",
    "L 14.0 4.3",
    "C 10.0 4.3, 3.5 4.3, 1.2 3.5",
    "C 0.6 3.3, 0.6 4.3, 1.0 4.5",
  ].join(" "),
};

export const LOGO_FILLED_PATHS: Array<{ id: string; d: string }> = [
${pathTags
  .map((p) => {
    const id = p.match(/id="([^"]+)"/)?.[1] || "";
    const d = p.match(/d="([^"]+)"/)?.[1] || "";
    return `  { id: "${id}", d: "${d}" },`;
  })
  .join("\n")}
];
`;

fs.writeFileSync("lib/logoArtwork.ts", tsContent, "utf-8");
console.log("Successfully generated lib/logoArtwork.ts with", pathTags.length, "filled paths!");
