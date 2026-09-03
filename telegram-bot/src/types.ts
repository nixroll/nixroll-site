export interface Env {
  NOTES_BOT_KV: KVNamespace;
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_WEBHOOK_SECRET: string;
  GITHUB_TOKEN: string;
  ALLOWED_CHAT_ID: string;
  GITHUB_REPO: string; // "owner/repo"
  GITHUB_BRANCH: string;
  SITE_URL: string;
}

/** Заметка ровно в том виде, в каком её хранит src/content/notes-data.json на сайте. */
export type Note = {
  id: string;
  slug: string;
  status: "published" | "draft";
  publishedAt: string; // YYYY-MM-DD
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

export type Step = "ru" | "en" | "photo" | "confirm";

export type Draft = {
  step: Step;
  ru?: { title: string; body: string[] };
  en?: { title: string; body: string[] };
  photo?: { fileId: string; width: number; height: number } | null;
};
