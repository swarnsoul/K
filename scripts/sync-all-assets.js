const fs = require('fs');
const http = require('http');
const path = require('path');

const targetDir = path.resolve('public/assets/about');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const assets = [
  { file: 'arrow-intro.svg', url: 'http://localhost:3845/assets/4dab61fe363237b6feaa4fa22b344e03f2b69c9a.svg', id: '243:821' },
  { file: 'arrow-travel.svg', url: 'http://localhost:3845/assets/c38b57546b83327a51a5a2217e706ab7daba8c43.svg', id: '230:74' },
  { file: 'arrow-art.svg', url: 'http://localhost:3845/assets/af6ec9b8747dff58a3cde39075add1112b26c072.svg', id: '257:900' },
  { file: 'heart-large.svg', url: 'http://localhost:3845/assets/be1e5df2538c39da36c8aab04b8e50077fff56d8.svg', id: '265:97' },
  { file: 'heart-small.svg', url: 'http://localhost:3845/assets/3f719085d901e9d6914311cdfebbbc1009d88c4a.svg', id: '265:112' },
  { file: 'portrait.png', url: 'http://localhost:3845/assets/81e34e94e3864289484866e552e607518c2d3225.png', id: '230:87' },
  { file: 'card-1.png', url: 'http://localhost:3845/assets/b46f392072ac848579f042d03f807a88267cae6b.png', id: '233:702' },
  { file: 'card-2.png', url: 'http://localhost:3845/assets/70c100223b298c5b8462511ec6178b58b44298d7.png', id: '233:729' },
  { file: 'card-3.png', url: 'http://localhost:3845/assets/bd0faa1c3ffd2cf79a824dad3bac0b378758ea90.png', id: '239:755' },
  { file: 'card-4.png', url: 'http://localhost:3845/assets/9fa0a729e9cc1c9b83f9e0d68a41272ed03700c4.png', id: '233:750' },
  { file: 'card-5.png', url: 'http://localhost:3845/assets/3a0602e63706cfd6bdea6066c61a76bc98ab3346.png', id: '233:714' },
  { file: 'card-6.png', url: 'http://localhost:3845/assets/b2daf16483e4dea48c3e3ce77017700d15e2240c.png', id: '239:774' },
  { file: 'card-7.png', url: 'http://localhost:3845/assets/1f4f1851637769c267543332e784ffff930737d3.png', id: '239:786' },
  { file: 'card-8.png', url: 'http://localhost:3845/assets/978c947f3b8c88c92822323691b079d603c6668b.png', id: '265:122' },
  { file: 'card-9.png', url: 'http://localhost:3845/assets/d0fa76376d5be65b98a56c20f75f3f4fefa110b1.png', id: '243:818' },
  { file: 'travel-1.png', url: 'http://localhost:3845/assets/40f1e3747f8ec23855ed444c8f57c61c89e2b7ed.png', id: '223:146' },
  { file: 'travel-2.png', url: 'http://localhost:3845/assets/5f30afd14f284764e03bc763cb7c926546a81012.png', id: '255:880' },
  { file: 'travel-3.png', url: 'http://localhost:3845/assets/1b99473390aa755c5d95b1a8ddd0948db4642f50.png', id: '255:871' },
  { file: 'travel-4.png', url: 'http://localhost:3845/assets/f7843398433992486378bc1b5307a2c951ebfd24.png', id: '251:868' },
  { file: 'travel-5.png', url: 'http://localhost:3845/assets/6f8cad6b2c5ddbe930f07b10987df8d3fdc49ee6.png', id: '255:883' },
  { file: 'travel-6.png', url: 'http://localhost:3845/assets/31967c72caed4d688e6230c473e8e4118c7266f4.png', id: '255:874' },
  { file: 'travel-7.png', url: 'http://localhost:3845/assets/b9639d2d177f272cbf06e18f5933091b4a9977b6.png', id: '255:877' },
  { file: 'art-1.png', url: 'http://localhost:3845/assets/480d719144185c3329095b33bac29043ef70ea2b.png', id: '259:69' },
  { file: 'art-2.png', url: 'http://localhost:3845/assets/4df887b614c3a70d9a8be09659b928d3642d1b7a.png', id: '259:70' },
  { file: 'art-3.png', url: 'http://localhost:3845/assets/aca85d660bf17a3bbed47df7ee15a1dab2642cf9.png', id: '259:71' },
  { file: 'art-4.png', url: 'http://localhost:3845/assets/66512c563ff409b1f3151e103702f7462e73c2cc.png', id: '259:72' },
];

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

async function run() {
  for (const item of assets) {
    const dest = path.join(targetDir, item.file);
    await download(item.url, dest);
    const size = fs.statSync(dest).size;
    console.log(`Saved ${item.file} (${size} bytes) for node ${item.id}`);
  }
  console.log('All 26 assets saved successfully!');
}

run().catch(console.error);
