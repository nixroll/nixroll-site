/**
 * Порядок блока «Контакты»: от самого быстрого канала связи к самому
 * медленному, файл с резюме в конце.
 */
export const CONNECT_ORDER = [
  "telegram",
  "linkedin",
  "twitter",
  "email",
  "cv",
] as const;

export type ConnectKey = (typeof CONNECT_ORDER)[number];

type Locale = "en" | "ru";

export const profile = {
  name: {
    en: "NIKITA EFIMCHIK",
    ru: "НИКИТА ЕФИМЧИК",
  },
  email: "hi@nixroll.co",
  avatar: {
    src: "/images/avatar.jpg",
    alt: { en: "Portrait of Nikita Efimchik", ru: "Портрет Никиты Ефимчика" },
  },
  connect: {
    telegram: "https://t.me/nixroll",
    linkedin: "https://www.linkedin.com/in/nixrollco",
    twitter: "https://x.com/nixrollco",
    email: "mailto:hi@nixroll.co",
    // Резюме своё на каждый язык: русская страница отдаёт русскую версию,
    // хранится на Google Drive и открывается там же, в новой вкладке.
    cv: {
      en: "https://drive.google.com/file/d/1_pJqS8xp9_4m2XnULKLmvzQMKTFA7L1p/view?usp=sharing",
      ru: "https://drive.google.com/file/d/1oavTQ5TnaCoaCEQotO9xIq0XlEKcQdi0/view?usp=sharing",
    },
  } satisfies Record<ConnectKey, string | Record<Locale, string>>,
};

/** Адрес контакта: у резюме он свой на каждом языке, у остальных общий. */
export function connectHref(key: ConnectKey, locale: Locale): string {
  const value = profile.connect[key];
  return typeof value === "string" ? value : value[locale];
}
