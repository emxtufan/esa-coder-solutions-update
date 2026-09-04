import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parse } from '@babel/parser';

const read = file => readFileSync(new URL('../' + file, import.meta.url), 'utf8');
const loader = read('src/components/Preloader.jsx');
const transition = read('src/components/PageTransition.jsx');
const navigation = read('src/components/Navigation.jsx');
const css = read('src/brand.css');
for (const source of [loader, transition, navigation]) parse(source, { sourceType: 'module', plugins: ['jsx'] });
for (const source of [loader, transition]) {
  assert.ok(source.includes('esa-viewport-overlay'));
  assert.ok(!source.includes('h-svh'));
  assert.ok(!source.includes('h-screen'));
}
assert.match(css, /\.esa-viewport-overlay\{position:fixed;inset:0;width:100%;height:100%;height:100dvh\}/);
assert.ok(loader.includes('esa-preloader-content'));
for (const side of ['top', 'right', 'bottom', 'left']) assert.ok(css.includes(`env(safe-area-inset-${side},0px)`));
assert.ok(read('index.html').includes('viewport-fit=cover'));
assert.ok(navigation.includes('esa-bottom-nav'));
assert.ok(css.includes('bottom:calc(1rem + env(safe-area-inset-bottom,0px))'));
assert.ok(loader.includes('[...Array(7)]'));
assert.ok(loader.includes('scaleY: 0'));
assert.ok(loader.includes('duration: 0.6'));
console.log('PASS: dynamic full-height overlays, safe-area content/navigation, seven-column exit animation and JSX syntax.');
console.log('Boundary: static checks do not replace a physical iPhone Safari test.');
