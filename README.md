# ESA Coder Solutions

Site React/Vite pentru ESA: prezentare, servicii, proces, portofoliu, intrebari si contact. Include animatii GSAP, scene 3D cu `ESA_logo_1.glb` si identitatea negru-auriu.

## Pornire

```sh
npm install
npm run dev
npm run build
npm run preview
npm run audit
```

In Windows PowerShell se poate folosi `npm.cmd` in loc de `npm`.
Dezvoltare: http://127.0.0.1:5173/ . Preview productie: http://127.0.0.1:4173/ .

## Structura

- `src/`: paginile, componentele, animatiile, tema si rutarea ESA.
- `src/vendor/`: bibliotecile necesare animatiilor si scenelor 3D. Sunt dependinte active, nu o copie a paginii originale.
- `public/assets/esa/`: logo-uri, imagini de portofoliu si fonturi ESA.
- `public/assets/`: modelul 3D, iluminarea HDR si fonturile folosite de site.
- `public/styles/site-base.css`: stilurile structurale folosite de componente.
- `scripts/`: verificari pentru proiect si generarea/previzualizarea emailului.
- `deliverables/`: emailul pentru clienti si arhivele variantelor ESA.
- `dist/`: versiunea construita, regenerata prin `npm run build`.
- `node_modules/`: dependintele instalate.

Arhiva `original/`, fisierele exportului vechi din radacina, resursele nefolosite si scripturile de reconstructie au fost eliminate. Nu sunt necesare pentru rularea sau construirea proiectului ESA. Fisierele eliminate au fost trimise in Cosul de reciclare.

Versiunea React si configuratia de productie din Vite sunt pastrate pentru compatibilitatea cu rendererul 3D existent.

## Email pentru clienti

Varianta curenta este scurta si formala, fara imagini, cu un singur link:

- `deliverables/email-esa/email-clienti.html`
- `deliverables/email-esa/email-clienti.txt`
- `deliverables/email-esa/email-clienti.eml`
- `deliverables/ESA-email-clienti.zip`

Regenerare draft: `node scripts/build-client-email.mjs`.
Preview separat: `node scripts/preview-client-email.mjs`, la http://127.0.0.1:4174/ .
Nu se trimite niciun email automat. Draftul nu contine destinatar sau cont expeditor.

## Verificari

`npm run audit` verifica fisierele aplicatiei si absenta exportului vechi. Scripturile `scripts/verify-*.mjs` verifica identitatea ESA, efectele si asset-urile. `verify-esa-content.mjs` necesita preview-ul pornit pe portul 4173.

## Limite existente

- Formularul de contact pregateste un mesaj WhatsApp; utilizatorul confirma trimiterea. Nu exista backend de expediere.
- Controlul de la distanta prin telefon/QR nu are ruta controller si backend-ul necesar; nu este functional cap-coada.
- Doua texturi si patru harti de profunzime optionale nu au fost furnizate. Site-ul foloseste fallback-urile existente, fara acele efecte suplimentare.
- Unele subseturi non-latine ale fonturilor nu sunt prezente; resursele latine folosite de interfata sunt locale.
- Modificarile sunt locale. Nu a fost publicata o versiune noua pe domeniul ESA.
