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
    const req = http.request('http://127.0.0.1:3845/mcp', { method: 'POST', headers, timeout: 60000 }, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => resolve({ data, headers: res.headers }));
    });
    req.on('timeout', () => req.destroy(new Error('RPC timed out')));
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

let cachedSessionId = null;

async function getSession() {
  if (cachedSessionId) return cachedSessionId;
  const init = await rpc('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'agent', version: '1.0' }
  });
  cachedSessionId = init.headers['mcp-session-id'];
  return cachedSessionId;
}

async function callTool(name, args = {}) {
  const sid = await getSession();
  const res = await rpc('tools/call', { name, arguments: args }, sid);
  // Parse SSE response: data: { ... }
  const lines = res.data.split('\n');
  let jsonLine = lines.find(l => l.startsWith('data: '));
  if (jsonLine) {
    const parsed = JSON.parse(jsonLine.slice(6));
    return parsed.result;
  }
  try {
    const parsed = JSON.parse(res.data);
    return parsed.result;
  } catch (e) {
    throw new Error('Failed to parse response: ' + res.data.slice(0, 200));
  }
}

module.exports = { callTool };
