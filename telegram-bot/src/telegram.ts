import type { Env } from "./types";

const API = (token: string, method: string) =>
  `https://api.telegram.org/bot${token}/${method}`;

export async function tgCall(
  env: Env,
  method: string,
  payload: Record<string, unknown>
): Promise<unknown> {
  const res = await fetch(API(env.TELEGRAM_BOT_TOKEN, method), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await res.json()) as { ok: boolean; description?: string };
  if (!data.ok) {
    console.error(`Telegram ${method} failed: ${data.description}`);
  }
  return data;
}

export function sendMessage(
  env: Env,
  chatId: number | string,
  text: string,
  extra: Record<string, unknown> = {}
) {
  return tgCall(env, "sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    ...extra,
  });
}

export function answerCallbackQuery(
  env: Env,
  callbackQueryId: string,
  text?: string
) {
  return tgCall(env, "answerCallbackQuery", {
    callback_query_id: callbackQueryId,
    text,
  });
}

/** Ссылка на файл для скачивания (фото пересылается на GitHub напрямую из Telegram). */
export async function getFileUrl(env: Env, fileId: string): Promise<string> {
  const res = await fetch(API(env.TELEGRAM_BOT_TOKEN, "getFile"), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ file_id: fileId }),
  });
  const data = (await res.json()) as {
    ok: boolean;
    result?: { file_path: string };
  };
  if (!data.ok || !data.result) {
    throw new Error("getFile failed");
  }
  return `https://api.telegram.org/file/bot${env.TELEGRAM_BOT_TOKEN}/${data.result.file_path}`;
}

export const CANCEL_BUTTON = {
  inline_keyboard: [[{ text: "Отмена", callback_data: "cancel" }]],
};

export const PHOTO_STEP_KEYBOARD = {
  inline_keyboard: [
    [{ text: "Без фото", callback_data: "nophoto" }],
    [{ text: "Отмена", callback_data: "cancel" }],
  ],
};

export const CONFIRM_KEYBOARD = {
  inline_keyboard: [
    [{ text: "✅ Опубликовать", callback_data: "publish" }],
    [{ text: "Отмена", callback_data: "cancel" }],
  ],
};

export const START_KEYBOARD = {
  keyboard: [[{ text: "✍️ Новая заметка" }]],
  resize_keyboard: true,
};
