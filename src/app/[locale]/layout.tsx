import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { fontVariables } from "@/fonts";
import { LOCALES, isLocale } from "@/lib/i18n";
import "../globals.css";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/**
 * Базовый адрес для абсолютных ссылок в разметке для соцсетей.
 * По умолчанию — боевой домен; подменяется переменной окружения.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nixroll.co";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const title =
    locale === "ru" ? "Никита Ефимчик — CV" : "Nikita Efimchik — CV";
  const description =
    locale === "ru"
      ? "Резюме и заметки Никиты Ефимчика, руководителя цифровых продуктов."
      : "CV and notes by Nikita Efimchik, a digital product lead.";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
