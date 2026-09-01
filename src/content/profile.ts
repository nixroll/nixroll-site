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
  // TODO(nikita): файла резюме ещё нет — положить PDF в public/cv/ под этим
  // же именем, иначе ссылка ведёт в никуда.
  connect: {
    telegram: "https://t.me/nixroll",
    linkedin: "https://www.linkedin.com/in/nixrollco",
    twitter: "https://x.com/nixrollco",
    email: "mailto:hi@nixroll.co",
    cv: "/cv/nikita-efimchik.pdf",
  } satisfies Record<ConnectKey, string>,
};
