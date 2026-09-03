# nixroll-notes-bot

Telegram-бот, публикующий новые заметки на nixroll.co. Живёт как Cloudflare
Worker (бесплатный тариф, свой сервер не нужен) — принимает вебхук от
Telegram, ведёт короткий диалог (текст на русском → текст на английском →
фото по желанию → подтверждение) и одним коммитом кладёт новую заметку
в `src/content/notes-data.json` (и фото в `public/images/notes/`, если
было) прямо в ветку `master` на GitHub. Оттуда `.github/workflows/deploy.yml`
сам пересобирает сайт и публикует его в `gh-pages` — обычно заметка
появляется на сайте в течение 1–2 минут после «Опубликовать».

## Что нужно сделать один раз, вручную

Я (Claude) написал весь код, но токены и секреты по соображениям
безопасности должны быть введены вами лично — я не подставляю пароли,
API-ключи и токены за вас ни в какие поля и команды. Ниже — весь список,
он единоразовый.

### 1. Создать бота в Telegram

Напишите **@BotFather** → `/newbot` → придумайте имя и username (например,
`nixroll_notes_bot`). BotFather пришлёт **токен бота** — сохраните его,
он понадобится в шаге 5.

### 2. Узнать свой Telegram user ID

Напишите **@userinfobot** — он пришлёт ваш числовой ID. Это единственный ID,
которому бот будет отвечать; все остальные сообщения бот молча игнорирует.

Пришлите этот ID мне в чат — я впишу его в `wrangler.toml` (это не секрет,
просто идентификатор, а не пароль).

### 3. Создать GitHub-токен

GitHub → Settings → Developer settings → **Fine-grained personal access
tokens** → Generate new token:
- Repository access: только `nixroll/nixroll-site`
- Permissions → Contents: **Read and write**, остальное не трогать
- Срок действия — на ваше усмотрение (можно без ограничения)

Скопируйте токен — он показывается один раз, понадобится в шаге 5.

### 4. Завести Cloudflare (бесплатно) и авторизовать Wrangler

Если аккаунта Cloudflare ещё нет — создайте на cloudflare.com (бесплатный
тариф Workers более чем достаточен для этого бота).

В терминале, в этой папке (`telegram-bot/`):

```bash
npm install
npx wrangler login
```

Откроется браузер — авторизуйтесь и разрешите доступ. Дальше wrangler
запомнит сессию на этом компьютере.

Создайте KV-хранилище для состояния диалога:

```bash
npx wrangler kv namespace create NOTES_BOT_KV
```

Команда выведет `id = "..."` — впишите его в `wrangler.toml` вместо
`REPLACE_WITH_KV_NAMESPACE_ID` (можно попросить меня внести правку, если
пришлёте мне этот id — сам id секретом не является).

### 5. Ввести секреты

Каждая команда спросит значение в терминале — вставьте и нажмите Enter.

```bash
npx wrangler secret put TELEGRAM_BOT_TOKEN
# вставьте токен от BotFather (шаг 1)

npx wrangler secret put GITHUB_TOKEN
# вставьте токен из шага 3

npx wrangler secret put TELEGRAM_WEBHOOK_SECRET
# вставьте это значение (я сгенерировал заранее, чтобы вам не выдумывать):
# NhueeiQGfB_prf3QCWSdRPiRp7oxEcRCL0ZJcrmZdUY
```

### 6. Задеплоить Worker

```bash
npx wrangler deploy
```

В выводе будет URL вида `https://nixroll-notes-bot.<ваш-субдомен>.workers.dev`
— он понадобится в следующем шаге.

### 7. Подключить вебхук Telegram к Worker

Выполните (подставив свой токен бота и адрес Worker из шага 6):

```bash
curl -s "https://api.telegram.org/bot<ТОКЕН_БОТА>/setWebhook" \
  -d "url=https://nixroll-notes-bot.<ваш-субдомен>.workers.dev" \
  -d "secret_token=NhueeiQGfB_prf3QCWSdRPiRp7oxEcRCL0ZJcrmZdUY"
```

Ответ должен быть `{"ok":true,"result":true,...}`.

### Готово

Напишите боту `/start` в Telegram — он спросит текст на русском, потом на
английском, потом предложит фото, а в конце — кнопку «Опубликовать».

## Если нужно что-то поменять

- **Обновить код бота** — правьте `src/*.ts`, затем `npx wrangler deploy`.
  Секреты вводить заново не нужно, они сохраняются в Cloudflare.
- **Поменять токен бота или GitHub-токен** — `npx wrangler secret put ИМЯ`
  ещё раз, перезапишет старое значение.
- **Посмотреть логи** — `npx wrangler tail` (реальное время, полезно при
  отладке).
