import type { Metadata } from "next";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nixroll.co"
).replace(/\/$/, "");

const absolute = (path: string) => `${siteUrl}${path}`;

/** Превью для ссылок в мессенджерах и соцсетях: 1200×630. */
const COVER = { path: "/seo/cover.png", width: 1200, height: 630 };

const TITLE = "Nikita — product manager";
const DESCRIPTION = "Nikita's now page — product manager, career timeline, contact.";

/**
 * Сайт теперь одноязычный (EN), поэтому метаданные — один статический
 * объект, без alternates.languages и без переключения по локали.
 */
export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absolute("/") },
  openGraph: {
    type: "website",
    siteName: "Nikita",
    title: TITLE,
    description: DESCRIPTION,
    url: absolute("/"),
    locale: "en_US",
    images: [
      {
        url: absolute(COVER.path),
        width: COVER.width,
        height: COVER.height,
        alt: "Nikita",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [absolute(COVER.path)],
  },
};
