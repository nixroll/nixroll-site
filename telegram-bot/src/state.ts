import type { Draft, Env } from "./types";

const draftKey = (chatId: number) => `draft:${chatId}`;
const dedupeKey = (updateId: number) => `update:${updateId}`;

export async function getDraft(env: Env, chatId: number): Promise<Draft | null> {
  const raw = await env.NOTES_BOT_KV.get(draftKey(chatId));
  return raw ? (JSON.parse(raw) as Draft) : null;
}

export async function setDraft(env: Env, chatId: number, draft: Draft) {
  // TTL: незаконченный черновик сам исчезает через сутки, чтобы не копился мусор.
  await env.NOTES_BOT_KV.put(draftKey(chatId), JSON.stringify(draft), {
    expirationTtl: 60 * 60 * 24,
  });
}

export async function clearDraft(env: Env, chatId: number) {
  await env.NOTES_BOT_KV.delete(draftKey(chatId));
}

/** Telegram повторяет вебхук, если ответ не пришёл вовремя — обрабатываем update один раз. */
export async function alreadyProcessed(env: Env, updateId: number): Promise<boolean> {
  const seen = await env.NOTES_BOT_KV.get(dedupeKey(updateId));
  if (seen) return true;
  await env.NOTES_BOT_KV.put(dedupeKey(updateId), "1", { expirationTtl: 60 * 10 });
  return false;
}

/** Первая строка — заголовок, остальное — абзацы (разделены пустой строкой). */
export function parseTitleAndBody(text: string): { title: string; body: string[] } {
  const lines = text.replace(/\r\n/g, "\n").trim().split("\n");
  const title = lines[0]?.trim() ?? "";
  const rest = lines.slice(1).join("\n").trim();
  const body = rest
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\n/g, " ").trim())
    .filter(Boolean);
  return { title, body };
}
