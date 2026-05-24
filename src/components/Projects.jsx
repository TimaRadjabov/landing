const PROJECTS = [
  {
    title: '2-комнатная, ЖК «Салават Купере»',
    meta: '58 м² · 1.2 млн ₽',
    time: '2 месяца',
    badge: 'До · После',
  },
  {
    title: 'Санузел под ключ, Сокуры',
    meta: '4.8 м² · 280 тыс ₽',
    time: '3 недели',
    badge: 'Санузел',
  },
];

export default function Projects() {
  return (
    <section className="section" id="projects">
      <div className="section__container">
        <div className="section__label">03 · Работы</div>
        <h2 className="section__title">Объекты, которые мы сдали</h2>

        <div className="projects__grid">
          {PROJECTS.map((p, i) => (
            <div className="project-card" key={i}>
              <div className="project-card__image">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#4A4A4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21,15 16,10 5,21" />
                </svg>
                <div className="project-card__badge">{p.badge}</div>
              </div>
              <div className="project-card__body">
                <div className="project-card__title">{p.title}</div>
                <div className="project-card__meta">
                  <span>{p.meta}</span>
                  <span>{p.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects__more">Показать все 12 объектов →</div>
      </div>
    </section>
  );
}
