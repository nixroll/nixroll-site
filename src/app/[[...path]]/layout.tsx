import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontVariables } from "@/fonts";
import { parsePath } from "@/lib/routes";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import "../globals.css";

/**
 * Базовый адрес для абсолютных ссылок в разметке для соцсетей: og:image,
 * og:url и канонические ссылки должны быть абсолютными. По умолчанию —
 * боевой домен; для превью-сборки подменяется переменной окружения.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nixroll.co";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
};

/**
 * Единый корневой макет на все адреса. Язык берётся из того же разбора
 * пути, что и в самой странице, — поэтому переход между языками остаётся
 * обычным клиентским переходом, без перезагрузки страницы.
 */
export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ path?: string[] }>;
}) {
  const { path } = await params;
  const route = parsePath(path);
  const lang = route?.locale ?? DEFAULT_LOCALE;

  return (
    <html lang={lang} className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
