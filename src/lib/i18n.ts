export const LOCALES = ["en", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export const dictionary = {
  en: {
    nav: { about: "About", work: "Work", notes: "Notes" },
    connectLabel: "Connect",
    connect: {
      telegram: "Telegram",
      linkedin: "LinkedIn",
      twitter: "Twitter",
      email: "Email",
      cv: "CV (PDF)",
    },
    loadMore: (n: number) => `Load more (${n})`,
    lang: { en: "En", ru: "Ru" },
    htmlLang: "en",
  },
  ru: {
    nav: { about: "О себе", work: "Работа", notes: "Заметки" },
    connectLabel: "Контакты",
    connect: {
      telegram: "Telegram",
      linkedin: "LinkedIn",
      twitter: "Twitter",
      email: "Email",
      cv: "CV (PDF)",
    },
    loadMore: (n: number) => `Показать ещё (${n})`,
    lang: { en: "En", ru: "Ru" },
    htmlLang: "ru",
  },
} as const;

export function t(locale: Locale) {
  return dictionary[locale];
}
