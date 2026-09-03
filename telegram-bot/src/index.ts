import type { Env } from "./types";
import {
  answerCallbackQuery,
  CONFIRM_KEYBOARD,
  getFileUrl,
  PHOTO_STEP_KEYBOARD,
  sendMessage,
  START_KEYBOARD,
} from "./telegram";
import { publishNote } from "./github";
import { alreadyProcessed, clearDraft, getDraft, parseTitleAndBody, setDraft } from "./state";

type TgUser = { id: number };
type TgChat = { id: number };
type TgPhotoSize = { file_id: string; width: number; height: number };
type TgMessage = {
  message_id: number;
  chat: TgChat;
  from?: TgUser;
  text?: string;
  photo?: TgPhotoSize[];
  caption?: string;
};
type TgCallbackQuery = {
  id: string;
  from: TgUser;
  message?: TgMessage;
  data?: string;
};
type TgUpdate = {
  update_id: number;
  message?: TgMessage;
  callback_query?: TgCallbackQuery;
};

const RU_PROMPT =
  "Отправьте заметку на русском.\n\nПервая строка — заголовок, дальше — текст. Если абзацев несколько, разделите их пустой строкой.";
const EN_PROMPT =
  "Теперь то же самое на английском.\n\nПервая строка — заголовок, дальше — текст (абзацы через пустую строку).";
const PHOTO_PROMPT = "Пришлите фото к заметке — или нажмите «Без фото».";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "POST") {
      return new Response("ok");
    }

    const secret = request.headers.get("x-telegram-bot-api-secret-token");
    if (secret !== env.TELEGRAM_WEBHOOK_SECRET) {
      return new Response("unauthorized", { status: 401 });
    }

    let update: TgUpdate;
    try {
      update = await request.json();
    } catch {
      return new Response("bad request", { status: 400 });
    }

    // Отвечаем Telegram сразу же после того, как разобрались с апдейтом —
    // если что-то упадёт внутри, Telegram всё равно получит 200 и не будет
    // ретраить бесконечно; ошибки уходят в console.error (Cloudflare logs).
    try {
      await handleUpdate(env, update);
    } catch (err) {
      console.error("handleUpdate failed:", err);
    }
    return new Response("ok");
  },
};

async function handleUpdate(env: Env, update: TgUpdate) {
  if (await alreadyProcessed(env, update.update_id)) return;

  const userId = update.message?.from?.id ?? update.callback_query?.from?.id;
  const chatId = update.message?.chat.id ?? update.callback_query?.message?.chat.id;
  if (!userId || !chatId) return;

  if (String(userId) !== env.ALLOWED_CHAT_ID) {
    // Чужой пользователь — тихо игнорируем, чтобы не подтверждать существование бота.
    return;
  }

  if (update.callback_query) {
    await handleCallback(env, chatId, update.callback_query);
    return;
  }

  const message = update.message;
  if (!message) return;

  const text = message.text?.trim();

  if (text === "/start" || text === "✍️ Новая заметка") {
    await setDraft(env, chatId, { step: "ru" });
    await sendMessage(env, chatId, RU_PROMPT, { reply_markup: { remove_keyboard: true } });
    return;
  }

  const draft = await getDraft(env, chatId);
  if (!draft) {
    await sendMessage(env, chatId, "Нажмите /start или кнопку ниже, чтобы начать новую заметку.", {
      reply_markup: START_KEYBOARD,
    });
    return;
  }

  if (draft.step === "ru") {
    if (!text) {
      await sendMessage(env, chatId, "Пришлите текстом: заголовок и текст заметки.");
      return;
    }
    const parsed = parseTitleAndBody(text);
    if (!parsed.title || parsed.body.length === 0) {
      await sendMessage(env, chatId, "Не хватает текста заметки — первая строка заголовок, ниже сам текст.");
      return;
    }
    await setDraft(env, chatId, { ...draft, ru: parsed, step: "en" });
    await sendMessage(env, chatId, EN_PROMPT);
    return;
  }

  if (draft.step === "en") {
    if (!text) {
      await sendMessage(env, chatId, "Пришлите текстом: заголовок и текст заметки на английском.");
      return;
    }
    const parsed = parseTitleAndBody(text);
    if (!parsed.title || parsed.body.length === 0) {
      await sendMessage(env, chatId, "Не хватает текста — первая строка заголовок, ниже сам текст.");
      return;
    }
    await setDraft(env, chatId, { ...draft, en: parsed, step: "photo" });
    await sendMessage(env, chatId, PHOTO_PROMPT, { reply_markup: PHOTO_STEP_KEYBOARD });
    return;
  }

  if (draft.step === "photo") {
    if (message.photo && message.photo.length > 0) {
      const best = message.photo.reduce((a, b) => (b.width > a.width ? b : a));
      await setDraft(env, chatId, {
        ...draft,
        photo: { fileId: best.file_id, width: best.width, height: best.height },
        step: "confirm",
      });
      await sendConfirmPreview(env, chatId, { ...draft, photo: { fileId: best.file_id, width: best.width, height: best.height }, step: "confirm" });
      return;
    }
    await sendMessage(env, chatId, "Пришлите фото или нажмите «Без фото» под предыдущим сообщением.");
    return;
  }

  if (draft.step === "confirm") {
    await sendMessage(env, chatId, "Нажмите «Опубликовать» или «Отмена» под предыдущим сообщением.");
    return;
  }
}

async function handleCallback(env: Env, chatId: number, cq: TgCallbackQuery) {
  const data = cq.data;
  const draft = await getDraft(env, chatId);

  if (data === "cancel") {
    await clearDraft(env, chatId);
    await answerCallbackQuery(env, cq.id);
    await sendMessage(env, chatId, "Отменено.", { reply_markup: START_KEYBOARD });
    return;
  }

  if (!draft) {
    await answerCallbackQuery(env, cq.id, "Черновик не найден, начните заново: /start");
    return;
  }

  if (data === "nophoto" && draft.step === "photo") {
    const next = { ...draft, photo: null as null, step: "confirm" as const };
    await setDraft(env, chatId, next);
    await answerCallbackQuery(env, cq.id);
    await sendConfirmPreview(env, chatId, next);
    return;
  }

  if (data === "publish" && draft.step === "confirm") {
    await answerCallbackQuery(env, cq.id, "Публикую…");
    await publishDraft(env, chatId, draft);
    return;
  }

  await answerCallbackQuery(env, cq.id);
}

async function sendConfirmPreview(
  env: Env,
  chatId: number,
  draft: NonNullable<Awaited<ReturnType<typeof getDraft>>>
) {
  const ru = draft.ru!;
  const en = draft.en!;
  const photoLine = draft.photo ? "\n📷 Фото приложено" : "\n(без фото)";
  const preview =
    `<b>Проверьте перед публикацией:</b>\n\n` +
    `🇷🇺 <b>${escapeHtml(ru.title)}</b>\n${ru.body.map(escapeHtml).join("\n\n")}\n\n` +
    `🇬🇧 <b>${escapeHtml(en.title)}</b>\n${en.body.map(escapeHtml).join("\n\n")}` +
    photoLine;
  await sendMessage(env, chatId, preview, { reply_markup: CONFIRM_KEYBOARD });
}

async function publishDraft(
  env: Env,
  chatId: number,
  draft: NonNullable<Awaited<ReturnType<typeof getDraft>>>
) {
  const ru = draft.ru!;
  const en = draft.en!;

  let photo: { bytes: Uint8Array; width: number; height: number } | null = null;
  if (draft.photo) {
    const url = await getFileUrl(env, draft.photo.fileId);
    const res = await fetch(url);
    const buf = new Uint8Array(await res.arrayBuffer());
    photo = { bytes: buf, width: draft.photo.width, height: draft.photo.height };
  }

  try {
    const { slug } = await publishNote(env, { ru, en, photo });
    await clearDraft(env, chatId);
    await sendMessage(
      env,
      chatId,
      `✅ Опубликовано. Сайт пересоберётся автоматически — через 1–2 минуты заметка будет здесь:\n${env.SITE_URL}/ru/notes/#${slug}`,
      { reply_markup: START_KEYBOARD }
    );
  } catch (err) {
    console.error("publishNote failed:", err);
    await sendMessage(
      env,
      chatId,
      "Не получилось опубликовать — ошибка на стороне GitHub. Черновик сохранён, попробуйте «Опубликовать» ещё раз чуть позже."
    );
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
