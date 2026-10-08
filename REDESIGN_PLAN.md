# V My Fair: Frontend Redesign Plan (v3)

Site: https://v-my-fair-saloon.vercel.app · Repo: kattideviprasad/v-my-fair-saloon
Stack: Next.js 16.3 (App Router) · Tailwind v4 · GSAP · tokens in `app/globals.css`, hero/header CSS in `app/hero.css`

---

## How to use this file with Claude Code

1. Put this file in the repo root as `REDESIGN_PLAN.md`.
2. Paste this prompt into Claude Code:

```
Read REDESIGN_PLAN.md and AGENTS.md. Work directly on the `main` branch (no other branches).
Execute the plan phase by phase (Phase 0 to Phase 6). After each phase:
1. run `npm run build` and `node scripts/check-contrast.mjs` and fix every error,
2. start `npm run dev` and tell me what to check at 375px and 1440px,
3. wait for me to say "ok", then commit with a clear message and push to `main`.
Never push a phase whose build fails. Do not touch business content
(names, address, phone, hours, services) except where the plan says so.
At the end, give me a checklist of what changed per page.
```

3. Each push to `main` goes live on v-my-fair-saloon.vercel.app within a minute or two, so check every phase locally before you say "ok".

---

## Part 1: What we have today (audit)

### 1.1 Every background color currently on the site

| Where | Class / token | Hex | Nearest CSS named color (W3Schools) |
|---|---|---|---|
| Page base, Services, Reviews sections | `surface-ivory` / `--ivory` | `#FBF7EE` | FloralWhite |
| About, Instagram, all sub-page headers | `surface-sand` / `--sand` | `#F1E9DA` | AntiqueWhite |
| Header bar, mobile menu | `--soffit` | `#071A2D` | (near) MidnightBlue, darker |
| Home hero (outer) | `--wall-deep` | `#093657` | (between) MidnightBlue / DarkSlateBlue |
| Home hero (main) | `--wall` | `#0F5C93` | darker SteelBlue |
| Home hero (glow) | `--wall-hi` | `#1C78B6` | SteelBlue |
| Academy section, footer, bottom bar, sub-page CTAs | `surface-dark` / `--navy` | `#071A2D` | (near) MidnightBlue |
| Home "Ready to Look Your Best?" CTA band | `surface-raised` / `--navy-raised` | `#082B46` (computed mix) | (near) MidnightBlue |
| Service cards on home | `.card` | `#071A2D` | — |
| Reviews card, inputs | `card-light`, `.input` | `#FBF7EE` | FloralWhite |
| Logo plate (header + footer) | `--paper` / `bg-on-dark` | `#F2F6F9` | AliceBlue |
| Hero mirror frames | `--chrome-1…5` | `#F6F9FC` `#B8C3D2` `#7E8A9D` `#DDE4EE` `#98A4B6` | Silver / LightSlateGray range |
| Mobile menu overlay | `--dim` @ 62% | `#02101D` | — |

**Text / accent colors:** ink `#071A2D`, muted `#46586A`, on-dark `#F2F6F9`, on-dark-muted `#B4C5D6`, amber `#F6B545`, amber-hi `#FFD98F`, amber-deep `#A56B00`, amber-text `#7A5200`.

### 1.2 Fonts currently loaded (4 families — too many)

| Font | Used for |
|---|---|
| Instrument Serif (400 only) | Hero headline, tagline, header wordmark, mobile menu |
| Hanken Grotesk | Hero body, header nav, hero buttons |
| Playfair Display (400–700) | Every heading below the hero |
| Inter (300–700) | Every paragraph/button below the hero |

So the hero speaks one "voice" (thin Instrument Serif, weight 400) and the rest of the site another (heavy Playfair, weight 600). That is why the hero feels disconnected and the typography feels odd.

### 1.3 Home page order and backgrounds today

```
Header          navy  #071A2D
Hero            BLUE  #0F5C93 radial  ← only place this blue exists
Services        ivory #FBF7EE (with NAVY cards)
About           sand  #F1E9DA
Reviews         ivory #FBF7EE
Instagram       sand  #F1E9DA
Academy         navy  #071A2D   ┐
CTA banner      navy+ #082B46   │ three dark bands stacked,
Footer          navy  #071A2D   │ almost-but-not-quite the same color
Bottom bar      navy  #071A2D   ┘ separated only by faint lines
```
Sub-pages (Services, About, Gallery) end with a `surface-dark py-20` CTA that sits directly on the navy footer → the CTA and footer merge into one dark slab.

---

## Part 2: Flaws found (fix list)

**Design**
1. **Two type systems / four font families.** Hero ≠ rest of site. Also costs page speed.
2. **Hero blue (#0F5C93) appears nowhere else.** The hero looks like a different website.
3. **Dark stacking near the footer.** Academy `#071A2D` → CTA `#082B46` → Footer `#071A2D`: three slightly different navies read as a mistake, not a design.
4. **Sub-page CTA + footer merge** (same navy, only a hairline between).
5. **Logo sits on a white "sticker" plate** in header and footer — looks pasted on.
6. **Service cards are dark navy on an ivory section** — heavy blocks right after a dark hero.
7. **Sub-page headers** (Services/About/Gallery/Contact) are plain sand bands with Playfair — they don't follow the home hero style.
8. **Footer repeats itself:** logo + "V My Fair" heading + tagline, and phone + Instagram appear twice (list and bottom icons).

**Content / trust**
9. **"8+ Years of trust" is wrong.** Since 2016 → 10 years in 2026 (home About badge and About page stats). Compute it from the year.
10. **Gallery has only 2 photos — the same two as the hero.** The hero's "Take a tour" button leads to a near-empty page. Need 8–12 real photos from the owner/Instagram.
11. **Reviews section shows zero actual reviews** — just "4.5". Add 3 real Google review quotes (copy them from Google, with first name + initial; do not invent).
12. **Google Maps embed URL on Contact looks hand-made** (truncated place id). Verify it pins the right salon; replace with the real "Share → Embed a map" code from Google Maps.

**Technical**
13. **No Open Graph image.** When you send the link to the owner on WhatsApp, the preview will have no picture. Add `app/opengraph-image.jpg` (1200×630).
14. **Unused files/deps:** `framer-motion` (not imported anywhere), `public/hero-salon.jpg` (99 KB), `public/logo.png` (575 KB).
15. **GitHub repo is public.** It's a client's site — switch it to private (Vercel keeps deploying).

---

## Part 3: The new design system

### 3.1 Colors — one palette, everything derived from it

Keep the warm ivory/sand + navy + amber family (it already works below the hero). Demote the bright salon blue to a **hint** instead of a full background.

| Role | Token | Hex | Use |
|---|---|---|---|
| Base light | `--ivory` | `#FBF7EE` | Page background, light sections |
| Alt light | `--sand` | `#F1E9DA` | Alternating sections, page headers |
| Card on light | `--paper-warm` (new) | `#FFFDF8` | Service cards, review cards |
| Dark | `--navy` | `#071A2D` | Header, hero base, footer |
| Dark raised | `--navy-raised` | `#0C2A44` (fixed hex, not a mix) | Cards/panels on dark only |
| Deepest | `--navy-deep` (new) | `#040F1B` | Footer bottom bar only |
| Salon blue hint | `--wall` | `#0F5C93` | Hero glow at ≤35% strength, small details. **Never a full section background** |
| Accent on dark | `--amber` | `#F6B545` | Buttons, italic accent words on dark |
| Accent hover | `--amber-hi` | `#FFD98F` | Hover states |
| Accent on light | `--amber-deep` / `--amber-text` | `#A56B00` / `#7A5200` | Icons / small text on ivory (keep, contrast-checked) |
| Text | `--text` / `--text-muted` | `#071A2D` / `#46586A` | Keep |

**Rules**
- Max **one** dark band in a row anywhere on the site (header+hero count as one top block; footer is the bottom block).
- Light sections alternate ivory → sand → ivory. Never two of the same next to each other.
- Amber is the only accent. Blue is only atmosphere inside the hero.

### 3.2 Typography — 2 families from Fontshare, 3 styles total

**Recommended pairing: Gambetta (serif) + Satoshi (sans)**

| Style | Font | Weight | Used for |
|---|---|---|---|
| Display | Gambetta | 500 / 600 | h1, h2, h3, big numbers (4.5, 10+) |
| Display accent | Gambetta *Italic* | 400 / 500 | 1–3 words inside headings, in amber (dark bg) or amber-deep (light bg) |
| Text / UI | Satoshi | 400 / 500 / 700 | Body, nav, buttons, eyebrows, footer, forms |

That's the "1–2 styles combined" look: every heading is upright serif **plus** one italic accent phrase, and everything else is one clean sans.

**Heading pattern examples**
- Hero: `More than` / *`a salon.`* (second line italic, amber)
- `Our` *`Services`* · `A Neighborhood Institution` *`since 2016`* · `Rated by` *`real people`* · `Academy &` *`Training`* · `Ready to` *`look your best?`*

**Backup pairings** (if you prefer, swap names only — same structure):
- Zodiak + General Sans (sharper, more fashion)
- Boska + Switzer (softer, more editorial)

**Type scale (update tokens)**
| Token | Value |
|---|---|
| `--fs-hero` | `clamp(3rem, 1.8rem + 6vw, 7rem)`, line-height 0.98, letter-spacing −0.02em |
| `--fs-h2` | `clamp(2rem, 1.4rem + 2.4vw, 3.5rem)`, line-height 1.08 |
| `--fs-h3` | `clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)` |
| `--fs-body` | 17 → 18px, line-height 1.65 |
| `--fs-eyebrow` | 12 → 13px, Satoshi 700, uppercase, letter-spacing 0.18em |

---

## Part 4: Execution phases (for Claude Code)

### Phase 0 — Clean-up
- `npm uninstall framer-motion`.
- Delete `public/hero-salon.jpg` and `public/logo.png` (confirm no references with grep first).
- Commit: `chore: remove unused assets and framer-motion`.

### Phase 1 — Fonts (Gambetta + Satoshi via Fontshare)
- **I (Devi) will download** from fontshare.com: Gambetta (Regular, Medium, Semibold, Italic, Medium Italic) and Satoshi (Regular, Medium, Bold) as `.woff2`, and place them in `app/fonts/`. If the files are missing, stop and ask me.
- In `app/layout.tsx`: remove Playfair_Display, Inter, Instrument_Serif, Hanken_Grotesk imports. Load both with `next/font/local`:
  - `--font-display` = Gambetta (weights 400/500/600, normal + italic), `display: "swap"`, `preload: true` for the 500 weight only.
  - `--font-text` = Satoshi (400/500/700), `display: "swap"`.
- In `globals.css` `@theme inline`: `--font-serif: var(--font-display), Georgia, serif;` and `--font-sans: var(--font-text), system-ui, sans-serif;`.
- In `globals.css :root`: point `--font-display-hero` → `var(--font-serif)` and `--font-body-hero` → `var(--font-sans)` so hero/header automatically use the same two fonts as the site.
- Headings: weight 500 (Gambetta looks heavy at 600 large); h3 weight 600.
- Add utility `.accent` = `font-style: italic; font-weight: 400; color: var(--accent-text);` — with the existing surface tokens this gives amber on dark and amber-deep on light automatically. Use `--accent-icon` color for large display sizes on light sections (≥3:1 is fine for large text).
- Commit: `feat(type): unify site on Gambetta + Satoshi`.

### Phase 2 — Color tokens
In `globals.css`:
- `--navy-raised: #0C2A44;` (replace the color-mix).
- Add `--navy-deep: #040F1B;` and `--paper-warm: #FFFDF8;` and expose them in `@theme inline` as `--color-navy-deep`, `--color-paper-warm`.
- Add `.surface-paper` (background `--paper-warm`, light context tokens).
- Update `scripts/check-contrast.mjs` with the new pairs: on-dark on `#0C2A44` and `#040F1B`, text/muted on `#FFFDF8`. All must pass.
- Commit: `feat(color): fixed navy scale and warm paper card tone`.

### Phase 3 — Hero rework (`components/HeroSection.tsx`, `app/hero.css`)
Keep: the two framed mirror photos, the GSAP "lights on" intro, SplitText line reveal, scroll drift, glint. Change the look, not the motion.
- **Background:** navy base instead of bright blue:
  `radial-gradient(80% 70% at 72% 40%, color-mix(in srgb, var(--wall) 35%, var(--navy)) 0%, var(--navy) 70%)` on desktop; mobile version centered behind the photos. Keep the amber `.hero-spill` from the top and the grain overlay. Result: matches header + footer, still hints at the salon's blue wall.
- **Headline:** Gambetta 500, `--fs-hero`. Line 1 `More than` (ivory), line 2 `<em class="accent">a salon.</em>` (Gambetta italic, amber). SplitText must still split both lines.
- **Remove** the separate yellow italic tagline `It's a better you.`. Instead add a small eyebrow **above** the headline: `UNISEX SALON & ACADEMY · HYDERABAD` (Satoshi 700, tracked, amber, 12–13px).
- **Lede:** Satoshi 400, 18px, `--on-dark-muted`, max-width 34rem. Text unchanged.
- **Buttons:** reuse site `.btn .btn-amber` and a ghost style so hero buttons = site buttons (delete `.hbtn*` once nothing uses them).
- **Facts row:** numbers in Gambetta 500 (`4.5★`, `2016`, `7:30–9:30`), labels Satoshi 500 13px uppercase muted. Change the second fact to `Since 2016` / `10 years in Chanda Nagar` (computed).
- **Mirror frames:** warm the chrome slightly toward champagne so it fits amber: replace `--chrome-2/3/5` with `#CFC6B4`, `#8F8573`, `#B3A994` (keep 1 and 4 light).
- **Bottom edge:** add a 1px amber line at the hero bottom (same as `.site-led`) so navy → ivory is a deliberate cut, not an abrupt jump.
- Header: on home it stays navy with the glowing LED line; wordmark uses Gambetta.
- Check: intro plays once, everything visible if JS fails, `prefers-reduced-motion` respected, no layout shift.
- Commit: `feat(hero): navy-based hero with unified type`.

### Phase 4 — Section-by-section (home)
| Section | Background | Changes |
|---|---|---|
| Services | ivory | Cards become **light**: `surface-paper` + 1px `--line` border, icon circle amber-deep, hover lifts with amber border. Heading `Our <em class="accent">Services</em>` |
| About | sand | Badge: `10+` computed (`new Date().getFullYear() - 2016`), label `Years in Chanda Nagar`. Heading `A Neighborhood Institution <em class="accent">since 2016</em>` |
| Reviews | ivory | Keep the 4.5 score card, add a row of **3 review cards** (`surface-paper`) — content comes from me; until then render a clearly marked TODO data array with empty entries hidden (no fake reviews). |
| Instagram | sand | Heading `Real results, <em class="accent">real clients</em>` |
| Academy | **ivory** (was navy) | Two-column: text left, a navy-raised rounded panel right with the academy icon + 3 short points (hands-on training, small batches, enquire for dates) — only if owner confirms; otherwise keep single column on ivory |
| Pre-footer CTA | ivory section containing a **navy rounded card** (`--navy-raised`, radius 18px, max-width 1100px) | New shared component (Phase 5). Heading `Ready to <em class="accent">look your best?</em>` |
| Footer | navy `#071A2D` | See Phase 5 |

Resulting home rhythm: `navy (header+hero) → ivory → sand → ivory → sand → ivory (+navy card) → navy footer`. One dark block top, one at the bottom.

### Phase 5 — Footer + shared pre-footer CTA
- Create `components/PreFooterCTA.tsx` (props: heading, accent words, text, primary href, show phone). Use it on Home, Services, About, Gallery. **Delete** each page's own `surface-dark py-20` CTA section. Contact page doesn't need it.
- Footer:
  - Top area `#071A2D`, padding 64px top.
  - Brand column: logo **without** the white plate (needs a light/transparent logo version — see "Needs from me"); until then keep plate but make it smaller (48px) and rounded 12px. Remove the duplicate `<h3>V My Fair</h3>` since the logo says it. Tagline in Gambetta italic amber.
  - Column headings (`h4`): Satoshi 700, 12px, uppercase, tracked, `--on-dark-muted`.
  - Bottom bar: background `--navy-deep #040F1B`, copyright left, small "Designed by …" optional right. Remove the duplicate Instagram/phone icon buttons (already in Visit us column).
- Commit: `feat(footer): shared pre-footer CTA, single dark footer`.

### Phase 6 — Sub-pages + polish
- Sub-page headers (Services, About, Gallery, Contact): keep sand background, but use the same pattern as hero: eyebrow + Gambetta h1 with italic accent word, e.g. `Our <em class="accent">Services</em>`, `Visit or <em class="accent">book</em>`.
- About page stats: `8+ Years` → computed `10+`.
- Gallery: support 8–12 photos in a masonry grid; keep the "only real photos" rule. Until new photos arrive, change hero's "Take a tour" to link `/gallery` only if ≥6 photos exist, else link `/about`.
- Add `app/opengraph-image.jpg` (1200×630, salon photo + logo) and set `twitter.card = "summary_large_image"`.
- Contact: replace Maps iframe `src` with the real embed code (I'll provide).
- Run `npm run build`, contrast script, and view at 375px, 768px, 1440px. Fix any overflow before pushing to `main`.
- Commit: `feat: sub-page headers, OG image, polish`.

---

## Needs from me (Devi) before/during the run
1. Fontshare downloads (Gambetta + Satoshi woff2) → `app/fonts/`.
2. White/transparent version of the logo (PNG or SVG) → `public/logo-light.png`.
3. 8–12 real salon photos (Instagram/owner) → `public/images/gallery/`.
4. 3 real Google review quotes (name, text).
5. Real Google Maps embed code for the Shoba Complex location.
6. Make the GitHub repo private.
