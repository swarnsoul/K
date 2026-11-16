const fs = require('fs');
const http = require('http');
const path = require('path');

function rpc(method, params = {}, sessionId) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ jsonrpc: '2.0', id: 1, method, params });
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream',
      'Content-Length': Buffer.byteLength(payload)
    };
    if (sessionId) headers['mcp-session-id'] = sessionId;
    const req = http.request('http://127.0.0.1:3845/mcp', { method: 'POST', headers }, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => resolve({ data, headers: res.headers }));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

const detailedNodes = [
  // Travel section
  { id: '223:146', name: 'travel_photo_1' },
  { id: '255:880', name: 'travel_photo_2' },
  { id: '255:871', name: 'travel_photo_3' },
  { id: '251:868', name: 'travel_photo_4' },
  { id: '255:883', name: 'travel_photo_5' },
  { id: '255:874', name: 'travel_photo_6' },
  { id: '255:877', name: 'travel_photo_7' },
  { id: '230:74',  name: 'travel_arrow' },
  { id: '230:90',  name: 'travel_group21' },
  { id: '255:885', name: 'travel_group22' },
  // Art section
  { id: '259:69',  name: 'art_photo_1' },
  { id: '259:70',  name: 'art_photo_2' },
  { id: '259:71',  name: 'art_photo_3' },
  { id: '259:72',  name: 'art_photo_4' },
  { id: '257:900', name: 'art_arrow' },
  { id: '257:898', name: 'art_group21' },
  { id: '259:68',  name: 'art_group23' },
  // Hearts & Intro arrow
  { id: '243:821', name: 'intro_arrow_node' },
  { id: '265:119', name: 'hearts_group' },
];

async function run() {
  const outDir = path.resolve('scripts/detailed_refs');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const init = await rpc('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'agent', version: '1.0' }
  });
  const sid = init.headers['mcp-session-id'];

  const contexts = {};

  for (const item of detailedNodes) {
    try {
      // 1. Screenshot
      const res = await rpc('tools/call', {
        name: 'get_screenshot',
        arguments: { nodeId: item.id }
      }, sid);

      let parsed;
      if (res.data.includes('\ndata: ')) {
        parsed = JSON.parse(res.data.split('\ndata: ')[1]);
      } else {
        parsed = JSON.parse(res.data);
      }

      if (parsed.result && parsed.result.content) {
        const img = parsed.result.content.find(c => c.type === 'image');
        if (img) {
          const dest = path.join(outDir, `${item.name}.png`);
          fs.writeFileSync(dest, Buffer.from(img.data, 'base64'));
          console.log(`Saved ${item.name}.png`);
        }
      }

      // 2. Design context
      const dcRes = await rpc('tools/call', {
        name: 'get_design_context',
        arguments: { nodeId: item.id }
      }, sid);

      let dcParsed;
      if (dcRes.data.includes('\ndata: ')) {
        dcParsed = JSON.parse(dcRes.data.split('\ndata: ')[1]);
      } else {
        dcParsed = JSON.parse(dcRes.data);
      }

      if (dcParsed.result && dcParsed.result.content) {
        contexts[item.id] = dcParsed.result.content.filter(c => c.text).map(c => c.text);
      }
    } catch (err) {
      console.error(`Error for ${item.name}:`, err.message);
    }
  }

  fs.writeFileSync('scripts/detailed_contexts.json', JSON.stringify(contexts, null, 2));
  console.log('Saved detailed_contexts.json');
}

run();
