import { useState } from 'react';

const STATUS = { IDLE: 'idle', LOADING: 'loading', SUCCESS: 'success', ERROR: 'error' };

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (!digits) return '';
  if (digits[0] === '8') return '+7 ' + digits.slice(1, 4) + (digits[4] ? ' ' + digits.slice(4, 7) : '') + (digits[7] ? ' ' + digits.slice(7, 9) : '') + (digits[9] ? ' ' + digits.slice(9, 11) : '');
  if (digits[0] === '7') return '+' + digits.slice(0, 1) + ' ' + digits.slice(1, 4) + (digits[4] ? ' ' + digits.slice(4, 7) : '') + (digits[7] ? ' ' + digits.slice(7, 9) : '') + (digits[9] ? ' ' + digits.slice(9, 11) : '');
  return '+7 ' + digits.slice(0, 3) + (digits[3] ? ' ' + digits.slice(3, 6) : '') + (digits[6] ? ' ' + digits.slice(6, 8) : '') + (digits[8] ? ' ' + digits.slice(8, 10) : '');
}

export default function CTAForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(STATUS.IDLE);
  const [errorText, setErrorText] = useState('');

  const isValid = phone.replace(/\D/g, '').length >= 10;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || status === STATUS.LOADING) return;

    setStatus(STATUS.LOADING);
    setErrorText('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          address: address.trim(),
          message: message.trim(),
          source: 'cta',
        }),
      });

      if (!res.ok) throw new Error('Ошибка сервера');

      setStatus(STATUS.SUCCESS);
    } catch {
      setStatus(STATUS.ERROR);
      setErrorText('Не удалось отправить заявку. Попробуйте ещё раз или позвоните 8 (937) 620-06-13');
    }
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setAddress('');
    setMessage('');
    setStatus(STATUS.IDLE);
    setErrorText('');
  };

  // ── Успех ─────────────────────────────────────────────────────────
  if (status === STATUS.SUCCESS) {
    return (
      <section className="cta" id="cta">
        <div className="section__container">
          <div className="cta__success">
            <div className="cta__success-icon">✓</div>
            <h2 className="cta__title">Заявка принята!</h2>
            <p className="cta__subtitle">
              Мы перезвоним в течение 30 минут в рабочее время.
            </p>
            <button className="btn btn--primary" onClick={handleReset}>
              Отправить ещё заявку
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ── Форма ──────────────────────────────────────────────────────────
  return (
    <section className="cta" id="cta">
      <div className="section__container">
        <h2 className="cta__title">Получите смету сегодня</h2>
        <p className="cta__subtitle">
          Замер <strong>бесплатно</strong>. Точная смета — в день замера. Без обзвонов «через 15
          минут».
        </p>

        <form className="cta__form" onSubmit={handleSubmit}>
          <div className="cta__fields">
            <input
              type="text"
              className="cta__field"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === STATUS.LOADING}
            />
            <input
              type="tel"
              className="cta__field"
              placeholder="+7 ___ ___ __ __"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              disabled={status === STATUS.LOADING}
              required
            />
            <input
              type="text"
              className="cta__field"
              placeholder="Адрес объекта"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={status === STATUS.LOADING}
            />
            <textarea
              className="cta__field cta__field--area"
              placeholder="Краткое описание работ"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={status === STATUS.LOADING}
            />
          </div>

          {status === STATUS.ERROR && (
            <div className="cta__error">{errorText}</div>
          )}

          <button
            type="submit"
            className={`btn btn--primary${status === STATUS.LOADING ? ' btn--loading' : ''}`}
            style={{ width: '100%', justifyContent: 'center' }}
            disabled={!isValid || status === STATUS.LOADING}
          >
            {status === STATUS.LOADING ? (
              <span className="btn__spinner" />
            ) : (
              'Записаться на замер'
            )}
          </button>

          <div className="cta__note">
            Перезвоним в течение 30 минут в рабочее время
          </div>
        </form>
      </div>
    </section>
  );
}
