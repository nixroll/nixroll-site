import localFont from "next/font/local";

/**
 * Source Serif 4 — self-hosted (woff2), next/font/local.
 * ТЗ 1.1: Regular 400 и SemiBold 600, self-hosted, font-display: swap.
 *
 * Two separate font faces (Latin subset + Cyrillic subset) instead of one
 * @font-face with unicode-range: this Next.js version's next/font/local
 * loader combines every `src` entry into a single @font-face and does not
 * expose a per-entry `unicodeRange` option, so subsetting has to happen via
 * the CSS `font-family` fallback list instead — the browser already picks,
 * per character, the first font in that list that has a glyph for it, which
 * is the same effect as unicode-range. Both files are variable fonts
 * (wght axis 200–900), so one file per script covers both weights.
 */
export const sourceSerifLatin = localFont({
  src: "./SourceSerif4-latin.woff2",
  weight: "400 600",
  style: "normal",
  variable: "--font-source-serif-latin",
  display: "swap",
  preload: true,
  // Без авто-фоллбэка: next/font иначе добавляет в стек лицо на базе local(Arial),
  // и для латиницы оно перехватывает отрисовку раньше, чем латинский сабсет.
  adjustFontFallback: false,
});

export const sourceSerifCyrillic = localFont({
  src: "./SourceSerif4-cyrillic.woff2",
  weight: "400 600",
  style: "normal",
  variable: "--font-source-serif-cyrillic",
  display: "swap",
  preload: true,
  // Без авто-фоллбэка: next/font иначе добавляет в стек лицо на базе local(Arial),
  // и для латиницы оно перехватывает отрисовку раньше, чем латинский сабсет.
  adjustFontFallback: false,
});

export const fontVariables = `${sourceSerifCyrillic.variable} ${sourceSerifLatin.variable}`;
