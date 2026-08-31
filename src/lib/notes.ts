import { notesSeed, type Note } from "@/content/notes-seed";
import type { Locale } from "@/lib/i18n";
import { applyRuTypography } from "@/lib/typography";

/**
 * Источник заметок. Сейчас это статический seed-массив; ТЗ 6 предполагает
 * переход на БД (Postgres) — тогда эта функция заменяется на запрос к базе,
 * а форма ответа (items/total/remaining) остаётся прежней, так что
 * GET /api/notes и клиентский код менять не придётся.
 */
async function getPublishedNotes(): Promise<Note[]> {
  return notesSeed
    .filter((note) => note.status === "published")
    .sort((a, b) => {
      if (a.publishedAt === b.publishedAt) return 0; // стабильный порядок для одной даты
      return a.publishedAt < b.publishedAt ? 1 : -1;
    });
}

export type NotesPage = {
  items: Note[];
  total: number;
  remaining: number;
};

export async function getNotesPage(
  offset: number,
  limit: number
): Promise<NotesPage> {
  const all = await getPublishedNotes();
  const items = all.slice(offset, offset + limit);
  const remaining = Math.max(0, all.length - (offset + items.length));
  return { items, total: all.length, remaining };
}

const MONTHS_EN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MONTHS_RU_GENITIVE = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

/**
 * Формат даты задан макетом буквально: "31 Aug, 2026" (En) и
 * "31 августа 2026" (Ru, родительный падеж, без точки и "г."). Intl
 * DateTimeFormat в ru-RU добавляет "г." и не даёт нужный порядок в en-US,
 * поэтому дата собирается вручную.
 */
export function formatNoteDate(iso: string, locale: Locale): string {
  const [year, month, day] = iso.split("-").map(Number);
  const dayNum = day;
  const monthIndex = month - 1;

  if (locale === "ru") {
    return `${dayNum} ${MONTHS_RU_GENITIVE[monthIndex]} ${year}`;
  }
  return `${dayNum} ${MONTHS_EN[monthIndex]}, ${year}`;
}

export type LocalizedNote = {
  id: string;
  slug: string;
  title: string;
  paragraphs: string[];
  dateLabel: string;
  image?: { url: string; width: number; height: number; alt: string };
  links?: { label: string; href: string }[];
};

function tx(text: string, locale: Locale) {
  return locale === "ru" ? applyRuTypography(text) : text;
}

export function localizeNote(note: Note, locale: Locale): LocalizedNote {
  const body = note[locale];
  return {
    id: note.id,
    slug: note.slug,
    title: tx(body.title, locale),
    paragraphs: body.body.map((paragraph) => tx(paragraph, locale)),
    dateLabel: formatNoteDate(note.publishedAt, locale),
    image: note.image
      ? {
          url: note.image.url,
          width: note.image.width,
          height: note.image.height,
          alt: tx(
            locale === "ru" ? note.image.altRu : note.image.altEn,
            locale
          ),
        }
      : undefined,
    links: note.links,
  };
}
