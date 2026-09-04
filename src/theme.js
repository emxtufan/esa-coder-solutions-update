// Palette interpreted from ESA's public Instagram avatar and pinned logo mosaic.
// These are implementation values, not a claimed official brand specification.
export const brand = Object.freeze({
  background: '#0c0c0b',
  surface: '#161613',
  text: '#f5f2eb',
  muted: '#beb8ac',
  gold: '#d4ab58',
  light: '#f2d58b',
  bronze: '#a77a32',
  onGold: '#15110a',
});

export function brandRgba(color, alpha) {
  const hex = color.slice(1);
  const rgb = [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16));
  return `rgba(${rgb.join(', ')}, ${alpha})`;
}

export function applyBrandTheme(root) {
  for (const [key, value] of Object.entries(brand)) {
    root.style.setProperty(`--brand-${key}`, value);
  }
}
