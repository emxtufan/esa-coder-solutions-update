# Verificarea proiectului ESA dupa curatare

Curatarea elimina numai exportul capturat si fisierele nefolosite. Componentele ESA, bibliotecile active, fonturile, iluminarea HDR, modelele si emailurile raman in proiect.

Pentru verificare:

```sh
npm run build
npm run test:server
npm run audit
node scripts/verify-brand.mjs
node scripts/verify-esa-content.mjs
node scripts/verify-footer-animation.mjs
node scripts/verify-hero-logo.mjs
node scripts/verify-logo-placement.mjs
node scripts/verify-section-wipes.mjs
node scripts/verify-service-motion.mjs
node scripts/build-client-email.mjs
```

Verificarea de continut/HTTP necesita serverul Node (`npm start`) pe portul 4173. Build-ul poate afisa avertizarea existenta despre dimensiunea bibliotecilor 3D.

Serverul Node a trecut testele pentru `/`, `/contact`, fallback React, livrarea identica a resurselor compilate, MIME, HEAD, ETag/304, resurse inexistente, metode nepermise si blocarea traversarii directoarelor/fisierelor ascunse. Serverul livreaza numai `dist/`, fara Vite la rulare.

Aceste verificari nu certifica livrarea mesajelor WhatsApp/email, controlul de la distanta sau efectele care necesita resurse optionale absente. Limitele curente sunt descrise in README.md.

Fisierele sterse sunt recuperabile din Cosul de reciclare: 31 de copii din radacina, arhiva original/, 7 resurse publice nefolosite, 4 scripturi de reconstructie/verificare a exportului, manifestul vechi si raportul vechi de validare.
