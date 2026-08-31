import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { Profile } from "@/components/Profile";
import { Nav } from "@/components/Nav";
import { NotesList } from "@/components/NotesList";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LOCALES, isLocale } from "@/lib/i18n";
import { getNotesPage, localizeNote } from "@/lib/notes";

export const revalidate = 60;

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
    alternates: { languages: { en: "/en/notes", ru: "/ru/notes" } },
  };
}

const PAGE_SIZE = 10;

export default async function NotesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam;

  const page = await getNotesPage(0, PAGE_SIZE);
  const items = page.items.map((note) => localizeNote(note, locale));

  return (
    <PageShell>
      <Profile locale={locale} />
      <Nav locale={locale} active="notes" />
      <NotesList
        locale={locale}
        initialItems={items}
        initialRemaining={page.remaining}
      />
      <LanguageSwitcher locale={locale} section="notes" />
    </PageShell>
  );
}
