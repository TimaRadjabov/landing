import 'dotenv/config';
import fetch, { Headers } from 'node-fetch';
globalThis.fetch = fetch;
globalThis.Headers = Headers;
import WebSocket from 'ws';
import express from 'express';
import cors from 'cors';
import https from 'https';
import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const DATA_FILE = join(__dirname, 'leads.json');
const DIST_DIR = join(__dirname, '..', 'dist');

// ── Supabase (опционально) ──────────────────────────────────────────
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey, {
      realtime: { transport: WebSocket },
    })
  : null;

// ── Telegram (опционально) ──────────────────────────────────────────
const tgToken = process.env.TG_BOT_TOKEN;
const tgChatId = process.env.TG_CHAT_ID;
const TELEGRAM_API = 'https://api.telegram.org';

// ── JSON-хранилище ──────────────────────────────────────────────────
function readLeads() {
  if (!existsSync(DATA_FILE)) return [];
  return JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
}

function saveLead(lead) {
  const leads = readLeads();
  leads.push(lead);
  writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2));
}

// ── Telegram ────────────────────────────────────────────────────────
function sendTelegram(text) {
  if (!tgToken || !tgChatId) return;
  const body = JSON.stringify({
    chat_id: tgChatId,
    text,
    parse_mode: 'HTML',
  });
  const url = new URL(`${TELEGRAM_API}/bot${tgToken}/sendMessage`);
  const req = https.request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    },
  });
  req.on('error', (e) => console.error('Telegram send error:', e.message));
  req.write(body);
  req.end();
}

function formatTelegramMessage(lead) {
  const emoji = lead.source === 'calculator' ? '🧮' : '📩';
  const lines = [
    `<b>${emoji} Новая заявка с лендинга</b>`,
    ``,
    `<b>Источник:</b> ${lead.source === 'calculator' ? 'Калькулятор' : lead.source === 'hero' ? 'Главный экран' : 'Форма CTA'}`,
    `<b>Имя:</b> ${lead.name || 'Не указано'}`,
    `<b>Телефон:</b> ${lead.phone}`,
  ];
  if (lead.address) lines.push(`<b>Адрес:</b> ${lead.address}`);
  if (lead.message) lines.push(`<b>Сообщение:</b> ${lead.message}`);
  if (lead.calcData) {
    lines.push(``, `<b>Данные калькулятора:</b>`);
    lines.push(`Тип: ${lead.calcData.type}`);
    lines.push(`Площадь: ${lead.calcData.area} м²`);
    lines.push(`Состояние: ${lead.calcData.condition}`);
    lines.push(`Смета: ${lead.calcData.price}`);
  }
  lines.push(``, `🕐 ${new Date(lead.created_at).toLocaleString('ru-RU')}`);
  return lines.join('\n');
}

// ── Сервер ──────────────────────────────────────────────────────────
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/lead', async (req, res) => {
  try {
    const { name, phone, address, message, source, calcData } = req.body;

    // Валидация
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      return res.status(400).json({ error: 'Некорректный номер телефона' });
    }

    const lead = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: name || '',
      phone: phone.replace(/\D/g, ''),
      address: address || '',
      message: message || '',
      source: source || 'cta',
      calcData: calcData || null,
      created_at: new Date().toISOString(),
    };

    // 1. Всегда сохраняем в JSON
    saveLead(lead);

    // 2. Supabase (если настроен)
    if (supabase) {
      const { error: dbError } = await supabase
        .from('leads')
        .insert({
          name: lead.name,
          phone: lead.phone,
          address: lead.address || null,
          message: lead.message,
          source: lead.source,
          calc_data: lead.calcData,
        });

      if (dbError) console.error('Supabase insert error:', dbError.message);
    }

    // 3. Telegram (если настроен)
    const tgText = formatTelegramMessage(lead);
    sendTelegram(tgText);

    res.json({ ok: true, id: lead.id });
  } catch (e) {
    console.error('Server error:', e);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// GET для проверки (без данных)
app.get('/api/leads', (_req, res) => {
  const leads = readLeads();
  res.json(leads.slice(-50).reverse());
});

// ── В production — раздаём фронтенд ─────────────────────────────────
if (NODE_ENV === 'production') {
  app.use(express.static(DIST_DIR));
  app.get('*', (_req, res) => {
    res.sendFile(join(DIST_DIR, 'index.html'));
  });
  console.log(`  ↳ Раздаём фронтенд из ${DIST_DIR}`);
}

app.listen(PORT, () => {
  console.log(`⚡ Pulse API server running on http://localhost:${PORT}`);
  if (!supabase) console.log('  ↳ Supabase: не настроен');
  if (!tgToken || !tgChatId) console.log('  ↳ Telegram: не настроен');
  console.log(`  ↳ Режим: ${NODE_ENV}`);
  console.log('  ↳ Заявки сохраняются в leads.json');
});
