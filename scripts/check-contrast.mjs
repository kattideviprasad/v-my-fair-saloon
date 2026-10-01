// WCAG contrast check for the colour tokens in app/globals.css.
// Run: node scripts/check-contrast.mjs   (exits 1 if any pairing fails)
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const t = {};
for (const [, name, hex] of css.matchAll(/--([a-z-]+):\s*(#[0-9A-Fa-f]{6})/g)) t[name] = hex;

const lin = (c) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => lin(parseInt(hex.slice(i, i + 2), 16)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
// Blend fg over bg at the given opacity (for translucent text), in sRGB
const blend = (fg, bg, a) =>
  "#" + [1, 3, 5].map((i) => Math.round(parseInt(fg.slice(i, i + 2), 16) * a + parseInt(bg.slice(i, i + 2), 16) * (1 - a)).toString(16).padStart(2, "0")).join("");
const ratio = (a, b, alpha = 1) => {
  const fg = alpha < 1 ? blend(t[a], t[b], alpha) : t[a];
  const [hi, lo] = [lum(fg), lum(t[b])].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
// Mix of on-dark over espresso at 9% (the --espresso-raised surface), computed in sRGB
const mix = (a, b, pct) =>
  "#" + [1, 3, 5].map((i) => Math.round(parseInt(a.slice(i, i + 2), 16) * pct + parseInt(b.slice(i, i + 2), 16) * (1 - pct)).toString(16).padStart(2, "0")).join("");
t["espresso-raised"] = mix(t["on-dark"], t["espresso"], 0.09);

// [foreground, background, minimum, where it is used, opacity]
const pairs = [
  ["text", "ivory", 4.5, "body text on ivory"],
  ["text", "sand", 4.5, "body text on sand"],
  ["text-muted", "ivory", 4.5, "muted text on ivory"],
  ["text-muted", "sand", 4.5, "muted text / sand-section eyebrows"],
  ["gold-text", "ivory", 4.5, "small gold text (eyebrows, links) on ivory"],
  ["gold-deep", "ivory", 3, "large gold text + icons + stars on ivory"],
  ["gold-deep", "sand", 3, "icons + stars on sand"],
  ["on-dark", "espresso", 4.5, "text on espresso"],
  ["on-dark-muted", "espresso", 4.5, "muted text on espresso"],
  ["on-dark", "espresso-raised", 4.5, "text on raised dark surface"],
  ["on-dark-muted", "espresso-raised", 4.5, "muted text on raised dark surface"],
  ["gold", "espresso", 4.5, "gold text / icons on espresso"],
  ["gold", "espresso-raised", 4.5, "gold text / icons on raised dark surface"],
  ["espresso", "gold", 4.5, "gold buttons: espresso label on gold"],
  ["on-dark", "espresso", 4.5, "primary button label"],
  ["espresso", "on-dark", 4.5, "footer logo pad / inverse hover"],

  // Header + hero (azure wall / navy soffit / amber LED). The hero copy sits on --wall or darker:
  // the radial glow (--wall-hi) is placed behind the mirrors, not the text. Rendered pixels behind
  // every line of hero copy are also sampled in the browser audit.
  ["paper", "soffit", 4.5, "header text on navy soffit"],
  ["led-hi", "soffit", 4.5, "header hover and current link on navy"],
  ["soffit", "led", 4.5, "amber buttons: navy label on LED amber"],
  ["paper", "wall", 4.5, "headline and ghost button on wall"],
  ["paper", "wall", 4.5, "lede, 94% paper, on wall", 0.94],
  ["paper", "wall", 4.5, "fact captions, 92% paper, on wall", 0.92],
  ["led-hi", "wall", 4.5, "tagline on wall"],
  ["led", "wall", 3, "star icon on wall"],
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
