import localFont from "next/font/local";

/* The site's font pair, in one place: change the files here to swap the pair.
   Both are Fontshare families, self-hosted (licences sit next to the files in /fonts).
   Components never name a font: they use the --font-display / --font-body variables
   (see @theme in app/globals.css).

   next/font preloads every file of a declaration, so what is preloaded is decided by how the
   files are grouped: only Zodiak Medium and General Sans Regular (the faces every first paint
   needs) are preloaded; the italic accent sits in its own declaration and loads on demand. */

/* Display: Zodiak. The variable file gives a true Medium 500 (and every other weight). */
export const zodiak = localFont({
  src: [{ path: "../fonts/zodiak/Zodiak-Variable.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: "Times New Roman",
  fallback: ["Georgia", "serif"],
});

/* Zodiak Italic 400, for the one accent word and the tagline. Not preloaded. */
export const zodiakItalic = localFont({
  src: [{ path: "../fonts/zodiak/Zodiak-Italic.woff2", weight: "400", style: "italic" }],
  variable: "--font-display-italic",
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
  fallback: ["Georgia", "serif"],
});

/* Body and UI: General Sans. One variable file covers Regular 400, Medium 500 and Semibold 600
   in a single request (38 KB; the three static files are 72 KB together). */
export const generalSans = localFont({
  src: [{ path: "../fonts/general-sans/GeneralSans-Variable.woff2", weight: "200 700", style: "normal" }],
  variable: "--font-body",
  display: "swap",
  adjustFontFallback: "Arial",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});
