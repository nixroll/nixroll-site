import { DEFAULT_LOCALE, LOCALES, isLocale, type Locale } from "@/lib/i18n";

export const SECTIONS = ["about", "work", "notes"] as const;
export type Section = (typeof SECTIONS)[number];

export function isSection(value: string): value is Section {
  return (SECTIONS as readonly string[]).includes(value);
}

/**
 * Схема адресов: About — главная, английский — язык по умолчанию.
 *
 *   /            → английский, About
 *   /work        → английский, Work
 *   /ru          → русский, About
 *   /ru/notes    → русский, Notes
 *
 * Ни «about», ни «en» в адресе не появляются: раздел и язык по умолчанию
 * не нуждаются в пометке.
 */
export function parsePath(
  path?: string[]
): { locale: Locale; section: Section } | null {
  const parts = path ?? [];
  let locale: Locale = DEFAULT_LOCALE;
  let rest = parts;

  // Префикс языка есть только у неосновных языков.
  if (parts[0] && isLocale(parts[0]) && parts[0] !== DEFAULT_LOCALE) {
    locale = parts[0];
    rest = parts.slice(1);
  }

  if (rest.length === 0) return { locale, section: "about" };
  if (rest.length === 1 && isSection(rest[0])) {
    return { locale, section: rest[0] };
  }
  return null;
}

/** Адрес раздела по тем же правилам, что и разбор. */
export function href(locale: Locale, section: Section): string {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  const suffix = section === "about" ? "" : `/${section}`;
  return `${prefix}${suffix}` || "/";
}

/** Все существующие адреса — для предварительной сборки страниц. */
export function allRoutes(): { path: string[] }[] {
  const routes: { path: string[] }[] = [];
  for (const locale of LOCALES) {
    for (const section of SECTIONS) {
      const parts: string[] = [];
      if (locale !== DEFAULT_LOCALE) parts.push(locale);
      if (section !== "about") parts.push(section);
      routes.push({ path: parts });
    }
  }
  return routes;
}
