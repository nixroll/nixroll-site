import notesData from "./notes-data.json";

export type Note = {
  id: string;
  slug: string;
  status: "published" | "draft";
  publishedAt: string; // ISO date
  ru: { title: string; body: string[] };
  en: { title: string; body: string[] };
  image?: {
    url: string;
    width: number;
    height: number;
    altRu: string;
    altEn: string;
  };
  links?: { label: string; href: string }[];
};

/**
 * Данные заметок вынесены в notes-data.json (см. рядом): этот файл
 * Telegram-бот (Cloudflare Worker, папка telegram-bot/) дописывает
 * напрямую через GitHub API при публикации новой заметки. Здесь только
 * тип и импорт — TS-код бот не трогает.
 */
export const notesSeed: Note[] = notesData as Note[];
