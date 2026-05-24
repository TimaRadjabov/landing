export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__badge">
        Ремонт в Казани · Свободные слоты: 2
      </div>
      <h1 className="hero__title">
        Отдайте ключи —<br />возвращайтесь в готовую квартиру
      </h1>
      <p className="hero__subtitle">
        Комплексный ремонт под ключ для тех, кому некогда контролировать
        процесс. Управление инженеров, фиксированная смета, договор.
      </p>
      <div className="hero__actions">
        <button
          className="btn btn--primary"
          onClick={() =>
            document
              .getElementById('calculator')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Рассчитать стоимость
        </button>
        <button
          className="btn btn--secondary"
          onClick={() =>
            document
              .getElementById('projects')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Смотреть работы
        </button>
      </div>
      <div className="stats">
        <div className="stats__item">
          <div className="stats__value">5 лет</div>
          <div className="stats__label">опыта в ремонтах</div>
        </div>
        <div className="stats__item">
          <div className="stats__value">60+</div>
          <div className="stats__label">сданных объектов</div>
        </div>
        <div className="stats__item">
          <div className="stats__value">от 7.000 ₽</div>
          <div className="stats__label">за м² под ключ</div>
        </div>
        <div className="stats__item">
          <div className="stats__value">1 год</div>
          <div className="stats__label">гарантии</div>
        </div>
      </div>
    </section>
  );
}
