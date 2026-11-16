const fs = require('fs');

let content = fs.readFileSync('components/case-study/CirqellHiFiScreens.tsx', 'utf8');

// 1. Add laser scan animation to Screen 6 Line 3
content = content.replace(
  'className="-translate-x-1/2 absolute bottom-[165.41px] flex h-[0.372px] items-center justify-center left-[calc(50%-1.46px)] w-[98.595px]" data-node-id="445:3276"',
  'className="-translate-x-1/2 absolute bottom-[165.41px] flex h-[0.372px] items-center justify-center left-[calc(50%-1.46px)] w-[98.595px] animate-laser-scan shadow-[0_0_8px_#019595]" data-node-id="445:3276"'
);

// 2. Enhance Row 1 screens with hover effects
content = content.replace(
  'className="bg-black h-[308.2px] overflow-clip relative shrink-0 w-[142.415px]" data-node-id="445:3116"',
  'className="bg-black h-[308.2px] overflow-clip relative shrink-0 w-[142.415px] rounded-[16px] transition-all duration-300 hover:scale-[1.05] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer" data-node-id="445:3116"'
);
content = content.replace(
  'className="bg-black h-[308.2px] overflow-clip relative shrink-0 w-[142.415px]" data-node-id="445:3141"',
  'className="bg-black h-[308.2px] overflow-clip relative shrink-0 w-[142.415px] rounded-[16px] transition-all duration-300 hover:scale-[1.05] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer" data-node-id="445:3141"'
);
content = content.replace(
  'className="h-[308.2px] overflow-clip relative shrink-0 w-[142.415px]" data-node-id="445:3169"',
  'className="h-[308.2px] overflow-clip relative shrink-0 w-[142.415px] rounded-[16px] transition-all duration-300 hover:scale-[1.05] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer" data-node-id="445:3169"'
);
content = content.replace(
  'className="bg-black h-[308.2px] overflow-clip relative shrink-0 w-[142.415px]" data-node-id="445:3197"',
  'className="bg-black h-[308.2px] overflow-clip relative shrink-0 w-[142.415px] rounded-[16px] transition-all duration-300 hover:scale-[1.05] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer" data-node-id="445:3197"'
);
content = content.replace(
  'className="bg-black h-[308.2px] overflow-clip relative shrink-0 w-[142.415px]" data-node-id="445:3225"',
  'className="bg-black h-[308.2px] overflow-clip relative shrink-0 w-[142.415px] rounded-[16px] transition-all duration-300 hover:scale-[1.05] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer" data-node-id="445:3225"'
);
content = content.replace(
  'className="bg-black h-[308.2px] overflow-clip relative shrink-0 w-[142.415px]" data-node-id="445:3262"',
  'className="bg-black h-[308.2px] overflow-clip relative shrink-0 w-[142.415px] rounded-[16px] transition-all duration-300 hover:scale-[1.05] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer" data-node-id="445:3262"'
);

// 3. Enhance Row 2 screens with hover effects
content = content.replace(
  'className="h-[362.881px] overflow-clip relative shrink-0 w-[167.682px]" data-node-id="445:3293"',
  'className="h-[362.881px] overflow-clip relative shrink-0 w-[167.682px] rounded-[20px] transition-all duration-300 hover:scale-[1.05] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer" data-node-id="445:3293"'
);
content = content.replace(
  'className="h-[362.881px] overflow-clip relative shrink-0 w-[167.682px]" data-node-id="445:3330"',
  'className="h-[362.881px] overflow-clip relative shrink-0 w-[167.682px] rounded-[20px] transition-all duration-300 hover:scale-[1.05] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer" data-node-id="445:3330"'
);
content = content.replace(
  'className="h-[362.881px] overflow-clip relative shrink-0 w-[167.682px]" data-node-id="445:3353"',
  'className="h-[362.881px] overflow-clip relative shrink-0 w-[167.682px] rounded-[20px] transition-all duration-300 hover:scale-[1.05] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer" data-node-id="445:3353"'
);
content = content.replace(
  'className="h-[362.881px] overflow-clip relative shrink-0 w-[167.682px]" data-node-id="445:3376"',
  'className="h-[362.881px] overflow-clip relative shrink-0 w-[167.682px] rounded-[20px] transition-all duration-300 hover:scale-[1.05] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer" data-node-id="445:3376"'
);
content = content.replace(
  'className="h-[362.881px] overflow-clip relative shrink-0 w-[167.682px]" data-node-id="445:3426"',
  'className="h-[362.881px] overflow-clip relative shrink-0 w-[167.682px] rounded-[20px] transition-all duration-300 hover:scale-[1.05] hover:z-20 hover:shadow-[0_12px_28px_rgba(0,0,0,0.5)] cursor-pointer" data-node-id="445:3426"'
);

fs.writeFileSync('components/case-study/CirqellHiFiScreens.tsx', content);
console.log('Updated CirqellHiFiScreens with animations & hover interactions!');
