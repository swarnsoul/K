const sharp = require('sharp');

async function checkHeroIntro() {
  const meta1 = await sharp('scripts/figma_sections_influcrush/02_hero_intro.png').metadata();
  console.log('InfluCrush 02_hero_intro metadata:', meta1);
  const meta2 = await sharp('scripts/figma_sections_cirqell/02_hero_intro.png').metadata();
  console.log('Cirqell 02_hero_intro metadata:', meta2);
}

checkHeroIntro();
