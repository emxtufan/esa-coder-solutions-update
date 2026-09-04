# ESA Coder Solutions

Site React pentru ESA, livrat de un server Node: prezentare, servicii, proces, portofoliu, intrebari si contact. Include animatii GSAP, scene 3D cu `ESA_logo_1.glb` si identitatea negru-auriu.

## Pornire

```sh
npm install
npm run build
npm start
```

In Windows PowerShell se poate folosi `npm.cmd` in loc de `npm`.
Site: http://127.0.0.1:4173/ . Necesita Node.js 20.12 sau mai nou.

`npm start` porneste `server.js`, fara Vite si fara dependinte externe de server. Livreaza `dist/index.html`, JavaScript, CSS, imagini, fonturi si modelele 3D. Rutele React precum `/contact` functioneaza inclusiv la refresh. Resursele inexistente si cererile API primesc 404; fisierele sursa, `.env` si hartile sursa nu sunt publicate.

Vite ramane doar pentru compilare (`npm run build`) si, optional, dezvoltare cu actualizare automata (`npm run dev`). Dupa modificarea surselor, ruleaza din nou build-ul. `npm run preview` este un alias pentru acelasi server Node. Daca `dist/` exista deja, este suficient `npm start`.

Serverul citeste automat `.env` din radacina proiectului, inclusiv la pornirea directa cu `node server.js`. Fisierul este exclus din Git; `.env.example` este modelul care poate fi versionat. La o clonare noua, copiaza `.env.example` ca `.env` daca doresti sa personalizezi valorile. Fara `.env`, serverul foloseste valorile implicite.

```dotenv
HOST=127.0.0.1
PORT=4173
```

Repornieste serverul dupa modificarea `.env`; nu este necesar un build pentru aceste doua setari. Variabilele deja definite in terminal sau pe hosting au prioritate fata de `.env`. Nu pune secrete in variabile `VITE_*`, deoarece acestea pot ajunge in codul frontend.

Portul implicit este 4173, iar serverul asculta doar local. Pentru alt port sau acces din retea, editeaza `.env` sau seteaza explicit variabilele in PowerShell:

```powershell
$env:PORT = "8080"
$env:HOST = "0.0.0.0"
npm.cmd start
```

Pentru publicare sunt suficiente `server.js` si folderul `dist/`, pornite cu `node server.js`; nu este necesar `node_modules`. HTTPS se configureaza separat la furnizorul de hosting sau printr-un reverse proxy. Serverul nu trimite emailuri si nu implementeaza backend-ul QR.

## Structura

- `src/`: paginile, componentele, animatiile, tema si rutarea ESA.
- `server.js`: serverul HTTP Node pentru site-ul compilat.
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

## Deploy automat pe Linux

Configuratia GitHub webhook + PM2 pentru `/var/www/EMI` este explicata in [deploy/README.md](deploy/README.md). Include listener separat pe portul 9000, build-uri izolate, verificare HTTP si tentativa de rollback. Secretul se configureaza numai pe server in `webhook.env`; nu este inclus in proiect. Configuratia nu este activata automat.

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

`npm run audit` verifica fisierele aplicatiei si absenta exportului vechi. `npm run test:server` verifica serverul pe un port temporar liber, dupa build. Scripturile `scripts/verify-*.mjs` verifica identitatea ESA, efectele si asset-urile. `verify-esa-content.mjs` necesita serverul pornit pe portul 4173.

## Limite existente

- Formularul de contact pregateste un mesaj WhatsApp; utilizatorul confirma trimiterea. Nu exista backend de expediere.
- Controlul de la distanta prin telefon/QR nu are ruta controller si backend-ul necesar; nu este functional cap-coada.
- Doua texturi si patru harti de profunzime optionale nu au fost furnizate. Site-ul foloseste fallback-urile existente, fara acele efecte suplimentare.
- Unele subseturi non-latine ale fonturilor nu sunt prezente; resursele latine folosite de interfata sunt locale.
- Modificarile sunt locale. Nu a fost publicata o versiune noua pe domeniul ESA.
