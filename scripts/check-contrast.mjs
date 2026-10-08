// WCAG contrast check for the colour tokens in app/globals.css.
// Run: node scripts/check-contrast.mjs   (exits 1 if any pairing fails)
//
// Tokens are resolved from the CSS itself: hex values, var(--alias) references and
// color-mix(in srgb, var(--a) P%, var(--b)), so a change to a token is checked automatically.
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const raw = {};
for (const [, name, value] of css.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)) raw[name] ??= value.trim();

const hexToRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const rgbToHex = (rgb) => "#" + rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase();
const cache = {};
function resolve(name) {
  if (cache[name]) return cache[name];
  const v = raw[name];
  if (!v) throw new Error(`token --${name} not found`);
  let out;
  if (/^#[0-9a-f]{6}$/i.test(v)) out = v.toUpperCase();
  else if (/^var\(--([a-z0-9-]+)\)$/.test(v)) out = resolve(v.match(/^var\(--([a-z0-9-]+)\)$/)[1]);
  else {
    const m = v.match(/^color-mix\(in srgb,\s*var\(--([a-z0-9-]+)\)\s+(\d+)%,\s*var\(--([a-z0-9-]+)\)\)$/);
    if (!m) throw new Error(`cannot resolve --${name}: ${v}`);
    const [a, b, p] = [hexToRgb(resolve(m[1])), hexToRgb(resolve(m[3])), Number(m[2]) / 100];
    out = rgbToHex(a.map((x, i) => x * p + b[i] * (1 - p)));
  }
  return (cache[name] = out);
}

const lin = (c) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = (hex) => {
  const [r, g, b] = hexToRgb(hex).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const blend = (fg, bg, a) => rgbToHex(hexToRgb(fg).map((x, i) => x * a + hexToRgb(bg)[i] * (1 - a)));
const ratio = (fgName, bgName, alpha = 1) => {
  const bg = resolve(bgName);
  const fg = alpha < 1 ? blend(resolve(fgName), bg, alpha) : resolve(fgName);
  const [hi, lo] = [lum(fg), lum(bg)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// [foreground, background, minimum, where it is used, opacity]
const pairs = [
  // Light sections (ivory / sand)
  ["text", "ivory", 4.5, "body text on ivory"],
  ["text", "sand", 4.5, "body text on sand"],
  ["text-muted", "ivory", 4.5, "secondary text on ivory"],
  ["text-muted", "sand", 4.5, "secondary text on sand"],
  ["amber-text", "ivory", 4.5, "eyebrows, links and small accents on ivory"],
  ["amber-text", "sand", 4.5, "eyebrows, links and small accents on sand"],
  ["amber-deep", "ivory", 3, "icons, markers, large accents on ivory"],
  ["amber-deep", "sand", 3, "icons, markers, large accents on sand"],
  ["navy", "ivory", 4.5, "navy buttons: label colour check (ivory ground)"],

  // Dark surfaces (navy / raised navy)
  ["on-dark", "navy", 4.5, "text on navy"],
  ["on-dark-muted", "navy", 4.5, "secondary text on navy"],
  ["on-dark", "navy-raised", 4.5, "text on raised navy (cards, CTA band)"],
  ["on-dark-muted", "navy-raised", 4.5, "secondary text on raised navy"],
  ["amber", "navy", 4.5, "amber text, links, icons on navy"],
  ["amber", "navy-raised", 4.5, "amber text, links, icons on raised navy"],
  ["amber-hi", "navy-raised", 4.5, "hover/focus amber on raised navy"],
  ["navy", "amber", 4.5, "amber buttons: navy label on amber"],
  ["navy", "amber-hi", 4.5, "amber buttons on hover: navy label on light amber"],
  ["on-dark", "navy", 4.5, "navy buttons and secondary buttons on dark: label"],
  ["navy", "on-dark", 4.5, "footer/header logo plate and inverse hover: navy on paper"],

  // Header + hero (azure wall / navy soffit / amber LED). The hero copy sits on --wall or darker:
  // the radial glow (--wall-hi) is placed behind the mirrors, not the text. Rendered pixels behind
  // every line of hero copy are also sampled in the browser audit.
  ["paper", "soffit", 4.5, "header text on the navy soffit"],
  ["led-hi", "soffit", 4.5, "header hover and current link on navy"],
  ["paper", "wall", 4.5, "headline and ghost button on the wall"],
  ["paper", "wall", 4.5, "lede, 94% paper, on the wall", 0.94],
  ["paper", "wall", 4.5, "fact captions, 92% paper, on the wall", 0.92],
  ["led-hi", "wall", 4.5, "eyebrow, tagline and the italic headline word on the wall"],
  ["led", "wall", 3, "star icon on the wall"],
];

let failed = 0;
for (const [fg, bg, min, use, alpha = 1] of pairs) {
  const r = ratio(fg, bg, alpha);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${r.toFixed(2).padStart(5)}:1  (min ${min})  ${fg} on ${bg} — ${use}`);
}
console.log(failed ? `\n${failed} pairing(s) below threshold` : "\nAll pairings meet WCAG AA");
process.exit(failed ? 1 : 0);
