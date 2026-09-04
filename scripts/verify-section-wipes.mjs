import fs from 'node:fs';
import assert from 'node:assert/strict';

const read = path => fs.readFileSync(path, 'utf8');
const wipe = read('src/components/SectionWipe.jsx');
const questions = read('src/components/ESAContent.jsx');
const home = read('src/pages/HomePage.jsx');
const css = read('src/brand.css');
for (const fragment of ['length: 7', "from: 'center', amount: 0.1", "start: 'top 100%'", "end: 'bottom top'", 'scrub: true', 'context.revert()', 'aria-hidden="true"']) {
  assert.ok(wipe.includes(fragment), `Shared original transition missing: ${fragment}`);
}
assert.ok(questions.includes('<SectionWipe variant="ivory" />'));
assert.ok(home.includes('<SectionWipe variant="black" />'));
assert.ok(css.includes('.bg-brand-ivory{background-color:var(--brand-text)}'));
assert.ok(css.includes('background:var(--brand-text);color:var(--brand-onGold);color-scheme:light'));
assert.ok(css.includes('.esa-questions .esa-faq details p{color:#514a3c}'));
console.log('PASS: shared seven-column scroll wipes, ivory FAQ, contrasting black finale, readable FAQ text.');
