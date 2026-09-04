import fs from 'node:fs';
import assert from 'node:assert/strict';
const source = fs.readFileSync('src/pages/HomePage.jsx', 'utf8');
const footer = source.slice(source.indexOf('Footer = () =>'), source.indexOf('let ProcessCards'));
// Preserve the original 600vh scroll scene and per-character timing.
for (const fragment of ['h-[600vh] weare', 'start: `${0.1 * r * 100}% top`', 'end: `${(r + 1) * 10}% top`', 'each: 0.03', 'y: 50', 'y: -50', 'start: "50% top"', 'end: "bottom bottom"']) {
  assert.ok(footer.includes(fragment), `Original footer behavior missing: ${fragment}`);
}
assert.ok(footer.includes('React.useLayoutEffect'));
assert.ok(footer.includes('new ResizeObserver(scheduleRefresh)'));
assert.ok(footer.includes('scrollTrigger.ScrollTrigger.refresh()'));
assert.ok(footer.includes('observer.disconnect()'));
assert.ok(!footer.includes('ScrollTrigger.getAll()'));
assert.ok(footer.includes('}, [s])'));
console.log('PASS: original footer timeline, responsive initialization, layout refresh and section-scoped cleanup.');
