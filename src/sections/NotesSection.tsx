import { PageShell } from "@/components/PageShell";
import { Profile } from "@/components/Profile";
import { Nav } from "@/components/Nav";
import { NotesList } from "@/components/NotesList";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/i18n";
import { getNotesPage, localizeNote } from "@/lib/notes";
import { slotAfter } from "@/lib/reveal";

const PAGE_SIZE = 10;

export async function NotesSection({ locale }: { locale: Locale }) {
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
