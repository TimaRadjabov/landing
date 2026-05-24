export default function CTAForm() {
  return (
    <section className="cta" id="cta">
      <div className="section__container">
        <h2 className="cta__title">Получите смету сегодня</h2>
        <p className="cta__subtitle">
          Замер <strong style={{ fontSize: 'calc(1em + 4px)' }}>бесплатно</strong>. Точная смета — в день замера. Без обзвонов «через 15
          минут».
        </p>

        <div className="cta__form">
          <div className="cta__fields">
            <input type="text" className="cta__field" placeholder="Имя" />
            <input type="tel" className="cta__field" placeholder="+7 ___ ___ __ __" />
            <textarea
              className="cta__field cta__field--area"
              placeholder="Адрес объекта и краткое описание"
            />
          </div>
          <button className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
            Записаться на замер
          </button>
          <div className="cta__note">
            Перезвоним в течение 30 минут в рабочее время
          </div>
        </div>
      </div>
    </section>
  );
}
