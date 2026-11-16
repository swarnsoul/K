const { callTool } = require('./figma-mcp');
const fs = require('fs');
const path = require('path');

const SECTIONS_11 = [
  { id: '314:54', name: '01_navbar' },
  { id: '314:149', name: '02_hero_intro' },
  { id: '320:181', name: '03_hero_banner' },
  { id: '327:208', name: '04_design_process' },
  { id: '334:387', name: '05_overview_screens' },
  { id: '342:422', name: '06_problem_space' },
  { id: '342:430', name: '07_key_challenges' },
  { id: '352:54', name: '08_bento_showcase' },
  { id: '354:62', name: '09_opportunity' },
  { id: '354:66', name: '10_pillars' },
  { id: '358:92', name: '11_validation' },
  { id: '358:99', name: '12_insights' },
  { id: '358:103', name: '13_info_architecture' },
  { id: '358:131', name: '14_user_flow' },
  { id: '358:161', name: '15_ideation' },
  { id: '379:55', name: '16_wireframes' },
  { id: '408:80', name: '17_solution' },
  { id: '382:96', name: '18_hifi_screens' },
  { id: '397:57', name: '19_design_system' },
  { id: '405:54', name: '20_accessibility' },
  { id: '405:68', name: '21_business_impact' },
  { id: '405:76', name: '22_reflection' },
];

const SECTIONS_15 = [
  { id: '443:312', name: '01_navbar' },
  { id: '443:358', name: '02_hero_intro' },
  { id: '443:106', name: '03_hero_banner' },
  { id: '443:110', name: '04_design_process' },
  { id: '443:166', name: '05_overview_screens' },
  { id: '443:171', name: '06_problem_space' },
  { id: '443:175', name: '07_key_challenges' },
  { id: '443:180', name: '08_bento_showcase' },
  { id: '443:182', name: '09_opportunity' },
  { id: '443:186', name: '10_pillars' },
  { id: '443:199', name: '11_validation' },
  { id: '443:203', name: '12_insights' },
  { id: '443:207', name: '13_info_architecture' },
  { id: '443:228', name: '14_user_flow' },
  { id: '443:256', name: '15_ideation' },
  { id: '443:262', name: '16_wireframes' },
  { id: '443:268', name: '17_solution' },
  { id: '443:275', name: '18_hifi_screens' },
  { id: '443:294', name: '19_design_system' },
  { id: '443:300', name: '20_accessibility' },
  { id: '443:304', name: '21_business_impact' },
  { id: '443:308', name: '22_reflection' },
];

async function run() {
  const dir11 = path.join(__dirname, 'figma_sections_influcrush');
  const dir15 = path.join(__dirname, 'figma_sections_cirqell');
  fs.mkdirSync(dir11, { recursive: true });
  fs.mkdirSync(dir15, { recursive: true });

  console.log('Fetching InfluCrush sections...');
  for (const s of SECTIONS_11) {
    try {
      const res = await callTool('get_screenshot', { nodeId: s.id });
      const img = res.content.find(c => c.type === 'image');
      if (img) {
        fs.writeFileSync(path.join(dir11, `${s.name}.png`), Buffer.from(img.data, 'base64'));
        console.log(`Saved InfluCrush ${s.name}`);
      } else {
        console.warn(`No image for ${s.name}`);
      }
    } catch (e) {
      console.error(`Error on ${s.name}:`, e.message);
    }
  }

  console.log('\nFetching Cirqell sections...');
  for (const s of SECTIONS_15) {
    try {
      const res = await callTool('get_screenshot', { nodeId: s.id });
      const img = res.content.find(c => c.type === 'image');
      if (img) {
        fs.writeFileSync(path.join(dir15, `${s.name}.png`), Buffer.from(img.data, 'base64'));
        console.log(`Saved Cirqell ${s.name}`);
      } else {
        console.warn(`No image for ${s.name}`);
      }
    } catch (e) {
      console.error(`Error on ${s.name}:`, e.message);
    }
  }

  console.log('All section screenshots fetched!');
}

run().catch(console.error);
