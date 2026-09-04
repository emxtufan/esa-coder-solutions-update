import fs from 'node:fs';
import assert from 'node:assert/strict';
import {brand, brandRgba, applyBrandTheme} from '../src/theme.js';

const luminance = hex => {
  const rgb = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
};
const checks = [
  ['body', brand.text, brand.background],
  ['muted', brand.muted, brand.background],
  ['surface', brand.text, brand.surface],
  ['gold accent', brand.gold, brand.background],
  ['gold button', brand.onGold, brand.gold],
  ['gold card', '#1b1b1b', brand.gold],
  ['dark card', brand.gold, '#1b1b1b'],
  ['placeholder', '#a7a195', brand.background],
];
for (const [name, fg, bg] of checks) {
  const a = luminance(fg), b = luminance(bg);
  const ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
  assert.ok(ratio >= 4.5, `${name}: contrast ${ratio}`);
  console.log(`${name}: ${ratio.toFixed(2)}:1`);
}
const variables = {};
applyBrandTheme({style: {setProperty: (key, value) => variables[key] = value}});
assert.equal(variables['--brand-gold'], brand.gold);
assert.equal(brandRgba(brand.gold, .5), 'rgba(212, 171, 88, 0.5)');

for (const directory of ['src/components', 'src/pages']) {
  for (const file of fs.readdirSync(directory).filter(f => /\.(jsx|css)$/.test(f))) {
    const source = fs.readFileSync(`${directory}/${file}`, 'utf8');
    assert.ok(!/#(?:bbfd6a|84cc16|a3e635|afd600|65a30d)|rgba\(163, 230, 53|rgba\(190, 242, 100|rgba\(220, 252, 150|(?:bg|text|border)-lime-|Color\("green"\)|vec3\(0\.5, 1\.0, 0\.0\)/i.test(source), `Old green palette: ${file}`);
  }
}
const home = fs.readFileSync('src/pages/HomePage.jsx', 'utf8');
const brandCss = fs.readFileSync('src/brand.css', 'utf8');
assert.ok(brandCss.includes('.esa-work-surface{background:var(--brand-gold);color:#000}'));
assert.ok(!home.includes('esa-work-note'));
const processSection = home.slice(home.indexOf('ProcessSection = () =>'));
assert.match(processSection, /<h2 className="[^"]*text-white">/);
assert.match(processSection, /<span className="text-brand-gold">\{"PROCES CLAR"\}/);
assert.ok(!processSection.slice(0, processSection.indexOf('Discutam proiectul')).includes('text-black'));
assert.match(home, /new rj.Color\(brand.gold\)/);
assert.match(home, /uEmissionColor:[\s\S]*?new THREE.Color\(brand.gold\)/);
assert.ok(home.includes('mix(emission, black, fac)'));
assert.match(fs.readFileSync('src/main.jsx', 'utf8'), /applyBrandTheme\(document.documentElement\)/);
console.log('PASS: brand variables, text contrast pairs, removal of green UI/canvas colors and gold 3D shader wiring.');
console.log('Contrast checks cover solid palette pairs, not a full rendered-page accessibility audit.');
