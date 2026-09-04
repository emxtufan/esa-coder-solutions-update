import fs from 'node:fs';
import assert from 'node:assert/strict';
const required = [
  'index.html', 'src/main.jsx', 'src/vendor/production-modules.js',
  'public/styles/site-base.css', 'public/styles/romanian-fonts.css',
  'public/assets/ESA_logo_1.glb', 'public/assets/brown_photostudio_02_1k.hdr',
  'public/assets/ab57efd000576a30-s.p.37015d44.woff2',
  'public/assets/fabcf92ba1ccea36-s.p.19f28380.woff2',
  'public/assets/fba5a26ea33df6a3-s.p.1bbdebe6.woff2',
  ...['logo.png', 'esa-coder-solutions-lockup-transparent.png', 'team-stoica.webp', 'beauty-villa.webp', 'event-smart-assistant.webp', 'xelle.webp'].map(file => `public/assets/esa/${file}`),
];
for (const file of required) assert.ok(fs.existsSync(file), `Missing application file: ${file}`);
assert.ok(!fs.existsSync('original'), 'Archived template should not be in the project');
assert.ok(!fs.readdirSync('.').some(file => /^[a-f\d]{16}\.js$|^turbopack-/.test(file)), 'Captured bundles remain in root');
for (const file of ['2.png', 'th1.webp', 'th2.png', 'th3.png', 'logo_11.glb', 'favicon.ico', 'favicon-1.ico']) assert.ok(!fs.existsSync(`public/assets/${file}`), `Unused template asset: ${file}`);
assert.ok(!fs.readFileSync('vite.config.js', 'utf8').includes('referencePreview'));
assert.ok(fs.readFileSync('index.html', 'utf8').includes('/styles/site-base.css'));
assert.equal(JSON.parse(fs.readFileSync('package.json')).name, JSON.parse(fs.readFileSync('package-lock.json')).name);
console.log('PASS: standalone ESA project, runtime assets retained, captured template files removed.');
console.log('Known limitations unchanged: optional depth/texture maps and remote phone-control backend are not supplied.');
