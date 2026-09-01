import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { Profile } from "@/components/Profile";
import { Nav } from "@/components/Nav";
import { NotesList } from "@/components/NotesList";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LOCALES, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { getNotesPage, localizeNote } from "@/lib/notes";
import { slotAfter } from "@/lib/reveal";

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
  return pageMetadata(locale, "notes");
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

  // У заметки с обложкой хвост на шаг длиннее: заголовок, текст, обложка.
  const languageSlot = slotAfter(
    ...items.map((note, index) => index + (note.image ? 2 : 1)),
    page.remaining > 0 ? items.length : 0 // кнопка «Показать ещё», если она есть
  );

  return (
    <PageShell>
      <Profile locale={locale} />
      <Nav locale={locale} active="notes" />
      <NotesList
        locale={locale}
        initialItems={items}
        initialRemaining={page.remaining}
      />
      <LanguageSwitcher locale={locale} section="notes" slot={languageSlot} />
    </PageShell>
  );
}
