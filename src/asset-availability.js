// Never fabricate missing artwork. Supplying a missing file at its original
// public path automatically enables the original texture-dependent behavior.
const files = import.meta.glob(['/public/textures/*', '/public/assets/works/*'], { query: '?url', import: 'default' });
export function hasAsset(url) {
  return Object.hasOwn(files, `/public${url}`);
}
