# Deploy GitHub -> webhook -> PM2

Configuratie pregatita pentru Linux, repository `emxtufan/esa-coder-solutions-update`, branch `main`, director `/var/www/EMI`, aplicatie PM2 `EMI`, port 4173. Webhook-ul este separat, numai pe `127.0.0.1:9000`. Aceste fisiere nu activeaza singure nimic pe server sau in GitHub.

## Ce face diferit fata de exemplul initial

- Verifica HMAC-SHA256 pe corpul original, repository-ul, branch-ul si stergerea branch-ului; limiteaza corpul la 1 MiB.
- Raspunde 202 imediat; acesta confirma acceptarea, NU succesul build-ului. Succesul se verifica in log.
- Grupeaza push-urile sosite in timpul unui deploy intr-o rerulare pentru ultima versiune. Deduplicarea si coada sunt in memorie; dupa o oprire a webhook-ului, verifica ultima versiune si retrimite evenimentul din GitHub daca este necesar.
- `flock` serializeaza inclusiv pornirile manuale. Nu executa comenzi primite din payload.
- Face fetch si extrage commit-ul in `.deploy/releases/`; nu foloseste `git reset`, `git clean` sau rescrierea checkout-ului local. Modificarile locale nu sunt incluse in release: GitHub este sursa versiunii publicate.
- Ruleaza `npm ci --include=dev`, build si testele serverului in release. Site-ul activ ramane neschimbat daca aceste etape esueaza.
- PM2 reporneste aplicatia din noul release. Verifica raspunsul HTTP fata de index-ul compilat si incearca revenirea la release-ul anterior daca activarea esueaza. Prima revenire foloseste aplicatia initiala din `/var/www/EMI`, care trebuie sa aiba un `dist` functional. Repornirea poate produce o scurta intrerupere; nu promite zero downtime.
- Pastreaza release-urile, inclusiv cele esuate, pentru investigare. Monitorizeaza spatiul pe disc; nu exista stergere automata. `data/` nu este modificat, dar acest site nu il foloseste si nu este montat automat in release-uri.

## 1. Pregatirea serverului

Necesare: Node.js >=20.12 (preferabil versiune LTS suportata), npm, Git, Bash, curl, tar, util-linux/flock si PM2. Foloseste un utilizator dedicat fara root pentru Node/PM2/deploy, cu acces la repository si drepturi de scriere in `/var/www/EMI`. Comenzile administrative pentru backup, permisiuni, Nginx si startup se executa separat. Nu porni un al doilea daemon PM2 sub alt utilizator.

Inainte de orice activare, fa backup separat (comanda poate necesita drepturi administrative):

```bash
cd /var/www
cp -a EMI "EMI-backup-$(date +%Y%m%d-%H%M%S)"
cd /var/www/EMI
git remote -v
git status
git branch --show-current
pm2 status
```

Urca in GitHub fisierele proiectului, inclusiv cele de deploy si `.env.example`, dar NU `.env` sau `webhook.env`. Nu este necesar sa versionezi `dist/`: este compilat pe server. Apoi adu commit-ul pe server prin procedura ta obisnuita, dupa verificarea modificarilor locale; nu folosi reset pentru a le sterge.

In `/var/www/EMI/.env` pastreaza `HOST=127.0.0.1` si `PORT=4173`. Aceste valori trebuie sa corespunda si proxy-ului Nginx existent. Ruleaza toate comenzile PM2 de mai jos ca acelasi utilizator care detine procesul `EMI`.

## 2. Secretul webhook

`webhook.env` este citit direct de procesul Node, inclusiv dupa reboot. Nu trebuie exportat secretul in shell sau afisat prin `pm2 env`. Creeaza fisierul numai daca nu exista deja:

```bash
cd /var/www/EMI
test ! -e webhook.env && (umask 077; cp webhook.env.example webhook.env)
chmod 600 webhook.env
```

Genereaza si salveaza secretul fara sa-l afisezi (comanda refuza sa inlocuiasca un secret existent):

```bash
node --input-type=module -e 'import fs from "node:fs"; import crypto from "node:crypto"; const p="webhook.env"; const s=fs.readFileSync(p,"utf8"); if(!/^WEBHOOK_SECRET=\r?$/m.test(s)) throw Error("Secret existent sau camp lipsa"); fs.writeFileSync(p,s.replace(/^WEBHOOK_SECRET=\r?$/m,"WEBHOOK_SECRET="+crypto.randomBytes(32).toString("hex")),{mode:0o600});'
```

Deschide fisierul intr-un editor privat pentru a copia doar valoarea secretului in GitHub. Nu o pune in loguri, mesaje sau commit-uri. Verifica `WEBHOOK_REPOSITORY=emxtufan/esa-coder-solutions-update`, `DEPLOY_BRANCH=main`, `WEBHOOK_PORT=9000`. `PORT` din `.env` este pentru site; `WEBHOOK_PORT` este separat.

## 3. Test manual si pornire

Acest pas schimba aplicatia live: fa-l dupa backup si dupa ce commit-ul este pe `origin/main`.

```bash
cd /var/www/EMI
bash deploy.sh
tail -n 80 .deploy/deploy.log
curl -I http://127.0.0.1:4173/
pm2 start webhook-server.js --name webhook-EMI --time
pm2 save
```

Daca `webhook-EMI` exista deja, foloseste `pm2 restart webhook-EMI`, nu crea un duplicat. Configureaza o singura data `pm2 startup` si executa comanda administrativa indicata de PM2, apoi `pm2 save`. Confirma dupa reboot ca ambele procese functioneaza. Nu deschide portul 9000 in firewall.

## 4. Nginx si GitHub

Adauga continutul `deploy/nginx-webhook.conf` in blocul HTTPS existent pentru `esa-coder-solutions.com`. Nu inlocui configuratia existenta a site-ului sau certificatul TLS. Apoi, cu drepturi administrative:

```bash
sudo nginx -t && sudo systemctl reload nginx
curl -i -X POST https://esa-coder-solutions.com/github-webhook
```

Cererea nesemnata trebuie sa primeasca 401. In GitHub: Settings -> Webhooks -> Add webhook:

- Payload URL: `https://esa-coder-solutions.com/github-webhook`
- Content type: `application/json`
- Secret: valoarea privata din `webhook.env`
- Events: doar `push`; Active; SSL verification activata.

Un ping valid este acceptat fara deploy. La urmatorul push real pe main, verifica livrarea GitHub si logurile:

```bash
pm2 logs webhook-EMI --lines 50 --nostream
tail -n 100 /var/www/EMI/.deploy/deploy.log
pm2 status
curl -I https://esa-coder-solutions.com/
```

`DEPLOY SUCCESS` indica finalizarea. Build esuat: aplicatia anterioara ramane activa; vezi logul. `ROLLBACK FAILED`: necesita interventie manuala. Retrimiterea unui webhook deja reusit poate fi ignorata ca duplicat; pentru repetare fortata ruleaza `bash deploy.sh`.

## Intretinere si limite de verificare

Checkout-ul stabil contine infrastructura webhook/deploy; aplicatia publicata ruleaza din release. Actualizarile `webhook-server.js`, `deploy.sh` si `deploy/ecosystem.config.cjs` necesita aducerea lor explicita in checkout-ul stabil si restart manual al webhook-ului, dupa review. Nu se auto-inlocuieste listenerul in timpul unui deploy.

Test local: `npm run test:webhook` si `npm run test:server`. Testele webhook folosesc un deploy simulat, nu ruleaza PM2 si nu modifica serverul Linux. Verificarea reala a Nginx, PM2, accesului GitHub, restartului/rollback-ului si a reboot-ului se face pe server; configuratia nu a fost activata de aceasta modificare locala.

Referinte: [validarea semnaturii GitHub](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries), [bune practici webhook](https://docs.github.com/en/webhooks/using-webhooks/best-practices-for-using-webhooks), [configuratia PM2](https://pm2.keymetrics.io/docs/usage/application-declaration/), [pornirea PM2 dupa reboot](https://pm2.keymetrics.io/docs/usage/startup/).
