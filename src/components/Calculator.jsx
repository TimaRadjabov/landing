import { useState } from 'react';

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

export default function Calculator() {
  const [type, setType] = useState('turnkey');
  const [area, setArea] = useState(62);
  const [condition, setCondition] = useState('secondary');

  const price = calcPrice(type, area, condition);

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
                    onClick={() => setType(t.id)}
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
                min="10"
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

            <div className="calculator__form">
              <div className="calculator__label">Получить точную смету:</div>
              <div className="calculator__input-group">
                <input
                  type="tel"
                  className="calculator__input"
                  placeholder="+7 ___ ___ __ __"
                />
                <button className="btn btn--primary">Замер</button>
              </div>
              <div className="calculator__note">
                Точная цена — после замера
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
