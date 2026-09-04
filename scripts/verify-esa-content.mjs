import fs from 'node:fs';
import assert from 'node:assert/strict';
import {parse} from '@babel/parser';

const read = path => fs.readFileSync(path, 'utf8');
const home = read('src/pages/HomePage.jsx');
const contact = read('src/pages/ContactPage.jsx');
const navigation = read('src/components/Navigation.jsx');
const content = read('src/components/ESAContent.jsx');
for (const file of ['index.html', 'src/main.jsx', 'src/pages/HomePage.jsx', 'src/pages/ContactPage.jsx', 'src/pages/NotFoundPage.jsx', 'src/components/ESAContent.jsx', 'src/components/Navigation.jsx', 'src/components/Preloader.jsx']) {
  assert.ok(!/[\u0102\u0103\u00c2\u00e2\u00ce\u00ee\u0218-\u021b\u015e-\u0163]/u.test(read(file)), `Romanian diacritics remain: ${file}`);
}
for (const file of ['src/pages/HomePage.jsx', 'src/pages/ContactPage.jsx', 'src/components/Navigation.jsx', 'src/components/ESAContent.jsx']) {
  parse(read(file), {sourceType: 'module', plugins: ['jsx']});
}
assert.match(home, /<ESAProfile \/>/);
assert.match(home, /<ESAQuestions \/>/);
assert.match(home, /ESA_logo_1\.glb/);
assert.equal((content.match(/\['0[1-6]'/g) || []).length, 6);
assert.equal((home.match(/aria-label="Vezi proiectul/g) || []).length, 4);
for (const label of ['Proiecte', 'Proces', 'Servicii']) {
  assert.ok(navigation.includes(`label: "${label}"`));
  assert.ok(navigation.includes(`${label}: "`));
}
for (const forbidden of ['anyflowagency', 'script.google.com', 'pawww.shop', 'daspritam.in', 'wtfruchit.com', 'deepflow.com']) {
  assert.ok(![home, contact, navigation, read('index.html')].some(s => s.includes(forbidden)), `Old identity: ${forbidden}`);
}
assert.match(contact, /wa\.me\/40755938367\?text=/);
assert.match(contact, /encodeURIComponent\(message\)/);
assert.ok(!contact.includes('await fetch('));
assert.match(contact, /Confirma trimiterea in WhatsApp/);
assert.match(read('index.html'), /lang="ro"/);
assert.match(read('index.html'), /ESA Coder Solutions/);
for (const file of ['team-stoica.webp', 'beauty-villa.webp', 'event-smart-assistant.webp', 'xelle.webp']) {
  const b = fs.readFileSync(`public/assets/esa/${file}`);
  assert.equal(b.toString('ascii', 0, 4), 'RIFF');
  assert.equal(b.toString('ascii', 8, 12), 'WEBP');
}
for (const file of ['bebas-neue-latin-ext.woff2', 'inter-tight-latin-ext.woff2', 'plus-jakarta-latin-ext.woff2']) {
  assert.equal(fs.readFileSync(`public/assets/esa/${file}`).toString('ascii', 0, 4), 'wOF2');
}
for (const route of ['/', '/contact', '/assets/ESA_logo_1.glb', '/styles/romanian-fonts.css', '/assets/esa/team-stoica.webp', '/assets/esa/beauty-villa.webp', '/assets/esa/event-smart-assistant.webp', '/assets/esa/xelle.webp']) {
  const response = await fetch(`http://127.0.0.1:4173${route}`);
  assert.equal(response.status, 200, route);
  if (route.startsWith('/assets/') || route.startsWith('/styles/')) {
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), fs.readFileSync(`public${route}`), route);
  }
}
console.log('PASS: JSX syntax, six services, four portfolio links, navigation labels, ESA identity, contact draft, Romanian metadata, image/font formats and preview asset delivery.');
console.log('Boundary: no visual browser QA, WhatsApp availability check or actual message submission.');
