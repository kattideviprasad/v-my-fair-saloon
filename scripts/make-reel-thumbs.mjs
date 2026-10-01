// Builds reel thumbnails: 9:16, 720x1280, WebP, <= 150 KB, and updates lib/reel-thumbs.json.
//
// For each reel in lib/reels.ts (id N) it looks for a source, in this order:
//   1. a cover image   reference/reel-covers/reel-N.(jpg|jpeg|png|webp)
//   2. a video         reference/reel-videos/reel-N.(mp4|mov|webm|m4v)
//      -> samples the first seconds and picks the best frame: sharp, well lit, and not part of a
//         fade or cut (see pickBestFrame below)
//   3. a thumbnail already in public/reels/thumbs/ (kept as is)
// Reels with no source keep no thumbnail, and the carousel simply leaves them out.
//
//   node scripts/make-reel-thumbs.mjs
//   node scripts/make-reel-thumbs.mjs --seconds 8     (sample more of each video; default 6)
//
// reference/ is git-ignored. Use real photos or footage from the salon's own reels.
// Needs ffmpeg and ffprobe on PATH. Paths can be overridden with
// REEL_COVERS_DIR, REEL_VIDEOS_DIR, REEL_OUT_DIR and REEL_MANIFEST.
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const coversDir = process.env.REEL_COVERS_DIR || join(root, "reference", "reel-covers");
const videosDir = process.env.REEL_VIDEOS_DIR || join(root, "reference", "reel-videos");
const outDir = process.env.REEL_OUT_DIR || join(root, "public", "reels", "thumbs");
const manifestPath = process.env.REEL_MANIFEST || join(root, "lib", "reel-thumbs.json");
const publicBase = "/reels/thumbs";
const secArg = process.argv.indexOf("--seconds");
const SAMPLE_SECONDS = secArg > -1 ? Number(process.argv[secArg + 1]) || 6 : 6;
const FPS = 4;
const W = 720, H = 1280, MAX_BYTES = 150 * 1024;

const ids = [...readFileSync(join(root, "lib", "reels.ts"), "utf8").matchAll(/\bid:\s*(\d+)/g)].map((m) => Number(m[1]));

// Centre-crop to 9:16, then scale
const crop = "crop='if(gt(iw/ih,9/16),ih*9/16,iw)':'if(gt(iw/ih,9/16),ih,iw*16/9)'";
const scale = `scale=${W}:${H}:flags=lanczos`;

function encode(input, out, extraIn = []) {
  mkdirSync(outDir, { recursive: true });
  for (let q = 82; q >= 30; q -= 6) {
    const r = spawnSync("ffmpeg", ["-v", "error", "-y", ...extraIn, "-i", input, "-vf", `${crop},${scale}`, "-frames:v", "1", "-c:v", "libwebp", "-quality", String(q), out]);
    if (r.status !== 0) throw new Error(r.stderr.toString());
    const size = statSync(out).size;
    if (size <= MAX_BYTES) return { size, q };
  }
  throw new Error(`could not get ${out} under ${MAX_BYTES} bytes`);
}

/**
 * Picks the best still from a video.
 *  - Samples FPS frames per second for the first SAMPLE_SECONDS, as small greyscale frames.
 *  - Sharpness: variance of the Laplacian (higher = more in-focus detail).
 *  - Lighting: mean brightness near mid-grey scores best; very dark or blown-out frames are out.
 *  - Transitions: frames next to a fade (brightness jumping between neighbours) or a hard cut
 *    (a frame difference far above the clip's typical motion) are skipped, as are the first and
 *    last sampled frames.
 * Returns the timestamp in seconds, plus the numbers behind the choice.
 */
function pickBestFrame(video) {
  const S = 256; // analysis size (square; distortion doesn't matter for relative scores)
  const r = spawnSync(
    "ffmpeg",
    ["-v", "error", "-t", String(SAMPLE_SECONDS), "-i", video, "-vf", `fps=${FPS},scale=${S}:${S}:flags=area,format=gray`, "-f", "rawvideo", "-pix_fmt", "gray", "-"],
    { maxBuffer: 512 * 1024 * 1024 }
  );
  if (r.status !== 0) throw new Error(r.stderr.toString());
  const buf = r.stdout, size = S * S, n = Math.floor(buf.length / size);
  if (n === 0) throw new Error(`no frames decoded from ${video}`);

  const frames = Array.from({ length: n }, (_, i) => buf.subarray(i * size, (i + 1) * size));
  const mean = frames.map((f) => f.reduce((a, v) => a + v, 0) / size);
  const lap = frames.map((f) => {
    let sum = 0, sum2 = 0, c = 0;
    for (let y = 1; y < S - 1; y++) for (let x = 1; x < S - 1; x++) {
      const i = y * S + x, v = 4 * f[i] - f[i - 1] - f[i + 1] - f[i - S] - f[i + S];
      sum += v; sum2 += v * v; c++;
    }
    return sum2 / c - (sum / c) ** 2;
  });
  const diff = frames.map((f, i) => {
    if (i === 0) return 0;
    const p = frames[i - 1]; let d = 0;
    for (let k = 0; k < size; k += 7) d += Math.abs(f[k] - p[k]);
    return d / Math.ceil(size / 7);
  });
  const sorted = diff.slice(1).sort((a, b) => a - b);
  const typical = sorted.length ? sorted[Math.floor(sorted.length / 2)] : 0;
  const cutLimit = Math.max(18, typical * 3);

  const score = (i) => lap[i] * Math.exp(-(((mean[i] - 125) / 75) ** 2));
  const isTransition = (i) =>
    Math.abs(mean[i] - mean[i - 1]) > 8 || Math.abs(mean[i] - mean[i + 1]) > 8 || diff[i] > cutLimit || diff[i + 1] > cutLimit;

  let best = -1, why = "";
  if (n >= 3) {
    for (let i = 1; i < n - 1; i++) {
      if (mean[i] < 50 || mean[i] > 215 || isTransition(i)) continue;
      if (best < 0 || score(i) > score(best)) best = i;
    }
    why = "sharpest well-lit frame outside fades and cuts";
  }
  if (best < 0) { // everything was filtered: fall back to the best-lit sharp frame
    for (let i = 0; i < n; i++) if (best < 0 || score(i) > score(best)) best = i;
    why = "no clean frame found; best-scoring frame overall";
  }
  return { t: best / FPS, sharp: lap[best], luma: mean[best], frames: n, why };
}

function findFile(dir, base, exts) {
  return exts.map((e) => join(dir, `${base}.${e}`)).find(existsSync);
}

const manifest = {};
const missing = [];
for (const id of ids) {
  const out = join(outDir, `reel-${id}.webp`);
  const cover = findFile(coversDir, `reel-${id}`, ["jpg", "jpeg", "png", "webp"]);
  const video = findFile(videosDir, `reel-${id}`, ["mp4", "mov", "webm", "m4v"]);
  let how = null;
  if (cover) {
    const r = encode(cover, out);
    how = `cover ${cover.split(/[\\/]/).pop()} -> ${(r.size / 1024).toFixed(0)} KB (q${r.q})`;
  } else if (video) {
    const pick = pickBestFrame(video);
    const r = encode(video, out, ["-ss", pick.t.toFixed(2)]);
    how = `video ${video.split(/[\\/]/).pop()}, frame at ${pick.t.toFixed(2)}s (${pick.why}; luma ${pick.luma.toFixed(0)}, sharpness ${pick.sharp.toFixed(0)}, ${pick.frames} frames sampled) -> ${(r.size / 1024).toFixed(0)} KB (q${r.q})`;
  }
  if (how) {
    manifest[id] = { src: `${publicBase}/reel-${id}.webp`, width: W, height: H };
    console.log(`reel ${id}: ${how}`);
  } else if (existsSync(out)) {
    manifest[id] = { src: `${publicBase}/reel-${id}.webp`, width: W, height: H };
    console.log(`reel ${id}: keeping existing ${out.split(/[\\/]/).pop()}`);
  } else {
    missing.push(id);
  }
}
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\nmanifest: ${Object.keys(manifest).length} reel(s) with thumbnails`);
if (missing.length) console.log(`no source for reel(s): ${missing.join(", ")}  (add reference/reel-covers/reel-N.jpg or reference/reel-videos/reel-N.mp4)`);
