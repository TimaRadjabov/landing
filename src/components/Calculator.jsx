import { useState } from 'react';

const STATUS = { IDLE: 'idle', LOADING: 'loading', SUCCESS: 'success', ERROR: 'error' };

const REPAIR_TYPES = [
  { id: 'turnkey', label: 'Сан узел под ключ', rate: 15000 },
  { id: 'cosmetic', label: 'Косметический', rate: 7000 },
  { id: 'bathroom', label: 'Евро', rate: 65000 },
  { id: 'designer', label: 'Дизайнерский', rate: 22000 },
];

const CONDITIONS = [
  { id: 'new', label: 'Новостройка', multiplier: 1.0 },
  { id: 'secondary', label: 'Вторичка', multiplier: 1.2 },
  { id: 'house', label: 'Загород', multiplier: 1.2 },
];

const CONDITION_LABELS = { new: 'Новостройка', secondary: 'Вторичка', house: 'Загород' };

function calcPrice(typeId, area, conditionId) {
  const type = REPAIR_TYPES.find((t) => t.id === typeId);
  const cond = CONDITIONS.find((c) => c.id === conditionId);
  if (!type || !cond) return { min: 0, max: 0, months: '' };

  let min, max;
  if (typeId === 'turnkey') {
    min = Math.round(40000 * area * cond.multiplier);
    max = Math.round(68000 * area * cond.multiplier);
  } else if (typeId === 'cosmetic') {
    min = Math.round(7000 * area * cond.multiplier);
    max = Math.round(10000 * area * cond.multiplier);
  } else if (typeId === 'bathroom') {
    min = Math.round(12000 * area * cond.multiplier);
    max = Math.round(15000 * area * cond.multiplier);
  } else if (typeId === 'designer') {
    min = Math.round(17000 * area * cond.multiplier);
    max = Infinity;
  }

  const monthsMap = {
    turnkey: area > 80 ? '3 — 4' : area > 50 ? '2 — 3' : '1,5 — 2',
    cosmetic: '0,5 — 1',
    bathroom: '0,5 — 0,75',
    designer: area > 80 ? '3 — 5' : '2 — 4',
  };

  return { min, max, months: monthsMap[typeId] || '' };
}

function formatPrice(n) {
  return n.toLocaleString('ru-RU');
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (!digits) return '';
  if (digits[0] === '8')
    return '+7 ' + digits.slice(1, 4) + (digits[4] ? ' ' + digits.slice(4, 7) : '') + (digits[7] ? ' ' + digits.slice(7, 9) : '') + (digits[9] ? ' ' + digits.slice(9, 11) : '');
  if (digits[0] === '7')
    return '+' + digits.slice(0, 1) + ' ' + digits.slice(1, 4) + (digits[4] ? ' ' + digits.slice(4, 7) : '') + (digits[7] ? ' ' + digits.slice(7, 9) : '') + (digits[9] ? ' ' + digits.slice(9, 11) : '');
  return '+7 ' + digits.slice(0, 3) + (digits[3] ? ' ' + digits.slice(3, 6) : '') + (digits[6] ? ' ' + digits.slice(6, 8) : '') + (digits[8] ? ' ' + digits.slice(8, 10) : '');
}

export default function Calculator() {
  const [type, setType] = useState('turnkey');
  const [area, setArea] = useState(10);
  const [condition, setCondition] = useState('secondary');
  const [calcPhone, setCalcPhone] = useState('');
  const [calcStatus, setCalcStatus] = useState(STATUS.IDLE);
  const [calcError, setCalcError] = useState('');

  const minArea = type === 'turnkey' ? 1 : 10;

  const price = calcPrice(type, area, condition);
  const isPhoneValid = calcPhone.replace(/\D/g, '').length >= 10;

  const handleCalcSubmit = async (e) => {
    e.preventDefault();
    if (!isPhoneValid || calcStatus === STATUS.LOADING) return;

    setCalcStatus(STATUS.LOADING);
    setCalcError('');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: calcPhone.trim(),
          source: 'calculator',
          calcData: {
            type: REPAIR_TYPES.find(t => t.id === type)?.label || type,
            area: `${area} м²`,
            condition: CONDITION_LABELS[condition] || condition,
            price: `от ${formatPrice(price.min)} ₽${price.max === Infinity ? '' : ' до ' + formatPrice(price.max) + ' ₽'}`,
          },
        }),
      });

      if (!res.ok) throw new Error('Server error');
      setCalcStatus(STATUS.SUCCESS);
    } catch {
      setCalcStatus(STATUS.ERROR);
      setCalcError('Не удалось отправить. Попробуйте ещё раз.');
    }
  };

  return (
    <section className="section" id="calculator">
      <div className="section__container">
        <div className="section__label">02 · Калькулятор</div>
        <h2 className="section__title">Посчитайте смету за минуту</h2>

        <div className="calculator__grid" style={{ display: 'flex' }}>
          <div className="calculator__controls" style={{ flex: 1 }}>
            <div className="calculator__section">
              <div className="calculator__label">Тип ремонта</div>
              <div className="calculator__options">
                {REPAIR_TYPES.map((t) => (
                  <button
                    key={t.id}
                    className={`calculator__option${type === t.id ? ' calculator__option--active' : ''}`}
                    onClick={() => {
                      const newMin = t.id === 'turnkey' ? 1 : 10;
                      setType(t.id);
                      if (area < newMin) setArea(newMin);
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="calculator__section">
              <div className="calculator__slider-wrap">
                <span className="calculator__label">Площадь</span>
                <span className="calculator__slider-value">{area} м²</span>
              </div>
              <input
                type="range"
                className="calculator__slider"
                min={minArea}
                max="200"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
              />
            </div>

            <div className="calculator__section">
              <div className="calculator__label">Состояние</div>
              <div className="calculator__options calculator__options--three">
                {CONDITIONS.map((c) => (
                  <button
                    key={c.id}
                    className={`calculator__option${condition === c.id ? ' calculator__option--active' : ''}`}
                    onClick={() => setCondition(c.id)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="calculator__result" style={{ flex: 1 }}>
            {calcStatus === STATUS.SUCCESS ? (
              <div className="calculator__calc-success">
                <div className="calculator__success-icon">✓</div>
                <div className="calculator__label">Заявка принята!</div>
                <div className="calculator__note">Перезвоним в течение 30 минут</div>
                <button
                  className="btn btn--primary"
                  onClick={() => setCalcStatus(STATUS.IDLE)}
                  style={{ marginTop: 16 }}
                >
                  Отправить ещё
                </button>
              </div>
            ) : (
              <>
                <div>
                  <div className="calculator__label">Ориентировочная стоимость работ</div>
                  <div className="calculator__price">
                    {formatPrice(price.min)} ₽
                    <span className="calculator__price-range">
                      {' '}— {price.max === Infinity ? '∞' : formatPrice(price.max) + ' ₽'}
                    </span>
                  </div>
                  {price.months && (
                    <div className="calculator__meta">
                      Срок: {price.months} месяца
                    </div>
                  )}
                </div>

                <form className="calculator__form" onSubmit={handleCalcSubmit}>
                  <div className="calculator__label">Получить точную смету:</div>
                  <div className="calculator__input-group">
                    <input
                      type="tel"
                      className="calculator__input"
                      placeholder="+7 ___ ___ __ __"
                      value={calcPhone}
                      onChange={(e) => setCalcPhone(formatPhone(e.target.value))}
                      disabled={calcStatus === STATUS.LOADING}
                      required
                    />
                    <button
                      type="submit"
                      className={`btn btn--primary${calcStatus === STATUS.LOADING ? ' btn--loading' : ''}`}
                      disabled={!isPhoneValid || calcStatus === STATUS.LOADING}
                    >
                      {calcStatus === STATUS.LOADING ? <span className="btn__spinner" /> : 'Замер'}
                    </button>
                  </div>
                  {calcStatus === STATUS.ERROR && (
                    <div className="cta__error" style={{ marginTop: 8 }}>{calcError}</div>
                  )}
                  <div className="calculator__note">
                    Точная цена — после замера
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
