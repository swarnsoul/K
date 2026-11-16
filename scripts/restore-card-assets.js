const http = require('http');
const fs = require('fs');
const path = require('path');

const originalAssets = [
  { file: 'card-1.png', url: 'http://localhost:3845/assets/b46f392072ac848579f042d03f807a88267cae6b.png' },
  { file: 'card-2.png', url: 'http://localhost:3845/assets/70c100223b298c5b8462511ec6178b58b44298d7.png' },
  { file: 'card-3.png', url: 'http://localhost:3845/assets/bd0faa1c3ffd2cf79a824dad3bac0b378758ea90.png' },
  { file: 'card-4.png', url: 'http://localhost:3845/assets/9fa0a729e9cc1c9b83f9e0d68a41272ed03700c4.png' },
  { file: 'card-5.png', url: 'http://localhost:3845/assets/3a0602e63706cfd6bdea6066c61a76bc98ab3346.png' },
  { file: 'card-6.png', url: 'http://localhost:3845/assets/b2daf16483e4dea48c3e3ce77017700d15e2240c.png' },
  { file: 'card-7.png', url: 'http://localhost:3845/assets/1f4f1851637769c267543332e784ffff930737d3.png' },
  { file: 'card-8.png', url: 'http://localhost:3845/assets/978c947f3b8c88c92822323691b079d603c6668b.png' },
  { file: 'card-9.png', url: 'http://localhost:3845/assets/d0fa76376d5be65b98a56c20f75f3f4fefa110b1.png' },
  { file: 'portrait.png', url: 'http://localhost:3845/assets/81e34e94e3864289484866e552e607518c2d3225.png' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      if (res.statusCode !== 200) return reject(new Error('Status ' + res.statusCode));
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

async function run() {
  for (const item of originalAssets) {
    const dest = path.resolve('public/assets/about', item.file);
    await download(item.url, dest);
    console.log('Downloaded original:', item.file);
  }
}
run();
