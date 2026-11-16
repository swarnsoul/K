const http = require('http');
const fs = require('fs');

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

async function run() {
  const init = await rpc('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'agent', version: '1.0' }
  });
  const sid = init.headers['mcp-session-id'];

  const nodes = [
    '563:925',
    '563:926',
    '563:927',
    '563:929',
    '563:930',
    '563:931',
    '563:932',
    '563:933',
    '546:942',
    '546:941',
    '546:927',
    '546:926',
    '563:928',
    '563:934'
  ];

  const results = {};
  for (const id of nodes) {
    console.log(`Fetching get_design_context for ${id}...`);
    try {
      const res = await rpc('tools/call', { name: 'get_design_context', arguments: { nodeId: id } }, sid);
      const parsed = JSON.parse(res.data.split('\ndata: ')[1] || res.data);
      results[id] = parsed.result?.content;
      console.log(`-> Success for ${id}`);
    } catch (e) {
      console.error(`-> Failed for ${id}:`, e.message);
    }
  }

  fs.writeFileSync('scripts/fresh_dc_all.json', JSON.stringify(results, null, 2), 'utf8');
  console.log('Saved scripts/fresh_dc_all.json');
}

run().catch(console.error);
