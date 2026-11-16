const fs = require('fs');

const SCENE_WIDTH = 1440;
const SCENE_HEIGHT = 868;

const manifest = [
  {
    id: '563:925',
    name: 'desk_base',
    description: 'Wooden desk, drawers, and laptop with sunset wallpaper',
    x: 0,
    y: 0,
    width: 1439,
    height: 959,
    zIndex: 1,
    asset: '/assets/desk/desk_base.png',
    shadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
    radius: 0
  },
  {
    id: '563:926',
    name: 'lamp_glow',
    description: 'Warm glow behind the lamp and on wall',
    x: 1010,
    y: 215,
    width: 371,
    height: 363,
    zIndex: 2,
    asset: '/assets/desk/lamp_glow.png',
    shadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
    radius: 0
  },
  {
    id: '563:927',
    name: 'pinboard',
    description: 'Framed pinboard of polaroids and "Good things take time" note',
    x: 206,
    y: 191.64,
    width: 258.13,
    height: 317.14,
    zIndex: 3,
    asset: '/assets/desk/pinboard.png',
    crop: {
      width: '105.89%',
      height: '104.17%',
      left: '-2.94%',
      top: '-2.08%'
    },
    shadow: null,
    radius: 0
  },
  {
    id: '563:928',
    name: 'lamp_instance',
    description: 'Desk lamp with ON/OFF variants and clickable toggle',
    x: 975,
    y: 146,
    width: 418,
    height: 384,
    zIndex: 4,
    variants: {
      on: {
        asset: '/assets/desk/lamp_on.png',
        bulbGlow: {
          left: '29.9%',
          top: 'calc(50% - 22.5px)',
          width: '10.77%', // 45px / 418px
          height: '11.72%', // 45px / 384px
          blur: '15px'
        }
      },
      off: {
        asset: '/assets/desk/lamp_off.png',
        bulbGlow: null
      }
    },
    filter: 'drop-shadow(0px 4px 2px rgba(0,0,0,0.25))',
    radius: 0
  },
  {
    id: '563:929',
    name: 'plant_right',
    description: 'Plant trailing over desk edge on the right',
    x: 1246,
    y: 248,
    width: 135,
    height: 330,
    zIndex: 5,
    asset: '/assets/desk/plant_right.png',
    crop: {
      width: '274.96%',
      height: '110%',
      left: '-174.89%',
      top: '-10%'
    },
    shadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
    radius: 7
  },
  {
    id: '563:930',
    name: 'candle',
    description: 'Lit glass jar candle on wooden coaster',
    x: 901,
    y: 364,
    width: 147,
    height: 127,
    zIndex: 6,
    asset: '/assets/desk/candle.png',
    shadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
    radius: 0
  },
  {
    id: '563:931',
    name: 'mug',
    description: 'Floral coffee mug on coaster',
    x: 1008,
    y: 480,
    width: 170,
    height: 147,
    zIndex: 7,
    asset: '/assets/desk/mug.png',
    shadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
    radius: 0
  },
  {
    id: '563:932',
    name: 'clock',
    description: 'Golden vintage twin-bell alarm clock',
    x: 364,
    y: 378,
    width: 142,
    height: 130,
    zIndex: 8,
    asset: '/assets/desk/clock.png',
    shadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
    radius: 0
  },
  {
    id: '563:933',
    name: 'plant_left',
    description: 'Left plant pot, pen holder, books stack, and cute bunny',
    x: 12,
    y: 282,
    width: 332,
    height: 275,
    zIndex: 9,
    asset: '/assets/desk/plant_left.png',
    shadow: '10px 4px 4px 0px rgba(0,0,0,0.25)',
    radius: 0
  },
  {
    id: '563:934',
    name: 'diary_instance',
    description: 'Spiral notebook ("Today" checklist) with pink pen',
    x: 197,
    y: 480,
    width: 284.76,
    height: 189.84,
    zIndex: 10,
    variants: {
      default: {
        asset: '/assets/desk/diary_v1.png',
        innerBox: { width: 252.851, height: 168.567 },
        rotate: -4.97,
        shadow: null
      },
      hover: {
        asset: '/assets/desk/diary_v1.png',
        innerBox: { width: 268.241, height: 178.827 },
        rotate: -4.97,
        shadow: '0px 4.243px 21.217px 0px #ffd54f'
      }
    },
    filter: 'drop-shadow(0px 4px 2px rgba(0,0,0,0.25))',
    radius: 0
  }
];

// Add percentages
for (const item of manifest) {
  item.percent = {
    left: ((item.x / SCENE_WIDTH) * 100).toFixed(4) + '%',
    top: ((item.y / SCENE_HEIGHT) * 100).toFixed(4) + '%',
    width: ((item.width / SCENE_WIDTH) * 100).toFixed(4) + '%',
    height: ((item.height / SCENE_HEIGHT) * 100).toFixed(4) + '%'
  };
}

fs.writeFileSync('scripts/desk_manifest.json', JSON.stringify(manifest, null, 2));
console.log('Saved scripts/desk_manifest.json');
console.table(manifest.map(m => ({
  name: m.name,
  x: m.x,
  y: m.y,
  w: m.width,
  h: m.height,
  leftPct: m.percent.left,
  topPct: m.percent.top,
  widthPct: m.percent.width,
  heightPct: m.percent.height
})));
