const { createClient } = require('@supabase/supabase-js');
const https = require('https');

const TELEGRAM_API = 'https://api.telegram.org';

function formatMessage(body) {
  const emoji = body.source === 'calculator' ? '🧮' : '📩';
  const srcLabels = { calculator: 'Калькулятор', hero: 'Главный экран' };
  const lines = [
    `<b>${emoji} Новая заявка с лендинга</b>\n`,
    `<b>Источник:</b> ${srcLabels[body.source] || 'Форма CTA'}`,
    `<b>Имя:</b> ${body.name || 'Не указано'}`,
    `<b>Телефон:</b> ${body.phone}`,
  ];
  if (body.message) lines.push(`<b>Сообщение:</b> ${body.message}`);
  if (body.calcData) {
    lines.push('', '<b>Данные калькулятора:</b>');
    lines.push(`Тип: ${body.calcData.type}`);
    lines.push(`Площадь: ${body.calcData.area}`);
    lines.push(`Состояние: ${body.calcData.condition}`);
    lines.push(`Смета: ${body.calcData.price}`);
  }
  lines.push('', `🕐 ${new Date().toLocaleString('ru-RU')}`);
  return lines.join('\n');
}

function sendTelegram(text) {
  return new Promise((resolve) => {
    const token = process.env.TG_BOT_TOKEN;
    const chatId = process.env.TG_CHAT_ID;
    if (!token || !chatId) {
      console.log('Telegram skipped: no token or chatId');
      return resolve(null);
    }

    const body = JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    });

    const url = new URL(`${TELEGRAM_API}/bot${token}/sendMessage`);
    const req = https.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    });

    let data = '';
    req.on('response', (res) => {
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        console.log('Telegram response:', data);
        resolve(data);
      });
    });
    req.on('error', (e) => {
      console.error('Telegram error:', e.message);
      resolve(null);
    });
    req.write(body);
    req.end();
  });
}

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET — проверка, что функция работает
  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, status: 'alive' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, message, source, calcData } = req.body;

    if (!phone || phone.replace(/\D/g, '').length < 10) {
      return res.status(400).json({ error: 'Некорректный номер телефона' });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY,
    );

    const { error: dbError } = await supabase.from('leads').insert({
      name: name || '',
      phone: phone.replace(/\D/g, ''),
      message: message || '',
      source: source || 'cta',
      calc_data: calcData || null,
    });

    if (dbError) {
      console.error('Supabase error:', dbError);
    }

    const tgResult = await sendTelegram(formatMessage({ name, phone, message, source, calcData }));

    return res.status(200).json({ ok: true, telegram: !!tgResult });
  } catch (e) {
    console.error('Function error:', e);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};
