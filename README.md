# PULSE.remont — Лендинг + API

## Разработка (локально, два терминала)

```bash
# Терминал 1 — API-сервер (порт 3001)
cd api-server && npm start

# Терминал 2 — Vite dev server (порт 5173)
npm run dev
```

Формы отправляются через Vite proxy на Express-сервер.

## Деплой на Vercel

1. Залей репозиторий на GitHub
2. В Vercel Dashboard → Import → выбери репозиторий
3. В настройках проекта добавь **Environment Variables**:

| Variable | Value |
|---|---|
| `SUPABASE_URL` | URL твоего Supabase проекта |
| `SUPABASE_SERVICE_KEY` | service_role ключ (из Project Settings → API) |
| `TG_BOT_TOKEN` | Токен бота |
| `TG_CHAT_ID` | ID группы для уведомлений |

4. Deploy — Vercel сам запустит сборку и развернёт сайт

На Vercel API работает через Serverless Function (`api/lead.cjs`), не через Express.

## Как хранятся заявки

- **Локально**: `api-server/leads.json` (всегда) + Supabase (если настроен)
- **На Vercel**: только Supabase (файлового хранилища нет)

## Настройка Supabase (сделано)

Таблица `leads` создана. Подробности в `api-server/migrations/001_create_leads.sql`.

## Настройка Telegram (сделано)

Уведомления о новых заявках приходят в Telegram-группу.

## Эндпоинты

| Метод | Путь | Описание |
|-------|------|----------|
| POST | /api/lead | Создать заявку |
