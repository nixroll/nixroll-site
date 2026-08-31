import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { Profile } from "@/components/Profile";
import { Nav } from "@/components/Nav";
import { WorkRow } from "@/components/WorkRow";
import rowStyles from "@/components/WorkRow.module.css";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LOCALES, isLocale } from "@/lib/i18n";
import { work } from "@/content/work";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    alternates: { languages: { en: "/en/work", ru: "/ru/work" } },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam;

  return (
    <PageShell>
      <Profile locale={locale} />
      <Nav locale={locale} active="work" />
      <div className={rowStyles.rows}>
        {work.map((row, index) => (
          <WorkRow key={index} row={row} locale={locale} />
        ))}
      </div>
      <LanguageSwitcher locale={locale} section="work" />
    </PageShell>
  );
}
