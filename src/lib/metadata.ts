import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

/**
 * Базовый адрес сайта. По умолчанию боевой домен; для превью-сборки
 * подменяется переменной окружения NEXT_PUBLIC_SITE_URL (там адрес
 * включает подпуть, поэтому ссылки склеиваются строкой — так результат
 * предсказуем и не зависит от разрешения относительных URL).
 */
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nixroll.co"
).replace(/\/$/, "");

const absolute = (path: string) => `${siteUrl}${path}`;

/** Превью для ссылок в мессенджерах и соцсетях: 1200×630. */
const COVER = {
  path: "/seo/cover.png",
  width: 1200,
  height: 630,
};

const COPY = {
  en: {
    title: "Nikita Efimchik — CV",
    description: "CV and notes by Nikita Efimchik, a digital product lead.",
    siteName: "Nikita Efimchik",
    ogLocale: "en_US",
    altLocale: "ru_RU",
    coverAlt: "Nikita Efimchik",
  },
  ru: {
    title: "Никита Ефимчик — CV",
    description:
      "Резюме и заметки Никиты Ефимчика, руководителя цифровых продуктов.",
    siteName: "Никита Ефимчик",
    ogLocale: "ru_RU",
    altLocale: "en_US",
    coverAlt: "Никита Ефимчик",
  },
} as const;

export type Section = "about" | "work" | "notes";

/**
 * Полный набор метаданных страницы. Собирается целиком в одном месте:
 * Next заменяет объект openGraph родителя целиком, а не сливает по полям,
 * поэтому частичное переопределение на уровне страницы теряло бы обложку.
 */
export function pageMetadata(locale: Locale, section: Section): Metadata {
  const copy = COPY[locale];
  const path = `/${locale}/${section}`;

  return {
    metadataBase: new URL(siteUrl),
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical: absolute(path),
      languages: {
        en: absolute(`/en/${section}`),
        ru: absolute(`/ru/${section}`),
      },
    },
    openGraph: {
      type: "website",
      siteName: copy.siteName,
      title: copy.title,
      description: copy.description,
      url: absolute(path),
      locale: copy.ogLocale,
      alternateLocale: copy.altLocale,
      images: [
        {
          url: absolute(COVER.path),
          width: COVER.width,
          height: COVER.height,
          alt: copy.coverAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [absolute(COVER.path)],
    },
  };
}
