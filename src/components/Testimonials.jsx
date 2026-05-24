export default function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <div className="section__container">
        <div className="section__label">06 · Отзывы</div>
        <h2 className="section__title">Что говорят клиенты</h2>

        <div className="testimonial">
          <div className="testimonial__text">
            «Уехал на вахту, отдал ключи. Парни скидывали фотки каждый день, я
            просто смотрел. Вернулся — квартира готова. Ни одного звонка «выбери
            плитку срочно». Это то, за что я заплатил.»
          </div>
          <div className="testimonial__author">
            <div className="testimonial__avatar">А</div>
            <div>
              <div className="testimonial__name">Андрей К.</div>
              <div className="testimonial__project">Сокуры, ремонт под ключ, 2024</div>
            </div>
            <div className="testimonial__video-link">▶ Видеоотзыв</div>
          </div>
        </div>
      </div>
    </section>
  );
}
