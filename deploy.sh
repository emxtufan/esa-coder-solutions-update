#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

APP_DIR="${APP_DIR:-/var/www/EMI}"
BRANCH="${DEPLOY_BRANCH:-main}"
REPOSITORY="${DEPLOY_REPOSITORY:-emxtufan/esa-coder-solutions-update}"
APP_DIR="$(realpath -e -- "$APP_DIR")"
[[ "$APP_DIR" != / && -f "$APP_DIR/package-lock.json" && -f "$APP_DIR/server.js" ]] || { echo 'APP_DIR invalid.'; exit 1; }
cd "$APP_DIR"
for tool in git npm node pm2 flock curl tar cmp; do command -v "$tool" >/dev/null || { echo "Lipseste $tool"; exit 1; }; done
git check-ref-format "refs/heads/$BRANCH" >/dev/null
REMOTE="$(git remote get-url origin)"
case "$REMOTE" in
  "https://github.com/$REPOSITORY"|"https://github.com/$REPOSITORY.git"|"git@github.com:$REPOSITORY.git"|"ssh://git@github.com/$REPOSITORY.git") ;;
  *) echo 'Origin nu corespunde repository-ului permis.'; exit 1 ;;
esac

STATE="$APP_DIR/.deploy"
mkdir -p "$STATE/releases"
exec 9>"$STATE/deploy.lock"
flock -w 600 9 || { echo 'Alt deploy detine lock-ul.'; exit 1; }
exec >>"$STATE/deploy.log" 2>&1
echo "DEPLOY START $(date -Is)"
export GIT_TERMINAL_PROMPT=0
git fetch --no-tags origin "refs/heads/$BRANCH"
COMMIT="$(git rev-parse --verify 'FETCH_HEAD^{commit}')"
RELEASE="$(mktemp -d "$STATE/releases/${COMMIT:0:12}-XXXXXX")"
echo "Build pentru $COMMIT in $RELEASE"
# Checkout-ul local, .env si data/ nu sunt modificate. Nu folosim reset/clean.
git archive "$COMMIT" | tar -x -C "$RELEASE"
[[ -f "$RELEASE/server.js" && -f "$RELEASE/package-lock.json" ]] || exit 1
(
  cd "$RELEASE"
  npm ci --include=dev
  npm run build
  npm run test:server
)
# .env ramane in directorul stabil; release-ul foloseste acelasi fisier.
if [[ -f "$APP_DIR/.env" ]]; then ln -s "$APP_DIR/.env" "$RELEASE/.env"; fi

PREVIOUS="$APP_DIR"
if [[ -f "$STATE/current-release" ]]; then
  IFS= read -r PREVIOUS < "$STATE/current-release"
  [[ "$PREVIOUS" == "$STATE/releases/"* && -f "$PREVIOUS/server.js" ]] || { echo 'Release anterior invalid.'; exit 1; }
fi
PORT="$(node --input-type=module -e 'import {loadEnvFile} from "node:process"; try {loadEnvFile(".env")} catch(e) {if(e.code!=="ENOENT") throw e} const port=Number(process.env.PORT||4173); if(!Number.isInteger(port)||port<1||port>65535) process.exit(1); console.log(port)')"
activate() {
  ESA_RELEASE_DIR="$1" pm2 startOrRestart "$APP_DIR/deploy/ecosystem.config.cjs" --only EMI --update-env
}
healthy() {
  for attempt in {1..15}; do
    if curl --fail --silent --show-error --max-time 2 "http://127.0.0.1:$PORT/" -o "$STATE/health-response.html" && cmp -s "$STATE/health-response.html" "$1/dist/index.html"; then return 0; fi
    sleep 1
  done
  return 1
}
rollback() {
  trap - ERR INT TERM
  echo "DEPLOY FAILED; incerc revenirea la $PREVIOUS"
  if activate "$PREVIOUS" && healthy "$PREVIOUS"; then
    pm2 save || true
    echo 'Versiunea anterioara raspunde din nou.'
  else
    echo 'ROLLBACK FAILED: verificare manuala necesara.'
  fi
  exit 1
}
trap rollback ERR INT TERM
activate "$RELEASE"
healthy "$RELEASE"
pm2 save
printf '%s\n' "$RELEASE" > "$STATE/current-release.next"
mv "$STATE/current-release.next" "$STATE/current-release"
trap - ERR INT TERM
echo "DEPLOY SUCCESS $(date -Is) $COMMIT"
# Release-urile sunt pastrate pentru investigare/rollback, fara stergeri automate.
