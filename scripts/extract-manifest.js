const http = require('http');
const fs = require('fs');
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

async function run() {
  const init = await rpc('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'agent', version: '1.0' }
  });
  const sid = init.headers['mcp-session-id'];
  console.log('Session ID:', sid);

  const metaRes = await rpc('tools/call', {
    name: 'get_metadata',
    arguments: { nodeId: '217:666' }
  }, sid);

  const parsed = JSON.parse(metaRes.data.split('\ndata: ')[1]);
  const xml = parsed.result.content[0].text;
  fs.writeFileSync('scripts/metadata.xml', xml);
  console.log('Saved metadata.xml, length:', xml.length);

  // Parse all nodes from XML
  const lines = xml.split('\n');
  const rawNodes = [];
  for (const line of lines) {
    const m = line.match(/<([a-z0-9\-]+)\s+id="([^"]+)"\s+name="([^"]+)"\s+x="([^"]+)"\s+y="([^"]+)"\s+width="([^"]+)"\s+height="([^"]+)"/);
    if (m) {
      rawNodes.push({
        tag: m[1],
        id: m[2],
        name: m[3],
        x: parseFloat(m[4]),
        y: parseFloat(m[5]),
        width: parseFloat(m[6]),
        height: parseFloat(m[7]),
        raw: line.trim()
      });
    }
  }
  console.log('Parsed raw nodes count:', rawNodes.length);

  // Key nodes to fetch get_design_context for detailed styling, colors, rotations, etc.
  // We can fetch design context for main sections and cards
  const nodesToFetch = [
    '223:125', // About Me text
    '243:820', // Intro card Frame 81
    '223:143', // Frame 79 (Portrait Frame)
    '230:87',  // Component 27 (Portrait)
    '243:821', // Arrow Intro
    '233:696', // Card 1
    '233:716', // Card 2
    '233:731', // Card 3
    '233:745', // Card 4
    '233:705', // Card 5
    '239:764', // Card 6
    '239:776', // Card 7
    '239:788', // Card 8
    '243:807', // Card 9
    '255:887', // Frame 83 (Travel)
    '223:153', // Travelling all around text
    '230:74',  // Travel arrow
    '257:888', // Frame 84 (Art)
    '257:899', // Contemporary Artist text
    '257:900', // Art arrow
    '265:96',  // Frame 85 (Closing)
    '265:95',  // Closing quote text
    '265:119', // Hearts group
  ];

  const designContexts = {};
  for (const id of nodesToFetch) {
    console.log('Fetching design context for:', id);
    try {
      const dcRes = await rpc('tools/call', {
        name: 'get_design_context',
        arguments: { nodeId: id }
      }, sid);
      const dcParsed = JSON.parse(dcRes.data.split('\ndata: ')[1]);
      designContexts[id] = dcParsed.result.content;
      console.log('-> Got context for', id);
    } catch (err) {
      console.error('Error fetching', id, err.message);
    }
  }
  fs.writeFileSync('scripts/designContexts.json', JSON.stringify(designContexts, null, 2));
  console.log('Saved designContexts.json');
}

run().catch(console.error);
