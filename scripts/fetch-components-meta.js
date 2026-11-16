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

  const nodeIds = ['563:923', '546:943', '546:928'];
  for (const id of nodeIds) {
    console.log(`Fetching metadata for ${id}...`);
    const res = await rpc('tools/call', { name: 'get_metadata', arguments: { nodeId: id } }, sid);
    fs.writeFileSync(`scripts/meta_${id.replace(':', '_')}.json`, res.data, 'utf8');
    console.log(`Saved meta_${id.replace(':', '_')}.json`);
  }
}
run().catch(console.error);
